<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input
        v-model="search.supplySku"
        clearable
        placeholder="供应链SKU"
        style="width: 350px"
        maxlength="50"
      />
    </template>

    <template #filters>
      <el-input
        v-model="search.productName"
        clearable
        placeholder="产品名称"
        style="width: 280px"
        maxlength="50"
      />
      <el-date-picker
        v-model="search.snapDate"
        type="date"
        value-format="YYYY-MM-DD"
        placeholder="生成日期"
        clearable
        style="width: 160px"
      />
    </template>

    <template #buttons>
      <el-button type="primary" :loading="asyncLoading" @click="openSync">
        {{ syncButtonText }}
      </el-button>
      <el-button :loading="exportLoading" :disabled="exportLoading" @click="handleExport">
        导出
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      class="snapshot-diff-table"
      v-loading="listLoading"
      :data="displayTableRows"
      :span-method="handleSpanMethod"
      class-name="table-row-dashed"
      border
    >
      <el-table-column prop="snapDate" label="日期" min-width="130" fixed="left" align="center">
        <template #default="{ row }">
          <div class="snap-date-cell">
            <el-icon
              v-if="row.rowspan > 1"
              class="row-expand-toggle"
              @click.stop="toggleGroupCollapse(row)"
            >
              <ArrowUp v-if="!isGroupCollapsed(row)" />
              <ArrowDown v-else />
            </el-icon>
            <span>{{ row.snapDate ?? '-' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="snapTime" label="时间" min-width="100" fixed="left" align="center" />
      <el-table-column
        prop="supplySku"
        label="供应链SKU"
        min-width="140"
        fixed="left"
        align="center"
      />
      <el-table-column
        prop="productName"
        label="产品名称"
        min-width="200"
        align="center"
        fixed="left"
      />

      <el-table-column label="富勒" align="center">
        <el-table-column prop="fluxGoodStock" label="良品库存" min-width="100" align="center" />
        <el-table-column prop="fluxReservedStock" label="分配数量" min-width="100" align="center" />
        <el-table-column
          prop="fluxAvailableStock"
          label="可用库存"
          min-width="100"
          align="center"
        />
        <el-table-column prop="fluxDefectiveStock" label="不良库存" min-width="100" />
        <el-table-column prop="fluxPhysicalStock" label="实物库存" min-width="100" align="center" />
      </el-table-column>

      <el-table-column prop="dimensionDesc" label="维度" min-width="100" align="center" />
      <el-table-column prop="warehouseName" label="仓库名称" min-width="200" align="center" />

      <el-table-column label="ERP" align="center">
        <el-table-column prop="erpGoodStock" label="良品库存" min-width="100" align="center" />
        <el-table-column prop="erpReservedStock" label="预占库存" min-width="100" align="center" />
        <el-table-column prop="erpAvailableStock" label="可用库存" min-width="100" align="center" />
        <el-table-column prop="erpDefectiveStock" label="不良库存" min-width="100" align="center" />
        <el-table-column prop="erpPhysicalStock" label="实物库存" min-width="100" align="center" />
      </el-table-column>
      <el-table-column label="积加" align="center">
        <el-table-column prop="jijiaGoodStock" label="良品库存" min-width="100" align="center" />
        <el-table-column
          prop="jijiaReservedStock"
          label="预占库存"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="jijiaAvailableStock"
          label="可用库存"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="jijiaDefectiveStock"
          label="不良库存"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="jijiaPhysicalStock"
          label="实物库存"
          min-width="100"
          align="center"
        />
      </el-table-column>
    </el-table>

    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
</template>

<script setup lang="ts" name="stockDifferenceSnapshot">
  import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
  import dayjs from 'dayjs';
  import { computed, ref } from 'vue';
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi } from '@/api';
  import { useStockExport } from '../../utils/useStockExport';
  import type { StockDifferenceSnapDetailItem, StockDifferenceSnapItem } from '../index';
  // import { stockDifferenceSnapMockList } from '../mock';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';

  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '重新比对',
    confirmButtonText: '重新比对',
    confirmTitle: '确认',
    confirmText: '确认要重新比对吗',
    successMessage: '重新比对完成',
    loadingMessage: '重新比对中',
    errorMessage: '重新比对失败',
    services: cisApi.cisInventorySnapReGenerate,
    onSuccess: () => {
      refreshList();
    },
  });
  type SpanMethodParams = {
    row: SnapshotTableRow;
    column: { property?: string };
  };
  type SpanMethodResult = [number, number];
  type SnapshotTableRow = StockDifferenceSnapItem &
    Partial<StockDifferenceSnapDetailItem> & {
      rowspan: number;
    };

  const PAGE_SIZE = 10;
  const tableRef = ref();
  const mergedColumnProps = new Set([
    'snapDate',
    'snapTime',
    'supplySku',
    'productName',
    'fluxGoodStock',
    'fluxReservedStock',
    'fluxAvailableStock',
    'fluxDefectiveStock',
    'fluxPhysicalStock',
  ]);

  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    resetSearch,
    refreshList,
  } = useList<
    CisApi.CisInventorySnapQueryList.RequestBody & { pageSize: number; pageNum: number },
    CisApi.CisInventorySnapQueryList.ResponseBody
  >({
    searchDefaults: {
      supplySku: undefined,
      productName: undefined,
      snapDate: dayjs().format('YYYY-MM-DD'),
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisInventorySnapQueryList,
  });

  const { exportLoading, handleExport } =
    useStockExport<CisApi.CisInventorySnapExportQueryList.RequestBody>({
      getParams: () => ({
        supplySku: search.supplySku,
        productName: search.productName,
        snapDate: search.snapDate,
        pageSize: PAGE_SIZE,
        pageNum: current.value,
      }),
      exportRequest: (params) => cisApi.cisInventorySnapExportQueryList(params),
    });

  const buildGroupKey = (row: StockDifferenceSnapItem) =>
    [row.snapDate, row.snapTime, row.supplySku, row.productName].join('||');

  /** 收起时仅保留每组第一行；未在此集合中的组为展开（展示全部行） */
  const collapsedGroupKeys = ref<Set<string>>(new Set());
  const tableRows = computed<SnapshotTableRow[]>(() => {
    const sourceRows = listData.value?.recordList ?? [];

    const flattenedRows: SnapshotTableRow[] = sourceRows.flatMap((item) => {
      const details = item.snapDetailBeans?.length
        ? item.snapDetailBeans
        : ([{}] as StockDifferenceSnapDetailItem[]);

      return details.map((detail) => ({
        ...item,
        ...detail,
        rowspan: 1,
      }));
    });

    const groupCountMap = new Map<string, number>();
    flattenedRows.forEach((row) => {
      const key = buildGroupKey(row);
      groupCountMap.set(key, (groupCountMap.get(key) ?? 0) + 1);
    });

    let previousGroupKey = '';
    return flattenedRows.map((row) => {
      const groupKey = buildGroupKey(row);
      if (groupKey !== previousGroupKey) {
        previousGroupKey = groupKey;
        return {
          ...row,
          rowspan: groupCountMap.get(groupKey) ?? 1,
        };
      }
      return {
        ...row,
        rowspan: 0,
      };
    });
  });

  const displayTableRows = computed(() => {
    const rows = tableRows.value;
    if (collapsedGroupKeys.value.size === 0) return rows;
    return rows.filter((row) => {
      const key = buildGroupKey(row);
      if (collapsedGroupKeys.value.has(key)) {
        return row.rowspan > 0;
      }
      return true;
    });
  });

  const isGroupCollapsed = (row: SnapshotTableRow) => {
    if (row.rowspan <= 0) return false;
    return collapsedGroupKeys.value.has(buildGroupKey(row));
  };

  const toggleGroupCollapse = (row: SnapshotTableRow) => {
    if (row.rowspan <= 0) return;
    const key = buildGroupKey(row);
    const next = new Set(collapsedGroupKeys.value);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    collapsedGroupKeys.value = next;
  };

  const handleSpanMethod = ({ row, column }: SpanMethodParams): SpanMethodResult => {
    if (!column.property || !mergedColumnProps.has(column.property)) {
      return [1, 1];
    }
    const key = buildGroupKey(row);
    const collapsed = collapsedGroupKeys.value.has(key);
    const span = collapsed && row.rowspan > 0 ? 1 : row.rowspan;
    return span > 0 ? [span, 1] : [0, 0];
  };
</script>

<style scoped lang="scss">
  .snapshot-diff-table {
    :deep(.el-table__header-wrapper thead th.el-table__cell),
    :deep(.el-table__fixed-header-wrapper thead th.el-table__cell) {
      background-color: var(--el-table-header-bg-color) !important;
    }
  }

  .snap-date-cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .row-expand-toggle {
    cursor: pointer;
    font-size: 14px;
    color: var(--el-color-primary);
    flex-shrink: 0;
  }
</style>
