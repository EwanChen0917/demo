<template>
  <el-tabs v-model="search.status" tab-position="top" @tab-change="handleTabChange">
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
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="计划单号/货件单号/服务商单号/发货仓/目的仓代码"
        class="w-400px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="time"
        type="datetimerange"
        range-separator="-"
        start-placeholder="创建开始时间"
        end-placeholder="创建结束时间"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="handleTimeChange"
      />
      <el-select
        style="width: 140px"
        v-model="search.serviceProviderCode"
        placeholder="海外仓服务商"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="item of supplierList"
          :key="item.supplierCode"
          :label="item.supplierName"
          :value="item.supplierCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="addVisible = true" v-permission="'cargoAdd'">
        添加货件
      </el-button>
    </template>
    <vxe-table
      max-height="900px"
      v-loading="listLoading"
      border="inner"
      :data="listData?.recordList"
    >
      <vxe-column field="name" min-width="220px" title="计划单号/货件单号（服务商单号）">
        <template #default="{ row }">
          <div @click="toECang(row.shippingPlanCodeJumpUrl)" class="text-primary cursor-pointer">
            <div>{{ row.shippingPlanCode }}</div>
            <div>{{ row.shippingCode }}</div>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="SKU种类" width="100">
        <template #default="{ row }">
          <el-button type="primary" link @click="showSkuDialog(row.shippingInfoItemList)">
            {{ row.skuTypeCount }}
          </el-button>
        </template>
      </vxe-column>
      <vxe-column field="commandCode" title="关联发货指令单号" width="150">
        <template #default="{ row }">
          <span class="cursor-pointer text-primary" @click="toDeliverDirections(row.commandCode)">
            {{ row.commandCode }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="serviceProviderShow" min-width="100px" title="海外仓服务商" />
      <vxe-column field="sendQty" min-width="100px" title="计划量" />
      <vxe-column field="receivedQty" min-width="100px" title="已收量" />
      <vxe-column field="differenceQty" min-width="100px" title="差异量" />
      <vxe-column field="warehouseShow" min-width="100px" title="发货仓" width="150" />
      <vxe-column field="destinationCode" min-width="120px" title="目的仓代码" />
      <vxe-column field="age" title="状态" width="100">
        <template #default="{ row }">
          <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column field="age" title="时间" width="200">
        <template #default="{ row }">
          <p class="fs-7">创建：{{ row.createTime }}</p>
          <p class="fs-7">到货：{{ row.arriveDate }}</p>
        </template>
      </vxe-column>
    </vxe-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <AddDialog v-if="addVisible" :visible="addVisible" @close="addVisible = false" />
  </KeenList>
  <SkuDialog ref="skuDialogRef" :data-list="shippingInfoItemList" />
</template>

<script lang="ts" setup name="cargoManage">
  import { ErpApi, erpApi, dataApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import SkuDialog from '@/views/supplyChainManage/efficiencyTools/deliverDirections/components/skuDialog.vue';
  import AddDialog from './components/addDialog.vue';

  const route = useRoute();
  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '100', code: 'waitReceived', statusName: '待收货', count: '' },
    { status: '200', code: 'received', statusName: '已收货', count: '' },
  ];
  const colorMap = {
    0: 'blue',
    1: 'green',
    2: 'gray',
    3: 'yellow',
    4: 'black',
  };
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
    ErpApi.LuteosErpPlanShipmentQueryList.RequestQuery,
    ErpApi.LuteosErpPlanShipmentQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: route.query.code || undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      serviceProviderCode: undefined,
      status: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanShipmentQueryList,
  });

  const time = ref();
  const handleTimeChange = (val) => {
    if (val) {
      search.createTimeStart = val[0] || '';
      search.createTimeEnd = val[1] || '';
    } else {
      search.createTimeStart = undefined;
      search.createTimeEnd = undefined;
    }
  };

  const supplierList: any = ref([]);
  const getSupplierList = async () => {
    const res = await dataApi.luteosDataQueryShippingSupplierList();
    supplierList.value = res.shippingSupplierList;
  };

  const toECang = (url) => {
    window.open(url, '_blank');
  };

  const toDeliverDirections = (code) => {
    window.open(`/deliverDirections?code=${code}`, '_blank');
  };

  const shippingInfoItemList = ref([]);
  const skuDialogRef = ref();
  const showSkuDialog = (list: []) => {
    shippingInfoItemList.value = list;
    skuDialogRef.value.open();
  };
  const initDickbook = async () => {
    await getSupplierList();
  };
  onMounted(() => {
    initDickbook();
  });

  const addVisible = ref<boolean>(false);
</script>

<style scoped lang="scss"></style>
