<template>
    <div class="double-input-wrapper">
        <input class="double-input-input" v-model="minValue">
        <div class="double-input-separator">
            <span>~</span>
        </div>
        <input class="double-input-input" v-model="maxValue">
        <span>小时</span>
    </div>
</template>
<script setup lang="ts">

type doubleInput ={
    subOp:'>='| "<=",
    value:string
}
interface Props {
    modelValue?: doubleInput[],
    minPlaceholder?: string,
    maxPlaceholder?: string,
    disabled?: boolean,
    clearable?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    minPlaceholder: '(含)最小值',
    maxPlaceholder: '(含)最大值',
    disabled: false,
    clearable: true,
})
const minValue = ref(props.modelValue?.[0]?.value || '');
const maxValue = ref(props.modelValue?.[1]?.value || '');
const emit = defineEmits<
    {
        'update:modelValue': [value: doubleInput[]],
        'change': [value: doubleInput[]]
    }
>()
watch(
  () => props.modelValue,
  (newValue) => {
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
    { subOp: '<=', value: String(max || '') }
  ]);
});
</script>
<style scoped lang="scss">
.double-input-wrapper {
    width: 100%;
    height: 34px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    // gap: 4px;
    // flex: 1;
    min-height: 34px;
    padding: 5px 8px;
    background-color: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: text;
    font-size: 12px;
    .double-input-input {
        flex: 1;
        min-width: 100px;
        height: 100%;
        // line-height: 30px;
        border: none;
        outline: none;
        background: transparent;
        color: #606266;
        font-size: 13px;
        padding: 0;
    }
    .double-input-separator {
        height: 100%;
        // line-height: 30px;
        font-size: 12px;
        color: #606266;
        height: 22px;
        line-height: 22px;
        font-size: 20px;
        padding: 0 30px;
    }
}
</style>