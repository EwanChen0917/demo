<template>
  <div class="smart-meeting-room-my-schedule-page">
    <div class="content">
      <div class="left">
        <div class="left-panel">
          <div class="workspace-header">
            <div class="workspace-title">智能会议工作台</div>
          </div>

          <el-date-picker-panel
            v-model="activeDate"
            type="date"
            value-format="YYYY-MM-DD"
            :clearable="false"
            :border="false"
            class="w-100 smr-date-panel"
          />

          <div class="panel-divider"></div>

          <div class="panel-section">
            <div class="panel-title">订阅规则</div>
            <el-checkbox-group
              v-model="subscribeKeys"
              class="subscribe-list"
              @change="handleSubscribeChange"
            >
              <el-checkbox label="self" class="mb-2">我的日历</el-checkbox>
              <!-- <el-checkbox label="project" class="subscribe-project">我参与的项目</el-checkbox> -->
              <el-checkbox label="leader" class="subscribe-leader">
                上级：{{ leaderNameText }}的日历
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>

      <div class="main">
        <ScheduleCalendar
          :view-type="viewType"
          @update:view-type="(v) => (viewType = v)"
          :active-date="activeDate"
          :events="scheduleEvents"
          @open-review="openReviewByEvent"
          @close-review="openInsight"
        />
      </div>

      <RightSidebar
        :mode="sidebarMode"
        :events="scheduleEvents"
        :selected-event="selectedEvent"
        :review-loading="reviewLoading"
        :reviewMinutesUrl="reviewMinutesUrl"
        :reviewContent="reviewContent"
        :reviewFlashMinutesList="reviewFlashMinutesList"
        :has-drawn="hasDrawn"
        :today-insight="todayInsight"
        @back="openInsight"
      />
    </div>

    <!-- 抽卡功能当前版本暂不上线，先注释弹窗挂载 -->
    <!-- <DrawCardDialog
      v-model="drawCardVisible"
      :date="todayDate"
      :has-drawn="hasDrawn"
      @success="handleDrawSuccess"
    /> -->
  </div>
</template>

<script setup lang="ts" name="smartMeetingRoomMySchedule">
  import { useDebounceFn, useNow, useStorage } from '@vueuse/core';
  import dayjs from 'dayjs';
  import isoWeek from 'dayjs/plugin/isoWeek';
  import { ElMessage } from 'element-plus';
  import { isEmpty } from 'lodash-es';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from '@/store/modules/useStore';
  import ScheduleCalendar from './components/ScheduleCalendar.vue';
  import RightSidebar from './components/RightSidebar.vue';
  // import DrawCardDialog from './components/DrawCardDialog.vue';
  import { getMyScheduleApi } from './api';
  import type { ScheduleEvent, ScheduleViewType } from './types';

  dayjs.extend(isoWeek);

  const viewType = useStorage<ScheduleViewType>(
    'lute_smartMeetingRoom_mySchedule_viewType',
    'week'
  );
  const activeDate = ref(dayjs().format('YYYY-MM-DD'));
  const defaultSubscribeKeys = ['leader'];
  const subscribeKeys = ref<string[]>([...defaultSubscribeKeys]);

  const api = getMyScheduleApi();
  const store = useStore();
  const scheduleLoading = ref(false);
  const scheduleEvents = ref<ScheduleEvent[]>([]);
  const leaderName = useStorage('lute_smartMeetingRoom_mySchedule_leaderName', '');
  const todayInsight = ref<{ workflowSubject?: string; workflowContent?: string } | null>(null);

  const reviewMinutesUrl = ref<string | undefined>(undefined);
  const reviewContent = ref<string | undefined>(undefined);
  const reviewFlashMinutesList = ref<{ title: string; url: string }[] | undefined>(undefined);
  const reviewLoading = ref(false);
  const selectedEvent = ref<ScheduleEvent | null>(null);
  const sidebarMode = ref<'insight' | 'review'>('insight');
  const drawCardVisible = ref(false);
  const now = useNow({ interval: 60 * 1000 });
  const todayDate = computed(() => dayjs(now.value).format('YYYY-MM-DD'));
  const currentMemberCode = computed(() => String(store?.userInfo?.memberCode || ''));
  const drawnStorageKey = computed(
    () => `lute_smr_drawn_${currentMemberCode.value}_${todayDate.value}`
  );

  const route = useRoute();
  const router = useRouter();

  const hasHandledExternalAction = ref(false);
  const checkExternalAction = () => {
    // 抽卡功能当前版本暂不上线，先注释外部 action 入口
    // if (route.query.action === 'drawCard' && !hasHandledExternalAction.value) {
    //   hasHandledExternalAction.value = true;
    //   handleDrawCard();
    //   const newQuery = { ...route.query };
    //   delete newQuery.action;
    //   router.replace({ query: newQuery });
    // }
  };

  const openReviewByEvent = async (scheduleEvent: ScheduleEvent) => {
    sidebarMode.value = 'review';
    selectedEvent.value = scheduleEvent;
    reviewMinutesUrl.value = undefined;
    reviewContent.value = undefined;
    reviewFlashMinutesList.value = undefined;
    reviewLoading.value = true;

    try {
      const res = await api.queryReviewDetail({ id: scheduleEvent.id } as any);
      reviewMinutesUrl.value = res.minutesUrl ?? scheduleEvent.minutesUrl;
      reviewContent.value = res.content;
      reviewFlashMinutesList.value = scheduleEvent.flashMinutesList;
    } catch (error: any) {
      ElMessage.error(error?.message || '查询会后回顾失败');
      reviewMinutesUrl.value = scheduleEvent.minutesUrl;
      reviewFlashMinutesList.value = scheduleEvent.flashMinutesList;
    } finally {
      reviewLoading.value = false;
    }
  };

  const openInsight = () => {
    sidebarMode.value = 'insight';
  };

  const handleDrawCard = () => {
    drawCardVisible.value = true;
  };

  const handleDrawSuccess = () => {
    localStorage.setItem(drawnStorageKey.value, 'true');
    hasDrawnTrigger.value++;
  };

  const fetchTodayInsights = async () => {
    try {
      todayInsight.value = await api.queryTodayInsights();
    } catch {
      todayInsight.value = null;
    }
  };

  const initSubscribeKeys = async () => {
    try {
      const { subscribeKeys: serverSubscribeKeys } = await api.queryUserSubscribe({
        memberCode: currentMemberCode.value,
      });
      subscribeKeys.value = normalizeSubscribeKeys(
        isEmpty(serverSubscribeKeys) ? defaultSubscribeKeys : serverSubscribeKeys
      );
    } catch {
      subscribeKeys.value = normalizeSubscribeKeys(subscribeKeys.value);
    }
  };

  const persistSubscribeKeys = async (keys: string[]) => {
    await api.saveUserSubscribe({
      memberCode: currentMemberCode.value,
      subscribeKeys: keys,
    });
  };

  const saveSubscribeKeys = async () => {
    const normalizedSubscribeKeys = normalizeSubscribeKeys(subscribeKeys.value);
    subscribeKeys.value = normalizedSubscribeKeys;
    try {
      await persistSubscribeKeys(normalizedSubscribeKeys);
    } catch {
      ElMessage.error('保存订阅规则失败');
    }
  };

  const handleSubscribeChange = async () => {
    await saveSubscribeKeys();
    debouncedFetchSchedule();
  };

  const hasDrawnTrigger = ref(0);
  const hasDrawn = computed(() => {
    hasDrawnTrigger.value;
    return localStorage.getItem(drawnStorageKey.value) === 'true';
  });

  const getRangeByViewType = () => {
    const base = dayjs(activeDate.value);
    if (viewType.value === 'day') {
      return {
        startAt: base.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endAt: base.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      };
    }
    if (viewType.value === 'week') {
      return {
        startAt: base.startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss'),
        endAt: base.endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss'),
      };
    }
    return {
      startAt: base.startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      endAt: base.endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    };
  };

  const fetchSchedule = async () => {
    if (isEmpty(subscribeKeys.value)) {
      scheduleEvents.value = [];
      return;
    }
    const { startAt, endAt } = getRangeByViewType();
    scheduleLoading.value = true;
    try {
      const res = await api.queryScheduleList({
        startAt,
        endAt,
        viewType: viewType.value,
        calendarTypes: subscribeKeys.value as any,
      } as any);
      scheduleEvents.value = res.scheduleList ?? [];
      if (res.leaderName) leaderName.value = res.leaderName;
    } catch (error: any) {
      ElMessage.error(error?.message || '查询日程失败');
    } finally {
      scheduleLoading.value = false;
    }
  };

  const leaderNameText = computed(() => leaderName.value || '--');
  const subscribeKeyOrder = ['self', 'leader'];
  const normalizeSubscribeKeys = (keys: string[]) => {
    const keySet = new Set(keys);
    return subscribeKeyOrder.filter((key) => keySet.has(key));
  };

  const debouncedFetchSchedule = useDebounceFn(fetchSchedule, 250);
  const isPastDate = (date: Date) => dayjs(date).isBefore(dayjs(), 'day');

  const { pause: pauseScheduleWatch, resume: resumeScheduleWatch } = watch(
    () => [viewType.value, activeDate.value],
    () => debouncedFetchSchedule()
  );
  watch(
    () => todayDate.value,
    (value, oldValue) => {
      if (value !== oldValue) fetchTodayInsights();
    }
  );

  const initPageData = async () => {
    pauseScheduleWatch();
    try {
      await initSubscribeKeys();
      await Promise.all([fetchTodayInsights(), fetchSchedule()]);
    } finally {
      resumeScheduleWatch();
    }
  };

  onMounted(() => {
    viewType.value = 'week';
    checkExternalAction();
  });

  onActivated(async () => {
    checkExternalAction();
    await initPageData();
  });
</script>

<style lang="scss" scoped>
  .smart-meeting-room-my-schedule-page {
    width: 100%;
    height: calc(100vh - 100px);
    --smr-panel-bg: #fff;
    --smr-panel-border: rgba(0, 0, 0, 0.08);
    --smr-panel-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    --smr-text-strong: #111827;
    --smr-text-muted: rgba(17, 24, 39, 0.6);
    --smr-primary: #02b96b;

    .content {
      display: flex;
      gap: 12px;
      height: 100%;

      .left {
        width: 320px;
        .w-100 {
          width: 100%;
        }

        .left-panel {
          height: 100%;
          padding: 20px 14px 14px 16px;
          border-radius: 14px;
          background: var(--smr-panel-bg);
          border: 1px solid var(--smr-panel-border);
          box-shadow: var(--smr-panel-shadow);
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow: auto;
        }

        .workspace-header {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .workspace-title {
          font-weight: 800;
          font-size: 16px;
          color: var(--smr-text-strong);
          letter-spacing: 0.2px;
        }

        .panel-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 0;
        }

        .panel-title {
          font-weight: 700;
          font-size: 13px;
          color: var(--smr-text-strong);
        }

        .panel-divider {
          height: 1px;
          background: rgba(0, 0, 0, 0.06);
        }

        .smr-date-panel {
          :deep(.el-picker-panel),
          :deep(.el-date-picker) {
            width: 100%;
          }
          :deep(.el-date-table td.available:hover) {
            color: var(--smr-primary);
          }
          :deep(.el-date-table td.current:not(.disabled) .el-date-table-cell__text) {
            background: var(--smr-primary);
          }
        }
        .subscribe-list {
          display: flex;
          flex-direction: column;
          color: var(--smr-text-muted);

          .subscribe-project {
            --el-checkbox-checked-bg-color: #8080ff;
            --el-checkbox-checked-input-border-color: #8080ff;
            --el-checkbox-input-border-color-hover: #8080ff;
            &.is-checked {
              :deep(.el-checkbox__label) {
                color: #8080ff;
              }
            }
          }

          .subscribe-leader {
            --el-checkbox-checked-bg-color: #f59a23;
            --el-checkbox-checked-input-border-color: #f59a23;
            --el-checkbox-input-border-color-hover: #f59a23;

            &.is-checked {
              :deep(.el-checkbox__label) {
                color: #f59a23;
              }
            }
          }
        }
      }

      .main {
        flex: 1;
        height: 100%;
        min-width: 0;
      }
    }
  }

  :deep(.el-checkbox-group) {
    align-items: flex-start;
  }
</style>
