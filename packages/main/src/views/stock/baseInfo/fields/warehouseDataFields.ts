import { stockCloumns } from '../../components/stockTable.vue';

const warehouseDataFields: stockCloumns[] = [
  {
    prop: 'physicalWarehouseCode',
    label: '仓库编码',
    fixed: 'left',
    minWidth: 130,
  },
  {
    prop: 'physicalWarehouseName',
    label: '仓库名称',
    minWidth: 200,
  },
  {
    prop: 'companyCode',
    label: '公司编码',
    minWidth: 200,
  },
  {
    prop: 'companyName',
    label: '公司名称',
    minWidth: 250,
  },
  {
    prop: 'warehouseCategory',
    label: '仓库类型',
    minWidth: 150,
    slot: 'warehouseCategory',
  },
  {
    prop: 'businessType',
    label: '业务类型',
    minWidth: 120,
  },
  {
    prop: 'functionWarehouseCode',
    label: '职能仓编码',
    minWidth: 150,
  },
  {
    prop: 'functionWarehouseName',
    label: '职能仓名称',
    minWidth: 300,
  },
  {
    prop: 'functionStatus',
    label: '职能仓状态',
    minWidth: 150,
    slot: 'functionStatus',
  },
  {
    prop: 'channelCodes',
    label: '销售渠道',
    minWidth: 200,
    slot: 'channelCodes',
  },
  {
    prop: 'serviceProviderName',
    label: '服务商名称',
    minWidth: 150,
  },
  {
    prop: 'serviceProviderAccount',
    label: '服务商账号',
    minWidth: 150,
  },
  {
    prop: 'actions',
    label: '操作',
    minWidth: 100,
    slot: 'actions',
    fixed: 'right',
  },
];

export default warehouseDataFields;
