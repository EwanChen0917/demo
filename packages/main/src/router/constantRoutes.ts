import afterSale from '@/router/afterSale';
import purchase from '@/router/purchase';
import budget from '@/router/budget';
import newProduct from '@/router/newProduct';
import operationManageMenu from './operationManage';
import supplyChain from './supplyChain';
import datamarket from './datamarket';
import teamsync from './teamsync';
import price from './price';
import adjustPrice from './adjustPrice';
import finance from './finance';
import menuTest from './menuTest';
import report from './report';
import customsClearance from './customsClearance';
import bi from './bi';
import aim from './aim';
import logisticsTrackingBill from './logisticsTrackingBill';
import stock from './stock';
import ps from './publicSentiment';
import system from './system';
import orderDashboard from './orderDashboard';
import { osRoutes, osStandaloneRoutes } from './os-flatten-routes';

export default [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
    name: 'login',
  },
  {
    path: '/',
    meta: { hidden: true },
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: window.location.host === 'admin.cozyprogram.com' ? '/navigation' : '/personalCenter',
    children: [
      // os路由合并，放在这里是后覆盖确保稳定
      ...osRoutes,
      {
        path: '/personalCenter',
        meta: { title: '工作台', hidden: true, affixTab: true },
        component: () => import('@/views/personalCenter/index.vue'),
        name: 'personalCenter',
      },
      {
        path: '/homeDashboard',
        meta: { title: '全链路分析', hidden: true},
        component: () => import('@/views/personalCenter/NewHome.vue'),
        name: 'homeDashboard',
      },
      // 系统导航
      {
        path: '/navigation',
        meta: { title: '系统导航' },
        component: () => import('@/views/navigation/index.vue'),
        name: 'navigation',
      },
      {
        path: '/thirdPartyNavigation',
        meta: { title: '第三方系统导航' },
        component: () => import('@/views/thirdPartyNavigation/index.vue'),
        name: 'thirdPartyNavigation',
      },
      {
        path: '/accountManage',
        meta: { title: '账号管理' },
        component: () => import('@/views/settings/accountManage/index.vue'),
        name: 'accountManage',
      },
      {
        path: '/menu',
        meta: { title: '菜单管理' },
        component: () => import('@/views/usercenter/menu/index.vue'),
        name: 'menu',
      },
      {
        path: '/systemTemplate',
        meta: { title: '系统模板' },
        component: () => import('@/views/settings/systemTemplate/index.vue'),
        name: 'systemTemplate',
      },
      {
        path: '/authConfiguration',
        meta: { title: '授权配置' },
        component: () => import('@/views/settings/authConfiguration/index.vue'),
        name: 'authConfiguration',
      },
      {
        path: '/authAccountList',
        meta: { title: '授权账号列表' },
        component: () => import('@/views/settings/authConfiguration/authAccountList/index.vue'),
        name: 'authAccountList',
      },
      {
        path: '/role',
        meta: { title: '角色管理' },
        component: () => import('@/views/usercenter/role/index.vue'),
        name: 'role',
      },
      {
        path: '/role/add',
        meta: { title: '新增角色', menuPath: ['角色管理'], activeMenu: '/role' },
        component: () => import('@/views/usercenter/role/editor.vue'),
        name: 'roleAdd',
      },
      {
        path: '/role/edit',
        meta: { title: '编辑角色', menuPath: ['角色管理'], activeMenu: '/role' },
        component: () => import('@/views/usercenter/role/editor.vue'),
        name: 'roleEdit',
      },
      {
        path: '/role/copy',
        meta: { title: '复制角色', menuPath: ['角色管理'], activeMenu: '/role' },
        component: () => import('@/views/usercenter/role/editor.vue'),
        name: 'roleCopy',
      },
      {
        path: '/role/user',
        meta: { title: '用户列表', menuPath: ['角色管理'], activeMenu: '/role' },
        component: () => import('@/views/usercenter/role/user.vue'),
        name: 'roleUser',
      },
      {
        path: '/userList',
        meta: { title: '用户管理' },
        component: () => import('@/views/usercenter/userList/index.vue'),
        name: 'userList',
      },
      {
        path: '/userList/add',
        meta: { title: '用户管理' },
        component: () => import('@/views/usercenter/userList/form.vue'),
        name: 'userListAdd',
      },
      {
        path: '/userList/edit',
        meta: { title: '用户管理' },
        component: () => import('@/views/usercenter/userList/form.vue'),
        name: 'userListEdit',
      },
      {
        path: '/userInfo',
        meta: { title: '账号信息' },
        component: () => import('@/views/usercenter/userInfo/index.vue'),
        name: 'userInfo',
      },
      // 基础资料-我的组织
      {
        path: '/usermanage',
        meta: { title: '我的组织', menuPath: ['基础资料'] },
        component: () => import('@/views/basicdata/usermanage/index.vue'),
        name: 'usermanage',
      },
      // 红人推广 - 成效追踪
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
      // 产品 - 产品管理
      {
        path: '/goodslist',
        meta: { title: '产品列表', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/goodslist/index.vue'),
        name: 'goodslist',
      },
      {
        path: '/goodslist/detail',
        meta: { title: '产品详情', activeMenu: '/goodslist', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/goodsdetail/index.vue'),
        name: 'goodsdetail',
      },
      {
        path: '/goodslist/edit',
        meta: { title: '编辑产品', activeMenu: '/goodslist', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/goodsedit/index.vue'),
        name: 'goodsEdit',
      },
      {
        path: '/skulist',
        meta: { title: 'SKU列表', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skulist/index.vue'),
        name: 'skulist',
      },
      {
        path: '/skulist/detail',
        meta: { title: 'SKU详情', activeMenu: '/skulist', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skulist/detail.vue'),
        name: 'skuDetail',
      },
      {
        path: '/skulist/edit',
        meta: { title: '编辑SKU', activeMenu: '/skulist', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skulist/edit.vue'),
        name: 'skuEdit',
      },
      {
        path: '/addgoods',
        meta: { title: '创建商品', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/goodsdetail/index.vue'),
        name: 'addgoods',
      },
      {
        path: '/batchupdategoods',
        meta: { title: '批量更新商品', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/batchupdategoods/index.vue'),
        name: 'batchupdategoods',
      },
      // 产品 - 认证管理 菜单
      {
        path: '/certificationlist',
        meta: { title: '认证管理', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/certificationManage/index.vue'),
        name: 'certificationlist',
      },
      {
        path: '/skurelation',
        meta: { title: '销售映射', menuPath: ['产品映射', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skurelation/old.vue'),
        name: 'skurelation',
      },
      {
        path: '/skurelationnew',
        meta: { title: '销售映射', menuPath: ['产品映射', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skurelation/index.vue'),
        name: 'skurelationnew',
      },
      {
        path: '/operationstaff',
        meta: { title: '运营人员', menuPath: ['销售管理', '订单'] },
        component: () => import('@/views/goodscenter/goodsmanage/operationStaff/index.vue'),
        name: 'operationstaff',
      },
      {
        path: '/amazonOperator',
        meta: { title: '亚马逊销售映射运营人员稽查表', menuPath: ['产品映射', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skurelation/amazonOperator.vue'),
        name: 'amazonOperator',
      },
      {
        path: '/skumap',
        meta: { title: 'SKU关系', menuPath: ['产品映射', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skuMap/index.vue'),
        name: 'skumap',
      },
      {
        path: '/loselist',
        meta: { title: '待补充映射', menuPath: ['产品映射', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/loselist/index.vue'),
        name: 'loselist',
      },
      {
        path: '/supplyrelation',
        meta: { title: '供应链端映射', menuPath: ['供应链端映射', '产品映射'] },
        component: () => import('@/views/goodscenter/goodsmanage/supplyrelation/index.vue'),
        name: 'supplyrelation',
      },
      {
        path: '/productgroup',
        meta: { title: '组合产品', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/productgroup/index.vue'),
        name: 'productgroup',
      },
      {
        path: '/productgroup/detail',
        meta: {
          title: '组合产品详情',
          activeMenu: '/productgroup',
          menuPath: ['产品管理', '产品'],
        },
        component: () => import('@/views/goodscenter/goodsmanage/productgroup/detail.vue'),
        name: 'productgroupDetail',
      },
      {
        path: '/productgroup/edit',
        meta: {
          title: '编辑组合产品',
          activeMenu: '/productgroup',
          menuPath: ['产品管理', '产品'],
        },
        component: () => import('@/views/goodscenter/goodsmanage/productgroup/edit.vue'),
        name: 'productgroupEdit',
      },
      {
        path: '/productgroup/add',
        meta: {
          title: '新增组合产品',
          activeMenu: '/productgroup',
          menuPath: ['产品管理', '产品'],
        },
        component: () => import('@/views/goodscenter/goodsmanage/productgroup/add.vue'),
        name: 'productgroupAdd',
      },

      {
        path: '/skugroup',
        meta: { title: '组合SKU', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skugroup/index.vue'),
        name: 'skugroup',
      },
      {
        path: '/skugroup/detail',
        meta: {
          title: '组合SKU详情',
          activeMenu: '/skugroup',
          menuPath: ['产品管理', '产品'],
        },
        component: () => import('@/views/goodscenter/goodsmanage/skugroup/detail.vue'),
        name: 'skugroupDetail',
      },
      {
        path: '/skugroup/edit',
        meta: {
          title: '编辑组合SKU',
          activeMenu: '/skugroup',
          menuPath: ['产品管理', '产品'],
        },
        component: () => import('@/views/goodscenter/goodsmanage/skugroup/edit.vue'),
        name: 'skugroupEdit',
      },

      {
        path: '/barCode',
        meta: { title: '产品69码', menuPath: ['基础设置', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/barCode/index.vue'),
        name: 'barCode',
      },
      {
        path: '/skuRelationship',
        meta: { title: '新旧SKU关系', menuPath: ['基础设置', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/skuRelationship/index.vue'),
        name: 'skuRelationship',
      },
      {
        path: '/productline',
        meta: { title: '产品品线', menuPath: ['基础设置', '产品'] },
        component: () => import('@/views/goodscenter/productline/index.vue'),
        name: 'productline',
      },
      {
        path: '/productline/add',
        meta: { title: '新增品线', activeMenu: '/productline', menuPath: ['基础设置', '产品'] },
        component: () => import('@/views/goodscenter/productline/add.vue'),
        name: 'productlineAdd',
      },
      {
        path: '/productline/edit',
        meta: { title: '编辑品线', activeMenu: '/productline', menuPath: ['基础设置', '产品'] },
        component: () => import('@/views/goodscenter/productline/add.vue'),
        name: 'productlineEdit',
      },

      // 产品 - 分类管理
      {
        path: '/categorylist',
        meta: { title: '分类列表', menuPath: ['分类管理', '产品'] },
        component: () => import('@/views/goodscenter/categorymanage/categorylist/index.vue'),
        name: 'categorylist',
      },
      {
        path: '/categorylist/detail',
        meta: {
          title: '分类详情',
          activeMenu: '/categorylist',
          menuPath: ['分类管理', '产品'],
        },
        component: () => import('@/views/goodscenter/categorymanage/categorydetail/index.vue'),
        name: 'categoryDetail',
      },
      // 产品 - 产品品类
      {
        path: '/thirdCategory',
        meta: { title: '产品品类', menuPath: ['分类管理', '产品'] },
        component: () => import('@/views/goodscenter/categorymanage/thirdCategory/index.vue'),
        name: 'thirdCategory',
      },
      // 产品 - 标签组管理
      {
        path: '/taggroup',
        meta: { title: '标签组', menuPath: ['分类管理', '产品'] },
        component: () => import('@/views/goodscenter/tagmanage/taggrouplist/index.vue'),
        name: 'taggroup',
      },
      // 产品 - 属性管理
      {
        path: '/proplist',
        meta: { title: '属性列表', menuPath: ['属性管理', '产品'] },
        component: () => import('@/views/goodscenter/propmanage/proplist/index.vue'),
        name: 'proplist',
      },
      {
        path: '/proplist/detail',
        meta: { title: '属性详情', activeMenu: '/proplist', menuPath: ['属性管理', '产品'] },
        component: () => import('@/views/goodscenter/propmanage/propdetail/index.vue'),
        name: 'propdetail',
      },
      // 产品 - 基础数据
      {
        path: '/brandlist',
        meta: { title: '品牌列表', menuPath: ['基础数据', '产品'] },
        component: () => import('@/views/goodscenter/brandmanage/brandlist/index.vue'),
        name: 'brandlist',
      },
      {
        path: '/brandlist/detail',
        meta: { title: '品牌详情', activeMenu: '/brandlist', menuPath: ['基础数据', '产品'] },
        component: () => import('@/views/goodscenter/brandmanage/branddetail/index.vue'),
        name: 'branddetail',
      },
      {
        path: '/sensitivetypelist',
        meta: { title: '敏感类型', menuPath: ['基础数据', '产品'] },
        component: () => import('@/views/goodscenter/sensitivetype/sensitivetypelist/index.vue'),
        name: 'sensitivetypelist',
      },
      {
        path: '/sensitivetypelist/detail',
        meta: {
          title: '敏感类型详情',
          activeMenu: '/sensitivetypelist',
          menuPath: ['基础数据', '产品'],
        },
        component: () => import('@/views/goodscenter/sensitivetype/sensitivetypedetail/index.vue'),
        name: 'sensitivetypedetail',
      },
      {
        path: '/serieslist',
        meta: { title: '系列列表', menuPath: ['基础数据', '产品'] },
        component: () => import('@/views/goodscenter/seriesmanage/serieslist/index.vue'),
        name: 'serieslist',
      },
      {
        path: '/serieslist/detail',
        meta: { title: '系列详情', activeMenu: '/serieslist', menuPath: ['基础数据', '产品'] },
        component: () => import('@/views/goodscenter/seriesmanage/seriesdetail/index.vue'),
        name: 'seriesdetail',
      },
      {
        path: '/modellist',
        meta: { title: '型号列表', menuPath: ['基础数据', '产品'] },
        component: () => import('@/views/goodscenter/modelmanage/modellist/index.vue'),
        name: 'modellist',
      },
      {
        path: '/modellist/detail',
        meta: { title: '型号详情', activeMenu: '/modellist', menuPath: ['基础数据', '产品'] },
        component: () => import('@/views/goodscenter/modelmanage/modeldetail/index.vue'),
        name: 'modeldetail',
      },
      // 产品 - 标签管理
      {
        path: '/labellist',
        meta: { title: '标签列表', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/labelmanage/labellist/index.vue'),
        name: 'labellist',
      },
      {
        path: '/labellist/detail',
        meta: { title: '标签详情', activeMenu: '/labellist', menuPath: ['产品管理', '产品'] },
        component: () => import('@/views/goodscenter/labelmanage/labeldetail/index.vue'),
        name: 'labeldetail',
      },
      // 产品 - 物料管理
      {
        path: '/materiallist',
        meta: { title: '物料列表', menuPath: ['物料管理', '产品'] },
        component: () => import('@/views/goodscenter/materialmanage/materiallist/index.vue'),
        name: 'materiallist',
      },
      {
        path: '/materiallist/detail',
        meta: {
          title: '物料详情',
          activeMenu: '/materiallist',
          menuPath: ['物料管理', '产品'],
        },
        component: () => import('@/views/goodscenter/materialmanage/materialdetail/index.vue'),
        name: 'materialdetail',
      },
      {
        path: '/materiallist/edit',
        meta: {
          title: '编辑物料',
          activeMenu: '/materiallist',
          menuPath: ['物料管理', '产品'],
        },
        component: () => import('@/views/goodscenter/materialmanage/materiallist/edit.vue'),
        name: 'editmaterial',
      },
      {
        path: '/addmaterial',
        meta: { title: '创建物料', activeMenu: '/materiallist', menuPath: ['物料管理', '产品'] },
        component: () => import('@/views/goodscenter/materialmanage/materiallist/add.vue'),
        name: 'addmaterial',
      },
      {
        path: '/productperformance',
        meta: {
          title: '日常售价',
          activeMenu: '/productperformance',
          menuPath: ['销售', '产品表现 '],
        },
        component: () => import('@/views/goodscenter/productperformance/index.vue'),
        name: 'productperformance',
      },
      {
        path: '/skuperformance/detail',
        meta: {
          title: 'SKU',
          activeMenu: '/skuperformance',
          menuPath: ['销售', '产品表现 '],
        },
        component: () => import('@/views/goodscenter/productperformance/sku/index.vue'),
        name: 'skuperformance',
      },
      {
        path: '/mskuperformance/detail',
        meta: {
          title: 'MSKU',
          activeMenu: '/mskuperformance',
          menuPath: ['销售', '产品表现 '],
        },
        component: () => import('@/views/goodscenter/productperformance/msku/index.vue'),
        name: 'mskuperformance',
      },
      {
        path: '/productsn',
        meta: {
          title: ' 产品与供应商映射码',
          menuPath: ['产品管理', '基础配置 '],
        },
        component: () => import('@/views/goodscenter/productSn/index.vue'),
        name: 'productsn',
      },
      {
        path: '/sn/delivery',
        meta: {
          title: '产品SN码出库',
          menuPath: ['产品管理', '基础配置 '],
        },
        component: () => import('@/views/goodscenter/productSn/delivery.vue'),
        name: 'sndelivery',
      },
      {
        path: '/sn/warehousing',
        meta: {
          title: '产品SN码入库查询',
          menuPath: ['产品管理', '基础配置 '],
        },
        component: () => import('@/views/goodscenter/productSn/warehousing.vue'),
        name: 'snwarehousing',
      },
      // 用户中心 - 用户管理
      // ...userCenter,
      // 应用市场
      {
        path: '/annualproduct',
        meta: { title: '新品年规', menuPath: ['产品研发', '产品'] },
        component: () => import('@/views/goodscenter/productDevelopment/annualproduct/index.vue'),
        name: 'annualproduct',
      },
      {
        path: '/derivativeItem',
        meta: { title: '衍生项目', menuPath: ['产品研发', '产品'] },
        component: () => import('@/views/goodscenter/productDevelopment/derivativeItem/index.vue'),
        name: 'derivativeItem',
      },
      {
        path: '/downloadmanage',
        meta: { title: '下载任务', menuPath: ['应用市场'] },
        component: () => import('@/views/applymarket/applycenter/downloadmanage/index.vue'),
        name: 'downloadmanage',
      },
      {
        path: '/packinglist',
        meta: { title: '包装物料清单', menuPath: ['SOP工具', '应用市场'] },
        component: () => import('@/views/applymarket/soptool/packinglist/index.vue'),
        name: 'packinglist',
      },
      {
        path: '/packinglist',
        meta: { title: '包装物料清单', menuPath: ['SOP工具', '应用市场'] },
        component: () => import('@/views/applymarket/soptool/packinglist/index.vue'),
        name: 'packinglist',
      },
      {
        path: '/packinglist/detail',
        meta: {
          title: '包装物料清单详情',
          activeMenu: '/packinglist',
          menuPath: ['SOP工具', '应用市场'],
        },
        component: () => import('@/views/applymarket/soptool/packinglist/detail.vue'),
        name: 'packingdetail',
      },
      {
        path: '/packinglist/add',
        meta: {
          title: '添加包装物料清单',
          activeMenu: '/packinglist',
          menuPath: ['SOP工具', '应用市场'],
        },
        component: () => import('@/views/applymarket/soptool/packinglist/add.vue'),
        name: 'packingadd',
      },
      {
        path: '/packinglist/bom',
        meta: {
          title: '配置包装BOM',
          activeMenu: '/packinglist/bom',
          menuPath: ['SOP工具', '包装BOM'],
        },
        component: () => import('@/views/applymarket/soptool/packinglist/bom.vue'),
        name: 'packingbom',
      },
      {
        path: '/soptemplate',
        meta: { title: '流程模板', menuPath: ['SOP工具', '应用市场'] },
        component: () => import('@/views/applymarket/soptool/soptemplate/index.vue'),
        name: 'soptemplate',
      },
      {
        path: '/soptemplate/detail',
        meta: {
          title: '流程模板详情',
          activeMenu: '/soptemplate',
          menuPath: ['SOP工具', '应用市场'],
        },
        component: () => import('@/views/applymarket/soptool/soptemplate/detail.vue'),
        name: 'soptemplatedetail',
      },
      {
        path: '/soptemplate/add',
        meta: {
          title: '添加流程模板',
          activeMenu: '/soptemplate',
          menuPath: ['SOP工具', '应用市场'],
        },
        component: () => import('@/views/applymarket/soptool/soptemplate/add.vue'),
        name: 'soptemplateadd',
      },
      {
        path: '/logisticsClaim',
        meta: {
          title: '物流索赔单',
        },
        component: () =>
          import('@/views/supplyChainManage/efficiencyTools/logisticsClaim/index.vue'),
        name: 'logisticsClaim',
      },
      {
        path: '/logisticsConfigurationList',
        meta: {
          title: '物流配置表',
          menuPath: ['物流工具'],
        },
        component: () =>
          import('@/views/productTools/logisticsTools/logisticsConfigurationList/index.vue'),
        name: 'logisticsConfigurationList',
      },
      {
        path: '/logisticsQuotaWarning',
        meta: {
          title: '头程物流配额预警',
          menuPath: ['物流工具'],
        },
        component: () =>
          import('@/views/productTools/logisticsTools/logisticsQuotaWarning/index.vue'),
        name: 'logisticsQuotaWarning',
      },
      {
        path: '/boxSupportTools',
        meta: {
          title: '箱托工具',
          menuPath: ['物流工具'],
        },
        component: () => import('@/views/productTools/logisticsTools/boxSupportTools/index.vue'),
        name: 'boxSupportTools',
      },
      {
        path: '/boxSupportTools/selectOrderPacking',
        meta: {
          title: '单独装箱',
          activeMenu: '/boxSupportTools',
          menuPath: ['物流工具'],
        },
        component: () =>
          import(
            '@/views/productTools/logisticsTools/boxSupportTools/selectOrderPacking/index.vue'
          ),
        name: 'boxSupportToolsSelectOrderPacking',
      },
      {
        path: '/boxSupportTools/combinePack',
        meta: {
          title: '合并装箱',
          activeMenu: '/boxSupportTools',
          menuPath: ['物流工具'],
        },
        component: () =>
          import('@/views/productTools/logisticsTools/boxSupportTools/combinePack/index.vue'),
        name: 'boxSupportToolsCombinePack',
      },
      {
        path: '/workorderlist',
        meta: { title: '工单管理', menuPath: ['应用市场'] },
        component: () =>
          import('@/views/applymarket/applycenter/workordermanage/workorderlist/index.vue'),
        name: 'workorderlist',
      },
      {
        path: '/myworkorder',
        meta: { title: '我的工单', menuPath: ['应用市场'] },
        component: () =>
          import('@/views/applymarket/applycenter/workordermanage/workorderlist/index.vue'),
        name: 'myworkorder',
      },
      {
        path: '/workorderlist/detail',
        meta: { title: '工单详情', activeMenu: '/workorderlist', menuPath: ['应用市场'] },
        component: () =>
          import('@/views/applymarket/applycenter/workordermanage/approvaldetail/index.vue'),
        name: 'approvaldetail',
      },
      // 智能助手
      {
        path: '/aiassistant',
        meta: { title: '智能助手' },
        component: () => import('@/views/applymarket/aiassistant/index.vue'),
        name: 'aiassistant',
      },
      // 设置 - 店铺管理
      {
        path: '/shoplist',
        meta: { title: '店铺管理', menuPath: ['店铺管理', '设置'] },
        component: () => import('@/views/settings/shopmanage/shoplist/index.vue'),
        name: 'shoplist',
      },
      {
        path: '/shoplist/detail',
        meta: { title: '店铺详情', activeMenu: '/shoplist', menuPath: ['店铺管理', '设置'] },
        component: () => import('@/views/settings/shopmanage/shoplist/detail.vue'),
        name: 'shopdetail',
      },
      {
        path: '/shoplist/add',
        meta: { title: '新增店铺', activeMenu: '/shoplist', menuPath: ['店铺管理', '设置'] },
        component: () => import('@/views/settings/shopmanage/shoplist/add.vue'),
        name: 'shopAdd',
      },
      {
        path: '/shoplist/edit',
        meta: { title: '编辑店铺', activeMenu: '/shoplist', menuPath: ['店铺管理', '设置'] },
        component: () => import('@/views/settings/shopmanage/shoplist/edit.vue'),
        name: 'shopEdit',
      },
      {
        path: '/shoplist/apply',
        meta: { title: '新增店铺申请', activeMenu: '/shoplist', menuPath: ['店铺管理', '设置'] },
        component: () => import('@/views/settings/shopmanage/shoplist/apply.vue'),
        name: 'shopApply',
      },
      {
        path: '/shoplist/closeApply',
        meta: { title: '关闭店铺申请', activeMenu: '/shoplist', menuPath: ['店铺管理', '设置'] },
        component: () => import('@/views/settings/shopmanage/shoplist/apply.vue'),
        name: 'shopCloseApply',
      },
      {
        path: '/shoplist/delApply',
        meta: {
          title: '店铺公司注销申请',
          activeMenu: '/operatingManagement',
          menuPath: ['店铺管理', '设置'],
        },
        component: () => import('@/views/settings/shopmanage/shoplist/apply.vue'),
        name: 'shopDelApply',
      },
      {
        path: '/operatingManagement',
        meta: { title: '经营管理', menuPath: ['经营管理', '设置'] },
        component: () => import('@/views/settings/operatingManagement/index.vue'),
        name: 'operatingManagement',
      },
      {
        path: '/operatingManagement/detail',
        meta: {
          title: '经营管理详情',
          activeMenu: '/operatingManagement',
          menuPath: ['经营管理', '设置'],
        },
        component: () => import('@/views/settings/operatingManagement/detail.vue'),
        name: 'operatingManagementDetail',
      },
      {
        path: '/dictionary',
        meta: { title: '字典列表', menuPath: ['字典管理'] },
        component: () => import('@/views/settings/dictionary/index.vue'),
        name: 'dictionary',
      },
      {
        path: '/busdict',
        meta: { title: '业务字典' },
        component: () => import('@/views/settings/businessDict/index.vue'),
        name: 'busdict',
      },
      {
        path: '/settlementOrg',
        meta: { title: '结算组织' },
        component: () => import('@/views/settings/settlementOrg/index.vue'),
        name: 'settlementOrg',
      },
      {
        path: '/operatingManagement/add',
        meta: {
          title: '新增企业',
          activeMenu: '/operatingManagement',
          menuPath: ['经营管理', '设置'],
        },
        component: () => import('@/views/settings/operatingManagement/add.vue'),
        name: 'operatingManagementAdd',
      },
      {
        path: '/operatingManagement/edit',
        meta: {
          title: '编辑经营信息',
          activeMenu: '/operatingManagement',
          menuPath: ['经营管理', '设置'],
        },
        component: () => import('@/views/settings/operatingManagement/edit.vue'),
        name: 'operatingManagementEdit',
      },
      /*
      {
        path: '/feedbacklist',
        meta: { title: '意见反馈' },
        component: () => import('@/views/usercenter/feedback/feedbacklist/index.vue'),
        name: 'feedbacklist',
      },
      {
        path: '/feedbacklist/detail',
        meta: { title: '反馈详情', activeMenu: '/feedbacklist', menuPath: ['意见反馈'] },
        component: () => import('@/views/usercenter/feedback/feedbackdetail/index.vue'),
        name: 'feedbackdetail',
      }, */
      {
        path: '/appmateriallist',
        meta: { title: '素材管理' },
        component: () => import('@/views/applymarket/appmaterial/materiallist/index.vue'),
        name: 'appmateriallist',
      },
      {
        path: '/appmateriallist/detail',
        meta: { title: '素材详情', activeMenu: '/appmateriallist', menuPath: ['素材管理'] },
        component: () => import('@/views/applymarket/appmaterial/materialdetail/index.vue'),
        name: 'appmaterialdetail',
      },
      {
        path: '/appmateriallist/add',
        meta: { title: '新增素材', activeMenu: '/appmateriallist', menuPath: ['素材管理'] },
        component: () => import('@/views/applymarket/appmaterial/materialadd/index.vue'),
        name: 'appmaterialadd',
      },
      // 运营管理-商品到期策略
      /* {
        path: '/operationManage',
        meta: { title: '运营管理', menuPath: ['资源营销'] },
        component: () => import('@/views/operationManage/index.vue'),
        name: 'operationManage',
      },
      {
        path: '/operationManage/productExpireConfig',
        meta: { title: '商品到期推荐策略', activeMenu: '/operationManage', menuPath: ['资源营销'] },
        component: () => import('@/views/operationManage/productExpireConfig/index.vue'),
        name: 'productExpireConfig',
      }, */
      // 供应链相关
      ...supplyChain,
      {
        path: '/dailyReport',
        meta: { title: '日报', menuPath: ['工作日报', '路特OA'] },
        component: () => import('@/views/dailyReport/index.vue'),
        name: 'dailyReport',
      },
      {
        path: '/dailyReportCheck',
        meta: { title: '日报', menuPath: ['工作日报', '路特OA'] },
        component: () => import('@/views/dailyReport/check.vue'),
        name: 'dailyReportCheck',
      },
      {
        path: '/channelProductList',
        meta: { title: '线下渠道产品', menuPath: ['销售'] },
        component: () => import('@/views/supplyChainManage/channelProduct/list.vue'),
        name: 'channelProductList',
      },
      {
        path: '/amazonOnline',
        meta: { title: '亚马逊在线商品', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlinegoods/amazon/index.vue'),
        name: 'amazonOnline',
      },
      {
        path: '/amazonOnlineNew',
        meta: { title: '亚马逊商品(新)', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlinegoods/amazonNew/index.vue'),
        name: 'amazonOnlineNew',
      },
      {
        path: '/shopifyOnline',
        meta: { title: '独立站在线商品', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlinegoods/shopify/index.vue'),
        name: 'shopifyOnline',
      },
      {
        path: '/walmartOnline',
        meta: { title: '沃尔玛在线商品', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlinegoods/walmart/index.vue'),
        name: 'walmartOnline',
      },
      {
        path: '/ttOnline',
        meta: { title: 'TikTok在线商品', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlinegoods/tiktok/index.vue'),
        name: 'ttOnline',
      },
      {
        path: '/b2cOnline',
        meta: { title: 'B2C在线商品', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlinegoods/b2c/index.vue'),
        name: 'b2cOnline',
      },
      {
        path: '/offlineGoods',
        meta: { title: '线下渠道商品', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlinegoods/offline/index.vue'),
        name: 'offlineGoods',
      },
      {
        path: '/onlineGoodsLabel',
        meta: { title: '在线商品标签', menuPath: ['在线商品', '销售'] },
        component: () => import('@/views/goodscenter/goodsmanage/onlineGoodsLabel/index.vue'),
        name: 'onlineGoodsLabel',
      },
      {
        path: '/onlineGoodsPerformance',
        meta: { title: '在线商品表现', menuPath: ['在线商品', '销售'] },
        component: () =>
          import('@/views/goodscenter/goodsmanage/onlinegoods/onlinePerformance/index.vue'),
        name: 'onlineGoodsPerformance',
      },
      {
        path: '/onlineGoodsPerformance/detail',
        meta: { title: '在线商品表现详情', menuPath: ['在线商品', '销售'] },
        component: () =>
          import('@/views/goodscenter/goodsmanage/onlinegoods/onlinePerformance/detail.vue'),
        name: 'onlineGoodsPerformanceDetail',
      },
      {
        path: '/productShadow',
        meta: { title: '产品影子', menuPath: ['产品影子', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/productShadow/index.vue'),
        name: 'productShadow',
      },
      {
        path: '/productShadow/detail',
        meta: { title: '产品影子', menuPath: ['产品影子', '产品'] },
        component: () => import('@/views/goodscenter/goodsmanage/productShadow/detail.vue'),
        name: 'productShadowDetail',
      },
      {
        path: '/productOnline',
        meta: { title: '新平台在线商品', menuPath: ['在线商品', '销售'] },
        component: () =>
          import('@/views/goodscenter/goodsmanage/onlinegoods/newplatform/index.vue'),
        name: 'productOnline',
      },
      {
        path: '/macAddress',
        meta: {
          title: 'MAC地址规则',
          menuPath: ['产品中心', 'MAC地址管理 '],
        },
        component: () => import('@/views/goodscenter/goodsmanage/macAddress/index.vue'),
        name: 'macAddress',
      },
      {
        path: '/macAddress/library',
        meta: {
          title: 'MAC地址库',
          menuPath: ['产品中心', 'MAC地址管理 '],
        },
        component: () => import('@/views/goodscenter/goodsmanage/macAddress/library.vue'),
        name: 'macAddressLibrary',
      },
      {
        path: '/saleschannel',
        meta: { title: '销售渠道', menuPath: ['销售'] },
        component: () => import('@/views/saleschannel/index.vue'),
        name: 'saleschannel',
      },
      {
        path: '/cockpit',
        meta: { title: '驾驶舱', menuPath: ['数据集市'] },
        component: () => import('@/views/datacenter/cockpit/index.vue'),
        name: 'cockpit',
      },
      {
        path: '/salesForecastingLog',
        meta: {
          title: '上传日志',
        },
        component: () =>
          import('@/views/supplyChainManage/efficiencyTools/salesForecastingLog/index.vue'),
        name: 'salesForecastingLog',
      },
      {
        path: '/taskDetail',
        meta: {
          title: '任务列表',
        },
        component: () => import('@/views/taskDetail/index.vue'),
        name: 'taskDetail',
      },
      {
        path: '/pdfGenerator',
        meta: {
          title: '文件生成链接',
        },
        component: () => import('@/views/supplyChainManage/efficiencyTools/pdfGenerator/index.vue'),
        name: 'pdfGenerator',
      },
      {
        path: '/team',
        meta: { title: '经营团队', menuPath: ['经营团队', '团队管理'] },
        component: () => import('@/views/teammanage/index.vue'),
        name: 'team',
      },
      {
        path: '/metaTeam',
        meta: { title: '业务团队', menuPath: ['业务团队', '团队管理'] },
        component: () => import('@/views/metaTeamManage/index.vue'),
        name: 'metaTeam',
      },
      {
        path: '/financeRate',
        meta: { title: '每月汇率', menuPath: ['每月汇率'] },
        component: () => import('@/views/goodscenter/financeRate/index.vue'),
        name: 'financeRate',
      },
      {
        path: '/userTracking',
        meta: { title: '日常追踪', menuPath: ['路特汇报'] },
        component: () => import('@/views/usercenter/userTracking/index.vue'),
        name: 'userTracking',
      },
      {
        path: '/label',
        meta: { title: '标签列表', menuPath: ['标签管理'] },
        component: () => import('@/views/labelManage/index.vue'),
        name: 'label',
      },
      {
        path: '/task/pr',
        meta: {
          title: 'PR邮箱分析',
          menuPath: ['社群分析', '任务面板'],
        },
        component: () => import('@/views/communityAnalysis/pr/index.vue'),
        name: 'taskPr',
      },
      ...operationManageMenu,
      ...datamarket,
      ...price,
      ...adjustPrice,
      ...finance,
      ...report,
      ...menuTest,
      ...customsClearance,
      ...afterSale,
      ...purchase,
      ...budget,
      ...bi,
      ...logisticsTrackingBill,
      ...stock,
      ...newProduct,
      ...ps, // 舆情
      ...system,
      ...aim,
      ...orderDashboard,
      {
        path: '/frame/:menuCode/:frameUrl',
        component: () => import('@/views/frame/index.vue'),
        meta: { hidden: true },
        name: 'frame',
      },
      {
        path: '/404',
        meta: { hidden: true },
        component: () => import('@/views/page404/index.vue'),
        name: '404',
      },
    ],
  },
  {
    path: '/supplierRegister',
    component: () => import('@/views/supplierRegister/index.vue'),
    meta: { hidden: true },
    name: 'supplierRegister',
  },
  // 钉钉侧滑
  {
    path: '/bi/dingding/decisionAnalysis',
    meta: { title: '决策' },
    component: () => import('@/views/bi/dingding/index.vue'),
    name: 'dingdingDecisionAnalysis',
  },
  /* {
    path: '/personalCenter',
    meta: { title: '个人中心', hidden: true },
    component: () => import('@/views/personalCenter/index.vue'),
    name: 'personalCenter',
  }, */
  // {
  //   path: '/screen',
  //   meta: { title: '其他layout页面', icon: 'HomeFilled' },
  //   component: () => import('@/xxx/xxx/index.vue'),
  //   name: 'screen',
  // },
  /* {
    path: '/404',
    meta: { hidden: true },
    component: () => import('@/views/page404/index.vue'),
    name: '404',
  }, */
  ...teamsync,
  // {
  //   path: '/appAuth',
  //   component: () => import('@/views/login/assistant.vue'),
  //   meta: { hidden: true },
  //   name: 'appAuth',
  // },
  {
    path: '/fastAuth',
    component: () => import('@/views/redirectPage/fastAuth.vue'),
    meta: { hidden: true },
    name: 'fastAuth',
  },
  ...osStandaloneRoutes,
  {
    path: '/:pathMatch(.*)*',
    meta: { hidden: true },
    redirect: '/404',
    name: 'any',
  },
];
