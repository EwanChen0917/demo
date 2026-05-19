<!-- eslint-disable no-underscore-dangle -->
<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetAll"
    @reset-search-by-key="(key) => (search[key] = undefined)"
    :custom-fields="customFieldList"
    :condition-code="conditionCode"
    @refresh-custom-fields="queryCustomFieldList"
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
        placeholder="请选择仓库"
        :options="outSeaWarehouseOptions"
        v-model="search.warehouseCodeList"
        multiple
        clearable
        collapse-tags
        collapse-tags-tooltip
        filterable
        style="width: 300px"
        max-collapse-tags="1"
      />
      <ProductTypeCascader
        v-model="productCategoryListComputed"
        placeholder="品类"
        style="min-width: 190px"
      />
      <el-select
        placeholder="品线"
        :options="productLineOptions"
        style="width: 250px"
        v-model="search.productLineList"
        multiple
        clearable
        filterable
        collapse-tags
        max-collapse-tags="1"
      />
      <DeptMember v-model="search.productOperatorList" placeholder="运营" multiple />
      <el-select
        placeholder="缺货预警"
        :options="stockOutOperatorList"
        clearable
        v-model="search.stockOutAlertFlag"
      />
      <el-select
        placeholder="跟踪状态"
        :options="trackOptions"
        clearable
        v-model="search.tracked"
      />
      <el-select
        placeholder="是否自动同步库存"
        :options="autoSyncStockOptions"
        clearable
        v-model="search.autoSyncStock"
      />
      <el-select
        placeholder="是否允许缺货售卖"
        :options="inventoryPolicyOptions"
        clearable
        v-model="search.inventoryPolicy"
      />
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="openSync"
        :disabled="asyncLoading"
        :loading="asyncLoading"
        v-permission="'shopifyStockSyncSku'"
      >
        {{ syncButtonText }}
      </el-button>
      <el-button
        type="primary"
        @click="handleRefreshFunc"
        :disabled="handleRefreshLoading"
        :loading="handleRefreshLoading"
      >
        手动更新
      </el-button>
      <el-button
        type="primary"
        @click="openEditOversellLimit"
        :disabled="selectedRows.length === 0"
      >
        编辑最大超售量
      </el-button>
    </template>
    <el-table
      v-loading="listLoading"
      :data="transformedList"
      :row-key="getRowKey"
      :tree-props="{ children: 'children' }"
      :default-expand-all="false"
      ref="tableRef"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed reserve-selection />
      <el-table-column
        v-if="shouldShowField('msku')"
        prop="msku"
        label="MSKU"
        min-width="240"
        fixed
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.msku }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('locationCountryCode')"
        prop="locationCountryCode"
        label="库存地点"
        min-width="120"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.locationCountryCode }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="locationId" label="库存地点ID" min-width="120" />
      <el-table-column
        v-if="shouldShowField('inventoryItemId')"
        prop="inventoryItemId"
        label="inventory_item_id"
        min-width="150"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.inventoryItemId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('productName')"
        prop="productName"
        label="产品名称"
        min-width="240"
        fixed
      >
        <template #default="{ row }">
          <OverflowTooltip
            v-if="shouldShowParentRow(row)"
            :content="row.productName || '-'"
            :line="2"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('shopAccount')"
        prop="shop"
        label="店铺账号"
        min-width="160"
      />
      <el-table-column label="更新时间" prop="lastSyncTime" min-width="160" />
      <el-table-column
        v-if="shouldShowField('status')"
        prop="status"
        label="平台在售状态"
        min-width="150"
      >
        <!-- <template #default="{ row }">
          <template v-if="row.children">
            <span v-if="row.status === 'active'" class="badge badge-light-success">在售</span>
            <span v-else-if="row.status === 'draft'" class="badge badge-light-warning">草稿</span>
            <span v-else-if="row.status === 'archived'" class="badge badge-light-danger">已下架</span>
            <span v-else>{{ row.status }}</span>
          </template>
        </template> -->
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('productType')"
        prop="productType"
        label="产品类型"
        min-width="100"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.typeDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('productLine')"
        prop="productLine"
        label="品线"
        min-width="100"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.productLine }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('productCategory')"
        prop="productCategory"
        label="品类"
        min-width="150"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.productCategory }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('tracked')"
        prop="tracked"
        label="跟踪状态"
        min-width="150"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.tracked === 1 ? '跟踪' : '不跟踪' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('stockoutAlertFlag')"
        prop="stockoutAlertFlag"
        label="是否允许缺货售卖"
        min-width="150"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">
            {{ row.inventoryPolicy === 'continue' ? '是' : '否' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('autoSyncStock')"
        prop="autoSyncStock"
        label="是否自动同步库存"
        min-width="150"
      >
        <template #default="{ row }">
          <div v-if="shouldShowParentRow(row)">
            <el-switch
              :model-value="row.autoSyncStock === 1"
              :loading="row._autoSyncStockLoading"
              :disabled="row._autoSyncStockLoading || row.tracked !== 1"
              @change="(val) => handleAutoSyncStockChange(row, val)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('productOperators')"
        prop="productOperatorName"
        label="运营"
        min-width="100"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.productOperatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="安全库存天数" prop="safetyStockDays" min-width="220" />
      <el-table-column label="普船交付周期" prop="generalShipDeliveryDays" min-width="220" />
      <el-table-column label="调仓建议数量" prop="transferSuggestionQuantity" min-width="220" />
      <el-table-column label="缺货预警" prop="stockoutAlertFlag" min-width="220">
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">
            {{ row.stockoutAlertFlag === 1 ? '预警' : '正常' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="可售天数"
        prop="sellableDays"
        min-width="220"
        v-if="shouldShowField('sellableDays')"
      />
      <el-table-column
        v-if="shouldShowField('pushAvailable')"
        prop="pushAvailable"
        label="推送数量"
        min-width="150"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.pushAvailable }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('pushTime')"
        prop="pushTime"
        label="最近推送时间"
        min-width="150"
      >
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">{{ row.pushTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在库在途可售天数" prop="sellableDaySummary" min-width="220" />
      <el-table-column
        v-for="col in visibleStockColumns"
        :key="col.prop"
        :min-width="col.minWidth"
        :sortable="col.sortable"
      >
        <template #header>
          {{ col.label }}
          <el-tooltip placement="top" v-if="col?.tips">
            <template #content>
              <component :is="col?.tips" />
            </template>
            <i class="iconfont icon-xianxingtubiaoxunwen" style="color: var(--bs-success)"></i>
          </el-tooltip>
        </template>
        <template #default="{ row }">
          <span v-if="shouldShowParentRow(row)">
            <span v-if="col.prop === 'inTransitStockQty'">
              {{ row.inTransitStockQty }}
            </span>
            <span v-else>{{ row[col.prop] }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="最大可允许超售量"
        prop="oversellLimit"
        min-width="180"
        v-if="shouldShowField('oversellLimit')"
      >
        <template #default="{ row }">
          <template v-if="shouldShowParentRow(row)">
            <el-input-number
              v-model="row.oversellLimit"
              :min="0"
              :precision="0"
              controls-position="right"
              style="width: 100%"
              @change="handleOversellLimitChange(row)"
            />
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('warehouseName')"
        prop="warehouseName"
        label="仓库"
        min-width="180"
      >
        <template #default="{ row }">
          <span v-if="!row.children">{{ row.warehouseName || row.warehouseCode || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('supplySku')"
        prop="supplySku"
        label="供应链SKU"
        min-width="180"
      >
        <template #default="{ row }">
          <template v-if="!row.children">
            <template v-if="row.skuAvailableMap && Object.keys(row.skuAvailableMap).length">
              <template v-if="Object.keys(row.skuAvailableMap).length === 1">
                <div v-for="(stock, sku) in row.skuAvailableMap" :key="sku">
                  {{ sku }}
                </div>
              </template>
              <el-popover v-else placement="top" :width="400" trigger="hover">
                <template #reference>
                  <div style="display: flex; align-items: center; gap: 4px; cursor: pointer">
                    <span>{{ Object.keys(row.skuAvailableMap)[0] }}</span>
                    <el-icon style="color: #409eff">
                      <ArrowDown />
                    </el-icon>
                  </div>
                </template>
                <div style="padding: 12px">
                  <el-table
                    :data="
                      Object.entries(row.skuAvailableMap || {})
                        .map(([sku, stock]) => ({ sku, stock }))
                        .sort((a, b) => (Number(b.stock) || 0) - (Number(a.stock) || 0))
                    "
                    border
                    max-height="200"
                  >
                    <el-table-column prop="sku" label="供应链SKU" min-width="200" />
                  </el-table>
                </div>
              </el-popover>
            </template>
            <span v-else>-</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="shouldShowField('availableSummary')"
        prop="skuAvailableMap"
        label="可用库存"
        min-width="180"
        align="left"
      >
        <template #default="{ row }">
          <template v-if="!row.children">
            <template v-if="row.skuAvailableMap && Object.keys(row.skuAvailableMap).length">
              <template v-if="Object.keys(row.skuAvailableMap).length === 1">
                <div v-for="(stock, sku) in row.skuAvailableMap" :key="sku">
                  {{ stock }}
                </div>
              </template>
              <el-popover v-else placement="top" :width="400" trigger="hover">
                <template #reference>
                  <div style="display: flex; align-items: center; gap: 4px; cursor: pointer">
                    <span>
                      {{
                        Object.values(row.skuAvailableMap || {}).reduce(
                          (sum: number, val) => sum + (Number(val) || 0),
                          0
                        )
                      }}
                    </span>
                    <el-icon style="color: #409eff">
                      <ArrowDown />
                    </el-icon>
                  </div>
                </template>
                <div style="padding: 12px">
                  <el-table
                    :data="
                      Object.entries(row.skuAvailableMap || {})
                        .map(([sku, stock]) => ({ sku, stock }))
                        .sort((a, b) => (Number(b.stock) || 0) - (Number(a.stock) || 0))
                    "
                    border
                    max-height="200"
                  >
                    <el-table-column prop="sku" label="供应链SKU" min-width="200" />
                    <el-table-column prop="stock" label="可用库存" min-width="120" />
                  </el-table>
                </div>
              </el-popover>
            </template>
            <span v-else>-</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column />
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
  <editOversellLimitDialog ref="editOversellLimitDialogRef" @success="handleOversellLimitSuccess" />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi, platformApi } from '@/api';
  import { useRoute } from 'vue-router';
  import { ElMessage, ElNotification } from 'element-plus';
  import { ArrowDown } from '@element-plus/icons-vue';
  import { debounce } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import TypeSearchInput from '../components/typeSearchInput.vue';
  import editOversellLimitDialog from '../components/editOversellLimitDialog.vue';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';
  import shopifyStockColumn from '../hooks/shopifyStockColumn';
  import { shopifyStockCustomFields } from '../fields/shopifyStockSyncCustomFields';
  import ProductTypeCascader from '../components/productTypeCascader.vue';
  import { useBaseOptions } from '../hooks/useBaseOptions';

  const route = useRoute();
  const {
    outSeaWarehouseOptions,
    getOutSeaWarehouseOptions,
    trackOptions,
    stockOutOperatorList,
    productLineOptions,
    getProductLineOptions,
    autoSyncStockOptions,
    inventoryPolicyOptions,
  } = useBaseOptions();
  const { asyncLoading, syncButtonText, openSync } = useSyncButton({
    loadingButtonText: '更新SKU和库存',
    confirmButtonText: '更新SKU和库存',
    confirmTitle: '确认',
    confirmText:
      '确认要同步Shopify后台SKU数据和库存数据吗？本次操作将更新Shopify后台的MSKU、跟踪状态、是否缺货售卖，并更新库存中心库存数据',
    successMessage: 'shopify后台SKU信息和库存信息更新成功',
    loadingMessage: 'shopify后台SKU信息和库存信息更新中',
    errorMessage: 'shopify后台SKU信息和库存信息更新失败',
    services: cisApi.cisInventoryShopifyLevelSync,
    onSuccess: () => {
      refreshList();
    },
  });

  const searchOptions = [
    {
      label: 'MSKU',
      value: 3,
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
      label: 'inventory_item_id',
      value: 4,
      separator: ',',
      multiple: true,
      placeholder: '请输入inventory_item_id，多个用逗号分隔',
    },
    {
      label: '产品名称',
      value: 2,
      multiple: false,
      placeholder: '请输入产品名称',
    },
  ];
  const typeSearchInputRef = ref<InstanceType<typeof TypeSearchInput>>();
  const tableRef = ref();
  const selectedRows = ref<any[]>([]);
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
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    CisApi.CisInventoryShopifyLevelList.RequestBody & {
      pageSize: number;
      pageNum: number;
    },
    CisApi.CisInventoryShopifyLevelList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      keywordType: 3,
      active: undefined,
      stockOutAlertFlag: undefined,
      tracked: undefined,
      warehouseCodeList: undefined,
      productLineList: undefined,
      productCategoryList: undefined,
      autoSyncStock: undefined,
      productOperatorList: undefined,
      inventoryPolicy: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisInventoryShopifyLevelList,
  });

  const productCategoryListComputed = computed({
    get: () => {
      if (!search?.productCategoryList) {
        return undefined;
      }
      if (Array.isArray(search?.productCategoryList)) {
        const firstItem = search.productCategoryList[0];
        if (typeof firstItem === 'string' && firstItem.includes(':')) {
          return firstItem.split(':');
        }
        return search?.productCategoryList;
      }
      if (typeof search?.productCategoryList === 'string') {
        return search?.productCategoryList ? search?.productCategoryList.split(':') : undefined;
      }
      return undefined;
    },
    set: (val) => {
      if (!val || (Array.isArray(val) && val.length === 0)) {
        search.productCategoryList = undefined;
      } else if (Array.isArray(val)) {
        const joinedString = val.join(':');
        search.productCategoryList = [joinedString] as any;
      } else {
        search.productCategoryList = val;
      }
    },
  });

  const hasVisibleChildColumns = computed(() => {
    return (
      shouldShowField('warehouseName') ||
      shouldShowField('supplySku') ||
      shouldShowField('skuAvailableMap')
    );
  });

  const shouldShowParentRow = (row: any) => {
    return row.children || !hasVisibleChildColumns.value;
  };

  const transformedList = computed(() => {
    if (!listData.value?.list || !Array.isArray(listData.value.list)) {
      return [];
    }
    const hasChildren = hasVisibleChildColumns.value;
    const list = listData.value.list.map((item, parentIndex) => {
      const levelInfo = item.levelInfo || {};
      const summary = item.summary || {};
      const pushLogBean = item.pushLogBean || {};
      const warehouseGroupSummary = item.warehouseGroupSummary || [];

      const flattenedData = {
        ...levelInfo,
        ...summary,
        ...pushLogBean,
        inStockAndInTransit: (summary.inStockQuantity || 0) + (summary.inTransitStockQty || 0),
        _rowKey: `parent_${levelInfo.msku}_${levelInfo.inventoryItemId}_${levelInfo.locationCountryCode}`,
      };

      if (!hasChildren) {
        return flattenedData;
      }

      const children = warehouseGroupSummary
        .map((warehouse, childIndex) => {
          return {
            warehouseName: warehouse.warehouseName,
            warehouseCode: warehouse.warehouseCode,
            skuAvailableMap: warehouse.skuAvailableMap || {},
            _rowKey: `child_${warehouse.warehouseCode}_${warehouse.warehouseName}_${parentIndex}_${childIndex}`,
          };
        })
        .filter((child) => child.warehouseCode);

      const result: any = {
        ...flattenedData,
      };

      if (children.length > 0) {
        result.children = children;
      }
      return result;
    });
    return list;
  });

  const expandAllRows = () => {
    nextTick(() => {
      if (!tableRef.value) return;
      transformedList.value.forEach((row) => {
        if (row.children && row.children.length > 0) {
          tableRef.value?.toggleRowExpansion(row, true);
        }
      });
    });
  };

  watch(transformedList, () => {
    expandAllRows();
  });

  const resetAll = () => {
    if (typeSearchInputRef.value) {
      typeSearchInputRef.value.clear();
    }
    resetSearch();
  };

  const conditionCode = ref<string | null>(null);
  const customFieldList = ref<any[]>([]);

  const queryCustomFieldList = async () => {
    const res = await platformApi.platformSearchQueryConditionList({
      platform: 'lute_erp',
      moduleType: 'list',
      itemType: (route?.name as string) || 'shopifyStockSync',
      pageSize: 1,
      pageNum: 1,
    });

    if (res?.recordList?.length) {
      const hideList = JSON.parse(res?.recordList[0]?.searchCondition || '[]');
      customFieldList.value = shopifyStockCustomFields?.map((item) => {
        return {
          ...item,
          propertyArr: item.propertyArr?.map((k) => {
            return {
              ...k,
              checked: !hideList?.includes(k?.key),
            };
          }),
          checkedArr: item.propertyArr
            ?.filter((item) => !hideList?.includes(item?.key))
            ?.map((k) => k.key),
        };
      });
      conditionCode.value = res?.recordList[0]?.conditionCode || null;
    } else {
      customFieldList.value = shopifyStockCustomFields?.map((item) => {
        return {
          ...item,
          checkedArr: item.propertyArr?.filter((item) => item.checked)?.map((k) => k.key),
        };
      });
    }
  };

  const fieldVisibilityMap = computed(() => {
    const map = new Map<string, boolean>();
    if (!customFieldList.value?.length) {
      return map;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const group of customFieldList.value) {
      if (group.propertyArr) {
        // eslint-disable-next-line no-restricted-syntax
        for (const field of group.propertyArr) {
          if (field.key && !map.has(field.key)) {
            map.set(field.key, field.checked !== false);
          }
        }
      }
    }
    return map;
  });

  const shouldShowField = (fieldKey: string): boolean => {
    if (!fieldKey) {
      return true;
    }
    const visibility = fieldVisibilityMap.value.get(fieldKey);
    return visibility !== false;
  };

  const visibleStockColumns = computed(() => {
    return shopifyStockColumn?.filter((col) => {
      return shouldShowField(col.prop);
    });
  });

  const editOversellLimitDialogRef = ref<InstanceType<typeof editOversellLimitDialog>>();

  const getRowKey = (row: any) => {
    // eslint-disable-next-line no-underscore-dangle
    return row?._rowKey || `fallback_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSelectionChange = (selection: any[]) => {
    selectedRows.value = selection;
  };

  const openEditOversellLimit = () => {
    if (!editOversellLimitDialogRef.value) return;
    if (!selectedRows.value || selectedRows.value.length === 0) {
      ElMessage.warning('请先选择需要编辑的数据');
      return;
    }
    const data = selectedRows.value.map((row) => ({
      msku: row.msku,
      inventoryItemId: row.inventoryItemId,
      locationId: row.locationId,
      locationCountryCode: row.locationCountryCode,
      oversellLimit: row.oversellLimit || 0,
    }));
    editOversellLimitDialogRef.value?.open(data);
  };

  const handleOversellLimitSuccess = () => {
    tableRef.value?.clearSelection();
    refreshList();
  };

  const updateOversellLimit = async (row: any) => {
    try {
      await cisApi.cisInventoryShopifyLevelUpdateOversellLimit({
        saveList: [
          {
            inventoryItemId: Number(row.inventoryItemId),
            locationId: Number(row.locationId),
            oversellLimit: row.oversellLimit ?? 0,
          },
        ],
      });
      runQuery();
      ElMessage.success('更新成功');
    } catch (error: any) {
      console.error('更新超售量失败:', error);
    }
  };

  const handleOversellLimitChange = debounce(updateOversellLimit, 800);

  const initSearchFromRoute = () => {
    const { query } = route;

    if (query.productOperatorList || query.productOperator) {
      const operatorValue = query.productOperatorList || query.productOperator;
      let operatorArray: string[] = [];

      if (Array.isArray(operatorValue)) {
        operatorArray = operatorValue.filter(Boolean).map(String);
      } else if (typeof operatorValue === 'string') {
        try {
          const parsed = JSON.parse(operatorValue);
          if (Array.isArray(parsed)) {
            operatorArray = parsed.filter(Boolean).map(String);
          } else {
            operatorArray = operatorValue.includes(',')
              ? operatorValue.split(',').filter(Boolean)
              : [operatorValue];
          }
        } catch {
          operatorArray = operatorValue.includes(',')
            ? operatorValue.split(',').filter(Boolean)
            : [operatorValue];
        }
      }

      if (operatorArray.length > 0) {
        search.productOperatorList = operatorArray as any;
      }
    }

    if (query.stockOutAlertFlag !== undefined) {
      const alertValue = query.stockOutAlertFlag;
      if (alertValue === '1' || String(alertValue) === '1' || alertValue === '预警') {
        search.stockOutAlertFlag = 1 as any;
      }
    }
  };

  const handleAutoSyncStockChange = async (row: any, value: boolean) => {
    // eslint-disable-next-line no-underscore-dangle
    if (!row || row._autoSyncStockLoading) return;
    if (!row.inventoryItemId || !row.locationId) {
      ElMessage.error('数据不完整，无法修改');
      return;
    }
    const newValue = value ? 1 : 0;
    const oldValue = row.autoSyncStock;

    try {
      // eslint-disable-next-line no-underscore-dangle
      row._autoSyncStockLoading = true;

      await cisApi.cisInventoryShopifyLevelUpdateAutoSyncStock({
        saveList: [
          {
            inventoryItemId: row.inventoryItemId,
            locationId: row.locationId,
            autoSyncStock: newValue,
          },
        ],
      });

      row.autoSyncStock = newValue;
      ElMessage.success('修改成功');
    } catch (error: any) {
      row.autoSyncStock = oldValue;
      ElMessage.error(error?.message || '修改失败，请重试');
    } finally {
      // eslint-disable-next-line no-underscore-dangle
      row._autoSyncStockLoading = false;
    }
  };

  const handleRefreshLoading = ref(false);
  const handleRefreshText = ref('手动更新SKU和库存');
  const notificationInstance = ref<any>();
  const handleRefreshFunc = async () => {
    if (handleRefreshLoading.value) return;
    if (!selectedRows.value.length) {
      ElMessage.warning('请先选择需要同步的数据');
      return;
    }
    try {
      const isConfirmed = await swal.confirm({
        title: '确认',
        text: '确认要手动更新shopify后台库存吗',
      });
      if (!isConfirmed) return;
      const syncList = selectedRows.value
        .filter((e) => {
          return e.inventoryItemId && e.locationId;
        })
        .map((e) => {
          return {
            inventoryItemId: e.inventoryItemId,
            locationId: e.locationId,
          };
        });
      handleRefreshLoading.value = true;
      handleRefreshText.value = '更新中';
      notificationInstance.value = ElNotification({
        title: 'shopify后台库存手动更新中',
        message: `shopify后台库存手动更新中，请稍候...`,
        type: 'info',
        duration: 0,
        showClose: true,
        position: 'top-right',
      });
      await cisApi.cisInventoryShopifyLevelSync(
        {
          syncList,
        },
        {
          timeout: 30000,
        }
      );
      if (notificationInstance.value) {
        notificationInstance.value.close();
        notificationInstance.value = null;
      }
      ElNotification({
        title: '操作成功',
        message: 'shopify后台库存手动更新成功',
        type: 'success',
        duration: 4500,
        position: 'top-right',
      });
    } catch (e) {
      if (notificationInstance.value) {
        notificationInstance.value.close();
        notificationInstance.value = null;
      }
    } finally {
      handleRefreshLoading.value = false;
      handleRefreshText.value = '手动更新SKU和库存';
    }
  };
  onMounted(() => {
    queryCustomFieldList();
    getOutSeaWarehouseOptions();
    getProductLineOptions();
    initSearchFromRoute();
  });
  onActivated(() => {
    refreshList();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__expand-icon) {
    display: none;
  }

  :deep(.el-table__row--level-1) {
    .el-table__cell:first-child .el-checkbox {
      display: none;
    }
  }
</style>
