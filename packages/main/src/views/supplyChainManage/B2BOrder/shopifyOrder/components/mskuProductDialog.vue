<template>
  <el-dialog align-center :model-value="visible" @close="$emit('close')" width="1200px" top="1vh">
    <template #header>
      <div class="dialog-title">{{ title }}</div>
    </template>
    <!-- <div class="card card-flush"> -->
    <div class="d-flex align-items-center search">
      <!-- <el-select
        v-model="search.deliveryCode"
        placeholder="发货方式"
        clearable
        @change="tableRef?.clearSelection()"
        style="width: 132px"
      >
        <el-option :value="1" label="FBA" />
        <el-option :value="2" label="中仓直发" />
        <el-option :value="3" label="海外仓直发" />
      </el-select> -->
      <!-- <div class="input-wrap"> -->
      <!-- <el-input v-model="search.keyword" placeholder="请输入MSKU/供应链SKU" style="width: 232px"> -->
      <!-- <el-input
          v-model="search.keyword"
          placeholder="渠道唯一标识/产品SKU/供应链SKU"
          style="width: 260px"
        >
          <template #suffix>
            <i class="iconfont icon-sousuo1"></i>
          </template>
        </el-input>
      </div> -->
    </div>
    <div class="card-body pt-0 tablewrap">
      <el-table
        max-height="460px"
        ref="tableRef"
        class-name="table-row-dashed"
        v-loading="listLoading"
        :data="listData?.saleSkuBeanList"
        row-key="uniqueCode"
        @select="handleSelect"
        @selection-change="handleSingleSelectionChange"
        :border="true"
        height="460"
        row-class-name="cellheight"
        header-cell-class-name="hdcell"
      >
        <el-table-column label="单选" width="28" v-if="selectOne">
          <template #default="scope">
            <el-radio
              v-model="currentRow"
              :label="scope.row"
              :disabled="scope.row.skuCode && selectedRow?.skuCode === scope.row.skuCode"
            >
              {{}}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column v-else type="selection" width="40" reserve-selection />
        <!-- <el-table-column label="产品信息" min-width="260">
          <template #default="{ row }">
            <div class="product-item">
              <div class="left">
                <img
                  v-if="row?.productImageUrl"
                  class="product-img"
                  :src="row?.productImageUrl"
                  alt=""
                />
                <img v-else class="product-img" src="@/assets/images/system/empty.png" alt="" />
                <div>
                  <div class="product-title">
                    <OverflowTooltip :content="row?.productName" :line="1" :font-size="13" />
                  </div>
                  <div class="product-sku">
                    <span class="item-label">MSKU：</span>
                    {{ row?.sellerSku }}
                  </div>
                  <div class="product-sku">
                    <span class="item-label">ASIN：</span>
                    {{ row?.asin }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <template v-if="customerCode || isRequisition">
          <el-table-column prop="selfInventory" label="自营仓可用库存" min-width="140" />
          <el-table-column prop="overseasInventory" label="海外仓可用库存" min-width="140" />
          <el-table-column label="库存详情" fixed="right" min-width="80">
            <template #default="{ row }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '明细',
                    key: 'detail',
                    type: 'primary',
                    row: row,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
        </template>
        <el-table-column v-else prop="stockQuantity" label="可用库存" min-width="130" /> -->

        <el-table-column label="渠道唯一标识" min-width="250" fixed>
          <template #header>
            渠道唯一标识
            <el-tooltip content="亚马逊为子ASIN、其他渠道为店铺SKU" placement="top" effect="dark">
              <el-icon>
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </template>
          <template #default="{ row }">
            <div class="d-flex align-items-center pe-5">
              <span class="text-gray-700 fw-bold">
                渠道唯一标识：{{ row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode }}
              </span>
              <Copy :content="row.saleSkuCode === 'NaN' ? row.msku : row.saleSkuCode" />
            </div>
            <div class="d-flex align-items-center pe-5">
              <span class="text-gray-700 fw-bold">
                店铺SKU：{{ row.channel?.startsWith('amazon') ? row.msku : row.saleSkuCode }}
              </span>
              <Copy :content="row.channel?.startsWith('amazon') ? row.msku : row.saleSkuCode" />
            </div>
          </template>
        </el-table-column>
        <!--      <el-table-column label="店铺SKU" prop="msku" min-width="150">
                <template #default="{ row }">
                  <span>{{ row.msku || '&#45;&#45;' }}</span>
                </template>
              </el-table-column>-->
        <el-table-column label="产品SKU*数量" min-width="190" v-if="search.status !== 1">
          <template #default="{ row }">
            <div v-if="[2, 3]?.includes(row.status)">--</div>
            <div
              v-else
              class="d-flex gap-2 align-items-center"
              v-for="(item, index) in row.skuRelationList"
              :key="index"
            >
              <el-button type="primary" link @click="toSkuList(item.skuCode, item.productType)">
                {{ item.skuCode }}
              </el-button>
              <Copy :content="item.skuCode" />
              <span v-if="item.skuCode">*</span>
              <span v-else>--</span>
              <span class="text-gray-400">{{ item.skuQty }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应链SKU*数量" min-width="190">
          <template #default="{ row }">
            <div
              class="d-flex gap-2 align-items-center"
              v-for="(item, index) in row.skuRelationList"
              :key="index"
            >
              <span>{{ item.productSku }}</span>
              <Copy :content="item.productSku" />
              <span v-if="item.productSku">*{{ item.skuQty }}</span>
              <span v-else>--</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="channelName" label="渠道" />
        <el-table-column prop="userAccount" label="店铺账号" min-width="190" />
        <el-table-column prop="siteName" label="站点" />
        <el-table-column prop="typeDesc" label="类型" v-if="search.status !== 1" width="95">
          <template #default="{ row }">
            <span class="badge" :class="'badge-light-primary'">
              {{ row?.typeDesc }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="运营" prop="operatorName" />
        <el-table-column label="备注" prop="remark" min-width="120">
          <template #default="{ row }">
            <OverflowTooltip :content="row?.remark" :line="3" />
          </template>
        </el-table-column>
        <el-table-column prop="sourceDesc" label="来源" /> -->
        <template #empty>
          <div class="flex-align flex-center">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
          </div>
          <div class="text">暂无数据</div>
        </template>
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- </div> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- @close="handleProductDialogClose"
    :selected-rows="form.itemInfoList" -->
  <StockDetailDialog
    :countryCode="props.countryCode"
    :customerCode="props.customerCode"
    :currencyCode="props.currencyCode"
    :salesmanCode="props.salesmanCode"
    :searchErpQuotation="true"
    v-if="stockDetailDialog"
    :visible="stockDetailDialog"
    @close="handleProductDialogClose"
    confirm-text="确认"
    title="库存明细"
    type="supplierSku"
    :sku="selectSku"
  />
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { metaApi, productApi, ProductApi, ProductContracts, omsApi, OmsApi } from '@/api/index';
  import StockDetailDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/stockDetailDialog.vue';

  const stockDetailDialog = ref(false);
  const selectSku = ref();
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      selectSku.value = row;
      // console.log('明细', row, selectSku.value);
      stockDetailDialog.value = true;
    }
  };
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    stockDetailDialog.value = false;
  };
  const props = withDefaults(
    defineProps<{
      countryCode?: string;
      customerCode?: string;
      currencyCode?: string;
      title: string;
      userCode?: string;
      brandCode?: string;
      searchErpQuotation?: boolean;
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      confirmText?: string;
      isRequisition?: boolean;
      salesmanCode?: string;
      msku?: any;
      row?: any;
      warehousecode?: any;
    }>(),
    {
      selectOne: false,
      confirmText: '关联商品',
      title: '选择商品',
    }
  );

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any, deliveryCode?: number): void;
  }>();
  // console.log('props', '产品弹窗');
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
    // searchData,
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
    // selectedKeys,
  } = useList<
    // ProductApi.LuteosProductSkuQueryProductSkuList.RequestQuery,
    // ProductApi.LuteosProductSkuQueryProductSkuList.ResponseBody,
    OmsApi.OmsCommonStockQueryAmazonMskuStock.RequestQuery,
    OmsApi.OmsCommonStockQueryAmazonMskuStock.ResponseBody
  >({
    searchDefaults: {
      // countryCode: props.countryCode,
      // customerCode: props.customerCode,
      // currencyCode: props.currencyCode,
      // brandCode: props.brandCode,
      // searchInventory: true,
      // searchErpQuotation: props.searchErpQuotation,

      // keyword: props.msku ?? undefined,
      // luteWarehouseCode: props.warehousecode ?? undefined,
      channel: props.row.channel ?? undefined,
      site: props.row.site ?? undefined,
      userAccount: props.row.shopAccount ?? undefined,

      saleSkuCode: props.msku ?? undefined,
      //  keyword: 'CL-BN07',
      // warehouseCode: "conglin_US"
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => {
    //   console.log(searchData, props.countryCode);
    //   return {
    //     ...searchData,
    //     countryCode: props.countryCode,
    //   };
    // },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSaleSkuQuerySaleSkuList,
    // service: omsApi.omsCommonStockQueryAmazonMskuStock,
  });
  const currentRow = ref<any[]>([]);
  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows
        ?.filter((item) => {
          return (
            props.selectedRows.indexOf(item) ===
            props.selectedRows.findIndex((other) => other.msku === item.msku)
          );
        })
        ?.forEach((row) => {
          tableRef.value!.toggleRowSelection(row);
        });
      /* props.selectedRows.forEach((row) => {
   tableRef.value!.toggleRowSelection(row);
 }); */
    }
  };
  setSelectedRows();

  // 勾选商品
  const totalList = ref([]);

  // 寄样选择商品校验
  const handleSelect = async (selection, row) => {
    if (props.userCode && selection.some((item) => item.skuCode === row.skuCode)) {
      await metaApi.luteosMetaV3SampleorderCheckSampleSpu({
        spuCodeList: row.productSpu,
        userCode: props.userCode,
      });
    }
  };

  const handleSelectionChange = (list) => {
    // console.log('selectedlist', list)
    totalList.value = list;
  };
  const handleSingleSelectionChange = (selection) => {
    console.log('selection', selection);
    // totalList.value = list;
    if (selection.length > 1) {
      // 获取最后选中的行
      // const lastSelected = selection[selection.length - 1];
      const lastSelected = selection.length > 5 ? selection[0] : selection[selection.length - 1];
      // 清空所有选中
      tableRef.value.clearSelection();
      // 重新选中最后一行
      tableRef.value.toggleRowSelection(lastSelected, true);
      // currentRow.value = lastSelected;
      totalList.value = [lastSelected];
    } else if (selection.length === 1) {
      // currentRow.value = selection[0];
      totalList.value = selection;
    } else {
      // currentRow.value = null;
    }
  };

  // 选择商品
  const handleSave = () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个商品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit(
        'close',
        true,
        props.selectOne ? totalList.value[0] : totalList.value,
        search.deliveryCode
      );
    } else {
      ElMessage.warning({
        message: '未选择商品',
        duration: 5 * 1000,
      });
    }
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };
</script>

<style scoped lang="scss">
  .dialog-title {
    color: #1f1f1f;
    font-size: 16px;
    font-style: normal;
    font-family: 'PingFang SC Medium';
    font-weight: normal;
    line-height: 24px;
  }
  .search {
    padding-bottom: 20px;
    .input-wrap {
      margin-left: 12px;
    }
  }
  .tablewrap {
    border-radius: 10px 10px 0px 0px !important;
    overflow: hidden;
    .product-item {
      // display: flex;
      // gap: 10px;
      .left {
        display: flex;
        gap: 13px;
        .product-img {
          width: 48px;
          height: 50px;
          border-radius: 8px;
        }
        .product-title {
          padding-bottom: 1px;
          flex: 1 0;
        }
        .product-sku {
          margin-top: 2px;
          .item-label {
            flex-shrink: 0;
            color: #999999;
          }
        }
      }
    }
  }
  :deep(.el-table__empty-text) {
    width: auto !important;
  }
  :deep(.el-table) {
    // border-bottom: solid 1px #f5f5f5;
    .vtop {
      vertical-align: top;
    }
    .el-table__cell > .cell {
      line-height: 20px !important;
      padding-left: 12px !important;
    }
    .hdcell {
      padding: 0 !important;
      color: #1f1f1f;
      font-family: 'PingFang SC';
      font-size: 13px;
      font-family: 'PingFang SC Medium';
      line-height: 20px;
      height: 40px !important;
      background-color: #f5f5f5 !important;
      vertical-align: middle;
    }
    .cellheight {
      height: 70px !important;
    }
    td {
      padding: 0 !important;
      margin-left: 12px !important;
      padding-top: 10px !important;
      vertical-align: top !important;
    }
  }
</style>
