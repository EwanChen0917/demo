export default [
  // 供应链管理 - 效率工具
  {
    path: '/salesForecasting',
    meta: { title: '销售预测', menuPath: ['供应链管理', '效率工具'] },
    component: () => import('@/views/supplyChainManage/efficiencyTools/salesForecasting/index.vue'),
    name: 'salesForecasting',
  },
  {
    path: '/salesStatistics',
    meta: { title: '销售统计', menuPath: ['销售预测', '计划交付'] },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesStatistics/index.vue'
      ),
    name: 'salesStatistics',
  },
  {
    path: '/salesForecastingList',
    meta: { title: '预测列表', menuPath: ['销售预测', '计划交付'] },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/index.vue'
      ),
    name: 'salesForecastingList',
  },
  {
    path: '/salesForecastingList/retailAdd',
    meta: { title: '预测列表', menuPath: ['销售预测', '计划交付'] },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingList/retailAdd.vue'
      ),
    name: 'salesForecastingListRetailAdd',
  },
  {
    path: '/salesForecastingAudit',
    meta: { title: '预测审核', menuPath: ['销售预测', '计划交付'] },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingAudit/index.vue'
      ),
    name: 'salesForecastingAudit',
  },
  {
    path: '/salesForecastingAudit/detail',
    meta: {
      title: '详情',
      activeMenu: '/salesForecastingAudit',
      menuPath: ['预测审核', '销售预测'],
    },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingAudit/detail.vue'
      ),
    name: 'salesForecastingAuditDetail',
  },
  {
    path: '/salesForecastingAudit/edit',
    meta: {
      title: '编辑',
      activeMenu: '/salesForecastingAudit',
      menuPath: ['预测审核', '销售预测'],
    },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingAudit/edit.vue'
      ),
    name: 'salesForecastingAuditEdit',
  },
  {
    path: '/salesForecastingAudit/audit',
    meta: {
      title: '审核',
      activeMenu: '/salesForecastingAudit',
      menuPath: ['预测审核', '销售预测'],
    },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingAudit/audit.vue'
      ),
    name: 'salesForecastingAuditAction',
  },
  {
    path: '/salesForecastingSetting',
    meta: { title: '预测设置', menuPath: ['预测设置', '销售预测'] },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/index.vue'
      ),
    name: 'salesForecastingSetting',
  },
  {
    path: '/salesForecastingSetting/auditRule/add',
    meta: {
      title: '新增审核规则',
      activeMenu: '/salesForecastingSetting',
      menuPath: ['预测设置', '销售预测'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/auditRule/add.vue'),
    name: 'salesForecastingSettingAuditRuleAdd',
  },
  {
    path: '/salesForecastingSetting/auditRule/edit',
    meta: {
      title: '编辑审核规则',
      activeMenu: '/salesForecastingSetting',
      menuPath: ['预测设置', '销售预测'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/auditRule/edit.vue'),
    name: 'salesForecastingSettingAuditRuleEdit',
  },
  {
    path: '/salesForecastingSetting/auditRule/detail',
    meta: {
      title: '审核规则详情',
      activeMenu: '/salesForecastingSetting',
      menuPath: ['预测设置', '销售预测'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/auditRule/detail.vue'),
    name: 'salesForecastingSettingAuditRuleDetail',
  },

  {
    path: '/warehouseManage',
    meta: {
      title: '仓库归属',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/warehouseManage/index.vue'),
    name: 'warehouseManage',
  },
  {
    path: '/supplyCycle',
    meta: {
      title: '供应周期',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/supplyCycle/index.vue'),
    name: 'supplyCycle',
  },
  {
    path: '/requirementsPlan',
    meta: {
      title: '需求计划',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/requirementsPlan/index.vue'),
    name: 'requirementsPlan',
  },
  {
    path: '/requirementsAdvice',
    meta: {
      title: '需求建议',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/requirementsAdvice/index.vue'),
    name: 'requirementsAdvice',
  },
  {
    path: '/requirementsAdvice/detail',
    meta: {
      title: '需求建议详情',
      activeMenu: '/requirementsAdvice',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/requirementsAdvice/detail.vue'),
    name: 'requirementsAdviceDetail',
  },
  {
    path: '/turnoverDays',
    meta: {
      title: '自动备货',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/turnoverDays/index.vue'),
    name: 'turnoverDays',
  },
  {
    path: '/turnoverDays/stockLead',
    meta: {
      title: '备货时效',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/turnoverDays/stockLead.vue'),
    name: 'turnoverDaysStockLead',
  },
  {
    path: '/turnoverDays/detail',
    meta: {
      title: '周转详情',
      activeMenu: '/turnoverDays',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/turnoverDays/detail.vue'),
    name: 'turnoverDaysDetail',
  },
  {
    path: '/turnoverDays/turnoverStrategy',
    meta: {
      title: '周转策略',
      activeMenu: '/turnoverDays',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/turnoverDays/turnoverStrategy.vue'),
    name: 'turnoverStrategy',
  },
  {
    path: '/turnoverDays/turnoverStrategyTemplate',
    meta: {
      title: '周转策略模板',
      activeMenu: '/turnoverDays',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import(
        '@/views/supplyChainManage/efficiencyTools/turnoverDays/components/turnoverStrategyTemplate.vue'
      ),
    name: 'turnoverStrategyTemplate',
  },
  {
    path: '/turnoverAdjust',
    meta: {
      title: '备货调整',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/turnoverDays/turnoverAdjust.vue'),
    name: 'turnoverAdjust',
  },
  {
    path: '/pickupPlan',
    meta: {
      title: '提货计划',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/pickupPlan/index.vue'),
    name: 'pickupPlan',
  },
  {
    path: '/pickupPlan/add',
    meta: {
      title: '提货计划新增',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/pickupPlan/add.vue'),
    name: 'pickupPlanAdd',
  },
  {
    path: '/pickupPlan/edit',
    meta: {
      title: '提货计划编辑',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/pickupPlan/edit.vue'),
    name: 'pickupPlanEdit',
  },
  {
    path: '/pickupPlan/detail',
    meta: {
      title: '提货计划详情',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/pickupPlan/detail.vue'),
    name: 'pickupPlanDetail',
  },
  {
    path: '/pickupPlan/allDetail',
    meta: {
      title: '批量提货计划详情',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/pickupPlan/allDetail.vue'),
    name: 'allPickupPlanDetail',
  },
  {
    path: '/deliverDirections',
    meta: {
      title: '发货指令',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/deliverDirections/index.vue'),
    name: 'deliverDirections',
  },
  {
    path: '/deliverDirections/detail',
    meta: {
      title: '指令详情',
      activeMenu: '/deliverDirections',
      menuPath: ['供应链管理', '效率工具', '发货指令'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/deliverDirections/detail.vue'),
    name: 'deliverDirectionsDetail',
  },
  {
    path: '/deliverDirections/edit',
    meta: {
      title: '编辑指令',
      menuPath: ['供应链管理', '效率工具', '发货指令'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/deliverDirections/edit.vue'),
    name: 'deliverDirectionsEdit',
  },
  {
    path: '/cargoManage',
    meta: {
      title: '货件管理',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/cargoManage/index.vue'),
    name: 'cargoManage',
  },
  {
    path: '/fbaCargoManage',
    meta: {
      title: 'FBA货件管理',
      menuPath: ['发货管理', '货件管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/cargoManage/fba.vue'),
    name: 'fbaCargoManage',
  },
  {
    path: '/overSeaCargoManage',
    meta: {
      title: '海外仓货件管理',
      menuPath: ['发货管理', '货件管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/cargoManage/overSea.vue'),
    name: 'overSeaCargoManage',
  },
  {
    path: '/fbaSendManage',
    meta: {
      title: 'FBA发货单管理',
      menuPath: ['发货管理', '发货单管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/sendManage/fba.vue'),
    name: 'fbaSendManage',
  },
  {
    path: '/subscription',
    meta: {
      title: '申购单',
      menuPath: ['采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/subscription/index.vue'),
    name: 'subscription',
  },
  {
    path: '/subscription/add',
    meta: {
      title: '新增申购单',
      activeMenu: '/subscription',
      menuPath: ['申购单', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/subscription/add.vue'),
    name: 'subscriptionAdd',
  },
  {
    path: '/subscription/edit',
    meta: {
      title: '编辑申购单',
      activeMenu: '/subscription',
      menuPath: ['申购单', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/subscription/edit.vue'),
    name: 'subscriptionEdit',
  },
  {
    path: '/subscription/audit',
    meta: {
      title: '审核申购单',
      activeMenu: '/subscription',
      menuPath: ['申购单', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/subscription/audit.vue'),
    name: 'subscriptionAudit',
  },
  {
    path: '/subscription/detail',
    meta: {
      title: '申购单详情',
      activeMenu: '/subscription',
      menuPath: ['申购单', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/subscription/detail.vue'),
    name: 'subscriptionDetail',
  },
  {
    path: '/factoryDirectDelivery',
    meta: {
      title: '工厂直发工单',
      menuPath: ['申购单', '采购'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/factoryDirectDeliveryOrder/index.vue'),
    name: 'factoryDirectDelivery',
  },
  {
    path: '/factoryDirectDelivery/add',
    meta: {
      title: '工厂直发工单添加',
      menuPath: ['申购单', '采购'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/factoryDirectDeliveryOrder/add.vue'),
    name: 'factoryDirectDeliveryAdd',
  },
  {
    path: '/factoryDirectDelivery/detail',
    meta: {
      title: '工厂直发工单详情',
      menuPath: ['申购单', '采购'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/factoryDirectDeliveryOrder/detail.vue'),
    name: 'factoryDirectDeliveryDetail',
  },
  {
    path: '/factoryDirectDelivery/edit',
    meta: {
      title: '工厂直发工单详情',
      menuPath: ['申购单', '采购'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/factoryDirectDeliveryOrder/edit.vue'),
    name: 'factoryDirectDeliveryEdit',
  },
  {
    path: '/auditRule',
    meta: {
      title: '采购申请审核',
      menuPath: ['采购设置', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/auditRule/index.vue'),
    name: 'auditRule',
  },
  {
    path: '/auditRule/add',
    meta: {
      title: '新增审核规则',
      activeMenu: '/auditRule',
      menuPath: ['采购设置', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/auditRule/add.vue'),
    name: 'auditRuleAdd',
  },
  {
    path: '/auditRule/edit',
    meta: {
      title: '编辑审核规则',
      activeMenu: '/auditRule',
      menuPath: ['采购设置', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/auditRule/edit.vue'),
    name: 'auditRuleEdit',
  },
  {
    path: '/auditRule/detail',
    meta: {
      title: '详情',
      activeMenu: '/auditRule',
      menuPath: ['采购设置', '采购'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/auditRule/detail.vue'),
    name: 'auditRuleDetail',
  },
  {
    path: '/takeDeliveryManage',
    meta: {
      title: '提货管理',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/index.vue'),
    name: 'takeDeliveryManage',
  },
  {
    path: '/reservationInbound',
    meta: {
      title: '预约入库',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/reservationInbound/index.vue'),
    name: 'reservationInbound',
  },
  {
    path: '/reservationInbound/add',
    meta: {
      title: '新增预约入库单',
      activeMenu: '/reservationInbound',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/reservationInbound/add.vue'),
    name: 'reservationInboundAdd',
  },
  {
    path: '/reservationInbound/edit',
    meta: {
      title: '编辑预约入库单',
      activeMenu: '/reservationInbound',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/reservationInbound/edit.vue'),
    name: 'reservationInboundEdit',
  },
  {
    path: '/reservationInbound/detail',
    meta: {
      title: '预约入库单详情',
      activeMenu: '/reservationInbound',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/reservationInbound/detail.vue'),
    name: 'reservationInboundDetail',
  },
  {
    path: '/deliveryManage',
    meta: {
      title: '送货管理',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/takeDeliveryTools/deliveryManage/index.vue'),
    name: 'deliveryManage',
  },
  {
    path: '/deliveryManage/receive',
    meta: {
      title: '收货',
      activeMenu: '/deliveryManage',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/deliveryManage/receive.vue'),
    name: 'deliveryManageReceive',
  },
  {
    path: '/deliveryManage/detail',
    meta: {
      title: '送货单详情',
      activeMenu: '/deliveryManage',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/deliveryManage/detail.vue'),
    name: 'deliveryManageDetail',
  },
  {
    path: '/deliveryManageNew',
    meta: {
      title: '送货管理(新)',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/deliveryManageNew/index.vue'),
    name: 'deliveryManageNew',
  },
  {
    path: '/deliveryManageNew/detail',
    meta: {
      title: '送货单详情',
      activeMenu: '/deliveryManageNew',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/deliveryManageNew/detail.vue'),
    name: 'deliveryManageNewDetail',
  },
  {
    path: '/deliveryManageNew/receive',
    meta: {
      title: '收货',
      activeMenu: '/deliveryManageNew',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/deliveryManageNew/receive.vue'),
    name: 'deliveryManageNewReceive',
  },
  {
    path: '/takeDeliveryManage/add',
    meta: {
      title: '新增提货单',
      menuPath: ['供应链管理', '效率工具', '提货管理'],
      activeMenu: '/takeDeliveryManage',
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/add.vue'),
    name: 'takeDeliveryManageAdd',
  },
  {
    path: '/takeDeliveryManage/edit',
    meta: {
      title: '编辑提货单',
      menuPath: ['供应链管理', '效率工具', '提货管理'],
      activeMenu: '/takeDeliveryManage',
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/edit.vue'),
    name: 'takeDeliveryManageEdit',
  },
  {
    path: '/takeDeliveryManage/detail',
    meta: {
      title: '提货详情',
      menuPath: ['供应链管理', '效率工具', '提货管理'],
      activeMenu: '/takeDeliveryManage',
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/detail.vue'),
    name: 'takeDeliveryManageDetail',
  },
  {
    path: '/takeDeliveryManage/audit',
    meta: {
      title: '提货审核',
      menuPath: ['供应链管理', '效率工具', '提货管理'],
      activeMenu: '/takeDeliveryManage',
    },
    component: () =>
      import('@/views/supplyChainManage/takeDeliveryTools/takeDeliveryManage/audit.vue'),
    name: 'takeDeliveryManageAudit',
  },
  {
    path: '/supplierManage',
    meta: {
      title: '供应商管理',
      menuPath: ['供应链管理', '供应商管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/supplierManage/index.vue'),
    name: 'supplierManage',
  },
  {
    path: '/supplierManage/waitPick',
    meta: {
      title: '采购未交数量',
      menuPath: ['供应链管理', '供应商管理'],
      activeMenu: '/supplierManage',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/supplierManage/waitPick.vue'),
    name: 'supplierManageWaitPick',
  },
  {
    path: '/B2BCustomer',
    meta: {
      title: '客户管理',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/B2BCustomer/index.vue'),
    name: 'B2BCustomer',
  },
  {
    path: '/B2BCustomer/add',
    meta: {
      title: '新增客户',
      activeMenu: '/B2BCustomer',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/B2BCustomer/add.vue'),
    name: 'B2BCustomerAdd',
  },
  {
    path: '/B2BCustomer/edit',
    meta: {
      title: '编辑客户',
      activeMenu: '/B2BCustomer',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/B2BCustomer/edit.vue'),
    name: 'B2BCustomerEdit',
  },
  {
    path: '/B2BCustomer/detail',
    meta: {
      title: '客户详情',
      activeMenu: '/B2BCustomer',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/B2BCustomer/detail.vue'),
    name: 'B2BCustomerDetail',
  },
  {
    path: '/taxManage',
    meta: {
      title: '税率管理',
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/taxManage/index.vue'),
    name: 'taxManage',
  },
  {
    path: '/quotationManage',
    meta: {
      title: '报价管理',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationManage/index.vue'),
    name: 'quotationManage',
  },
  {
    path: '/quotationManage/add',
    meta: {
      title: '新增报价',
      activeMenu: '/quotationManage',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationManage/add.vue'),
    name: 'quotationManageAdd',
  },
  {
    path: '/quotationManage/edit',
    meta: {
      title: '编辑报价',
      activeMenu: '/quotationManage',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationManage/edit.vue'),
    name: 'quotationManageEdit',
  },
  {
    path: '/quotationManage/detail',
    meta: {
      title: '报价详情',
      activeMenu: '/quotationManage',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationManage/detail.vue'),
    name: 'quotationManageDetail',
  },
  {
    path: '/quotationManage/audit',
    meta: {
      title: '报价审核',
      activeMenu: '/quotationManage',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationManage/audit.vue'),
    name: 'quotationManageAudit',
  },
  {
    path: '/quotationSetting',
    meta: {
      title: '报价设置',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationSetting/index.vue'),
    name: 'quotationSetting',
  },
  {
    path: '/cartonSize',
    meta: {
      title: '整箱配置',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/cartonSize/index.vue'),
    name: 'cartonSize',
  },
  {
    path: '/cartonSize/add',
    meta: {
      title: '新增配置',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/cartonSize/add.vue'),
    name: 'cartonSizeAdd',
  },
  {
    path: '/cartonSize/edit',
    meta: {
      title: '编辑配置',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/cartonSize/edit.vue'),
    name: 'cartonSizeEdit',
  },
  {
    path: '/quotationSetting/add',
    meta: {
      title: '新增审核流',
      activeMenu: '/quotationSetting',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationSetting/add.vue'),
    name: 'quotationSettingAdd',
  },
  {
    path: '/quotationSetting/edit',
    meta: {
      title: '编辑审核流',
      activeMenu: '/quotationSetting',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationSetting/edit.vue'),
    name: 'quotationSettingEdit',
  },
  {
    path: '/quotationSetting/detail',
    meta: {
      title: '报价审核流详情',
      activeMenu: '/quotationSetting',
      menuPath: ['销售', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/quotationSetting/detail.vue'),
    name: 'quotationSettingDetail',
  },
  {
    path: '/creditLimit',
    meta: {
      title: '信用额度管理',
      menuPath: ['订单', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/creditLimit/index.vue'),
    name: 'creditLimit',
  },
  {
    path: '/creditLimitDetail',
    meta: {
      title: '信用额度管理详情',
      menuPath: ['订单', 'B2B客户'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/creditLimit/detail.vue'),
    name: 'creditLimitDetail',
  },
  {
    path: '/allChannelOrder',
    meta: {
      title: '全渠道订单',
      menuPath: ['订单', '全渠道订单'],
    },
    component: () => import('@/views/supplyChainManage/allChannelOrder/index.vue'),
    name: 'allChannelOrder',
  },
  {
    path: '/salesOrderManagement',
    meta: {
      title: '销售订单管理',
      menuPath: ['订单', '销售订单'],
    },
    component: () => import('@/views/supplyChainManage/salesOrderManagement/index.vue'),
    name: 'salesOrderManagement',
  },
  {
    path: '/salesOrderManagement/detail',
    meta: {
      title: '销售订单管理详情',
      menuPath: ['订单', '销售订单'],
    },
    component: () => import('@/views/supplyChainManage/salesOrderManagement/detail.vue'),
    name: 'salesOrderManagementDetail',
  },
  {
    path: '/vcOrder',
    meta: {
      title: 'VC订单',
      menuPath: ['订单', 'VC订单'],
    },
    component: () => import('@/views/supplyChainManage/vcOrder/index.vue'),
    name: 'vcOrder',
  },
  {
    path: '/B2BOrder',
    meta: {
      title: 'B2B订单',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManage/index.vue'),
    name: 'B2BOrder',
  },
  {
    path: '/B2BOrder/add',
    meta: {
      title: '新增订单',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManage/add.vue'),
    name: 'B2BOrderAdd',
  },
  {
    path: '/B2BOrder/edit',
    meta: {
      title: '编辑订单',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManage/edit.vue'),
    name: 'B2BOrderEdit',
  },
  {
    path: '/B2BOrder/detail',
    meta: {
      title: '订单详情',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManage/detail.vue'),
    name: 'B2BOrderDetail',
  },
  {
    path: '/B2BOrder/audit',
    meta: {
      title: '审核订单',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManage/audit.vue'),
    name: 'B2BOrderAudit',
  },
  {
    path: '/B2BOrder/subOrder',
    meta: {
      title: '订单拆单',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManage/subOrder.vue'),
    name: 'B2BOrderSubOrder',
  },
  //  新菜单
  {
    path: '/B2BOrderNew',
    meta: {
      title: 'B2B订单(新)',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManageNew/index.vue'),
    name: 'B2BOrderNew',
  },
  {
    path: '/B2BOrderNew/add',
    meta: {
      title: '新增订单(新)',
      activeMenu: '/B2BOrderNew',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManageNew/add.vue'),
    name: 'B2BOrderNewAdd',
  },
  {
    path: '/B2BOrderNew/edit',
    meta: {
      title: '编辑订单(新)',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManageNew/edit.vue'),
    name: 'B2BOrderNewEdit',
  },
  {
    path: '/B2BOrderNew/detail',
    meta: {
      title: '订单详情(新)',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManageNew/detail.vue'),
    name: 'B2BOrderNewDetail',
  },
  {
    path: '/B2BOrderNew/audit',
    meta: {
      title: '审核订单(新)',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManageNew/audit.vue'),
    name: 'B2BOrderNewAudit',
  },
  {
    path: '/B2BOrderNew/subOrder',
    meta: {
      title: '订单拆单(新)',
      activeMenu: '/B2BOrder',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderManageNew/subOrder.vue'),
    name: 'B2BOrderNewSubOrder',
  },

  {
    path: '/TTOrder',
    meta: {
      title: 'TT订单',
      menuPath: ['订单', 'TT订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/TTOrder/index.vue'),
    name: 'TTOrder',
  },
  {
    path: '/TTOrder/detail',
    meta: {
      title: '订单详情',
      activeMenu: '/TTOrder',
      menuPath: ['订单', 'TT订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/TTOrder/detail.vue'),
    name: 'TTOrderDetail',
  },
  {
    path: '/TTOrder/toFBA',
    meta: {
      title: '转FBA配送',
      activeMenu: '/TTOrder',
      menuPath: ['订单', 'TT订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/TTOrder/toFba.vue'),
    name: 'TTOrderToFBA',
  },

  {
    path: '/internalOrder',
    meta: {
      title: '内购订单',
      menuPath: ['订单', '内购订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/internalOrder/index.vue'),
    name: 'internalOrder',
  },
  {
    path: '/internalOrder/detail',
    meta: {
      title: '内购订单详情',
      activeMenu: '/internalOrder',
      menuPath: ['订单', '内购订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/internalOrder/detail.vue'),
    name: 'internalOrderDetail',
  },
  {
    path: '/internalOrder/edit',
    meta: {
      title: '编辑内购订单',
      activeMenu: '/internalOrder',
      menuPath: ['订单', '内购订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/internalOrder/edit.vue'),
    name: 'internalOrderEdit',
  },
  {
    path: '/internalOrder/audit',
    meta: {
      title: '审核内购订单',
      activeMenu: '/internalOrder',
      menuPath: ['订单', '内购订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/internalOrder/audit.vue'),
    name: 'internalOrderAudit',
  },
  {
    path: '/internalOrder/subOrder',
    meta: {
      title: '订单拆单',
      activeMenu: '/internalOrder',
      menuPath: ['订单', '内购订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/internalOrder/subOrder.vue'),
    name: 'internalOrderSubOrder',
  },
  // 积加自发货预占订单
  {
    path: '/jijiaSelfShippedOrder',
    meta: {
      title: '自发货订单',
      menuPath: ['订单', '自发货订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/jijiaSelfShippedOrder/index.vue'),
    name: 'jijiaSelfShippedOrder',
  },
  // 自发货订单
  {
    path: '/FulfillmentOrder',
    meta: {
      title: '自发货订单',
      menuPath: ['订单', '自发货订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/shopifyOrder/index.vue'),
    name: 'shopifyOrder',
  },
  {
    path: '/shopifyOrder/detail',
    meta: {
      title: '订单详情',
      activeMenu: '/shopifyOrder',
      menuPath: ['订单', '自发货订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/shopifyOrder1/detail.vue'),
    name: 'shopifyOrderDetail',
  },
  {
    path: '/shopifyOrder/edit',
    meta: {
      title: '编辑订单',
      activeMenu: '/shopifyOrder',
      menuPath: ['订单', '自发货订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/shopifyOrder/edit.vue'),
    name: 'shopifyOrderEdit',
  },
  {
    path: '/shopifyOrder/audit',
    meta: {
      title: '审核订单',
      activeMenu: '/shopifyOrder',
      menuPath: ['订单', '自发货订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/shopifyOrder1/audit.vue'),
    name: 'shopifyOrderAudit',
  },
  {
    path: '/shopifyOrder/subOrder',
    meta: {
      title: '订单拆单',
      activeMenu: '/shopifyOrder',
      menuPath: ['订单', '自发货订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/shopifyOrder1/subOrder.vue'),
    name: 'shopifyOrderSubOrder',
  },

  {
    path: '/orderRule',
    meta: {
      title: '订单规则',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/index.vue'),
    name: 'orderRule',
  },
  {
    path: '/orderRule/add',
    meta: {
      title: '新增审批规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/add.vue'),
    name: 'orderRuleAdd',
  },
  {
    path: '/orderRule/edit',
    meta: {
      title: '编辑审批规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/edit.vue'),
    name: 'orderRuleEdit',
  },
  {
    path: '/orderRule/detail',
    meta: {
      title: '详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/detail.vue'),
    name: 'orderRuleDetail',
  },
  // 分仓规则
  {
    path: '/orderRule/addRule',
    meta: {
      title: '新增分仓规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/addRule.vue'),
    name: 'orderRuleAddRule',
  },
  {
    path: '/orderRule/editRule',
    meta: {
      title: '编辑分仓规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/editRule.vue'),
    name: 'orderRuleEditRule',
  },
  {
    path: '/orderRule/detailRule',
    meta: {
      title: '分仓规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/detailRule.vue'),
    name: 'orderRuleDetailRule',
  },
  // 计税规则
  {
    path: '/orderRule/addTaxRule',
    meta: {
      title: '新增计税规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/taxRule/addTaxRule.vue'),
    name: 'addTaxRule',
  },
  {
    path: '/orderRule/editTaxRule',
    meta: {
      title: '编辑计税规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/taxRule/editTaxRule.vue'),
    name: 'editTaxRule',
  },
  {
    path: '/orderRule/taxRuleDetail',
    meta: {
      title: '计税规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/taxRule/taxRuleDetail.vue'),
    name: 'taxRuleDetail',
  },
  // 拆单规则
  // {
  //   path: '/orderRule/addSplitRule',
  //   meta: {
  //     title: '新增拆单规则',
  //     activeMenu: '/orderRule',
  //     menuPath: ['订单', 'B2B订单'],
  //   },
  //   component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/addSplitRule.vue'),
  //   name: 'addSplitRule',
  // },
  // {
  //   path: '/orderRule/editSplitRule',
  //   meta: {
  //     title: '编辑拆单规则',
  //     activeMenu: '/orderRule',
  //     menuPath: ['订单', 'B2B订单'],
  //   },
  //   component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/editSplitRule.vue'),
  //   name: 'editSplitRule',
  // },
  // {
  //   path: '/orderRule/splitRuleDetail',
  //   meta: {
  //     title: '拆单规则详情',
  //     activeMenu: '/orderRule',
  //     menuPath: ['订单', 'B2B订单'],
  //   },
  //   component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/splitRuleDetail.vue'),
  //   name: 'splitRuleDetail',
  // },
  // 仓库规则
  // {
  //   path: '/orderRule/addWarehouseRule',
  //   meta: {
  //     title: '新增仓库规则',
  //     activeMenu: '/orderRule',
  //     menuPath: ['订单', 'B2B订单'],
  //   },
  //   component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/addWarehouseRule.vue'),
  //   name: 'addWarehouseRule',
  // },
  // {
  //   path: '/orderRule/editWarehouseRule',
  //   meta: {
  //     title: '编辑仓库规则',
  //     activeMenu: '/orderRule',
  //     menuPath: ['订单', 'B2B订单'],
  //   },
  //   component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/editWarehouseRule.vue'),
  //   name: 'editWarehouseRule',
  // },
  // {
  //   path: '/orderRule/warehouseRuleDetail',
  //   meta: {
  //     title: '仓库规则详情',
  //     activeMenu: '/orderRule',
  //     menuPath: ['订单', 'B2B订单'],
  //   },
  //   component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/warehouseRuleDetail.vue'),
  //   name: 'warehouseRuleDetail',
  // },
  // 仓库规则 新
  {
    path: '/orderRule/addWarehouseRuleNew',
    meta: {
      title: '新增仓库规则(新)',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/warehouseRule/add.vue'),
    name: 'addWarehouseRuleNew',
  },
  {
    path: '/orderRule/editWarehouseRuleNew',
    meta: {
      title: '编辑仓库规则(新)',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/warehouseRule/edit.vue'),
    name: 'editWarehouseRuleNew',
  },
  {
    path: '/orderRule/warehouseRuleDetailNew',
    meta: {
      title: '仓库规则详情(新)',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/warehouseRule/detail.vue'),
    name: 'warehouseRuleDetailNew',
  },
  // 合单规则
  {
    path: '/orderRule/addMergeRule',
    meta: {
      title: '新增合单规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/mergeRule/add.vue'),
    name: 'addMergeRule',
  },
  {
    path: '/orderRule/editMergeRule',
    meta: {
      title: '编辑合单规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/mergeRule/edit.vue'),
    name: 'editMergeRule',
  },
  {
    path: '/orderRule/mergeRuleDetail',
    meta: {
      title: '合单规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/mergeRule/detail.vue'),
    name: 'mergeRuleDetail',
  },
  // 赠品规则
  {
    path: '/orderRule/addGiftRule',
    meta: {
      title: '新增赠品规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/giftRule/add.vue'),
    name: 'addGiftRule',
  },
  {
    path: '/orderRule/editGiftRule',
    meta: {
      title: '编辑赠品规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/giftRule/edit.vue'),
    name: 'editGiftRule',
  },
  {
    path: '/orderRule/giftRuleDetail',
    meta: {
      title: '赠品规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/giftRule/detail.vue'),
    name: 'giftRuleDetail',
  },
  // 分发系统规则
  {
    path: '/orderRule/addDistributeSystemRule',
    meta: {
      title: '新增分发系统规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/distributeSystemRule/add.vue'),
    name: 'addDistributeSystemRule',
  },
  {
    path: '/orderRule/editDistributeSystemRule',
    meta: {
      title: '编辑分发系统规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/distributeSystemRule/edit.vue'),
    name: 'editDistributeSystemRule',
  },
  {
    path: '/orderRule/DistributeSystemRuleDetail',
    meta: {
      title: '分发系统规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/distributeSystemRule/detail.vue'),
    name: 'distributeSystemRuleDetail',
  },
  // 收件信息规则
  {
    path: '/orderRule/addShippingRule',
    meta: {
      title: '新增收件信息规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/shippingRule/add.vue'),
    name: 'addShippingRule',
  },
  {
    path: '/orderRule/editShippingRule',
    meta: {
      title: '编辑收件信息规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/shippingRule/edit.vue'),
    name: 'editShippingRule',
  },
  {
    path: '/orderRule/shippingRuleDetail',
    meta: {
      title: '收件信息规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/shippingRule/detail.vue'),
    name: 'shippingRuleDetail',
  },
  {
    path: '/orderRule/addSelfFulFillMentRule',
    meta: {
      title: '新增生成自发货规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/selfFulfillmentRule/add.vue'),
    name: 'addSelfFulFillMentRule',
  },
  {
    path: '/orderRule/editSelfFulFillMentRule',
    meta: {
      title: '编辑生成自发货规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/selfFulfillmentRule/edit.vue'),
    name: 'editSelfFulFillMentRule',
  },
  {
    path: '/orderRule/detailSelfFulFillMentRule',
    meta: {
      title: '生成自发货规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/selfFulfillmentRule/detail.vue'),
    name: 'detailSelfFulFillMentRule',
  },
  {
    path: '/orderRule/addTrenderRule',
    meta: {
      title: '新增标发规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/trenderRules/add.vue'),
    name: 'addTrenderRule',
  },
  {
    path: '/orderRule/detailTrenderRule',
    meta: {
      title: '新增标发规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/trenderRules/detail.vue'),
    name: 'detailTrenderRule',
  },
  {
    path: '/orderRule/editTrenderRule',
    meta: {
      title: '编辑标发规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/trenderRules/edit.vue'),
    name: 'editTrenderRule',
  },
  {
    path: '/orderRule/detailTrenderRule',
    meta: {
      title: '标发规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/trenderRules/detail.vue'),
    name: 'detailTrenderRule',
  },
  // 黑名单规则
  {
    path: '/orderRule/addBlacklistRule',
    meta: {
      title: '新增黑名单规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/blacklistRule/add.vue'),
    name: 'addBlacklistRule',
  },
  {
    path: '/orderRule/editBlacklistRule',
    meta: {
      title: '编辑黑名单规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/blacklistRule/edit.vue'),
    name: 'editBlacklistRule',
  },
  {
    path: '/orderRule/addMultipleSuppliesRule',
    meta: {
      title: '新增一品多供规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/multipleSuppliesRule/add.vue'),
    name: 'addMultipleSuppliesRule',
  },
  {
    path: '/orderRule/editMultipleSuppliesRule',
    meta: {
      title: '编辑一品多供规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/B2BOrder/orderRule/multipleSuppliesRule/edit.vue'),
    name: 'editMultipleSuppliesRule',
  },
  {
    path: '/orderRule/addAuditRule',
    meta: {
      title: '新增审核规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/auditRule/add.vue'),
    name: 'addAuditRule',
  },
  {
    path: '/orderRule/editAuditRule',
    meta: {
      title: '编辑审核规则',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/auditRule/edit.vue'),
    name: 'editAuditRule',
  },
  {
    path: '/orderRule/auditRuleDetail',
    meta: {
      title: '审核规则详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/auditRule/detail.vue'),
    name: 'auditRuleDetail',
  },
  {
    path: '/orderRule/addNewSplitRule',
    meta: {
      title: '新增拆单规则(新)',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/splitRule/add.vue'),
    name: 'addNewSplitRule',
  },
  {
    path: '/orderRule/editNewSplitRule',
    meta: {
      title: '编辑拆单规则(新)',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/splitRule/edit.vue'),
    name: 'editNewSplitRule',
  },
  {
    path: '/orderRule/newSplitRuleDetail',
    meta: {
      title: '拆单规则(新)详情',
      activeMenu: '/orderRule',
      menuPath: ['订单', 'B2B订单'],
    },
    component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/splitRule/detail.vue'),
    name: 'newSplitRuleDetail',
  },
  // {
  //   path: '/orderRule/shippingRuleDetail',
  //   meta: {
  //     title: '收件信息规则详情',
  //     activeMenu: '/orderRule',
  //     menuPath: ['订单', 'B2B订单'],
  //   },
  //   component: () => import('@/views/supplyChainManage/B2BOrder/orderRule/shippingRule/detail.vue'),
  //   name: 'shippingRuleDetail',
  // },
  {
    path: '/skuSetting',
    meta: {
      title: 'SKU基础设置',
      menuPath: ['备货设置', '计划交付'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/skuSetting/index.vue'),
    name: 'skuSetting',
  },
  {
    path: '/shipmentType',
    meta: {
      title: '头程物流渠道',
      menuPath: ['发货管理', '物流协同'],
    },
    // component: () => import('@/views/supplyChainManage/efficiencyTools/shipmentType/index.vue'),
    component: () => import('@/views/supplyChainManage/efficiencyTools/logisticsChannel/index.vue'),
    name: 'shipmentType',
  },
  {
    path: '/lastLogisticsChannel',
    meta: {
      title: '尾程物流渠道',
      menuPath: ['发货管理', '物流协同'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/lastLogisticsChannel/index.vue'),
    name: 'lastLogisticsChannel',
  },
  {
    path: '/lastLogisticsChannel/add',
    meta: {
      title: '新增尾程物流渠道',
      activeMenu: '/lastLogisticsChannel',
      menuPath: ['发货管理', '物流协同'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/lastLogisticsChannel/add.vue'),
    name: 'lastLogisticsChannelAdd',
  },
  {
    path: '/lastLogisticsChannel/edit',
    meta: {
      title: '编辑尾程物流渠道',
      activeMenu: '/lastLogisticsChannel',
      menuPath: ['发货管理', '物流协同'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/lastLogisticsChannel/edit.vue'),
    name: 'lastLogisticsChannelEdit',
  },
  {
    path: '/lastLogisticsChannel/detail',
    meta: {
      title: '尾程物流渠道详情',
      activeMenu: '/lastLogisticsChannel',
      menuPath: ['发货管理', '物流协同'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/lastLogisticsChannel/detail.vue'),
    name: 'lastLogisticsChannelDetail',
  },
  {
    path: '/addressBook',
    meta: {
      title: '地址簿',
      menuPath: ['发货管理', '地址簿'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/addressBook/index.vue'),
    name: 'addressBook',
  },
  {
    path: '/warehouseOrder',
    meta: {
      title: '仓配订单',
      menuPath: ['发货管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/warehouseOrder/index.vue'),
    name: 'warehouseOrder',
  },
  {
    path: '/warehouseOrderNew',
    meta: {
      title: '销售出库单',
      menuPath: ['发货管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/index.vue'),
    name: 'warehouseOrderNew',
  },
  {
    path: '/warehouseOrderNew/detail',
    meta: {
      title: '订单详情',
      activeMenu: '/warehouseOrderNew',
      menuPath: ['销售出库单', '发货管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/detail.vue'),
    name: 'warehouseOrderNewDetail',
  },
  {
    path: '/warehouseOrderNew/push',
    meta: {
      title: '订单推送',
      activeMenu: '/warehouseOrderNew',
      menuPath: ['销售出库单', '发货管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/push.vue'),
    name: 'warehouseOrderNewPush',
  },
  // {
  //   path: '/warehouseOrderNew/add',
  //   meta: {
  //     title: '销售出库单下单',
  //     activeMenu: '/warehouseOrderNew',
  //     menuPath: ['销售出库单', '发货管理'],
  //   },
  //   component: () => import('@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/OrderAdd.vue'),
  //   name: 'warehouseOrderNewAdd',
  // },
  {
    path: '/warehouseOrder/detail',
    meta: {
      title: '订单详情',
      activeMenu: '/warehouseOrder',
      menuPath: ['仓配订单', '发货管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/warehouseOrder/detail.vue'),
    name: 'warehouseOrderDetail',
  },
  {
    path: '/warehouseOrder/push',
    meta: {
      title: '订单推送',
      activeMenu: '/warehouseOrder',
      menuPath: ['仓配订单', '发货管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/warehouseOrder/push.vue'),
    name: 'warehouseOrderPush',
  },
  {
    path: '/logisticsProviderManagement',
    meta: {
      title: '物流商管理',
      menuPath: ['发货管理', '物流商管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/logisticsProviderManage/index.vue'),
    name: 'logisticsProviderManagement',
  },
  {
    path: '/logisticsServiceManagement',
    meta: {
      title: '物流服务商管理',
      menuPath: ['物流基础数据'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/logisticsServiceManagement/index.vue'),
    name: 'logisticsServiceManagement',
  },
  {
    path: '/selfFulfilledOrder',
    meta: {
      title: '自发货出库单',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/selfFulfilledOrder/index.vue'),
    name: 'selfFulfilledOrder',
  },
  {
    path: '/logisticsTransport',
    meta: {
      title: '物流方式',
      menuPath: ['发货管理', '物流方式'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/logisticsTransport/index.vue'),
    name: 'logisticsTransport',
  },
  {
    path: '/selfFulfilledOrder/detail',
    meta: {
      title: '详情',
      activeMenu: '/selfFulfilledOrder',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/selfFulfilledOrder/detail.vue'),
    name: 'selfFulfilledOrderDetail',
  },
  {
    path: '/selfFulfilledOrder/edit',
    meta: {
      title: '编辑',
      activeMenu: '/selfFulfilledOrder',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/selfFulfilledOrder/edit.vue'),
    name: 'selfFulfilledOrderEdit',
  },
  {
    path: '/selfLogisticsOrder',
    meta: {
      title: '自发货物流订单',
      menuPath: ['发货管理', '自发货物流订单'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/selfLogisticsOrder/index.vue'),
    name: 'selfLogisticsOrder',
  },
  {
    path: '/selfLogisticsOrder/detail',
    meta: {
      title: '详情',
      activeMenu: '/selfLogisticsOrder',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/selfLogisticsOrder/detail.vue'),
    name: 'selfLogisticsOrderEdit',
  },
  {
    path: '/firstVessel',
    meta: {
      title: '头程出库时效',
      menuPath: ['发货管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/firstVessel/index.vue'),
    name: 'firstVessel',
  },
  {
    path: '/fbaOrderRule',
    meta: {
      title: 'FBA货件监控',
      menuPath: ['发货管理', '货件管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/fbaOrderRule/index.vue'),
    name: 'fbaOrderRule',
  },
  {
    path: '/fbaOrderRule/add',
    meta: {
      title: '新增监控规则',
      activeMenu: '/fbaOrderRule',
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/fbaOrderRule/edit.vue'),
    name: 'fbaOrderRuleAdd',
  },
  {
    path: '/fbaOrderRule/edit',
    meta: {
      title: '编辑监控规则',
      activeMenu: '/fbaOrderRule',
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/fbaOrderRule/edit.vue'),
    name: 'fbaOrderRuleEdit',
  },
  {
    path: '/logisticsTracking',
    meta: {
      title: '头程物流跟踪',
      menuPath: ['发货管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/logisticsTracking/index.vue'),
    name: 'logisticsTracking',
  },

  {
    path: '/autoPack',
    meta: {
      title: '自动装箱',
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/autoPack/index.vue'),
    name: 'autoPack',
  },
  // 移仓单
  {
    path: '/removeOrder',
    meta: {
      title: '移仓单',
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/removeOrder/index.vue'),
    name: 'removeOrder',
  },
  {
    path: '/removeOrder/add',
    meta: {
      title: '新增移仓单',
      activeMenu: '/removeOrder',
      menuPath: ['移仓单'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/removeOrder/add.vue'),
    name: 'removeOrderAdd',
  },
  {
    path: '/removeOrder/edit',
    meta: {
      title: '编辑移仓单',
      activeMenu: '/removeOrder',
      menuPath: ['移仓单'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/removeOrder/edit.vue'),
    name: 'removeOrderEdit',
  },
  {
    path: '/removeOrder/detail',
    meta: {
      title: '移仓单详情',
      activeMenu: '/removeOrder',
      menuPath: ['移仓单'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/removeOrder/detail.vue'),
    name: 'removeOrderDetail',
  },
  // 调拨单管理
  {
    path: '/transferOrderManage',
    meta: {
      title: '调拨单管理',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/transferOrderManage/index.vue'),
    name: 'transferOrderManage',
  },
  // 线下调拨单管理
  {
    path: '/transferOrderOffline',
    meta: {
      title: '渠道调拨单',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/transferOrderOffline/index.vue'),
    name: 'transferOrderOffline',
  },
  // 添加线下调拨单
  {
    path: '/transferOrderOffline/add',
    meta: {
      title: '添加调拨单',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/transferOrderOffline/addOrder.vue'),
    name: 'transferOrderOfflineAdd',
  },
  // 线下调拨单详情
  {
    path: '/transferOrderOffline/detail/:code', // ✅ 添加动态参数
    meta: {
      title: '调拨单详情',
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/transferOrderOffline/detailOrder.vue'),
    name: 'transferOrderOfflineDetail',
  },
  {
    path: '/inventory',
    meta: {
      title: '库存查询',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/index.vue'),
    name: 'inventory',
  },
  {
    path: '/otherOutbound',
    meta: {
      title: '其他出库单',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/otherOutbound/index.vue'),
    name: 'otherOutbound',
  },
  {
    path: '/otherOutbound/add',
    meta: {
      title: '添加其他出库单',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/otherOutbound/add.vue'),
    name: 'otherOutboundAdd',
  },
  {
    path: '/otherOutbound/detail',
    meta: {
      title: '其他出库单详情',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/otherOutbound/detail.vue'),
    name: 'otherOutboundDetail',
  },
  {
    path: '/otherInbound',
    meta: {
      title: '其他入库单',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/otherInbound/index.vue'),
    name: 'otherInbound',
  },
  {
    path: '/otherInbound/add',
    meta: {
      title: '添加其他入库单',
      menuPath: ['库内管理'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/bound/otherInbound/add.vue'),
    name: 'otherInboundAdd',
  },
  {
    path: '/otherInbound/detail',
    meta: {
      title: '其他入库单详情',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/otherInbound/detail.vue'),
    name: 'otherInboundDetail',
  },
  {
    path: '/stockAllocationOrder',
    meta: {
      title: '库存分配单',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/stockAllocation/index.vue'),
    name: 'stockAllocationOrder',
  },
  {
    path: '/stockAllocationOrder/add',
    meta: {
      title: '新增库存分配单',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/stockAllocation/add.vue'),
    name: 'stockAllocationOrderAdd',
  },
  {
    path: '/stockAllocationOrder/detail',
    meta: {
      title: '库存分配单详情',
      menuPath: ['库内管理'],
    },
    component: () =>
      import('@/views/supplyChainManage/efficiencyTools/bound/stockAllocation/detail.vue'),
    name: 'stockAllocationOrderDetail',
  },
  {
    path: '/tiktokStock',
    meta: {
      title: 'TikTok库存调整',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/tiktokStock/index.vue'),
    name: 'tiktokStock',
  },
  {
    path: '/tiktokStock/add',
    meta: {
      title: '新增库存调整单',
      activeMenu: '/tiktokStock',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/tiktokStock/add.vue'),
    name: 'tiktokStockAdd',
  },
  {
    path: '/tiktokStock/edit',
    meta: {
      title: '编辑库存调整单',
      activeMenu: '/tiktokStock',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/tiktokStock/edit.vue'),
    name: 'tiktokStockEdit',
  },
  {
    path: '/tiktokStock/detail',
    meta: {
      title: '库存调整单详情',
      activeMenu: '/tiktokStock',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/tiktokStock/detail.vue'),
    name: 'tiktokStockDetail',
  },

  {
    path: '/centerInventory',
    meta: {
      title: '中仓库存',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/centerInventory/index.vue'),
    name: 'centerInventory',
  },
  {
    path: '/platformInventory',
    meta: {
      title: '平台库存',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/platformInventory/index.vue'),
    name: 'platformInventory',
  },
  {
    path: '/warehouseInventory',
    meta: {
      title: '仓库库存',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/warehouseInventory/index.vue'),
    name: 'warehouseInventory',
  },
  {
    path: '/salesOut',
    meta: {
      title: '出库单',
      menuPath: ['库存'],
    },
    component: () => import('@/views/supplyChainManage/inventory/salesOut/index.vue'),
    name: 'salesOut',
  },
  {
    path: '/supplyGoods',
    meta: {
      title: '供应链产品',
      menuPath: ['产品管理', '供应链产品'],
    },
    component: () => import('@/views/goodscenter/supplyGoods/index.vue'),
    name: 'supplyGoods',
  },
  {
    path: '/supplyGoods/add',
    meta: {
      title: '新增供应链产品',
      activeMenu: '/supplyGoods',
      menuPath: ['产品管理', '供应链产品'],
    },
    component: () => import('@/views/goodscenter/supplyGoods/add.vue'),
    name: 'supplyGoodsAdd',
  },
  {
    path: '/supplyGoods/edit',
    meta: {
      title: '编辑供应链产品',
      activeMenu: '/supplyGoods',
      menuPath: ['产品管理', '供应链产品'],
    },
    component: () => import('@/views/goodscenter/supplyGoods/edit.vue'),
    name: 'supplyGoodsEdit',
  },
  {
    path: '/supplyGoods/detail',
    meta: {
      title: '供应链产品详情',
      activeMenu: '/supplyGoods',
      menuPath: ['产品管理', '供应链产品'],
    },
    component: () => import('@/views/goodscenter/supplyGoods/detail.vue'),
    name: 'supplyGoodsDetail',
  },
  {
    path: '/supplyRecommend',
    meta: {
      title: '供应商推荐',
      menuPath: ['产品管理', '供应商推荐'],
    },
    component: () => import('@/views/goodscenter/supplyRecommend/index.vue'),
    name: 'supplyRecommend',
  },
  {
    path: '/supplierMasterList',
    meta: {
      title: '供应商主数据',
      menuPath: ['产品管理', '供应商主数据'],
    },
    component: () => import('@/views/goodscenter/supplierMasterList/index.vue'),
    name: 'supplierMasterList',
  },
  {
    path: '/supplyRecommendEdit',
    meta: {
      title: '供应商推荐编辑',
      menuPath: ['产品管理', '供应商推荐'],
    },
    component: () => import('@/views/goodscenter/supplyRecommend/edit.vue'),
    name: 'supplyRecommendEdit',
  },
  {
    path: '/supplyRecommendDetail',
    meta: {
      title: '供应商推荐详情',
      menuPath: ['产品管理', '供应商推荐'],
    },
    component: () => import('@/views/goodscenter/supplyRecommend/detail.vue'),
    name: 'supplyRecommendDetail',
  },
  {
    path: '/skuHeadPrice',
    meta: {
      title: '头程单价',
      menuPath: ['头程单价'],
    },
    component: () => import('@/views/goodscenter/skuHeadPrice/index.vue'),
    name: 'skuHeadPrice',
  },
  {
    path: '/purchasePrice',
    meta: {
      title: '采购单价',
      menuPath: ['采购单价'],
    },
    component: () => import('@/views/goodscenter/purchasePrice/index.vue'),
    name: 'purchasePrice',
  },
  {
    path: '/requisition',
    meta: {
      title: '领用管理',
    },
    component: () => import('@/views/supplyChainManage/requisition/index.vue'),
    name: 'requisition',
  },
  {
    path: '/requisition/detail',
    meta: {
      title: '领用管理详情',
      activeMenu: '/requisition',
    },
    component: () => import('@/views/supplyChainManage/requisition/detail.vue'),
    name: 'requisitionDetail',
  },
  {
    path: '/requisition/edit',
    meta: {
      title: '领用编辑',
      activeMenu: '/requisition',
    },
    component: () => import('@/views/supplyChainManage/requisition/edit.vue'),
    name: 'requisitionEdit',
  },
  {
    path: '/requisition/add',
    meta: {
      title: '领用新增',
      activeMenu: '/requisition',
    },
    component: () => import('@/views/supplyChainManage/requisition/add.vue'),
    name: 'requisitionAdd',
  },
  {
    path: '/transferOrder',
    meta: {
      title: '调拨单',
      menuPath: ['供应链管理', '效率工具'],
    },
    component: () => import('@/views/supplyChainManage/efficiencyTools/transferOrder/index.vue'),
    name: 'transferOrder',
  },
  {
    path: '/warehouseInfo',
    meta: {
      title: '仓库资料',
      menuPath: ['仓库资料'],
    },
    component: () => import('@/views/supplyChainManage/inventory/warehouseInfo/index.vue'),
    name: 'warehouseInfo',
  },
  {
    path: '/requisition/addApply',
    meta: {
      title: '新增展销会申请',
      activeMenu: '/requisition',
    },
    component: () => import('@/views/supplyChainManage/requisition/addApply.vue'),
    name: 'requisitionAddApply',
  },
  {
    path: '/requisition/editApply',
    meta: {
      title: '编辑展销会申请',
      activeMenu: '/requisition',
    },
    component: () => import('@/views/supplyChainManage/requisition/editApply.vue'),
    name: 'requisitionEditApply',
  },
  {
    path: '/requisition/editAssociatedDocuments',
    meta: {
      title: '编辑关联单据',
      activeMenu: '/requisition',
    },
    component: () => import('@/views/supplyChainManage/requisition/associatedDocuments.vue'),
    name: 'editAssociatedDocuments',
  },
  {
    path: '/requisition/detailApply',
    meta: {
      title: '展销会申请详情',
      activeMenu: '/requisition',
    },
    component: () => import('@/views/supplyChainManage/requisition/detailApply.vue'),
    name: 'requisitionDetailApply',
  },
];
