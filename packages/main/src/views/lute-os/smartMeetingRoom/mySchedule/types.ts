export type ScheduleViewType = 'day' | 'week' | 'month' | 'list';

export type ScheduleCalendarType = 'self' | 'leader' | 'project';

export type ScheduleEvent = {
  id: string;
  calendarType: ScheduleCalendarType;
  title: string;
  startAt: string;
  endAt: string;
  hasMinutes: boolean;
  minutesUrl?: string;
  flashMinutesList?: { title: string; url: string }[];
  leaderName?: string;
};
export type DrawFortuneCardResponse = {
  fortuneCardLink?: string;
};
