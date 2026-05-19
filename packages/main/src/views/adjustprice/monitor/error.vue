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
      </el-space>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="请输入产品SKU/产品名称"
          clearable
          style="margin-left: 8px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.monitorType" clearable filterable placeholder="监控类型">
        <el-option
          v-for="item in monitorTypeList"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="search.errorType" clearable filterable placeholder="异常类型">
        <el-option
          v-for="item in errorLevelList"
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
      <!-- <OnlineSiteSelect v-model="search.site" clearable placeholder="站点" /> -->
      <!-- 渠道、站点、店铺需要与销售映射一致 -->
      <!-- <ProductChannelSelect v-model="search.channel" clearable placeholder="渠道" /> -->
      <CountrySelect v-model="search.site" placeholder="站点" clearable />
      <ProductShopSelect v-model="search.shop" clearable :site-list="[search.site]" />
      <ProductLineSelect v-model="search.productLine" placeholder="品线" clearable />
      <el-date-picker
        v-model="search.recordDate"
        type="date"
        placeholder="监控日期"
        value-format="YYYY-MM-DD"
      />
    </template>
    <template #buttons>
      <ExportBtn :service="priceApi.luteosPriceQueryRecordListExport" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.sellerSkuList"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="监控类型" prop="monitorTypeDesc" min-width="130" />
      <el-table-column label="监控日期" prop="recordDate" min-width="130" />
      <el-table-column label="渠道信息" prop="channel" min-width="150">
        <template #default="{ row }">
          <div>{{ row?.channel }}</div>
          <div>{{ row?.shop }}</div>
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU" min-width="260">
        <template #default="{ row }">
          <div>
            {{ row?.msku }}
            <Copy :content="row.msku" />
          </div>
          <div v-if="row.platformSkuCode">
            {{ row?.platformSkuCode }}
            <Copy :content="row.platformSkuCode" />
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="店铺SKU" prop="mskuInfo" min-width="260" /> -->
      <!-- <el-table-column label="产品信息" min-width="250">
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
      </el-table-column> -->
      <el-table-column label="产品信息" prop="channel" min-width="250">
        <template #default="{ row }">
          <OverflowTooltip :content="row.productSku.productTitle" :line="1" />
          <div class="fs-7">
            {{ row.productSku.skuCode }} &nbsp; {{ row.productSku.productLineDesc }}
          </div>
          <!-- <div class="fs-7" v-if="row.productSku.skuCode">
            {{ row.productSku.skuCode }} {{ row.productSku.suggestCurrency }}
          </div> -->
        </template>
      </el-table-column>
      <el-table-column label="站点" prop="site" min-width="80" />
      <!-- <el-table-column label="状态" prop="statusDesc">
        <template #default="{ row }">
          <Tag
            :color="row.statusDesc === '上架' ? 'blue' : 'purple'"
            size="small"
            v-if="row.statusDesc"
          >
            {{ row?.statusDesc }}
          </Tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="售价/成交价" prop="currPrice" min-width="120">
        <template #default="{ row }">
          <span>{{ row?.currPrice }} {{ row?.currency }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="售价/成交价" prop="price" min-width="120" />
      <el-table-column label="参考价" prop="" min-width="250">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>参考价</span>
            <el-tooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top-start"
              effect="light"
              :content="`汇总销售映射的所有SKU 建议售价*数量（如多个SKU币种不同，则换算为USD计算）`"
            >
              <QuestionFilled class="question-icon" />
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          <span v-if="row?.referencePrice">
            <!-- {{ referenceType[row.referenceType] }}：{{ row?.referencePrice }} -->
            {{ row?.referenceTypeDesc }}：{{ row?.referencePrice }}
            {{ row?.referenceCurrency }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="差额" prop="balance" min-width="120">
        <template #header>
          <div class="d-flex align-items-center gap-1">
            <span>差额</span>
            <el-tooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top-start"
              effect="light"
              :content="`参考价 * 百分比 - 订单成交价`"
            >
              <QuestionFilled class="question-icon" />
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          <span>{{ row?.balance }} {{ row?.balanceCurrency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="GMV（T-1）" prop="gmv" min-width="120" />
      <el-table-column label="异常类型" prop="errorMonitorTypeDesc" min-width="130" />
      <el-table-column label="监控规则" prop="errorDesc" min-width="130" />
      <el-table-column label="运营" prop="operatorName" />
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '监控设置',
                key: 'config',
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
  <MonitorConfig
    v-if="monitorVisble"
    :visible="monitorVisble"
    :rpaCode="curRpaCode"
    @close="handleConfigClose"
  />
</template>

<script setup lang="ts" name="adjustpriceMonitorError">
  import useList from '@/hooks/list/useList';
  import { priceApi, PriceApi } from '@/api';
  import MonitorConfig from './Modal/monitorConfig.vue';

  const route = useRoute();
  const router = useRouter();
  const date = route.query?.date || undefined;

  const getYesterdaysDate = () => {
    const today = new Date(); // 获取当前时间
    const yesterday = new Date(today); // 从当前时间创建一个新的日期对象
    // yesterday.setDate(today.getDate() - 1); // 将这个新的日期对象设置为昨天
    yesterday.setDate(today.getDate()); // 将这个新的日期对象设置为当天
    const year = yesterday.getFullYear(); // 获取年份
    let month = yesterday.getMonth() + 1; // 获取月份，月份从0开始计数，所以加1
    let day = yesterday.getDate(); // 获取日期
    // 如果月份少于10，前面添加0
    month = month < 10 ? `0${month}` : month;
    // 如果日期少于10，前面添加0
    day = day < 10 ? `0${day}` : day;

    // 拼接成YYYY-MM-DD格式
    return `${year}-${month}-${day}`;
  };

  const PAGE_SIZE = 10;
  const monitorTypeList = ref([
    {
      value: '1',
      desc: '售价监控',
    },
    // {
    //   value: '?',
    //   desc: '成交价监控',
    // },
  ]);
  const errorLevelList = ref([
    {
      value: 'error',
      desc: '异常',
    },
    {
      value: 'violation',
      desc: '违规',
    },
    {
      value: 'msrp_error',
      desc: 'MSRP缺失',
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

  const referenceType = ref({
    adjust: '调价活动',
    discount: '促销计划',
    msrp: '渠道售价（MSRP）',
    suggest: '建议零售价',
  });

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
    tableRef,
    // handleSelectionChange,
    // selectedKeys,
  } = useList<
    PriceApi.LuteosPriceQueryRecordList.RequestBody,
    PriceApi.LuteosPriceQueryRecordList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channel: undefined,
      msku: undefined,
      productLine: undefined,
      shop: undefined,
      site: undefined,
      recordDate: route?.query?.time ?? getYesterdaysDate(),
      monitorType: undefined,
      errorType: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: priceApi.luteosPriceQueryRecordList,
  });

  const rpaCodeList = ref([]);
  const handleSelectionChange = (list) => {
    rpaCodeList.value = list.map((item) => item.rpaCode);
  };

  // 表格操作
  const monitorVisble = ref(false);
  const curRpaCode = ref('');
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'config') {
      curRpaCode.value = row.rpaCode;
      //   monitorVisble.value = true;
      // const componentName = [1, 4].includes(row.productType) ? 'mskuConfig' : 'skuConfig';
      // const componentName = [6, 7].includes(row.productType) ? 'mskuConfig' : 'skuConfig';
      const componentName = 'mskuConfig';
      router.push({
        path: `/adjustpriceMonitor/${componentName}/edit`,
        query: {
          code: row.rpaCode,
          productType: row?.productType || undefined,
        },
      });
    }
  };
  const handleConfigClose = (reload) => {
    if (reload) {
      runQuery();
    }
    monitorVisble.value = false;
  };
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
  }
  .product-title {
    max-width: 200px;
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
