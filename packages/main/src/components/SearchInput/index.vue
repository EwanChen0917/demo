<template>
  <el-input
    v-model="valueRef"
    :size="size"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    class="ele_input"
    @keydown.enter="enterKEey"
  >
    <template #prefix>
      <span class="svg-icon position-absolute ms-6 svg-icon-1">
        <SvgIcon icon="search" className="ms-6" />
      </span>
    </template>
  </el-input>
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
      placeholder: '搜索',
      clearable: true,
      disabled: false
    }
  );

  // 输入框的值
  const valueRef = ref(props.modelValue);

  // 监听
  watch(
    () => props.modelValue,
    (val: string) => {
      valueRef.value = val;
    }
  );

  watch(
    () => valueRef.value,
    (val: string) => {
      emit('update:modelValue', val);
    }
  );

  const enterKEey = () => {
    emit('enterKeyFn', valueRef.value);
  };

  const emit = defineEmits<{
    (event: 'update:modelValue', val: string);
    (event: 'enterKeyFn', val?: string);
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
      padding: 0.2rem 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.1;
      color: var(--bs-gray-700);
      background-color: #f9f9f9;
      background-clip: padding-box;
      border: 1px solid #f9f9f9;
      appearance: none;
      border-radius: 0.475rem;
      height: auto;
      box-shadow: none;
      height: 3.35rem;
    }
    ::v-deep(.el-input__inner) {
      height: auto;
      line-height: unset;
      font-weight: 500;
      color: #5e6278;
    }
    ::v-deep(.el-input__prefix) {
      flex: 0 0 25px;
    }
    ::v-deep(.el-input__wrapper.is-focus) {
      background-color: var(--bs-gray-200);
      border-color: var(--bs-gray-200);
      color: var(--bs-gray-700);
      transition: color 0.2s ease;
    }
    ::v-deep(.el-input__clear) {
      color: #5e6278;
    }
  }
  .ele_input.el-input--small {
    ::v-deep(.el-input__wrapper) {
      padding-top: 0.55rem;
      padding-bottom: 0.55rem;
      padding-left: 0.75rem;
      font-size: 0.95rem;
      border-radius: 0.425rem;
    }
  }
</style>
