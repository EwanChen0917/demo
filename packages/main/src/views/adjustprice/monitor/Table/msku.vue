<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.msku" placeholder="请输入店铺SKU" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <el-input v-model="search.keyword" placeholder="请输入产品SKU/产品名称" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.channel" clearable placeholder="渠道">
        <el-option
          v-for="item in channelList"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <OnlineSiteSelect v-model="search.site" clearable placeholder="站点" />
      <ProductShopSelect v-model="search.shop" clearable :site-list="[search.site]" />
      <ProductLineSelect v-model="search.productLine" placeholder="品线" clearable />
    </template>
    <template #buttons>
      <el-button type="primary" @click="batchVisible = true" :disabled="!rpaCodeList.length">
        批量设置
      </el-button>
      <el-button type="primary" @click="addMonitor">新增监控商品</el-button>
      <el-button type="primary" @click="uploadVisible = true">导入</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.sellerSkuList"
      row-key="rpaCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="店铺SKU" min-width="250">
        <template #default="{ row }">
          <div>
            {{ row?.msku }}
            <Copy :content="row.msku" />
          </div>
          <div>
            {{ row?.asin }}
            <Copy :content="row.asin" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="渠道信息" prop="channel" min-width="180">
        <template #default="{ row }">
          <div>{{ row?.channel }}</div>
          <div>{{ row?.shop }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="statusDesc">
        <template #default="{ row }">
          <Tag
            :color="
              row.statusDesc === '上架' ? 'blue' : row.statusDesc === '下架' ? 'purple' : 'green'
            "
            size="small"
          >
            {{ row?.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="当前售价" prop="currPrice" min-width="120">
        <template #default="{ row }">
          <span v-if="row?.currPrice">{{ row?.currPrice }} {{ row?.currency }}</span>
          <span v-else>--</span>
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            :content="`${row?.currPrice ? '更新时间：' + row.updateTime : '暂未获取最新售价'}`"
          >
            <QuestionFilled class="question-icon" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="MSRP" prop="msrpList" min-width="130">
        <template #default="{ row }">
          <div v-for="item in row.msrpList" :key="item.skuCode">
            <span>
              {{ item.msrpPriceStr }}
            </span>
            <el-tooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top-start"
              effect="light"
              :content="item.skuCode"
            >
              <QuestionFilled class="question-icon" style="margin-top: -3px" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="运营" prop="operatorName" />
      <el-table-column label="产品信息" min-width="250">
        <template #default="{ row }">
          <template v-if="row.productSkuList.length === 1">
            <template v-for="(item, index) in row.productSkuList" :key="index">
              <OverflowTooltip :content="item.productTitle" :line="1" />
              <template v-if="row.productSkuList.length === 1">
                <div class="fs-7">{{ item.skuCode }} &nbsp; {{ item.productLineDesc }}</div>
                <div class="fs-7" v-if="item.suggestPrice">
                  {{ item.suggestPrice }} {{ item.suggestCurrency }}
                </div>
              </template>
            </template>
          </template>
          <template v-else-if="row.productSkuList.length > 1">
            <ElTooltip popper-class="action_tool_tip" placement="top" effect="dark">
              <template #content>
                <div class="tool-content">
                  <div v-for="(item, index) in row.productSkuList" :key="index">
                    <div class="line" v-if="index !== 0"></div>
                    <div>{{ item.productTitle }}</div>
                    <div class="fs-7">{{ item.skuCode }} &nbsp; {{ item.productLineDesc }}</div>
                    <div class="fs-7" v-if="item.suggestPrice">
                      {{ item.suggestPrice }} {{ item.suggestCurrency }}
                    </div>
                  </div>
                </div>
              </template>
              <div>
                <div v-for="(item, index) in row.productSkuList" :key="index">
                  <div v-if="index < 2" class="product-title">{{ item.productTitle }}</div>
                  <div v-if="index === 1">...</div>
                </div>
              </div>
            </ElTooltip>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="监控配置" prop="firstOrderTime" min-width="200">
        <template #default="{ row }">
          <div v-if="row?.monitorStatusDesc">
            <Tag :color="monitorStatusColorMap[row.monitorStatus]" size="small">
              {{ row?.monitorStatusDesc }}
            </Tag>
          </div>
          <div v-for="(item, index) in row.monitorList" :key="index" style="margin-top: 5px">
            {{ item?.description }}
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
              {
                label: '在线商品表现',
                key: 'toPerformance',
                type: 'primary',
                row: row,
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
  import BatchConfig from '../Modal/batchMskuConfig.vue';
  import MonitorConfig from '../Modal/monitorConfig.vue';

  const PAGE_SIZE = 10;
  const monitorStatusColorMap = {
    0: 'purple',
    1: 'blue',
  };
  const channelList = ref([
    {
      value: 'amazon',
      desc: 'amazon',
    },
    {
      value: 'shopify',
      desc: 'shopify',
    },
    {
      value: 'walmart',
      desc: 'walmart',
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
    PriceApi.LuteosPriceQueryMonitorList.RequestBody,
    PriceApi.LuteosPriceQueryMonitorList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: undefined,
      msku: undefined,
      productLine: undefined,
      shop: undefined,
      site: undefined,
    } as any,
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: priceApi.luteosPriceQueryMonitorList,
  });

  const tableRef = ref();
  const addMonitor = () => {
    router.push('/adjustpriceMonitor/mskuConfig/edit');
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
      router.push(`/adjustpriceMonitor/mskuConfig/edit?code=${row.rpaCode}`);
    }
    if (key === 'updateStatus') {
      await priceApi.luteosPriceOperateSellerMonitor({
        rpaCode: row.rpaCode,
        operateType: row.monitorStatus === 0 ? 'enable' : 'disable',
      });
      ElMessage.success(row.monitorStatus === 0 ? '开启成功' : '关闭成功');
      runQuery();
    }
    if (key === 'toPerformance') {
      toPerformance(row);
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
