<template>
  <div class="detail-table">
    <div class="section-header">
      <div class="left">明细</div>
      <div class="right">
        <el-button
          type="primary"
          v-if="pageType === TransferPlanOrderStatus.Add"
          @click="handleAdd"
        >
          新增
        </el-button>
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="table-wrap">
      <el-table
        :data="pagedRows"
        border
        height="100%"
        maxHeight="100%"
        :row-key="(row) => row.rowKeyInternal"
      >
        <el-table-column type="index" width="56" label="序号" />
        <el-table-column prop="msku" label="MSKU" min-width="160" show-overflow-tooltip>
          <template #default="{ row }">
            <el-input
              v-model="row.msku"
              placeholder="请输入MSKU"
              max-length="50"
              v-if="
                pageType === TransferPlanOrderStatus.Add ||
                pageType === TransferPlanOrderStatus.Created
              "
            />
            <OverflowTooltip v-else :content="row.msku || '-'" :line="1" />
          </template>
        </el-table-column>
        <el-table-column prop="supplySku" label="供应链SKU" min-width="160" show-overflow-tooltip />
        <el-table-column
          prop="productName"
          label="产品名称"
          min-width="220"
          show-overflow-tooltip
        />
        <el-table-column prop="applyQty" label="申请数量" min-width="200">
          <template #default="{ row }">
            <el-input-number
              v-model="row.applyQty"
              placeholder="请输入"
              style="width: 170px"
              v-if="
                pageType === TransferPlanOrderStatus.Add ||
                pageType === TransferPlanOrderStatus.Created
              "
              :min="0"
              :max="99999999"
            />
            <OverflowTooltip v-else :content="row.applyQty || '-'" :line="1" />
          </template>
        </el-table-column>
        <el-table-column prop="outStockQty" label="调出仓库存" min-width="120" />
        <el-table-column prop="auditQty" label="审核数量" min-width="200">
          <template #default="{ row }">
            <el-input-number
              v-model="row.auditQty"
              placeholder="请输入"
              style="width: 170px"
              v-if="pageType === TransferPlanOrderStatus.PendingAudit"
              :min="0"
              :max="99999999"
            />
            <span v-else>
              {{ pageType === TransferPlanOrderStatus.Add ? row.applyQty : row.auditQty }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="unsatisfiedReason" label="不满足原因" min-width="200">
          <template #default="{ row }">
            <el-input
              v-if="pageType === TransferPlanOrderStatus.PendingAudit"
              v-model="row.unsatisfiedReason"
              placeholder="请输入不满足原因"
              maxlength="50"
              show-word-limit
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="outWarehouseCode"
          label="调出仓"
          min-width="200"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-select
              v-model="row.outWarehouseCode"
              placeholder="请选择调出仓"
              clearable
              filterable
              style="width: 100%"
              @change="handleOutWarehouseChange(row)"
              v-if="pageType === TransferPlanOrderStatus.PendingAudit"
            >
              <el-option
                v-for="warehouse of warehouseMap"
                :key="warehouse.warehouseCode"
                :label="warehouse.warehouseName"
                :value="warehouse.warehouseCode"
              />
            </el-select>
            <span v-else>{{ warehouseNameMap.get(row.outWarehouseCode) || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="inWarehouseCode" label="调入仓" min-width="200">
          <template #default="{ row }">
            <el-select
              v-model="row.inWarehouseCode"
              placeholder="请选择"
              clearable
              filterable
              style="width: 100%"
              v-if="
                pageType === TransferPlanOrderStatus.Add ||
                pageType === TransferPlanOrderStatus.Created
              "
            >
              <el-option
                v-for="warehouse of warehouseMap"
                :key="warehouse.warehouseCode"
                :label="warehouse.warehouseName"
                :value="warehouse.warehouseCode"
              />
            </el-select>
            <OverflowTooltip
              v-else
              :content="warehouseNameMap.get(row.inWarehouseCode) || '-'"
              :line="1"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="jjTransferCode"
          label="调拨单号"
          min-width="160"
          show-overflow-tooltip
        />
        <el-table-column
          prop="jjTransferStatus"
          label="调拨单状态"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="jjPushStatus"
          label="调拨单推送状态"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="90" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="pageType !== TransferPlanOrderStatus.Audited"
              type="danger"
              link
              :disabled="pageType !== TransferPlanOrderStatus.Add"
              @click="handleRowDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <KeenPagination
        :current="currentPage"
        :page-size="innerPageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <AddProductDialog ref="addProductDialogRef" @confirm="handleAddProductConfirm" />
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api';
  import useLocalPagination from '@/views/stock/hooks/useLocalPagination';
  import AddProductDialog, { type StockItemWithId } from './addProductDialog.vue';
  import { TransferPlanOrderStatus } from '../enums/transferPlanOrderStatus';

  export interface TransferOrderItemRow {
    supplySku: string;
    productName: string;
    applyQty: number | string;
    outStockQty: number | string;
    auditQty: number | string;
    msku: string;
    inWarehouseCode: string;
    outWarehouseCode: string;
    productSku: string;
    jjTransferStatus?: string;
    jjTransferCode?: string;
    itemId?: number;
    jjPushStatus: string;
    rowKeyInternal?: string;
    unsatisfiedReason: string;
  }

  interface WarehouseItem {
    warehouseCode: string;
    warehouseName: string;
  }

  type PageType =
    | 'add'
    | TransferPlanOrderStatus.Created
    | TransferPlanOrderStatus.PendingAudit
    | TransferPlanOrderStatus.Audited
    | TransferPlanOrderStatus.Void;

  const props = withDefaults(
    defineProps<{
      modelValue?: TransferOrderItemRow[];
      pageSize?: number;
      pageType: PageType;
      warehouseMap: WarehouseItem[];
      warehouseNameMap: Map<string, string>;
    }>(),
    {
      modelValue: undefined,
      pageSize: 10,
    }
  );

  const emit = defineEmits<{
    (event: 'update:modelValue', payload: TransferOrderItemRow[]): void;
    (event: 'change', payload: { rows: TransferOrderItemRow[] }): void;
  }>();

  const localRows = ref<TransferOrderItemRow[]>([]);
  const addProductDialogRef = ref<InstanceType<typeof AddProductDialog>>();
  const outStockRequestTokenMap = new WeakMap<TransferOrderItemRow, number>();
  let outStockRequestToken = 0;
  let rowKeySeed = 0;
  let skipResetOnNextModelSync = false;
  let isSyncingFromModel = false;

  const {
    currentPage,
    pageSize: innerPageSize,
    pageSizeOptions: pageSizeOption,
    total,
    pagedRows,
    setPage,
    setPageSize,
    setData,
    appendRows,
    removeBy,
  } = useLocalPagination({
    source: localRows,
    defaultPageSize: props.pageSize,
    pageSizeOptions: [10, 20, 50, 100],
    onExternalChange: 'keep-valid-page',
  });

  const normalizeRows = (rows: TransferOrderItemRow[]) => {
    return rows.map((row) => {
      if (row.rowKeyInternal) return { ...row };
      rowKeySeed += 1;
      return {
        ...row,
        rowKeyInternal: `${Date.now()}_${rowKeySeed}`,
      };
    });
  };

  const toEmitRows = (rows: TransferOrderItemRow[]) => {
    return rows.map((row) => {
      const nextRow = { ...row };
      delete nextRow.rowKeyInternal;
      return nextRow;
    });
  };

  const syncRows = (
    rows: TransferOrderItemRow[],
    options?: {
      jumpToLast?: boolean;
      resetToFirst?: boolean;
    }
  ) => {
    skipResetOnNextModelSync = true;
    setData(normalizeRows(rows), {
      jumpToLast: options?.jumpToLast,
      resetToFirst: options?.resetToFirst,
    });
  };

  watch(
    () => props.modelValue,
    (rows) => {
      const nextRows = Array.isArray(rows) ? rows : [];
      if (skipResetOnNextModelSync) {
        skipResetOnNextModelSync = false;
        return;
      }
      isSyncingFromModel = true;
      setData(normalizeRows(nextRows), { resetToFirst: true });
      isSyncingFromModel = false;
    },
    { immediate: true }
  );

  watch(
    () => props.pageSize,
    (value) => {
      setPageSize(value || 10);
    }
  );

  watch(
    localRows,
    () => {
      if (isSyncingFromModel) return;
      skipResetOnNextModelSync = true;
      emit('update:modelValue', toEmitRows(localRows.value));
      emit('change', { rows: toEmitRows(localRows.value) });
    },
    { deep: true, flush: 'sync' }
  );

  const applyQtySum = computed(() =>
    localRows.value.reduce((sum, row) => sum + (Number(row.applyQty) || 0), 0)
  );
  const auditQtySum = computed(() =>
    localRows.value.reduce((sum, row) => sum + (Number(row.auditQty) || 0), 0)
  );
  const skuCountSum = computed(() => localRows.value.length);

  const handleCurrentChange = async (page: number) => {
    await nextTick();
    setPage(page);
    await nextTick();
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const handleAdd = () => {
    addProductDialogRef.value?.open();
  };

  const handleAddProductConfirm = (rows: StockItemWithId[], warehouseCode?: string) => {
    const newRows: TransferOrderItemRow[] = rows
      .filter((item) => item?.supplySku)
      .map((item) => ({
        supplySku: item.supplySku || '',
        productName: item.skuDesc || '',
        productSku: item.skuCode || '',
        msku: '',
        applyQty: '',
        auditQty: '',
        outStockQty: item.availableQuantity ?? '',
        inWarehouseCode: '',
        outWarehouseCode: warehouseCode || '',
        jjTransferCode: '',
        jjTransferStatus: '',
        jjPushStatus: '',
        unsatisfiedReason: '',
      }));
    skipResetOnNextModelSync = true;
    appendRows(normalizeRows(newRows));
    ElMessage.success(
      `已添加${newRows.length}个商品${warehouseCode ? `（来源仓库：${warehouseCode}）` : ''}`
    );
  };

  const handleRowDelete = (row: TransferOrderItemRow) => {
    skipResetOnNextModelSync = true;
    removeBy((item) => item.rowKeyInternal === row.rowKeyInternal);
  };

  const handleOutWarehouseChange = async (row: TransferOrderItemRow) => {
    const outWarehouseCode = (row.outWarehouseCode || '').trim();
    const supplySku = (row.supplySku || '').trim();
    if (!outWarehouseCode || !supplySku) {
      row.outStockQty = '';
      return;
    }
    outStockRequestToken += 1;
    const currentToken = outStockRequestToken;
    outStockRequestTokenMap.set(row, currentToken);
    try {
      const res = (await omsApi.omsTransferPlanQueryOutStock({
        outWarehouseCode,
        supplySku,
      })) as any;
      if (outStockRequestTokenMap.get(row) !== currentToken) return;
      const availableQty = Number(res?.availableQty ?? res?.result?.availableQty);
      row.outStockQty = Number.isFinite(availableQty) ? availableQty : '';
    } catch {
      if (outStockRequestTokenMap.get(row) !== currentToken) return;
      row.outStockQty = '';
    }
  };

  const setRows = (rows: TransferOrderItemRow[]) => {
    syncRows(rows, { resetToFirst: true });
  };

  const getRows = () => toEmitRows(localRows.value);

  const reset = () => {
    syncRows([], { resetToFirst: true });
    addProductDialogRef.value?.resetAll();
  };

  defineExpose({
    setRows,
    getRows,
    reset,
    applyQtySum,
    auditQtySum,
    skuCountSum,
  });
</script>

<style scoped lang="scss">
  .detail-table {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .section-header {
    padding: 8px 20px 12px;
    display: flex;
    align-items: center;
    height: 52px;
    .left {
      flex: 1;
      color: #1f1f1f;
      font-size: 14px;
      font-family: 'PingFang SC Medium';
    }
    .right {
      display: flex;
      gap: 10px;
    }
  }

  .table-wrap {
    padding: 0 20px 0;
    flex: 1;
    min-height: 0;
  }

  .pagination-wrap {
    padding: 8px 20px 0;
  }
</style>
