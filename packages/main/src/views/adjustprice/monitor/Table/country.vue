<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="规则编号" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.monitorStatus" clearable placeholder="状态">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="search.monitorType" clearable placeholder="类型">
        <el-option
          v-for="item in minitorList"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="search.channel" clearable placeholder="渠道">
        <el-option
          v-for="item in channelList"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <CountrySelect v-model="search.countryCode" placeholder="国家" clearable class="w-200px" />
    </template>
    <template #buttons>
      <el-button type="primary" @click="addMonitor">新增监控规则</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="rpaCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="规则编号" prop="rpaCode" min-width="140" />
      <el-table-column label="状态" prop="monitorStatusDesc" min-width="140">
        <template #default="{ row }">
          <div v-if="row?.monitorStatusDesc">
            <Tag :color="monitorStatusColorMap[row.monitorStatus]" size="small">
              {{ row?.monitorStatusDesc }}
            </Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="监控类型" prop="monitorTypeDesc" min-width="140" />
      <el-table-column label="渠道" prop="channel" min-width="140" />
      <el-table-column label="国家" prop="country" min-width="140" />
      <el-table-column label="店铺" prop="shop" min-width="140" />
      <el-table-column label="监控规则" min-width="240">
        <template #default="{ row }">
          <div v-for="(item, index) in row.monitorList" :key="index" style="margin-top: 5px">
            {{ item?.description }}；{{ item?.notifyGroupDirectDesc }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '设置',
                key: 'config',
                type: 'primary',
                row: row,
              },
              {
                label: '关闭',
                key: 'updateStatus',
                type: 'danger',
                row: row,
                hide: row.monitorStatus === 0,
              },
              {
                label: '开启',
                key: 'updateStatus',
                type: 'primary',
                row: row,
                hide: row.monitorStatus === 1,
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
  <BatchConfig
    v-if="batchVisible"
    :visible="batchVisible"
    :rpaCodeList="rpaCodeList"
    @close="handleConfigClose"
  />
  <MonitorConfig
    v-if="monitorVisble"
    :visible="monitorVisble"
    :rpaCode="curRpaCode"
    @close="handleConfigClose"
  />
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="product_seller_msku"
    title="导入"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { priceApi, PriceApi } from '@/api';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import BatchConfig from '../Modal/batchMskuConfig.vue';
  import MonitorConfig from '../Modal/monitorConfig.vue';

  const PAGE_SIZE = 10;
  const monitorStatusColorMap = {
    0: 'purple',
    1: 'blue',
  };
  const statusList = ref([
    {
      value: '1',
      desc: '开启',
    },
    {
      value: '0',
      desc: '关闭',
    },
  ]);
  const minitorList = ref([
    {
      value: '1',
      desc: '售价监控',
    },
    {
      value: '2',
      desc: '成交价监控',
    },
  ]);
  const channelList = ref([
    {
      value: 'amazon',
      desc: 'amazon',
    },
    {
      value: 'walmart',
      desc: 'walmart',
    },
    {
      value: 'tiktok',
      desc: 'tiktok',
    },
    {
      value: 'shopify',
      desc: 'shopify',
    },
    {
      value: 'target',
      desc: 'target',
    },
    {
      value: 'shopee',
      desc: 'shopee',
    },
    {
      value: 'lazada',
      desc: 'lazada',
    },
  ]);

  const router = useRouter();
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
    resetSearch,
    runQuery,
    // handleSelectionChange,
    // selectedKeys,
  } = useList<
    PriceApi.LuteosPriceQueryAllMskuMonitorList.RequestBody,
    PriceApi.LuteosPriceQueryAllMskuMonitorList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      monitorStatus: undefined,
      monitorType: undefined,
      channel: undefined,
      msku: undefined,
      productLine: undefined,
      shop: undefined,
      countryCode: undefined,
      productType: 7, //    5:店铺），6:渠道）7:国家
    } as any,
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: priceApi.luteosPriceQueryAllMskuMonitorList,
  });

  const tableRef = ref();
  const addMonitor = () => {
    router.push({ path: '/adjustpriceMonitor/mskuConfig/edit', query: { productType: 7 } });
  };

  const rpaCodeList = ref([]);
  const handleSelectionChange = (list) => {
    rpaCodeList.value = list.map((item) => item.rpaCode);
  };

  // 表格操作
  const batchVisible = ref(false);
  const monitorVisble = ref(false);
  const curRpaCode = ref('');
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'config') {
      curRpaCode.value = row.rpaCode;
      router.push({
        path: '/adjustpriceMonitor/mskuConfig/edit',
        query: {
          code: row.rpaCode,
          productType: 7,
        },
      });
    }
    if (key === 'updateStatus') {
      const isConfirmed = await swal.confirm(
        `确定要${row.monitorStatus === 0 ? '开启' : '关闭'}吗？`
      );
      if (!isConfirmed) return;
      await priceApi.luteosPriceOperateSellerMonitor({
        rpaCode: row.rpaCode,
        operateType: row.monitorStatus === 0 ? 'enable' : 'disable',
        productType: 4,
      });
      ElMessage.success(row.monitorStatus === 0 ? '开启成功' : '关闭成功');
      runQuery();
    }
  };

  const handleConfigClose = (reload) => {
    if (reload) {
      runQuery();
    }
    batchVisible.value = false;
    monitorVisble.value = false;
    tableRef.value?.clearSelection();
  };

  const uploadVisible = ref(false);
  const batchUpdate = (reload) => {
    if (reload) {
      runQuery();
    }
    uploadVisible.value = false;
  };

  const toPerformance = (row) => {
    if (row) {
      // site, channel, shop, asin, sellerSku, skuCode
      const path = router.resolve({
        path: '/onlineGoodsPerformance/detail',
        query: {
          skuCode: row.skuCode,
          site: row.site,
          channel: row.channel,
          shop: row.shop,
          asin: row.asin,
          sellerSku: row.msku,
        },
      });
      openWindow(path.href);
    }
  };
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }
  .product-title {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line {
    border: 1px dashed #eee;
    margin: 10px 0;
    opacity: 0.5;
  }
</style>
