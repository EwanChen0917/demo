<template>
  <div class="double-select-wrapper">
    <el-cascader
      :validate-event="true"
      clearable
      filterable
      :disabled="disabled"
      :props="{
        expandTrigger: 'hover',
        multiple: true,
        checkStrictly: false,
        emitPath: false, // 只返回最后一级的值
        // checkStrictly: true, // 可选：是否可以选择任意一级
      }"
      style="width: 100%"
      show-checked-strategy="child"
      :max-collapse-tags="showTags"
      :placeholder="placeholder"
      collapse-tags
      collapse-tags-tooltip
      v-model="localList"
      :options="options"
    />
    <span class="tips">已选{{ localList.length }}项</span>
  </div>
</template>
<script setup lang="ts">
  interface Props {
    modelValue?: any[];
    options?: any[];
    prepend?: boolean;
    placeholder?: string;
    maxCollapseTags?: number
    disabled?: boolean;
  }
  const props = defineProps<Props>();
  const localList = ref(props.modelValue || []);
  const showTags = ref(props.maxCollapseTags || 2);
  const emit = defineEmits<{
    'update:modelValue': [value: any];
  }>();
  watch(
    localList,
    (newVal) => {
      emit('update:modelValue', newVal);
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
  .double-select-wrapper {
    display: flex;
    flex: 1;
    :deep(.el-select__wrapper) {
      border-radius: 0px 6px 6px 0px;
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
        border-radius: 0 6px 6px 0;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
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
