<template>
  <el-date-picker
    ref="pickerRef"
    v-model="week"
    :type="dateType"
    :teleported="false"
    :format="dateType === 'week' ? 'gggg[Week]ww  MM-DD' : 'YYYY-MM'"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import weekYear from 'dayjs/plugin/weekYear';
  import advancedFormat from 'dayjs/plugin/advancedFormat';
  import isoWeek from 'dayjs/plugin/isoWeek';
  import { type DatePickerInstance } from 'element-plus';
  import { calcCurrentWeek } from '../utils';

  dayjs.extend(weekOfYear);
  dayjs.extend(advancedFormat);
  dayjs.extend(isoWeek);
  dayjs.extend(weekYear);

  const props = defineProps<{
    dateType: 'week' | 'month';
  }>();

  const week = defineModel<Date>('modelValue');

  const pickerRef = ref<DatePickerInstance>();
  const handleChange = (value: Date) => {
    const inputInstance = pickerRef.value?.$el.nextElementSibling.querySelector('input');
    if (!inputInstance) return;
    if (props.dateType === 'week') {
      const { year, weekNum, lastDay } = calcCurrentWeek(value);
      inputInstance.value = `${year}Week${weekNum} ${dayjs(lastDay).format('MM-DD')}`;
    }
  };
</script>
