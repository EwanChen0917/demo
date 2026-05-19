import EleAvator from '@/components/EleAvator/index.vue';
import { ElTooltip } from 'element-plus';

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
    type: 'selection',
    width: 50,
    fixed: 'left',
  },
  {
    prop: 'username',
    label: '红人信息',
    align: 'left',
    headerAlign: 'left',
    minWidth: 220,
    render: ({ row }) => {
      return (
        <div class="avator_wrap">
          <div class="avator_left">
            <EleAvator url={row.avatar} isHandleError="true" name={row.username}></EleAvator>
          </div>
          <div class="avator_right">
            <ElTooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top"
              effect="light"
              trigger={'hover'}
              content={row.username}
              disabled={row.username.length <= 24}
            >
              <div class="avator_name over_elli fs-4 text-gray-800 mb-1">
                {row.username}
                <i
                  class="fas ms-2 fs-7 fa-copy text-hover-primary cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    emit('tableBtnAction', 'copy1', row.username);
                  }}
                ></i>
              </div>
            </ElTooltip>
            <ElTooltip
              popper-class="action_tool_tip"
              placement="top"
              effect="light"
              trigger={'hover'}
              content={row.userEmail}
              disabled={row.userEmail.length <= 28}
            >
              <div class="avator_desc over_elli fs-9 ">
                {row.userEmail}
                <i
                  v-show={row.userEmail}
                  class="fas ms-2 fs-7 fa-copy text-hover-primary cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    emit('tableBtnAction', 'copy2', row.userEmail);
                  }}
                ></i>
              </div>
            </ElTooltip>
          </div>
        </div>
      );
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
    prop: 'address',
    label: '收件地址',
    minWidth: 150,
    render: ({ row }) => {
      return (
        <div class="fw-semibold text-gray-600 fs-9">
          {/*<p>国家: {row.country || '--'}</p>
          <p>洲: {row.province || '--'}</p>
          <p>城市：{row.city || '--'}</p>
          <p>街道：{row.address || '--'}</p>
          <p>邮编：{row.zipcode || '--'}</p>*/}
          <div>
            {row.address || '--'},{row.city || '--'},{row.province || '--'},{row.country || '--'}.
          </div>
        </div>
      );
    },
  },
  {
    prop: 'contact',
    label: '联系方式',
    minWidth: 120,
    render: ({ row }) => {
      return (
        <div class="fw-semibold text-gray-600 fs-9">
          <div>{row.phone || '--'}</div>
          <ElTooltip
            popper-class="action_tool_tip"
            placement="top"
            effect="light"
            trigger={'hover'}
            content={row.email}
          >
            <div class="avator_desc over_elli fs-9 ">{row.email}</div>
          </ElTooltip>
        </div>
      );
    },
  },
  {
    prop: 'remark',
    label: '推广备注',
    minWidth: 120,
    render: ({ row }) => {
      return (
        <div class="fw-semibold text-gray-600 fs-9">
          <span>{row.remark || '--'}</span>
        </div>
      );
    },
  },
  {
    prop: 'shippingInfo',
    label: '申请发货信息',
    minWidth: 180,
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
    prop: 'orderCode',
    label: '订单ID',
    minWidth: 120,
    render: ({ row }) => {
      return (
        <div class="fw-semibold text-gray-600 fs-9">
          <span>{row.orderCode || '--'}</span>
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
];
