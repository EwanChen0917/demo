<template>
  <el-dialog title="任务转办" :model-value="visible" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left">
      <el-form-item prop="operator">
        <el-select v-model="form.operator" clearable filterable placeholder="请选择转办对象">
          <el-option
            v-for="item in memberList"
            :key="item.memberCode"
            :label="item.name"
            :value="item.memberCode"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { metaApi, memberApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
      info: any;
    }>(),
    {
      visible: false,
      title: '提示',
    }
  );
  const form = ref({
    operator: '',
  });

  const rules = ref({
    operator: { required: true, message: '请先选择转办对象', trigger: ['blur', 'change'] },
  });

  const memberList = ref([]);
  const queryDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({ operatorDepartmentCode: 'red_operator' })
      .then((res: any) => {
        memberList.value = res.memberList || [];
      });
  };
  queryDeptMemberOption();

  const formRef = ref();
  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (form.value.operator === props.info.operator) {
        ElMessage.warning('请选择非本人的转办对象');
        return;
      }
      metaApi
        .luteosMetaHandleMetaMarkTask({
          taskCode: props.info.taskCode,
          metaMarkCode: props.info.metaMarkCode,
          platformCode: props.info.platformCode,
          siteCode: props.info.siteCode,
          operator: form.value.operator,
          handleType: 8,
        })
        .then(() => {
          ElMessage.success('转办成功！');
          emit('closeModal', 'reload');
        });
    }
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    emit('closeModal');
  };
</script>

<style lang="scss" scoped></style>
