<template>
  <el-dialog
    v-model="visible"
    :width="type == 2 ? '435px' : '400px'"
    :title="typeMap[type]"
    :close-on-click-modal="false"
    align-center
  >
    <el-form
      ref="ruleFormRef"
      :model="localFormData"
      :rules="rules"
      :label-width="type == 2 ? '114px' : '80px'"
    >
      <el-form-item v-if="type == 1" label="运营" prop="operator">
        <DeptMember
          v-model="localFormData.operator"
          placeholder="请选择"
          deptId="65717209"
          clearable
          teleported
          class="w-225px"
        />
      </el-form-item>
      <el-form-item v-if="type == 2" label="组长" prop="leader">
        <DeptMember
          v-model="localFormData.leader"
          placeholder="请选择"
          deptId="65717209"
          clearable
          teleported
          class="w-225px"
        />
      </el-form-item>
      <el-form-item
        v-if="type == 2 && localFormData.status == 3"
        label="无需处理的原因"
        prop="noHandlerReason"
      >
        <el-input
          v-model="localFormData.noHandlerReason"
          maxlength="500"
          :rows="5"
          placeholder="请输入"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item v-if="type == 3" label="备注" prop="remark" label-width="49px">
        <el-input
          v-model="localFormData.remark"
          :rows="5"
          placeholder="请输入"
          type="textarea"
          maxlength="500"
          style="width: 292px"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save" v-loading="saveLoading">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi, shopApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';

  interface formType {
    categoryLevel: any;
    categoryLevelCode?: string;
    gtmGroup?: string;
    leader?: string;
    operator?: string;
    remark?: string;
    site: string;
    url: string;
  }

  const props = withDefaults(
    defineProps<{
      type: number; // 1运营 2处理状态 3备注
    }>(),
    {
      type: -1,
    }
  );

  const emit = defineEmits<{
    (event: 'success', formData: formType): void;
  }>();

  const typeMap = {
    1: '编辑运营',
    2: '编辑组长',
    3: '编辑备注',
  };

  const localFormData = ref<formType>({});

  const rules = {
    operator: [{ required: true, message: '请选择', trigger: 'change' }],
    leader: [{ required: true, message: '请选择', trigger: 'change' }],
    noHandlerReason: [{ required: true, message: '请填写无需处理的原因', trigger: 'blur' }],
  };

  // const handleStatusList = [
  //   { label: '待处理', value: 0 },
  //   { label: '处理中', value: 1 },
  //   { label: '已处理', value: 2 },
  //   { label: '无需处理', value: 3 },
  // ];

  const visible = ref(false);
  const open = (formData: formType) => {
    localFormData.value = cloneDeep(formData);
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  const saveLoading = ref(false);
  const ruleFormRef = ref();
  const save = async () => {
    // console.log(ruleFormRef.value.validate, '000');
    if (ruleFormRef.value && ruleFormRef.value.validate) {
      const valid = await ruleFormRef.value.validate((item) => item);
      // console.log(localFormData.value);
      if (valid) {
        // 请求接口
        saveLoading.value = true;
        // 处理状态为已处理或者无需处理 需要额外调用更新待办接口
        try {
          // await productApi.luteosProductRankingListSave({
          //   operator: localFormData.value.operator,
          //   leader: localFormData.value.leader,
          //   remark: localFormData.value.remark,
          // });
          await productApi.luteosProductRankingListOperation(localFormData.value);
          ElMessage.success('修改成功');
          emit('success', localFormData.value);
          close();
        } finally {
          saveLoading.value = false;
        }
      }
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
