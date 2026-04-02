<template>
  <input
    class="base-input"
    :class="{ 'is-disabled': disabled }"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "",
  disabled: false,
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

function handleInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<style scoped lang="scss">
.base-input {
  display: inline-block;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}

.base-input:focus {
  border-color: #409eff;
}

.base-input.is-disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
  color: #c0c4cc;
}
</style>
