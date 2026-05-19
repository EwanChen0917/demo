<template>
  <keenList
    @refresh="refreshList"
    @reset-search="resetAll"
    @clear-all="resetSearch"
    auto-custom-fields
    :custom-fields-base="customFields"
    custom-fields-item-type="warehouseStockPage"
    v-model:hide-list="hideList"
  >
    <template #search>
      <el-input v-model="searchInputValue" clearable placeholder="请输入" style="width: 350px">
        <template #prepend>
          <el-select v-model="searchType" style="width: 120px" @change="handleSearchTypeChange">
            <el-option
              v-for="item in searchPrepend.stockSearchTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #suffix>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <template #append>
          <BatchSearchPopover ref="batchSearchRef" @search="handleBatchSearch" />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!-- <el-select
        v-model="search.warehouseTypeList"
        placeholder="仓库类型"
        clearable
        multiple
        style="width: 200px"
      >
        <el-option label="自营仓" value="SELF" />
        <el-option label="三方仓" value="THIRD" />
        <el-option label="平台仓" value="PLATFORM" />
      </el-select> -->
      <!-- <el-select
        v-model="search.warehouseCodeList"
        placeholder="仓库"
        clearable
        multiple
        style="width: 200px"
        collapse-tags
        collapse-tags-tooltip
        filterable
        :options="warehouseMap"
      /> -->
      <CascaderWithSearch
        v-model="search.warehouseCodeList"
        :options="warehouseTreeData"
        :default-first-level-value="'SELF'"
        :props="{
          value: 'warehouseCode',
          label: 'label',

          children: 'children',
          multiple: true,
          emitPath: true,
          checkStrictly: false,
        }"
        placeholder="选择仓库"
        style="width: 240px"
      />
      <el-dropdown split-button trigger="click" @click="onTextClick" @command="handleCommand">
        <span class="d-flex align-items-center gap-1">
          <i
            class="Root-tyicon icon-Root-tyxianshimima"
            style="font-size: 14px; padding-top: 2px"
          ></i>
          保存视图
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-if="stockSearchViewList.length">
              <el-dropdown-item
                v-for="item in stockSearchViewList"
                :key="item.id"
                :command="item.id"
                class="dropdown-item"
              >
                <div class="dropdown-content">
                  <div class="item-name">
                    <el-icon v-if="item.isDefault"><View /></el-icon>
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="item-actions">
                    <el-button
                      size="small"
                      type="primary"
                      link
                      @click.stop.prevent="editView(item)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      v-if="!item.isDefault"
                      size="small"
                      type="primary"
                      link
                      @click.stop.prevent="setDefaultView(item)"
                    >
                      设置为默认
                    </el-button>
                    <el-button
                      size="small"
                      type="primary"
                      link
                      @click.stop.prevent="onDelete(item)"
                    >
                      删除
                    </el-button>
                  </div>
                </div>
              </el-dropdown-item>
            </template>
            <el-dropdown-item v-else class="text-center">
              <span>暂无数据</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <template #buttons>
      <ExportBtn
        :service="cisApi.cisInventoryExport"
        :params="{
          ...search,
          downLoadSync: false,
          pageNum: current,
          pageSize: pageSize,
        }"
        :plain="false"
      >
        导出
      </ExportBtn>
    </template>
    <StockTable
      ref="stockTableRef"
      :data="listData?.list"
      :columns="showColumns"
      :loading="listLoading"
      :show-index="true"
      @sort-change="handleSortChange"
    >
      <template #summaryQuantity="{ row }">
        {{ getSummaryQuantity(row) }}
      </template>
      <template #warehouseDesc="{ row }">
        <OverflowTooltip :content="row.warehouseDesc" :line="2" />
      </template>
      <template #reservedQuantity="{ row }">
        <div v-if="row.reservedQuantity > 0">
          <template v-if="reservedPopoverOpenKey === getReservedRowKey(row)">
            <el-popover :width="700" trigger="manual" :visible="true">
              <template #reference>
                <span
                  style="color: var(--el-color-primary); cursor: pointer"
                  @click="handleHideReserved"
                >
                  {{ row.reservedQuantity }}
                </span>
              </template>
              <div style="padding: 12px">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                  "
                >
                  <span style="font-size: 14px; font-weight: bold">预占明细</span>
                  <el-button link type="primary" size="small" @click="handleHideReserved">
                    关闭
                  </el-button>
                </div>
                <ReservedListTable ref="ReservedListTableRef" />
              </div>
            </el-popover>
          </template>
          <span
            v-else
            style="color: var(--el-color-primary); cursor: pointer"
            @click="handleReservedQuantityClick(row)"
          >
            {{ row.reservedQuantity }}
          </span>
        </div>
        <span v-else>{{ row.reservedQuantity }}</span>
      </template>
    </StockTable>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <SearchViewModal
      ref="searchViewModalRef"
      :view-list="stockSearchViewList"
      @save-view-success="saveView"
    />
  </keenList>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick, onMounted, getCurrentInstance } from 'vue';

  import { View } from '@element-plus/icons-vue';
  import BatchSearchPopover from '@/components/BatchSearchPopover/index.vue';
  import { CisApi, cisApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { useCache } from '@/hooks/web/useCache';
  import CascaderWithSearch from '@/views/stock/components/cascaderWithSearch.vue';
  import SearchViewModal from '../components/searchViewModal.vue';
  import ReservedListTable from '../components/reservedListTable.vue';
  import StockTable from '../components/StockTable.vue';
  import { searchPrepend } from '../config';
  import { useBaseStock } from '../hooks/useBaseStock';
  import customFields from '../customFields/list';

  const { getWarehouseMap, warehouseTreeData, getWarehouseTreeData } = useBaseStock();
  const { proxy } = getCurrentInstance() as any;
  const { wsCache } = useCache('localStorage');
  const STOCK_SEARCH_VIEW_CACHE_KEY = 'warehouseStockSearchViewList';
  const BASE_SEARCH_DEFAULTS = {
    poolCodeList: undefined,
    skuCodeList: undefined,
    skuNameList: undefined,
    supplySkuList: undefined,
    warehouseCodeList: undefined,
    warehouseTypeList: undefined,
    sortField: undefined,
    sortOrder: undefined,
  };
  type SearchViewItem = {
    id: number | string;
    name: string;
    isDefault: boolean;
    searchValue: Record<string, any>;
  };
  const stockSearchViewList = ref<SearchViewItem[]>(wsCache.get(STOCK_SEARCH_VIEW_CACHE_KEY) || []);
  const buildSearchDefaultsFromCache = () => {
    const defaults: Record<string, any> = { ...BASE_SEARCH_DEFAULTS };
    const defaultView = stockSearchViewList.value.find((item) => item.isDefault)?.searchValue;
    if (!defaultView) return defaults;
    Object.keys(defaults).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(defaultView, key)) {
        defaults[key] = defaultView[key];
      }
    });
    return defaults;
  };
  interface TableColumn {
    prop: string;
    label: string;
    fixed?: 'left' | 'right';
    width?: string | number;
    minWidth?: string | number;
    sortable?: boolean;
    slot?: string;
    sortField?: string;
  }
  const searchType = ref('skuCodeList');
  const batchSearchRef = ref<InstanceType<typeof BatchSearchPopover> | null>(null);
  // const loading = ref(false);

  const hideList = ref<string[]>([]);

  const columns: TableColumn[] = [
    { prop: 'supplySku', label: '供应链SKU', minWidth: 150, fixed: 'left' },
    { prop: 'skuCode', label: '产品SKU', minWidth: 150 },
    { prop: 'skuDesc', label: '产品名称', minWidth: 300 },
    { prop: 'warehouseDesc', label: '仓库', minWidth: 300, slot: 'warehouseDesc' },
    { prop: 'warehouseTypeDesc', label: '仓库类型', minWidth: 100 },
    { prop: 'inProductionQuantity', label: '在制库存', minWidth: 120 },
    { prop: 'inTransitQuantity', label: '在途库存', minWidth: 120 },
    { prop: 'totalQuantity', label: '实物库存', minWidth: 120 },
    { prop: 'goodQuantity', label: '良品库存', minWidth: 120 },

    { prop: 'summaryQuantity', label: '在途在制数量', minWidth: 120, slot: 'summaryQuantity' },
    {
      prop: 'unShelveQuantity',
      label: '收货未上架数量',
      minWidth: 160,
      sortField: 'unShelveQuantity',
      sortable: true,
    },
    {
      prop: 'unsellableQuantity',
      label: '不良数量',
      minWidth: 120,
      sortField: 'unsellableQuantity',
      sortable: true,
    },
    {
      prop: 'availableQuantity',
      label: '可用数量',
      minWidth: 120,
      sortable: true,
      sortField: 'availableQuantity',
    },
    {
      prop: 'reservedQuantity',
      label: '预占数量',
      minWidth: 120,
      sortable: true,
      sortField: 'reservedQuantity',
      slot: 'reservedQuantity',
    },
    {
      prop: 'lockedQuantity',
      label: '锁库数量',
      minWidth: 120,
      sortable: true,
      sortField: 'lockedQuantity',
    },
    { prop: 'unit', label: '单位', minWidth: 150 },
  ];
  const showColumns = computed(() => {
    return columns.filter((item) => !hideList.value.includes(item.prop));
  });

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
    refreshList,
    runQuery,
    resetSearch,
  } = useList<CisApi.CisInventoryQueryList.RequestBody, CisApi.CisInventoryQueryList.ResponseBody>({
    searchDefaults: buildSearchDefaultsFromCache(),
    pageSize: 10,
    pageNum: 1,
    service: cisApi.cisInventoryQueryList,
  });

  // ==================== 搜索输入统一管理 ====================
  const searchInputValue = computed({
    get: () => {
      const searchKey = searchType.value as keyof typeof search;
      const value = search[searchKey];
      if (Array.isArray(value)) {
        return value.filter(Boolean).join(',');
      }
      return '';
    },
    set: (val: string) => {
      const searchKey = searchType.value as keyof typeof search;

      const arrayValue = val
        ? val
            .split(/[,\n]/)
            .map((item) => item.trim())
            .filter(Boolean)
        : undefined;

      searchPrepend.stockSearchTypes.forEach((item) => {
        if (item.value !== searchType.value) {
          search[item.value as keyof typeof search] = undefined;
        }
      });

      search[searchKey] = arrayValue as any;
    },
  });
  const getSearchTypeBySearchValue = (searchValue?: Record<string, any>) => {
    const matched = searchPrepend.stockSearchTypes.find((item) => {
      const value = (searchValue as any)?.[item.value];
      return Array.isArray(value) && value.length > 0;
    });
    return matched?.value || 'skuCodeList';
  };
  function handleSearchTypeChange() {
    searchPrepend.stockSearchTypes.forEach((item) => {
      search[item.value as keyof typeof search] = undefined;
    });
    current.value = 1;
    runQuery();
  }
  const handleBatchSearch = (val: string) => {
    if (!val) {
      searchInputValue.value = '';
      return;
    }
    searchInputValue.value = val.replace(/\n/g, ',');
  };

  const handleSortChange = (data: any) => {
    search.sortField = data.sortField;
    search.sortOrder = data.sortOrder;
  };
  const stockTableRef = ref<InstanceType<typeof StockTable> | null>(null);
  const searchViewModalRef = ref<InstanceType<typeof SearchViewModal> | null>(null);

  const saveView = (
    view: { id: number | string; name: string; isDefault: boolean },
    isEdit?: boolean
  ) => {
    if (view.isDefault) {
      stockSearchViewList.value.forEach((item) => {
        item.isDefault = false;
      });
    }

    if (isEdit) {
      stockSearchViewList.value = stockSearchViewList.value.map((item) => {
        if (String(item.id) === String(view.id)) {
          return {
            ...item,
            name: view.name,
            isDefault: view.isDefault,
            searchValue: { ...search },
          };
        }
        return item;
      });
    } else {
      stockSearchViewList.value.unshift({
        ...view,
        searchValue: { ...search },
      });
    }
    wsCache.set(STOCK_SEARCH_VIEW_CACHE_KEY, stockSearchViewList.value);
    proxy?.$message?.success('视图保存成功');
  };

  const editView = (item: SearchViewItem) => {
    searchViewModalRef.value?.open(item);
  };

  const setDefaultView = (item: SearchViewItem) => {
    stockSearchViewList.value.forEach((i) => {
      i.isDefault = String(i.id) === String(item.id);
    });
    wsCache.set(STOCK_SEARCH_VIEW_CACHE_KEY, stockSearchViewList.value);
    proxy?.$message?.success('默认视图设置成功');
  };

  const onDelete = (item: SearchViewItem) => {
    stockSearchViewList.value = stockSearchViewList.value.filter(
      (i) => String(i.id) !== String(item.id)
    );
    wsCache.set(STOCK_SEARCH_VIEW_CACHE_KEY, stockSearchViewList.value);
    proxy?.$message?.success('视图删除成功');
  };

  const onTextClick = () => {
    if (stockSearchViewList.value.length === 10) {
      proxy?.$message?.warning('视图列表最多存10条，请先删除视图后重试');
      return;
    }
    searchViewModalRef.value?.open();
  };

  const handleCommand = (command: string | number) => {
    const selectedView = stockSearchViewList.value.find(
      (item) => String(item.id) === String(command)
    );
    const viewSearchValue = selectedView?.searchValue;
    if (!viewSearchValue) return;

    Object.keys(BASE_SEARCH_DEFAULTS).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(viewSearchValue, key)) {
        (search as any)[key] = viewSearchValue[key];
      } else {
        (search as any)[key] = (BASE_SEARCH_DEFAULTS as any)[key];
      }
    });
    searchType.value = getSearchTypeBySearchValue(viewSearchValue);
  };

  const resetAll = () => {
    resetSearch();
    stockTableRef.value?.clearSort();
    if (batchSearchRef.value) {
      batchSearchRef.value.clear();
    }
  };

  const ReservedListTableRef = ref<InstanceType<typeof ReservedListTable> | null>(null);
  const reservedPopoverOpenKey = ref<string | null>(null);

  function getReservedRowKey(row: any) {
    return `${row?.supplySku ?? ''}_${row?.warehouseCode ?? ''}`;
  }

  function handleReservedQuantityClick(row: any) {
    const key = getReservedRowKey(row);
    if (reservedPopoverOpenKey.value === key) {
      return;
    }
    reservedPopoverOpenKey.value = key;
    nextTick(() => {
      ReservedListTableRef.value?.open({
        supplySku: row.supplySku,
        warehouseCode: row.warehouseCode,
      });
    });
  }

  function handleHideReserved() {
    reservedPopoverOpenKey.value = null;
    ReservedListTableRef.value?.close();
  }

  const collectLeafWarehouseCodes = (nodes: any[]): string[] => {
    const result: string[] = [];
    const walk = (list: any[]) => {
      list.forEach((node) => {
        const children = Array.isArray(node?.children) ? node.children : [];
        if (!children.length) {
          if (node?.warehouseCode) {
            result.push(String(node.warehouseCode));
          }
          return;
        }
        walk(children);
      });
    };
    walk(nodes || []);
    return Array.from(new Set(result));
  };

  const applySelfWarehouseCodes = () => {
    const tree = Array.isArray(warehouseTreeData.value) ? warehouseTreeData.value : [];
    const selfRootNode = tree.find((node: any) => {
      const candidates = [node?.warehouseType, node?.code, node?.type, node?.warehouseCode];
      return candidates.some((item) => String(item ?? '') === 'SELF');
    });
    if (!selfRootNode) {
      return;
    }
    const nextCodes = collectLeafWarehouseCodes([selfRootNode]);
    if (!nextCodes.length) {
      return;
    }
    search.warehouseCodeList = nextCodes as any;
  };
  /** 在途在制合计：兼容 null/undefined、字符串数字、非法值，避免 NaN 与字符串拼接 */
  function getSummaryQuantity(row: {
    inProductionQuantity?: unknown;
    inTransitQuantity?: unknown;
  }) {
    const a = Number(row.inProductionQuantity);
    const b = Number(row.inTransitQuantity);
    return (Number.isFinite(a) ? a : 0) + (Number.isFinite(b) ? b : 0);
  }

  onMounted(() => {
    getWarehouseMap();
    getWarehouseTreeData().then(() => {
      applySelfWarehouseCodes();
    });
    searchType.value = getSearchTypeBySearchValue(search as Record<string, any>);
  });
</script>

<style scoped lang="scss"></style>
