<template>
  <el-drawer
    class="detail-drawer"
    v-model="showDetail"
    direction="rtl"
    :size="drawerWid"
    :show-close="false"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
    @closed="handleDrawerClosed"
  >
    <template #header>
      <div class="detail-title">
        <div class="t1">库存同步详情</div>
        <div class="table-item-header">
          <div class="item pl16">
            <span class="header-label">MSKU：</span>
            {{ stockSyncDetail.levelInfo?.msku || '-' }}
          </div>
          <div class="item ml20">
            <span class="header-label">库存地点：</span>
            {{ stockSyncDetail.levelInfo?.locationCountryCode || '-' }}
          </div>
        </div>
        <div class="tool">
          <el-tooltip content="关闭" placement="top">
            <i class="iconfont icon-guanbi cursor-pointer" @click="quit"></i>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div>
      <div class="detail-title2">详细信息</div>
      <div class="tabwrap">
        <div class="wrap1">
          <div class="detail-title3">基础信息</div>
          <el-row>
            <el-col v-for="item in basicFields" :key="item.key" :span="8" class="flexbox">
              <ItemLabel
                :fontSize="13"
                :label="item.label"
                :value="formatValue(stockSyncDetail.levelInfo?.[item.key])"
              />
            </el-col>
          </el-row>
        </div>
        <div class="wrap1 nobd">
          <div class="detail-title3">库存信息</div>
          <el-row>
            <el-col v-for="item in stockFields" :key="item.key" :span="8" class="flexbox">
              <ItemLabel
                :fontSize="13"
                :label="item.label"
                :value="formatValue(stockSyncDetail.levelInfo?.[item.key])"
              />
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="detail-title2">数据详情</div>
      <el-tabs v-model="activeTab" class="detail-tabs" v-loading="detailLoading">
        <el-tab-pane label="库存详情" name="stock">
          <el-table
            :data="stockSyncDetail.warehouseDetails"
            border
            style="width: 100%"
            max-height="500"
          >
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column prop="warehouse" label="仓库" min-width="180" />
            <el-table-column prop="supplySku" label="供应链SKU" min-width="150" />
            <el-table-column prop="skuCode" label="产品SKU" min-width="150" />
            <el-table-column prop="skuName" label="产品名称" min-width="150" />
            <el-table-column
              prop="inStockAndTransit"
              label="在库在途"
              min-width="130"
              align="right"
              sortable
            />
            <el-table-column
              prop="inTransitQuantity"
              label="在途库存"
              min-width="130"
              align="right"
              sortable
            />
            <el-table-column
              prop="reservedQuantity"
              label="预占库存"
              min-width="130"
              align="right"
              sortable
            />
            <el-table-column
              prop="availableQuantity"
              label="可用库存"
              min-width="130"
              align="right"
              sortable
            />
            <el-table-column prop="invAge0To30Days" label="0-30" min-width="80" align="right" />
            <el-table-column prop="invAge31To60Days" label="31-60" min-width="80" align="right" />
            <el-table-column prop="invAge61To90Days" label="61-90" min-width="80" align="right" />
            <el-table-column prop="invAgeOver90Days" label="大于90" min-width="80" align="right" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="同步记录" name="sync">
          <el-table :data="stockSyncDetail.pushLogs" border style="width: 100%" max-height="500">
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column prop="lastPushTime" label="时间" min-width="160" />
            <el-table-column prop="pushQuantity" label="同步数量" min-width="80" align="center" />
            <el-table-column prop="pushStatusDesc" label="同步状态" min-width="80">
              <template #default="{ row }">
                <el-tag :type="row.pushStatusDesc === '成功' ? 'success' : 'danger'" size="small">
                  {{ row.pushStatusDesc }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="errorMessage" label="错误信息" min-width="300" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
  import { CisApi, cisApi } from '@/api';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ItemLabel.vue';

  const activeTab = ref('stock');

  const basicFields = [
    { label: '店铺SKU', key: 'msku' },
    { label: '产品名称', key: 'productName' },
    { label: '库存地点', key: 'locationName' },
    { label: '库存地点编码', key: 'locationCountryCode' },
    { label: 'Shopify存货编码', key: 'inventoryItemId' },
    { label: '店铺账号', key: 'shop' },
    { label: '平台在售状态', key: 'statusDesc' },
    { label: '产品类型', key: 'typeDesc' },
    { label: '品线', key: 'productLine' },
    { label: '品类', key: 'productCategory' },
    { label: '运营', key: 'productOperatorName' },
    { label: '跟踪状态', key: 'tracked' },
    { label: '库存同步', key: 'autoSyncStock' },
  ];

  const stockFields = [
    { label: '在库在途库存', key: 'inTransitStockQty' },
    { label: '在途库存', key: 'inTransitQty' },
    { label: '可用库存', key: 'available' },
    { label: '缺货售卖', key: 'allowBackorder' },
    { label: '最大允许超售量', key: 'oversellLimit' },
    { label: '可售库存', key: 'saleableStockQty' },
    { label: '4周销售预测均值', key: 'recent4wSaleAvg' },
    { label: '可售天数', key: 'sellableDays' },
    { label: '在库在途可售天数', key: 'sellableDaysWithTransit' },
    { label: '未配货数量', key: 'unallocatedQuantity' },
    { label: '安全库存天数', key: 'safetyStockDays' },
    { label: '普船海运周期', key: 'generalShipDeliveryDays' },
    { label: '缺货数量', key: 'stockoutTransferQuantity' },
    { label: '调仓建议数量', key: 'transferSuggestionQuantity' },
    { label: '缺货预警', key: 'stockoutAlertFlagDesc' },
    { label: '呆滞预警', key: 'slowMovingAlertFlagDesc' },
    { label: '超售预警', key: 'oversellAlertFlagDesc' },
  ];

  const showDetail = ref(false);
  const drawerWid = ref(900);
  const currentRow = ref<any>(null);

  const detailLoading = ref(false);
  const stockSyncDetail = reactive<CisApi.CisInventoryShopifyLevelDetail.ResponseBody>({
    levelInfo: {},
    pushLogs: [],
    warehouseDetails: [],
  });

  const formatValue = (val: any) => {
    if (val === null || val === undefined || val === '') return '-';
    return String(val);
  };

  const clearData = () => {
    stockSyncDetail.levelInfo = {};
    stockSyncDetail.pushLogs = [];
    stockSyncDetail.warehouseDetails = [];
  };

  type LevelInfoDTO = Record<string, any>;
  type LevelInfoVM = Record<string, any>;

  const mapBoolText = (val: unknown, trueText: string, falseText: string) => {
    if (val) return trueText;
    if (!val) return falseText;
    return '-';
  };
  // 映射字段
  const levelInfoMappers = {
    tracked: (s: LevelInfoDTO) => mapBoolText(s.tracked, '是', '否'),
    autoSyncStock: (s: LevelInfoDTO) => mapBoolText(s.autoSyncStock, '是', '否'),
    oversellAlertFlag: (s: LevelInfoDTO) => mapBoolText(s.oversellAlertFlag, '是', '否'),
    allowBackorder: (s: LevelInfoDTO) => mapBoolText(s.allowBackorder, '是', '否'),
  } satisfies Record<string, (src: LevelInfoDTO) => any>;
  function mapLevelInfo(src?: LevelInfoDTO | null): LevelInfoVM {
    const s = src ?? {};

    const vm: LevelInfoVM = { ...s };

    Object.entries(levelInfoMappers).forEach(([key, fn]) => {
      vm[key] = fn(s);
    });
    return vm;
  }
  const loadStockDetail = async () => {
    if (!currentRow.value?.inventoryItemId || !currentRow.value?.locationId) return;
    detailLoading.value = true;
    try {
      const res = await cisApi.cisInventoryShopifyLevelDetail({
        inventoryItemId: Number(currentRow.value?.inventoryItemId),
        locationId: String(currentRow.value?.locationId),
        shopAccount: currentRow.value?.shopAccount || currentRow.value?.shop,
      });
      stockSyncDetail.levelInfo = mapLevelInfo(res.levelInfo);
      stockSyncDetail.pushLogs = res.pushLogs || [];
      stockSyncDetail.warehouseDetails = res.warehouseDetails || [];
    } catch (error) {
      clearData();
    } finally {
      detailLoading.value = false;
    }
  };
  // 字段映射

  const open = (row: any) => {
    currentRow.value = row;
    showDetail.value = true;
    activeTab.value = 'stock';
    loadStockDetail();
  };

  const quit = () => {
    showDetail.value = false;
  };

  const handleDrawerClosed = () => {
    currentRow.value = null;
    clearData();
  };

  defineExpose({ open, clearData });
</script>

<style lang="scss" scoped>
  .detail-title {
    height: 56px;
    background-color: #fff;
    line-height: 56px;
    padding: 0 20px;
    display: flex;
    color: #1f1f1f;

    .t1 {
      color: #1f1f1f;
      font-size: 16px;
      font-family: 'PingFang SC Medium';
    }

    .table-item-header {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 12px;

      .header-label {
        color: #999999;
      }

      .item {
        display: flex;
        align-items: center;
      }
    }

    .tool {
      line-height: 54px;
      color: #999999;

      i {
        font-size: 16px;
        cursor: pointer;

        &:hover {
          color: #02b96b;
        }
      }
    }
  }

  .detail-title2 {
    color: #1f1f1f;
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    line-height: 24px;
    padding: 26px 20px 7px;
    background-color: white;
  }

  .detail-title3 {
    color: #1f1f1f;
    font-size: 14px;
    font-family: 'PingFang SC Medium';
    line-height: 22px;
    padding: 20px 0 12px;
  }

  .tabwrap {
    padding: 0 20px;
  }

  .wrap1 {
    padding-bottom: 14px;
    border-bottom: solid 1px #f5f5f5;
  }

  .nobd {
    border: none;
  }

  .flexbox {
    display: flex;
    font-size: 13px;
    line-height: 22px;
    padding-bottom: 6px;
    color: #1f1f1f;
  }

  .pl16 {
    padding-left: 16px;
  }

  .ml20 {
    margin-left: 20px;
  }

  .detail-tabs {
    padding: 0 20px 20px;

    :deep(.el-tabs__header) {
      margin-bottom: 16px;
    }

    :deep(.el-table) {
      font-size: 13px;
    }
  }
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 12px;
  }
</style>

<style lang="scss">
  .detail-drawer {
    .el-drawer__header {
      padding: 0 !important;
      margin: 0 !important;
    }

    .el-drawer__body {
      padding: 0 !important;
    }
  }
</style>
