<template>
  <div class="double-select-wrapper" :class="{ 'has-prepend': prepend }">
    <el-select
      :disabled="disabled"
      :validate-event="true"
      clearable
      filterable
      class="rule-inner-select"
      v-model="localList"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modelValue?: any;
    options?: any[];
    prepend?: boolean;
    disabled?: boolean;
  }
  const props = defineProps<Props>();
  const localList = ref(props.modelValue || '');
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
        localList.value = newVal || '';
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
