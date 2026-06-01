<template>
  <el-table
    :data="data"
    max-height="800px"
    :row-key="(row) => `${row.order?.orderCode || row.order?.id} - ${row.order?.shopName}`"
    v-loading="loading"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="40" reserve-selection align="top" />
    <el-table-column align="left">
      <template #header>
        <span class="label">
          已选
          <span class="label info">{{ selectedRows.length }}</span>
        </span>
        <el-button
          style="margin: 0 10px"
          @click="handleClickToRefund"
          v-permission="'saleOrderPush'"
          :loading="refundLoading"
        >
          补推自发货
        </el-button>
        <el-button
          style="margin: 0 10px"
          @click="handleClickToExport"
          v-permission="'salesOrderExport'"
          :loading="exportLoading"
        >
          导出
        </el-button>
      </template>
      <template #default="scope">
        <div class="table-header">
          <div class="table-header-left">
            <div class="table-header-box">
              <wordBox type="blue">{{ '-' }}</wordBox>
              <span class="table-header-status">
                [{{ scope.row.order.orderFulfillmentStatusName || '-' }}]
              </span>
            </div>
            <el-divider direction="vertical" />
            <div class="table-header-box">
              <span>{{ scope.row.order.receiverAddressCountry || '-' }}</span>
            </div>
            <el-divider direction="vertical" />

            <div class="table-header-box">
              <el-icon :size="14">
                <Shop />
              </el-icon>
              <span>{{ scope.row.order.shopName || '-' }}</span>
              <Copy :content="scope.row.order.shopName || '-'" v-if="scope.row.order.shopName" />
            </div>
            <el-divider direction="vertical" />
            <div class="table-header-box">
              <span>
                销售额： {{ `${scope.row.order.currency || '-'} ${scope.row.order.totalAmount}` }}
              </span>
            </div>
            <el-divider direction="vertical" />
            <div class="table-header-box">
              <span>
                实付：{{ `${scope.row.order.currency || '-'} ${scope.row.order.buyerPayAmount}` }}
              </span>
            </div>
            <el-divider direction="vertical" />
            <!-- {{ scope.row?.order?.orderRisk }} -->
            <div class="table-header-box" v-if="scope.row?.order?.orderRisk === '中风险'">
              <span class="item-label">
                标签：
                <ShopifyLabelList :labelList="repArr" />
              </span>
            </div>
            <div class="table-header-box" v-if="scope.row?.order?.orderRisk === '高风险'">
              <span class="item-label">
                标签：
                <ShopifyLabelList :labelList="repArr2" />
              </span>
            </div>
          </div>
          <div class="table-header-right">
            <el-divider direction="vertical" />
            <el-popover
              placement="top"
              :width="400"
              trigger="hover"
              popper-class="salesorder-info-popper"
            >
              <template #reference>
                <div style="display: flex; align-items: center; cursor: pointer; gap: 10px">
                  <el-icon :size="14">
                    <Document />
                  </el-icon>
                  <span>
                    {{ scope.row.order.orderCode || '-' }}
                    <Copy
                      :content="scope.row.order.orderCode || '-'"
                      v-if="scope.row.order.orderCode"
                    />
                  </span>
                </div>
              </template>
              <div class="salesorder-info-popover">
                <div class="popover-content">
                  <div class="popover-item">
                    <span>平台单号：</span>
                    <span class="value">{{ `${scope.row.order.orderCode ?? '-'}` }}</span>
                  </div>
                  <div class="popover-item">
                    <span>平台订单ID：</span>
                    <span class="value">{{ scope.row.order.orderId ?? '-' }}</span>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
        <div class="table-item">
          <!-- 左侧：商品列表（循环） -->
          <div class="table-item-goods-list">
            <div
              v-for="(goods, index) in scope.row.itemList"
              :key="index"
              class="table-item-goods"
              :class="{ 'goods-divider': index > 0 }"
            >
              <div class="table-item-goods__images">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="goods.platformProductImageUrl"
                  fit="cover"
                >
                  <template #error>
                    <div class="image-placeholder"></div>
                  </template>
                  <template #placeholder>
                    <div class="image-placeholder"></div>
                  </template>
                </el-image>
              </div>
              <div class="table-item-goods__info">
                <span class="inline-item">
                  <div class="label-text">
                    <wordBox>商</wordBox>
                  </div>
                  <span>
                    <OverflowTooltip :content="goods.platformProductName || '-'" :line="1" />
                  </span>
                </span>
                <span class="inline-item">
                  <span class="label-text">MSKU:</span>
                  <OverflowTooltip :content="goods.msku || '-'" :line="1" />
                  <Copy :content="goods.msku + '' || '-'" v-if="goods.msku" />
                </span>
                <span class="inline-item">
                  <span class="label-text">ITEMID:</span>
                  <span
                    style="color: #0045f0; cursor: pointer"
                    @click="handleClickToProductDetail(goods.productLink)"
                  >
                    {{ goods.productId }}
                  </span>
                  <Copy :content="goods.productId + '' || '-'" v-if="goods.productId" />
                </span>
                <div v-if="!goods.itemSkuBeanList?.length">
                  <span class="inline-item">
                    <div class="label-text">
                      <wordBox>产</wordBox>
                    </div>
                    <span>
                      <OverflowTooltip :content="'-'" :line="1" />
                    </span>
                  </span>
                  <span class="inline-item">
                    <span class="label-text">SKU：</span>
                    <div>
                      <span>{{ '-' }}</span>
                    </div>
                  </span>
                </div>
                <div v-for="(item, index) in goods.itemSkuBeanList" :key="item.supplySku">
                  <span class="inline-item">
                    <div class="label-text">
                      <wordBox>产{{ index + 1 }}</wordBox>
                    </div>
                    <span>
                      <OverflowTooltip :content="item.productName || '-'" :line="1" />
                    </span>
                  </span>
                  <span class="inline-item">
                    <span class="label-text">SKU{{ index + 1 }}：</span>
                    <div>
                      <span>{{ item.supplySku || '-' }}</span>
                      <Copy :content="item.supplySku + '' || '-'" v-if="item.supplySku" />
                    </div>
                  </span>
                </div>
                <span class="inline-item">
                  <span class="label-text">属性：</span>
                  <span>{{ goods.productProperty || '-' }}</span>
                </span>
                <span class="remark-box">
                  <span class="label-text">备注：</span>
                  <OverflowTooltip :content="goods.remark || '-'" :line="1" />
                  <i
                    ref="remarkIconRef"
                    class="iconfont icon-bianji"
                    @click.stop="
                      handleOpenRemark(
                        $event,
                        goods,
                        'goodsRemark',
                        scope.row.order.orderCode,
                        scope.row.order?.shopName,
                      )
                    "
                  ></i>
                </span>
              </div>
              <div class="table-item-goods__price">
                <span>{{ ` ${goods.currency} ${goods.productPrice || 0} ` }}</span>
                <span>X{{ goods.buyQuantity || 0 }}</span>
              </div>
              <div class="table-item-goods__logistics">
                <div>
                  <el-icon :size="14">
                    <Location />
                  </el-icon>
                  <span style="flex-shrink: 0">物品地：</span>
                  <span class="text-ellipsis">{{ goods.goodsLocation || '-' }}</span>
                </div>
                <el-popover
                  placement="top"
                  :width="400"
                  trigger="hover"
                  popper-class="salesorder-info-popper"
                >
                  <template #reference>
                    <div>
                      <el-icon :size="14">
                        <Place />
                      </el-icon>
                      <span style="flex-shrink: 0">寄往地：</span>
                      <span class="text-ellipsis">
                        {{
                          `${scope.row.order.receiverAddressCity ?? ''}
                        ${scope.row.order.receiverAddressPostCode ?? ''}
                        ${scope.row.order.receiverAddressCountry ?? ''}`.trim() || '-'
                        }}
                      </span>
                    </div>
                  </template>
                  <div class="salesorder-info-popover">
                    <div class="popover-title">收件人信息</div>
                    <div class="popover-content">
                      <div class="popover-item">
                        <el-icon :size="16">
                          <Avatar />
                        </el-icon>
                        <span class="value">{{ scope.row.order.receiverName || '-' }}</span>
                      </div>
                      <div class="popover-item">
                        <el-icon :size="16">
                          <PhoneFilled />
                        </el-icon>
                        <span class="value">{{ scope.row.order.receiverPhone || '-' }}</span>
                      </div>
                      <div class="popover-item">
                        <el-icon :size="16">
                          <HomeFilled />
                        </el-icon>
                        <div class="valueList">
                          <span>
                            {{
                              `${scope.row.order.receiverAddressDetail1 ?? ''}
                            ${scope.row.order.receiverAddressDetail2 ?? ''}
                            ${scope.row.order.receiverAddressDetail3 ?? ''}`.trim() || '-'
                            }}
                          </span>
                          <span>
                            {{
                              `${scope.row.order.receiverAddressStreet ?? ''}
                            ${scope.row.order.receiverAddressCity ?? ''}`.trim() || '-'
                            }}
                          </span>
                          <span>
                            {{
                              `${scope.row.order.receiverAddressState ?? ''}
                            ${scope.row.order.receiverAddressPostCode ?? ''}
                            ${scope.row.order.receiverAddressCountry ?? ''}`.trim() || '-'
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-popover>
                <div>
                  <el-icon :size="14">
                    <Van />
                  </el-icon>
                  <span class="text-ellipsis" style="flex-shrink: 0">指定物流：</span>
                  <span class="text-ellipsis">
                    {{ scope.row.order.buyerChooseLogistics || '-' }}
                  </span>
                </div>
                <div>
                  <span class="text-ellipsis" style="flex-shrink: 0">跟踪号：</span>
                  <span class="text-ellipsis">{{ goods.trackingNumber || '-' }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧：订单时间信息（固定） -->
          <div class="table-item-detail">
            <span class="text-ellipsis">订购时间：{{ scope.row.order.orderingTime || '-' }}</span>
            <span class="text-ellipsis">
              付款时间（北京）：{{ scope.row.order.paymentTime || '-' }}
            </span>
            <span class="text-ellipsis">
              发货时间（北京）：{{ scope.row.order.orderDeliveryTime || '-' }}
            </span>

            <span class="text-ellipsis">
              订单付款状态：{{ scope.row.order.financialStatusName || '-' }}
            </span>
            <span class="text-ellipsis">
              订单发货状态：{{ scope.row.order.fulfillmentStatusName || '-' }}
            </span>
            <span class="text-ellipsis">[ {{ scope.row.order.pushStatusName || '-' }} ]</span>
          </div>
          <!-- 右侧：操作按钮（固定） -->
          <div class="table-item-operation">
            <el-button
              type="primary"
              size="small"
              @click="hanleClickToDetail(scope.row)"
              v-permission="'salesOrderManagementDetail'"
            >
              查看详情
            </el-button>
            <!-- <el-button
              type="primary"
              size="small"
              @click="handleClickToEditLocation(scope.row)"
              style="margin-top: 10px"
            >
              手动修改收件人信息
            </el-button> -->
          </div>
        </div>
        <div class="table-footer">
          <div class="table-footer-left">
            <el-popover placement="top" :width="400" popper-class="salesorder-info-popper">
              <template #reference>
                <div class="table-footer-item">
                  <el-icon :size="16">
                    <Avatar />
                  </el-icon>
                  <span class="text-ellipsis">{{ scope.row.order.buyerAccountName || '-' }}</span>
                  <span class="text-ellipsis">({{ scope.row.order.buyerAccountId || '-' }})</span>
                  <el-icon :size="14" class="arrow-icon">
                    <ArrowDown />
                  </el-icon>
                </div>
              </template>
              <div class="salesorder-info-popover">
                <div class="popover-title" style="flex-shrink: 0">买家信息</div>
                <div class="popover-content">
                  <div class="popover-item">
                    <el-icon :size="16">
                      <Avatar />
                    </el-icon>
                    <span class="value">
                      {{
                        `${scope.row.order.buyerAccountName ?? ''} ${
                          scope.row.order.buyerAccountId ?? ''
                        }`.trim() || '-'
                      }}
                    </span>
                  </div>
                  <div class="popover-item">
                    <el-icon :size="16" style="flex-shrink: 0">
                      <PhoneFilled />
                    </el-icon>
                    <span class="value">{{ scope.row.order.buyerAccountEmail || '-' }}</span>
                  </div>
                  <div class="popover-item">
                    <el-icon :size="16" style="flex-shrink: 0">
                      <EditPen />
                    </el-icon>
                    <span class="value">{{ scope.row.order.buyerRemark || '-' }}</span>
                  </div>
                </div>
              </div>
            </el-popover>
            <el-divider direction="vertical" />
            <div class="table-footer-item">
              <span style="flex-shrink: 0">买家备注:</span>
              <OverflowTooltip :content="scope.row.order.buyerRemark || '-'" :line="1" />
            </div>
          </div>
          <div class="table-footer-right">
            <div class="table-footer-item">
              <span class="text-ellipsis">订单标签：{{ scope.row.order.platformOrderTags }}</span>
            </div>
            <div class="table-footer-item">
              <span style="flex-shrink: 0">客服备注：</span>
              <OverflowTooltip :content="scope.row.order.customerRemark || '-'" :line="1" />
              <i
                ref="remarkIconRef"
                class="iconfont icon-bianji"
                @click.stop="handleOpenRemark($event, scope.row, 'customerRemark')"
              ></i>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 全局唯一的备注弹窗实例（单例模式） -->
  <RemarkPopover ref="remarkPopoverRef" @confirm="handleRemarkConfirm" :title="title" />
</template>
<script setup lang="ts">
  import wordBox from './wordBox.vue';
  import { useRouter } from 'vue-router';
  import { ShopifyOrderDetailResp } from '@/api/oms/data-contracts';
  import { ElMessage } from 'element-plus';
  import { Avatar, ArrowDown } from '@element-plus/icons-vue';
  import RemarkPopover from './remarkPopover.vue';
  import { ref } from 'vue';
  import { omsApi } from '@/api';
  import { openWindow } from '@/utils';
  import ShopifyLabelList from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/shopifyLabelList.vue';

  const repArr: any = [{ labelCode: '1', labelName: 'Shopify-中风险订单', warn: true }];
  const repArr2: any = [{ labelCode: '1', labelName: 'Shopify-高风险订单', warn: true }];
  interface Props {
    data: ShopifyOrderDetailResp[];
    loading: boolean;
  }

  const router = useRouter();
  const props = defineProps<Props>();
  const title = ref('客服备注');
  // 定义 emit 事件
  const emit = defineEmits<{
    editLocation: [row: ShopifyOrderDetailResp];
    refund: [rows: ShopifyOrderDetailResp[], callback?: () => void];
    pullOrder: [];
    refresh: [];
    export: [rows: ShopifyOrderDetailResp[], callback?: () => void];
  }>();

  const selectedRows = ref<ShopifyOrderDetailResp[]>([]);
  const exportLoading = ref(false);
  const refundLoading = ref(false);

  const handleSelectionChange = (rows: ShopifyOrderDetailResp[]) => {
    selectedRows.value = rows;
  };

  const hanleClickToDetail = (row: ShopifyOrderDetailResp) => {
    // 跳转到详情页
    router.push({
      name: 'salesOrderManagementDetail',
      query: {
        orderCode: row.order?.orderCode,
        shopName: row.order?.shopName,
      },
    });
  };

  const handleClickToProductDetail = (url: string) => {
    if (!url) return;
    openWindow(url);
  };

  // 触发父组件事件
  const handleClickToRefund = () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请先勾选数据');
      return;
    }
    refundLoading.value = true;
    emit('refund', selectedRows.value, () => {
      refundLoading.value = false;
    });
  };

  const handleClickToPull = () => {
    emit('pullOrder');
  };
  //导出按钮
  const handleClickToExport = () => {
    // if (selectedRows.value.length === 0) {
    //   ElMessage.warning('请先勾选数据');
    //   return;
    // }
    exportLoading.value = true;
    emit('export', selectedRows.value, () => {
      exportLoading.value = false;
    });
  };
  const handleClickToEditLocation = (row?: ShopifyOrderDetailResp) => {
    // 支持从表头按钮（批量）或单行按钮触发
    if (row) {
      emit('editLocation', row);
    } else if (selectedRows.value.length > 0) {
      emit('editLocation', selectedRows.value[0]);
    }
  };

  // 单例备注弹窗引用
  const remarkPopoverRef = ref<InstanceType<typeof RemarkPopover> | null>(null);

  /**
   * 打开备注弹窗
   * @param {Event} event - 点击事件
   * @param {Object} orderRow - 订单数据
   */
  const handleOpenRemark = (event, orderRow, typeCode, orderCode = '', shopForGoods?: string) => {
    const triggerElement = event.currentTarget;
    title.value = typeCode === 'goodsRemark' ? '商品备注' : '客服备注';
    let data: {
      orderCode: string;
      lineItemId: string;
      typeCode: string;
      shop?: string;
    } = {
      orderCode: typeCode === 'goodsRemark' ? orderCode : orderRow.order.orderCode,
      lineItemId: typeCode === 'goodsRemark' ? orderRow.lineItemId : '',
      typeCode: typeCode,
    };
    if (typeCode === 'goodsRemark') {
      data.shop = shopForGoods;
    } else if (typeCode === 'customerRemark') {
      data.shop = orderRow.order?.shopName;
    }

    let contentData =
      (typeCode === 'goodsRemark' ? orderRow.remark : orderRow.order.customerRemark) || '';
    remarkPopoverRef.value?.open(triggerElement, data, contentData);
  };

  /**
   * 确认保存备注
   * @param {Object} payload - { remark: string, rowData: { goods, order } }
   */
  const handleRemarkConfirm = async ({ remark, extensionData }) => {
    const { typeCode, lineItemId, orderCode } = extensionData;
    if (typeCode === 'goodsRemark') {
      await omsApi.omsShopifyOrderEditItemRemark({
        lineItemId,
        orderCode,
        remark: remark,
        shop: extensionData.shop,
      });
    } else if (typeCode === 'customerRemark') {
      await omsApi.omsShopifyOrderEditRemark({
        orderCode,
        remark: remark,
        shop: extensionData.shop,
      });
    }

    emit('refresh');
    ElMessage.success('备注保存成功');
  };
</script>
<style lang="scss" scoped>
  :deep(.list-container) {
    background-color: #eff2f5;
  }

  /* 每行之间有间距 */
  :deep(.el-table__body tr) {
    background-color: #fff;
    /* 设置行背景色 */
    /* 通过上下 margin 模拟间距，但 tr 不支持 margin，需要用其他方式 */
  }

  /* 方案：给每个 td 添加 border 来模拟间距 */
  :deep(.el-table__body tr td) {
    border-top: 8px solid #eff2f5;
    /* 上间距，颜色是间距背景色 */
    border-bottom: 8px solid #eff2f5;
    /* 下间距 */
    background-color: #fff;
    /* 单元格背景色 */
  }

  /* 第一行不需要上边距 */
  :deep(.el-table__body tr:first-child td) {
    border-top: 0;
  }

  /* 移除默认的边框 */
  :deep(.el-table) {
    border: none;
  }

  :deep(.el-table__inner-wrapper::before) {
    height: 0;
    /* 移除默认的上边框线 */
  }

  :deep(.el-table td.el-table__cell) {
    border-bottom: none;
    /* 移除默认的下边框 */
  }

  :deep(.el-table__header-wrapper) {
    background-color: #ffffff;
    position: relative;

    // 使用伪元素创建视觉间隙
    &::after {
      content: '';
      display: block;
      height: 15px; // 间隙高度
      background-color: #eff2f5; // 与页面背景同色
    }
  }

  :deep(.el-table__row) {
    margin-bottom: 10px;

    .el-table-column--selection {
      vertical-align: top;
      padding-left: 0;
      padding-right: 0;

      .cell {
        height: 55px;
        padding: 15px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eff2f5;
      }
    }
  }

  :deep(.el-table__body) {
    td.el-table__cell {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .table-header {
    font-size: 12px;
    display: flex;
    height: 55px;
    align-items: center;
    padding: 15px 10px 15px 0;
    border-bottom: 1px solid #eff2f5;
    justify-content: space-between;

    &-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &-box {
      height: 100%;
      padding-left: 10px;
      padding-right: 10px;
      min-width: 100px;
      max-width: 250px;
      display: flex;
      align-items: center;
    }

    &-status {
      padding-left: 10px;
    }
  }

  .table-item {
    font-size: 12px;
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr 300px 170px;
    gap: 10px;

    &-goods-list {
      display: flex;
      flex-direction: column;
    }

    &-goods {
      display: grid;
      grid-template-columns: 100px 2fr 1fr 1fr;
      gap: 10px;
      padding: 10px 0;

      &.goods-divider {
        border-top: 1px dashed #e5e5e5;
        margin-top: 5px;
        padding-top: 5px;
      }

      &__info {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .inline-item {
          display: flex;
          align-items: center;
          gap: 2px;
        }
      }

      &__price {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      &__logistics {
        display: flex;
        flex-direction: column;
        gap: 2px;

        div {
          display: flex;
          align-items: center;
          gap: 2px;
        }
      }
    }

    &-detail {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 10px;
    }

    &-operation {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 10px;
    }
  }

  .table {
    font-size: 12px;

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-top: 1px solid #eff2f5;

      &-left {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 400px;

        .table-footer-item {
          max-width: 300px;
        }
      }

      &-right {
        display: flex;
        align-items: center;
        gap: 20px;
        width: 500px;
        flex-shrink: 0;
        min-width: 400px;
      }

      &-item {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 2px;

        .arrow-icon {
          cursor: pointer;
          color: #909399;
          transition: transform 0.3s;

          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }

  .label {
    font-size: 12px;
    color: #999999;
  }

  .icon-bianji {
    margin-left: 4px;
    font-size: 12px;
    cursor: pointer;
    color: #999999;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .label-text {
    min-width: 30px;
    flex-shrink: 0;
  }

  .remark-box {
    display: flex;
    align-items: flex-start;
    gap: 4px;
  }

  // 通用文本省略样式
  .text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    display: inline-block;
    vertical-align: middle;
  }
</style>

<!-- 买家信息 popover 全局样式（非 scoped，用于 el-popover） -->
<style lang="scss">
  .salesorder-info-popper {
    .salesorder-info-popover {
      padding: 6px 10px;
      max-width: 500px;

      .popover-title {
        font-size: 13px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #ebeef5;
      }

      .popover-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .popover-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 12px;
        line-height: 1.5;

        .label {
          color: #909399;
          flex-shrink: 0;
          min-width: 70px;
        }

        .value {
          color: #606266;
          flex: 1;
          word-break: break-all;
        }

        .valueList {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
      }
    }
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background-color: #f2f3f5;
  }
</style>
