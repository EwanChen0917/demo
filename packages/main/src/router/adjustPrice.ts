export default [
  // 亚马逊调价
  {
    path: '/amazonadjustlist',
    meta: { title: '亚马逊调价列表', menuPath: ['调价活动管理', '调价系统'] },
    component: () => import('@/views/adjustprice/adjustplatform/amazonadjust/index.vue'),
    name: 'amazonadjustlist',
  },
  {
    path: '/amazonadjust/add',
    meta: {
      title: '新增调价（亚马逊）',
      activeMenu: '/amazonadjustlist',
      menuPath: ['亚马逊调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/amazonadjust/add.vue'),
    name: 'amazonadjustadd',
  },
  {
    path: '/amazonadjust/edit',
    meta: {
      title: '编辑调价（亚马逊）',
      activeMenu: '/amazonadjustlist',
      menuPath: ['亚马逊调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/amazonadjust/edit.vue'),
    name: 'amazonadjustedit',
  },
  {
    path: '/amazonadjust/detail',
    meta: {
      title: '调价详情（亚马逊）',
      activeMenu: '/amazonadjustlist',
      menuPath: ['亚马逊调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/amazonadjust/detail.vue'),
    name: 'amazonadjustdetail',
  },
  {
    path: '/childasinlist',
    meta: { title: '子ASIN调价列表', menuPath: ['调价活动管理', '调价系统'] },
    component: () => import('@/views/adjustprice/adjustplatform/childasin/index.vue'),
    name: 'childasinlist',
  },
  {
    path: '/childasin/detail',
    meta: {
      title: '调价详情（子ASIN）',
      activeMenu: '/childasinlist',
      menuPath: ['子ASIN调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/childasin/detail.vue'),
    name: 'childasindetail',
  },
  // 独立站调价
  {
    path: '/shopifyadjustlist',
    meta: { title: '独立站调价列表', menuPath: ['调价活动管理', '调价系统'] },
    component: () => import('@/views/adjustprice/adjustplatform/shopifyadjust/index.vue'),
    name: 'shopifyadjustlist',
  },
  {
    path: '/shopifyadjust/add',
    meta: {
      title: '新增调价（独立站）',
      activeMenu: '/shopifyadjustlist',
      menuPath: ['独立站调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/shopifyadjust/add.vue'),
    name: 'shopifyadjustadd',
  },
  {
    path: '/shopifyadjust/edit',
    meta: {
      title: '编辑调价（独立站）',
      activeMenu: '/shopifyadjustlist',
      menuPath: ['独立站调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/shopifyadjust/edit.vue'),
    name: 'shopifyadjustedit',
  },
  {
    path: '/shopifyadjust/detail',
    meta: {
      title: '调价详情（独立站）',
      activeMenu: '/shopifyadjustlist',
      menuPath: ['独立站调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/shopifyadjust/detail.vue'),
    name: 'shopifyadjustdetail',
  },
  {
    path: '/skuadjustlist',
    meta: { title: 'SKU调价列表', menuPath: ['调价活动管理', '调价系统'] },
    component: () => import('@/views/adjustprice/adjustplatform/skuadjust/index.vue'),
    name: 'skuadjustlist',
  },
  {
    path: '/skuadjust/detail',
    meta: {
      title: 'SKU调价详情',
      activeMenu: '/skuadjustlist',
      menuPath: ['SKU调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/skuadjust/detail.vue'),
    name: 'skuadjustdetail',
  },
  // 新平台调价
  {
    path: '/newplatformadjustlist',
    meta: { title: '新平台调价列表', menuPath: ['调价活动管理', '调价系统'] },
    component: () => import('@/views/adjustprice/adjustplatform/newplatformadjust/index.vue'),
    name: 'newplatformadjustlist',
  },
  {
    path: '/newplatformadjust/add',
    meta: {
      title: '新增调价（新平台）',
      activeMenu: '/newplatformadjustlist',
      menuPath: ['新平台调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/newplatformadjust/add.vue'),
    name: 'newplatformadjustadd',
  },
  {
    path: '/newplatformadjust/edit',
    meta: {
      title: '编辑调价（新平台）',
      activeMenu: '/newplatformadjustlist',
      menuPath: ['新平台调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/newplatformadjust/edit.vue'),
    name: 'newplatformadjustedit',
  },
  {
    path: '/newplatformadjust/detail',
    meta: {
      title: '调价详情（新平台）',
      activeMenu: '/newplatformadjustlist',
      menuPath: ['新平台调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/newplatformadjust/detail.vue'),
    name: 'newplatformadjustdetail',
  },
  {
    path: '/itemidadjustlist',
    meta: { title: 'itemID调价列表', menuPath: ['调价活动管理', '调价系统'] },
    component: () => import('@/views/adjustprice/adjustplatform/itemidadjust/index.vue'),
    name: 'itemidadjustlist',
  },
  {
    path: '/itemidadjust/detail',
    meta: {
      title: 'itemID调价详情',
      activeMenu: '/itemidadjustlist',
      menuPath: ['itemID调价列表', '调价活动管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/adjustplatform/itemidadjust/detail.vue'),
    name: 'itemidadjustdetail',
  },

  // tiktok调价
  {
    path: '/tiktokadjustlist',
    meta: { title: 'TikTok调价列表' },
    component: () => import('@/views/adjustprice/adjustplatform/tiktokadjust/index.vue'),
    name: 'tiktokadjustlist',
  },
  {
    path: '/tiktokadjust/add',
    meta: {
      title: '新增调价（tiktok）',
      activeMenu: '/tiktokadjustlist',
    },
    component: () => import('@/views/adjustprice/adjustplatform/tiktokadjust/add.vue'),
    name: 'tiktokadjustadd',
  },
  {
    path: '/tiktokadjust/edit',
    meta: {
      title: '编辑调价（tiktok）',
      activeMenu: '/tiktokadjustlist',
    },
    component: () => import('@/views/adjustprice/adjustplatform/tiktokadjust/edit.vue'),
    name: 'tiktokadjustedit',
  },
  {
    path: '/tiktokadjust/detail',
    meta: {
      title: '调价详情（tiktok）',
      activeMenu: '/tiktokadjustlist',
    },
    component: () => import('@/views/adjustprice/adjustplatform/tiktokadjust/detail.vue'),
    name: 'tiktokadjustdetail',
  },

  // 风控管理 - 亚马逊风控规则
  {
    path: '/riskControl',
    meta: {
      title: '风控管理',
      menuPath: [],
    },
    component: () => import('@/views/adjustprice/riskControl/index.vue'),
    name: 'riskControl',
  },
  {
    path: '/amazonRiskControlRule',
    meta: {
      title: '亚马逊风控规则',
      activeMenu: '/riskControl',
      menuPath: ['风控管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/riskControl/amazon.vue'),
    name: 'amazonRiskControlRule',
  },
  // 风控管理 - 亚马逊风控规则
  {
    path: '/stationRiskControlRule',
    meta: {
      title: '独立站风控规则',
      activeMenu: '/riskControl',
      menuPath: ['风控管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/riskControl/station.vue'),
    name: 'stationRiskControlRule',
  },
  // 风控管理 - 亚马逊风控规则
  {
    path: '/platformRiskControlRule',
    meta: {
      title: '新平台风控规则',
      activeMenu: '/riskControl',
      menuPath: ['风控管理', '调价系统'],
    },
    component: () => import('@/views/adjustprice/riskControl/platform.vue'),
    name: 'platformRiskControlRule',
  },
  {
    path: '/adjustpriceMonitor',
    meta: {
      title: '售价监控配置',
    },
    component: () => import('@/views/adjustprice/monitor/index.vue'),
    name: 'adjustpriceMonitor',
  },
  {
    path: '/competitorMonitor',
    meta: {
      title: '竞品监控',
    },
    component: () => import('@/views/adjustprice/competitorMonitor/index.vue'),
    name: 'competitorMonitor',
  },
  {
    path: '/adjustpriceMonitor/mskuConfig/edit',
    meta: {
      title: '配置监控商品',
      activeMenu: '/adjustpriceMonitor',
      menuPath: ['售价监控MSKU配置'],
    },
    component: () => import('@/views/adjustprice/monitor/mskuConfig.vue'),
    name: 'adjustpriceMonitorAdd',
  },
  {
    path: '/adjustpriceMonitor/skuConfig/edit',
    meta: {
      title: '配置监控商品',
      activeMenu: '/adjustpriceMonitor',
      menuPath: ['售价监控SKU配置'],
    },
    component: () => import('@/views/adjustprice/monitor/skuConfig.vue'),
    name: 'adjustpriceMonitorSkuConfig',
  },
  {
    path: '/adjustpriceMonitorError',
    meta: {
      title: '售价异常监控配置',
    },
    component: () => import('@/views/adjustprice/monitor/error.vue'),
    name: 'adjustpriceMonitorError',
  },
  {
    path: '/sameProductPriceComparison',
    meta: {
      title: '同品比价',
    },
    component: () => import('@/views/adjustprice/sameProductPriceComparison/index.vue'),
    name: 'sameProductPriceComparison',
  },
   {
    path: '/shopPerformance',
    meta: {
      title: '店铺绩效',
    },
    component: () => import('@/views/adjustprice/shopPerformance/index.vue'),
    name: 'shopPerformance',
  },
];
