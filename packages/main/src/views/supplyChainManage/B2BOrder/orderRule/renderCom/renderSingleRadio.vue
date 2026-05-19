<template>
  <div class="radio-wrapper">
    <el-radio-group v-model="localValue" class="radio-group" :disabled="disabled">
      <el-radio v-for="(item, index) in options" :key="index" :value="index">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
  type radioValue = {
    desc?: string;
    value?: any;
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

  const isValueObject = (val: any): boolean => {
    return val && typeof val === 'object' && 'desc' in val && 'value' in val;
  };

  const matchOptionIndex = (): number | undefined => {
    if (!props.modelValue?.[0] || !props.options?.length) return undefined;
    const currentValue = props.modelValue[0];
    if (isValueObject(currentValue)) {
      return props.options.findIndex((opt) => {
        if (isValueObject(opt.value)) {
          return opt.value.desc === currentValue.desc && opt.value.value === currentValue.value;
        }
        return false;
      });
    }
    return props.options.findIndex((opt) => {
      if (isValueObject(opt.value)) {
        return opt.value.value === currentValue;
      }
      return opt.value === currentValue;
    });
  };

  const localValue = ref<number | undefined>(matchOptionIndex());

  const emit = defineEmits<{
    'update:modelValue': [value: radioValue[]];
  }>();

  watch(localValue, (newIndex) => {
    if (newIndex === undefined || newIndex === -1 || !props.options?.[newIndex]) return;
    const selectedOption = props.options[newIndex];
    if (isValueObject(selectedOption.value)) {
      emit('update:modelValue', [selectedOption.value]);
    } else {
      emit('update:modelValue', [{ value: selectedOption.value }]);
    }
  });

  watch(
    () => props.modelValue,
    () => {
      const matchedIndex = matchOptionIndex();
      if (matchedIndex !== undefined && matchedIndex !== -1) {
        localValue.value = matchedIndex;
      } else {
        localValue.value = undefined;
      }
    },
    {
      deep: true,
    }
  );

  watch(
    () => props.options,
    () => {
      const matchedIndex = matchOptionIndex();
      if (matchedIndex !== undefined && matchedIndex !== -1) {
        localValue.value = matchedIndex;
      }
    },
    {
      deep: true,
    }
  );
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
