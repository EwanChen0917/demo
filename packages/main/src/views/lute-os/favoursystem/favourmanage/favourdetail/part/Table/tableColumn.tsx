import { ElTooltip } from 'element-plus';

import EleAvator from '@/components/EleAvator/index.vue';
import EleLetter from '@/components/EleAvator/letter.vue';

let emit: any = null;
export const sendEmit = (_emit: any) => {
  emit = _emit;
};

export const columns = [
  {
    prop: 'orderCode',
    label: '订单信息',
    minWidth: 200,
    render: ({ row }) => {
      return (
        <div class="sample_list_wrap">
          <div class="sample_wrap">
            <div class="name_txt">
              <span class="fw-semibold text-gray-600 fs-9">订单id </span>
              <ElTooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top"
                effect="light"
                disabled={row.orderCode < 10}
                content={row.orderCode}
              >
                <span class="name_right w-semibold text-gray-600">{row.orderCode}</span>
              </ElTooltip>
            </div>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">订单类型 </span>
            <span class="fw-semibold text-gray-600">{row.orderType}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">订单状态 </span>
            <span class="fw-semibold text-gray-600">{row.orderStatus}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">平台代码 </span>
            <span class="fw-semibold text-gray-600">{row.platform}</span>
          </div>
        </div>
      );
    }
  },
  {
    prop: 'timeTotal',
    label: '时间信息',
    minWidth: 160,
    render: ({ row }) => {
      return (
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">创建 </span>
            <span class="fw-semibold text-gray-600">{row.createFormatTime}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">发货 </span>
            <span class="text-gray-600 fs-7">{row.platFormatTime}</span>
          </div>
        </div>
      );
    }
  },
  {
    prop: 'warehouseOrderCode',
    label: '仓库单号',
    minWidth: 120,
    render: ({ row }) => {
      return <span>{row.warehouseOrderCode || '--'}</span>;
    }
  },
  {
    prop: 'label',
    label: '金额',
    minWidth: 160,
    render: ({ row }) => {
      return (
        <div class="send_sample_wrap">
          <div>
            <span class="fw-semibold text-gray-600 fs-9">销售额 </span>
            <span class="link-danger fw-semibold">{row.subtotal}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">金额 </span>
            <span class="link-danger fw-semibold">{row.amountPaid}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">总交易费 </span>
            <span class="link-danger fw-semibold">{row.finalValueFeeTotal}</span>
          </div>
        </div>
      );
    }
  },
  {
    prop: 'label',
    label: '订单明细',
    minWidth: 140,
    render: ({ row }) => {
      return (
        <div>
          {row.detailList?.length > 0 ? (
            <div class="sample_list_wrap">
              {row.detailList.map((item: any, index: number) => {
                return (
                  <div
                    class={index < row.detailList.length - 1 ? 'sample_wrap mb-4' : 'sample_wrap'}
                  >
                    <div class="sample_left symbol symbol-50px">
                      {item.picUrl ? (
                        <span class="symbol-label">
                          <img src={item.picUrl} alt="图片" class="w-100" />
                        </span>
                      ) : (
                        <EleLetter name={item.productName}></EleLetter>
                      )}
                    </div>
                    <div class="sample_right">
                      <div class="name_txt">
                        <ElTooltip
                          popper-class="action_tool_tip text-gray-600"
                          placement="top"
                          effect="light"
                          disabled={item.productName?.length < 10}
                          content={item.productName}
                        >
                          <span class="text-gray-800 text-hover-primary fs-5 fw-bold">
                            {item.productName}
                          </span>
                        </ElTooltip>
                      </div>
                      <div class="">
                        <span class="fw-semibold text-gray-600 fs-9 name_left">单价 </span>
                        <span class="link-primary fw-semibold name_right">{item.unitPrice}</span>
                      </div>
                      <div class="">
                        <span class="fw-semibold text-gray-600 fs-9">数量 </span>
                        <span class="fw-semibold">{item.productQty}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <span>--</span>
          )}
        </div>
      );
    }
  },
  {
    prop: 'buyerName',
    label: '买家名称',
    minWidth: 100,
    headerAlign: 'right',
    align: 'right',
    render: ({ row }) => {
      return <span>{row.buyerName || '--'}</span>;
    }
  }

  // {
  //   prop: 'address',
  //   label: '操作',
  //   headerAlign: 'right',
  //   align: 'right',
  //   width: 150,
  //   render: ({ row }) => {
  //     return (
  //       <div class="action_wrap">
  //         <span
  //           class="action_item"
  //           onClick={() => {
  //             emit('tableBtnAction', 'detail', toRaw(row));
  //           }}
  //         >
  //           <ElTooltip popper-class="action_tool_tip" placement="top" effect="light" content="详情">
  //             <ElIcon>
  //               <View />
  //             </ElIcon>
  //           </ElTooltip>
  //         </span>
  //         <span
  //           class="action_item "
  //           onClick={() => {
  //             emit('tableBtnAction', 'addTagWant', toRaw(row));
  //           }}
  //         >
  //           <ElTooltip
  //             placement="top"
  //             effect="light"
  //             popper-class="action_tool_tip"
  //             content="意向合作 - 发展红人"
  //           >
  //             <ElIcon>
  //               <FolderChecked />
  //             </ElIcon>
  //           </ElTooltip>
  //         </span>
  //         <span
  //           class="action_item "
  //           onClick={() => {
  //             emit('tableBtnAction', 'addTag', toRaw(row));
  //           }}
  //         >
  //           <ElTooltip
  //             placement="top"
  //             popper-class="action_tool_tip"
  //             effect="light"
  //             content="红人标签"
  //           >
  //             <ElIcon>
  //               <DocumentAdd />
  //             </ElIcon>
  //           </ElTooltip>
  //         </span>
  //         <span
  //           class="action_item me-0"
  //           onClick={() => {
  //             emit('tableBtnAction', 'delete', toRaw(row));
  //           }}
  //         >
  //           <ElTooltip placement="top" popper-class="action_tool_tip" effect="light" content="剔除">
  //             <ElIcon class="color_dange">
  //               <Delete />
  //             </ElIcon>
  //           </ElTooltip>
  //         </span>
  //       </div>
  //     );
  //   }
  // }
];
