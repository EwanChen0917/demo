export const ResourceTypeMap = {
  expert_resource: '专家资源',
  // institution_resource: '机构资源',
  media_resource: '媒体资源',
};

export const DemandTypeMap = {
  0: '通稿',
  1: '赢得媒体 Earned Media',
  2: '付费媒体 Paid Media（单一平台）',
  3: '付费媒体 Paid Media（多平台）',
  4: '其他',
};
// 媒体合作类型
export const CooperationTypeMap = {
  press_release: '通稿',
  evaluation: '测评',
  ranking: '榜单',
  advertorial: '软文',
  other: '其他',
};
// 专家合作类型
export const ExpertCooperationType = {
  COOP_SEMINAR: '研讨会',
  COOP_LIVE: '直播',
  COOP_ONLINE_SHARE: '线上分享',
  COOP_BLOG_REVIEW: '博客审阅',
  COOP_OTHER: '其他',
};
// 机构合作类型
export const institutionCooperationType = {
  COOP_SEMINAR: '研讨会',
  COOP_LIVE: '直播',
  COOP_ONLINE_SHARE: '线上分享',
  COOP_BLOG_REVIEW: '博客审阅',
  COOP_OTHER: '其他',
};
// 投放国家：北美；英国；法国；德国；亚太；其他
export const CountryMap = {
  north_america: '北美',
  uk: '英国',
  france: '法国',
  germany: '德国',
  asia_pacific: '亚太',
  other: '其他',
};

// 媒体分类
export const MediaCategoryMap = {
  news: '新闻',
  business: '商业',
  entertainment: '娱乐',
  lifestyle: '生活方式',
  maternity: '母婴',
  fashion: '时尚',
  women: '女性',
  technology: '科技',
  health: '健康',
  other: '其他',
};

// 媒体分类颜色映射
export const MediaTypeColorMap = {
  news: '#e8e9fe', // 新闻 - 淡紫色
  business: '#f1f9dc', // 商业 - 淡绿色
  entertainment: '#e7f9fd', // 娱乐 - 淡蓝色
  lifestyle: '#fdebea', // 生活方式 - 淡红色
  maternity: '#fff9e5', // 母婴 - 淡黄色
  fashion: '#ffead7', // 时尚 - 淡橙色
  women: '#e8f0ff', // 女性 - 淡蓝色
  technology: '#e8e9fe', // 科技 - 淡紫色
  health: '#f1f9dc', // 健康 - 淡绿色
  other: '#e7f9fd', // 其他 - 淡蓝色
};
export interface ApprovalStep {
  stepCode: string;
  stepName: string;
  order: number;
  operator?: string | null;
  operatorDesc?: string | null;
  operatorTime?: string | null;
  status: 'completed' | 'in_progress' | 'pending' | 'rejected';
  statusDesc: string;
}
// 定义审批步骤类型
export interface ApprovalStepObj {
  currentStep: string;
  currentStepDsc: string;
  demandCode: string;
  demandProcessStepList: Array<ApprovalStep>[];
}

export const approvalStepsInitial = [
  {
    stepCode: 'submit',
    stepName: '需求提交',
    order: 1,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'approve_1',
    stepName: '需求审批',
    order: 2,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'approve_2',
    stepName: '需求审批',
    order: 3,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'execute',
    stepName: '开始执行',
    order: 4,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'review',
    stepName: '需求查收',
    order: 5,
    status: 'completed',
    statusDesc: '已完成',
    operatorDesc: '--',
  },
  {
    stepCode: 'complete',
    stepName: '需求完结',
    order: 7,
    status: 'pending',
    statusDesc: '未开始',
    operatorDesc: '--',
  },
];
export const allowPathsBrand = [
  '/brand/demand',
  '/brand/demand/create',
  '/brand/demand/approve',
  '/brand/demand/my',
  '/brand/demand/approve/execute',
  '/brand/demand/my/execute',
  '/brand/demand/detail/:id',
];

export const resourceOptionsType = {
  media_resource: 1,
  expert_resource: 2,
  institution_resource: 3,
};

export const nameKeyByScene = {
  media_resource: 'mediaName',
  expert_resource: 'expertName',
  institution_resource: 'orgName',
} as const;

export const getNameKeyByScene = (scene) =>
  nameKeyByScene[scene as keyof typeof nameKeyByScene] ?? 'expertName';


export const brandKeys = [
  'brandCode',
  'categoryCode',
  'cooperationType',
  'estimatedBudget',
  'intentionResource',
  'countryCode',
  'mediaCategory',
  'productOnlineTime',
  'resourceType',
];

export const generalKeys = [
  'demandTitle',
  'demandBackground',
  'demandDesc',
  'expectFinishTime',
  'relMemberCodeList',
];
