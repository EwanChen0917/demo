<template>
  <el-dialog align-center :model-value="visible" @close="$emit('close')" width="50%" top="1vh">
    <template #header>
      <div class="dialog-title">{{ title }}</div>
    </template>
    <!-- <div class="card card-flush"> -->
    <div class="d-flex align-items-center search">
      <div class="input-wrap">
        <el-select
          style="width: 250px"
          v-model="search.warehouseCodes"
          placeholder="仓库"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option v-for="[key, value] in warehouseArr" :value="key" :label="value" :key="key" />
        </el-select>
        <el-select
          style="width: 200px; padding-left: 8px"
          v-model="search.skuCodes"
          placeholder="SKU"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option v-for="[key, value] in skuArr" :value="key" :label="value" :key="key" />
          <!-- <el-option
            v-for="item in skuArr"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          /> -->
        </el-select>
      </div>
    </div>
    <div class="card-body pt-0 tablewrap1">
      <el-table
        max-height="460px"
        ref="tableRef"
        class-name="table-row-dashed"
        v-loading="listLoading"
        :data="listData?.result?.items"
        row-key="skuCode"
        @select="handleSelect"
        @selection-change="handleSelectionChange"
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
                  v-if="row?.productImageUrl"
                  class="product-img"
                  :src="row?.productImageUrl"
                  alt=""
                />
                <img v-else class="product-img" src="@/assets/images/system/empty.png" alt="" />
                <div>
                  <div class="product-title">
                    <OverflowTooltip :content="row?.productTitle" :line="1" :font-size="13" />
                  </div>
                  <div class="product-sku">
                    <span class="item-label">商品SKU：</span>
                    {{ row?.skuCode }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column prop="warehouseName" label="仓库" min-width="180" />
        <el-table-column prop="skuCode" label="SKU" min-width="120" />
        <el-table-column prop="supplySku" label="供应链SKU" min-width="120" />
        <!-- <el-table-column prop="availableQuantity" label="MSKU" min-width="120" /> -->
        <template v-if="customerCode || isRequisition">
          <el-table-column prop="selfInventory" label="自营仓可用库存" min-width="140" />
          <el-table-column prop="overseasInventory" label="海外仓可用库存" min-width="140" />
        </template>
        <!-- <el-table-column prop="productTitle" label="产品名称" min-width="120" />
          <el-table-column prop="productSku" label="商品SKU" min-width="120" /> -->
        <el-table-column v-else prop="availableQuantity" label="库存" min-width="80" />
        <el-table-column label="操作" fixed="right" min-width="80">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '选择',
                  key: 'select',
                  type: 'primary',
                  row: row,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
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
        <el-button type="primary" @click="handleCancel">{{ confirmText }}</el-button>
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
  // import StockDetailDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/stockDetailDialog.vue';
  import StockDetailDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/stockDetailDialog.vue';

  const stockDetailDialog = ref(false);
  const selectSku = ref();
  // const selectWarehouse = ref('');
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'select') {
      // selectSku.value = row;
      // console.log('select', row);
      // selectWarehouse.value = row?.warehouseCode;
      emit('close', true, row?.warehouseCode);
      // stockDetailDialog.value = true;
    }
  };
  // 动态计算 仓库项 ,sku数组
  const warehouseArr = ref([]);
  const skuArr = ref([]);

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
      sku?: any;
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
  const PAGE_SIZE = 1000;
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
      // share: 2, // 共享（0-全部（个人+共享） 1-共享 2-个人，默认0）
      salesmanCode: props.salesmanCode,
      supplySkus: props.sku ? props.sku?.itemBeanList?.map((item) => item.supplySku) : [],
      warehouseCodes: [],
      skuCodes: [],
      hasStock: true,
      pageNum: 1,
      pageSize: 100,
      sortList: [
        { name: 'warehouseCode', sort: 'asc' },
        { name: 'availableQuantity', sort: 'desc' },
      ],
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
  const currentRow = ref<any[]>([]);
  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows
        ?.filter((item) => {
          return (
            props.selectedRows.indexOf(item) ===
            props.selectedRows.findIndex((other) => other.skuCode === item.skuCode)
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

  watch(
    () => listData.value?.result?.items,
    () => {
      let tmp: any = new Map();
      let tmp2: any = new Map();
      listData.value?.result?.items?.map((item) => {
        if (!tmp.has(item.warehouseCode)) {
          tmp.set(item.warehouseCode, item.warehouseName);
        }
        if (!tmp2.has(item.skuCode)) {
          tmp2.set(item.skuCode, item.skuCode);
        }
        // tmp.push({ label: item.warehouseName, value: item.warehouseCode });
        // tmp2.push({ label: item.skuCode, value: item.skuCode });
      });
      warehouseArr.value = tmp;
      skuArr.value = tmp2;
      // console.log(tmp, tmp2);
    }
  );
  // const warehouseArr = computed(
  //   () =>
  //     listData?.result?.items?.map((item) => {
  //       return { label: item.warehouseName, value: item.warehouseCode };
  //     }) || []
  // );
  //  const skuArr = computed(() => listData?.result?.items?.map(item=>{
  //   label:item.warehouseName,value:item.warehouseCode
  // })||[]);

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
      // margin-left: 12px;
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
    .el-table__empty-text {
      width: auto !important;
    }
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
    // .cellheight {
    //   height: 70px !important;
    // }
    // td {
    //   padding: 0 !important;
    //   margin-left: 12px !important;
    //   padding-top: 10px !important;
    //   vertical-align: top !important;
    // }
  }
</style>
