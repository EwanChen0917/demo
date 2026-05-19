<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="部门标签" prop="deptId">
        <el-tree-select
          ref="catTreeSelectRef"
          v-model="form.deptId"
          :data="deptTree"
          filterable
          clearable
          check-strictly
          popper-class="picker-cat-tree-select"
          highlight-current
          @change="handleDeptChange"
        />
      </el-form-item>
      <el-form-item label="标签类型" prop="labelType">
        <el-select v-model="form.labelType" clearable filterable>
          <el-option
            v-for="(item, index) in filterLabelTypeList"
            :key="index"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职责标签" prop="labelName">
        <el-input v-model="form.labelName" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { memberApi, knowledgeApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { labelTypeList } from '../../config';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const title = ref('');

  const formRef = ref(null);
  const form = ref({});

  const rules = reactive({
    deptId: [{ required: true, message: '请选择部门标签', trigger: ['blur', 'change'] }],
    labelType: [{ required: true, message: '请选择标签类型', trigger: ['blur', 'change'] }],
    labelName: [{ required: true, message: '请输入职责标签', trigger: ['blur', 'change'] }],
  });

  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await knowledgeApi.luteosKnowledgeUpdateLabel(form.value);
      ElMessage.success(`${title.value}成功`);
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  const open = async (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row.code) {
      form.value.code = row.code;
      form.value.deptId = row.deptId;
      form.value.labelType = row.labelType;
      form.value.labelName = row.labelName;
      title.value = '编辑';
    } else {
      title.value = '新增';
      form.value = {
        deptId: undefined,
        labelType: undefined,
        labelName: undefined,
      };
    }
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();
  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  const labelDepIdList = ref([]);
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['operating_department'],
    });
    const data = res.dictMap?.operating_department.find(
      (item) => item.value === 'course_check_dept'
    );
    labelDepIdList.value = JSON.parse(data.desc || '[]');
  };
  queryDictMap();

  const filterLabelTypeList = computed(() => {
    return labelDepIdList.value.includes(form.value.deptId)
      ? labelTypeList.filter((item) => item.value === 1)
      : labelTypeList;
  });

  const handleDeptChange = (value) => {
    if (labelDepIdList.value.includes(form.value.deptId)) {
      form.value.labelType = 1;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
