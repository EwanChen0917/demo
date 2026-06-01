<template>
  <el-form :model="form" ref="formRef" label-width="150px">
    <div class="detailwrapper-header">
      <h3>平台订单编号：{{ form.order?.orderCode || '-' }}</h3>
      <WordBox style="margin-left: 10px">{{ form.order?.platformOrderTags || '-' }}</WordBox>
    </div>
    <div class="detailwrapper-body">
      <div class="detailwrapper-left">
        <div class="detailwrapper-title">
          <span>基本信息</span>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="平台">shopify</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国家">
              <span class="text-ellipsis">{{ form.order?.receiverAddressCountry || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺">
              <span class="text-ellipsis">{{ form.order?.shopName || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单编号">
              {{ form.order?.orderCode || '-' }}
              <Copy :content="form.order?.orderCode + '' || '-'" v-if="form.order?.orderCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态">
              <span class="text-ellipsis">{{ form.order?.orderFulfillmentStatusName || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订购时间（北京）">
              <span class="text-ellipsis">{{ form.order?.orderingTime || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="付款时间（北京）">
              <span class="text-ellipsis">{{ form.order?.paymentTime || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货时间（北京）">
              <span class="text-ellipsis">{{ form.order?.orderDeliveryTime || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单付款状态">
              <span class="text-ellipsis">{{ form.order?.financialStatusName || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单发货状态">
              <span class="text-ellipsis">{{ form.order?.fulfillmentStatusName || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="detailwrapper-title">
          <span>买家信息</span>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="买家姓名">
              <span class="text-ellipsis">
                {{ form?.order?.buyerAccountName || '-'
                }}{{ form?.order?.buyerAccountId ? `(${form?.order?.buyerAccountId})` : '' }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="买家邮箱">
              <span>{{ form.order?.buyerAccountEmail || '-' }}</span>
              <Copy
                :content="form.order?.buyerAccountEmail + '' || '-'"
                v-if="form.order?.buyerAccountEmail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="买家税号">
              <span class="text-ellipsis">{{ form.order?.buyerTaxNumber || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="买家留言">
              <OverflowTooltip :content="form.order?.buyerRemark || '-'" :line="1" />
              <!-- <el-tooltip
                :content="form.order?.buyerRemark || '-'"
                placement="top"
                :disabled="!form.order?.buyerRemark || (form.order?.buyerRemark?.length || 0) < 30"
              >
                <span class="text-ellipsis">{{ form.order?.buyerRemark || '-' }}</span>
              </el-tooltip> -->
            </el-form-item>
          </el-col>
        </el-row>
        <div class="detailwrapper-title">
          <span>收件人信息</span>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收件人">
              <span class="text-ellipsis">{{ form.order?.receiverName || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件电话">
              <span class="text-ellipsis">{{ form.order?.receiverPhone || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件手机号">
              <span class="text-ellipsis">{{ form.order?.receiverMobilePhone || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="地址">
              <span class="text-ellipsis">
                {{
                  `${form.order?.receiverAddressDetail1 ?? ''}
                ${form.order?.receiverAddressDetail2 ?? ''}
                ${form.order?.receiverAddressDetail3 ?? ''}`.trim() || '-'
                }}
              </span>
              <span class="text-ellipsis">
                {{
                  `${form.order?.receiverAddressStreet ?? ''}
                ${form.order?.receiverAddressCity ?? ''}`.trim() || '-'
                }}
              </span>
              <span class="text-ellipsis">
                {{
                  `${form.order?.receiverAddressState ?? ''}
                ${form.order?.receiverAddressPostCode ?? ''}
                ${form.order?.receiverAddressCountry ?? ''}`.trim() || '-'
                }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="detailwrapper-table">
          <!--          <div class="detailwrapper-table-header">
            <div
              class="detailwrapper-table-header__item"
              :class="{ 'detailwrapper-table-header__item&#45;&#45;active': activeTab === 'product' }"
              @click="activeTab = 'product'"
            >
              商品信息
            </div>
            <div
              class="detailwrapper-table-header__item"
              :class="{ 'detailwrapper-table-header__item&#45;&#45;active': activeTab === 'log' }"
              @click="activeTab = 'log'"
            >
              操作日志
            </div>
          </div>-->
          <el-tabs v-model="activeTab">
            <el-tab-pane label="商品信息" name="product">
              <el-table :data="form.itemList" border>
                <el-table-column label="商品信息" width="600">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info">
                      <el-image
                        :src="row.image"
                        class="detailwrapper-table-info__image"
                        fit="cover"
                      >
                        <template #error>
                          <div class="image-placeholder">
                            <el-icon :size="24">
                              <Picture />
                            </el-icon>
                          </div>
                        </template>
                      </el-image>
                      <div class="detailwrapper-table-info__item">
                        <div class="detailwrapper-table-info_item-name">
                          <OverflowTooltip :content="row.platformProductName || '-'" :line="1" />
                        </div>
                        <div class="detailwrapper-table-info__item-id">
                          <span class="text">
                            ITEMID:
                            <span
                              style="color: #0045f0; cursor: pointer"
                              @click="handleClickToProductDetail(row.productLink ?? '')"
                            >
                              {{ row.productId ?? '' }}
                            </span>
                            <!-- <span class="item-id-value">{{ row.productId ?? '' }}</span> -->
                            <Copy :content="row.productId + '' || '-'" v-if="row.productId" />
                          </span>
                          <span class="text">
                            MSKU:
                            <OverflowTooltip :content="row.msku || '-'" :line="1" />
                            <Copy :content="row.msku + '' || '-'" v-if="row.msku" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="产品名称/产品SKU" min-width="200">
                  <template #default="{ row }">
                    <div
                      v-if="!row.itemSkuBeanList || row.itemSkuBeanList.length === 0"
                      class="detailwrapper-table-info__item"
                    >
                      <OverflowTooltip :content="'-'" :line="1" />
                      <OverflowTooltip :content="'-'" :line="1" />
                    </div>
                    <div
                      v-for="(item, index) in row.itemSkuBeanList"
                      :key="item.supplySku"
                      class="detailwrapper-table-info__itemSku"
                    >
                      <div class="sku-item">
                        产品{{ index + 1 }}：
                        <OverflowTooltip :content="item.productName || '-'" :line="1" />
                      </div>
                      <div class="sku-item">
                        产品SKU{{ index + 1 }}：
                        <OverflowTooltip :content="item.supplySku || '-'" :line="1" />
                      </div>
                      <!-- <el-tooltip :content="row.productName" placement="top">
                        <span class="text-ellipsis">{{ row.productName ||'-'}}</span>
                      </el-tooltip>
                      <el-tooltip :content="row.sku" placement="top">
                        <span class="text-ellipsis">{{ row.supplySku || '-'}}</span>
                      </el-tooltip> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="属性">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info__item">
                      <span>{{ row.productProperty || '-' }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="商品单价">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info__item">
                      <span>{{ `${row.currency} ${row.productPrice}` }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="订购数量">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info__item">
                      <span>{{ `${row.buyQuantity ?? '-'} ` }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="取消状态">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info__item">
                      <span></span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="商品总价">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info__item">
                      <span>
                        {{ `${row.currency} ${(row.buyQuantity || 0) * (row.productPrice || 0)}` }}
                      </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info__item remark-box">
                      <OverflowTooltip :content="row.remark ?? '-'" :line="1" />
                      <i
                        ref="remarkIconRef"
                        class="iconfont icon-bianji"
                        @click.stop="
                          handleOpenRemark(
                            $event,
                            row,
                            'goodsRemark',
                            form.order?.orderCode,
                            form.order?.shopName,
                          )
                        "
                      ></i>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="履约方式">
                  <template #default="{ row }">
                    <div class="detailwrapper-table-info__item">
                      <span>{{ row.fulfillmentType }}</span>
                    </div>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="log">
              <el-table :data="form.operationLogBeans" border>
                <el-table-column label="操作时间" prop="createTime" min-width="100" />
                <el-table-column label="操作类型" prop="operationTypeDesc" min-width="100" />
                <el-table-column label="操作用户" prop="operator" min-width="100" />
                <el-table-column label="操作内容" prop="itemContent" min-width="200" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="detailwrapper-right">
        <div class="detailwrapper-title">
          <span>最新配送信息</span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">买家选择物流：</span>
          <span class="detailwrapper-list-item__value">
            {{ form.order?.buyerChooseLogistics || '--' }}
          </span>
        </div>
        <div class="detailwrapper-title">
          <span>费用信息</span>
          <el-popover
            placement="top"
            :width="400"
            trigger="hover"
            popper-class="salesorder-info-popper"
          >
            <template #reference>
              <el-icon :size="14" style="margin-left: 5px; cursor: pointer">
                <QuestionFilled />
              </el-icon>
            </template>
            <div class="salesorder-info-popover">
              <div class="popover-content">
                <div class="popover-item">
                  <span>
                    买家实付: 订单售价(不含税)-订单优惠金额+订单税费＋订单运费＋订单其他费用
                  </span>
                </div>
                <div class="popover-item">
                  <span>
                    订单总金额：
                    订单商品的优惠后的销售金额合计，不含税、佣金、运费、其他费用，减去优惠
                  </span>
                </div>
                <div class="popover-item">
                  <span>
                    订单售价(不含税)： 订单商品的优惠前销售金额合计，不含税、佣金、运费、其他费用
                  </span>
                </div>
                <div class="popover-item">
                  <span>订单运费: 买家支付运费金额合计</span>
                </div>
                <div class="popover-item">
                  <span>订单税费： 买家支付的订单税费金额合计</span>
                </div>
                <div class="popover-item">
                  <span>订单优惠金额: 买家获得的订单优惠金额合计</span>
                </div>
                <div class="popover-item">
                  <span>订单其他费用： 买家支付的订单其他费用金额合计，例如小费、搬运费等</span>
                </div>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">买家实付：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.currency || '-'} ${form.order?.buyerPayAmount ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">商品售价（不含税）：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.currency || '-'} ${form.order?.totalExcludingTaxAmount ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">订单总额：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.currency || '-'} ${form.order?.totalAmount ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">买家运费：</span>
          <span class="detailwrapper-list-item__value">
            {{
              `${form.order?.currency || '-'}
              ${form.order?.buyerPayShipAmount ?? '-'}`
            }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">订单税费：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.currency || '-'} ${form.order?.totalTaxAmount ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">订单其他费用：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.currency || '-'} ${form.order?.otherAmount ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">退款金额：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.currency || '-'} ${form.order?.refundedTotalAmount ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">优惠金额：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.currency || '-'} ${form.order?.discountAmount ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label">优惠券：</span>
          <span class="detailwrapper-list-item__value">
            {{ `${form.order?.coupons ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label bold">平台佣金：</span>
          <span class="detailwrapper-list-item__value bold">
            {{
              `${form.order?.currency || '-'}
              ${form.order?.platformCommission ?? '-'}`
            }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label bold">交易手续费：</span>
          <span class="detailwrapper-list-item__value bold">
            {{ `${form.order?.currency || '-'} ${form.order?.transactionFee ?? '-'}` }}
          </span>
        </div>
        <div class="detailwrapper-list-item">
          <span class="detailwrapper-list-item__label bold">倍率：</span>
          <span class="detailwrapper-list-item__value bold">{{ form.order?.rate ?? '--' }}</span>
        </div>
      </div>
    </div>
  </el-form>
  <div class="detailwrapper-footer">
    <div class="detailwrapper-remark"></div>
    <el-button @click="handleClose">关闭</el-button>
  </div>
  <!-- 全局唯一的备注弹窗实例（单例模式） -->
  <RemarkPopover ref="remarkPopoverRef" @confirm="handleRemarkConfirm" :title="title" />
</template>

<script setup lang="ts" name="salesOrderManagementDetail">
  import { omsApi } from '@/api';
  import { useTabs } from '@/hooks/tabs';
  import { Picture } from '@element-plus/icons-vue';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import RemarkPopover from './components/remarkPopover.vue';
  import WordBox from './components/wordBox.vue';

  const route = useRoute();
  const { closeTabAndRefresh } = useTabs();
  const form = ref<any>({});
  const activeTab = ref('product');
  const title = ref('商品备注');

  const getDetailData = async (id: string, shop: string) => {
    const res = await omsApi.omsShopifyOrderDetail({
      orderCode: id,
      shop,
    });
    form.value = res;
    console.log(`form`, form);
  };
  const handleClose = () => {
    closeTabAndRefresh('salesOrderManagementDetail');
  };
  const handleClickToProductDetail = (url: string) => {
    if (!url) return;
    openWindow(url);
  };

  // 单例备注弹窗引用
  const remarkPopoverRef = ref<InstanceType<typeof RemarkPopover> | null>(null);

  /**
   * 打开备注弹窗
   * @param {Event} event - 点击事件
   * @param {Object} row - 商品数据
   * @param {string} typeCode - 备注类型
   * @param {string} orderCode - 订单编号
   */
  const handleOpenRemark = (event, row, typeCode, orderCode = '', shopForGoods?: string) => {
    const triggerElement = event.currentTarget;
    title.value = typeCode === 'goodsRemark' ? '商品备注' : '客服备注';
    const data: {
      orderCode: string | undefined;
      lineItemId: string;
      typeCode: string;
      shop?: string;
    } = {
      orderCode: typeCode === 'goodsRemark' ? orderCode : form.value.order?.orderCode,
      lineItemId: typeCode === 'goodsRemark' ? row.lineItemId : '',
      typeCode,
    };
    if (typeCode === 'goodsRemark') {
      data.shop = shopForGoods;
    } else if (typeCode === 'customerRemark') {
      data.shop = form.value.order?.shopName;
    }

    const contentData =
      (typeCode === 'goodsRemark' ? row.remark : form.value.order?.customerRemark) || '';
    remarkPopoverRef.value?.open(triggerElement, data, contentData);
  };

  /**
   * 确认保存备注
   * @param {Object} payload - { remark: string, extensionData: { typeCode, lineItemId, orderCode } }
   */
  const handleRemarkConfirm = async ({ remark, extensionData }) => {
    const { typeCode, lineItemId, orderCode } = extensionData;
    if (typeCode === 'goodsRemark') {
      await omsApi.omsShopifyOrderEditItemRemark({
        lineItemId,
        orderCode,
        remark,
        shop: extensionData.shop,
      });
    } else if (typeCode === 'customerRemark') {
      await omsApi.omsShopifyOrderEditRemark({
        orderCode,
        remark,
        shop: extensionData.shop,
      });
    }

    getDetailData((route.query.orderCode as string) || '', (route.query.shopName as string) || '');
    ElMessage.success('备注保存成功');
  };

  onMounted(() => {
    getDetailData((route.query.orderCode as string) || '', (route.query.shopName as string) || '');
  });
</script>

<style lang="scss" scoped>
  .bold {
    font-weight: bold;
  }
  .sku-item {
    display: flex;
    align-items: center;
    :deep(.content) {
      flex: 1;
    }
  }
  .detailwrapper-table-info__itemSku {
    display: flex;
    flex-direction: column;
  }
  .detailwrapper {
    &-header {
      position: sticky;
      top: 0px;
      left: 0;
      width: 100%;
      height: 56px;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 0 20px;
      z-index: 99;
    }

    &-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 56px;
      border-top: 1px solid #e5e5e5;
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      background-color: #f3f3f3;
      z-index: 99;
    }

    &-body {
      width: 100%;
      padding: 0 20px 106px 20px;
      display: grid;
      margin-top: 0px;
      grid-template-columns: 4fr 1fr;
      flex-shrink: 0;
      background: #ffffff;
      // margin-bottom: 106px;
    }

    &-title {
      display: block;
      position: relative;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding-left: 16px;

      // 左侧装饰竖线
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 18px;
        background-color: var(--el-color-primary);
        border-radius: 2px;
      }
    }

    &-left {
      margin-right: 20px;
      min-width: 0px;
    }

    &-list {
      &-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
        min-height: 32px;
        margin-bottom: 10px;

        &__label {
          width: 130px;
        }

        &__value {
          display: flex;
          justify-content: flex-end;
          flex: 1;
        }
      }
    }

    &-table {
      width: 100%;

      &-header {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;

        &__item {
          width: 100px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          cursor: pointer;
        }

        &__item--active {
          border: 1px solid #409eff;
        }

        &__item:hover {
          border: 1px solid #409eff;
        }
      }

      &-info {
        display: flex;
        flex-direction: row;

        &__image {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          object-fit: cover;
          margin-right: 10px;

          .image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f7fa;
            color: #c0c4cc;
          }
        }

        &__item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: flex-start;

          &-id {
            display: flex;
            gap: 10px;
            flex-direction: row;

            .item-id-text,
            .text {
              display: flex;
              flex: 1;
            }

            .item-id-value {
              color: #0045f0;
            }
          }
        }
      }
    }
  }

  .text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    /* 改用 width 而不是 max-width */
    display: block;
    /* 改用 block */
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

  .remark-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  :deep(.el-table) {
    .el-table__cell {
      vertical-align: top;

      .cell {
        display: flex;
        flex-direction: column;
        vertical-align: top;
        gap: 10px;
      }
    }
  }
</style>

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
