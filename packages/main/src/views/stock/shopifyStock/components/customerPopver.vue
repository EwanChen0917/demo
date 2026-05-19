<template>
  <el-popover placement="right" :width="width" :disabled="disabled" @show="onShow" @hide="onHide">
    <div style="padding: 12px">
      <el-table :data="data" :show-header="false" border max-height="200">
        <el-table-column prop="name" min-width="220" />
      </el-table>
    </div>
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const data = [];
  interface Props {
    trigger?: 'click' | 'hover' | 'focus' | 'contextmenu';
    placement?: string;
    width?: string | number;
    disabled?: boolean;
    modelValue?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    trigger: 'hover',
    placement: 'bottom',
    width: 200,
    disabled: false,
    modelValue: false,
  });
  const emit = defineEmits<{
    (e: 'update:modelValue', val: boolean): void;
    (e: 'show'): void;
    (e: 'hide'): void;
  }>();
  const innerVisible = computed({
    get: () => props.modelValue,
    set: (value: boolean) => {
      emit('update:modelValue', value);
    },
  });
  const onShow = () => {
    emit('show');
  };
  const onHide = () => {
    emit('hide');
  };
</script>

<style scoped lang="scss"></style>
