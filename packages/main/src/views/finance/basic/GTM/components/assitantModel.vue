<template>
  <el-dialog
    title="新增品线"
    :model-value="visible"
    @close="$emit('close')"
    label-position="left"
    class="gtmAssitant"
  >
    <el-form :model="form" ref="formRef" label-width="60" label-position="top">
      <el-form-item :label="`添加GTM${typeText}：`">
        <!-- <el-select
          v-model="form.gtm"
          clearable
          :placeholder="`请选择GTM${typeText}`"
          filterable
          v-if="show"
        >
          <el-option
            v-for="item in operatorOptions"
            :key="item.memberCode"
            :label="item.name"
            :value="item.memberCode"
            :disabled="item.disabled"
          />
        </el-select> -->
        <DeptMember v-model="form.gtm" :placeholder="`请选择GTM${typeText}`" clearable />
        <el-button type="primary" @click="add" class="mt18">添加</el-button>
      </el-form-item>
      <el-form-item :label="`当前GTM${typeText}：`">
        <el-tag
          v-for="tag in managerList"
          :key="tag.name"
          closable
          type="primary"
          class="mr10"
          @close="handleClose(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { gtmApi, memberApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      gtmPlCode: string;
      typeText: string;
    }>(),
    {
      typeText: '经理',
    }
  );
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    gtm: '',
  });
  const managerList = ref([]);
  const disabledList = ref([]);
  const show = ref(true);

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    // const res = await memberApi.luteosMemberQueryMemberListByTitle({
    //   title: 'gtm',
    // });
    const res = await memberApi.luteosMemberQueryMemberList({
      operatorDepartmentCode: 'all_dept',
      searchChildDept: true,
      pageSize: 10000,
    });
    operatorOptions.value = res.memberList;
    // console.log(operatorOptions.value);
  };
  const detailData = async () => {
    const detail = await gtmApi.luteosGtmPlQueryRelationGtmAssistantDetail({
      gtmPlCode: props.gtmPlCode,
    });
    disabledList.value = detail.listMemberCode;
    // console.log(detail);
  };
  const initData = async () => {
    const [res1, res2] = await Promise.all([getOperatorOptions(), detailData()]);
    managerList.value = disabledList.value.map((val) => {
      const operator = operatorOptions.value?.find((item) => item.memberCode === val);
      return {
        name: operator?.name,
        memberCode: operator?.memberCode,
      };
    });
    // console.log(managerList.value);
    disabledData();
  };
  initData();
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      // TODO 调接口
      await gtmApi.luteosGtmPlRelationGtmAssistant({
        gtmPlCode: props.gtmPlCode,
        listMemberCode: disabledList.value,
      });
      ElMessage.success('操作成功');
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };
  // 添加关联经理
  const add = () => {
    if (form.value.gtm == '') return;
    const obj = operatorOptions.value.find((res) => {
      return res.memberCode == form.value.gtm;
    });
    // console.log('obj', obj);
    // console.log(managerList.value);
    const memberCodeArr = managerList.value.map((item) => item.memberCode);
    if (memberCodeArr.includes(form.value.gtm)) {
      ElMessage.warning('人员已添加，请重新选择');
      return;
    }
    managerList.value.push({ memberCode: form.value.gtm, name: obj.name });
    disabledList.value.push(form.value.gtm);
    form.value.gtm = '';
    disabledData();
  };
  // 删除关联经理
  const handleClose = (tag: any) => {
    const index = managerList.value.findIndex((res: any) => {
      return res.memberCode == tag.memberCode;
    });
    managerList.value.splice(index, 1);
    disabledList.value.splice(index, 1);
    disabledData();
  };
  // 设置下拉不可选
  const disabledData = () => {
    operatorOptions.value = operatorOptions.value?.map((item) => {
      return {
        ...item,
        disabled: disabledList.value?.includes(item.memberCode),
      };
    });
    show.value = false;
    setTimeout(() => {
      show.value = true;
    }, 200);
  };
</script>

<style scoped lang="scss">
  :global(.gtmAssitant .el-dialog__body) {
    height: 400px;
  }
  .mt18 {
    margin-top: 18px;
  }

  .mr10 {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
