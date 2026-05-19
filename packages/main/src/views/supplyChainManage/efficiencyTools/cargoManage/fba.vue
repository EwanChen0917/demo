<template>
  <el-tabs v-model="search.status" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <span class="tab-count">({{ listData?.statisticsInfo[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        class="w-300px"
        placeholder="货件单号/发货单号/计划单号/货件名称"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 180px"
        placeholder="状态"
        v-model="search.statusList"
        clearable
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
        :options="statusList.map(item=>{
          return {
            label: item,
            value: item,
          };
        })"
      />
      <el-select style="width: 120px" placeholder="来源系统" v-model="search.source" clearable>
        <el-option value="易仓" label="易仓" />
        <el-option value="积加" label="积加" />
      </el-select>
      <el-select v-model="timeType" style="width: 80px" @change="handleTimeChange(time)">
        <el-option :value="1" label="创建" />
        <el-option :value="2" label="更新" />
        <el-option :value="3" label="发货" />
      </el-select>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
      />
      <WarehouseSelect v-model="search.sendWarehouseCode" clearable placeholder="发货仓" />
      <el-select
        v-model="search.destinationWarehouseCode"
        filterable
        clearable
        placeholder="目的仓"
      >
        <el-option
          v-for="item in shopList"
          :value="item.value"
          :label="item.desc"
          :key="item.value"
        />
      </el-select>
      <el-select v-model="search.shopCode" clearable filterable placeholder="店铺">
        <el-option
          v-for="item in shopList"
          :value="item.value"
          :label="item.desc"
          :key="item.value"
        />
      </el-select>
      <el-select placeholder="调拨单出库状态" v-model="search.transferFlag" clearable>
        <el-option :value="1" label="已出库" />
        <el-option :value="0" label="未出库" />
      </el-select>
      <!--      <ProductShopSelect v-model="search.destinationWarehouseCode" clearable placeholder="目的仓" />
      <ProductShopSelect v-model="search.shop" clearable />-->
    </template>
    <template #buttons>
      <el-button type="primary" @click="exportDataDialogRef?.open()">导出装箱数据</el-button>
      <ExportBtn :service="erpApi.luteosErpShipmentExportFbaList" :params="search">导出</ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="货件单号/调拨单号" min-width="180" fixed="left">
        <template #default="{ row }">
          {{ row?.shipmentCode || '--' }} / {{ row?.planCode || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="货件名称" prop="shipmentName" min-width="160" />
      <el-table-column label="店铺名称" prop="shopName" min-width="140" />
      <el-table-column label="物流方式" prop="shippingMethod" min-width="140" />
      <el-table-column label="状态" prop="status" min-width="140">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row?.status]">{{ row?.status }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="调拨单出库状态" prop="transferFlag" min-width="140">
        <template #default="{ row }">
          {{
            row?.transferFlag === 1
              ? '已出库'
              : row?.transferFlag === 0
              ? '未出库'
              : '-'
          }}
        </template>
      </el-table-column>
      <el-table-column label="来源系统" prop="source" min-width="80" />
      <el-table-column label="发货仓/目的仓" min-width="180">
        <template #default="{ row }">
          {{ row?.sendWarehouseDesc || '--' }} / {{ row?.destinationWarehouseDesc || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="配送地址" prop="deliveryAddress" min-width="180">
        <template #default="{ row }">
          <OverflowTooltip :content="row.deliveryAddress" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="SKU种类" prop="skuCount" />
      <el-table-column label="计划量" prop="planQty" />
      <el-table-column label="发货量" prop="shipQty" />
      <el-table-column label="已收量" prop="receivedQty" />
      <el-table-column label="差异量" prop="diffQty" />
      <el-table-column label="发货单号" prop="shipCode" min-width="140" />
      <el-table-column label="创建时间" prop="createTime" min-width="120" />
      <el-table-column label="发货时间" prop="shipTime" min-width="120" />
      <el-table-column label="更新时间" prop="updateTime" min-width="120" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                row,
                permissionCode: '',
              },
            ]"
            @click="handleActions"
          />
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
  <FbaDetailDialog ref="fbaDetailDialogRef" />
  <ExportDataDialog ref="exportDataDialogRef" />
</template>

<script setup lang="ts" name="fbaCargoManage">
import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, shopApi } from '@/api';
  import FbaDetailDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/fbaDetailDialog.vue';
  import ExportDataDialog from '@/views/supplyChainManage/efficiencyTools/cargoManage/components/exportDataDialog.vue';

  const statusList = [
    'WORKING',
    'SHIPPED',
    'IN_TRANSIT',
    'DELIVERED',
    'CHECKED_IN',
    'RECEIVING',
    'READY_TO_SHIP',
    'CLOSED',
    'CANCELLED',
    'DELETED',
    'ERROR',
  ];
  const statusColorMap = {
    WORKING: 'blue',
    SHIPPED: 'green',
    DELIVERED: 'green',
    RECEIVING: 'purple',
    IN_TRANSIT: 'purple',
    CHECKED_IN: 'green',
    READY_TO_SHIP: 'purple',
    CLOSED: 'green',
    DELETED: 'red',
    CANCELLED: 'gray',
    OTHER: 'yellow',
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 'WORKING', code: 'working', statusName: '已创建', count: '' },
    { status: 'SHIPPED', code: 'shipped', statusName: '已发货', count: '' },
    { status: 'DELIVERED', code: 'delivered', statusName: '已到达', count: '' },
    { status: 'RECEIVING', code: 'receiving', statusName: '部分收货', count: '' },
    { status: 'CLOSED', code: 'closed', statusName: '全部收货', count: '' },
    { status: 'DELETED', code: 'deleted', statusName: '删除货件', count: '' },
    { status: 'CANCELLED', code: 'cancelled', statusName: '已取消', count: '' },
    { status: 'OTHER', code: 'other', statusName: '其他', count: '' },
  ];

  const time = ref<any>([]);
  const timeType = ref<number>(1);
  const handleTimeChange = (val) => {
    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;
    search.updateTimeStart = undefined;
    search.updateTimeEnd = undefined;
    search.shipTimeStart = undefined;
    search.shipTimeEnd = undefined;
    if (val) {
      if (timeType.value === 1) {
        search.createTimeStart = val[0] || '';
        search.createTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.updateTimeStart = val[0] || '';
        search.updateTimeEnd = val[1] || '';
      } else if (timeType.value === 3) {
        search.shipTimeStart = val[0] || '';
        search.shipTimeEnd = val[1] || '';
      }
    }
  };

  const exportDataDialogRef = ref(null);
  const PAGE_SIZE = 10;

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
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpShipmentQueryFbaList.RequestQuery,
    ErpApi.LuteosErpShipmentQueryFbaList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      shopCode: undefined,
      sendWarehouseCode: undefined,
      destinationWarehouseCode: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      updateTimeStart: undefined,
      updateTimeEnd: undefined,
      shipTimeStart: undefined,
      shipTimeEnd: undefined,
      source: undefined,
      status: '',
      statusList: [],
      transferFlag: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpShipmentQueryFbaList,
  });

  const fbaDetailDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      fbaDetailDialogRef.value?.open(row);
    }
  };

  const shopList = ref([]);
  const queryShopList = async () => {
    const res = await shopApi.luteosShopSelectEcShopList({});
    shopList.value = res;
  };

  queryShopList();

  const reset = () => {
    time.value = [];
    resetSearch();
  };
</script>

<style scoped lang="scss"></style>
