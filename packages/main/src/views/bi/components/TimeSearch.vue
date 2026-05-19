<template>
  <div>
    <!-- 时间类型选择 -->
    <el-select
      class="time-search-type"
      v-model="timeSearchType"
      placeholder="时间维度"
      @change="changeTimeDimension"
    >
      <el-option
        v-for="option in timeOptions"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </el-select>
    <!-- 时间选择 -->
    <template v-if="timeSearchType === 'week'">
      <el-select class="time-picker" v-model="time" @change="changeTime">
        <el-option v-for="option in weekOptions" :key="option" :label="option" :value="option" />
      </el-select>
    </template>
    <template v-if="timeSearchType === 'weekrange'">
      <el-select
        class="time-picker"
        v-model="time"
        :options="(weekOptions || []).map(x=>({ label: x, value: x }))"
        placeholder="周范围"
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="changeTime"
      />
    </template>
    <template v-else-if="!['week', 'weekrange'].includes(timeSearchType)">
      <el-date-picker
        class="time-picker"
        :class="`time-picker--${timeSearchType}`"
        popper-class="bi-time-picker-popper"
        v-model="time"
        :type="timeSearchType"
        placeholder="日期"
        :value-format="timeSearchType === 'year' ? 'YYYY' : 'YYYY-MM'"
        :format="timeSearchType === 'year' ? 'YYYY' : 'YYYY-MM'"
        :clearable="false"
        :disabledDate="
          (data) => {
            const today = dayjs(updateDate);
            return today.isBefore(dayjs(data), 'month');
          }
        "
        @change="changeTime"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';

  const props = withDefaults(
    defineProps<{
      updateDate: string;
      defaultTime?: string | [string, string];
      weekOptions?: string[];
      defaultType?: 'week' | 'weekrange' | 'month' | 'year' | 'monthrange';
      timeOptions?: {
        label: string;
        value: 'week' | 'weekrange' | 'month' | 'year' | 'monthrange';
      }[];
    }>(),
    {
      defaultType: 'month',
      timeOptions: () =>
        [
          { label: '月', value: 'month' },
          { label: '年', value: 'year' },
          { label: '自定义', value: 'monthrange' },
        ] as const,
    }
  );
  const emit = defineEmits<{
    change: [time: [string, string], dataType: string];
    'update:time': [time: [string, string], dataType: string];
  }>();
  const time = ref<string | [string, string]>(
    props.defaultTime ||
      (props.defaultType.includes('range')
        ? [dayjs(props.updateDate).format('YYYY-MM'), dayjs(props.updateDate).format('YYYY-MM')]
        : dayjs(props.updateDate).format('YYYY-MM'))
  );
  const timeSearchType = ref<(typeof props.timeOptions)[number]['value']>(props.defaultType);
  const weekChange = {
    dimention() {
      time.value = props.weekOptions?.[0] || '';
      this.change(time.value);
    },
    change(val: string) {
      emit('update:time', [val, val], timeSearchType.value);
      nextTick(() => {
        emit('change', [val, val], timeSearchType.value);
      });
    },
  };
  const monthChange = {
    dimention() {
      time.value = dayjs(props.updateDate).format('YYYY-MM');
      this.change(time.value);
    },
    change(val: string) {
      emit('update:time', [val, val], timeSearchType.value);
      nextTick(() => {
        emit('change', [val, val], timeSearchType.value);
      });
    },
    reset() {
      time.value = dayjs(props.updateDate).format('YYYY-MM');
      this.change(time.value);
    },
  };
  const yearChange = {
    dimention() {
      time.value = dayjs(props.updateDate).format('YYYY');
      this.change(time.value);
    },
    change(val: string) {
      const selectedYear = dayjs(val).year();
      const currentYear = dayjs(props.updateDate).year();
      const startMonth = dayjs(val).startOf('year').format('YYYY-MM');
      let endMonth = '';
      if (selectedYear < currentYear) {
        endMonth = dayjs(val).endOf('year').format('YYYY-MM');
      } else if (selectedYear === currentYear) {
        endMonth = dayjs(props.updateDate).format('YYYY-MM');
      }
      emit('update:time', [startMonth, endMonth], timeSearchType.value);
      nextTick(() => {
        emit('change', [startMonth, endMonth], timeSearchType.value);
      });
    },
  };
  const weekRangeChange = {
    dimention() {
      const week = props.weekOptions?.[0] || '';
      time.value = [week];
      this.change(time.value);
    },
    change(val: string[]) {
      if (val.length === 0) {
        time.value = [props.weekOptions?.[0] || ''];
        val = time.value as string[];
      }
      emit('update:time', val, timeSearchType.value);
      nextTick(() => {
        emit('change', val, timeSearchType.value);
      });
    },
  };
  const monthRangeChange = {
    dimention() {
      const month = dayjs(props.updateDate).format('YYYY-MM');
      time.value = [month, month];
      this.change(time.value);
    },
    change(val: [string, string]) {
      emit('update:time', val, timeSearchType.value);
      nextTick(() => {
        emit('change', val, timeSearchType.value);
      });
    },
  };
  const dimentionMap = {
    week: weekChange,
    month: monthChange,
    year: yearChange,
    weekrange: weekRangeChange,
    monthrange: monthRangeChange,
  };
  const changeTimeDimension = (val: (typeof props.timeOptions)[number]['value']) => {
    dimentionMap[val]?.dimention();
  };
  const changeTime = (val: string | [string, string]) => {
    dimentionMap[timeSearchType.value]?.change(val as any);
  };
  const reset = () => {
    dimentionMap[timeSearchType.value]?.dimention();
  };
  const resetToMonth = () => {
    timeSearchType.value = 'month';
    time.value = dayjs(props.updateDate).format('YYYY-MM');
  };
  defineExpose({
    reset,
    resetToMonth,
  });
</script>

<style lang="scss" scoped>
  .time-search-type {
    width: auto;
    border-radius: 6px 0px 0px 6px;
    background: #fff;
    &:focus-within {
      z-index: 1;
    }
    :deep(.el-select__wrapper) {
      border-radius: 6px 0px 0px 6px;
      background: #fff;
      .el-select__placeholder {
        position: static;
        transform: none;
      }
    }
  }
  :deep(.el-select__wrapper) {
    border-radius: 0px 6px 6px 0px;
    background: #fff;
    .el-select__placeholder {
      position: static;
      transform: none;
    }
  }
  :deep(.time-picker) {
    transform: translateX(-1px);
    width: 163px;
    border-radius: 0px 6px 6px 0px;
    &.time-picker--monthrange {
      width: 200px;
    }
    .el-input__wrapper,
    .el-select__wrapper {
      border-radius: 0px 6px 6px 0px;
    }
  }
  :global(.bi-time-picker-popper .el-date-range-picker) {
    width: 646px;
  }
</style>
