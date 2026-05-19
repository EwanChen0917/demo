const customFields = [
  {
    title: '订单明细',
    propertyArr: [
      { key: 'productImageUrl', label: '图片', checked: true },
      { key: 'productName', label: '商品名称', checked: true, readonly: true },
      { key: 'supplySku', label: '供应链SKU', checked: true, readonly: true },
      { key: 'numInt', label: '数量', checked: true, readonly: true },
      { key: 'price', label: '销售单价', checked: true, readonly: true },
      { key: 'total', label: '总数量', checked: true, readonly: false },
      { key: 'customerDesc', label: '客户名称', checked: true, readonly: true },
      { key: 'shopAccount', label: '卖家账号', checked: true },
      { key: 'creator', label: '创建人', checked: true },
      { key: 'waitAuditOperatorList', label: '当前待审核人', checked: true },
      { key: 'sourceDesc', label: '订单来源', checked: true },
      { key: 'orderSaleTypeDesc', label: '订单渠道', checked: true },
    ],
  },
  {
    title: '订单金额',
    propertyArr: [
      {
        key: 'amount',
        label: '总金额',
        checked: true,
        content: '含税{taxAmount} / 不含税{amount}',
        tips: '总金额 (含税)=交易额 (含税) +运费+销售运费',
      },
      {
        key: 'productTaxAmount',
        label: '总税额',
        checked: true,
        tips: '总税额=∑订单行 (税额*数量)',
      },
      { key: 'freightAmount', label: '运费', checked: true },
      { key: 'salesFreightAmount', label: '销售运费', checked: true },
      { key: 'discountAmount', label: '折扣金额', checked: true },
      { key: 'commission', label: '佣金', checked: true },
      {
        key: 'transactionAmount',
        label: '交易额',
        checked: true,
        content: '含税{taxTransactionAmount} / 不含税{transactionAmount}',
        tips: '交易额 (含税) =∑订单行 (销售单价 (含税) *数量)',
      },
      {
        key: 'realTransactionAmount',
        label: '实际交易额',
        checked: true,
        content: '含税{taxRealTransactionAmount} / 不含税{realTransactionAmount}',
        tips: '实际交易额 (含税) =交易额 (含税) -运费-佣金-销售折扣+销售运费',
      },
    ],
  },
  {
    title: '发货信息',
    propertyArr: [
      { key: 'buyerName', label: '收件人', checked: true, readonly: true },
      { key: 'buyerPhone', label: '电话', checked: true },
      { key: 'buyerCountryDesc', label: '国家/地区', checked: true, readonly: true },
      { key: 'warehouseDesc', label: '发货仓库', checked: true, readonly: true },
      { key: 'spName', label: '物流承运商', checked: true, readonly: true },
      { key: 'shippingDesc', label: '物流渠道', checked: true, readonly: true },
      { key: 'trackOrderCode', label: '跟踪号', checked: true },
      { key: 'waybillNo', label: '运单号', checked: true },
    ],
  },
  {
    title: '时间',
    propertyArr: [
      { key: 'createTime', label: '创建时间', checked: true, readonly: true },
      { key: 'sendTime', label: '发货时间', checked: true },
      { key: 'signTime', label: '签收时间', checked: true },
      {
        key: 'operationExpectedArrivalTime',
        label: '平台送达',
        checked: true,
        content: '{operationExpectedArrivalTime} 至 {operationExpectedArrivalTimeEnd}',
      },
    ],
  },
];
export default customFields;
