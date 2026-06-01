<template>
  <el-select
    :model-value="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    :disabled="disabled"
    :size="size"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
    :max-collapse-tags="maxCollapseTags"
    @update:model-value="handleChange"
    @clear="handleClear"
    @visible-change="handleVisibleChange"
  >
    <el-option
      v-for="item in options"
      :key="item.warehouseCode"
      :label="item.warehouseName"
      :value="item.warehouseCode"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script lang="ts" setup>
  // ==================== 类型定义 ====================
  interface SelectOption {
    warehouseName: string;
    warehouseCode: string | number;
    disabled?: boolean;
  }

  interface Props {
    /** 选中的值 */
    modelValue?: string | number | Array<string | number> | null;
    /** 选项列表 */
    options?: SelectOption[];
    /** 占位文本 */
    placeholder?: string;
    /** 是否可清空 */
    clearable?: boolean;
    /** 是否多选 */
    multiple?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 组件尺寸 */
    size?: 'large' | 'default' | 'small';
    /** 是否可搜索 */
    filterable?: boolean;
    /** 多选时是否折叠标签 */
    collapseTags?: boolean;
    /** 多选时是否显示标签提示 */
    collapseTagsTooltip?: boolean;
    /** 多选时最多显示的标签数 */
    maxCollapseTags?: number;
  }

  // ==================== Props ====================
  const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    placeholder: '请选择',
    clearable: true,
    multiple: false,
    disabled: false,
    size: 'default',
    filterable: true,
    collapseTags: true,
    collapseTagsTooltip: true,
    maxCollapseTags: 1,
    options: () => [],
  });

  // ==================== Emits ====================
  interface Emits {
    (e: 'update:modelValue', value: string | number | Array<string | number> | null): void;
    (e: 'change', value: string | number | Array<string | number> | null): void;
    (e: 'clear'): void;
    (e: 'visible-change', visible: boolean): void;
  }

  const emit = defineEmits<Emits>();

  // ==================== 事件处理 ====================
  /**
   * 值变化处理
   */
  const handleChange = (value: string | number | Array<string | number> | null) => {
    emit('update:modelValue', value);
    emit('change', value);
  };

  const handleClear = () => {
    emit('clear');
  };

  const handleVisibleChange = (visible: boolean) => {
    emit('visible-change', visible);
  };
</script>

<style scoped lang="scss"></style>
