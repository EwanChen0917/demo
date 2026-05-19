export default [
  // 系统用户
  {
    path: '/systemPopulation',
    meta: { title: '系统人群', menuPath: ['用户分群', '用户中心'] },
    component: () => import('@/views/usercenter/systemPopulation/index.vue'),
    name: 'systemPopulation',
  },
  {
    path: '/systemPopulationDetail',
    meta: {
      title: '人群详情',
      activeMenu: '/systemPopulation',
      menuPath: ['用户分群', '用户中心'],
    },
    component: () => import('@/views/usercenter/systemPopulation/detail.vue'),
    name: 'systemPopulationDetail',
  },
  {
    path: '/userLabel',
    meta: { title: '标签管理', menuPath: ['用户中心'] },
    component: () => import('@/views/usercenter/userLabel/index.vue'),
    name: 'userLabel',
  },
  {
    path: '/userLabelDetail',
    meta: { title: '标签详情', activeMenu: '/userLabel', menuPath: ['用户中心'] },
    component: () => import('@/views/usercenter/userLabel/detail.vue'),
    name: 'userLabelDetail',
  },
  {
    path: '/userlist',
    meta: { title: '用户列表', menuPath: ['用户管理', '用户中心'] },
    component: () => import('@/views/usercenter/usermanage/userlist/index.vue'),
    name: 'userlist',
  },
  {
    path: '/userlist/detail',
    meta: { title: '用户详情', activeMenu: '/userlist', menuPath: ['用户管理', '用户中心'] },
    component: () => import('@/views/usercenter/usermanage/userdetail/index.vue'),
    name: 'userdetail',
  },
  {
    path: '/userlist/userorderdetail',
    meta: { title: '订单详情', activeMenu: '/userlist', menuPath: ['用户管理', '用户中心'] },
    component: () => import('@/views/usercenter/usermanage/userorderdetail/index.vue'),
    name: 'userorderdetail',
  },
  {
    path: '/userlist/servicedetail',
    meta: { title: '设备详情', activeMenu: '/userlist', menuPath: ['用户管理', '用户中心'] },
    component: () => import('@/views/usercenter/usermanage/servicedetail/index.vue'),
    name: 'servicedetail',
  },
  {
    path: '/subscriberlist',
    meta: { title: '游客列表', menuPath: ['用户管理', '用户中心'] },
    component: () => import('@/views/usercenter/subscribermanage/subscriberlist/index.vue'),
    name: 'subscriberlist',
  },
  // 用户中心 - 积分商城
  {
    path: '/pointsgoodslist',
    meta: { title: '兑换商品列表', menuPath: ['积分商城', '用户中心'] },
    component: () => import('@/views/usercenter/pointsmall/goodslist/index.vue'),
    name: 'pointsgoodslist',
  },
  {
    path: '/pointsgoodslist/detail',
    meta: {
      title: '兑换商品详情',
      activeMenu: '/pointsgoodslist',
      menuPath: ['积分商城', '用户中心'],
    },
    component: () => import('@/views/usercenter/pointsmall/goodsdetail/index.vue'),
    name: 'pointsgoodsdetail',
  },
  // 用户中心 - 规则管理
  {
    path: '/memberule',
    meta: { title: '会员等级/权益', menuPath: ['规则管理', '用户中心'] },
    component: () => import('@/views/usercenter/rulemanage/memberule/index.vue'),
    name: 'memberule',
  },
  {
    path: '/pointrule',
    meta: { title: '积分规则', menuPath: ['规则管理', '用户中心'] },
    component: () => import('@/views/usercenter/rulemanage/pointrule/index.vue'),
    name: 'pointrule',
  },
  // {
  //   path: '/amazontasks',
  //   meta: { title: '亚马逊评价任务', menuPath: ['包裹卡', '用户中心'] },
  //   component: () => import('@/views/usercenter/activitymanage/parcel/amazontasks/index.vue'),
  //   name: 'amazontasks',
  // },
  // 用户中心 - 活动管理
  {
    path: '/activitylist',
    meta: { title: '抽奖活动', menuPath: ['活动管理', '用户中心'] },
    component: () => import('@/views/usercenter/activitymanage/activitylist/index.vue'),
    name: 'activitylist',
  },
  {
    path: '/activitylist/detail',
    meta: {
      title: '活动详情',
      activeMenu: '/activitylist',
      menuPath: ['活动管理', '用户中心'],
    },
    component: () => import('@/views/usercenter/activitymanage/activitydetail/index.vue'),
    name: 'activitydetail',
  },
  {
    path: '/activitylist/add',
    meta: {
      title: '活动详情',
      activeMenu: '/activitylist',
      menuPath: ['活动管理', '用户中心'],
    },
    component: () => import('@/views/usercenter/activitymanage/activityadd/index.vue'),
    name: 'activityadd',
  },
  {
    path: '/prizecollection',
    meta: { title: '抽奖奖品收集', menuPath: ['活动管理', '用户中心'] },
    component: () => import('@/views/usercenter/activitymanage/prizecollection/index.vue'),
    name: 'prizecollection',
  },
];
