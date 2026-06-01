<template>
  <el-tabs v-model="curTab">
    <el-tab-pane label="销售出库" name="销售出库" />
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyWord" placeholder="订单号/参考单号" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        style="width: 300px"
        v-model="search.shipTime"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        type="daterange"
        value-format="YYYY-MM-DD"
      />
      <ProductChannelSelect v-model="search.platform" clearable style="width: 120px" />
      <ProductShopSelect
        v-model="search.shop"
        clearable
        :platform="search.platform"
        style="width: 120px"
      />
      <el-select
        v-model="search.deliveryType"
        placeholder="发货方式"
        clearable
        style="width: 120px"
      >
        <el-option
          v-for="item in deliveryTypeMap"
          :key="item.type"
          :label="item.desc"
          :value="item.type"
        />
      </el-select>
      <el-select v-model="search.status" placeholder="订单状态" clearable>
        <el-option v-for="(val, key) in statusMap" :key="key" :label="val.label" :value="key" />
      </el-select>
    </template>
    <!-- <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template> -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.orderList"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="渠道" prop="platform" />
      <el-table-column label="站点" prop="site" />
      <el-table-column label="店铺" prop="shop" min-width="160" />
      <el-table-column label="平台销售单号" prop="saleOrderId" min-width="160">
        <template #default="{ row }">
          <span>{{ row?.saleOrderId }}</span>
          <Copy :content="row.saleOrderId" />
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" min-width="100">
        <template #default="{ row }">
          <Tag v-if="statusMap[row.status].color" :color="statusMap[row.status].color">
            {{ row?.statusDesc }}
          </Tag>
          <span v-else>{{ row?.statusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" prop="orderType" />
      <el-table-column label="发货方式" prop="deliveryType" min-width="120" />
      <el-table-column label="易仓订单号" prop="refrenceNo" min-width="200">
        <template #default="{ row }">
          <span>{{ row?.refrenceNo }}</span>
          <Copy :content="row.refrenceNo" />
        </template>
      </el-table-column>
      <el-table-column label="仓库订单编码/订单ID" prop="orderCode" min-width="160">
        <template #default="{ row }">
          <span>{{ row?.orderCode }}</span>
          <Copy :content="row.orderCode" />
        </template>
      </el-table-column>
      <el-table-column label="物流方式" prop="shippingMethod" min-width="130" />
      <el-table-column label="仓库发货时间" prop="shipTime" min-width="130" />
      <el-table-column label="物流费用（USD）" prop="fee" min-width="130" />
      <el-table-column label="费用状态" prop="feeStatusDesc" />
      <el-table-column label="费用类型" prop="feeTypeDesc" />
      <el-table-column label="预计物流费用来源" prop="feeSourceEstimate" min-width="130" />
      <el-table-column label="实际物流费用来源" prop="feeSourceActual" min-width="130" />
      <el-table-column label="实际物流费用来源名称" prop="feeSourceActualName" min-width="155" />
      <el-table-column label="备注" prop="remark" min-width="150" />
      <el-table-column label="操作" fixed="right" min-width="100">
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
  <DetailDialog ref="detailRef" />
</template>

<script setup lang="ts" name="salesOut">
import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import { omit } from 'lodash-es';
  import dayjs from 'dayjs';
  import DetailDialog from '@/views/supplyChainManage/inventory/salesOut/components/detailDialog.vue';

  const curTab = ref('销售出库');

  const statusMap = {
    0: {
      label: '已废弃',
      color: 'gray',
    },
    1: {
      label: '付款未完成',
      color: 'yellow',
    },
    2: {
      label: '待发货审核',
      color: 'purple',
    },
    3: {
      label: '待发货',
      color: 'blue',
    },
    4: {
      label: '已发货',
      color: 'green',
    },
    5: {
      label: '冻结中',
      color: 'red',
    },
    6: {
      label: '缺货',
      color: 'red',
    },
    7: {
      label: '问题件',
      color: 'red',
    },
    8: {
      label: '未付款',
      color: 'yellow',
    },
    100: {
      label: '未审核',
      color: 'yellow',
    },
    101: {
      label: '审核不通过',
      color: 'red',
    },
    102: {
      label: '废弃订单',
      color: 'gray',
    },
  };

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
    ErpApi.LuteosErpOutboundQueryList.RequestQuery,
    ErpApi.LuteosErpOutboundQueryList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      shipTimeStart: undefined,
      shipTimeEnd: undefined,
      deliveryType: undefined,
      platform: undefined,
      shipTime: [],
      shop: undefined,
      status: '4',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    interceptSearchData: (searchData) => {
      const { shipTime } = searchData;
      return {
        ...omit(searchData, 'shipTime'),
        shipTimeStart: shipTime?.[0]
          ? dayjs(shipTime?.[0]).startOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        shipTimeEnd: shipTime?.[1]
          ? dayjs(shipTime?.[1]).endOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
      };
    },

    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOutboundQueryList,
  });

  const detailRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'view') {
      detailRef.value?.open(row?.orderCode);
    }
  };

  const deliveryTypeMap = ref();
  const queryOptions = async () => {
    const res = await erpApi.luteosErpOutboundToList();
    deliveryTypeMap.value = res?.deliveryType;
  };
  queryOptions();
</script>

<style scoped lang="scss"></style>
