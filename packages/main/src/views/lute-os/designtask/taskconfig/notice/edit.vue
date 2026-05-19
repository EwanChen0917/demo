<template>
  <div class="agency-page">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        label="所属类型"
        prop="itemType"
        :rules="[{ required: true, message: '所属类型不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.itemType" placeholder="请选择分数所属类型" filterable>
          <el-option
            v-for="item in projectList"
            :key="item.type"
            :label="item.text"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="部门"
        prop="deptId"
        :rules="[{ required: true, message: '部门不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-cascader
          v-model="form.deptId"
          :props="cascaderProps"
          clearable
          placeholder="请选择所属部门"
          separator=" / "
        />
      </el-form-item>

      <el-form-item
        v-if="+form.itemType < 6"
        label="设计师"
        prop="designers"
        :rules="[{ required: true, message: '设计师不能为空', trigger: ['blur'] }]"
      >
        <el-select
          v-model="form.designers"
          placeholder="请选择设计师"
          clearable
          multiple
          filterable
        >
          <el-option
            v-for="item in designerMemberList"
            :key="item.designer"
            :label="item.designerDesc"
            :value="item.designer"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="状态"
        prop="status"
        :rules="[{ required: true, message: '状态不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="form-save">
      <el-button type="primary" :loading="saveLoading" @click="save">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="designtaskconfignotice">
  import { ref, onMounted } from 'vue';
  import { keyBy } from 'lodash-es';
  import { useRouter } from 'vue-router';
  import { designApi, DesignApi, memberApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { itemTypeList } from '../../config/index.ts';

  const router = useRouter();
  const route = useRoute();
  const searchInfo = sessionStorage.getItem('taskConfigSearchInfo') ?? '{}';

  const formRef = ref();
  const form: any = reactive<DesignApi.LuteosDesignOperationSaveDesignOperationGroup.RequestBody>({
    deptId: [],
    designers: [],
    itemType: +route.query.itemType,
    status: '',
    operatorGroupCode: '',
  });

  const statusOptions = ref([
    {
      name: '禁用',
      code: 0,
    },
    {
      name: '启用',
      code: 1,
    },
  ]);

  const baseItemTypeList = itemTypeList.map((item) => ({ ...item }));
  const itemTypeTextMap = ref<Record<number, string>>({});
  const projectList = ref([...baseItemTypeList]);
  const rebuildProjectList = () => {
    projectList.value = baseItemTypeList.map((item) => ({
      ...item,
      text: itemTypeTextMap.value[item.type] || item.text,
    }));
  };
  const queryTaskItemTypeText = async () => {
    try {
      const res: any = await designApi.luteosDesignQueryDesignTaskItemType02List({});
      const itemTypeMap = keyBy(res.itemTypeList || [], 'itemType');
      itemTypeTextMap.value = Object.keys(itemTypeMap).reduce(
        (prev, key) => ({
          ...prev,
          [Number(key)]: itemTypeMap[key].itemTypeName,
        }),
        {} as Record<number, string>
      );
    } catch {}
    rebuildProjectList();
  };

  const saveLoading = ref(false);
  const save = () => {
    formRef.value.validate((isvalid) => {
      if (isvalid) {
        saveLoading.value = true;
        designApi
          .luteosDesignOperationSaveDesignOperationGroup({
            ...form,
            deptId: form.deptId[form.deptId.length - 1],
            designers: form.designers.join(','),
          })
          .then(() => {
            ElMessage.success('提交成功');
            formRef.value.resetFields();
            router.push({
              name: 'designtaskconfig',
              params: {
                ...JSON.parse(searchInfo),
                itemType: form.itemType,
              },
            });
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };

  const cascaderProps = {
    expandTrigger: 'hover' as const,
    label: 'deptName',
    value: 'deptId',
    multiple: false,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node, resolve) {
      const { value } = node;
      querySubDeptList(value).then((res) => {
        resolve(res);
      });
    },
  };

  const designerMemberList = ref([]);
  const queryDesignerList = () => {
    designApi
      .luteosDesignQueryDesignerList({
        itemType: form.itemType,
      })
      .then((res) => {
        designerMemberList.value = res.designerList || [];
      });
  };

  queryDesignerList();

  const querySubDeptList = async (parentId) => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId });
    return res.deptInfoList;
  };

  const quaryDetail = () => {
    return designApi
      .luteosDesignOperationQueryDesignOperationGroupDetail({
        operatorGroupCode: route.query.id,
      })
      .then((res: any) => {
        form.deptId = res.deptIdList.splice(1);
        form.itemType = res.itemType;
        form.designers = res.designerCodeList;
        form.status = res.status;
        form.operatorGroupCode = res.operatorGroupCode;
      });
  };
  onMounted(async () => {
    await queryTaskItemTypeText();
    if (route.query.id) {
      await quaryDetail();
    }
  });

  onUnmounted(() => {
    if (sessionStorage.getItem('taskConfigSearchInfo'))
      sessionStorage.removeItem('taskConfigSearchInfo');
  });
</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
    :deep(.el-input) {
      width: 400px !important;
    }
  }
  .form-save {
    text-align: center;
  }
  .el-select {
    width: 400px !important;
  }
</style>
