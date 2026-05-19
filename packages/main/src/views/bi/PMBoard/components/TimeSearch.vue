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
    <div class="week-picker" v-if="timeSearchType === 'weekrange'">
      <el-select
        placeholder="开始周"
        v-model="weekStart"
        ref="weekStartSelect"
        @change="handleChangeWeekStart"
      >
        <el-option
          v-for="(option, index) in weekOptions"
          :key="option"
          :value="index"
          :label="option"
        />
      </el-select>
      <el-select
        placeholder="结束周"
        v-model="weekEnd"
        ref="weekEndSelect"
        @change="handleChangeWeekEnd"
      >
        <el-option
          v-for="(option, index) in weekOptions"
          :key="option"
          :value="index"
          :disabled="index > weekStart"
          :label="option"
        />
      </el-select>
    </div>
    <el-date-picker
      v-else
      class="time-picker"
      :class="`time-picker--${timeSearchType}`"
      popper-class="bi-time-picker-popper"
      v-model="time"
      :type="timeSearchType"
      placeholder="日期"
      :value-format="timeSearchType === 'yearrange' ? 'YYYY' : 'YYYY-MM'"
      :format="timeSearchType === 'yearrange' ? 'YYYY' : 'YYYY-MM'"
      :clearable="false"
      :disabledDate="
        (data) => {
          const today = dayjs(updateDate);
          return today.isBefore(dayjs(data), 'month');
        }
      "
      @change="changeTime"
    />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';

  const props = defineProps<{
    updateDate: string;
    weekOptions?: string[];
  }>();
  const emit = defineEmits<{
    change: [[string, string], 'month' | 'year' | 'week'];
    'update:time': [[string, string], 'month' | 'year' | 'week'];
  }>();
  const timeOptions = ref([
    { label: '周', value: 'weekrange' },
    { label: '月', value: 'monthrange' },
    { label: '年', value: 'yearrange' },
  ] as const);
  const time = ref<string | [string, string]>([
    dayjs(props.updateDate).format('YYYY-MM'),
    dayjs(props.updateDate).format('YYYY-MM'),
  ]);
  const timeSearchType = ref<(typeof timeOptions.value)[number]['value']>('monthrange');
  const monthChange = {
    dimention() {
      time.value = dayjs(props.updateDate).format('YYYY-MM');
      this.change(time.value);
    },
    change(val: string) {
      emit('update:time', [val, val], 'month');
      nextTick(() => {
        emit('change', [val, val], 'month');
      });
    },
  };
  const yearChange = {
    dimention() {
      time.value = dayjs(props.updateDate).format('YYYY');
      this.change(time.value);
    },
    change(val: string) {
      emit('update:time', [val, val], 'year');
      nextTick(() => {
        emit('change', [val, val], 'year');
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
      emit('update:time', val, 'month');
      nextTick(() => {
        emit('change', val, 'month');
      });
    },
  };
  const yearRangeChange = {
    dimention() {
      const year = dayjs(props.updateDate).format('YYYY');
      time.value = [year, year];
      this.change(time.value);
    },
    change(val: [string, string]) {
      emit('update:time', val, 'year');
      nextTick(() => {
        emit('change', val, 'year');
      });
    },
  };
  const weekRangeChange = {
    dimention() {
      if (props.weekOptions && props.weekOptions.length) {
        time.value = [props.weekOptions[0], props.weekOptions[0]];
        weekStart.value = 0;
        weekEnd.value = 0;
        this.change([props.weekOptions[0], props.weekOptions[0]]);
      }
    },
    change(val: [string, string]) {
      emit('update:time', val, 'week');
      nextTick(() => {
        emit('change', val, 'week');
      });
    },
  };
  const dimentionMap = {
    month: monthChange,
    year: yearChange,
    monthrange: monthRangeChange,
    yearrange: yearRangeChange,
    weekrange: weekRangeChange,
  };
  const changeTimeDimension = (val: (typeof timeOptions.value)[number]['value']) => {
    dimentionMap[val]?.dimention();
  };
  const changeTime = (val: [string, string]) => {
    dimentionMap[timeSearchType.value]?.change(val as any);
  };

  const weekStartSelect = ref();
  const weekEndSelect = ref();
  const weekStart = ref<number>(0);
  const weekEnd = ref<number>(0);
  const handleChangeWeekStart = (val: number) => {
    if (weekEnd.value && weekEnd.value < val) {
      weekEnd.value = val;
    }
    emit('update:time', [props.weekOptions![val], props.weekOptions![weekEnd.value]], 'week');
    nextTick(() => {
      emit('change', [props.weekOptions![val], props.weekOptions![weekEnd.value]], 'week');
    });
  };
  const handleChangeWeekEnd = (val: number) => {
    if (weekStart.value && weekStart.value > val) {
      weekStart.value = val;
    }
    emit('update:time', [props.weekOptions![weekStart.value], props.weekOptions![val]], 'week');
    nextTick(() => {
      emit('change', [props.weekOptions![weekStart.value], props.weekOptions![val]], 'week');
    });
  };
  const reset = () => {
    timeSearchType.value = 'monthrange';
    dimentionMap.monthrange?.dimention();
  };
  defineExpose({
    reset,
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
  :deep(.time-picker) {
    transform: translateX(-1px);
    width: 146px;
    &.time-picker--monthrange {
      width: 200px;
    }
    .el-input__wrapper {
      border-radius: 0px 6px 6px 0px;
    }
  }
  :deep(.week-picker) {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    transform: translateX(-1px);
    box-sizing: border-box;
    height: 32px;
    border-radius: 0 6px 6px 0;
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
    &:focus-within {
      --el-border-color: var(--el-color-primary);
    }
    .el-select {
      width: 148px;
      box-sizing: border-box;
      height: 30px;
      padding: 1px;
      .el-select__wrapper {
        height: 28px;
        min-height: unset;
        border-radius: 0px;
        border: none;
        box-shadow: none;
      }
    }
  }
  :global(.bi-time-picker-popper .el-date-range-picker) {
    width: 646px;
  }
</style>
