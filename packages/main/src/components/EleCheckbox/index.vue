<template>
  <el-checkbox
    v-model="valueRef"
    class="ele_checkbox"
    :disabled="disabled"
    label="Option 1"
    :size="size"
  />
</template>

<script setup lang="ts">
  import { ElCheckbox } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      modelValue: boolean;
      disabled?: boolean;
      size?: 'large' | 'default' | 'small';
    }>(),
    { modelValue: false, disabled: false, size: 'large' }
  );

  // 值
  const valueRef = ref(props.modelValue);
  // 监听
  watch(
    () => valueRef.value,
    (val: boolean) => {
      emit('update:modelValue', val);
    }
  );
  const emit = defineEmits<{
    (event: 'update:modelValue', val: boolean);
  }>();
</script>

<style scoped lang="scss">
  .ele_checkbox {
    ::v-deep(.el-checkbox__label) {
      display: none;
    }
    ::v-deep(.el-checkbox__input) {
      border-radius: 0.45em;
      width: 1.75rem;
      height: 1.75rem;
    }
    ::v-deep(.el-checkbox__inner) {
      border-radius: 0.45em;
      width: 1.75rem;
      height: 1.75rem;
      background-color: #f4f4f4;
    }
    ::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
      border-color: transparent;
      background-color: #3e97ff;
    }
    ::v-deep(.el-checkbox__inner::after) {
      width: 4px;
      transform: rotate(45deg) scale(1.2, 1.4);
      border-color: transparent;
    }
    ::v-deep(.el-checkbox__inner) {
      border-color: transparent;
    }
    ::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
      transform: rotate(45deg) scale(1.2, 1.4);
      transition: none;
      border-color: #fff;
    }
  }
</style>
