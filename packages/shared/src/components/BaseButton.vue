<template>
  <button
    class="base-button"
    :class="[`base-button--${type}`, `base-button--${size}`, { 'is-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
});

const emit = defineEmits<{ click: [event: MouseEvent] }>();

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}

.base-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button--primary {
  background-color: #409eff;
  color: #fff;
}

.base-button--default {
  background-color: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.base-button--danger {
  background-color: #f56c6c;
  color: #fff;
}

.base-button--small {
  padding: 4px 12px;
  font-size: 12px;
}

.base-button--medium {
  padding: 8px 16px;
}

.base-button--large {
  padding: 12px 20px;
  font-size: 16px;
}
</style>
