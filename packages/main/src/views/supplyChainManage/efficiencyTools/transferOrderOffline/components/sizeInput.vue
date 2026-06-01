<template>
  <div class="d-flex custrom-box-cell">
    <el-input
      :model-value="displayLength"
      @input="handleLengthInput"
      @blur="handleLengthBlur"
      :size="size"
      :placeholder="lengthPlaceholder"
      :disabled="disabled"
      :clearable="clearable"
      style="width: 55px"
      class="sizeinput-left"
    />
    <el-input
      :model-value="displayWidth"
      @input="handleWidthInput"
      @blur="handleWidthBlur"
      :size="size"
      :placeholder="widthPlaceholder"
      :disabled="disabled"
      :clearable="clearable"
      style="width: 55px"
      class="sizeinput-center"
    />
    <el-input
      :model-value="displayHeight"
      @input="handleHeightInput"
      @blur="handleHeightBlur"
      :size="size"
      :placeholder="heightPlaceholder"
      :disabled="disabled"
      :clearable="clearable"
      style="width: 55px"
      class="sizeinput-right"
    />
  </div>
</template>

<script setup lang="ts">
  import type { ComponentSize } from 'element-plus';

  interface Props {
    // 长度值
    length?: number | null;
    // 宽度值
    width?: number | null;
    // 高度值
    height?: number | null;
    // 输入框尺寸
    size?: ComponentSize;
    // 是否禁用
    disabled?: boolean;
    // 是否可清空
    clearable?: boolean;
    // 自定义占位符
    lengthPlaceholder?: string;
    widthPlaceholder?: string;
    heightPlaceholder?: string;
  }

  interface Emits {
    (e: 'update:length', value: number | null): void;
    (e: 'update:width', value: number | null): void;
    (e: 'update:height', value: number | null): void;
    (
      e: 'change',
      value: { length?: number | null; width?: number | null; height?: number | null }
    ): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    length: null,
    width: null,
    height: null,
    size: 'small',
    disabled: false,
    clearable: false,
    lengthPlaceholder: '长',
    widthPlaceholder: '宽',
    heightPlaceholder: '高',
  });

  const emit = defineEmits<Emits>();

  // 内部显示值（允许中间状态，如 "1."）
  const displayLength = ref<string>('');
  const displayWidth = ref<string>('');
  const displayHeight = ref<string>('');

  // 监听 props 变化，更新显示值
  watch(
    () => props.length,
    (val) => {
      displayLength.value = val !== null && val !== undefined ? String(val) : '';
    },
    { immediate: true }
  );

  watch(
    () => props.width,
    (val) => {
      displayWidth.value = val !== null && val !== undefined ? String(val) : '';
    },
    { immediate: true }
  );

  watch(
    () => props.height,
    (val) => {
      displayHeight.value = val !== null && val !== undefined ? String(val) : '';
    },
    { immediate: true }
  );

  /**
   * 过滤输入：只允许数字和小数点，限制两位小数
   */
  const filterInput = (value: string): string => {
    if (!value) return '';

    // 只保留数字和小数点
    let filtered = value.replace(/[^\d.]/g, '');

    // 只允许一个小数点
    const parts = filtered.split('.');
    if (parts.length > 2) {
      filtered = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // 限制小数点后最多两位
    if (parts.length === 2 && parts[1].length > 2) {
      filtered = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }
    return filtered;
  };

  /**
   * 转换并验证数字（必须大于0，最多两位小数）
   */
  const toNumber = (value: string): number | null => {
    if (value === '' || value === null || value === undefined) {
      return null;
    }

    const num = Number(value);

    // 验证是否为有效数字
    if (isNaN(num)) {
      return null;
    }

    // 验证是否大于0
    if (num <= 0) {
      return null;
    }

    // 保留两位小数（四舍五入）
    return Math.round(num * 100) / 100;
  };

  // 长度输入处理
  const handleLengthInput = (value: string) => {
    displayLength.value = filterInput(value);
  };

  const handleLengthBlur = () => {
    const numValue = toNumber(displayLength.value);
    // 失焦时更新显示值为格式化后的数字
    displayLength.value = numValue !== null ? String(numValue) : '';
    emit('update:length', numValue);
    emit('change', { length: numValue, width: props.width, height: props.height });
  };

  // 宽度输入处理
  const handleWidthInput = (value: string) => {
    displayWidth.value = filterInput(value);
  };

  const handleWidthBlur = () => {
    const numValue = toNumber(displayWidth.value);
    displayWidth.value = numValue !== null ? String(numValue) : '';
    emit('update:width', numValue);
    emit('change', { length: props.length, width: numValue, height: props.height });
  };

  // 高度输入处理
  const handleHeightInput = (value: string) => {
    displayHeight.value = filterInput(value);
  };

  const handleHeightBlur = () => {
    const numValue = toNumber(displayHeight.value);
    displayHeight.value = numValue !== null ? String(numValue) : '';
    emit('update:height', numValue);
    emit('change', { length: props.length, width: props.width, height: numValue });
  };
</script>

<style scoped lang="scss">
  :deep(.sizeinput-left) {
    .el-input__wrapper {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  :deep(.sizeinput-center) {
    .el-input__wrapper {
      border-radius: 0;
    }
  }

  :deep(.sizeinput-right) {
    .el-input__wrapper {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  // 隐藏 number 类型输入框的上下调节器
  :deep(input[type='number']::-webkit-inner-spin-button),
  :deep(input[type='number']::-webkit-outer-spin-button) {
    -webkit-appearance: none;
    margin: 0;
  }
  :deep(input[type='number']) {
    -moz-appearance: textfield;
  }
</style>
