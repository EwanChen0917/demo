<template>
  <div class="double-input">
    <div class="double-input-wrapper">
      <span v-if="options.prependIcon" class="prepend-icon">{{ options.prependIcon }}</span>
      <input
        class="double-input-input"
        v-model="minValue"
        :placeholder="options.minPlaceHolder"
        :disabled="disabled"
      />
      <div class="double-input-separator">
        <span>~</span>
      </div>
      <input
        class="double-input-input"
        v-model="maxValue"
        :placeholder="options.maxPlaceHolder"
        :disabled="disabled"
      />
      <span>{{ options.endPlaceHolder }}</span>
    </div>
    <span class="tips">至少填一项</span>
  </div>
</template>

<script setup lang="ts">
  import { useFormItem } from 'element-plus';
  const { formItem } = useFormItem();
  type doubleInput = {
    subOp: '>=' | '<=';
    value: string;
  };
  interface Props {
    modelValue?: doubleInput[];
    options: any;
    clearable?: boolean;
    disabled?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    minPlaceholder: '(含)最小值',
    maxPlaceholder: '(含)最大值',
    disabled: false,
    clearable: true,
  });
  const minValue = ref(props.modelValue?.[0]?.value || '');
  const maxValue = ref(props.modelValue?.[1]?.value || '');
  const emit = defineEmits<{
    'update:modelValue': [value: doubleInput[]];
    change: [value: doubleInput[]];
  }>();
  watch(
    () => props.modelValue,
    (newValue) => {
      formItem?.validate('change');
      if (newValue) {
        minValue.value = newValue[0]?.value || '';
        maxValue.value = newValue[1]?.value || '';
      }
    },
    { deep: true, immediate: true }
  );
  watch([minValue, maxValue], ([min, max]) => {
    // 只有当值真正变化时才 emit（避免空值触发）
    if (min === undefined && max === undefined) return;

    emit('update:modelValue', [
      { subOp: '>=', value: String(min || '') },
      { subOp: '<=', value: String(max || '') },
    ]);
  });
</script>

<style scoped lang="scss">
  .double-input {
    width: 100%;
    display: flex;
    align-items: center;
    .double-input-wrapper {
      width: 100%;
      flex: 1;
      height: 34px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      min-height: 34px;
      padding: 5px 8px;
      background-color: #ffffff;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      box-sizing: border-box;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      cursor: text;
      font-size: 12px;
      .prepend-icon {
        margin: 0 12px 0 7px;
        color: #4e5969;
      }
      .double-input-input {
        flex: 1;
        min-width: 100px;
        height: 100%;
        border: none;
        outline: none;
        background: transparent;
        color: #606266;
        font-size: 13px;
        padding: 0;
        &::placeholder {
          color: #86909c;
        }
      }
      .double-input-separator {
        height: 100%;
        font-size: 12px;
        color: #606266;
        height: 22px;
        line-height: 22px;
        font-size: 20px;
        padding: 0 30px;
      }
    }
    .tips {
      font-size: 12px;
      line-height: 18px;
      padding-left: 15px;
      color: #86909c;
    }
  }
</style>
