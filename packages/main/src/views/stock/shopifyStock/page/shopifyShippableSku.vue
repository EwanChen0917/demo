<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetAll"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <TypeSearchInput
        v-model:keyWord="search.keyword"
        v-model:keyWordType="search.keywordType"
        :options="searchOptions"
        ref="typeSearchInputRef"
      />
    </template>
    <template #filters>
      <el-select
        v-model="search.siteList"
        placeholder="站点"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :teleported="false"
        :options="siteList"
        label-prop="label"
        value-prop="value"
      />
      <el-select
        v-model="search.productType"
        placeholder="商品类型"
        filterable
        clearable
        :options="productTypeOptions"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="openSync" :disabled="asyncLoading">
        <el-icon v-if="asyncLoading">
          <Loading />
        </el-icon>
        {{ syncButtonText }}
      </el-button>
    </template>
    <template #default="{ tableHeight }">
      <vxe-table
        :height="tableHeight"
        ref="tableRef"
        :column-config="{ resizable: true }"
        :span-method="spanMethod"
        :scroll-y="{ enabled: false }"
        border
        :cell-class-name="getCellClassName"
        :data="flatList"
        @cell-click="handleCellClick"
        :loading="listLoading"
      >
        <vxe-column field="msku" title="MSKU" min-width="160" />
        <vxe-column field="inventoryItemId" title="shopify存货编码" min-width="160" />
        <vxe-column field="site" title="站点" min-width="80" />
        <vxe-column field="shop" title="店铺账号" min-width="130" />
        <vxe-column field="statusDesc" title="产品状态" min-width="120">
          <template #default="{ row }">
            <Tag :color="row.status === 'active' ? 'green' : 'warning'">
              {{ row.statusDesc }}
            </Tag>
          </template>
        </vxe-column>
        <vxe-column field="productTypeDesc" title="商品类型" min-width="100" />
        <vxe-column field="productName" title="产品名称" min-width="180">
          <template #default="{ row }">
            <div class="product-name-cell">
              <el-icon
                class="expand-icon"
                v-if="row.detailCount > SKU_LIMIT"
                @click="toggleMsku(`${row.inventoryItemId}${row.site}`)"
              >
                <ArrowDown v-if="!collapsedMskuKeys.has(`${row.inventoryItemId}${row.site}`)" />
                <ArrowRight v-else />
              </el-icon>
              <div class="product-name-text">
                <OverflowTooltip :content="row.productName || '-'" :line="2" />

                <span
                  v-if="collapsedMskuKeys.has(`${row.inventoryItemId}${row.site}`)"
                  class="collapsed-hint"
                >
                  ({{ row.detailCount }} 条已折叠)
                </span>
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="skuCode" title="产品SKU" min-width="160" />
        <vxe-column field="skuQty" title="数量" min-width="70" />
        <vxe-column field="productSku" title="供应链SKU" min-width="160" />
        <vxe-column field="skuGroup" title="可发SKU" min-width="200">
          <template #default="{ row }">
            <template v-if="row.skuGroup?.length">
              <div
                v-for="sku in getVisibleSkuGroup(row.rowKey, row.skuGroup)"
                :key="sku"
                class="sku-item"
              >
                {{ sku }}
              </div>
              <span
                v-if="row.skuGroup.length > SKU_LIMIT"
                class="sku-toggle"
                @click="toggleSkuGroup(row.rowKey)"
              >
                {{
                  expandedSkuGroupKeys.has(row.rowKey)
                    ? '收起'
                    : `展开剩余 ${row.skuGroup.length - SKU_LIMIT} 个`
                }}
              </span>
            </template>
            <span v-else>-</span>
          </template>
        </vxe-column>
        <vxe-column field="updateTime" title="更新时间" min-width="160" />
      </vxe-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </KeenList>
</template>

<script setup lang="ts" name="shopifyShippableSku">
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi } from '@/api';
  import TypeSearchInput from '../components/typeSearchInput.vue';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';
  import { useBaseOptions } from '../hooks/useBaseOptions';

  const { siteList, getSiteList, productTypeOptions } = useBaseOptions();
  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '更新可发货SKU',
    confirmButtonText: '更新可发货SKU',
    confirmTitle: '确认',
    confirmText: '确认要更新可发货SKU吗',
    successMessage: '更新可发货SKU成功',
    loadingMessage: '可发货SKU更新中',
    errorMessage: '可发货SKU更新失败',
    services: cisApi.cisInventoryShopifyProductSync,
  });
  const searchOptions = [
    {
      label: 'MSKU',
      value: 4,
      multiple: false,
      placeholder: '请输入MSKU',
    },
    {
      label: '供应链SKU',
      value: 1,
      separator: ',',
      multiple: true,
      placeholder: '请输入供应链SKU，多个用逗号分隔',
    },
    {
      label: '产品SKU',
      value: 2,
      separator: ',',
      multiple: true,
      placeholder: '请输入产品SKU，多个用逗号分隔',
    },
    {
      label: 'inventory_item_id',
      value: 5,
      separator: ',',
      multiple: true,
      placeholder: '请输入inventory_item_id，多个用逗号分隔',
    },

    {
      label: '产品名称',
      value: 3,
      multiple: false,
      placeholder: '请输入产品名称',
    },
  ];

  const typeSearchInputRef = ref<InstanceType<typeof TypeSearchInput>>();
  const PAGE_SIZE = 10;
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
    refreshList,
    resetSearch,
    listLoading,
    // runQuery,
  } = useList<
    CisApi.CisInventoryShopifyShipSkuQueryList.RequestBody & {
      pageSize: number;
      pageNum: number;
    },
    CisApi.CisInventoryShopifyShipSkuQueryList.ResponseBody
  >({
    searchDefaults: {
      keywordType: 4,
      keyword: undefined,
      productType: undefined,
      siteList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisInventoryShopifyShipSkuQueryList,
  });
  const resetAll = () => {
    if (typeSearchInputRef.value) {
      typeSearchInputRef.value.clear();
    }
    resetSearch();
  };

  // -------- 数据类型定义 --------

  interface DetailItem {
    skuCode: string;
    skuQty: number;
    productSku: string;
    skuGroup: string[];
  }

  interface MskuItem {
    msku: string;
    inventoryItemId: string;
    site: string;
    shop: string;
    status: string;
    statusDesc: string;
    productType: number;
    productTypeDesc: string;
    productName: string;
    updateTime: string;
    details?: DetailItem[];
  }

  interface FlatRow extends Omit<MskuItem, 'details'>, DetailItem {
    rowSpan: number;
    rowKey: string;
    detailCount: number;
  }

  // -------- 行折叠状态 --------

  const collapsedMskuKeys = ref(new Set<string>());

  const toggleMsku = (inventoryItemId: string) => {
    if (collapsedMskuKeys.value.has(inventoryItemId)) {
      collapsedMskuKeys.value.delete(inventoryItemId);
    } else {
      collapsedMskuKeys.value.add(inventoryItemId);
    }
  };

  // -------- 数据拍平 --------

  const flatList = computed<FlatRow[]>(() => {
    const list = (listData.value?.list ?? []) as MskuItem[];
    return list.flatMap((item) => {
      const allDetails = item.details?.length
        ? item.details
        : [{ skuCode: '', skuQty: 0, productSku: '', skuGroup: [] }];
      const isCollapsed = collapsedMskuKeys.value.has(`${item.inventoryItemId}${item.site}`);
      const visibleDetails = isCollapsed ? allDetails.slice(0, 1) : allDetails;
      return visibleDetails.map((detail, index) => ({
        msku: item.msku,
        inventoryItemId: item.inventoryItemId,
        site: item.site,
        shop: item.shop,
        status: item.status,
        statusDesc: item.statusDesc,
        productType: item.productType,
        productTypeDesc: item.productTypeDesc,
        productName: item.productName,
        updateTime: item.updateTime,
        skuCode: detail.skuCode,
        skuQty: detail.skuQty,
        productSku: detail.productSku,
        skuGroup: detail.skuGroup,
        rowSpan: index === 0 ? visibleDetails.length : 0,
        rowKey: `${item.inventoryItemId}${item.site}-${index}`,
        detailCount: allDetails.length,
      }));
    });
  });

  // -------- 单元格合并 --------

  const MSKU_FIELDS = new Set([
    'msku',
    'inventoryItemId',
    'site',
    'shop',
    'statusDesc',
    'productTypeDesc',
    'productName',
    'updateTime',
  ]);

  const spanMethod = ({ row, column }: { row: FlatRow; column: { field?: string } }) => {
    if (!MSKU_FIELDS.has(column.field ?? '')) return undefined;
    if (row.rowSpan > 0) return { rowspan: row.rowSpan, colspan: 1 };
    return { rowspan: 0, colspan: 1 };
  };

  // -------- 单元格高亮 --------

  type SelectionType = 'group' | 'detail' | null;

  const selectionType = ref<SelectionType>(null);
  const selectedMskuId = ref<string | null>(null);
  const selectedRowKey = ref<string | null>(null);

  const handleCellClick = ({ row, column }: { row: FlatRow; column: { field?: string } }) => {
    if (MSKU_FIELDS.has(column.field ?? '')) {
      selectionType.value = 'group';
      selectedMskuId.value = `${row.inventoryItemId}${row.site}`;
      selectedRowKey.value = null;
    } else {
      selectionType.value = 'detail';
      selectedMskuId.value = `${row.inventoryItemId}${row.site}`;
      selectedRowKey.value = row.rowKey;
    }
  };

  const getCellClassName = ({ row, column }: { row: FlatRow; column: { field?: string } }) => {
    if (!selectionType.value) return '';
    if (selectionType.value === 'group') {
      return `${row.inventoryItemId}${row.site}` === selectedMskuId.value ? 'cell-selected' : '';
    }
    // detail 模式：选中的 detail 行高亮非合并格
    if (row.rowKey === selectedRowKey.value && !MSKU_FIELDS.has(column.field ?? '')) {
      return 'cell-selected';
    }
    // detail 模式：该 msku 第一行（持有合并格的行）只高亮合并格
    if (
      `${row.inventoryItemId}${row.site}` === selectedMskuId.value &&
      row.rowSpan > 0 &&
      MSKU_FIELDS.has(column.field ?? '')
    ) {
      return 'cell-selected';
    }

    return '';
  };

  // -------- skuGroup 截断展示 --------

  const SKU_LIMIT = 5;
  const expandedSkuGroupKeys = ref(new Set<string>());

  const getVisibleSkuGroup = (key: string, skuGroup: string[]) => {
    if (expandedSkuGroupKeys.value.has(key) || skuGroup.length <= SKU_LIMIT) {
      return skuGroup;
    }
    return skuGroup.slice(0, SKU_LIMIT);
  };

  const toggleSkuGroup = (key: string) => {
    if (expandedSkuGroupKeys.value.has(key)) {
      expandedSkuGroupKeys.value.delete(key);
    } else {
      expandedSkuGroupKeys.value.add(key);
    }
  };

  watch(current, () => {
    expandedSkuGroupKeys.value.clear();
    collapsedMskuKeys.value.clear();
    selectionType.value = null;
    selectedMskuId.value = null;
    selectedRowKey.value = null;
  });

  onMounted(() => {
    getSiteList();
  });
  onActivated(() => {
    refreshList();
  });
</script>

<style scoped lang="scss">
  .sku-item {
    line-height: 1.6;
  }

  .sku-toggle {
    display: inline-block;
    margin-top: 4px;
    color: var(--el-color-primary);
    cursor: pointer;
    font-size: 12px;

    &:hover {
      opacity: 0.8;
    }
  }

  :deep(.cell-selected) {
    background-color: var(--el-color-primary-light-9) !important;
  }

  .product-name-cell {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    user-select: none;

    .expand-icon {
      flex-shrink: 0;
      color: var(--el-color-primary);
      font-size: 12px;
      transition: transform 0.2s;
    }

    .product-name-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .collapsed-hint {
      flex-shrink: 0;
      color: var(--el-color-info);
      font-size: 12px;
    }
  }
</style>
