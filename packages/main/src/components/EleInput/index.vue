<template>
  <el-input
    v-model="valueRef"
    :size="size"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    @blur="onBlur"
    class="ele_input"
  />
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      modelValue: any;
      size?: any;
      maxlength?: number;
      placeholder?: string;
      clearable?: boolean;
      disabled?: boolean;
    }>(),
    {
      size: 'default',
      maxlength: 100,
      placeholder: '',
      clearable: true,
      disabled: false
    }
  );

  // 输入框的值
  const valueRef = ref(props.modelValue);
  const onBlur = () => {
    emit('onBlur');
  };
  // 监听
  watch(
    () => valueRef.value,
    (val: string) => {
      emit('update:modelValue', val);
    }
  );
  const emit = defineEmits<{
    (event: 'update:modelValue', val: string);
    (event: 'onBlur');
  }>();
</script>

<style lang="scss" scoped>
  .ele_input {
    ::v-deep(.el-input__wrapper) {
      border-color: var(--bs-gray-100);
      color: var(--bs-gray-700);
      transition: color 0.2s ease;
      display: inline-flex;
      width: 100%;
      padding: 0.715rem 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.5;
      color: var(--bs-gray-700);
      background-color: #f9f9f9;
      background-clip: padding-box;
      border: 1px solid var(--bs-gray-300);
      appearance: none;
      border-radius: 0.475rem;
      height: auto;
      box-shadow: none;
    }
    ::v-deep(.el-input__inner) {
      height: auto;
      line-height: unset;
      font-weight: 500;
      color: #5e6278;
    }
  }
</style>
