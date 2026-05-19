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
        <el-button type="primary" @click="handleAddGift">
          <i class="iconfont icon-zengjia"></i>
          添加赠品
        </el-button>
      </div>

      <div class="table-container">
        <el-table :data="giftList" border style="width: 100%" max-height="600">
          <el-table-column label="图片" width="100" align="center">
            <template #default="{ row }">
              <div class="product-image">
                <img v-if="row.productImageUrl" :src="row.productImageUrl" alt="" />
                <img v-else src="@/assets/images/system/empty.png" alt="" />
              </div>
            </template>
          </el-table-column>

          <el-table-column label="产品名称/产品SKU" min-width="300">
            <template #default="{ row }">
              <div class="product-info">
                <div class="product-name">{{ row.productName || '-' }}</div>
                <div class="product-meta">
                  <div class="meta-item">
                    <span class="meta-label">产品SKU：</span>
                    <span class="meta-value">{{ row.skuCode || '-' }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">供应链SKU：</span>
                    <span class="meta-value">{{ row.supplySku || '-' }}</span>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="MSKU" width="220" prop="sellerSku">
            <template #default="{ row }">
              {{ row.sellerSku || '-' }}
            </template>
          </el-table-column>

          <el-table-column label="库存量" width="100" align="center" prop="stockQty">
            <template #default="{ row }">
              {{ row.stockQty || 0 }}
            </template>
          </el-table-column>

          <el-table-column label="应发量" width="160" align="center">
            <template #default="{ row }">
              <el-input-number
                v-model="row.num"
                :min="row.stockQty === 0 ? 0 : 1"
                :max="row.stockQty || 0"
                :step="1"
                :disabled="!row.stockQty || row.stockQty === 0"
                size="small"
                controls-position="right"
              />
            </template>
          </el-table-column>

          <el-table-column label="销售单价" width="100" align="center" prop="price">
            <template #default="{ row }">
              {{ row.price || 0 }}
            </template>
          </el-table-column>

          <el-table-column label="产品备注" width="250">
            <template #default="{ row }">
              <!-- <el-popover placement="bottom" :width="300" trigger="click">
                <template #reference>
                  <div class="remark-content">
                    <span v-if="row.remark" class="remark-text">{{ row.remark }}</span>
                    <span v-else class="remark-placeholder">点击添加备注</span>
                    <i class="iconfont icon-bianji"></i>
                  </div>
                </template>
                <div class="remark-editor">
                  <el-input
                    v-model="row.remark"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入备注"
                    maxlength="200"
                    show-word-limit
                  />
                </div>
              </el-popover> -->
              <span>{{ row.remark || '-' }}</span>
            </template>
          </el-table-column>

          <el-table-column label="发货仓" width="250" prop="warehouseCode">
            <template #default="{ row }">
              {{ row.warehouseCode || '-' }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="80" align="center" fixed="right">
            <template #default="{ $index }">
              <el-button type="danger" link size="small" @click="handleDeleteGift($index)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <SupplyProductSelectDialog
    ref="supplyProductSelectDialogRef"
    @success="handleProductSelectSuccess"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import SupplyProductSelectDialog from '@/components/SupplyProductSelectDialog/index.vue';
  import type { SupplySkuListBean } from '@/api/oms/data-contracts';

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
    _originalProduct?: SupplySkuListBean;
    [key: string]: any;
  }

  const emit = defineEmits<{
    (event: 'success', giftList: GiftItem[]): void;
  }>();

  const visible = ref(false);
  const confirmLoading = ref(false);
  const supplyProductSelectDialogRef = ref();

  const giftList = ref<GiftItem[]>([]);
  const defaultWarehouseCode = ref<string>('');

  function handleAddGift() {
    const selectedProducts = giftList.value
      .filter((item) => item._originalProduct)
      .map((item) => item._originalProduct as SupplySkuListBean);
    supplyProductSelectDialogRef.value?.open(selectedProducts, defaultWarehouseCode.value);
  }

  function handleProductSelectSuccess(products: SupplySkuListBean[]) {
    if (!products || products.length === 0) {
      return;
    }
    const existingSupplySkus = new Set(giftList.value.map((item) => item.supplySku));
    let addedCount = 0;
    products.forEach((product) => {
      if (existingSupplySkus.has(product.supplySku)) {
        return;
      }
      const stockQty = product.availableInventory || 0;
      giftList.value.push({
        productImageUrl: product.productImageUrl,
        productName: product.productTitle,
        skuCode: product.skuCode,
        supplySku: product.supplySku,
        sellerSku: '',
        stockQty,
        num: stockQty === 0 ? 0 : 1,
        price: 0,
        remark: '',
        warehouseCode: defaultWarehouseCode.value || '',
      });
      addedCount += 1;
    });
    if (addedCount > 0) {
      ElMessage.success(`成功添加 ${addedCount} 个赠品`);
    } else {
      ElMessage.info('所选产品已存在');
    }
  }

  function handleDeleteGift(index: number) {
    giftList.value.splice(index, 1);
    ElMessage.success('移除成功');
  }

  function handleConfirm() {
    if (giftList.value.length === 0) {
      ElMessage.warning('请至少添加一个赠品');
      return;
    }

    const hasValidGift = giftList.value.some((item) => item.num > 0);
    if (!hasValidGift) {
      ElMessage.warning('请确保至少有一个赠品的应发量大于0');
      return;
    }

    const invalidItems = giftList.value.filter((item) => item.num > (item.stockQty || 0));

    if (invalidItems.length > 0) {
      ElMessage.warning('应发量不能大于库存量');
      return;
    }

    confirmLoading.value = true;
    try {
      emit('success', giftList.value);
      visible.value = false;
    } finally {
      confirmLoading.value = false;
    }
  }

  function handleClosed() {
    giftList.value = [];
    defaultWarehouseCode.value = '';
  }

  function open(orders?: any[]) {
    visible.value = true;
    if (orders && orders.length > 0) {
      const firstOrder = orders[0];
      if (firstOrder.warehouseCode) {
        defaultWarehouseCode.value = firstOrder.warehouseCode;
      }
    }
  }

  defineExpose({
    open,
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
      .product-image {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .product-info {
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

            .meta-label {
              color: #909399;
            }

            .meta-value {
              color: #606266;
            }
          }
        }
      }

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

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
</style>
