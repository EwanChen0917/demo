<template>
  <div class="sidebar-review">
    <div class="sidebar-header">
      <div class="sidebar-title-row">
        <div class="sidebar-title">会后回顾</div>
        <el-button link type="primary" @click="emit('back')">返回今日洞察</el-button>
      </div>
      <div class="summary">
        <div class="summary-title">{{ title }}</div>
        <div class="summary-meta">
          <!-- <el-tag size="small" effect="light">{{ sourceText }}</el-tag> -->
          <span class="time">{{ timeText }}</span>
        </div>
      </div>
    </div>

    <el-skeleton v-if="loading" :rows="6" animated />

    <div v-else class="review-body">
      <div v-if="content" class="content">
        <div class="content-title">内容说明</div>
        <div class="content-text">{{ content }}</div>
      </div>

      <div v-if="flashMinutesList?.length" class="minutes-list">
        <div class="list-title">钉钉闪记 ({{ flashMinutesList.length }})</div>
        <div
          v-for="(item, index) in flashMinutesList"
          :key="index"
          class="minutes-item"
          @click="handleOpen(item.url)"
        >
          <div class="item-title">{{ item.title || '未命名闪记' }}</div>
          <el-icon class="arrow"><ArrowRight /></el-icon>
        </div>
      </div>

      <template v-else>
        <el-empty v-if="!minutesUrl" description="暂无会议纪要" />

        <el-button
          v-else
          class="w-100"
          type="primary"
          :disabled="!minutesUrl"
          @click="handleOpen(minutesUrl)"
        >
          查看完整纪要
        </el-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" name="SidebarReview">
  import dayjs from 'dayjs';
  import { ArrowRight } from '@element-plus/icons-vue';
  import type { ScheduleEvent } from '../types';

  const props = defineProps<{
    loading: boolean;
    minutesUrl?: string;
    content?: string;
    flashMinutesList?: { title: string; url: string }[];
    event: ScheduleEvent | null;
  }>();

  const emit = defineEmits<{
    (event: 'back'): void;
  }>();

  const title = computed(() => {
    if (!props.event) return '-';
    return props.event.calendarType === 'leader' ? '忙碌' : props.event.title;
  });

  const sourceText = computed(() => {
    if (props.event?.calendarType === 'leader') return '上级';
    if (props.event?.calendarType === 'project') return '项目';
    return '我的';
  });

  const timeText = computed(() => {
    if (!props.event) return '-';
    const start = dayjs(props.event.startAt);
    const end = dayjs(props.event.endAt);
    const startText = start.isValid() ? start.format('YYYY-MM-DD HH:mm') : props.event.startAt;
    const endText = end.isValid() ? end.format('YYYY-MM-DD HH:mm') : props.event.endAt;
    return `${startText} ~ ${endText}`;
  });

  const handleOpen = (url?: string) => {
    const targetUrl = url || props.minutesUrl;
    if (!targetUrl) return;
    window.open(targetUrl, '_blank');
  };
</script>

<style lang="scss" scoped>
  .sidebar-review {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
  }

  .sidebar-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sidebar-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .sidebar-title {
    font-size: 16px;
    font-weight: 800;
    color: #111827;
    letter-spacing: 0.2px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(2, 185, 107, 0.06);
    border: 1px solid rgba(2, 185, 107, 0.12);
  }

  .summary-title {
    font-weight: 700;
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .summary-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(17, 24, 39, 0.6);
    font-size: 12px;
    min-width: 0;
    .time {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .review-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 0;
  }

  .content {
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    background: rgba(0, 0, 0, 0.02);
    padding: 12px;
  }

  .content-title {
    font-weight: 800;
    font-size: 13px;
    color: #111827;
    margin-bottom: 8px;
  }

  .content-text {
    font-size: 13px;
    line-height: 20px;
    color: rgba(17, 24, 39, 0.82);
    white-space: pre-wrap;
  }

  .w-100 {
    width: 100%;
  }

  .minutes-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .list-title {
    font-weight: 800;
    font-size: 13px;
    color: #111827;
    margin-bottom: 4px;
    padding-left: 4px;
  }

  .minutes-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    background: #f8fafc;
    border: 1px solid #f1f5f9;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 10px;

    &:hover {
      background: #f1f5f9;
      border-color: #e2e8f0;
      transform: translateY(-1px);
    }

    .item-title {
      font-size: 13px;
      color: #334155;
      font-weight: 500;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .arrow {
      font-size: 14px;
      color: #94a3b8;
    }
  }
</style>
