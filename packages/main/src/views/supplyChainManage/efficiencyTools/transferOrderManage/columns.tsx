/**
 * 获取表格列
 * @param tabStatus 0-待审核，1-已审核
 * @param handleSave 保存编辑项方法
 * @param handleRemark 打开备注弹窗方法
 * @returns columns
 */
export function getColumns({
  tabStatus,
}: {
  tabStatus: number;
  // handleSave: (row: any, val: any, field: string) => void;
  // handleRemark: (e: MouseEvent, row: any) => void;
}): any[] {
  const columns: any[] = [
    {
      type: 'selection',
      fixed: 'left',
    },
    {
      prop: 'transferId',
      label: 'transferId',
      minWidth: 100,
    },
    { prop: 'shipmentId', label: '货件号', minWidth: 100 },
    ...(tabStatus === 0
      ? [
          { prop: 'inventoryQuantity', label: '库存', minWidth: 80 },
          { prop: 'inTransitQuantity', label: '在途库存' },
          { prop: 'sales28d', label: '28天销量' },
          { prop: 'dailySales', label: '单日销量' },
          { prop: 'inventoryCoverDays', label: '库存可售天数', minWidth: 110 },
          { prop: 'forecast12w', label: '12周预测量', minWidth: 100 },
          { prop: 'dailyForecast', label: '单日预测量', minWidth: 100 },
          { prop: 'forecastCoverDays', label: '预测可售天数', minWidth: 110 },
          {
            prop: 'transportName',
            label: '确认物流方式',
            minWidth: 110,
            slot: 'transportName',
          },
          {
            prop: 'quantity',
            label: '确认调拨数量',
            minWidth: 110,
            slot: 'quantity',
          },
        ]
      : []),
    ...(tabStatus === 1 ? [{ prop: 'groupCode', label: '调拨分组号', minWidth: 100 }] : []),
    { prop: 'plannerName', label: '计划', minWidth: 100 },
    { prop: 'operatorName', label: '运营', minWidth: 100 },
    { prop: 'channel', label: '渠道' },
    { prop: 'country', label: '国家' },
    { prop: 'fnsku', label: 'FNSKU/UPC', minWidth: 130 },
    { prop: 'asin', label: 'ASIN/Item ID', minWidth: 130 },
    { prop: 'supplySku', label: '供应链SKU', minWidth: 150 },
    { prop: 'prodName', label: '产品名称', minWidth: 150 },
    { prop: 'outWarehouseDesc', label: '调出仓', minWidth: 130 },
    {
      prop: 'toWarehouseDesc',
      label: '调入仓',
      minWidth: 130,
      slot: 'toWarehouseReviewed',
    },
    ...(tabStatus === 0
      ? [
          { prop: 'initialQuantity', label: '初始调拨数量', minWidth: 110 },
          { prop: 'boxSpecifications', label: '箱规', minWidth: 110 },
          { prop: 'initialTransportName', label: '初始物流方式', minWidth: 110 },
        ]
      : []),
    ...(tabStatus === 1
      ? [
          {
            prop: 'quantity',
            label: '调拨数量',
            minWidth: 100,
            slot: 'quantityReviewed',
          },
          { prop: 'boxSpecifications', label: '箱规', minWidth: 110 },
          {
            prop: 'transportName',
            label: '物流方式',
            minWidth: 110,
            slot: 'transportNameReviewed',
          },
        ]
      : []),
    {
      prop: 'directDelivery',
      label: '直发标识',
      minWidth: 110,
      slot: 'directDelivery',
    },
    { prop: 'expectDeliveryDate', label: '预计出库日期', minWidth: 110 },
    { prop: 'expectShipmentDate', label: '预计出运日期', minWidth: 110 },
    ...(tabStatus === 0
      ? [
          { prop: 'etd', label: 'ETD', minWidth: 100 },
          { prop: 'eta', label: 'ETA' },
        ]
      : []),
    {
      prop: 'approvalStatus',
      label: '状态',
      slot: 'approvalStatus',
    },
    { prop: 'createTime', label: '导入时间', minWidth: 120 },
    ...(tabStatus === 0 ? [{ prop: 'creatorName', label: '导入人', minWidth: 80 }] : []),
    ...(tabStatus === 1
      ? [
          {
            prop: 'createStatus',
            label: '调拨单创建状态',
            minWidth: 120,
            slot: 'createStatus',
          },
          { prop: 'thirdCode', label: '积加调拨单号', minWidth: 110 },
        ]
      : []),
    { prop: 'airborneReasons', label: '空派原因', minWidth: 150 },
    { prop: 'expirationDate', label: '过期时间', minWidth: 150 },
    {
      prop: 'remark',
      label: '备注',
      minWidth: 150,
      slot: 'remark',
    },
    ...(tabStatus === 1
      ? [
          { prop: 'creatorName', label: '导入人', minWidth: 80 },
          { prop: 'reviewerName', label: '审核人', minWidth: 80 },
        ]
      : []),
  ];

  return columns;
}
