/** 舆情等级 */
export const SENTIMENT_LEVEL = {
  P0: '0',
  P1: '1',
  P2: '2',
  P3: '3',
};

/** 舆情等级标签 */
export const SENTIMENT_LEVEL_LABELS = {
  [SENTIMENT_LEVEL.P0]: 'P0',
  [SENTIMENT_LEVEL.P1]: 'P1',
  [SENTIMENT_LEVEL.P2]: 'P2',
  [SENTIMENT_LEVEL.P3]: 'P3',
};

/** 舆情等级颜色 (Element Plus Tag Types) */
export const SENTIMENT_LEVEL_TYPES = {
  [SENTIMENT_LEVEL.P0]: 'danger',
  [SENTIMENT_LEVEL.P1]: 'warning',
  [SENTIMENT_LEVEL.P2]: 'primary',
  [SENTIMENT_LEVEL.P3]: 'info',
};

/** 情感类型 */
export const SENTIMENT_TYPE = {
  POSITIVE: '正向',
  NEGATIVE: '负向',
  NEUTRAL: '中立',
};

/** 情感类型标签 */
export const SENTIMENT_TYPE_LABELS = {
  [SENTIMENT_TYPE.POSITIVE]: '正向',
  [SENTIMENT_TYPE.NEGATIVE]: '负向',
  [SENTIMENT_TYPE.NEUTRAL]: '中立',
};

/** 情感类型颜色 (Element Plus Tag Types) */
export const SENTIMENT_TYPE_TYPES = {
  [SENTIMENT_TYPE.POSITIVE]: 'success',
  [SENTIMENT_TYPE.NEGATIVE]: 'danger',
  [SENTIMENT_TYPE.NEUTRAL]: 'info',
};

/** 媒体类别 (分类) */
export const CLASSIFICATION_TYPE = {
  NEWS: 'news',
  SNS: 'sns',
};

/** 媒体类别标签 */
export const CLASSIFICATION_LABELS = {
  [CLASSIFICATION_TYPE.SNS]: '社媒',
  [CLASSIFICATION_TYPE.NEWS]: '新闻',
};

/** 相关性类型 */
export const RELEVANCE_TYPE = {
  MAIN: 'main',
  IMPORTANT: 'important',
  MENTION: 'mention',
  IRRELEVANT: 'irrelevant',
};

/** 相关性类型标签 */
export const RELEVANCE_TYPE_LABELS = {
  [RELEVANCE_TYPE.MAIN]: '主要内容',
  [RELEVANCE_TYPE.IMPORTANT]: '重要组成部分',
  [RELEVANCE_TYPE.MENTION]: '仅提及',
  [RELEVANCE_TYPE.IRRELEVANT]: '无关',
};

/** 工单状态 */
export const TICKET_STATUS = {
  PROCESSING: 'processing',
  RESOLVED: 'resolved',
  NO_NEED: 'no_need',
};

/** 工单状态标签 */
export const TICKET_STATUS_LABELS = {
  [TICKET_STATUS.RESOLVED]: '已解决',
  [TICKET_STATUS.PROCESSING]: '处理中',
  [TICKET_STATUS.NO_NEED]: '无需处理',
};

/** 处理方案列表 */
export const SOLUTION_OPTIONS = [
  { value: 0, label: '操作确认' },
  { value: 1, label: '频率定性' },
  { value: 2, label: '客服联系' },
  { value: 3, label: '官号评论' },
  { value: 4, label: '口碑维护' },
  { value: 5, label: '正面热帖' },
  { value: 6, label: '红人背景' },
  { value: 7, label: '转评赞' },
];

export const SOLUTION_LABEL_MAP = SOLUTION_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

/** 处理时限选项 */
export const DEADLINE_OPTIONS = [
  { value: 4, label: '4小时' },
  { value: 8, label: '8小时' },
  { value: 16, label: '16小时' },
];

/** 内容类型选项 */
export const CONTENT_TYPE_OPTIONS = [
  { value: '文章', label: '文章' },
  { value: '评论', label: '评论' },
  { value: '引用', label: '引用' },
  { value: '视频', label: '视频' },
  { value: '图片', label: '图片' },
];

/** 常用平台选项 */
export const PLATFORM_OPTIONS = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'TikTok', label: 'TikTok' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Reddit', label: 'Reddit' },
];

/** 浏览/互动量筛选阈值 */
export const THRESHOLD_OPTIONS = [
  { value: 0, label: '全部' },
  { value: 5, label: '> 5' },
  { value: 50, label: '> 50' },
];

/** 常用国家/地区选项 */
export const COUNTRY_OPTIONS = [
  { value: 'US', label: '美国' },
  { value: 'UK', label: '英国' },
  { value: 'CA', label: '加拿大' },
  { value: 'DE', label: '德国' },
  { value: 'FR', label: '法国' },
];

/** 是否创建工单选项 */
export const TICKET_CREATED_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'yes', label: '已建单' },
  { value: 'no', label: '未建单' },
];

/** 相关性颜色映射 (Element Plus Tag Types) */
export const RELEVANCE_TYPE_TYPES = {
  [RELEVANCE_TYPE.MAIN]: 'danger',
  [RELEVANCE_TYPE.IMPORTANT]: 'warning',
  [RELEVANCE_TYPE.MENTION]: 'primary',
  [RELEVANCE_TYPE.IRRELEVANT]: 'info',
};

/** 客服工单状态（待后端补充状态码） */
export const CUSTOMER_WORK_ORDER_STATUS = {
  PROCESSING: 0,
  RESOLVED: 1,
  ESCALATED: 6,
  PHISHING: 5,
};

/** 客服工单状态标签 */
export const CUSTOMER_WORK_ORDER_STATUS_LABELS = {
  [CUSTOMER_WORK_ORDER_STATUS.PROCESSING]: '进行中',
  [CUSTOMER_WORK_ORDER_STATUS.RESOLVED]: '已解决',
  [CUSTOMER_WORK_ORDER_STATUS.ESCALATED]: '舆情升级',
  [CUSTOMER_WORK_ORDER_STATUS.PHISHING]: '钓鱼内容',
};

/** 客服工单状态选项 */
export const CUSTOMER_WORK_ORDER_STATUS_OPTIONS = [
  { value: CUSTOMER_WORK_ORDER_STATUS.PROCESSING, label: '进行中', disabled: false },
  { value: CUSTOMER_WORK_ORDER_STATUS.RESOLVED, label: '已解决', disabled: false },
  { value: CUSTOMER_WORK_ORDER_STATUS.ESCALATED, label: '舆情升级', disabled: false },
  { value: CUSTOMER_WORK_ORDER_STATUS.PHISHING, label: '钓鱼内容', disabled: false },
];
