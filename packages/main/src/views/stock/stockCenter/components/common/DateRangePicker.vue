<template>
  <el-date-picker
    :model-value="dateRangeValue"
    type="daterange"
    range-separator="至"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    :style="{ width: width }"
    @update:model-value="handleUpdate"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import dayjs from 'dayjs';

  // ==================== 类型定义 ====================
  export interface DateRangePickerProps {
    startDate?: string | null;
    endDate?: string | null;
    startPlaceholder?: string;
    endPlaceholder?: string;
    width?: string;
    outputDateOnly?: boolean;
  }

  export interface DateRangePickerEmits {
    (event: 'update:startDate', value: string | null): void;
    (event: 'update:endDate', value: string | null): void;
  }

  // ==================== Props & Emits ====================
  const props = withDefaults(defineProps<DateRangePickerProps>(), {
    startDate: null,
    endDate: null,
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    width: '300px',
    outputDateOnly: false,
  });

  const emit = defineEmits<DateRangePickerEmits>();

  // ==================== 工具函数 ====================
  // 将 YYYY-MM-DD-HH-mm-ss 格式转换为 YYYY-MM-DD 格式（用于 el-date-picker 显示）
  const parseDateForDisplay = (dateStr: string | null): string | null => {
    if (!dateStr) return null;
    // 如果已经是 YYYY-MM-DD 格式，直接返回
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
    // 如果是 YYYY-MM-DD-HH-mm-ss 格式，提取日期部分
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/)) {
      return dateStr.substring(0, 10);
    }
    return null;
  };

  // 将 YYYY-MM-DD 格式转换为 YYYY-MM-DD-HH-mm-ss 格式
  const formatDateForOutput = (dateStr: string | null, isEndDate = false): string | null => {
    if (!dateStr) return null;

    let date = dayjs(dateStr);
    if (!date.isValid()) return null;

    if (isEndDate) {
      date = date.endOf('day');
    } else {
      date = date.startOf('day');
    }

    return date.format('YYYY-MM-DD-HH-mm-ss');
  };

  // ==================== 计算属性 ====================
  const dateRangeValue = computed(() => {
    if (!props.startDate && !props.endDate) return null;

    const startDisplay = parseDateForDisplay(props.startDate);
    const endDisplay = parseDateForDisplay(props.endDate);

    return [startDisplay || '', endDisplay || ''] as [string, string];
  });

  // ==================== 方法 ====================
  const handleUpdate = (value: [string, string] | null) => {
    if (value && value.length === 2) {
      let startDateFormatted: string | null;
      let endDateFormatted: string | null;

      if (props.outputDateOnly) {
        startDateFormatted = value[0] || null;
        endDateFormatted = value[1] || null;
      } else {
        startDateFormatted = formatDateForOutput(value[0], false);
        endDateFormatted = formatDateForOutput(value[1], true);
      }

      if (startDateFormatted !== props.startDate) {
        emit('update:startDate', startDateFormatted);
      }
      if (endDateFormatted !== props.endDate) {
        emit('update:endDate', endDateFormatted);
      }
    } else {
      emit('update:startDate', null);
      emit('update:endDate', null);
    }
  };
</script>
