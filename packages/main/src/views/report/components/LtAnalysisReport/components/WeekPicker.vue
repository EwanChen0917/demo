<template>
  <template v-if="dateType === 'month'">
    <el-date-picker
      ref="pickerRef"
      v-model="week"
      :type="dateType"
      value-format="YYYY-MM"
      :teleported="false"
    />
  </template>
  <template v-else>
    <el-select :teleported="false" v-model="week">
      <el-option v-for="item in weekList" :key="item.week" :label="item.week" :value="item.week!" />
    </el-select>
  </template>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import weekYear from 'dayjs/plugin/weekYear';
  import advancedFormat from 'dayjs/plugin/advancedFormat';
  import isoWeek from 'dayjs/plugin/isoWeek';
  import { type MpcWeeklyReportContracts } from '@/api';
  import { getWeekList } from '../utils';

  dayjs.extend(weekOfYear);
  dayjs.extend(advancedFormat);
  dayjs.extend(isoWeek);
  dayjs.extend(weekYear);

  const props = defineProps<{
    dateType: 'week' | 'month';
  }>();

  const week = defineModel<string>('modelValue');
  const weekList = ref<MpcWeeklyReportContracts.WeekBean[]>([]);
  if (props.dateType === 'week') {
    getWeekList().then((res) => {
      weekList.value = res || [];
      week.value = week.value || res?.[0].week || '';
    });
  } else {
    week.value = week.value || dayjs().format('YYYY-MM');
  }
</script>

<style lang="scss" scoped>
  .el-select {
    width: 279px !important;
  }
</style>
