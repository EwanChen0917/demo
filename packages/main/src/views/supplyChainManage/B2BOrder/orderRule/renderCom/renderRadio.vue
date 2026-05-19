<template>
  <div class="radio-wrapper">
    <el-radio-group v-model="localValue" class="radio-group" :disabled="disabled">
      <el-radio 
        v-for="item in options" 
        :key="item.value" 
        :value="item.value"
      >
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">

 type radioValue = {
    subOp: '==';
    desc: string | undefined;
    value: string | undefined;
  };

  interface Option {
    label: string;
    value: any;
  }

  interface Props {
    modelValue?: radioValue[];
    options?: Option[];
    disabled?: boolean;
  }

  const props = defineProps<Props>();
  const localValue = ref(props.modelValue[0]?.value || '');

  const emit = defineEmits<{
    'update:modelValue': [value: radioValue[]];
  }>();

  watch(localValue, (newVal) => {
    const label = props.options?.find(radioItem => radioItem.value == newVal)?.label
    emit('update:modelValue', [
      {subOp: '==', desc: label, value: newVal}
    ]);
  });

  watch(() => props.modelValue, (newVal) => {
    localValue.value = newVal[0]?.value || '';
  },{
    deep: true
  });
</script>

<style scoped lang="scss">
  .radio-wrapper {
    display: flex;
    flex: 1;
    align-items: center;

    .radio-group {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      :deep(.el-radio) {
        margin-right: 0;
        
        .el-radio__label {
          font-size: 12px;
          color: #1f1f1f;
        }
      }

      :deep(.el-radio.is-checked) {
        .el-radio__label {
          color: var(--el-color-primary);
        }
      }
    }
  }
</style>

