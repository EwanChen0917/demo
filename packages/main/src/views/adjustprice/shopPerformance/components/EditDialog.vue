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
      :label-width="type == 2 ? '114px' : '52px'"
    >
      <el-form-item v-if="type == 1" label="运营" label-width="89px" prop="operatorCode">
        <DeptMember
          v-model="localFormData.operatorCode"
          placeholder="运营"
          deptId="65717209"
          clearable
          teleported
          class="w-225px"
        />
      </el-form-item>
      <el-form-item v-if="type == 2" label="处理状态" prop="status" >
        <el-select v-model="localFormData.status" placeholder="请选择处理状态" style="width: 240px">
          <el-option
            v-for="item in handleStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      <el-form-item v-if="type == 3" label="备注" prop="remark">
        <el-input v-model="localFormData.remark" style="width: 292px"   maxlength="500" :rows="5" placeholder="请输入"  show-word-limit type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save" v-loading="saveLoading">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { shopApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';

  interface formType {
    code: string;
    operatorCode?: string[];
    status?: number;
    noHandlerReason?: string;
    remark?: string;
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
    2: '编辑处理状态',
    3: '编辑备注',
  };

  const localFormData = ref<formType>({});

  const rules = {
    operatorCode: [{ required: true, message: '请选择运营数据', trigger: 'change' }],
    status: [{ required: true, message: '请选择处理状态', trigger: 'change' }],
    noHandlerReason: [{ required: true, message: '请填写无需处理的原因', trigger: 'blur' }],
  };

  const handleStatusList = [
    { label: '待处理', value: 0 },
    { label: '处理中', value: 1 },
    { label: '已处理', value: 2 },
    { label: '无需处理', value: 3 },
  ];

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
    console.log(ruleFormRef.value.validate, '000');
    if (ruleFormRef.value && ruleFormRef.value.validate) {
      const valid = await ruleFormRef.value.validate((valid) => valid);
      if (valid) {
        // 请求接口
        saveLoading.value = true;
        // 处理状态为已处理或者无需处理 需要额外调用更新待办接口
        try {
          await shopApi.luteosShopPerformanceEdit({
            code: localFormData.value.code,
            noHandlerReason: localFormData.value.noHandlerReason,
            remark: localFormData.value.remark,
            status: localFormData.value.status,
            operatorCode: localFormData.value.operatorCode,
          });
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
