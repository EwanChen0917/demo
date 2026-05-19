<template>
  <el-dialog title="是否为第一次合作" :model-value="visible" @close="emit('close')">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="是否为第一次合作" prop="cooperationFirstFlag">
        <el-radio-group v-model="form.cooperationFirstFlag">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', val): void;
  }>();

  const formRef = ref(null);
  const form = ref({
    cooperationFirstFlag: '', // 是否为第一次合作，1-是，0-否
  });

  const rules = reactive({
    cooperationFirstFlag: [
      { required: true, message: '请选择是否为第一次合作', trigger: 'change' },
    ],
  });

  const handleSave = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    emit('save', form.value.cooperationFirstFlag);
  };
</script>

<style scoped lang="scss"></style>
