<template>
  <div class="prepend-wrapper">
    <el-select
      v-model="localOperator"
      style="width: 60px; height: 100%"
      :validate-event="false"
      :disabled="disabled"
    >
      <el-option v-for="item in operatorOptions" :value="item.value" :label="item.label" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    operator: string;
    operatorOptions: any[];
    disabled?: boolean;
  }
  const props = defineProps<Props>();
  const localOperator = ref(props.operator);
  const emit = defineEmits<{
    'update:operator': [value: any];
  }>();
  watch(localOperator, (newVal) => {
    emit('update:operator', newVal);
  });
</script>

<style scoped lang="scss">
  .prepend-wrapper {
    width: 90px;
    display: flex;
    height: auto;
    align-items: flex-start;
    :deep(.el-select) {
      min-width: 90px !important;
    }
    :deep(.el-select__wrapper) {
      height: 100%;
      min-height: 32px;
      border-radius: 6px 0 0 6px;
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }
    :deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }
  }
</style>
