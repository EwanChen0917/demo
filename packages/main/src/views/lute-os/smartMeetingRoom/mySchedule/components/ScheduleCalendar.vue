<template>
  <div class="schedule-calendar">
    <div class="calendar-panel">
      <div class="calendar-header">
        <div class="calendar-title">{{ title }}</div>
        <ScheduleViewTabs v-model="viewTypeModel" />
      </div>
      <transition name="fade-slide" mode="out-in">
        <FullCalendar
          :key="viewType"
          ref="calendarRef"
          class="smr-calendar"
          :class="'view-' + viewType"
          :options="calendarOptions"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts" name="ScheduleCalendar">
  import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import listPlugin from '@fullcalendar/list';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import dayjs from 'dayjs';
  import type {
    CalendarOptions,
    EventClickArg,
    EventContentArg,
    EventInput,
  } from '@fullcalendar/core';
  import { useIntervalFn } from '@vueuse/core';
  import ScheduleViewTabs from './ScheduleViewTabs.vue';
  import type { ScheduleCalendarType, ScheduleEvent, ScheduleViewType } from '../types';

  dayjs.locale('zh-cn');

  const props = defineProps<{
    viewType: ScheduleViewType;
    activeDate: string;
    events: ScheduleEvent[];
  }>();

  const emit = defineEmits<{
    (event: 'update:viewType', viewType: ScheduleViewType): void;
    (event: 'open-review', scheduleEvent: ScheduleEvent): void;
    (event: 'close-review'): void;
  }>();

  const viewTypeModel = computed<ScheduleViewType>({
    get: () => props.viewType,
    set: (v) => emit('update:viewType', v),
  });

  const calendarRef = ref<InstanceType<typeof FullCalendar>>();

  // FullCalendar 的 view 名称与业务 viewType 映射：
  // - day/week 使用 timeGrid（时间轴视图）
  // - month 使用 dayGrid（月视图）
  const viewName = computed(() => {
    if (props.viewType === 'day') return 'timeGridDay';
    if (props.viewType === 'month') return 'dayGridMonth';
    if (props.viewType === 'list') return 'listMonth';
    return 'timeGridWeek';
  });

  const title = computed(() => {
    const d = dayjs(props.activeDate);
    if (!d.isValid()) return props.activeDate;

    if (props.viewType === 'day') {
      return d.format('YYYY年M月D日');
    }
    return d.format('YYYY年M月');
  });

  // 用于 nowIndicator（红线）与“现在几号、周几、几点”的文案刷新。
  // FullCalendar 内部也会刷新 nowIndicator，但为了让文案稳定按分钟更新，这里显式驱动一次。
  const now = ref(new Date());
  useIntervalFn(() => {
    now.value = new Date();
  }, 60 * 1000);

  // 将统一事件模型映射为 FullCalendar 的 EventInput，扩展字段挂到 extendedProps 便于 click/渲染取用。
  const eventInputs = computed<EventInput[]>(() => {
    const sorted = [...props.events].sort((a, b) => {
      const startDiff = dayjs(a.startAt).valueOf() - dayjs(b.startAt).valueOf();
      if (startDiff !== 0) return startDiff;
      return dayjs(a.endAt).valueOf() - dayjs(b.endAt).valueOf();
    });

    const colorAssignments = new Map<string, number>();

    for (let i = 0; i < sorted.length; i++) {
      const e = sorted[i];
      const isPast = dayjs(e.endAt).isBefore(dayjs());

      // 上级日程或历史日程，不参与颜色分配逻辑（它们有固定的黄色/灰色）
      if (e.calendarType === 'leader' || isPast) {
        colorAssignments.set(e.id, 0);
        continue;
      }

      const busyColors = new Set<number>();
      for (let j = 0; j < i; j++) {
        const prev = sorted[j];
        const isPrevPast = dayjs(prev.endAt).isBefore(dayjs());

        // 只有当重叠的日程也是“彩色的未来日程”时，才需要避开它的颜色
        const isPrevColorCompetitor = prev.calendarType !== 'leader' && !isPrevPast;

        if (isPrevColorCompetitor) {
          const eStart = dayjs(e.startAt).valueOf();
          const eEnd = dayjs(e.endAt).valueOf();
          const pStart = dayjs(prev.startAt).valueOf();
          const pEnd = dayjs(prev.endAt).valueOf();

          const isOverlap = eStart < pEnd && pStart < eEnd;
          if (isOverlap) {
            busyColors.add(colorAssignments.get(prev.id) ?? 0);
          }
        }
      }

      let color = 0;
      while (busyColors.has(color)) color++;
      colorAssignments.set(e.id, color);
    }

    return props.events.map((e) => ({
      id: e.id,
      title: e.calendarType === 'leader' ? '忙碌' : e.title,
      start: e.startAt,
      end: e.endAt,
      extendedProps: {
        calendarType: e.calendarType,
        hasMinutes: e.hasMinutes,
        minutesUrl: e.minutesUrl,
        rawTitle: e.title,
        colorIndex: colorAssignments.get(e.id) ?? 0,
      },
    }));
  });

  const isPastEvent = (end?: Date | null) => {
    if (!end) return false;
    return dayjs(end).isBefore(dayjs());
  };

  const decorateListDayTags = () => {
    const api = calendarRef.value?.getApi();
    if (!api?.view?.type?.startsWith('list')) return;

    const root = (calendarRef.value as any)?.$el as HTMLElement | undefined;
    if (!root) return;

    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const today = dayjs().format('YYYY-MM-DD');
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

    const dayRows = root.querySelectorAll('tr.fc-list-day');
    dayRows.forEach((row) => {
      row.classList.remove(
        'smr-list-day--yesterday',
        'smr-list-day--today',
        'smr-list-day--tomorrow'
      );
      const date = row.getAttribute('data-date');
      if (date === yesterday) row.classList.add('smr-list-day--yesterday');
      if (date === today) row.classList.add('smr-list-day--today');
      if (date === tomorrow) row.classList.add('smr-list-day--tomorrow');
    });
  };

  const handleEventClick = (arg: EventClickArg) => {
    const ext = (arg.event.extendedProps ?? {}) as any;
    const hasMinutes = !!ext.hasMinutes;
    const isPast = isPastEvent(arg.event.end);
    if (hasMinutes && isPast) {
      const matched = props.events.find((e) => e.id === arg.event.id);
      if (matched) emit('open-review', matched);
    } else {
      emit('close-review');
    }
  };

  // nowIndicatorContent 可自定义“现在红线”的内容。
  const renderNowIndicatorContent = (arg: { isAxis: boolean; date: Date }) => {
    if (!arg.isAxis) return { domNodes: [] as Node[] };

    const wrap = document.createElement('div');
    wrap.className = 'smr-now-label';
    // 显式指定中文星期显示，dayjs().format('ddd') 在 zh-cn 下通常是 "周三"
    wrap.textContent = dayjs(arg.date).format('HH:mm');
    return { domNodes: [wrap] };
  };

  // - leader 事件：只展示时间（不展示名称），满足“只展示时间/名称默认为忙碌”的需求描述
  // - 历史 + hasMinutes：在标题后追加 “[已生成会议纪要]” 提示（与列表视图一致）
  const renderEventContent = (arg: EventContentArg) => {
    const ext = (arg.event.extendedProps ?? {}) as any;
    const calendarType = ext.calendarType as ScheduleCalendarType | undefined;
    const hasMinutes = !!ext.hasMinutes;
    const isPast = isPastEvent(arg.event.end);
    const isListView = arg.view.type?.startsWith('list');
    const isMonthView = arg.view.type === 'dayGridMonth';
    const isDayView = arg.view.type === 'timeGridDay';

    const wrap = document.createElement('div');
    wrap.className = isMonthView ? 'smr-event-month' : 'smr-event';
    // 无论什么视图，悬浮均展示全名。若是月视图，把时间也拼到 title 里。
    const timeStr = arg.timeText || '';
    const titleStr = arg.event.title || '';
    wrap.title = isMonthView && timeStr ? `${timeStr} ${titleStr}` : titleStr;

    if (isMonthView) {
      const titleEl = document.createElement('span');
      titleEl.className = 'smr-event-month__title';
      titleEl.textContent = arg.event.title || '';
      wrap.appendChild(titleEl);

      if (isPast && hasMinutes) {
        const minutesEl = document.createElement('span');
        minutesEl.className = 'smr-event__minutes';
        minutesEl.textContent = '[已生成会议纪要]';
        titleEl.appendChild(minutesEl);
      }
    } else {
      // 保持时间在前，标题在后
      if (!isListView && !isDayView) {
        const timeEl = document.createElement('div');
        timeEl.className = 'smr-event__time';
        // 去掉时间段中的空格（14:00 - 15:20 -> 14:00-15:20），极致利用水平宽度
        timeEl.textContent = (arg.timeText || '').replace(/\s+/g, '');
        wrap.appendChild(timeEl);
      }

      const titleEl = document.createElement('div');
      titleEl.className = 'smr-event__title';

      const duration =
        arg.event.start && arg.event.end
          ? dayjs(arg.event.end).diff(dayjs(arg.event.start), 'minute')
          : 0;

      // 如果是非月视图/列表视图的超短日程（小于30分钟），内部放置两个元素：省略号和原标题
      if (!isMonthView && !isListView && duration > 0 && duration < 30) {
        const ellipsisEl = document.createElement('span');
        ellipsisEl.className = 'smr-event__ellipsis';
        ellipsisEl.textContent = '···';
        titleEl.appendChild(ellipsisEl);

        const realTitleEl = document.createElement('span');
        realTitleEl.className = 'smr-event__real-title';
        realTitleEl.textContent = arg.event.title || '';
        titleEl.appendChild(realTitleEl);
      } else {
        titleEl.textContent = arg.event.title || '';
      }

      wrap.appendChild(titleEl);

      if (calendarType !== 'leader') {
        if (isPast && hasMinutes) {
          const minutesEl = document.createElement('span');
          minutesEl.className = 'smr-event__minutes';
          minutesEl.textContent = '[已生成会议纪要]';
          titleEl.appendChild(minutesEl);
        }
      }
    }

    return { domNodes: [wrap] };
  };

  const getEventClassNames = (arg: any) => {
    const ext = (arg.event.extendedProps ?? {}) as any;
    const calendarType = ext.calendarType as ScheduleCalendarType | undefined;
    const hasMinutes = !!ext.hasMinutes;
    const isPast = isPastEvent(arg.event.end);

    const classNames: string[] = [];
    if (arg.event.start && arg.event.end) {
      const minutes = dayjs(arg.event.end).diff(dayjs(arg.event.start), 'minute');
      if (minutes <= 60) classNames.push('smr-event--short');
      if (minutes < 30) classNames.push('smr-event--very-short');
    }

    if (hasMinutes && isPast) {
      classNames.push('smr-event--clickable');
    }

    const colorIndex = ext.colorIndex ?? 0;
    const isSelf = calendarType === 'self' || calendarType === 'project';

    // 关键修正：只有非过去的个人日程才应用颜色映射类，确保历史日程保持灰色
    const colorClass = isSelf && !isPast ? `fc-event--color-${colorIndex % 5}` : '';
    const leaderClass = calendarType === 'leader' ? 'fc-event--leader' : '';

    return [
      colorClass,
      leaderClass,
      isSelf ? 'fc-event--self' : '',
      isPast ? 'fc-event--past' : 'fc-event--future',
      ...classNames,
    ];
  };

  const calendarOptions = computed<CalendarOptions>(() => {
    return {
      plugins: [timeGridPlugin, dayGridPlugin, listPlugin],
      initialView: viewName.value,
      initialDate: props.activeDate,
      stickyHeaderDates: false,
      headerToolbar: false,
      height: '100%',
      locale: zhCnLocale,
      firstDay: 1,
      nowIndicator: true,
      now: now.value,
      displayEventEnd: true,
      eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
      slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
      listDayFormat: { month: 'long', day: 'numeric', weekday: 'short' },
      listDaySideFormat: false,
      dayHeaderContent: (arg: any) => {
        if (arg.view.type === 'dayGridMonth') return dayjs(arg.date).format('ddd');
        return dayjs(arg.date).format('M月D日 ddd');
      },
      allDaySlot: false,
      slotMinTime: '00:00:00',
      slotMaxTime: '24:00:00',
      slotEventOverlap: false,
      events: eventInputs.value,
      eventClick: handleEventClick,
      eventContent: renderEventContent,
      eventClassNames: getEventClassNames as any,
      nowIndicatorContent: renderNowIndicatorContent as any,
      datesSet: decorateListDayTags,
    };
  });

  // 当外部切换视图/日期时，使用 FullCalendar API 同步（避免整组件重建导致滚动/状态丢失）。
  watch(
    () => props.viewType,
    () => {
      const api = calendarRef.value?.getApi();
      api?.changeView(viewName.value);
    }
  );
  watch(
    () => props.activeDate,
    (date) => {
      const api = calendarRef.value?.getApi();
      api?.gotoDate(date);
    }
  );
</script>

<style lang="scss" scoped>
  .schedule-calendar {
    width: 100%;
    height: 100%;
    --smr-panel-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

    --smr-bg-self: #e6f7ef;
    --smr-bg-leader: #fff9ef;
    --smr-bg-past: #f5f5f5;
    --smr-bg-self-hover: #d1f2e1;
    --smr-bg-leader-hover: #ffedd1;
    --smr-bg-past-hover: #eeeeee;

    /* 多颜色系列 (Soft Palette) */
    --smr-c0-bg: #e6f7ef;
    --smr-c0-primary: #02b96b;
    --smr-c0-hover: #d1f2e1; // 绿
    --smr-c1-bg: #e6f0ff;
    --smr-c1-primary: #1890ff;
    --smr-c1-hover: #d1e9ff; // 蓝
    --smr-c2-bg: #f0e6ff;
    --smr-c2-primary: #722ed1;
    --smr-c2-hover: #e4d1ff; // 紫
    --smr-c3-bg: #e6f7f7;
    --smr-c3-primary: #13c2c2;
    --smr-c3-hover: #d1eeee; // 青
    --smr-c4-bg: #fff0f6;
    --smr-c4-primary: #eb2f96;
    --smr-c4-hover: #ffd6e7; // 浅粉/玫红

    .calendar-panel {
      height: 100%;
      padding: 14px;
      border-radius: 14px;
      background: var(--smr-panel-bg);
      border: 1px solid var(--smr-panel-border);
      border-top: none;
      box-shadow: var(--smr-panel-shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      .calendar-title {
        font-weight: 600;
      }
    }
  }

  .smr-calendar {
    flex: 1;
    min-height: 0;
  }

  :deep(.fc) {
    --smr-primary: #02b96b;
    --smr-primary-rgb: 2, 185, 107;

    --smr-text-strong: #333;
    --smr-text-muted: #999;

    --smr-event-future-bg: rgba(var(--smr-primary-rgb), 0.12);
    --smr-event-future-bg-hover: rgba(var(--smr-primary-rgb), 0.18);
    --smr-event-past-bg: rgba(0, 0, 0, 0.05);
    --smr-event-past-bg-hover: rgba(0, 0, 0, 0.08);

    --fc-today-bg-color: rgba(var(--smr-primary-rgb), 0.06);
    --fc-now-indicator-color: #f56c6c;

    /* 忙碌状态专属颜色设置 (原型黄色系) */
    --smr-leader: #f59a23;
    --smr-leader-rgb: 245, 154, 35;
    --smr-leader-text: #b87e00;
    --smr-event-leader-bg: #fff7e6;
    --smr-event-leader-bg-hover: #ffedd1;
  }

  :deep(.fc .fc-event-main) {
    color: var(--smr-text-strong);
  }

  :deep(.fc .fc-timegrid-slot-label) {
    color: #999;
    font-size: 12px;
  }

  :deep(.fc .fc-daygrid-body) {
    height: 100%;
  }

  :deep(.fc .fc-daygrid-day-frame) {
    height: 100%;
    min-height: 120px;
    overflow-y: auto !important;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  :deep(.fc .fc-daygrid-day-top) {
    position: sticky;
    top: 0;
    z-index: 10 !important;
    background: #fff;
    pointer-events: none;
    transition: background 0.2s;
  }

  :deep(.fc .fc-daygrid-day-frame::-webkit-scrollbar) {
    width: 3px;
  }
  :deep(.fc .fc-daygrid-day-frame::-webkit-scrollbar-thumb) {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  }
  :deep(.fc .fc-daygrid-day-frame:hover::-webkit-scrollbar-thumb) {
    background: rgba(0, 0, 0, 0.15);
  }

  :deep(.fc .fc-daygrid-day-events) {
    padding: 2px 4px;
  }

  :deep(.fc .fc-timegrid-event) {
    border: 0;
    border-radius: 8px;
  }

  :deep(.fc .fc-timegrid-event) {
    margin: 1px !important;
  }

  :deep(.fc .fc-event) {
    text-decoration: none;
  }

  /* 1. 全局重置：移除 FullCalendar 原生事件的默认蓝色背景和边框 */
  :deep(.fc-event),
  :deep(.fc-v-event),
  :deep(.fc-h-event),
  :deep(.fc-event-main),
  :deep(.fc-event-bg) {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    text-decoration: none !important;
  }

  /* [个人日程 - 多颜色映射] */
  :deep(.fc-event.fc-event--color-0) {
    background-color: var(--smr-c0-bg) !important;
  }
  :deep(.fc-event.fc-event--color-0:hover) {
    background-color: var(--smr-c0-hover) !important;
  }
  :deep(.fc-event.fc-event--color-0 .fc-event-main)::before {
    background-color: var(--smr-c0-primary) !important;
  }
  :deep(.fc-event.fc-event--color-0 .smr-event__title),
  :deep(.fc-event.fc-event--color-0 .smr-event-month__title) {
    color: var(--smr-c0-primary) !important;
  }

  :deep(.fc-event.fc-event--color-1) {
    background-color: var(--smr-c1-bg) !important;
  }
  :deep(.fc-event.fc-event--color-1:hover) {
    background-color: var(--smr-c1-hover) !important;
  }
  :deep(.fc-event.fc-event--color-1 .fc-event-main)::before {
    background-color: var(--smr-c1-primary) !important;
  }
  :deep(.fc-event.fc-event--color-1 .smr-event__title),
  :deep(.fc-event.fc-event--color-1 .smr-event-month__title) {
    color: var(--smr-c1-primary) !important;
  }

  :deep(.fc-event.fc-event--color-2) {
    background-color: var(--smr-c2-bg) !important;
  }
  :deep(.fc-event.fc-event--color-2:hover) {
    background-color: var(--smr-c2-hover) !important;
  }
  :deep(.fc-event.fc-event--color-2 .fc-event-main)::before {
    background-color: var(--smr-c2-primary) !important;
  }
  :deep(.fc-event.fc-event--color-2 .smr-event__title),
  :deep(.fc-event.fc-event--color-2 .smr-event-month__title) {
    color: var(--smr-c2-primary) !important;
  }

  :deep(.fc-event.fc-event--color-3) {
    background-color: var(--smr-c3-bg) !important;
  }
  :deep(.fc-event.fc-event--color-3:hover) {
    background-color: var(--smr-c3-hover) !important;
  }
  :deep(.fc-event.fc-event--color-3 .fc-event-main)::before {
    background-color: var(--smr-c3-primary) !important;
  }
  :deep(.fc-event.fc-event--color-3 .smr-event__title),
  :deep(.fc-event.fc-event--color-3 .smr-event-month__title) {
    color: var(--smr-c3-primary) !important;
  }

  :deep(.fc-event.fc-event--color-4) {
    background-color: var(--smr-c4-bg) !important;
  }
  :deep(.fc-event.fc-event--color-4:hover) {
    background-color: var(--smr-c4-hover) !important;
  }
  :deep(.fc-event.fc-event--color-4 .fc-event-main)::before {
    background-color: var(--smr-c4-primary) !important;
  }
  :deep(.fc-event.fc-event--color-4 .smr-event__title),
  :deep(.fc-event.fc-event--color-4 .smr-event-month__title) {
    color: var(--smr-c4-primary) !important;
  }

  /* [上级忙碌 - 黄色系] */
  :deep(.fc-event.fc-event--leader) {
    background-color: var(--smr-bg-leader) !important;
  }
  :deep(.fc-event.fc-event--leader:hover) {
    background-color: var(--smr-bg-leader-hover) !important;
  }
  :deep(.fc-event.fc-event--leader .fc-event-main)::before {
    background-color: #f59a23 !important;
  }
  :deep(.fc-event.fc-event--leader .smr-event__title) {
    color: #b87e00 !important;
  }

  :deep(.fc-event.fc-event--past),
  :deep(.fc-event.fc-event--past.fc-event--self),
  :deep(.fc-event.fc-event--past.fc-event--leader) {
    background-color: var(--smr-bg-past) !important;
  }
  :deep(.fc-event.fc-event--past .smr-event__title),
  :deep(.fc-event.fc-event--past .smr-event__time) {
    color: #999 !important;
  }
  :deep(.fc-event.fc-event--past .fc-event-main)::before {
    background-color: #ccc !important;
  }

  :deep(.smr-event) {
    padding: 4px 4px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    overflow: hidden;
    height: 100%;
    justify-content: flex-start;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
    width: 100%;
    position: relative;
    z-index: 10;
  }

  :deep(.fc-timegrid-col-events),
  :deep(.fc-event-main),
  :deep(.fc-event-main-frame) {
    overflow: visible !important;
  }

  :deep(.fc-timegrid-event:hover),
  :deep(.fc-event:hover),
  :deep(.fc-event.fc-event--self:hover),
  :deep(.fc-event.fc-event--leader:hover),
  :deep(.fc-event.fc-event--past:hover) {
    background: transparent !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    filter: none !important;
    opacity: 1 !important;
    z-index: 9999 !important;

    .fc-event-main::before {
      z-index: 20 !important;
    }
  }

  :deep(.fc-timegrid-event:hover)::before,
  :deep(.fc-timegrid-event:hover)::after {
    display: none !important;
    content: none !important;
  }

  :deep(.fc-timegrid-event-harness:hover) {
    z-index: 9999 !important;
    overflow: visible !important;
  }

  :deep(.fc-timegrid-col) {
    position: relative;
  }

  :deep(.fc-timegrid-col:hover) {
    z-index: 100 !important;
  }

  /* 解决日历多层级容器的溢出截断，确保悬浮卡片能“破壁”而出 */
  :deep(.fc-timegrid-body),
  :deep(.fc-timegrid-cols),
  :deep(.fc-scrollgrid-sync-table),
  :deep(.fc-scrollgrid-section-body),
  :deep(.fc-scrollgrid-section-body > td),
  :deep(.fc-timegrid-col-frame),
  :deep(.fc-timegrid-col-events) {
    overflow: visible !important;
  }

  /* 大日程：横向卷轴展开，仅在周视图（格子窄）下启用 */
  :deep(.view-week .fc-timegrid-event:not(.smr-event--short):not(.smr-event--very-short):hover) {
    width: auto !important;
    .smr-event {
      width: 280px !important;
      height: 100% !important;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
    }
    &.fc-event--color-0 .smr-event {
      background-color: var(--smr-c0-hover) !important;
    }
    &.fc-event--color-1 .smr-event {
      background-color: var(--smr-c1-hover) !important;
    }
    &.fc-event--color-2 .smr-event {
      background-color: var(--smr-c2-hover) !important;
    }
    &.fc-event--color-3 .smr-event {
      background-color: var(--smr-c3-hover) !important;
    }
    &.fc-event--color-4 .smr-event {
      background-color: var(--smr-c4-hover) !important;
    }
    &.fc-event--leader .smr-event {
      background-color: var(--smr-bg-leader-hover) !important;
    }
    &.fc-event--past .smr-event {
      background-color: var(--smr-bg-past-hover) !important;
    }
  }

  /* 小日程：仅在周视图下启用扩展 */
  :deep(.view-week .fc-timegrid-event.smr-event--short:hover),
  :deep(.view-week .fc-timegrid-event.smr-event--very-short:hover) {
    width: auto !important;
    height: auto !important;
    min-height: fit-content !important;
    .smr-event {
      width: 240px !important;
      height: auto !important;
      min-height: 100%;
      border-radius: 8px;
      padding: 10px 8px !important;
      justify-content: flex-start !important;
    }
    &.fc-event--color-0 .smr-event {
      background-color: var(--smr-c0-hover) !important;
    }
    &.fc-event--color-1 .smr-event {
      background-color: var(--smr-c1-hover) !important;
    }
    &.fc-event--color-2 .smr-event {
      background-color: var(--smr-c2-hover) !important;
    }
    &.fc-event--color-3 .smr-event {
      background-color: var(--smr-c3-hover) !important;
    }
    &.fc-event--color-4 .smr-event {
      background-color: var(--smr-c4-hover) !important;
    }
    &.fc-event--leader .smr-event {
      background-color: var(--smr-bg-leader-hover) !important;
    }
    &.fc-event--past .smr-event {
      background-color: var(--smr-bg-past-hover) !important;
    }

    .smr-event__title {
      -webkit-line-clamp: unset !important;
      line-clamp: unset !important;
      white-space: normal !important;
      overflow: visible !important;
      text-overflow: clip !important;
      margin-bottom: 4px;
      line-height: 1.3 !important; /* 悬浮时恢复正常的行高 */
    }
    .smr-event__time {
      white-space: normal !important;
      display: block; /* 悬浮时恢复展示时间 */
    }
  }

  /* 解决日历列容器的截断 */
  :deep(.view-week .fc-timegrid-col-events) {
    overflow: visible !important;
  }

  :deep(.smr-event--short .smr-event) {
    padding: 2px 6px;
    gap: 2px;
    justify-content: center;
  }
  :deep(.smr-event--very-short .smr-event) {
    padding: 0 6px; // 彻底取消垂直内边距，让内容贴顶
    gap: 0;
    justify-content: flex-start !important;
  }

  :deep(.smr-event--very-short .smr-event__title) {
    line-height: 1 !important;
    .smr-event__real-title {
      display: none;
    }
  }

  /* 联动逻辑：当超短日程悬浮展开时，隐藏省略号，显示真实标题 */
  :deep(.view-week .fc-timegrid-event.smr-event--very-short:hover) {
    .smr-event__ellipsis {
      display: none !important;
    }
    .smr-event__real-title {
      display: block !important;
    }
    .smr-event {
      justify-content: flex-start !important;
    }
  }

  :deep(.fc-event-main) {
    position: relative;
    overflow: hidden;
    padding-left: 10px;
  }

  :deep(.fc-event-main)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    border-radius: 4px;
    background: var(--smr-primary);
    z-index: 0;
  }

  :deep(.fc-daygrid-event .fc-event-main)::before {
    display: none;
  }

  :deep(.fc-event-main > *) {
    position: relative;
    z-index: 1;
  }

  :deep(.fc-event--leader .fc-event-main)::before {
    background: var(--smr-leader);
    opacity: 1;
  }

  :deep(.fc-event--leader:not(.fc-event--past) .smr-event-month) {
    background: var(--smr-event-leader-bg) !important;
  }

  :deep(.fc-event--leader:not(.fc-event--past) .smr-event-month .smr-event-month__title) {
    color: var(--smr-leader-text);
  }

  :deep(.fc-event--past .fc-event-main)::before {
    background: rgba(0, 0, 0, 0.18);
  }

  :deep(.smr-event__time) {
    font-size: 11px;
    line-height: normal;
    opacity: 0.8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: -0.2px;
  }

  /* 60分钟及以下短日程：默认隐藏时间，只展示标题，节省空间 */
  :deep(.smr-event--short .smr-event__time),
  :deep(.smr-event--very-short .smr-event__time) {
    display: none;
  }

  :deep(.smr-event__title) {
    font-size: 12px;
    line-height: normal;
    overflow: hidden;
    white-space: nowrap; /* 全局强制单行，防止窄宽度下竖排或换行截断 */
    text-overflow: ellipsis;
    display: block;
  }

  :deep(.fc-event--future .smr-event__title),
  :deep(.fc-event--leader:not(.fc-event--past) .smr-event__title) {
    font-weight: 600;
  }

  :deep(.fc-event--future .smr-event__time),
  :deep(.fc-event--leader .smr-event__time) {
    color: var(--smr-text-strong);
  }

  :deep(.fc-event--past .smr-event__title),
  :deep(.fc-event--past .smr-event__time),
  :deep(.fc-event--past .smr-event-month__title),
  :deep(.fc-event--past .smr-event-month__time) {
    color: var(--smr-text-muted) !important;
  }

  :deep(.smr-event__minutes) {
    margin-left: 6px;
    color: var(--smr-primary);
  }

  :deep(.smr-event-month) {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 8px;
    cursor: default;
    overflow: hidden;
    position: relative;
  }

  :deep(.fc-event.smr-event--clickable .smr-event-month),
  :deep(.fc-event.smr-event--clickable .smr-event) {
    cursor: pointer;
  }

  :deep(.smr-event-month__time) {
    font-size: 11px;
    line-height: 16px;
    color: var(--smr-text-muted);
    flex-shrink: 0;
    white-space: nowrap;
    min-width: 40px;
  }

  :deep(.smr-event-month__title) {
    font-size: 12px;
    line-height: 16px;
    color: var(--smr-text-strong);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  :deep(.fc-event--future .smr-event-month__title) {
    color: var(--smr-primary);
    font-weight: 600;
  }

  :deep(.smr-now-label) {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    background: #f56c6c;
    color: #fff;
    white-space: nowrap;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(245, 108, 108, 0.4);
    pointer-events: none;
  }

  /* 增加对父级容器的溢出控制，确保标签能溢出到右侧网格区域 */
  :deep(.fc-timegrid-axis),
  :deep(.fc-timegrid-axis-frame),
  :deep(.fc-timegrid-now-indicator-container),
  :deep(.fc-timegrid-now-indicator-arrow) {
    overflow: visible !important;
  }

  :deep(.fc-timegrid-now-indicator-line) {
    z-index: 10;
  }

  :deep(.fc-timegrid-now-indicator-arrow) {
    border-width: 0 !important;
    background: transparent !important;
    z-index: 101; /* 确保在指示线之上 */
  }

  :deep(.fc .fc-list) {
    border: 0;
  }

  :deep(.fc .fc-list-table) {
    border: 0;
    border-collapse: separate;
    border-spacing: 0 12px;
  }

  :deep(.fc .fc-list-day) {
    background: transparent;
  }

  :deep(.fc .fc-list-day-cushion) {
    display: flex !important;
    align-items: center;
    padding: 18px 0 6px;
    font-size: 18px;
    font-weight: 600;
    color: var(--smr-text-strong);
  }

  :deep(.smr-now-label-time) {
    font-weight: 600;
    color: var(--smr-text-strong);
  }

  /* 视图切换过渡动画 */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  :deep(.fc .fc-list-day-cushion)::after {
    display: inline-block;
    margin-left: 12px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: var(--smr-text-muted);
    background: rgba(0, 0, 0, 0.04);
  }

  :deep(.fc .smr-list-day--yesterday .fc-list-day-cushion)::after {
    content: '昨天';
  }

  :deep(.fc .smr-list-day--today .fc-list-day-cushion)::after {
    content: '今天';
    color: var(--smr-primary);
    background: rgba(var(--smr-primary-rgb), 0.1);
  }

  :deep(.fc .smr-list-day--tomorrow .fc-list-day-cushion)::after {
    content: '明天';
  }

  :deep(.fc .fc-list-event) {
    cursor: default;
  }

  :deep(.fc .fc-list-event.smr-event--clickable) {
    cursor: pointer;
  }

  :deep(.fc .fc-list-event td) {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    padding: 18px 14px;
    vertical-align: middle;
  }

  :deep(.fc .fc-list-event td:first-child) {
    border-radius: 10px 0 0 10px;
  }

  :deep(.fc .fc-list-event td:last-child) {
    border-radius: 0 10px 10px 0;
  }

  :deep(.fc .fc-list-event:hover td) {
    background: rgba(var(--smr-primary-rgb), 0.06);
    border-color: rgba(var(--smr-primary-rgb), 0.22);
  }

  :deep(.fc .fc-list-event.fc-event--leader:hover td) {
    background: rgba(245, 154, 35, 0.06) !important;
    border-color: rgba(245, 154, 35, 0.22) !important;
  }

  :deep(.fc .fc-list-event-time) {
    width: 130px;
    color: var(--smr-text-muted);
    font-size: 14px;
    white-space: nowrap;
    padding-left: 18px;
    position: relative;
  }

  :deep(.fc .fc-list-event-time)::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 0;
    bottom: 0;
    width: 5px;
    border-radius: 10px 0 0 10px;
    background: var(--smr-primary);
  }

  :deep(.fc .fc-list-event.fc-event--leader .fc-list-event-time)::before {
    background: var(--smr-leader) !important;
    opacity: 0.85;
  }

  :deep(.fc .fc-list-event.fc-event--past .fc-list-event-time)::before {
    background: rgba(0, 0, 0, 0.18);
  }

  :deep(.fc .fc-list-event-graphic) {
    display: none;
  }

  :deep(.fc .fc-list-event-dot) {
    display: none;
  }

  :deep(.fc .fc-list-event-title) {
    padding-left: 8px;
  }

  :deep(.fc .fc-list-event-title a) {
    color: var(--smr-text-strong);
    font-size: 14px;
    text-decoration: none;
  }

  :deep(.fc .fc-list-event-title a:hover) {
    color: var(--smr-text-strong);
  }
</style>
