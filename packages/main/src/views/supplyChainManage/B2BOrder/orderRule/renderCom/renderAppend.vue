<template>
  <el-checkbox v-model="checked" style="margin-left: 10px;" :disabled="disabled">
      {{ label }}
  </el-checkbox>
</template>

<script setup lang="ts">
  interface Props {
    /**
     * 外部传入的数组（必传，支持 v-model）
     */
    modelValue: (string | number)[];
    /**
     * 选中时要塞入数组的值
     */
    value: string | number;
    label: string;
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'update:modelValue', val: (string | number)[]): void;
    (e: 'change', val: (string | number)[]): void;
  }>();

  const checked = computed({
    get() {
      const list = props.modelValue || [];
      return list.includes(props.value);
    },
    set(val: boolean) {
      let next: (string | number)[] = [];
      if (val) {
        // 选中：数组只保留当前这个值（单选语义）
        next = [props.value];
      } else {
        // 取消选中：清空数组
        next = [];
      }
      emit('update:modelValue', next);
      emit('change', next);
    },
  });
</script>
