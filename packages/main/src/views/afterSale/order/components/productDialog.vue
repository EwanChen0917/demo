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
        <el-input v-model="search.keyword" placeholder="请输入商品名称/SKU" style="width: 232px">
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
        :data="listData?.resultList"
        row-key="skuCode"
        @selection-change="handleSelectionChange"
        :border="true"
        height="460"
        row-class-name="cellheight"
        header-cell-class-name="hdcell"
      >
        <el-table-column label="单选" width="60" v-if="selectOne">
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
        />
        <el-table-column label="产品信息" min-width="260">
          <template #default="{ row }">
            <div class="product-item">
              <div class="left">
                <img v-if="row?.productUrl" class="product-img" :src="row?.productUrl" alt="" />
                <img v-else class="product-img" src="@/assets/images/system/empty.png" alt="" />
                <div>
                  <div class="product-title">
                    <OverflowTooltip :content="row?.productName" :line="1" :font-size="13" />
                  </div>
                  <div class="product-sku">
                    <span class="item-label">{{ row?.msku }}</span>
                    <span class="item-label" :class="{ error: row.state === 1 }">
                      {{ row?.state === 1 ? 'inactive' : 'active' }}
                    </span>
                    <span class="item-label" :class="{ error: row.stockQty === 0 }">
                      {{ row?.stockQty }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { amazonApi, AmazonContracts, AmazonApi, afterSaleApi } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      shopName?: string;
      itemInfo?: any;
      title: string;
      userCode?: string;
      brandCode?: string;
      searchErpQuotation?: boolean;
      visible: boolean;
      selectedRow?: AmazonContracts.AmazonProductListingBean;
      selectedRows?: AmazonContracts.AmazonProductListingBean[];
      selectOne?: boolean;
      confirmText?: string;
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
    AmazonApi.LuteosAmazonTsQueryProductList.RequestQuery,
    AmazonApi.LuteosAmazonTsQueryProductList.ResponseBody
  >({
    searchDefaults: {
      shopName: props.shopName,
      // brandCode: props.brandCode,
      // searchInventory: true,
      // searchErpQuotation: props.searchErpQuotation,
      keyword: '',
      // orderType: props.customerCode ? 1 : 0,
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
    service: amazonApi.luteosAmazonTsQueryProductList,
    // serviceManual: true,
    keywordImediateSearch: true,
  });
  // watch(
  //   () => search.keyword,
  //   (val) => {
  //     if (val) {
  //       runQuery(true);
  //     }
  //   }
  // );
  // console.log(runQuery)
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

  const handleSelectionChange = (list) => {
    // console.log('selectedlist', list)
    totalList.value = list;
  };

  // 选择商品
  const handleSave = async () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个商品',
          duration: 5 * 1000,
        });
        return;
      }
      // console.log(currentRow.value);
      const res = await afterSaleApi.luteosAfterSaleReplacementReplacementSku({
        ...currentRow.value,
        itemId: props.itemInfo.itemId,
        id: props.itemInfo.id,
      });
      // console.log(res);
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
          margin-top: 8px;
          .item-label {
            flex-shrink: 0;
            color: #999999;
            margin-right: 100px;
          }
        }
      }
    }
  }
  .error {
    color: red !important;
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
