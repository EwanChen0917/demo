<template>
  <div class="right-sidebar">
    <div class="sidebar-panel">
      <SidebarInsight
        v-if="mode === 'insight'"
        :events="events"
        :has-drawn="hasDrawn"
        :today-insight="todayInsight"
        @draw-card="emit('draw-card')"
      />
      <SidebarReview
        v-else
        :event="selectedEvent"
        :loading="reviewLoading"
        :minutes-url="reviewMinutesUrl"
        :content="reviewContent"
        :flash-minutes-list="reviewFlashMinutesList"
        @back="emit('back')"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="RightSidebar">
  import SidebarInsight from './SidebarInsight.vue';
  import SidebarReview from './SidebarReview.vue';
  import type { ScheduleEvent } from '../types';

  const props = defineProps<{
    mode: 'insight' | 'review';
    events: ScheduleEvent[];
    selectedEvent: ScheduleEvent | null;
    reviewLoading: boolean;
    reviewMinutesUrl?: string;
    reviewContent?: string;
    reviewFlashMinutesList?: { title: string; url: string }[];
    hasDrawn?: boolean;
    todayInsight?: { workflowSubject?: string; workflowContent?: string } | null;
  }>();

  const emit = defineEmits<{
    (event: 'back'): void;
    (event: 'draw-card'): void;
  }>();
</script>

<style lang="scss" scoped>
  .right-sidebar {
    width: 380px;
    flex-shrink: 0;
    height: 100%;
    min-width: 0;
  }

  .sidebar-panel {
    height: 100%;
    padding: 14px;
    border-radius: 14px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    overflow: auto;
  }
</style>
