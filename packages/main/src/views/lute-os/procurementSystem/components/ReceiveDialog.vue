<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    width="880px"
    destroy-on-close
    @closed="handleClosed"
  >
    <div class="tip-bar">
      提示：请保证此次输入的数量与实际收货的数量一致，全部填写完成后点击【提交查收】按钮即可完成查收
    </div>
    <div class="toolbar">
      <span>批量操作：</span>
      <el-button type="primary" link @click="handleFillAll">批量填写全部</el-button>
    </div>
    <el-table :data="pagedProducts" border>
      <el-table-column prop="productType" label="采购产品类型" min-width="160" />
      <el-table-column prop="productInfo" label="采购产品信息" min-width="200" />
      <el-table-column prop="purchaseQuantity" label="采购数量" min-width="120">
        <template #default="{ row }">
          {{ formatQuantity(row.purchaseQuantity) }}
        </template>
      </el-table-column>
      <el-table-column prop="enableCheckNumber" label="可查收数量" min-width="120">
        <template #default="{ row }">
          {{ formatQuantity(row.enableCheckNumber) }}
        </template>
      </el-table-column>
      <el-table-column prop="receivedQuantity" label="已查收数量" min-width="120">
        <template #default="{ row }">
          {{ formatQuantity(row.receivedQuantity) }}
        </template>
      </el-table-column>
      <el-table-column label="本次查收数量" min-width="160">
        <template #default="{ row }">
          <el-input
            v-model="row._currentQuantityStr"
            placeholder="请输入查收数量"
            @input="(val) => handleQuantityInput(val, row)"
            @blur="() => handleQuantityBlur(row)"
            style="width: 130px"
          />
          <!-- <div class="pending-text">待验收数量：{{ formatQuantity(getPending(row)) }}</div> -->
        </template>
      </el-table-column>
    </el-table>
    <div v-if="formProducts.length > pageSize" class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        :total="formProducts.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="(page: number) => (currentPage = page)"
      />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          提交查收
        </el-button>
        <el-button @click="visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';

  type ReceiveMode = 'batch' | 'single';

  export interface ReceiveProductItem {
    id: string | number;
    productType: string;
    productInfo: string;
    purchaseQuantity: number;
    receivedQuantity: number;
    enableCheckNumber?: number;
    currentQuantity?: number;
    _currentQuantityStr?: string;
  }

  const props = withDefaults(
    defineProps<{
      mode: ReceiveMode;
      products: ReceiveProductItem[];
      submitLoading?: boolean;
    }>(),
    {
      mode: 'batch',
      products: () => [],
      submitLoading: false,
    }
  );

  const emit = defineEmits<{
    (e: 'submit', payload: { mode: ReceiveMode; products: ReceiveProductItem[] }): void;
  }>();

  const visible = defineModel<boolean>('visible', { default: false });

  const pageSize = 10;
  const currentPage = ref(1);

  const formProducts = ref<ReceiveProductItem[]>([]);

  watch(
    () => props.products,
    () => {
      if (visible.value) {
        initForm();
      }
    },
    { deep: true }
  );

  watch(
    () => props.mode,
    () => {
      if (visible.value) {
        initForm();
      }
    }
  );

  watch(visible, (val) => {
    if (val) {
      initForm();
    }
  });

  watch(
    () => formProducts.value.map((item) => [item.currentQuantity, item.enableCheckNumber]),
    () => {
      formProducts.value.forEach((item) => normalizeCurrent(item));
    },
    { deep: true }
  );

  const dialogTitle = computed(() =>
    props.mode === 'single' ? '采购产品查收' : '批量采购产品查收'
  );

  const pagedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return formProducts.value.slice(start, start + pageSize);
  });

  function initForm() {
    currentPage.value = 1;
    formProducts.value = props.products.map((item) => ({
      ...item,
      currentQuantity: Number(item.currentQuantity ?? 0),
      _currentQuantityStr: formatQuantity(item.currentQuantity ?? 0) ?? '0',
    }));
  }

  const formatQuantity = (val?: number) => {
    if (val === undefined || val === null || Number.isNaN(val)) return '--';
    return Number(val).toString();
  };

  const getPending = (item?: ReceiveProductItem) => {
    if (!item) return 0;
    const pending = Number(item.purchaseQuantity || 0) - Number(item.receivedQuantity || 0);
    return pending > 0 ? pending : 0;
  };

  const getAvailable = (item?: ReceiveProductItem) => {
    if (!item) return 0;
    const enable = Number(item.enableCheckNumber);
    if (Number.isFinite(enable)) {
      return enable > 0 ? enable : 0;
    }
    return getPending(item);
  };

  function normalizeCurrent(item?: ReceiveProductItem) {
    if (!item) return;
    let value = Number(item.currentQuantity ?? 0);
    if (Number.isNaN(value) || value < 0) value = 0;
    const max = getAvailable(item);
    if (value > max) value = max;
    item.currentQuantity = value;
    item._currentQuantityStr = `${value}`;
  }

  const handleQuantityInput = (val: string | number, item: ReceiveProductItem) => {
    const normalized = String(val ?? '').replace(/[^\d]/g, '');
    item._currentQuantityStr = normalized;
    const numeric = Number(normalized);
    item.currentQuantity = Number.isFinite(numeric) ? numeric : 0;
    normalizeCurrent(item);
  };

  const handleQuantityBlur = (item: ReceiveProductItem) => {
    normalizeCurrent(item);
  };

  function handleFillAll() {
    formProducts.value = formProducts.value.map((item) => {
      const available = getAvailable(item);
      return {
        ...item,
        currentQuantity: available,
        _currentQuantityStr: `${available}`,
      };
    });
  }

  function handleSubmit() {
    if (!formProducts.value.length) {
      ElMessage.warning('暂无可查收的产品');
      return;
    }

    emit('submit', {
      mode: props.mode,
      products: formProducts.value.map((item) => ({
        ...item,
        currentQuantity: Number(item.currentQuantity ?? 0),
      })),
    });
  }

  function handleClosed() {
    formProducts.value = [];
    currentPage.value = 1;
  }
</script>

<style scoped>
  .tip-bar {
    margin-bottom: 12px;
    color: #f56c6c;
    font-size: 13px;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 13px;
    color: #606266;
  }

  .pending-text {
    margin-top: 4px;
    font-size: 12px;
    color: #909399;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
</style>
