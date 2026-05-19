import dayjs from 'dayjs';

import type { ScheduleCalendarType, ScheduleEvent, ScheduleViewType } from './types';

export type QueryScheduleListParams = {
  startAt: string;
  endAt: string;
  viewType: ScheduleViewType;
  keyword?: string;
  calendarTypes?: ScheduleCalendarType[];
};

export type QueryScheduleListResponse = {
  total: number;
  scheduleList: ScheduleEvent[];
  leaderName?: string;
};

export type QueryReviewDetailParams = {
  id: string;
};

export type QueryReviewDetailResponse = {
  id: string;
  minutesUrl?: string;
  content?: string;
};

const withinRange = (event: ScheduleEvent, startAt: string, endAt: string) => {
  const start = dayjs(startAt);
  const end = dayjs(endAt);
  const eventStart = dayjs(event.startAt);
  const eventEnd = dayjs(event.endAt);
  return eventEnd.isAfter(start) && eventStart.isBefore(end);
};

const buildMockEvents = (rangeStartAt: string, rangeEndAt: string) => {
  const rangeStart = dayjs(rangeStartAt);
  const base = rangeStart.add(1, 'day').hour(10).minute(0).second(0);
  const now = dayjs();

  const raw: ScheduleEvent[] = [
    {
      id: `self-overlap-1-${base.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '智能会议项目评审',
      startAt: base.format('YYYY-MM-DD HH:mm:ss'),
      endAt: base.add(90, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `self-overlap-2-${base.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '例会',
      startAt: base.add(30, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      endAt: base.add(75, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `leader-1-${base.format('YYYYMMDD')}`,
      calendarType: 'leader',
      title: '上级日程',
      startAt: base.add(4, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      endAt: base.add(5, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `project-1-${base.format('YYYYMMDD')}`,
      calendarType: 'project',
      title: '项目例会',
      startAt: base.add(2, 'hour').add(30, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      endAt: base.add(3, 'hour').add(10, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `self-past-minutes-1-${base.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '已结束会议（多条闪记验证）',
      startAt: now.subtract(2, 'day').hour(14).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.subtract(2, 'day').hour(15).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: true,
      flashMinutesList: [
        { title: '会后闪记-讨论要点', url: 'https://www.dingtalk.com/' },
        { title: '会后闪记-行动项', url: 'https://www.dingtalk.com/' },
        { title: '会后闪记-风险与结论', url: 'https://www.dingtalk.com/' },
      ],
    },
    {
      id: `self-past-minutes-2-${base.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '已结束会议（有闪记）2',
      startAt: now.subtract(7, 'day').hour(10).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.subtract(7, 'day').hour(11).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: true,
      flashMinutesList: [{ title: '会后闪记-纪要', url: 'https://www.dingtalk.com/' }],
    },
    {
      id: `self-future-1-${base.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '未来会议',
      startAt: now.add(1, 'day').hour(16).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(17).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `leader-today-${now.format('YYYYMMDD')}`,
      calendarType: 'leader',
      title: '上级忙碌（今日）',
      startAt: now.hour(11).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.hour(12).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `leader-tomorrow-${now.add(1, 'day').format('YYYYMMDD')}`,
      calendarType: 'leader',
      title: '上级忙碌（明日）',
      startAt: now.add(1, 'day').hour(9).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(10).minute(30).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    // --- 冲突颜色演示数据 (搬移到明天以演示 5 种颜色) ---
    {
      id: `tomorrow-conflict-1`,
      calendarType: 'self',
      title: '1.主日程 (明日绿)',
      startAt: now.add(1, 'day').hour(14).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(17).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `tomorrow-conflict-2`,
      calendarType: 'self',
      title: '2.并行冲突 (明日蓝)',
      startAt: now.add(1, 'day').hour(14).minute(15).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(16).minute(45).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `tomorrow-conflict-3`,
      calendarType: 'self',
      title: '3.三重冲突 (明日紫)',
      startAt: now.add(1, 'day').hour(14).minute(30).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(16).minute(30).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `tomorrow-conflict-4`,
      calendarType: 'self',
      title: '4.四重冲突 (明日青)',
      startAt: now.add(1, 'day').hour(14).minute(45).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(16).minute(15).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `tomorrow-conflict-5`,
      calendarType: 'self',
      title: '5.五重冲突 (浅粉色)',
      startAt: now.add(1, 'day').hour(15).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(16).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    // --- 链式冲突 ---
    {
      id: `chain-1-${now.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '链条A (绿)',
      startAt: now.hour(17).minute(30).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.hour(18).minute(30).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `chain-2-${now.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '链条B (蓝)',
      startAt: now.hour(18).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.hour(19).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `chain-3-${now.format('YYYYMMDD')}`,
      calendarType: 'self',
      title: '链条C (与A不冲突，所以又是绿)',
      startAt: now.hour(18).minute(45).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.hour(20).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    // --- 跨天冲突 (明日) ---
    {
      id: `proj-1-${now.add(1, 'day').format('YYYYMMDD')}`,
      calendarType: 'project',
      title: '项目A日程 (明日绿)',
      startAt: now.add(1, 'day').hour(14).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(15).minute(30).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
    {
      id: `proj-2-${now.add(1, 'day').format('YYYYMMDD')}`,
      calendarType: 'project',
      title: '项目B日程 (明日蓝)',
      startAt: now.add(1, 'day').hour(14).minute(15).second(0).format('YYYY-MM-DD HH:mm:ss'),
      endAt: now.add(1, 'day').hour(15).minute(45).second(0).format('YYYY-MM-DD HH:mm:ss'),
      hasMinutes: false,
    },
  ];

  const filtered = raw.filter((e) => withinRange(e, rangeStartAt, rangeEndAt));
  const uniqueById = new Map<string, ScheduleEvent>();
  filtered.forEach((e) => uniqueById.set(e.id, e));
  return Array.from(uniqueById.values()).sort((a, b) => dayjs(a.startAt).valueOf() - dayjs(b.startAt).valueOf());
};

export const mockQueryScheduleList = async (
  params: QueryScheduleListParams
): Promise<QueryScheduleListResponse> => {
  if (params.keyword?.includes('__fail__')) {
    return Promise.reject(new Error('mock：查询失败（用于验证错误提示）'));
  }

  const list = buildMockEvents(params.startAt, params.endAt).filter((item) => {
    const typeOk = params.calendarTypes?.length ? params.calendarTypes.includes(item.calendarType) : true;
    const keywordOk = params.keyword?.trim()
      ? item.title.includes(params.keyword.trim()) || item.id.includes(params.keyword.trim())
      : true;
    return typeOk && keywordOk;
  });

  return Promise.resolve({ total: list.length, scheduleList: list, leaderName: '王主管' });
};

export const mockQueryReviewDetail = async (
  params: QueryReviewDetailParams
): Promise<QueryReviewDetailResponse> => {
  return Promise.resolve({ id: params.id });
};

export type DrawFortuneCardParams = {
  memberCode?: string;
};

export const mockDrawFortuneCard = async (
  _params: DrawFortuneCardParams
): Promise<{ fortuneCardLink: string }> => {
  // 模拟接口耗时，体现仪式感
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 此处 mock 一个带有运势感的插画 URL（使用 Unsplash 随机插画模拟）
  // 实际联调时会返回后端生成的图片 URL
  const randomId = Math.floor(Math.random() * 1000);
  return Promise.resolve({
    fortuneCardLink: `https://picsum.photos/seed/${randomId}/400/500`,
  });
};

export type TodayInsightsResponse = {
  workflowCode?: string;
  workflowSubject?: string;
  workflowContent?: string;
};

export const mockQueryTodayInsights = async (): Promise<TodayInsightsResponse> => {
  return Promise.resolve({
    workflowCode: `WF_${dayjs().format('YYYYMMDD')}_001`,
    workflowSubject: '今日洞察',
    workflowContent: '早上好！冬日清晨，大寒将至，元气满满。今天发布会议安排，可以专注处理其他工作啦，祝你拥有高效充实的一天！',
  });
};

export const mockQueryUserSubscribe = async (_params: { memberCode?: string }) => {
  return Promise.resolve({ subscribeKeys: ['self', 'leader'] });
};
