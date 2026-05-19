<template>
  <el-dialog title="新增敏感类型" :model-value="visible" @close="$emit('close')">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="敏感类型名称" prop="sensitiveTypeName" required>
        <el-input v-model="form.sensitiveTypeName" />
      </el-form-item>
      <el-form-item label="简码" prop="sensitiveTypeSimpleCode">
        <el-input v-model="form.sensitiveTypeSimpleCode" />
      </el-form-item>
      <el-form-item label="描述" prop="sensitiveTypeRemark">
        <el-input
          v-model="form.sensitiveTypeRemark"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述(50字以内)"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { productApi, ProductApi, ProductContracts } from '@/api/index';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ProductApi.LuteosProductSensitiveTypeSaveOrUpdateSensitiveType.RequestBody>(
    {
      sensitiveTypeName: '',
      sensitiveTypeSimpleCode: '',
      sensitiveTypeRemark: '',
    }
  );
  const rules = reactive<FormRules>({
    sensitiveTypeName: [
      {
        required: true,
        message: '请填写敏感类型名称',
        trigger: ['blur', 'change'],
      },
    ],
  });

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        const { sensitiveTypeName, sensitiveTypeSimpleCode, sensitiveTypeRemark } = form;

        await productApi.luteosProductSensitiveTypeSaveOrUpdateSensitiveType({
          sensitiveTypeName,
          sensitiveTypeSimpleCode,
          sensitiveTypeRemark,
        });

        // FIXME 修改交互
        ElMessage.success({
          message: '创建成功',
          duration: 5 * 1000,
        });

        // 关闭
        emit('close', true);
      } catch (e) {
        // do nothing
      } finally {
        saveLoading.value = false;
      }
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    emit('close');
  };
</script>
