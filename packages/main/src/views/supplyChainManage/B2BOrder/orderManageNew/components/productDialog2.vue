<template>
  <el-dialog align-center :model-value="visible" @close="$emit('close')" width="55%" top="1vh" sty>
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
      <div class="input-wrap">
        <el-input v-model="search.keyWord" placeholder="请输入商品名称/SKU" style="width: 232px">
          <template #suffix>
            <i class="iconfont icon-sousuo1"></i>
          </template>
        </el-input>
      </div>
    </div>
    <div class="card-body pt-0 tablewrap">
      <el-table
        max-height="460px"
        ref="tableRef"
        class-name="table-row-dashed"
        v-loading="listLoading"
        :data="listData?.skuStockList"
        row-key="skuCode"
        @select="handleSelect"
        @selection-change="handleSingleSelectionChange"
        :border="true"
        height="460"
        row-class-name="cellheight"
        header-cell-class-name="hdcell"
      >
        <el-table-column
          label="单选"
          width="32"
          v-if="selectOne"
          type="selection"
          :selectable="
            (row) => {
              return selectedRow?.skuCode !== row.skuCode;
            }
          "
          reserve-selection
        />
        <el-table-column
          v-else
          type="selection"
          :selectable="
            (row) => {
              return selectedRow?.skuCode !== row.skuCode;
            }
          "
          width="32"
          reserve-selection
        />
        <el-table-column label="产品信息" min-width="260">
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
        </el-table-column>
        <template v-if="customerCode || isRequisition">
          <el-table-column prop="selfInventory" label="自营仓可用库存" min-width="140" />
          <!-- <el-table-column v-if="isRequisition" label="FBA库存" min-width="140">
            <template #default="{ row }">
              {{ row?.inventory - row?.centerInventory - row?.overseasInventory }}
            </template>
          </el-table-column>
          <el-table-column prop="centerInventory" label="中仓库存" min-width="140" /> -->
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
        <!-- <el-table-column prop="productTitle" label="产品名称" min-width="120" />
          <el-table-column prop="productSku" label="商品SKU" min-width="120" /> -->
        <el-table-column v-else prop="inventory" label="库存" min-width="140" />
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
    OmsApi.OmsCommonStockQuerySkuStock.RequestQuery,
    OmsApi.OmsCommonStockQuerySkuStock.ResponseBody
  >({
    searchDefaults: {
      countryCode: props.countryCode,
      customerCode: props.customerCode,
      currencyCode: props.currencyCode,
      brandCode: props.brandCode,
      searchInventory: true,
      searchErpQuotation: props.searchErpQuotation,
      keyWord: undefined,
      deliveryCode: undefined,
      orderType: props.customerCode ? 1 : 0,
      share: 2, // 共享（0-全部（个人+共享） 1-共享 2-个人，默认0）
      salesmanCode: props.salesmanCode,
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
    service: omsApi.omsCommonStockQuerySkuStock,
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
    // console.log('selection', selection);
    // totalList.value = list;
    if (selection.length > 1) {
      // 获取最后选中的行
      const lastSelected = selection[selection.length - 1];
      // 清空所有选中
      tableRef.value.clearSelection();
      // 重新选中最后一行
      tableRef.value.toggleRowSelection(lastSelected, true);
      currentRow.value = lastSelected;
      totalList.value = [lastSelected];
    } else if (selection.length === 1) {
      currentRow.value = selection[0];
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
