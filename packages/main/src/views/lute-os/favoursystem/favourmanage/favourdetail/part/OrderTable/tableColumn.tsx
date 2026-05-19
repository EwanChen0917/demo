import { ElTooltip } from 'element-plus';
import EleAvator from '@/components/EleAvator/index.vue';
import EleLetter from '@/components/EleAvator/letter.vue';

let emit: any = null;
export const sendEmit = (_emit: any) => {
  emit = _emit;
};

const orderStatusMap = (val) => {
  const map = {
    '-1': {
      desc: '待推送',
      class: 'status_completed3',
    },
    2: {
      desc: '待发货审核',
      class: 'status_completed',
    },
    3: {
      desc: '待发货',
      class: 'status_potent',
    },
    4: {
      desc: '已发货',
      class: 'status_completed2',
    },
    5: {
      desc: '异常',
      class: 'status_cancel',
    },
  };
  return map[val];
};
export const columns = [
  {
    prop: 'orderCode',
    label: '订单号',
    minWidth: 120,
    render: ({ row }) => {
      return <span>{row.orderCode || '--'}</span>;
    },
  },
  {
    prop: 'productInfo',
    label: '商品信息',
    align: 'left',
    minWidth: 150,
    headerAlign: 'left',
    render: ({ row }) => {
      return (
        <div v-if={row.orderItemList && row.orderItemList.length}>
          {row.orderItemList &&
            row.orderItemList.map((item) => {
              return (
                <div class="fw-semibold text-gray-600 fs-9">
                  {item.productSkuQty || '--'} × {item.productTitle || '--'}
                </div>
              );
            })}
        </div>
      );
    },
  },
  {
    prop: 'shippingInfo',
    label: '申请发货信息',
    minWidth: 120,
    render: ({ row }) => {
      return (
        <div>
          <div class="fw-semibold text-gray-600 fs-9">申请 {row.creatorName || '--'}</div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">时间 </span>
            <span class="fw-semibold text-gray-600">{row.submitTime || '--'}</span>
          </div>
        </div>
      );
    },
  },
  {
    prop: 'orderStatus',
    label: '发样状态',
    width: 100,
    render: ({ row }) => {
      return (
        <span class={orderStatusMap(row.orderStatus)['class']}>
          <span class={'scale_txt'}>{orderStatusMap(row.orderStatus)['desc'] || '--'}</span>
        </span>
      );
    },
  },
  {
    prop: 'userCode',
    label: '物流信息',
    minWidth: 120,
    render: ({ row }) => {
      return (
        <div class="fw-semibold text-gray-600 fs-9">
          <div>承运人 {row.trackingCompany || '--'}</div>
          <div>
            物流跟踪号
            {row.trackingNumber && row.trackingUrl ? (
              <a href={row.trackingUrl || ''} target={'_blank'}>
                {' '}
                {row.trackingNumber || '--'}
              </a>
            ) : (
              <span> --</span>
            )}
          </div>
          <div>发货 {row.shippingTime || '--'}</div>
          {/* <p>店铺sku：{row.shippingTime || '--'}</p> */}
        </div>
      );
    },
  },
  {
    prop: 'address',
    label: '操作',
    headerAlign: 'left',
    align: 'left',
    width: 80,
    render: ({ row }) => {
      return (
        <span
          class="action_item menu-link menu-gray-600 fs-8 text-primary cursor-pointer"
          onClick={() => {
            emit('tableBtnAction', 'detail', toRaw(row));
          }}
        >
          详情
        </span>
      );
    },
  },
];
