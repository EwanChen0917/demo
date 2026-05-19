<template>
  <div class="d-flex justify-content-between align-items-center whitebg">
    <el-tabs v-model="search.orderBigStatus" tab-position="top" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="item in tabStatusList"
        :key="item.status"
        :label="item.statusName"
        :name="item.status"
      >
        <template #label>
          {{ item.statusName }}
          <span class="tab-count">({{ listData?.statusStatistics[item.code] }})</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="text-gray-500" v-if="!store.taskMap.B2BOrderSync">
      <span>上次更新：{{ store.taskMap?.lastRefreshTime }}</span>
    </div>
  </div>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="searchType" style="width: 100px" @change="handleSearchTypeChange">
        <el-option
          v-for="(item, key) in searchTypeMap"
          :value="key"
          :label="item.label"
          :key="key"
        />
      </el-select>
      <el-input
        v-if="searchType > 0"
        v-model="search[searchTypeMap[searchType].key]"
        :placeholder="searchTypeMap[searchType]?.placeholder"
        style="width: 275px"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input
        v-else
        v-model="search.orderCode"
        :placeholder="searchTypeMap[searchType]?.placeholder"
        style="width: 275px"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="timeType" style="width: 80px" @change="handleTimeChange(time)">
        <el-option :value="1" label="创建" />
        <el-option :value="2" label="签收" />
        <!--        <el-option :value="3" label="发货" />-->
      </el-select>
      <el-date-picker
        v-model="search.time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="handleTimeChange"
        style="width: 380px"
      />
      <el-select
        v-model="search.meReview"
        style="width: 130px"
        v-if="search.orderBigStatus === '200'"
      >
        <el-option label="我的审核节点" :value="true" />
        <el-option label="全部审核节点" :value="false" />
      </el-select>
      <ProductShopSelect
        v-model="search.shop"
        clearable
        filterable
        placeholder="卖家账号"
        platform="tiktok"
      />
      <el-select
        style="width: 120px"
        v-model="search.warehouseCode"
        placeholder="发货仓库"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="item in warehouseList"
          :key="item.warehouseCode"
          :label="item.warehouseName"
          :value="item.warehouseCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        :disabled="codeList.length === 0"
        @click="retrtFba"
        v-permission="'TTOrderToFBA'"
      >
        转FBA配送
      </el-button>
      <el-button
        v-permission="'B2BOrderRefresh'"
        :loading="!!store.taskMap.B2BOrderSync"
        @click="handleRefresh"
        type="primary"
      >
        <div>{{ !!store.taskMap.B2BOrderSync ? '刷新中' : '手动刷新' }}</div>
      </el-button>
      <ExportBtn :service="erpApi.luteosErpOrderOrderDownload" :params="search" :plain="false">
        导出
      </ExportBtn>
    </template>
    <el-table
      class="border-table"
      border
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="erpCode"
      class-name="table-row-dashed"
      max-height="900px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column min-width="340px" label="订单详情">
        <template #default="{ row }">
          <p>
            订单号：{{ row.erpCode }}
            <Tag :color="statusColorMap[row.orderStatus]">{{ row.orderStatusDesc }}</Tag>
          </p>
          <p>易仓订单号：{{ row.orderCode || '-' }}</p>
          <p>参考单号：{{ row.refNo || '-' }}</p>
          <p>买家ID：{{ row.buyerId || '-' }}</p>
          <p>买家名称：{{ row.buyerName || '-' }}</p>
          <p>店铺账号：{{ row.shopAccount || '-' }}</p>
          <p>创建人：{{ row.creator || '-' }}</p>
          <p>原订单：{{ row.pcode || '-' }}</p>
          <p v-if="row?.waitAuditOperatorList?.length > 0">
            当前待审核人：{{ row?.waitAuditOperatorList?.join(',') }}
          </p>
          <p>订单来源：{{ row.sourceDesc }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="660px" label="订单明细">
        <template #default="{ row }">
          <el-row
            :gutter="20"
            style="margin-bottom: 8px"
            v-for="product of row.itemBeanList"
            :key="product.skuCode"
          >
            <el-col :span="24">产品名称：{{ product.productName }}</el-col>
            <el-col :span="12">供应链SKU：{{ product.supplySku }}</el-col>
            <el-col :span="6">数量：{{ product.num }}</el-col>
            <el-col :span="6">单价：{{ product.price }}</el-col>
          </el-row>
          <!-- <el-table :data="row.itemBeanList">
            <el-table-column prop="productName" label="产品名称" />
            <el-table-column prop="supplySku" label="供应链SKU" />
            <el-table-column prop="num" label="数量" />
            <el-table-column prop="price" label="单价" />
          </el-table> -->
          <p class="red" v-if="row.systemRemark">系统备注：{{ row.systemRemark }}</p>
          <p class="red" v-if="row.dingRemark">钉钉审核备注：{{ row.dingRemark }}</p>
          <p class="red" v-if="row.remark">订单备注：{{ row.remark }}</p>
          <p class="red" v-if="row.errorRemark">异常信息：{{ row.errorRemark }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" min-width="160px" label="订单金额">
        <template #default="{ row }">
          <p>总金额：{{ row.amount }}</p>
          <p>运费：{{ row.freightAmount }}</p>
          <!--          <p>销售运费：{{ row.salesFreightAmount }}</p>-->
          <!--          <p>折扣金额：{{ row.discountAmount }}</p>-->
          <p>交易额：{{ row.transactionAmount }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="productBarcode" min-width="260px" label="发货信息">
        <template #default="{ row }">
          <p>收件人：{{ row.buyerName }}</p>
          <p>收件人电话：{{ row.buyerPhone }}</p>
          <p>国家或地区：{{ row.buyerCountryDesc }}</p>
          <p>发货仓库：{{ row.warehouseDesc }}</p>
          <p>仓库配送：{{ row.shippingDesc }}</p>
          <p>
            跟踪号：
            <a v-if="row.trackOrderCode" target="_blank" :href="row.trackOrderCodeUrl">
              {{ row.trackOrderCode }}
            </a>
            <template v-else>-</template>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="estimateShipDate" min-width="240px" label="日期">
        <template #default="{ row }">
          <p>创建：{{ row.createTime }}</p>
          <p>审核：{{ row.osAuthTime }}</p>
          <p>发货：{{ row.sendTime }}</p>
          <p>预计到货：{{ row.expectedArrivalTime }}</p>
          <p>签收：{{ row.signTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
                permissionCode: 'TTOrderDetail',
              },
              {
                label: '重推',
                key: 'push',
                type: 'primary',
                text: true,
                row: row,
                hide: !row.button.showRetrtFba,
                permissionCode: 'TTOrderPush',
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
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :params="search"
    @close="batchUpdate"
    :order-code-list="codeList"
  />
  <BatchAuditModal
    v-if="batchAuditVisible"
    :visible="batchAuditVisible"
    :params="search"
    @close="batchAudit"
    :order-code-list="codeList"
    :batch-audit-type="batchAuditType"
  />
  <RemarkDialog ref="remarkRef" @success="refreshList" />
</template>

<script lang="ts" setup name="TTOrder">
  import { metaApi, erpApi, memberApi, ErpApi, platformApi, dataApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import useTask from '@/store/modules/task';
  import { B2BOrderRefresh, stopB2BOrderRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';
  import BatchUpdateModal from '@/views/supplyChainManage/B2BOrder/orderManage/components/BatchUpdateModal.vue';
  import { DictBean } from '@/api/erp/data-contracts';
  import BatchAuditModal from '@/views/supplyChainManage/B2BOrder/orderManage/components/BatchAuditModal.vue';
  import RemarkDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/RemarkDialog.vue';
  import { encryptByBase64 } from '@/utils/aesTils';

  const searchType = ref('0');

  const searchTypeMap = {
    0: {
      key: 'orderCode',
      label: '订单号',
      placeholder: '订单号(多个可用空格或逗号分隔)',
    },
    1: {
      key: 'productName',
      label: '产品名称',
      placeholder: '产品名称',
    },
    2: {
      key: 'buyerName',
      label: '买家名称',
      placeholder: '买家名称',
    },
    3: {
      key: 'buyerId',
      label: '买家ID',
      placeholder: '买家ID',
    },
    4: {
      key: 'skuCode',
      label: '产品SKU',
      placeholder: '产品SKU',
    },
    5: {
      key: 'supplySku',
      label: '供应链SKU',
      placeholder: '供应链SKU',
    },
  };

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '100', code: 'waitConfirm', statusName: '待确认', count: '' },
    { status: '200', code: 'waitAuth', statusName: '待审核', count: '' },
    { status: '300', code: 'waitSend', statusName: '待发货', count: '' },
    { status: '400', code: 'send', statusName: '已发货', count: '' },
    { status: '500', code: 'error', statusName: '异常', count: '' },
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const store = useTask();
  const user = useStore();
  const statusColorMap = {
    100: 'blue',
    101: 'blue',
    102: 'blue',
    200: 'purple',
    201: 'purple',
    300: 'yellow',
    400: 'green',
    500: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    504: 'red',
    505: 'red',
    506: 'red',
    507: 'red',
    600: 'gray',
  };
  const time = ref<any>([]);
  const router = useRouter();
  const timeType = ref<number>(1);
  const handleTimeChange = (val) => {
    console.log('handleDateChange', val);

    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;
    search.signInTimeStart = undefined;
    search.signInTimeEnd = undefined;
    search.sendTimeStart = undefined;
    search.sendTimeEnd = undefined;
    if (val) {
      if (timeType.value === 1) {
        search.createTimeStart = val[0] || '';
        search.createTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.signInTimeStart = val[0] || '';
        search.signInTimeEnd = val[1] || '';
      } else if (timeType.value === 3) {
        search.sendTimeStart = val[0] || '';
        search.sendTimeEnd = val[1] || '';
      }
    }
  };

  const PAGE_SIZE = 10;
  const tableRef = ref();
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
    ErpApi.LuteosErpOrderQueryList.RequestBody,
    ErpApi.LuteosErpOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      orderCode: undefined,
      buyerId: undefined,
      buyerName: undefined,
      productName: undefined,
      skuCode: undefined,
      supplySku: undefined,
      creator: '',
      orderBigStatus: '',
      createTimeEnd: undefined,
      createTimeStart: undefined,
      signInTimeStart: undefined,
      signInTimeEnd: undefined,
      sendTimeStart: undefined,
      sendEndStart: undefined,
      type: 2 /* 类型：0-红人发样单 1-线下订单 */,
      meReview: undefined,
      shippingCode: undefined,
      warehouseCode: undefined,
      time: null,
      amountMin: undefined,
      amountMax: undefined,
      auditCode: undefined,
      shop: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOrderQueryList,
  });

  const handleSearchTypeChange = () => {
    for (const index in searchTypeMap) {
      if (index !== searchType.value) {
        search[searchTypeMap[index].key] = undefined;
      }
    }
  };

  const remarkRef = ref();
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'TTOrderDetail',
        query: { code: row.erpCode },
      });
      router.push(path.href);
    } else if (key === 'push') {
      const isConfirmed = await swal.confirm('确定重推订单吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpOrderFbaRetry({
        orderCode: row.erpCode,
      });
      ElMessage.success('重推成功');
      refreshList();
    }
  };

  const handleRefresh = async () => {
    await erpApi.luteosErpPlatformRefresh({
      modelCode: 'ERP_ORDER',
      forceRefresh: true,
      type: 2,
    });
    store.taskMap.B2BOrderSync = true;
    B2BOrderRefresh(user.token as string);
  };

  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      tableRef.value.clearSelection();
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 批量审核
  const batchAuditVisible = ref<boolean>(false);
  const batchAuditType = ref<string>('');

  const batchAudit = (reload) => {
    if (reload) {
      tableRef.value?.clearSelection();
      refreshList();
    }
    batchAuditVisible.value = false;
  };

  const handleBatchAudit = (type = null) => {
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => !item.button?.showAuthButton)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}非当前账号审核节点，请重新选择`);
      return;
    }
    batchAuditVisible.value = true;
    batchAuditType.value = type;
  };

  // 批量转RBA配送
  const retrtFba = async () => {
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => !item.button?.showFba)
      ?.map((item) => item.erpCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}不能转FBA，请重新选择`);
      return;
    }
    router.push({
      path: '/TTOrder/toFBA',
      query: {
        codeList: encryptByBase64(JSON.stringify(codeList.value)),
        type: 2,
      },
    });
  };

  // 表格选择
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list?.map((item) => item.erpCode);
  };

  // 发货仓库
  const warehouseList = ref<any[]>([]);
  const getWarehouseList = async () => {
    const res = await dataApi.luteosDataQueryWarehouseList({
      page: 1,
      pageSize: 1000,
    });
    warehouseList.value = res?.warehouseList;
  };
  /* const warehouseMap = ref<DictBean[]>([]);
  const queryAllWarehouse = async () => {
    const res = await erpApi.luteosErpOrderQueryAllWarehouse({
      type: 2,
    });
    warehouseMap.value = res || [];
  }; */

  const handleTabChange = (val) => {
    tableRef.value?.clearSelection();
    search.meReview = val === '200' ? false : undefined;
  };

  onMounted(() => {
    getWarehouseList();
    B2BOrderRefresh(user.token as string);
  });

  onBeforeUnmount(() => {
    stopB2BOrderRefresh();
  });

  onActivated(() => {
    tableRef.value.clearSelection();
  });
</script>

<style scoped lang="scss">
  .whitebg {
    background-color: white;
  }

  .red {
    color: #f1416c;
    margin-top: 4px;
  }

  :deep(.el-button > span) {
    display: unset;
  }
</style>
