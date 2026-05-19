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
        v-model="search.siteList"
        placeholder="库存地点"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
        :teleported="false"
        :options="shopifySiteList"
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
        :max-collapse-tags="1"
      />
      <el-select
        placeholder="GTM品线"
        :options="gtmProductLineOptions"
        style="width: 250px"
        v-model="search.gtmProductLineCodeList"
        multiple
        clearable
        filterable
        collapse-tags
        :max-collapse-tags="1"
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
      <el-select placeholder="平台在售状态" clearable v-model="search.platformSaleStatus">
        <el-option :value="PlatformSaleStatus.已激活" label="已激活" />
        <el-option :value="PlatformSaleStatus.草稿" label="草稿" />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="handleRecalculate"
        v-permission="'shopifyStockSyncReCalculate'"
      >
        重新计算库存
      </el-button>
      <el-button type="primary" @click="openImportDialog" v-permission="'shopifyStockSyncImport'">
        导入
      </el-button>
      <el-button
        type="primary"
        @click="handleExport"
        :loading="exportLoading"
        :disabled="exportLoading"
        v-permission="'shopifyStockSyncExport'"
      >
        导出
      </el-button>
      <el-button
        type="primary"
        @click="handleRefreshFunc"
        :disabled="handleRefreshLoading"
        :loading="handleRefreshLoading"
        v-permission="'shopifyStockSyncSkuStock'"
      >
        同步库存
      </el-button>
      <el-button
        type="primary"
        @click="openEditStockSettings"
        :disabled="selectedRows.length === 0"
      >
        编辑
      </el-button>
    </template>
    <stockTable
      ref="tableRef"
      :data="transformedList"
      :columns="visibleColumns"
      :loading="listLoading"
      :show-selection="true"
      :row-key="getRowKey"
      :tree-props="{ children: 'children' }"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <template #productName="{ row }">
        <OverflowTooltip :content="row.productName || '-'" :line="2" />
      </template>
      <template #productType="{ row }">
        <span>{{ row.typeDesc }}</span>
      </template>

      <template #autoSyncStock="{ row }">
        <div>
          <el-switch
            :model-value="row.autoSyncStock === 1"
            :loading="row.autoSyncStockLoading"
            :disabled="row.autoSyncStockLoading || row.tracked !== 1"
            @change="(val) => handleAutoSyncStockChange(row, val)"
          />
        </div>
      </template>

      <template #oversellLimit="{ row }">
        <el-input-number
          v-if="row.allowBackorder === 1"
          v-model="row.oversellLimit"
          :max="200"
          :min="0"
          :precision="0"
          controls-position="right"
          style="width: 100%"
          @change="handleOversellLimitChange(row)"
        />
        <span v-else>0</span>
      </template>
      <template #allowBackorder="{ row }">
        <!-- <el-tag :type="row.allowBackorder === 1 ? 'success' : 'info'">
          {{ row.allowBackorder ? '是' : '否' }}
        </el-tag> -->
        <el-switch
          :model-value="row.allowBackorder === 1"
          :loading="row.allowBackorderLoading"
          :disabled="row.allowBackorderLoading"
          @change="(val) => handleAllowBackorderChange(row, val)"
        />
      </template>
      <template #tracked="{ row }">
        <el-tag :type="row.tracked === 1 ? 'success' : 'info'">
          {{ row.tracked === 1 ? '跟踪' : '不跟踪' }}
        </el-tag>
      </template>
      <template #stockoutAlertFlag="{ row }">
        <el-tag :type="row.stockoutAlertFlag === 1 ? 'success' : 'info'">
          {{ row.stockoutAlertFlag === 1 ? '是' : '否' }}
        </el-tag>
      </template>
      <template #slowMovingAlertFlag="{ row }">
        <el-tag :type="row.slowMovingAlertFlag === 1 ? 'success' : 'info'">
          {{ row.slowMovingAlertFlag === 1 ? '是' : '否' }}
        </el-tag>
      </template>
      <template #oversellAlertFlag="{ row }">
        <el-tag :type="row.oversellAlertFlag === 1 ? 'success' : 'info'">
          {{ row.oversellAlertFlag === 1 ? '是' : '否' }}
        </el-tag>
      </template>
      <template #inStockAndInTransit="{ row }">
        <span>{{ row.inStockAndInTransit > 0 ? row.inStockAndInTransit : 0 }}</span>
      </template>
      <template #actions="{ row }">
        <el-button link @click="handleDetail(row)" type="primary">详情</el-button>
      </template>
    </stockTable>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <editStockSettingsDialog ref="editStockSettingsDialogRef" @success="handleOversellLimitSuccess" />
  <stockImportDialog ref="stockImportDialogRef" @success="refreshList" />
  <shopifyStockSyncDetailDrawer ref="detailDrawerRef" />
</template>

<script setup lang="ts" name="shopifyStockSync">
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi, platformApi } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage, ElNotification } from 'element-plus';
  import * as swal from '@/utils/swal';
  import TypeSearchInput from '../components/typeSearchInput.vue';
  import editStockSettingsDialog from '../components/editStockSettingsDialog.vue';
  import shopifyStockSyncDetailDrawer from '../components/shopifyStockSyncDetailDrawer.vue';
  import stockTable from '../../components/stockTable.vue';
  import { useSyncButton } from '../../thirdStock/hooks/useSyncButton';
  import {
    shopifyStockCustomFields,
    shopifyStockCustomFieldsMap,
  } from '../fields/shopifyStockSyncCustomFields';
  import ProductTypeCascader from '../components/productTypeCascader.vue';
  import stockImportDialog from '../components/stockImportDialog.vue';
  import { useBaseOptions } from '../hooks/useBaseOptions';
  import { useShopifyStockBatchSaver } from '../../hooks/useShopifyStockBatchSaver';
  import { PlatformSaleStatus } from '../enum';

  const route = useRoute();
  const router = useRouter();
  const {
    getOutSeaWarehouseOptions,
    trackOptions,
    stockOutOperatorList,
    productLineOptions,
    getProductLineOptions,
    autoSyncStockOptions,
    inventoryPolicyOptions,

    productTypeOptions,
    shopifySiteList,
    getShopifySiteList,
    gtmProductLineOptions,
    getGtmProductLineOptions,
  } = useBaseOptions();
  // const { asyncLoading, syncButtonText, openSync } = useSyncButton({
  //   loadingButtonText: '重新计算库存',
  //   confirmButtonText: '重新计算库存',
  //   confirmTitle: '确认',
  //   confirmText: '确认重新计算库存？',
  //   successMessage: '库存重新计算成功',
  //   loadingMessage: '库存重新计算中',
  //   errorMessage: '库存重新计算失败',
  //   services: cisApi.cisInventoryShopifyLevelSync,
  //   onSuccess: () => {
  //     refreshList();
  //   },
  // });

  const searchOptions = [
    {
      label: 'MSKU',
      value: 3,
      multiple: false,
      placeholder: '请输入MSKU',
    },
    // {
    //   label: '供应链SKU',
    //   value: 1,
    //   separator: ',',
    //   multiple: true,
    //   placeholder: '请输入供应链SKU，多个用逗号分隔',
    // },
    {
      label: 'shopify存货编码',
      value: 4,
      separator: ',',
      multiple: true,
      placeholder: '请输入shopify存货编码，多个用逗号分隔',
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
  const selectedRowKeys = ref<string[]>([]);
  const getRowShopAccount = (row: any) => row?.shopAccount || row?.shop;
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
      gtmProductLineCodeList: undefined,
      keyword: undefined,
      keywordType: 3,
      // active: undefined,
      stockOutAlertFlag: undefined,
      tracked: undefined,
      // warehouseCodeList: undefined,
      productLineList: undefined,
      productCategoryList: undefined,
      autoSyncStock: undefined,
      productOperatorList: undefined,
      inventoryPolicy: undefined,
      siteList: undefined,
      productType: undefined,
      platformSaleStatus: PlatformSaleStatus.已激活,
      orderByAsc: undefined,
      orderByColumn: undefined,
    },
    pageSize: PAGE_SIZE,
    service: cisApi.cisInventoryShopifyLevelList,
  });
  // 品类级联选择器
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
        return search?.productCategoryList ? search?.productCategoryList?.split(':') : undefined;
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

  const transformedList = computed(() => {
    if (!listData.value?.list || !Array.isArray(listData.value.list)) {
      return [];
    }
    return listData.value.list.map((item: any) => {
      return {
        ...item,
        inStockAndInTransit: (item.inStockQuantity || 0) + (item.inTransitStockQty || 0),
        rowKey: `row_${item.msku}_${item.inventoryItemId}_${item.locationCountryCode}`,
      };
    });
  });

  const conditionCode = ref<string | null>(null);
  const customFieldList = ref<any[]>([]);
  // 查询自定义字段列表
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
            ?.filter((field) => !hideList?.includes(field?.key))
            ?.map((k) => k.key),
        };
      });
      conditionCode.value = res?.recordList[0]?.conditionCode || null;
    } else {
      customFieldList.value = shopifyStockCustomFields?.map((item) => {
        return {
          ...item,
          checkedArr: item.propertyArr?.filter((field) => field.checked)?.map((k) => k.key),
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

  const visibleColumns = computed(() => {
    const visibleKeys = Array.from(fieldVisibilityMap.value.entries())
      .filter(([, visible]) => visible)
      .map(([key]) => key);
    const columns = shopifyStockCustomFieldsMap(visibleKeys);
    columns.push({
      prop: 'actions',
      label: '操作',
      width: 100,
      slot: 'actions',
      fixed: 'right',
    });
    return columns;
  });

  const editStockSettingsDialogRef = ref<InstanceType<typeof editStockSettingsDialog>>();
  const stockImportDialogRef = ref<InstanceType<typeof stockImportDialog>>();
  const handleSortChange = (sort: any) => {
    const { order, prop } = sort;
    if (!order) {
      search.orderByColumn = undefined;
      search.orderByAsc = undefined;
      return;
    }
    search.orderByColumn = prop;
    if (order === 'ascending') {
      search.orderByAsc = true;
    } else if (order === 'descending') {
      search.orderByAsc = false;
    }
  };

  const getRowKey = (row: any) => {
    if (row?.rowKey) {
      return row.rowKey;
    }
    return `fallback_${row?.msku || ''}_${row?.inventoryItemId || ''}_${
      row?.locationCountryCode || ''
    }`;
  };

  const handleSelectionChange = (selection: any[]) => {
    selectedRows.value = selection;
    selectedRowKeys.value = selection.map((row) => getRowKey(row));
  };

  const openImportDialog = () => {
    stockImportDialogRef.value?.open({
      title: '导入库存',
      uploadService: cisApi.cisCommonFileImportData,
      templateService: cisApi.cisCommonFileQueryImportTemplate,
      importScene: 'shopify_inventory_level',
    });
  };

  const openEditStockSettings = () => {
    if (!editStockSettingsDialogRef.value) return;
    if (!selectedRows.value || selectedRows.value.length === 0) {
      ElMessage.warning('请先选择需要编辑的数据');
      return;
    }

    const latestRowMap = new Map(transformedList.value.map((row: any) => [getRowKey(row), row]));
    const latestSelectedRows = selectedRowKeys.value
      .map((key) => latestRowMap.get(key))
      .filter(Boolean) as any[];
    const sourceRows = latestSelectedRows.length > 0 ? latestSelectedRows : selectedRows.value;

    const data = sourceRows.map((row) => ({
      msku: row.msku,
      inventoryItemId: row.inventoryItemId,
      locationId: row.locationId,
      locationCountryCode: row.locationCountryCode,
      shopAccount: getRowShopAccount(row),
      tracked: row.tracked,
      oversellLimit: row.oversellLimit || 0,
      allowBackorder: row.allowBackorder,
      autoSyncStock: row.autoSyncStock,
    }));
    editStockSettingsDialogRef.value?.open(data as any);
  };

  const { updateOversellLimit, updateAutoSyncStock, updateAllowBackorder } =
    useShopifyStockBatchSaver({
      onRefresh: () => {
        runQuery();
      },
    });

  const handleAllowBackorderChange = (row: any, val: boolean) => {
    updateAllowBackorder(row, val);
  };

  const handleAutoSyncStockChange = (row: any, val: boolean) => {
    updateAutoSyncStock(row, val);
  };
  const handleOversellLimitChange = (row: any) => {
    updateOversellLimit(row.inventoryItemId, row.locationId, row.oversellLimit ?? 0);
  };
  const handleOversellLimitSuccess = () => {
    tableRef.value?.clearSelection();
    refreshList();
  };
  // 从路由 query 中还原部分筛选条件，支持从其他页面带筛选跳转过来
  const initSearchFromRoute = () => {
    const { query } = route;

    // 解析运营人筛选：兼容数组、JSON 字符串、逗号分隔字符串等多种格式
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
          // 非 JSON 字符串时，按逗号分隔或单个字符串处理
          operatorArray = operatorValue.includes(',')
            ? operatorValue.split(',').filter(Boolean)
            : [operatorValue];
        }
      }

      if (operatorArray.length > 0) {
        search.productOperatorList = operatorArray as any;
      }
    }

    // 解析缺货预警筛选：支持 '1' 和 '预警' 等多种传参形式
    if (query.stockOutAlertFlag !== undefined) {
      const alertValue = query.stockOutAlertFlag;
      if (alertValue === '1' || String(alertValue) === '1' || alertValue === '预警') {
        search.stockOutAlertFlag = 1 as any;
      }
    }
  };
  const handleRefreshLoading = ref(false);
  const handleRefreshText = ref('同步库存');
  const notificationInstance = ref<any>();
  const handleRecalculate = async () => {
    // if (!selectedRows.value.length) {
    //   ElMessage.warning('请先选择需要重新计算的数据');
    //   return;
    // }
    // const shopAccountList = Array.from(
    //   new Set(selectedRows.value.map((row) => getRowShopAccount(row)).filter(Boolean))
    // );
    // if (!shopAccountList.length) {
    //   ElMessage.warning('所选数据缺少店铺账号，无法重新计算');
    //   return;
    // }
    // if (shopAccountList.length > 1) {
    //   ElMessage.warning('重新计算库存仅支持同一店铺账号，请重新选择');
    //   return;
    // }
    const isConfirmed = await swal.confirm({
      title: '确认',
      text: '确认要重新计算库存吗',
    });
    if (!isConfirmed) return;
    await cisApi.cisInventoryShopifyLevelSync({});
    ElNotification({
      title: '操作成功',
      message: '库存重新计算成功，请耐心等待1-3分钟后刷新页面',
      type: 'success',
      duration: 4500,
      position: 'top-right',
    });
  };
  // 手动更新
  const handleRefreshFunc = async () => {
    if (handleRefreshLoading.value) return;
    if (!selectedRows.value.length) {
      ElMessage.warning('请先选择需要同步的数据');
      return;
    }
    try {
      const isConfirmed = await swal.confirm({
        title: '确认',
        text: '确认要同步shopify后台库存吗',
      });
      if (!isConfirmed) return;
      const shopAccountList = Array.from(
        new Set(selectedRows.value.map((row) => getRowShopAccount(row)).filter(Boolean))
      );
      if (!shopAccountList.length) {
        ElMessage.warning('所选数据缺少店铺账号，无法同步');
        return;
      }
      if (shopAccountList.length > 1) {
        ElMessage.warning('同步库存仅支持同一店铺账号，请重新选择');
        return;
      }
      const syncList = selectedRows.value
        .filter((e) => {
          return e.inventoryItemId && e.locationId && getRowShopAccount(e);
        })
        .map((e) => {
          return {
            inventoryItemId: e.inventoryItemId,
            locationId: e.locationId,
            shopAccount: getRowShopAccount(e),
          };
        });
      if (!syncList.length) {
        ElMessage.warning('所选数据缺少店铺账号，无法同步');
        return;
      }
      handleRefreshLoading.value = true;
      handleRefreshText.value = '更新中';
      notificationInstance.value = ElNotification({
        title: 'shopify后台库存同步中',
        message: `shopify后台库存同步中，请稍候...`,
        type: 'info',
        duration: 0,
        showClose: true,
        position: 'top-right',
      });
      await cisApi.cisInventoryShopifyLevelSync(
        {
          // shopAccount: shopAccountList[0],
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
        message: 'shopify后台库存同步成功',
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
      handleRefreshText.value = '同步库存';
    }
  };

  const resetAll = () => {
    if (typeSearchInputRef.value) {
      typeSearchInputRef.value.clear();
    }
    if (tableRef.value) {
      tableRef.value.clearSelection();
      tableRef.value.clearSort();
    }
    search.orderByAsc = undefined;
    search.orderByColumn = undefined;
    resetSearch();
  };

  const exportLoading = ref(false);
  const detailDrawerRef = ref();
  const handleDetail = (row: any) => {
    detailDrawerRef.value?.open({
      ...row,
      shopAccount: getRowShopAccount(row),
    });
  };

  const buildExportParams = () => {
    const params: any = {
      ...search,
      pageNum: current.value,
      pageSize: pageSize.value,
    };

    // 数字类枚举字段，防止字符串需要转为 number
    const numberKeys = [
      'keywordType',
      'autoSyncStock',
      'stockOutAlertFlag',
      'tracked',
      'productType',
    ];
    numberKeys.forEach((key) => {
      const val = params[key];
      if (val === '' || val === null || val === undefined) {
        params[key] = undefined;
      } else {
        const n = Number(val);
        params[key] = Number.isNaN(n) ? undefined : n;
      }
    });

    // 多选字段，保证为数组或 undefined
    const arrayKeys = [
      'warehouseCodeList',
      'productLineList',
      'productCategoryList',
      'productOperatorList',
      'siteList',
    ];
    arrayKeys.forEach((key) => {
      const val = params[key];
      if (!val || (Array.isArray(val) && val.length === 0)) {
        params[key] = undefined;
      } else if (!Array.isArray(val)) {
        params[key] = [val];
      }
    });

    return params;
  };

  const handleExport = async () => {
    try {
      if (exportLoading.value) return;
      const isConfirmed = await swal.confirm({
        title: '确认',
        text: '确定要导出吗？',
      });
      if (!isConfirmed) return;

      exportLoading.value = true;
      const res = await cisApi.cisInventoryShopifyLevelExport(buildExportParams() as any);
      const isConfirmedExport = await swal.confirm({
        icon: 'success',
        title: '导出成功，具体请前往下载中心查看',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmedExport) return;

      await nextTick();
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
    } catch (error: any) {
      ElMessage.error(error?.message || '导出失败，请重试');
    } finally {
      exportLoading.value = false;
    }
  };
  onMounted(() => {
    queryCustomFieldList();
    getOutSeaWarehouseOptions();
    getProductLineOptions();
    initSearchFromRoute();
    getShopifySiteList();
    getGtmProductLineOptions();
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
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 12px;
  }
</style>
