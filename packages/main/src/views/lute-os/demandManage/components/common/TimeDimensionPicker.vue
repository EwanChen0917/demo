<template>
  <div class="time-dimension-selector" style="display: flex; gap: 8px">
    <el-select
      v-model="localParams.timeType"
      placeholder="时间维度"
      style="width: 100px"
      @change="onTimeTypeChange"
      :clearable="allowClear"
    >
      <el-option v-for="opt in options" :key="opt.value" :label="opt.label" :value="opt.value" />
    </el-select>

    <!-- 年 -->
    <el-date-picker
      v-if="localParams.timeType === 1"
      v-model="localParams.date"
      type="year"
      placeholder="选择年份"
      style="width: 120px"
      @change="onDateChange"
    />

    <!-- 季度：年 + 季度 -->
    <template v-if="localParams.timeType === 2">
      <el-date-picker
        v-model="localParams.year"
        type="year"
        placeholder="选择年份"
        style="width: 100px"
      />
      <el-select
        v-model="localParams.quarter"
        placeholder="选择季度"
        style="width: 80px"
        :disabled="!localParams.year"
      >
        <el-option label="Q1" :value="1" />
        <el-option label="Q2" :value="2" />
        <el-option label="Q3" :value="3" />
        <el-option label="Q4" :value="4" />
      </el-select>
    </template>

    <!-- 月 -->
    <el-date-picker
      v-if="localParams.timeType === 3"
      v-model="localParams.date"
      type="month"
      placeholder="选择月份"
      style="width: 120px"
      @change="onDateChange"
    />

    <!-- 日 -->
    <el-date-picker
      v-if="localParams.timeType === 4"
      v-model="localParams.date"
      type="date"
      placeholder="选择日期"
      style="width: 120px"
      @change="onDateChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, toRefs } from 'vue';
  import {
    parseTimeDimensionParams,
    TimeDimensionParams,
  } from '@/views/lute-os/demandManage/utils/timeParams';

  const props = defineProps<{
    modelValue: TimeDimensionParams;
    options?: Array<{ label: string; value: number | null }>;
    allowClear?: boolean;
  }>();
  const emit = defineEmits(['update:modelValue', 'change']);

  const localParams = reactive({
    timeType: props.modelValue?.timeType == null ? 'all' : props.modelValue?.timeType,
    date: props.modelValue?.date ?? null,
    year: props.modelValue?.year ?? null,
    quarter: props.modelValue?.quarter ?? null,
  });

  watch(
    () => props.modelValue,
    (val) => {
      Object.assign(localParams, {
        ...val,
        timeType: val?.timeType == null ? 'all' : val?.timeType,
      });
    },
    { immediate: true }
  );

  function emitIfReady() {
    if ([1, 3, 4].includes(localParams.timeType) && localParams.date) {
      emit('update:modelValue', { ...localParams });
      emit('change', parseTimeDimensionParams(localParams));
    } else if (localParams.timeType === 2 && localParams.year && localParams.quarter) {
      emit('update:modelValue', { ...localParams });
      emit('change', parseTimeDimensionParams(localParams));
    } else if (localParams.timeType === 'all') {
      emit('update:modelValue', { timeType: null });
      emit('change', parseTimeDimensionParams({ timeType: null }));
    }
  }

  function onTimeTypeChange() {
    // 切换类型清空其它
    localParams.date = null;
    localParams.year = null;
    localParams.quarter = null;
    emitIfReady();
  }
  function onDateChange() {
    emitIfReady();
  }

  // 监听季度/年份变化
  watch(
    [() => localParams.year, () => localParams.quarter, () => localParams.timeType],
    ([year, quarter, timeType]) => {
      if (timeType === 2 && year && quarter) {
        emitIfReady();
      }
    }
  );

  defineExpose({
    getValue: () => ({ ...localParams }),
  });
</script>
