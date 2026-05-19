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
        <span class="tab-count">({{ listData?.statusCountBean[item.code] }})</span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="请输入子ASIN/父ASIN/MSKU" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <OnlineSiteSelect v-model="search.siteList" clearable multiple placeholder="站点" />
      <ProductShopSelect
        v-model="search.shopList"
        clearable
        multiple
        platform="amazon"
        :site-list="search.siteList"
      />
      <DeptMember
        placeholder="运营"
        v-model="search.operatorIdList"
        clearable
        multiple
        deptId="65717209"
      />
      <el-select
        v-model="search.state"
        placeholder="前台状态"
        clearable
        filterable
        :teleported="false"
        collapse-tags
      >
        <el-option
          v-for="item in stateList"
          :value="item?.value"
          :label="item?.desc"
          :key="item?.value"
        />
      </el-select>
      <el-select
        v-model="search.hasHijackErr"
        placeholder="跟卖异常"
        clearable
        filterable
        :teleported="false"
        collapse-tags
      >
        <el-option
          v-for="item in hasHijackErrList"
          :value="item?.value"
          :label="item?.desc"
          :key="item?.value"
        />
      </el-select>
      <el-select
        v-model="search.hasReturnRisk"
        placeholder="退货标识"
        clearable
        filterable
        :teleported="false"
        collapse-tags
      >
        <el-option
          v-for="item in hasReturnRiskList"
          :value="item?.value"
          :label="item?.desc"
          :key="item?.value"
        />
      </el-select>
      <el-select
        v-model="search.hasMissingShopCart"
        placeholder="丢失购物车"
        clearable
        filterable
        :teleported="false"
        collapse-tags
      >
        <el-option
          v-for="item in hasMissingShopCartList"
          :value="item?.value"
          :label="item?.desc"
          :key="item?.value"
        />
      </el-select>
      <el-select
        v-model="search.hasCompetitivenessPrice"
        placeholder="出现有竞争力价格"
        clearable
        filterable
        :teleported="false"
        collapse-tags
      >
        <el-option
          v-for="item in hasCompetitivenessPriceList"
          :value="item?.value"
          :label="item?.desc"
          :key="item?.value"
        />
      </el-select>
      <!-- <OnlineGoodsLabel v-model="search.tagList" clearable multiple platform="amazon" /> -->
    </template>
    <template #buttons>
      <!--      <ExportBtn
        :service="productApi.luteosProductAmazonListingDownload"
        :params="{
          ...search,
          dimensionType: 1,
        }"
      >
        导出
      </ExportBtn>-->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      :row-key="
        (row) => {
          return row.id + row.site;
        }
      "
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="店铺信息" min-width="180">
        <template #default="scope">
          <div class="text-dark" style="word-break: break-all">
            {{ scope.row.shop }}
            <Copy :content="scope.row.shop" />
          </div>
          <div class="fs-7">{{ scope.row.site }} {{ scope.row.siteName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="group" label="组别" width="100" />
      <el-table-column label="产品信息" min-width="350">
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.imageUrl"
            :title="scope.row.productTitle"
            :url="scope.row.asinUrl"
            openUrl
          />
        </template>
      </el-table-column>
      <el-table-column label="ASIN信息" min-width="170">
        <template #default="{ row }">
          <div class="fs-7">
            父：
            <a class="link" @click="toPath(row.parentAsinUrl)">
              {{ row?.parentAsin }}
              <Copy :content="row.parentAsin" />
            </a>
          </div>
          <div class="fs-7">
            子：
            <a class="link" @click="toPath(row.asinUrl)">
              {{ row?.asin }}
              <Copy :content="row.asin" />
            </a>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="店铺SKU信息" min-width="240">
        <template #default="{ row }">
          <div class="fs-7">
            MSKU： {{ row?.msku }}
            <Copy :content="row.msku" />
          </div>
          <div class="fs-7">
            FNSKU： {{ row?.fnsku }}
            <Copy :content="row.fnsku" />
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="运营人员" prop="operatorName">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购物车价格" min-width="115">
        <template #default="{ row }">
          <div class="fs-7">{{ row?.price }}</div>
          <!-- <div class="fs-7">前台售价：{{ row?.price }}</div> -->
          <!-- <div class="fs-7">促销价格：{{ row?.salePrice }}</div> -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="运营人员" prop="operatorName">
        <template #default="{ row }">
          <span class="fs-7">{{ row?.operatorName }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="状态(后台)" min-width="90">
        <template #default="{ row }">
          <Tag :color="upStatusColorMap[row.upStatus]" size="small">{{ row?.upStatusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="状态(前台)" min-width="90">
        <template #default="{ row }">
          <div class="fs-7" v-show="row?.stateDesc">
            <!-- 变狗： -->
            <Tag :color="stateColorMap[row.state]" size="small">{{ row.stateDesc }}</Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="跟卖是否异常" prop="operatorName" min-width="120">
        <template #default="{ row }">
          <!-- <span class="fs-7">是否</span> -->
          <Tag
            :color="hasHijackErrColorMap[row.hasHijackErr]"
            v-show="row?.hasHijackErrDesc"
            size="small"
          >
            {{ row?.hasHijackErrDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="退货标识" min-width="120">
        <template #default="{ row }">
          <Tag
            :color="hasHijackErrColorMap[row.hasReturnRisk]"
            v-show="row?.hasReturnRiskDesc"
            size="small"
          >
            {{ row?.hasReturnRiskDesc }}
          </Tag>
          <div v-if="row?.firstSignTime">首次出现时间 :</div>
          <div v-if="row?.firstSignTime">{{ row?.firstSignTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="是否丢失购物车" min-width="120">
        <template #default="{ row }">
          <Tag
            :color="hasHijackErrColorMap[row.hasMissingShopCart]"
            v-show="row?.hasMissingShopCartDesc"
            size="small"
          >
            {{ row?.hasMissingShopCartDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="是否出现有竞争力价格" min-width="154">
        <template #default="{ row }">
          <Tag
            :color="hasHijackErrColorMap[row.hasCompetitivenessPrice]"
            v-show="row?.hasCompetitivenessPriceDesc"
            size="small"
          >
            {{ row?.hasCompetitivenessPriceDesc }}
          </Tag>
          <div v-show="row?.hasCompetitivenessPrice">
            竞争力价格：{{ row?.competitivenessPrice + ' ' + row?.competitivenessCurrency }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="108">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '查看跟卖店铺',
                key: 'editLink',
                type: 'primary',
                row: row,
                // hide: !row.hasHijackErr,
                // permissionCode: 'childEditLink',
              },
              // {
              //   label: '跟卖趋势',
              //   key: 'followSell',
              //   type: 'primary',
              //   row: row,
              //   // hide: !row.hasHijackErr,
              // },
              // {
              //   label: '高退货趋势',
              //   key: 'hasReturnRisk',
              //   type: 'primary',
              //   row: row,
              //   hide: row.hasReturnRisk !== 1,
              // },
              // {
              //   label: '丢购物车趋势',
              //   key: 'hasMissingShopCart',
              //   type: 'primary',
              //   row: row,
              //   hide: row.hasMissingShopCart !== 1,
              // },
              {
                label: '异常趋势',
                key: 'hasMissing',
                type: 'primary',
                row: row,
                // hide:
                //   row.hasHijackErr !== 1 && row.hasReturnRisk !== 1 && row.hasMissingShopCart !== 1,
              },
              {
                label: '竞争力价格趋势',
                key: 'hasCompetitivenessPrice',
                type: 'primary',
                row: row,
                hide: row.hasCompetitivenessPrice !== 1,
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
  <followShopDialog
    title="跟卖店铺"
    :visible="editLinkVisible"
    :child-info="childInfo"
    :row="curRow"
    channel="amazon"
    keyword="msku"
    @close="editLinkVisible = false"
    @success="handleLinkSave"
    ref="followShopDialogRef"
  />
  <followShopEchartDialog
    :title="dialogTitle"
    :child-info="childInfo"
    :row="curRow"
    channel="amazon"
    keyword="msku"
    @success="handleLinkSave"
    ref="followShopEchartDialogRef"
  />
</template>

<script setup lang="ts" name="amazonOnlineNew">
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi, platformApi } from '@/api';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import followShopDialog from './components/followShopDialog.vue';
  import followShopEchartDialog from './components/followShopEchartDialog.vue';

  const PAGE_SIZE = 10;
  const tabStatusList = [
    { status: '', code: 'allCount', statusName: '全部', count: '' },
    { status: 1, code: 'listingCount', statusName: '上架', count: '' },
    { status: 2, code: 'delListing', statusName: '下架', count: '' },
  ];

  const stateColorMap = {
    0: 'green',
    1: 'red',
    2: 'red',
    // 3: 'yellow',
    // 4: 'red',
  };

  const upStatusColorMap = {
    1: 'green',
    2: 'red',
  };

  const isDeleteColorMap = {
    0: 'green',
    1: 'red',
  };

  const hasHijackErrColorMap = {
    0: 'green',
    1: 'red',
  };

  const router = useRouter();
  const route = useRoute();
  const code = route.query.code as string;
  // console.log('code', code);
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
    tableRef,
    selectedRows,
    handleSelectionChange,
    resetSearch,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductAmazonListingQueryAsinPage.RequestBody,
    ProductApi.LuteosProductAmazonListingQueryAsinPage.ResponseBody
  >({
    searchDefaults: {
      keyword: code || undefined,
      shopList: undefined,
      tagList: undefined,
      siteList: undefined,
      operatorIdList: undefined,
      status: '',
      state: undefined,
      hasHijackErr: undefined,
      hasReturnRisk: undefined,
      hasMissingShopCart: undefined,
      hasCompetitivenessPrice: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMonitorQueryList,
  });

  const stateList = ref([]);
  const hasHijackErrList = ref([]);
  const hasReturnRiskList = ref([]);
  const hasMissingShopCartList = ref([]);
  const hasCompetitivenessPriceList = ref([]);
  const queryDict = async () => {
    const res = await platformApi.platformDict({
      dictCodes: [
        'product_monitor_state_type',
        'product_monitor_hijack_type',
        'product_monitor_return_risk_type',
        'product_monitor_miss_shop_type',
        'product_monitor_compare_price_type',
      ],
    });
    stateList.value = res?.dictMap?.product_monitor_state_type;
    hasHijackErrList.value = res?.dictMap?.product_monitor_hijack_type;
    hasReturnRiskList.value = res?.dictMap?.product_monitor_return_risk_type;
    hasMissingShopCartList.value = res?.dictMap?.product_monitor_miss_shop_type;
    hasCompetitivenessPriceList.value = res?.dictMap?.product_monitor_compare_price_type;
  };
  onMounted(async () => {
    queryDict();
  });

  const editTagVisible = ref(false);
  const editOperatorVisible = ref(false);
  const editLinkVisible = ref(false);
  const childInfo = ref();
  const curRow = ref();
  const visible = ref(false);
  const followShopDialogRef = ref();
  const followShopEchartDialogRef = ref();
  const dialogTitle = ref('跟卖趋势');
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'editLink') {
      childInfo.value = `子ASIN：${row.asin}`;
      curRow.value = row;
      // editLinkVisible.value = true;
      followShopDialogRef.value.open(row);
    } else if (key === 'followSell') {
      dialogTitle.value = '跟卖趋势';
      // console.log(row);
      followShopEchartDialogRef.value.open(row, dialogTitle.value);
    } else if (key === 'hasReturnRisk') {
      dialogTitle.value = '高退货趋势';
      followShopEchartDialogRef.value.open(row, dialogTitle.value);
    } else if (key === 'hasMissingShopCart') {
      dialogTitle.value = '丢购物车趋势';
      followShopEchartDialogRef.value.open(row, dialogTitle.value);
    } else if (key === 'hasMissing') {
      dialogTitle.value = '异常趋势';
      followShopEchartDialogRef.value.open(row, dialogTitle.value);
    } else if (key === 'hasCompetitivenessPrice') {
      dialogTitle.value = '竞争力价格趋势';
      followShopEchartDialogRef.value.open(row, dialogTitle.value);
    }
  };

  const handleSave = () => {
    editTagVisible.value = false;
    refreshList();
    tableRef.value.clearSelection();
  };

  const handleOperatorSave = async (operator) => {
    /* await productApi.luteosProductAmazonListingSaveOperatorV2({
      operator,
      productId: curRow.value.productId,
    });
    ElMessage.success('保存成功'); */
    editOperatorVisible.value = false;
    refreshList();
  };
  const handleLinkSave = async () => {
    /* await productApi.luteosProductAmazonListingSaveProductLinkV2({
      productLink: url,
      productId: curRow.value.productId,
      channel: 'amazon',
      site: curRow.value.site,
      shop: curRow.value.shop,
    });
    ElMessage.success('保存成功'); */
    editLinkVisible.value = false;
    refreshList();
  };

  const handleAddSkuRelation = () => {
    visible.value = false;
    refreshList();
  };

  const toPerformance = (row) => {
    console.log(row);
    if (row) {
      // site, channel, shop, asin, sellerSku, skuCode
      const path = router.resolve({
        path: '/onlineGoodsPerformance/detail',
        query: {
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

  const toPath = (url) => {
    if (url.includes('http')) {
      openWindow(url);
    } else {
      ElMessage.warning('该链接无法跳转');
    }
  };
</script>

<style scoped lang="scss">
  .link {
    cursor: pointer;
    color: #3e97ff !important;

    &:hover {
      color: #78b6ff !important;
    }
  }
</style>
