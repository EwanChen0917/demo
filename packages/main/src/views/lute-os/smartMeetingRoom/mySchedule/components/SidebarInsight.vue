<template>
  <div class="sidebar-insight">
    <div class="insight-list">
      <div v-for="(item, idx) in insightList" :key="idx" class="insight-card">
        <div class="insight-card__title">{{ item.title }}</div>
        <div class="insight-card__content">
          <span>{{ item.prefix }}</span>
          <span v-if="item.highlight" class="hl">{{ item.highlight }}</span>
          <span>{{ item.suffix }}</span>
        </div>
        <!-- 抽卡功能当前版本暂不上线，先注释入口按钮 -->
        <!-- <button class="insight-card__action" type="button" @click="emit('draw-card')">
          <span class="action-text">{{ hasDrawn ? '查看今日运势' : '抽取今日运势卡牌' }}</span>
          <span class="action-icon">
            <svg viewBox="0 0 1024 1024" width="14" height="14">
              <path
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.936a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a30.592 30.592 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SidebarInsight">
  import { useIntervalFn } from '@vueuse/core';
  import dayjs from 'dayjs';
  import type { ScheduleEvent } from '../types';

  const props = defineProps<{
    events: ScheduleEvent[];
    hasDrawn?: boolean;
    todayInsight?: { workflowSubject?: string; workflowContent?: string } | null;
  }>();

  const emit = defineEmits<{
    (event: 'draw-card'): void;
  }>();

  const now = ref(dayjs());
  useIntervalFn(() => {
    now.value = dayjs();
  }, 60 * 1000);

  const dateText = computed(() => {
    return now.value.format('YYYY-MM-DD ddd · HH:mm');
  });

  const greeting = computed(() => {
    const h = now.value.hour();
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  });

  const insightList = computed(() => {
    return [
      {
        title: props.todayInsight?.workflowSubject,
        prefix:
          props.todayInsight?.workflowContent ||
          `${greeting.value}！冬日清晨，大寒将至，元气满满。今天没有会议安排，可以专注处理其他工作啦，祝你拥有高效充实的一天！`,
        highlight: '',
        suffix: '',
      },
    ];
  });
</script>

<style lang="scss" scoped>
  .sidebar-insight {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
  }

  .sidebar-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .sidebar-title {
    font-size: 16px;
    font-weight: 800;
    color: #111827;
    letter-spacing: 0.2px;
  }

  .sidebar-subtitle {
    font-size: 12px;
    color: rgba(17, 24, 39, 0.58);
  }

  .insight-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 0;
  }

  .insight-card {
    padding: 16px 14px;
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    background: rgba(0, 0, 0, 0.02);
  }

  .insight-card__title {
    font-weight: 800;
    font-size: 14px;
    margin-bottom: 10px;
    color: #111827;
  }

  .insight-card__content {
    font-size: 13px;
    line-height: 20px;
    color: rgba(17, 24, 39, 0.82);
  }

  .hl {
    color: #02b96b;
    font-weight: 800;
    margin: 0 2px;
  }

  .insight-card__action {
    margin-top: 14px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    color: #02b96b;
    font-weight: 800;
    font-size: 13px;
    text-align: left;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s ease;

    .action-text {
      position: relative;
      background: linear-gradient(
        90deg,
        #02b96b 0%,
        #02b96b 40%,
        #a6ffda 50%,
        #02b96b 60%,
        #02b96b 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textShimmer 4s linear infinite;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1.5px;
        background: #02b96b;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
        opacity: 0.6;
      }
    }

    .action-icon {
      display: flex;
      align-items: center;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &:hover {
      opacity: 0.85;

      .action-text::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      .action-icon {
        transform: translateX(3px);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }

  @keyframes textShimmer {
    0% {
      background-position: 200% center;
    }
    100% {
      background-position: -200% center;
    }
  }
</style>
