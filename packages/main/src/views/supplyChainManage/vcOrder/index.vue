<template>
  <!-- <OrderTabs
    v-model="search.orderStatus"
    :tab-status-list="tabStatusList"
    :count-map="listData?.statusStatistics"
    @tab-change="handleTabChange"
  /> -->
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input style="width: 310px" v-model="search[searchType]" placeholder="请输入" clearable>
        <template #prepend>
          <el-select v-model="searchType" style="width: 100px">
            <el-option v-for="(val, key) in searchTypeMap" :value="key" :label="val" :key="key" />
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
      <el-select v-model="search.orderStatus" placeholder="订单状态" clearable style="width: 120px">
        <el-option label="待发货" value="W" />
        <el-option label="已发货" value="D" />
        <el-option label="异常订单" value="N" />
        <el-option label="问题件" value="P" />
        <el-option label="废弃" value="X" />
      </el-select>
      <el-date-picker
        style="width: 257px"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="订单时间开始"
        end-placeholder="订单时间结束"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="handleTimeChange"
      />
      <el-select v-model="search.shipStatus" placeholder="货件状态" clearable style="width: 120px">
        <el-option label="已打版待发货" :value="1" />
        <el-option label="已提货" :value="2" />
      </el-select>
    </template>
    <el-table ref="tableRef" :data="listData?.recordList" v-loading="listLoading">
      <el-table-column prop="orderCode" label="订单明细" min-width="320">
        <template #default="{ row }">
          <div class="table-ittem-tip">
            <ItemLabel label="三方海外仓订单号" :value="row.orderCode" />
            <ItemLabel label="订单参考号" :value="row.referenceNo" />
            <ItemLabel label="PO单号" :value="row.platformOrderCode" />
          </div>

          <div class="detail-info">
            <div class="collapse-control">
              <div
                class="list-collapse"
                v-if="row?.itemBeanList?.length > 1"
                @click="row.isCollapse = !row.isCollapse"
              >
                <div
                  class="horizontal-line"
                  :class="[row.isCollapse ? 'horizontal-collapse' : 'horizontal-expand']"
                ></div>
                <div
                  class="vertical-line"
                  :class="[row.isCollapse ? 'vertical-collapse' : 'vertical-expand']"
                ></div>
              </div>
            </div>
            <div class="product-list">
              <div
                class="product-item"
                v-for="product in row?.itemBeanList?.slice(
                  0,
                  row.isCollapse ? 1 : row?.itemBeanList?.length
                )"
                :key="product?.skuCode"
              >
                <div class="left">
                  <ItemLabel label="UPC" :value="product?.productSku" />
                  <ItemLabel label="供应链SKU" :value="product?.supplySku" />
                  <ItemLabel label="产品中文名称" :value="product?.productName" />
                </div>
                <div class="split"></div>
                <div class="right">
                  <ItemLabel label="数量" :value="product?.quantityConfirmed" />
                  <ItemLabel label="箱数" :value="product?.quantity" />
                  <ItemLabel label="箱规" :value="product?.pairQuantity" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderReferenceCode" label="订单信息" min-width="240">
        <template #default="{ row }">
          <div class="table-ittem-tip error-message">
            <i
              class="iconfont icon-xianxingtubiaoxinxizhuangtai"
              v-if="row?.abnormalProblemReason"
            ></i>
            <ItemLabel
              label="异常信息"
              :value="row?.abnormalProblemReason"
              v-if="row?.abnormalProblemReason"
            />
          </div>
          <div style="padding: 12px">
            <ItemLabel label="订单类型" :value="row?.orderType" />
            <ItemLabel label="订单状态" :value="row?.orderStatusDesc" />
            <ItemLabel label="货件状态" :value="row?.shipStatusDesc" />
            <ItemLabel label="收货仓" :value="row?.fbaWarehouseCode" />
            <ItemLabel label="发货仓" :value="row?.wpCode" />
            <ItemLabel label="承运商" :value="row?.carrierName" />
            <ItemLabel label="物流产品代码" :value="row?.shippingMethod" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="poCode" label="时间" min-width="150">
        <template #default="{ row }">
          <div class="table-ittem-tip"></div>
          <div style="padding: 12px">
            <ItemLabel label="订单时间" :value="row?.dateCreate" />
            <ItemLabel label="预计提货时间" :value="row?.estimatedArrivalDate" />
            <ItemLabel label="出库时间" :value="row?.shipperTime" />
            <ItemLabel label="更新时间" :value="row?.dateModify" />
          </div>
        </template>
      </el-table-column>
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
</template>

<script lang="ts" setup name="vcOrder">
  import { erpApi, ErpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import dayjs from 'dayjs';
  import { pick } from 'lodash-es';

  const searchTypeMap = {
    orderCodes: '订单号',
    referenceNos: '订单参考号',
    platformOrderCodes: 'PO单号',
  };

  const searchType = ref('orderCodes');
  const PAGE_SIZE = 10;
  const tableRef = ref();
  const batchSearchRef = ref();
  const timeType = ref<number>(1);
  const time = ref<any>([]);
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
    ErpApi.LuteosErpOrderVcQueryList.RequestQuery,
    ErpApi.LuteosErpOrderVcQueryList.ResponseBody
  >({
    searchDefaults: {
      orderStatus: '',
      shipStatus: undefined,
      orderCodes: undefined,
      referenceNos: undefined,
      platformOrderCodes: undefined,
      starTime: undefined,
      enTime: undefined,
    },
    pageSize: PAGE_SIZE,
    interceptSearchData: (searchData) => {
      const data = { ...searchData };
      return {
        ...pick(data, [[searchType.value], 'orderStatus', 'starTime', 'enTime', 'shipStatus']),
      };
    },
    service: erpApi.luteosErpOrderVcQueryList,
  });

  const handleBatchSearch = (val) => {
    search[searchType.value] = val?.replace(/\n/g, ',');
  };

  const handleTimeChange = (val) => {
    search.starTime = undefined;
    search.enTime = undefined;

    if (val) {
      if (timeType.value === 1) {
        search.starTime = val[0] || '';
        search.enTime = val[1] ? dayjs(val[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss') : '';
      }
    }
  };
  const reset = () => {
    batchSearchRef.value?.clear();
    time.value = [];
    resetSearch();
  };
</script>

<style scoped lang="scss">
  :deep(.el-table__row) {
    .el-table__cell,
    .cell {
      vertical-align: top !important;
      padding: 0 !important;
    }
  }
  .table-ittem-tip {
    height: 32px;
    line-height: 32px;
    display: flex;
    background: #f7f7f7;
    padding-left: 12px;
    .item-label {
      margin-right: 18px;
    }
  }
  .error-message {
    :deep(i),
    :deep(.item-label > .label) {
      color: var(--el-color-danger) !important;
    }
  }
  .detail-info {
    min-height: 0;
    flex: 1;
    display: flex;
    gap: 16px;
    padding: 12px;
    .collapse-control {
      width: 14px;
      .list-collapse {
        width: 14px;
        height: 14px;
        border-radius: 4px;
        margin: 4px 0;
        position: relative;
        border: 1px solid #dedede;
        cursor: pointer;

        &:hover {
          color: var(--el-color-primary);
          border-color: var(--el-color-primary);

          .horizontal-line,
          .vertical-line {
            background-color: var(--el-color-primary);
          }
        }

        .horizontal-line,
        .vertical-line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #999999;
        }

        .horizontal-line {
          width: 7px;
          height: 1px;
          transform: translate(-50%, -50%) rotate(180deg);
        }

        .horizontal-expand {
          animation: horizontal-line-expand 0.2s ease-in-out forwards;
          @keyframes horizontal-line-expand {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(180deg);
            }
          }
        }

        .horizontal-collapse {
          animation: horizontal-line-collapse 0.2s ease-in-out forwards;
          @keyframes horizontal-line-collapse {
            0% {
              transform: translate(-50%, -50%) rotate(180deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }
        }

        .vertical-expand {
          animation: vertical-line-expand 0.2s ease-in-out forwards;
          @keyframes vertical-line-expand {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(90deg);
            }
          }
        }

        .vertical-collapse {
          animation: vertical-line-collapse 0.2s ease-in-out forwards;
          @keyframes vertical-line-collapse {
            0% {
              transform: translate(-50%, -50%) rotate(90deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }
        }

        .vertical-line {
          width: 1px;
          height: 7px;
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
    }

    .product-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      //gap: 18px;
      .product-item + .product-item {
        margin-top: 18px;
      }

      .product-item {
        display: flex;
        align-items: center;
        justify-items: space-between;
        gap: 12px;
        .left {
          width: 60%;
        }
        .split {
          width: 1px;
          height: 12px;
          background-color: #dedede;
        }
      }
    }
  }
</style>
