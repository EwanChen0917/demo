const baseColumns = [
  {
    prop: 'availableQuantity',
    label: '可用库存',
    minWidth: 140,
    sortable: true,
    tips: {
      center: <span>积加产品库存，可用量字段</span>,
      fba: (
        <span>
          积加FBA库存，数量=本地可售 + 预留-运营中心转运 + 预留-运营中心正在处理-预留买家订单
        </span>
      ),
      shopify: <span>积加库存同步--三方仓库存，可用量字段</span>,
      walmart: <span>积加库存同步--三方仓库存--Walmart库存，可售字段</span>,
      tikTok: (
        <div>
          自研ERP-平台同步库存-FBT库存和积加库存同步--三方仓库库存汇总统计
          <br />
          1.自研ERP-平台同步库存-FBT库存：根据MSKU+国家汇总，数量=可用量
          <br />
          2.积加库存同步--三方仓库库存：
          <br />
          2.1在自研ERP-仓库归属筛选渠道为TikTok，仓库类型为海外仓的仓库，统计供应链SKU+国家维度的可用量
          <br />
          2.2查找自研ERP-销售映射，根据供应链SKU+国家匹配对应的msku，汇总统计msku+国家的销量
          <br />
          2.3若供应链SKU+国家匹配到多个msku+国家，则每条数据都有当前汇总的可用量
        </div>
      ),
      retail: <span>积加库存同步--三方仓库存，可用量字段</span>,
    },
  },
  {
    prop: 'preAllocateQuantity',
    label: '预占库存',
    minWidth: 140,
    sortable: true,
    tips: {
      center: <span>积加产品库存，已处理预占字段</span>,
      fba: <span>积加FBA库存，数量=预留-买家订单</span>,
      shopify: <span>积加库存同步--三方仓库存，预占量字段</span>,
      walmart: <span>该字段没有数据源，默认为0</span>,
      tikTok: (
        <div>
          自研ERP-平台同步库存-FBT库存和积加库存同步--三方仓库库存汇总统计
          <br />
          1.自研ERP-平台同步库存-FBT库存：根据MSKU+国家汇总，数量=预占量
          <br />
          2.积加库存同步--三方仓库库存：
          <br />
          2.1在自研ERP-仓库归属筛选渠道为TikTok，仓库类型为海外仓的仓库，统计供应链SKU+国家维度的预占量
          <br />
          2.2查找自研ERP-销售映射，根据供应链SKU+国家匹配对应的msku，汇总统计msku+国家的销量
          <br />
          2.3若供应链SKU+国家匹配到多个msku+国家，则每条数据都有当前汇总的预占量
        </div>
      ),
      retail: <span>积加库存同步--三方仓库存，预占量字段</span>,
    },
  },
  {
    prop: 'frozenQuantity',
    label: '冻结库存',
    minWidth: 140,
    sortable: true,
    tips: {
      center: <span>当前默认为0</span>,
      fba: <span>积加FBA库存，数量=积加--预留-运营中心转运 + 预留-运营中心正在处理</span>,
      shopify: <span>当前默认为0</span>,
      walmart: <span>该字段没有数据源，默认为0</span>,
      tikTok: <span>该字段没有数据源，默认为0</span>,
      retail: <span>当前默认为0</span>,
    },
  },
  {
    prop: 'inStockQuantity',
    label: '在库库存',
    minWidth: 140,
    sortable: true,
    tips: {
      center: <span>可用库存+预占库存+冻结库存+不良品库存</span>,
      fba: (
        <span>
          积加FBA库存，数量=本地可售 + 预留-运营中心转运 +
          预留-运营中心正在处理+预留-买家订单+不可售
        </span>
      ),
      shopify: <span>可用库存+预占库存+冻结库存+不良品库存</span>,
      walmart: <span>可用库存+预占库存+冻结库存+不良品库存</span>,
      tikTok: <span>可用库存+预占库存+冻结库存+不良品库存</span>,
      retail: <span>可用库存+预占库存+冻结库存+不良品库存</span>,
    },
  },
  {
    prop: 'inStockGoodQuantity',
    label: '在库良品库存',
    minWidth: 150,
    sortable: true,
    tips: {
      fba: <span>积加FBA库存，数量=本地可售 + 预留-运营中心转运 + 预留-运营中心正在处理</span>,
      center: <span>可用库存+预占库存+冻结库存</span>,
      shopify: <span>可用库存+预占库存+冻结库存</span>,
      walmart: <span>可用库存+预占库存+冻结库存</span>,
      tikTok: <span>可用库存+预占库存+冻结库存</span>,
      retail: <span>可用库存+预占库存+冻结库存</span>,
    },
  },
  {
    prop: 'unsellableQuantity',
    label: '不良品库存',
    minWidth: 140,
    sortable: true,
    tips: {
      center: <span>积加产品库存，不可售字段</span>,
      fba: <span>积加FBA库存，不可售字段</span>,
      shopify: <span>积加库存同步--三方仓库存，次品量字段</span>,
      walmart: <span>积加库存同步--三方仓库存--Walmart库存，拒收（损坏）字段</span>,
      tikTok: (
        <div>
          自研ERP-平台同步库存-FBT库存和积加库存同步--三方仓库库存汇总统计
          <br />
          1.自研ERP-平台同步库存-FBT库存：根据MSKU+国家汇总，数量=次品量
          <br />
          2.积加库存同步--三方仓库库存：
          <br />
          2.1
          在自研ERP-仓库归属筛选渠道为TikTok，仓库类型为海外仓的仓库，统计供应链SKU+国家维度的次品量
          <br />
          2.2 查找自研ERP-销售映射，根据供应链SKU+国家匹配对应的msku，汇总统计msku+国家的销量
          <br />
          2.3 若供应链SKU+国家匹配到多个msku+国家，则每条数据都有当前汇总的次品量
        </div>
      ),
      retail: <span>积加库存同步--三方仓库存，次品量字段</span>,
    },
  },
];

// 中仓
export const centerTableColumns = [
  {
    prop: 'planQuantity',
    label: '计划库存',
    minWidth: 140,
    sortable: true,
    tips: {
      center: (
        <div>
          数据来源为SRM系统需求池待订单状态和采购订单新建+变更中+待供应商确认+供应商拒绝+易仓处理中状态
        </div>
      ),
    },
  },
  {
    prop: 'poUnDeliveryQuantity',
    label: '采购未交库存',
    minWidth: 150,
    sortable: true,
    tips: {
      center: (
        <div>
          1.数据来源为SRM系统采购订单明细和送货单明细
          <br />
          2.未交数量=在途数量+未交货数量+送货单明细发货数量
          <br />
          3.采购订单状态取：已确认，送货单状态取：新建+已拒绝+待计划确认。送货单行明细，过滤PO已经关闭的数据
        </div>
      ),
    },
  },
  ...baseColumns,
];

export const planStockTableColumns = [
  {
    prop: 'planQuantity',
    label: '计划库存',
    minWidth: 140,
    sortable: true,
    tips: {
      fba: (
        <div>
          统计待拣货+待出库的调拨单中，MSKU的调拨量
          <br />
          1.取调拨单状态为：待拣货/待出库
          <br />
          2.筛选调入仓库为amazon的仓库，amazon直接查积加-仓库资料-平台仓-Amazon
          <br />
          3.根据MSKU+仓库维度统计计划库存表
        </div>
      ),
      shopify: (
        <div>
          1.取调拨单状态为：待拣货/待出库
          <br />
          2.筛选调入仓库为shopify的仓库
          <br />
          3.根据供应链SKU+仓库维度统计计划库存表
        </div>
      ),
      walmart: (
        <div>
          1.取调拨单状态为：待拣货/待出库
          <br />
          2.筛选调入仓库为归属Walmart、US国家的仓库
          <br />
          3.FNSKU查询对应的GTIN汇总到ItemID和国家维度
          <br />
          4.如果出现GTIN对应多个ItemID的情况，那么ItemID的计划库存数量会虚高
        </div>
      ),
      tikTok: (
        <div>
          1.取调拨单状态为：待拣货/待出库
          <br />
          2.筛选调入仓库为归属TikTok和仓库类型为海外仓、区分国家的仓库。仓库归属来源自研ERP-仓库归属
          <br />
          3.根据自研ERP-销售映射，区分国家，映射到MSKU上汇总调拨量
          <br />
          4.若没有当前供应链SKU没有映射，则不匹配计划库存，若一个供应链SKU匹配多个MSKU，则每个msku都加入对应的计划库存数量
        </div>
      ),
      retail: (
        <div>
          1.取调拨单状态为：待拣货/待出库
          <br />
          2.筛选调入仓库为offline的仓库
          <br />
          3.根据供应链SKU+仓库维度统计计划库存表
        </div>
      ),
    },
  },
  {
    prop: 'inTransitQuantity',
    label: '在途库存',
    minWidth: 140,
    sortable: true,
    tips: {
      fba: (
        <div>
          统计FBA货件中，MSKU的数量
          <br />
          1.货件状态取：WORKING/SHIPPED/IN_TRANSIT/DELIVERED/CHECKED_IN/READY_TO_SHIP；且筛选货件关联的调拨单状态为调拨在途和已完成状态
          <br />
          2.筛选调入仓库为amazon的仓库，amazon直接查积加-仓库资料-平台仓-Amazon
          <br />
          3.在途数量=发货量
        </div>
      ),
      shopify: (
        <div>
          1.根据积加调拨单和发货单，统计供应链SKU的发货量
          <br />
          2.筛选调入仓库为shopify的仓库
          <br />
          3.发货单状态为提货中+已出运+入库中三个状态，取供应链SKU的发货量
        </div>
      ),
      walmart: (
        <div>
          1.取物流跟踪表的数据：
          <br />
          2.状态取：正常在途+出口查验-未放行+进口查验-未放行+延误风险
          <br />
          3.渠道筛选Walmart，国家筛选US，仓库取目的仓
          <br />
          4.数量=sku明细数量
        </div>
      ),
      tikTok: (
        <div>
          1.取物流跟踪表的数据：
          <br />
          2.状态取：正常在途+出口查验-未放行+进口查验-未放行+延误风险
          <br />
          3.渠道筛选TikTok，根据目的国家汇总
          <br />
          4.数量=sku明细数量
        </div>
      ),
      retail: (
        <div>
          1.根据积加调拨单和发货单，统计供应链SKU的发货量
          <br />
          2.筛选调入仓库为offline的仓库
          <br />
          3.发货单状态为提货中+已出运+入库中三个状态，取供应链SKU的发货量
        </div>
      ),
    },
  },
  ...baseColumns,
];
