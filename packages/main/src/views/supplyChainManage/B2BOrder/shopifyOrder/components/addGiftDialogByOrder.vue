<template>
  <el-dialog
    v-model="visible"
    title="添加赠品"
    width="90%"
    align-center
    destroy-on-close
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <div class="add-gift-dialog">
      <div class="toolbar">
        <el-space :size="12">
          <el-button type="primary" @click="handleAddGift">
            <i class="iconfont icon-zengjia"></i>
            添加赠品
          </el-button>
        </el-space>
      </div>

      <div class="table-container">
        <div v-if="groupedOrders.length === 0" class="table-empty">
          <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
          <div class="text">暂无数据</div>
        </div>
        <div v-else class="order-list">
          <div
            v-for="(orderGroup, orderIndex) in groupedOrders"
            :key="orderGroup.orderInfo.erpCode"
            class="order-item"
          >
            <!-- 订单头部信息 -->
            <div class="order-header">
              <div class="select-row">
                <div class="select-order">
                  <el-radio v-model="selectedOrderErpCode" :label="orderGroup.orderInfo.erpCode" />
                </div>
              </div>
              <div class="header-row">
                <div class="header-item">
                  <span class="label">店铺：</span>
                  <div>
                    <overflow-tooltip
                      :content="orderGroup.orderInfo.shopAccount || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                </div>
                <div class="header-item">
                  <span class="label">平台单号：</span>
                  <div>
                    <overflow-tooltip
                      :content="orderGroup.orderInfo.refNo || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                </div>
                <div class="header-item">
                  <span class="label">订单号：</span>
                  <div>
                    <overflow-tooltip
                      :content="orderGroup.orderInfo.erpCode || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                </div>
                <div class="header-item">
                  <span class="label">收件人：</span>
                  <div>
                    <overflow-tooltip
                      :content="orderGroup.orderInfo.buyerName || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                </div>
                <div class="header-item">
                  <span class="label">收件国家：</span>
                  <div>
                    <overflow-tooltip
                      class="value"
                      :content="orderGroup.orderInfo.buyerCountryDesc || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                </div>
                <div class="header-item">
                  <span class="label">买家备注：</span>
                  <div>
                    <overflow-tooltip
                      :content="orderGroup.orderInfo.buyerRemark || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                </div>
                <div class="header-item big-item">
                  <span class="label">发货仓：</span>
                  <div>
                    <overflow-tooltip
                      :content="orderGroup.orderInfo.warehouseDesc || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 商品列表表头 -->
            <div class="product-table-header">
              <div class="header-col col-image">图片</div>
              <div class="header-col col-info">产品名称/产品SKU</div>
              <div class="header-col col-msku">MSKU</div>
              <div class="header-col col-num">应发量</div>
              <div class="header-col col-price">销售单价</div>
              <div class="header-col col-remark">产品备注</div>

              <div class="header-col col-actions">操作</div>
            </div>

            <!-- 商品列表 -->
            <div class="product-list">
              <div
                v-for="(product, productIndex) in orderGroup.products"
                :key="productIndex"
                class="product-row"
              >
                <div class="product-col col-image">
                  <div class="product-image">
                    <img v-if="product.productImageUrl" :src="product.productImageUrl" alt="" />
                    <img v-else src="@/assets/images/system/empty.png" alt="" />
                    <img
                      v-if="product?.gift === 1"
                      class="giftStock"
                      :src="getImg('giftStock')"
                      alt=""
                    />
                  </div>
                </div>

                <div class="product-col col-info">
                  <div class="product-name">
                    <overflow-tooltip
                      :content="product.productName || '-'"
                      :line="1"
                      :font-size="12"
                    />
                  </div>
                  <div class="product-meta">
                    <span class="meta-item">
                      <span class="meta-label">产品SKU：</span>
                      <span class="meta-value">
                        <overflow-tooltip
                          :content="product.skuCode || '-'"
                          :line="1"
                          :font-size="12"
                        />
                      </span>
                    </span>
                    <span class="meta-item">
                      <span class="meta-label">供应链SKU：</span>
                      <span class="meta-value">
                        <overflow-tooltip
                          :content="product.supplySku || '-'"
                          :line="1"
                          :font-size="12"
                        />
                      </span>
                    </span>
                  </div>
                </div>

                <div class="product-col col-msku">
                  {{ product.sellerSku || '-' }}
                </div>

                <div class="product-col col-num">
                  <el-input-number
                    v-if="!product.isFromOrder"
                    v-model="product.num"
                    :min="1"
                    :max="product.stockQty != null && product.stockQty > 0 ? product.stockQty : 999"
                    :step="1"
                    size="small"
                    controls-position="right"
                  />
                  <span v-else>{{ product.num }}</span>
                </div>

                <div class="product-col col-price">
                  {{ product.price || 0 }}
                </div>

                <div class="product-col col-remark">
                  <span>-</span>
                </div>

                <div class="product-col col-actions">
                  <el-button
                    v-if="!product.isFromOrder"
                    type="danger"
                    link
                    size="small"
                    @click="handleDeleteGift(orderIndex, productIndex)"
                  >
                    移除
                  </el-button>
                  <span v-else>-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 产品选择弹窗 -->
  <giftSelectDialog ref="giftSelectDialogRef" @success="handleProductSelectSuccess" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { ElMessage } from 'element-plus';
  import type { SupplySkuListBean } from '@/api/oms/data-contracts';
  import giftSelectDialog from './giftSelectDialog.vue';

  interface GiftItem {
    productImageUrl?: string;
    productName?: string;
    skuCode?: string;
    supplySku?: string;
    sellerSku?: string;
    stockQty?: number;
    num: number;
    price: number;
    remark?: string;
    warehouseCode?: string;
    erpCode?: string;
    refNo?: string;
    isFromOrder?: boolean;
    _originalProduct?: SupplySkuListBean;
    [key: string]: any;
  }

  interface OrderItem {
    erpCode?: string;
    refNo?: string;
    shopAccount?: string;
    buyerName?: string;
    buyerCountryDesc?: string;
    buyerRemark?: string;
    itemBeanList?: any[];
    [key: string]: any;
  }

  interface OrderGroup {
    orderInfo: OrderItem;
    products: GiftItem[];
  }

  const emit = defineEmits<{
    (event: 'success', giftList: GiftItem[]): void;
  }>();
  const props = defineProps<{
    onSubmit: (data: any) => Promise<void>;
  }>();
  const visible = ref(false);
  const confirmLoading = ref(false);
  const giftSelectDialogRef = ref();
  // 元数据，储存原有的订单一维数组。其他数据以erpcode进行关联。
  const orderList = ref<OrderItem[]>([]);
  // 赠品数组，用于储存所有的订单赠品数据
  const giftList = ref<GiftItem[]>([]);

  const selectedSkuType = ref<string>('');
  const searchKeyword = ref<string>('');
  const selectedOrderErpCode = ref<string>('');

  // 基于 erpCode 的订单索引，避免频繁线性查找,提升性能。将 orderList 转换为 Map 结构，key 是 erpCode，value 是订单对象
  const orderMapByErpCode = computed(() => {
    const map = new Map<string, OrderItem>();
    orderList.value.forEach((order) => {
      if (order.erpCode) {
        map.set(order.erpCode, order);
      }
    });
    return map;
  });

  // 当前选中订单的基础信息（包含订单信息和这次新增的赠品）
  const selectedOrderBasicInfo = computed(() => {
    const erpCode = selectedOrderErpCode.value;
    if (!erpCode) return null;
    const order = orderMapByErpCode.value.get(erpCode);
    console.log(`选中订单ERPCode: ${erpCode}`);
    if (!order) return null;

    // 获取当前订单下这次新增的赠品（isFromOrder=false 表示是新增的）
    const newGifts = giftList.value.filter((item) => item.erpCode === erpCode && !item.isFromOrder);

    return {
      erpCode: order.erpCode || '',
      warehouseCode: (order as any).warehouseCode || '',
      newGifts,
      shop: order.shopAccount || '',
      site: order.site || '',
      order: order,
    };
  });

  // 按订单分组
  const groupedOrders = computed<OrderGroup[]>(() => {
    const groups: Record<string, OrderGroup> = {};

    giftList.value.forEach((product) => {
      const erpCode = product.erpCode || 'unknown';
      if (!groups[erpCode]) {
        const orderInfo =
          (erpCode !== 'unknown' ? orderMapByErpCode.value.get(erpCode) : undefined) || {};
        groups[erpCode] = {
          orderInfo: orderInfo as OrderItem,
          products: [],
        };
      }
      groups[erpCode].products.push(product);
    });

    return Object.values(groups);
  });

  function handleAddGift() {
    if (!selectedOrderBasicInfo.value) {
      ElMessage.warning('请先选择一个订单');
      return;
    }
    // 获取当前订单下已添加的赠品，用于回显
    const selectedProducts = selectedOrderBasicInfo.value.newGifts
      // eslint-disable-next-line no-underscore-dangle
      .filter((item) => item._originalProduct)
      // eslint-disable-next-line no-underscore-dangle
      .map((item) => item._originalProduct as SupplySkuListBean);

    // 打开产品选择弹窗：第一个参数是已选产品（用于回显），第二个参数是仓库代码（用于筛选）
    giftSelectDialogRef.value?.open(
      selectedProducts,
      selectedOrderBasicInfo.value.warehouseCode,
      selectedOrderBasicInfo.value.shop,
      selectedOrderBasicInfo.value.site,
      selectedOrderBasicInfo.value.order
    );
  }

  function handleProductSelectSuccess(products: SupplySkuListBean[]) {
    if (!selectedOrderBasicInfo.value) {
      ElMessage.warning('请先选择一个订单');
      return;
    }
    const { erpCode } = selectedOrderBasicInfo.value;
    const { warehouseCode } = selectedOrderBasicInfo.value;
    // 当前订单下已有的新增赠品
    const currentOrderGifts = selectedOrderBasicInfo.value.newGifts;
    // 新选中的产品 supplySku 集合
    const newSelectedSkus = new Set(products.map((p) => p.supplySku));
    // 找出被取消勾选的赠品（之前有，现在没有）
    const toRemove = currentOrderGifts.filter((gift) => !newSelectedSkus.has(gift.supplySku));
    // 从 giftList 中删除被取消勾选的赠品
    toRemove.forEach((gift) => {
      const index = giftList.value.findIndex(
        (item) => item.erpCode === erpCode && item.supplySku === gift.supplySku && !item.isFromOrder
      );
      if (index !== -1) {
        giftList.value.splice(index, 1);
      }
    });

    // 已存在的赠品 supplySku 集合（用于去重）
    const existingSkus = new Set(currentOrderGifts.map((g) => g.supplySku));

    // 添加新选中的赠品（去重）
    let addedCount = 0;
    products.forEach((product) => {
      if (existingSkus.has(product.supplySku)) {
        return;
      }

      const stockQty = product.availableInventory || 0;
      const order = orderMapByErpCode.value.get(erpCode);

      giftList.value.push({
        productImageUrl: product.productImageUrl,
        productName: product.productTitle,
        skuCode: product.skuCode,
        supplySku: product.supplySku,
        sellerSku: product.sellerSku || '',
        stockQty,
        num: stockQty === 0 ? 0 : 1,
        price: 0,
        remark: '',
        warehouseCode,
        erpCode,
        refNo: order?.refNo,
        isFromOrder: false,
        _originalProduct: product,
      });
      addedCount += 1;
    });

    // 提示信息
    if (toRemove.length > 0) {
      ElMessage.success(`移除 ${toRemove.length} 个赠品`);
    }
    if (addedCount > 0) {
      ElMessage.success(`添加 ${addedCount} 个赠品`);
    }
    if (toRemove.length === 0 && addedCount === 0) {
      ElMessage.info('所选产品无变化');
    }
  }

  function handleDeleteGift(orderIndex: number, productIndex: number) {
    const orderGroup = groupedOrders.value[orderIndex];
    const product = orderGroup.products[productIndex];

    if (product.isFromOrder) {
      ElMessage.warning('原订单产品不可移除');
      return;
    }

    // 从 giftList 中删除
    const globalIndex = giftList.value.findIndex(
      (p) =>
        p.erpCode === product.erpCode &&
        p.skuCode === product.skuCode &&
        p.supplySku === product.supplySku &&
        !p.isFromOrder
    );

    if (globalIndex !== -1) {
      giftList.value.splice(globalIndex, 1);
      ElMessage.success('移除成功');
    }
  }

  // 转换为按订单分组的格式
  function transformToGroupedFormat(gifts: GiftItem[]) {
    const grouped = new Map<
      string,
      {
        erpCode: string;
        itemInfoList: Array<{
          num: number;
          price: number;
          sellerSku: string;
          skuCode: string;
          supplySku: string;
        }>;
      }
    >();

    gifts.forEach((gift) => {
      const erpCode = gift.erpCode || '';

      if (!grouped.has(erpCode)) {
        grouped.set(erpCode, {
          erpCode,
          itemInfoList: [],
        });
      }
      const order = orderMapByErpCode.value.get(erpCode);
      // 提取商品字段
      grouped.get(erpCode)!.itemInfoList.push({
        num: gift.num,
        price: gift.price || 0,
        sellerSku: gift.sellerSku || '',
        skuCode: gift.skuCode || '',
        supplySku: gift.supplySku || '',
        warehouseCode: gift.warehouseCode || '',
        spCode: order?.spCode || '',
        shippingCode: order?.shippingCode || '',
      });
    });

    return Array.from(grouped.values());
  }

  async function handleConfirm() {
    const newGifts = giftList.value.filter((item) => !item.isFromOrder);

    if (newGifts.length === 0) {
      ElMessage.warning('请至少添加一个赠品');
      return;
    }

    // const hasInvalidMsku = newGifts.some((item) => !item.sellerSku);
    // if (hasInvalidMsku) {
    //   ElMessage.warning('请确保所有赠品拥有MSKU');
    //   return;
    // }
    const hasValidGift = newGifts.some((item) => item.num > 0);
    if (!hasValidGift) {
      ElMessage.warning('请确保至少有一个赠品的应发量大于0');
      return;
    }

    // 校验：应发量不能大于库存量，暂时注释
    // const invalidItems = newGifts.filter(
    //   (item) => item.stockQty != null && item.num > item.stockQty
    // );
    // if (invalidItems.length > 0) {
    //   ElMessage.warning('应发量不能大于库存量');
    //   return;
    // }
    confirmLoading.value = true;
    try {
      // 转换为按订单分组的格式
      const result = transformToGroupedFormat(newGifts);
      await props.onSubmit?.(result);
    } finally {
      confirmLoading.value = false;
    }
  }

  function handleClosed() {
    giftList.value = [];
    orderList.value = [];
    selectedSkuType.value = '';
    searchKeyword.value = '';
    selectedOrderErpCode.value = '';
  }

  function open(orders?: OrderItem[]) {
    visible.value = true;
    if (orders && orders.length > 0) {
      orderList.value = orders;
      const allProducts: GiftItem[] = [];
      orders.forEach((order) => {
        if (order.itemBeanList && order.itemBeanList.length > 0) {
          order.itemBeanList.forEach((product) => {
            allProducts.push({
              productImageUrl: product.productImageUrl,
              productName: product.productName,
              skuCode: product.skuCode,
              supplySku: product.supplySku,
              sellerSku: product.sellerSku,
              num: product.numInt || 1,
              price: product.price || 0,
              remark: '',
              warehouseCode: order.warehouseCode || '',
              erpCode: order.erpCode,
              refNo: order.refNo,
              spCode: order.spCode,
              shippingCode: order.shippingCode,
              isFromOrder: true,
              gift: product.gift,
            });
          });
        }
      });

      giftList.value = allProducts;
      // 默认选中第一个订单
      if (orders.length > 0 && orders[0].erpCode) {
        selectedOrderErpCode.value = orders[0].erpCode;
      }
    }
  }
  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };
  function close() {
    visible.value = false;
  }
  defineExpose({
    open,
    close,
  });
</script>

<style scoped lang="scss">
  .add-gift-dialog {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .toolbar {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: #f5f7fa;
      border-radius: 4px;

      .iconfont {
        margin-right: 4px;
      }
    }

    .table-container {
      max-height: 600px;
      overflow-y: auto;

      .table-empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 80px 0;

        .text {
          margin-top: 12px;
          font-size: 14px;
          color: #909399;
        }
      }

      .order-list {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .order-item {
          border: 1px solid #e4e7ed;
          border-radius: 4px;
          overflow: hidden;
          background: #fff;

          .order-header {
            padding: 12px 16px;
            background: #f5f7fa;
            border-bottom: 1px solid #e4e7ed;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .select-row {
              .select-order {
                margin-right: 12px;

                :deep(.el-radio) {
                  .el-radio__label {
                    display: none;
                  }
                }
              }
            }
            .header-row {
              display: flex;
              width: 100%;
              gap: 12px;
              font-size: 12px;
              flex-wrap: nowrap;

              .header-item {
                display: flex;
                align-items: center;
                flex-direction: row;
                height: 18px;

                .label {
                  color: #909399;
                  margin-right: 4px;
                  max-width: 100px;
                  white-space: nowrap;
                }

                .value {
                  color: #606266;
                  font-weight: 500;
                  flex: 1;
                  &.primary {
                    color: #409eff;
                    cursor: pointer;
                  }
                }
              }
            }
          }

          .product-table-header {
            display: flex;
            align-items: center;
            padding: 10px 16px;
            background: #fafafa;
            border-bottom: 1px solid #e4e7ed;
            font-size: 13px;
            font-weight: 500;
            color: #606266;

            .header-col {
              display: flex;
              align-items: flex-start;
              padding: 0 8px;
            }
          }

          .product-list {
            .product-row {
              display: flex;
              align-items: center;
              padding: 12px 16px;
              border-bottom: 1px solid #f0f0f0;
              transition: background-color 0.2s;

              &:hover {
                background-color: #f5f7fa;
              }

              &:last-child {
                border-bottom: none;
              }

              .product-col {
                display: flex;
                align-items: flex-start;
                padding: 0 8px;
                font-size: 13px;
                color: #606266;
              }
            }
          }

          // 列宽定义
          .col-image {
            width: 90px;
            justify-content: center;

            .product-image {
              width: 80px;
              height: 80px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #e4e7ed;
              border-radius: 4px;
              overflow: hidden;
              position: relative;

              img {
                width: 60px;
                height: 60px;
                object-fit: cover;
              }
            }
          }

          .col-info {
            flex: 0 0 400px;
            max-width: 400px;
            flex-direction: column;
            align-items: flex-start;

            .product-name {
              font-size: 13px;
              font-weight: 500;
              color: #303133;
              margin-bottom: 6px;
              word-break: break-all;
              line-height: 1.4;
            }

            .product-meta {
              display: flex;
              flex-direction: column;
              gap: 4px;

              .meta-item {
                font-size: 12px;
                color: #606266;
                display: flex;
                flex-wrap: nowrap;
                .meta-label {
                  color: #909399;
                  flex-shrink: 0;
                  margin-right: 4px;
                }

                .meta-value {
                  color: #606266;
                }
              }
            }
          }

          .col-msku {
            width: 220px;
          }

          .col-num {
            width: 120px;
            justify-content: center;
          }

          .col-price {
            width: 100px;
            justify-content: center;
          }

          .col-remark {
            width: 180px;

            .remark-cell {
              width: 100%;

              .remark-content {
                display: flex;
                align-items: center;
                gap: 6px;
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 4px;
                transition: background-color 0.2s;

                &:hover {
                  background-color: #f0f0f0;

                  .iconfont {
                    opacity: 1;
                  }
                }

                .remark-text {
                  flex: 1;
                  font-size: 12px;
                  color: #606266;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .remark-placeholder {
                  flex: 1;
                  font-size: 12px;
                  color: #c0c4cc;
                }

                .iconfont {
                  font-size: 14px;
                  color: #909399;
                  opacity: 0;
                  transition: opacity 0.2s;
                }
              }

              .remark-editor {
                padding: 8px;

                :deep(.el-textarea__inner) {
                  font-size: 13px;
                }
              }
            }
          }

          .col-warehouse {
            width: 150px;
          }

          .col-actions {
            width: 80px;
            justify-content: center;
          }
        }
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
  .giftStock {
    width: 25px !important;
    height: 25px !important;
    position: absolute;
    top: 0px;
    right: 0px;
  }
  @media (max-width: 1280px) {
    .header-item.big-item {
      max-width: 25%;
    }
  }
</style>
