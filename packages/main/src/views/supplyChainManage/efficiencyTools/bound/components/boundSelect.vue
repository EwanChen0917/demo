<template>
  <el-select
    style="width: auto; min-width: 200px"
    :model-value="internalValue"
    @update:model-value="handleChange"
    :multiple="multiple"
    v-bind="$attrs"
    filterable
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="1"
    clearable
  >
    <el-option
      v-for="item in options"
      :key="item[optionKey]"
      :label="item[optionLabel]"
      :value="item[optionValue]"
    />
  </el-select>
</template>

<script lang="ts" setup>
  interface Props {
    modelValue?: string; // 单选：'value1'，多选：'value1,value2,value3'
    options?: any;
    multiple?: boolean;
    optionKey?: string;
    optionLabel?: string;
    optionValue?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    multiple: false,
    optionKey: 'id',
    optionLabel: 'label',
    optionValue: 'value',
    options: [''],
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string | undefined];
  }>();

  // 将外部的字符串值转换为内部使用的值
  const internalValue = computed(() => {
    if (!props.modelValue) return props.multiple ? [] : '';

    if (props.multiple) {
      // 多选：将逗号分隔的字符串转为数组
      return props.modelValue.split(',').filter((v) => v);
    } else {
      // 单选：直接返回字符串
      return props.modelValue;
    }
  });

  // 处理值变化
  const handleChange = (value: any) => {
    if (props.multiple) {
      // 多选：将数组转为逗号分隔的字符串
      const result = Array.isArray(value) ? value.join(',') : '';
      emit('update:modelValue', result || undefined);
    } else {
      // 单选：直接传出字符串
      emit('update:modelValue', value || undefined);
    }
  };
</script>
