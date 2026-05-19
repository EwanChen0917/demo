<template>
  <el-dialog align-center :model-value="visible" @close="$emit('close')" width="600px" top="1vh">
    <template #header>
      <!-- <div class="dialog-title">{{ title }}</div> -->
      <div class="dialog-header">
        <span class="el-dialog__title" style="font-size: 14px">{{ title }}</span>
        <ItemLabel v-if="props.subTitle" label="供应链SKU" :value="props.subTitle" />
      </div>
    </template>
    <!-- <div class="card card-flush"> -->
    <!-- @select="handleSelect"
        @selection-change="handleSelectionChange" -->
    <div class="card-body pt-0 tablewrap1">
      <el-table
        max-height="460px"
        ref="tableRef"
        class-name="table-row-dashed"
        v-loading="listLoading"
        :data="listData?.result?.items"
        row-key="skuCode"
        :border="true"
        height="460"
        row-class-name="cellheight"
        header-cell-class-name="hdcell"
      >
        <!-- <el-table-column label="单选" width="28" v-if="selectOne">
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
        <el-table-column
          v-else
          type="selection"
          :selectable="
            (row) => {
              return selectedRow?.skuCode !== row.skuCode;
            }
          "
          width="28"
          reserve-selection
        /> -->
        <!-- <el-table-column label="产品信息" min-width="260">
          <template #default="{ row }">
            <div class="product-item">
              <div class="left">
                <img
                  v-if="props?.sku?.productImageUrl"
                  class="product-img"
                  :src="props?.sku?.productImageUrl"
                  alt=""
                />
                <img v-else class="product-img" src="@/assets/images/system/empty.png" alt="" />
                <div>
                  <div class="product-title">
                    <OverflowTooltip
                      :content="props?.sku?.productTitle"
                      :line="1"
                      :font-size="13"
                    />
                  </div>
                  <div class="product-sku">
                    <span class="item-label">商品SKU：</span>
                    {{ props?.sku?.skuCode }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column prop="warehouseName" label="仓库" min-width="140" />
        <template v-if="customerCode || isRequisition">
          <el-table-column prop="warehouseName" label="发货仓" min-width="140" />
          <el-table-column prop="availableQuantity" label="可用库存" min-width="140" />
        </template>
        <el-table-column prop="availableQuantity" label="可用库存" min-width="70" />
        <template #empty>
          <div class="flex-align flex-center">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
          </div>
          <div class="text">暂无数据</div>
        </template>
      </el-table>
      <!-- <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      /> -->
    </div>
    <!-- </div> -->
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="handleCancel">取消</el-button> -->
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { metaApi, ProductContracts, omsApi, OmsApi } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      countryCode?: string;
      customerCode?: string;
      currencyCode?: string;
      title: string;
      subTitle?: string;
      userCode?: string;
      brandCode?: string;
      searchErpQuotation?: boolean;
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      confirmText?: string;
      isRequisition?: boolean;
      sku?: string;
      salesmanCode?: string;
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
  const PAGE_SIZE = 100;
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
    OmsApi.OmsCommonStockQuerySupplySkuStockDetail.RequestQuery,
    OmsApi.OmsCommonStockQuerySupplySkuStockDetail.ResponseBody
  >({
    searchDefaults: {
      // countryCode: props.countryCode,
      // customerCode: props.customerCode,
      // currencyCode: props.currencyCode,
      // brandCode: props.brandCode,
      // searchInventory: true,
      // searchErpQuotation: props.searchErpQuotation,
      // keyWord: undefined,
      // deliveryCode: undefined,
      // orderType: props.customerCode ? 1 : 0,
      // skuCodes: [props?.sku?.skuCode],
      // skuCodes: ['AS025-NA00NB'],
      supplySkus: props.subTitle ? [props.subTitle] : [],
      warehouseCodes: [],
      hasStock: true,
      pageNum: 1,
      pageSize: 50,
      sortList: [{ name: 'availableQuantity', sort: 'desc' }],
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
    // service: productApi.luteosProductSkuQueryProductSkuList,
    service: omsApi.omsCommonStockQuerySupplySkuStockDetail,
  });
  // const currentRow = ref<any[]>([]);

  // 勾选商品
  // const totalList = ref([]);

  // // 寄样选择商品校验
  // const handleSelect = async (selection, row) => {
  //   if (props.userCode && selection.some((item) => item.skuCode === row.skuCode)) {
  //     await metaApi.luteosMetaV3SampleorderCheckSampleSpu({
  //       spuCodeList: row.productSpu,
  //       userCode: props.userCode,
  //     });
  //   }
  // };

  // const handleSelectionChange = (list) => {
  //   // console.log('selectedlist', list)
  //   totalList.value = list;
  // };

  // 选择商品
  const handleSave = () => {
    emit('close');
  };
  // 取消
  // const handleCancel = () => {
  //   emit('close');
  // };
</script>

<style scoped lang="scss">
  .dialog-title {
    color: #1f1f1f;
    font-size: 16px;
    font-style: normal;
    font-family: 'PingFang SC Medium';
    font-weight: normal;
    line-height: 24px;
    .subtitle {
      padding-left: 16px;
      color: #999999;
    }
  }
  .dialog-header {
    display: flex;
    align-items: center;
    gap: 16px;
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
  :deep(.el-table) {
    // border-bottom: solid 1px #f5f5f5;
    .el-table__empty-text {
      width: auto !important;
    }
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
    // .cellheight {
    //   height: auto !important;
    // }
    // td {
    //   padding: 0 !important;
    //   margin-left: 12px !important;
    //   padding-top: 10px !important;
    //   vertical-align: center !important;
    // }
  }
</style>
