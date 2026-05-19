import type { RouteRecordRaw } from 'vue-router';

// const OS_PATH_PREFIX = "/lute-os";

// 内购商城
const internalPurchase = [
  // 管理端
  {
    path: '/internalPurchase/goodsManage',
    meta: { title: '商品管理', menuPath: ['内购商城'], watermark: true },
    component: () => import('@/views/lute-os/internalPurchase/goodsManage/index.vue'),
    name: 'internalGoodsManage',
  },
  {
    path: '/internalPurchase/add',
    meta: {
      title: '新增内购产品',
      activeMenu: '/internalPurchase/goodsManage',
      menuPath: ['内购商城'],
      watermark: true,
    },
    component: () => import('@/views/lute-os/internalPurchase/goodsManage/add.vue'),
    name: 'addInternal',
  },
  {
    path: '/internalPurchase/edit',
    meta: {
      title: '编辑内购产品',
      activeMenu: '/internalPurchase/goodsManage',
      menuPath: ['内购商城'],
      watermark: true,
    },
    component: () => import('@/views/lute-os/internalPurchase/goodsManage/edit.vue'),
    name: 'editInternal',
  },
  {
    path: '/internalPurchase/detail',
    meta: {
      title: '内购产品详情',
      activeMenu: '/internalPurchase/goodsManage',
      menuPath: ['内购商城'],
      watermark: true,
    },
    component: () => import('@/views/lute-os/internalPurchase/goodsManage/detail.vue'),
    name: 'internalDetail',
  },
  {
    path: '/internalPurchase/orderManage',
    meta: { title: '订单管理', menuPath: ['内购商城'], watermark: true },
    component: () => import('@/views/lute-os/internalPurchase/orderManage/index.vue'),
    name: 'internalOrderManage',
  },
  {
    path: '/internalPurchase/orderManage/detail',
    meta: {
      title: '订单详情',
      activeMenu: '/internalPurchase/orderManage',
      menuPath: ['内购商城'],
      watermark: true,
    },
    component: () => import('@/views/lute-os/internalPurchase/orderManage/detail.vue'),
    name: 'internalOrderManageDetail',
  },
  // 客户端
  {
    path: '/internalPurchase/index',
    meta: { title: '内购商城', menuPath: ['内购商城'], watermark: true },
    component: () => import('@/views/lute-os/internalPurchase/client/index.vue'),
    name: 'internalPurchase',
  },
  {
    path: '/shoppingCart/index',
    meta: { title: '购物车', menuPath: ['内购商城'], watermark: true },
    component: () => import('@/views/lute-os/internalPurchase/shoppingCart/index.vue'),
    name: 'shoppingCart',
  },
  {
    path: '/shoppingCart/settlement',
    meta: {
      title: '结算详情',
      activeMenu: '/shoppingCart/index',
      menuPath: ['内购商城'],
      watermark: true,
    },
    component: () => import('@/views/lute-os/internalPurchase/shoppingCart/settlement.vue'),
    name: 'shoppingCartSettlement',
  },
  {
    path: '/internalPurchase/orderCenter',
    meta: { title: '我的订单', menuPath: ['内购商城'], watermark: true },
    component: () => import('@/views/lute-os/internalPurchase/orderCenter/index.vue'),
    name: 'internalOrderCenter',
  },
  {
    path: '/internalPurchase/orderCenter/detail',
    meta: {
      title: '订单详情',
      activeMenu: '/internalPurchase/orderCenter',
      menuPath: ['内购商城'],
      watermark: true,
    },
    component: () => import('@/views/lute-os/internalPurchase/orderCenter/detail.vue'),
    name: 'internalOrderCenterDetail',
  },
  {
    path: '/internalPurchase/freightRule',
    meta: { title: '运费模板', menuPath: ['内购商城'] },
    component: () => import('@/views/lute-os/internalPurchase/freightRule/index.vue'),
    name: 'internalFreightRule',
  },
  {
    path: '/internalPurchase/freightRule/edit',
    meta: {
      title: '编辑运费模板',
      activeMenu: '/internalPurchase/freightRule',
      menuPath: ['内购商城'],
    },
    component: () => import('@/views/lute-os/internalPurchase/freightRule/edit.vue'),
    name: 'internalFreightRuleEdit',
  },
  {
    path: '/internalPurchase/freightRule/add',
    meta: {
      title: '新增运费模板',
      activeMenu: '/internalPurchase/freightRule',
      menuPath: ['内购商城'],
    },
    component: () => import('@/views/lute-os/internalPurchase/freightRule/edit.vue'),
    name: 'internalFreightRuleAdd',
  },
];

// 操作管理
const operationManageMenu = [];

// 供应链
const supplyChain = [];

// 红人管理/成效追踪（favoursystem）
const favourSystem = [
  {
    path: '/square',
    meta: { title: '红人收藏', menuPath: ['红人管理', '红人推广'] },
    component: () => import('@/views/lute-os/favoursystem/favourmanage/square/index.vue'),
    name: 'square',
  },
  {
    path: '/square/detail',
    meta: { title: '红人详情', activeMenu: '/square', menuPath: ['红人管理', '红人推广'] },
    component: () => import('@/views/lute-os/favoursystem/favourmanage/favourdetail/index.vue'),
    name: 'favourdetail',
  },
  {
    path: '/cooperate/manage',
    meta: { title: '合作管理', menuPath: ['红人管理', '红人推广'] },
    component: () => import('@/views/lute-os/favoursystem/favourmanage/cooperate/index.vue'),
    name: 'cooperatemanage',
  },
  {
    path: '/cooperate/mine',
    meta: { title: '我的合作', menuPath: ['红人管理', '红人推广'] },
    component: () => import('@/views/lute-os/favoursystem/favourmanage/cooperate/index.vue'),
    name: 'cooperatemine',
  },
  {
    path: '/favour/channel',
    meta: { title: '渠道管理', menuPath: ['红人管理', '基础配置'] },
    component: () => import('@/views/lute-os/favoursystem/baseconfig/channel.vue'),
    name: 'favourchannel',
  },
  {
    path: '/favour/type',
    meta: { title: '红人类型', menuPath: ['红人管理', '基础配置'] },
    component: () => import('@/views/lute-os/favoursystem/baseconfig/favourtype.vue'),
    name: 'favourtype',
  },
  {
    path: '/favour/goods',
    meta: { title: '合作商品', menuPath: ['红人管理', '基础配置'] },
    component: () => import('@/views/lute-os/favoursystem/baseconfig/cooperategoods.vue'),
    name: 'cooperategoods',
  },
  {
    path: '/favour/feedback',
    meta: { title: '调查问卷', menuPath: ['红人管理', '基础配置'] },
    component: () => import('@/views/lute-os/favoursystem/baseconfig/feedback.vue'),
    name: 'favourfeedback',
  },
  {
    path: '/cooperate/detail',
    meta: {
      title: '项目详情',
      activeMenu: '/cooperate/mine',
      menuPath: ['红人管理', '红人推广'],
    },
    component: () => import('@/views/lute-os/favoursystem/favourmanage/cooperatedetail/index.vue'),
    name: 'cooperatedetail',
  },
  {
    path: '/amazon/collectcode',
    meta: { title: '亚马逊折扣码', menuPath: ['红人管理', '红人推广'] },
    component: () =>
      import('@/views/lute-os/favoursystem/favourmanage/amazon/collectcode/index.vue'),
    name: 'amazoncollectcode',
  },
  {
    path: '/shopify/collectcode',
    meta: { title: '独立站折扣码', menuPath: ['红人管理', '红人推广'] },
    component: () =>
      import('@/views/lute-os/favoursystem/favourmanage/shopify/collectcode/index.vue'),
    name: 'shopifycollectcode',
  },
  {
    path: '/amazon/collectcode/add',
    meta: {
      title: '亚马逊申请折扣码',
      activeMenu: '/amazon/collectcode',
      menuPath: ['红人管理', '红人推广'],
    },
    component: () =>
      import('@/views/lute-os/favoursystem/favourmanage/amazon/addcollectcode/index.vue'),
    name: 'amazonaddcollectcode',
  },
  {
    path: '/shopify/collectcode/add',
    meta: {
      title: '独立站申请折扣码',
      activeMenu: '/shopify/collectcode',
      menuPath: ['红人管理', '红人推广'],
    },
    component: () =>
      import('@/views/lute-os/favoursystem/favourmanage/shopify/addcollectcode/index.vue'),
    name: 'shopifyaddcollectcode',
  },
  {
    path: '/shopify/operatetask',
    meta: { title: '独立站运营协作', menuPath: ['红人管理', '红人推广'] },
    component: () =>
      import('@/views/lute-os/favoursystem/favourmanage/shopify/operatetask/index.vue'),
    name: 'shopifyoperatetask',
  },
  {
    path: '/amazon/operatetask',
    meta: { title: '亚马逊运营协作', menuPath: ['红人管理', '红人推广'] },
    component: () =>
      import('@/views/lute-os/favoursystem/favourmanage/amazon/operatetask/index.vue'),
    name: 'amazonoperatetask',
  },
  {
    path: '/amazon/collectcodemap',
    meta: { title: '亚马逊折扣码映射', menuPath: ['红人管理', '基础配置'] },
    component: () =>
      import('@/views/lute-os/favoursystem/favourmanage/amazon/collectcodemap/index.vue'),
    name: 'amazoncollectcodemap',
  },
  {
    path: '/samplesend',
    meta: { title: '样品发货', menuPath: ['成效追踪', '红人推广'] },
    component: () => import('@/views/lute-os/favoursystem/perfortrack/samplesend/index.vue'),
    name: 'samplesend',
  },
  {
    path: '/samplesend/influencerSend',
    meta: { title: '红人发样', activeMenu: '/samplesend', menuPath: ['成效追踪', '红人推广'] },
    component: () => import('@/views/lute-os/favoursystem/perfortrack/samplesend/send.vue'),
    name: 'influencerSend',
  },
  {
    path: '/samplesend/detail',
    meta: { title: '发样详情', activeMenu: '/samplesend', menuPath: ['成效追踪', '红人推广'] },
    component: () => import('@/views/lute-os/favoursystem/perfortrack/samplesend/detail.vue'),
    name: 'samplesendDetail',
  },
  {
    path: '/samplesend/toFBA',
    meta: {
      title: '转FBA配送',
      activeMenu: '/samplesend',
      menuPath: ['订单', '发样订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/TTOrder/toFba.vue'),
    name: 'samplesendToFBA',
  },
];

// 数据市场
const datamarket = [];

// 在线学习系统
const onlineLearningSystem = [
  // // 在线学习系统 - 知识库
  // {
  //   path: '/knowledgeManage',
  //   meta: { title: '知识库' },
  //   component: () => import('@/views/lute-os/onlineLearningSystem/knowledgeManage/index.vue'),
  //   name: 'knowledgeManage',
  // },
  {
    path: '/onlineCourse',
    meta: { title: '线上课程' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/online/index.vue'),
    name: 'onlineCourse',
  },
  {
    path: '/onlineCourse/add',
    meta: { title: '添加课程', activeMenu: '/onlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/online/add.vue'),
    name: 'onlineCourseAdd',
  },
  {
    path: '/onlineCourse/edit',
    meta: { title: '编辑课程', activeMenu: '/onlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/online/edit.vue'),
    name: 'onlineCourseEdit',
  },
  {
    path: '/onlineCourse/detail',
    meta: { title: '课程详情', activeMenu: '/onlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/online/detail.vue'),
    name: 'onlineCourseDetail',
  },
  {
    path: '/onlineCourse/detailLog',
    meta: { title: '操作日志', activeMenu: '/onlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/online/log.vue'),
    name: 'onlineCourseLog',
  },
  {
    path: '/onlineCourse/detailCount',
    meta: { title: '课程统计', activeMenu: '/onlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/online/count.vue'),
    name: 'onlineCourseCount',
  },
  {
    path: '/offlineCourse',
    meta: { title: '线下课程' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/offline/index.vue'),
    name: 'offlineCourse',
  },
  {
    path: '/offlineCourse/add',
    meta: { title: '添加课程', activeMenu: '/offlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/offline/add.vue'),
    name: 'offlineCourseAdd',
  },
  {
    path: '/offlineCourse/edit',
    meta: { title: '编辑课程', activeMenu: '/offlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/offline/edit.vue'),
    name: 'offlineCourseEdit',
  },
  {
    path: '/offlineCourse/detail',
    meta: { title: '课程详情', activeMenu: '/offlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/offline/detail.vue'),
    name: 'offlineCourseDetail',
  },
  {
    path: '/offlineCourse/detailLog',
    meta: { title: '操作日志', activeMenu: '/offlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/offline/log.vue'),
    name: 'offlineCourseLog',
  },
  {
    path: '/offlineCourse/detailCount',
    meta: { title: '培训跟踪', activeMenu: '/offlineCourse' },
    component: () =>
      import('@/views/lute-os/onlineLearningSystem/learningManage/courseManage/offline/count.vue'),
    name: 'offlineCourseCount',
  },
];

// 邮件记录
const emailHistory = [
  // 邮件记录
  {
    path: '/emailHistory',
    meta: { title: '邮件记录', menuPath: ['邮件记录'] },
    component: () => import('@/views/lute-os/emailHistory/index.vue'),
    name: 'emailHistory',
  },
  {
    path: '/emailHistory/batchSearch',
    meta: { title: '批量查询', activeMenu: '/emailHistory/batchSearch', menuPath: ['邮件记录'] },
    component: () => import('@/views/lute-os/emailHistory/batchSearch.vue'),
    name: 'emailHistoryBatchSearch',
  },
  {
    path: '/emailHistory/batchSearchResult',
    meta: { title: '批量查询结果', activeMenu: '/emailHistory/batchSearch' },
    component: () => import('@/views/lute-os/emailHistory/batchSearchResult.vue'),
    name: 'emailHistoryBatchSearchResult',
  },
  {
    path: '/emailHistory/baseConfig',
    meta: { title: '基础配置', menuPath: ['邮件记录'] },
    component: () => import('@/views/lute-os/emailHistory/baseConfig.vue'),
    name: 'emailHistoryBaseConfig',
  },
  {
    path: '/emailManage',
    meta: { title: '邮箱管理' },
    component: () => import('@/views/lute-os/emailHistory/emailManage.vue'),
    name: 'emailManage',
  },
  {
    path: '/appealManage',
    meta: { title: '申诉管理' },
    component: () => import('@/views/lute-os/emailHistory/appealManage.vue'),
    name: 'appealManage',
  },
];

// 团队同步
const teamsync = [];

// 邮件触达
const emailTouch = [
  // 邮件记录
  {
    path: '/emailTouch',
    meta: { title: '邮件触达', activeMenu: '/emailTouch' },
    component: () => import('@/views/lute-os//emailTouch/index.vue'),
    name: 'emailTouch',
  },
  {
    path: '/favourEmailHistory',
    meta: { title: '往来邮箱', activeMenu: '/emailTouch', menuPath: ['邮件触达'] },
    component: () => import('@/views/lute-os//emailTouch/favourEmailHistory.vue'),
    name: 'favourEmailHistory',
  },
];

// 任务管理
const taskManage = [
  {
    path: '/taskManage',
    meta: { title: '任务管理', menuPath: ['任务管理'] },
    component: () => import('@/views/lute-os/taskManage/index.vue'),
    name: 'taskManage',
  },
  {
    path: '/taskManage/detail',
    meta: { title: '任务详情', activeMenu: '/taskManage' },
    component: () => import('@/views/lute-os/taskManage/detail.vue'),
    name: 'taskManageDetail',
  },
  {
    path: '/taskManage/create',
    meta: { title: '创建任务', activeMenu: '/taskManage' },
    component: () => import('@/views/lute-os/taskManage/create.vue'),
    name: 'taskManageCreate',
  },
];

// 价格管理
const price = [];

// 调价管理
const adjustPrice = [];

// 知识管理
const knowledgeManage = [
  {
    path: '/knowledgeManage/admin/courseLabel',
    meta: { title: '标签管理', menuPath: ['标签管理'] },
    component: () => import('@/views/lute-os/knowledgeManage/admin/label.vue'),
    name: 'knowledgeManageAdminCourseLabel',
  },
  {
    path: '/knowledgeManage/admin/course',
    meta: { title: '课程池', menuPath: ['课程池'] },
    component: () => import('@/views/lute-os/knowledgeManage/admin/course.vue'),
    name: 'knowledgeManageAdminCourse',
  },
  {
    path: '/knowledgeManage/admin/taskList',
    meta: { title: '学员任务清单管理', menuPath: ['学员任务清单管理'] },
    component: () => import('@/views/lute-os/knowledgeManage/admin/index.vue'),
    name: 'knowledgeManageAdminTaskList',
  },
  {
    path: '/knowledgeManage/trainee/taskList',
    meta: { title: '学习清单-学员端', menuPath: ['学习清单-学员端'] },
    component: () => import('@/views/lute-os/knowledgeManage/trainee/index.vue'),
    name: 'knowledgeManageTraineeTaskList',
  },
];

const luteAssistant = [
  {
    meta: { title: '通知详情', notKeepAlive: true },
    path: '/luteAssistant/notification/detail',
    name: 'LuteAssistantNotificationDetail',
    component: () => import('@/views/lute-os/luteAssistant/notification/detail.vue'),
  },
  {
    meta: { title: '通知' },
    path: '/luteAssistant/notification',
    name: 'LuteAssistantNotification',
    component: () => import('@/views/lute-os/luteAssistant/notification/index.vue'),
  },
  {
    meta: { title: '工具配置', notKeepAlive: true },
    path: '/luteAssistant/utilconfig/detail',
    name: 'LuteAssistantUtilConfigDetail',
    component: () => import('@/views/lute-os/luteAssistant/utilconfig/detail.vue'),
  },
  {
    meta: { title: '工具配置' },
    path: '/luteAssistant/utilconfig',
    name: 'LuteAssistantUtilConfig',
    component: () => import('@/views/lute-os/luteAssistant/utilconfig/index.vue'),
  },
  {
    meta: { title: '智能体配置', notKeepAlive: true },
    path: '/luteAssistant/agentconfig/detail',
    name: 'LuteAssistantAgentConfigDetail',
    component: () => import('@/views/lute-os/luteAssistant/agentconfig/detail.vue'),
  },
  {
    meta: { title: '智能体配置' },
    path: '/luteAssistant/agentconfig',
    name: 'LuteAssistantAgentConfig',
    component: () => import('@/views/lute-os/luteAssistant/agentconfig/index.vue'),
  },
  {
    meta: { title: '路小特' },
    path: '/luteAssistant/share',
    name: 'LuteAssistantShare',
    component: () => import('@/views/lute-os/luteAssistant/share/index.vue'),
  },
];

// 需求管理
const demandWorkbenchComponent = () =>
  import('@/views/lute-os/demandManage_5.0/app/DemandManageWorkbench.vue');

const demandManage = [
  {
    path: '/demand/workbench',
    name: 'demandWorkbench5',
    component: demandWorkbenchComponent,
    meta: {
      title: '用研需求工作台',
      menuPath: ['需求管理'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/submit/create',
    name: 'demandSubmitCreate',
    component: demandWorkbenchComponent,
    meta: {
      title: '需求提交',
      menuPath: ['需求管理'],
      isForm: true,
      notKeepAlive: true,
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/submit/list',
    name: 'demandSubmitList',
    component: demandWorkbenchComponent,
    meta: {
      title: '需求列表',
      menuPath: ['需求列表'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/submit/approve',
    name: 'demandSubmitToApprove',
    component: demandWorkbenchComponent,
    meta: {
      title: '待审批',
      menuPath: ['需求提交管理'],
      openInNewTab: true,
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/submit/my',
    name: 'demandSubmitMyDemand',
    component: demandWorkbenchComponent,
    meta: {
      title: '我的需求',
      menuPath: ['需求提交管理'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/submit/done',
    name: 'demandSubmitDone',
    component: demandWorkbenchComponent,
    meta: {
      title: '已完结',
      menuPath: ['需求提交管理'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/execute/list',
    name: 'demandExecuteList',
    component: demandWorkbenchComponent,
    meta: {
      title: '需求管理列表',
      menuPath: ['需求执行管理'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/execute/approve',
    name: 'demandExecuteToApprove',
    component: demandWorkbenchComponent,
    meta: {
      title: '待审批',
      menuPath: ['需求执行管理'],
      openInNewTab: true,
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/execute/process',
    name: 'demandExecuteToProcess',
    component: demandWorkbenchComponent,
    meta: {
      title: '待内审',
      menuPath: ['需求执行管理'],
      openInNewTab: true,
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/execute/my',
    name: 'demandExecuteMyDemand',
    component: demandWorkbenchComponent,
    meta: {
      title: '我的需求',
      menuPath: ['需求执行管理'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/detail/:id',
    name: 'demandDetail',
    component: demandWorkbenchComponent,
    meta: {
      title: '需求详情',
      notKeepAlive: true,
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'workbench',
    },
  },
  {
    path: '/demand/leadValue/list',
    name: 'demandLeadValueList',
    component: () => import('@/views/lute-os/demandManage/leadValue/index.vue'),
    meta: {
      title: '需求线索价值评估',
      menuPath: ['需求管理', '需求线索价值评估'],
      notKeepAlive: true,
    },
  },
  {
    path: '/demand/leadDeptMapping/list',
    name: 'demandLeadDeptMappingList',
    component: () => import('@/views/lute-os/demandManage/leadDeptMapping/index.vue'),
    meta: {
      title: '需求线索组织映射',
      menuPath: ['需求管理', '需求线索组织映射'],
      notKeepAlive: true,
    },
  },
  {
    path: '/demand/myLead/list',
    name: 'myDemandLeadList',
    component: () => import('@/views/lute-os/demandManage/myLead/MyLeadList.vue'),
    meta: {
      title: '我的需求提案',
      menuPath: ['需求管理', '我的需求提案'],
      notKeepAlive: true,
    },
  },
  {
    path: '/demand/myLead/create',
    name: 'demandLeadCreate',
    component: () => import('@/views/lute-os/demandManage/myLead/LeadCreate.vue'),
    meta: {
      title: '用户需求提案提交',
      activeMenu: '/demand/myLead/list',
      menuPath: ['需求管理', '我的需求提案'],
    },
  },
  {
    path: '/demand/myLead/detail/:leadCode',
    name: 'demandLeadDetail',
    component: () => import('@/views/lute-os/demandManage/myLead/LeadDetail.vue'),
    meta: {
      title: '需求提案详情',
      activeMenu: '/demand/myLead/list',
      notKeepAlive: true,
    },
  },
  {
    path: '/demand/auditSettingDemand',
    name: 'demandAuditSetting',
    component: () => import('@/views/lute-os/auditSettingDemand/index.vue'),
    meta: {
      title: '审核流设置',
    },
  },
  {
    path: '/demand/auditSettingDemand/add',
    meta: {
      title: '新增审核流',
      activeMenu: '/demand/auditSettingDemand',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/lute-os/auditSettingDemand/add.vue'),
    name: 'auditSettingAdd',
  },
  {
    path: '/demand/auditSettingDemand/edit',
    meta: {
      title: '编辑审核流',
      activeMenu: '/demand/auditSettingDemand',
    },
    component: () => import('@/views/lute-os/auditSettingDemand/edit.vue'),
    name: 'auditSettingEdit',
  },
  {
    path: '/demand/auditSettingDemand/detail',
    meta: {
      title: '审核流详情',
      activeMenu: '/demand/auditSettingDemand',
    },
    component: () => import('@/views/lute-os/auditSettingDemand/detail.vue'),
    name: 'auditSettingDetail',
  },
  // 需求统计页面
  {
    path: '/demand/statistics',
    name: 'demandStatistics',
    component: demandWorkbenchComponent,
    meta: {
      title: '需求数据统计',
      menuPath: ['需求数据统计'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'statistics',
    },
  },
  {
    path: '/demand/statistics/personal',
    name: 'demandStatisticsPersonal',
    component: demandWorkbenchComponent,
    meta: {
      title: '个人数据统计',
      menuPath: ['需求数据统计'],
      keepAliveScope: 'demand-manage',
      keepAliveBucket: 'statistics',
    },
  },
];

// 品牌需求管理
const brandDemandMng = [
  {
    path: '/brand/demand',
    name: 'brandDemandCreate',
    component: () => import('@/views/lute-os/brandDemandMange/demandCreate/index.vue'),
    meta: {
      title: '品牌需求提交',
      menuPath: ['需求管理'],
      isForm: true,
    },
  },
  {
    path: '/brand/demand/create',
    name: 'brandDemandSubmitCreate',
    component: () => import('@/views/lute-os/brandDemandMange/demandCreate/create.vue'),
    meta: {
      title: '品牌需求提交',
      menuPath: ['需求管理'],
      isForm: true,
    },
  },
  // 待审批
  {
    path: '/brand/demand/approve',
    name: 'brandDemandApprove',
    component: () => import('@/views/lute-os/brandDemandMange/demandSubmitManage/ToApprove.vue'),
    meta: {
      title: '待审批',
      menuPath: ['需求管理'],
    },
  },
  // 我的需求
  {
    path: '/brand/demand/my',
    name: 'brandDemandMy',
    component: () => import('@/views/lute-os/brandDemandMange/demandSubmitManage/MyDemand.vue'),
    meta: {
      title: '我的需求',
      menuPath: ['需求管理'],
    },
  },
  // 执行端-待审批
  {
    path: '/brand/demand/approve/execute',
    name: 'brandDemandApproveExecute',
    component: () => import('@/views/lute-os/brandDemandMange/demandExecuteManage/ToApprove.vue'),
    meta: {
      title: '待审批',
      menuPath: ['需求管理'],
    },
  },
  // 执行端-我的需求
  {
    path: '/brand/demand/my/execute',
    name: 'brandDemandMyExecute',
    component: () => import('@/views/lute-os/brandDemandMange/demandExecuteManage/MyDemand.vue'),
    meta: {
      title: '我的需求',
      menuPath: ['需求管理'],
    },
  },
  {
    path: '/brand/demand/detail/:id',
    name: 'brandDemandDetail',
    component: () => import('@/views/lute-os/brandDemandMange/demandDetail/index.vue'),
    meta: {
      title: '需求详情',
      menuPath: ['需求管理'],
      notKeepAlive: true,
    },
  },
];
// 采购需求管理
const procurementDemandMng = [
  {
    path: '/procurement/submit/create',
    name: 'procurementSubmitCreate',
    component: () => import('@/views/lute-os/procurementSystem/procurementSubmitCreate/index.vue'),
    meta: {
      title: '采购需求提交',
      menuPath: ['采购管理', '需求提交'],
      isForm: true,
      notKeepAlive: true,
    },
  },
  {
    path: '/procurement/submit/manage',
    name: 'procurementSubmitManage',
    component: () => import('@/views/lute-os/procurementSystem/procurementSubmitManage/index.vue'),
    meta: {
      title: '采购需求提交管理',
      menuPath: ['采购管理', '需求提交管理'],
    },
  },
  {
    path: '/procurement/execute/manage',
    name: 'procurementExecuteManage',
    component: () => import('@/views/lute-os/procurementSystem/procurementExecuteManage/index.vue'),
    meta: {
      title: '采购需求执行管理',
      menuPath: ['采购管理', '需求执行管理'],
    },
  },
  {
    path: '/procurement/execute/mine',
    name: 'procurementExecuteMyDemand',
    component: () => import('@/views/lute-os/procurementSystem/procurementExecuteManage/myDemand.vue'),
    meta: {
      title: '采购执行-我的需求',
      menuPath: ['采购管理', '需求执行管理', '我的需求'],
    },
  },
  {
    path: '/procurement/execute/detail/:id',
    name: 'procurementExecuteDetail',
    component: () => import('@/views/lute-os/procurementSystem/detail/index.vue'),
    meta: {
      title: '采购需求详情',
      menuPath: ['采购管理', '需求执行管理'],
      hidden: true,
      notKeepAlive: true,
    },
  },
];
// 智能会议室
const smartMeetingRoom = [
    {
        path: '/smartMeetingRoom',
        name: 'smartMeetingRoom',
        component: () => import('@/views/lute-os/smartMeetingRoom/index.vue'),
        meta: {
            title: '会议室列表',
            menuPath: ['会议室列表']
        }
    },
    {
        path: '/smartMeetingRoom/deviceLedger',
        name: 'smartMeetingRoomDeviceLedger',
        component: () => import('@/views/lute-os/smartMeetingRoom/deviceLedger/index.vue'),
        meta: {
            title: '设备台账管理',
            activeMenu: '/smartMeetingRoom',
            menuPath: ['会议室列表']
        }
    },
    {
        path: '/smartMeetingRoom/deviceLedger/detail/:deviceCode',
        name: 'smartMeetingRoomDeviceLedgerDetail',
        component: () => import('@/views/lute-os/smartMeetingRoom/deviceLedger/Detail.vue'),
        meta: {
            title: '设备详情',
            activeMenu: '/smartMeetingRoom/deviceLedger',
            menuPath: ['会议室列表', '设备台账管理']
        }
    },
    {
        path: '/smartMeetingRoom/mySchedule',
        name: 'smartMeetingRoomMySchedule',
        component: () => import('@/views/lute-os/smartMeetingRoom/mySchedule/index.vue'),
        meta: {
            title: '我的日程',
            activeMenu: '/smartMeetingRoom',
            menuPath: ['会议室列表']
        }
    },
    {
        path: '/smartMeetingRoom/automationTask',
        name: 'smartMeetingRoomAutomationTask',
        component: () => import('@/views/lute-os/smartMeetingRoom/automationTask/index.vue'),
        meta: {
            title: '自动化任务管理',
            activeMenu: '/smartMeetingRoom',
            menuPath: ['会议室列表']
        }
    },
    {
        path: '/smartMeetingRoom/executionLog',
        name: 'smartMeetingRoomExecutionLog',
        component: () => import('@/views/lute-os/smartMeetingRoom/executionLog/index.vue'),
        meta: {
            title: '任务执行概览与日志',
            activeMenu: '/smartMeetingRoom',
            menuPath: ['会议室列表']
        }
    }
];

const osRawRoutes = [
  {
    path: '/',
    meta: { hidden: true },
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: window.location.host === 'admin.cozyprogram.com' ? '/navigation' : '/personalCenter',
    children: [
      // 路小特首页
      {
        meta: { title: '路小特' },
        path: '/luteAssistantApp',
        name: 'LuteAssistantApp',
        component: () => import('@/views/lute-os/luteAssistant/app/index.vue'),
      },
      // 流程导航
      {
        path: '/processManage',
        meta: { title: '流程导航', menuPath: ['流程导航'] },
        component: () => import('@/views/lute-os/processNavigation/processManage/index.vue'),
        name: 'processManage',
      },
      {
        path: '/processManage/addApprove',
        meta: { title: '填写审批', activeMenu: '/processManage', menuPath: ['流程导航'] },
        component: () => import('@/views/lute-os/processNavigation/processManage/approve.vue'),
        name: 'addApprove',
      },
      {
        path: '/eventManage',
        meta: { title: '事项管理', menuPath: ['流程导航'] },
        component: () => import('@/views/lute-os/processNavigation/eventManage/index.vue'),
        name: 'eventManage',
      },
      {
        path: '/eventManage/detail',
        meta: { title: '事项详情', activeMenu: '/eventManage', menuPath: ['事项管理'] },
        component: () => import('@/views/lute-os/processNavigation/eventManage/detail.vue'),
        name: 'detailEvent',
      },
      {
        path: '/myEvents',
        meta: { title: '我的事项', menuPath: ['流程导航'] },
        component: () => import('@/views/lute-os/processNavigation/myEvents/index.vue'),
        name: 'myEvents',
      },
      {
        path: '/myEvents/detail',
        meta: { title: '查看详情', activeMenu: '/myEvents', menuPath: ['流程导航', '我的事项'] },
        component: () => import('@/views/lute-os/processNavigation/myEvents/detail.vue'),
        name: 'myEventDetail',
      },
      {
        path: '/meeting',
        meta: { title: '评价列表', activeMenu: '/myEvents', menuPath: ['会议评价管理'] },
        component: () => import('@/views/lute-os/processNavigation/meeting/index.vue'),
        name: 'meeting',
      },
      {
        path: '/meeting/detail',
        meta: { title: '会议详情', activeMenu: '/myEvents', menuPath: ['会议评价管理'] },
        component: () => import('@/views/lute-os/processNavigation/meeting/detail.vue'),
        name: 'meetingdetail',
      },
      {
        path: '/externalReception',
        meta: { title: '对外招待申请', activeMenu: '', menuPath: ['OA提效'] },
        component: () =>
          import('@/views/lute-os/processNavigation/OAProcess/externalReception/index.vue'),
        name: 'externalReception',
      },
      {
        path: '/externalReception/add',
        meta: { title: '新增招待申请', activeMenu: '/externalReception', menuPath: ['OA提效'] },
        component: () =>
          import('@/views/lute-os/processNavigation/OAProcess/externalReception/add.vue'),
        name: 'externalReceptionAdd',
      },
      {
        path: '/externalReception/detail',
        meta: { title: '申请记录详情', activeMenu: '/externalReception', menuPath: ['OA提效'] },
        component: () => import('@/views/lute-os/processNavigation/myEvents/detail.vue'),
        name: 'externalReceptionDetail',
      },
      {
        path: '/externalReceptionRecord',
        meta: { title: '申请记录管理', activeMenu: '', menuPath: ['OA提效'] },
        component: () =>
          import('@/views/lute-os/processNavigation/OAProcess/externalReception/record.vue'),
        name: 'externalReceptionRecord',
      },
      {
        path: '/externalReceptionRecord/detail',
        meta: {
          title: '申请记录详情',
          activeMenu: '/externalReceptionRecord',
          menuPath: ['OA提效'],
        },
        component: () => import('@/views/lute-os/processNavigation/myEvents/detail.vue'),
        name: 'externalReceptionRecordDetail',
      },
      {
        path: '/agencylist',
        meta: { title: '营销资源', menuPath: ['营销'] },
        component: () => import('@/views/lute-os/resourcemanage/agencymanage/agency/index.vue'),
        name: 'agencylist',
      },
      {
        path: '/agency/add',
        meta: { title: '新增资源', menuPath: ['营销'] },
        component: () => import('@/views/lute-os/resourcemanage/agencymanage/agency/add.vue'),
        name: 'agencyadd',
      },
      {
        path: '/agency/edit',
        meta: { title: '编辑资源', menuPath: ['营销'] },
        component: () => import('@/views/lute-os/resourcemanage/agencymanage/agency/add.vue'),
        name: 'agencyedit',
      },
      {
        path: '/agency/detail',
        meta: { title: '查看资源详情', menuPath: ['营销', '资源详情'] },
        component: () => import('@/views/lute-os/resourcemanage/agencymanage/agency/detail.vue'),
        name: 'agencydetail',
      },
      {
        path: '/medialist',
        meta: { title: '媒体资源', menuPath: ['营销', '媒体资源'] },
        component: () => import('@/views/lute-os/resourcemanage/media/index.vue'),
        name: 'medialist',
      },
      {
        path: '/mediadetail',
        meta: { title: '媒体资源', menuPath: ['媒体资源', '资源详情'] },
        component: () => import('@/views/lute-os/resourcemanage/media/detail.vue'),
        name: 'mediadetail',
      },
      {
        path: '/designtasklist',
        meta: { title: '我的任务', menuPath: ['设计任务', '任务列表'] },
        component: () => import('@/views/lute-os/designtask/tasklist/list.vue'),
        name: 'designtasklist',
      },
      {
        path: '/designtaskpool',
        meta: { title: '任务池', menuPath: ['设计任务', '任务列表'] },
        component: () => import('@/views/lute-os/designtask/tasklist/pool.vue'),
        name: 'designtaskpool',
      },
      {
        path: '/designtasktodo',
        meta: { title: '待办中心', menuPath: ['设计任务', '任务列表'] },
        component: () => import('@/views/lute-os/designtask/tasklist/todo.vue'),
        name: 'designtasktodo',
      },
      {
        path: '/designtask/operate/edit',
        meta: { title: '任务操作', menuPath: ['设计任务', '任务列表'] },
        component: () => import('@/views/lute-os/designtask/tasklist/operate.vue'),
        name: 'designtaskoperate',
      },
      {
        path: '/designtask/operatetype/edit',
        meta: { title: '任务操作', menuPath: ['设计任务', '任务列表'], notKeepAlive: true },
        component: () => import('@/views/lute-os/designtask/tasklist/operatetype.vue'),
        name: 'designtaskoperatetype',
      },
      {
        path: '/designtaskconfig',
        meta: { title: '任务配置管理', menuPath: ['设计任务'] },
        component: () => import('@/views/lute-os/designtask/taskconfig/index.vue'),
        name: 'designtaskconfig',
      },
      {
        path: '/designtaskconfig/score/edit',
        meta: {
          title: '设计分数配置',
          activeMenu: '/designtaskconfig',
          menuPath: ['设计任务', '任务配置管理'],
        },
        component: () => import('@/views/lute-os/designtask/taskconfig/score/edit.vue'),
        name: 'designtaskconfigscore',
      },
      {
        path: '/designtaskconfig/notice/edit',
        meta: {
          title: '类型配置及通知',
          activeMenu: '/designtaskconfig',
          menuPath: ['设计任务', '任务配置管理'],
        },
        component: () => import('@/views/lute-os/designtask/taskconfig/notice/edit.vue'),
        name: 'designtaskconfignotice',
      },
      {
        path: '/designtaskanalysis',
        meta: { title: '统计分析', menuPath: ['设计任务'] },
        component: () => import('@/views/lute-os/designtask/analysis/index.vue'),
        name: 'designtaskanalysis',
      },
      {
        path: '/analysissatisfaction',
        meta: { title: '用户满意度分析', menuPath: ['设计任务', '统计分析'] },
        component: () => import('@/views/lute-os/designtask/analysis/satisfaction/index.vue'),
        name: 'analysissatisfaction',
      },
      // 运营管理-商品到期策略

      // 供应链相关
      ...supplyChain,
      {
        path: '/filemanage', // 代码切换至素材中心管理端
        meta: { title: '文控中心' },
        component: () => import('@/views/lute-os/materialcenter/backend.vue'),
        name: 'filemanage',
      },
      {
        path: '/filemanage/tag',
        meta: {
          title: '标签管理',
          menuPath: ['文控中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/tag.vue'),
        name: 'filemanagetag',
      },
      {
        path: '/materialcenter/backend',
        meta: {
          title: '素材中心管理端',
          menuPath: ['素材中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/backend.vue'),
        name: 'materialcenterbackend',
      },
      {
        path: '/materialcenter/mine',
        meta: {
          title: '我的素材',
          menuPath: ['素材中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/backend.vue'),
        name: 'materialcentermine',
      },
      {
        path: '/materialcenter/userend',
        meta: {
          title: '素材中心用户端',
          menuPath: ['素材中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/userend.vue'),
        name: 'materialcenteruserend',
      },
      {
        path: '/materialcenter/tag',
        meta: {
          title: '标签管理',
          menuPath: ['素材中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/tag.vue'),
        name: 'materialcentertag',
      },
      {
        path: '/materialcenter/customer/index',
        meta: {
          title: '素材中心',
        },
        component: () => import('@/views/lute-os/materialcenter/customer/index.vue'),
        name: 'materialcenterCustomerIndex',
      },
      {
        path: '/materialcenter/customerDetail',
        meta: {
          title: '素材中心',
          activeMenu: '/materialcenter/customer/index',
        },
        component: () => import('@/views/lute-os/materialcenter/customer/detail.vue'),
        name: 'materialcenterCustomerDetail',
      },
      {
        path: '/materialcenter/customer/tag',
        meta: {
          title: '标签管理',
        },
        component: () => import('@/views/lute-os/materialcenter/customer/tag.vue'),
        name: 'materialcenterCustomerTag',
      },
      ...onlineLearningSystem,
      {
        path: '/knowledgemanage', // 代码切换至素材中心管理端
        meta: { title: '知识库' },
        component: () => import('@/views/lute-os/materialcenter/backend.vue'),
        name: 'knowledgemanage',
      },
      {
        path: '/knowledgemanage/tag',
        meta: {
          title: '标签管理',
          menuPath: ['知识库'],
        },
        component: () => import('@/views/lute-os/materialcenter/tag.vue'),
        name: 'knowledgemanagetag',
      },
      {
        path: '/userprofile',
        meta: { title: '用户资料中心' },
        component: () => import('@/views/lute-os/materialcenter/backend.vue'),
        name: 'userprofile',
      },
      {
        path: '/userprofile/tag',
        meta: {
          title: '标签管理',
          menuPath: ['用户资料中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/tag.vue'),
        name: 'userprofiletag',
      },
      {
        path: '/cdxdesigncenter',
        meta: {
          title: '设计素材',
          menuPath: ['CDX设计中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/backend.vue'),
        name: 'cdxDesignCenter',
      },
      {
        path: '/cdxdesigncenter/tag',
        meta: {
          title: '标签管理',
          menuPath: ['CDX设计中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/tag.vue'),
        name: 'cdxDesignCenterTag',
      },
      {
        path: '/managerOffice',
        meta: {
          title: '文档管理',
          menuPath: ['总经办'],
        },
        component: () => import('@/views/lute-os/materialcenter/backend.vue'),
        name: 'managerOffice',
      },
      {
        path: '/managerOffice/tag',
        meta: {
          title: '标签管理',
          menuPath: ['总经办'],
        },
        component: () => import('@/views/lute-os/materialcenter/tag.vue'),
        name: 'managerOfficeTag',
      },
      {
        path: '/userprofile/userend',
        meta: {
          title: '产品资料',
          menuPath: ['用户资料中心'],
        },
        component: () => import('@/views/lute-os/materialcenter/userend.vue'),
        name: 'userprofileuserend',
      },
      ...operationManageMenu,
      ...datamarket,
      ...emailHistory,
      ...emailTouch,
      ...favourSystem,
      ...internalPurchase,
      ...taskManage,
      ...price,
      ...adjustPrice,
      ...knowledgeManage,
      ...luteAssistant,
      ...demandManage,
      ...brandDemandMng,
      ...smartMeetingRoom,
      ...procurementDemandMng,
    ],
  },

  // {
  //   path: '/screen',
  //   meta: { title: '其他layout页面', icon: 'HomeFilled' },
  //   component: () => import('@/xxx/xxx/index.vue'),
  //   name: 'screen',
  // },

  ...teamsync,
  // {
  //   path: '/appAuth',
  //   meta: { hidden: true },
  //   name: 'appAuth',
  // },
  {
    path: '/taskManage/dingding',
    component: () => import('@/views/lute-os/taskManage/dingdingDetail.vue'),
    meta: { hidden: true, title: '钉钉待办' },
    name: 'taskManageDingding',
  },
  {
    path: '/brand/demand/dingTalkDetail/:id',
    component: () => import('@/views/lute-os/brandDemandMange/dingTalkDetail/index.vue'),
    meta: { hidden: true, title: '钉钉待办' },
    name: 'brandDemandDingTalkDetail',
  },
  {
    path: '/demandMange/dingTalkDetail/:id',
    component: () => import('@/views/lute-os/demandManage_5.0/modules/dingtalk/DingTalkDetailPage.vue'),
    meta: { hidden: true, title: '钉钉待办', standalone: true },
    name: 'demandDingTalkDetail',
  },
  {
    path: '/demandMangeExecute/dingTalkDetail/:id',
    component: () => import('@/views/lute-os/demandManage_5.0/modules/dingtalk/DingTalkDetailPage.vue'),
    meta: { hidden: true, title: '钉钉待办', standalone: true },
    name: 'demandExecuteDingTalkDetail',
  },
  {
    path: '/procurement/dingTalkDetail/:id',
    component: () => import('@/views/lute-os/procurementSystem/dingTalkDetail/index.vue'),
    meta: { hidden: true, title: '钉钉待办' },
    name: 'procurementDingTalkDetail',
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { hidden: true },
    redirect: '/404',
    name: 'any',
  },
];

// function withOsPrefix(pathValue: string): string {
//   if (!pathValue) return pathValue;
//   if (pathValue.startsWith(OS_PATH_PREFIX + '/')) return pathValue;
//   if (pathValue === OS_PATH_PREFIX) return pathValue;
//   if (pathValue.startsWith('/')) return OS_PATH_PREFIX + pathValue;
//   return OS_PATH_PREFIX + '/' + pathValue;
// }
//
// function mapRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
//   return routes
//     .map((route) => {
//       const next: RouteRecordRaw = { ...route };
//       if (typeof next.path === 'string') next.path = withOsPrefix(next.path);
//       if (typeof (next as any).redirect === 'string') {
//         const red = (next as any).redirect as string;
//         if (red.startsWith('/')) (next as any).redirect = withOsPrefix(red);
//       }
//       if (Array.isArray(next.children)) next.children = mapRoutes(next.children);
//       return next;
//     });
// }

function getOsRoutes() {
  const raw = osRawRoutes as unknown as RouteRecordRaw[];
  const layout = raw.find((r: any) => r?.name === 'layout' && Array.isArray(r?.children)) as any;
  const layoutChildren = (layout?.children ?? []) as RouteRecordRaw[];
  const others = raw.filter(
    (r: any) => r !== layout && r?.name !== 'login' && r?.name !== 'any'
  ) as RouteRecordRaw[];

  const standalone = others.filter((r: any) => r.meta?.standalone);
  const nonStandaloneOthers = others.filter((r: any) => !r.meta?.standalone);

  return {
    osRoutes: [...layoutChildren, ...nonStandaloneOthers],
    osStandaloneRoutes: standalone,
  };
}

const { osRoutes: osRoutesData, osStandaloneRoutes: osStandaloneRoutesData } = getOsRoutes();

// Routes to be injected into ERP's layout children.
export const osRoutes = osRoutesData;
// Standalone routes to be registered at top level.
export const osStandaloneRoutes = osStandaloneRoutesData;
