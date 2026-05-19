<template>
  <el-form
    label-position="top"
    label-width="100px"
    :model="form"
    require-asterisk-position="right"
    :rules="rules"
    class="ele_form"
    ref="eleFormRef"
  >
    <slot></slot>
  </el-form>
</template>

<script setup name="Form" lang="ts">
  import { ref, reactive, toRefs } from 'vue';
  import { ElForm } from 'element-plus';

  defineProps({
    form: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
  });

  const state = reactive<{}>({});
  const {} = toRefs(state);
  const eleFormRef: any = ref(null);

  const validate = () => {
    return eleFormRef.value && eleFormRef.value.validate();
  };

  const validateField = (val) => {
    return eleFormRef.value && eleFormRef.value.validateField(val);
  };

  const resetFields = (val) => {
    return eleFormRef.value && eleFormRef.value.resetFields(val);
  };

  const clearValidate = () => {
    return eleFormRef.value && eleFormRef.value.clearValidate();
  };

  defineExpose({
    validate,
    validateField,
    resetFields,
    clearValidate,
  });
</script>

<style scoped></style>
