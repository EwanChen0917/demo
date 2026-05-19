<template>
  <el-date-picker
    v-model="dataRange"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
    @change="handleChange"
    @blur="handleBlur"
    v-bind="$attrs"
  ></el-date-picker>
</template>
<script setup lang="ts">
  type DateRange = { startTime: string; endTime: string };
  interface Props {
    modelValue: DateRange;
    startPlaceholder?: string;
    endPlaceholder?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({ startTime: '', endTime: '' }),
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
  });
  const emit = defineEmits<{
    'update:modelValue': [value: DateRange];
    change: [value: DateRange];
    blur: [value: DateRange];
  }>();
  const dataRange = computed<[string, string] | null>({
    get: () => {
      const { startTime, endTime } = props.modelValue;
      return startTime && endTime ? ([startTime, endTime] as [string, string]) : null;
    },
    set: (val: [string, string]) => {
      if (val) {
        emit('update:modelValue', { startTime: val[0], endTime: val[1] });
      }
    },
  });
  const handleChange = (value: [string, string] | null) => {
    if(value){
        emit('change',{startTime:value[0],endTime:value[1]})
    }
  };
  const handleBlur = (value: [string, string] | null) => {
    if(value){
        emit('blur',{startTime:value[0],endTime:value[1]})
    }
  };
</script>
<style scoped lang="scss"></style>
