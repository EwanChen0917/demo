<template>
  <div class="double-select-wrapper" :class="{ 'has-prepend': prepend }">
    <el-select
      :validate-event="true"
      :disabled="disabled"
      clearable
      filterable
      collapse-tags
      collapse-tags-tooltip
      class="rule-inner-select"
      :max-collapse-tags="10"
      multiple
      allow-selected-option-wrap
      v-model="localList"
      :options="options"
    />
    <span class="tips">已选{{ localList.length }}项</span>
  </div>
</template>

<script setup lang="ts">
  import { useFormItem } from 'element-plus';
  const { formItem } = useFormItem();
  interface Props {
    modelValue?: any[];
    options?: any[];
    prepend?: boolean;
    disabled?: boolean;
  }
  const props = defineProps<Props>();
  const localList = ref(props.modelValue || []);
  const emit = defineEmits<{
    'update:modelValue': [value: any];
  }>();
  watch(
    localList,
    (newVal) => {
      emit('update:modelValue', newVal);
      formItem?.validate('blur');
    },
    {
      deep: true,
    }
  );
  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal !== localList.value) {
        localList.value = newVal || [];
      }
    },
    {
      deep: true,
    }
  );
</script>

<style scoped lang="scss">
  :deep(.el-select) {
    height: auto !important;
  }
  :deep(.el-select__selection) {
    height: auto !important;
  }
  .double-select-wrapper {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    align-items: flex-start;
    :deep(.el-select__wrapper) {
      border-radius: 6px;
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }
    :deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }

    :deep(.el-select) {
      min-width: 90px !important;
    }
    .rule-inner-select {
      flex: 1;
      :deep(.el-select__wrapper) {
        height: auto;
        min-height: 32px;
        align-items: flex-start;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 6px;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
      }
      :deep(.el-select__selection) {
        flex-wrap: wrap;
      }
      :deep(.el-select__suffix) {
        align-self: center;
      }
    }

    &.has-prepend {
      :deep(.el-select__wrapper) {
        border-radius: 0 6px 6px 0;
      }
      .rule-inner-select {
        :deep(.el-select__wrapper) {
          border-radius: 0 6px 6px 0;
        }
      }
    }
  }
  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
    font-size: 12px;
    padding-left: 15px;
  }
</style>
