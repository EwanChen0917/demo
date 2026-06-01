<template>
  <div class="input-wrapper" ref="wrapperRef">
    <div :class="expandClass">
      <el-input
        v-model="localValue"
        type="textarea"
        :rows="expand ? maxRow : minRow"
        @blur="handleLengthBlur"
        @click="handleClickExpand"
        :placeholder="placeholder"
        :maxlength="maxlength"
      />
      <div class="input-footer" v-show="expand">
        <el-button type="primary" @click="handleConfirm">{{ confiremText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';

  interface Props {
    // 值
    value?: string;
    // 确认按钮
    confiremText?: string;
    // 文本占位符
    placeholder?: string;
    // 最大长度
    maxlength?: number;
    // 最大列长度
    maxRow?: number;
    // 最小列，不低于1
    minRow?: number;
  }
  interface Emits {
    (e: 'update:value', value: string | null): void;
    (e: 'confirm'): void;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: '',
    confiremText: '确认',
    placeholder: '请输入',
    maxlength: 100,
    maxRow: 6,
    minRow: 3,
  });
  const emit = defineEmits<Emits>();
  const localValue = ref<string>(props.value);
  const expand = ref<Boolean>(false);
  const wrapperRef = ref<HTMLElement | null>(null);
  const expandClass = computed(() => {
    return expand.value ? 'expand-content' : 'unexpand-content';
  });
  watch(
    () => props.value,
    (val) => {
      localValue.value = val !== null && val !== undefined ? String(val) : '';
    },
    { immediate: true }
  );
  onClickOutside(wrapperRef, () => {
    expand.value = false;
  });
  const handleLengthBlur = () => {
    emit('update:value', localValue.value);
  };
  const handleClickExpand = () => {
    expand.value = true;
  };
  const handleConfirm = () => {
    emit('confirm');
    expand.value = false;
  };
</script>

<style scoped lang="scss">
  .input-wrapper {
    position: relative;
    width: 400px;
    min-height: 70px;
  }
  .unexpand-content,
  .expand-content {
    width: 100%;
    position: absolute;
    top: -5px;
    left: 0;
    transition: all 0.3s ease-in-out;
    z-index: 10;
  }
  .expand-content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    z-index: 10;

    :deep(.el-textarea__inner) {
      min-height: 220px !important;
      transition: min-all 0.3s ease-in-out;
      resize: none;
    }
  }
  .unexpand-content {
    padding: 10px;
    :deep(.el-textarea__inner) {
      min-height: 32px;
      //   max-height: 32px;
      //   overflow: hidden;
      resize: none;
    }
  }
  .input-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  // v-show 为 false 时会自动添加 display: none，
  // 但我们可以用 v-enter/v-leave 让动画更平滑
</style>
