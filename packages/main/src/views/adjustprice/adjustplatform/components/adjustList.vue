<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input :placeholder="placeholder" v-model="search.keyWord" class="w-275px">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <ProductChannelSelect
        v-if="showChannel"
        v-model="search.channelList"
        clearable
        multiple
        style="width: 140px"
        :filters="[
          'amazon',
          'shopify',
          'offline',
          'retailer',
          'distributor',
          'bestbuy_offline',
          'walmart_offline',
          'cardinal',
          'boxout',
          'bergen',
          'douyin',
          'xiaohongshu',
          'jd',
          'sam',
          'tmall',
          'taobao',
          'pdd',
        ]"
      />
      <!--      <ProductSiteSelect v-model="search.shopSiteList" clearable multiple style="width: 140px" />-->
      <CountrySelect
        v-model="search.shopSiteList"
        clearable
        multiple
        style="width: 160px"
        placeholder="站点"
        :scene="1"
      />
      <el-select style="width: 160px" placeholder="调价类型" v-model="search.adjustType" clearable>
        <el-option v-for="(val, key) in adjustTypeMap" :key="key" :label="val" :value="key" />
      </el-select>
      <el-select style="width: 160px" placeholder="活动状态" v-model="search.status" clearable>
        <el-option v-for="(val, key) in statusMap" :key="key" :label="val" :value="key" />
      </el-select>
      <el-select
        style="width: 160px"
        placeholder="审核状态"
        v-model="search.approveStatus"
        clearable
      >
        <el-option v-for="(val, key) in approveStatusMap" :key="key" :label="val" :value="key" />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        v-if="!isChildList"
        type="primary"
        @click="toPath(platformMap[type]?.childList.path)"
        v-permission="platformMap[type]?.childList.path"
      >
        {{ platformMap[type]?.childList.name }}
      </el-button>
      <!-- <el-button type="primary" @click="runQuery">查询</el-button> -->
      <el-button v-if="!isChildList" type="primary" @click="add">新增</el-button>
      <el-popover
        popper-class="rt_el_pop h-475px"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="350"
        :visible="popoverVisible"
      >
        <div class="h-xl-100">
          <div class="px-7 py-5">
            <div class="fs-4 text-dark fw-bold">筛选条件</div>
          </div>
          <div class="separator border-gray-200"></div>
          <div class="py-5 h-xl-100">
            <div
              style="
                height: calc(100% - 100px);
                padding-left: 1.75rem;
                padding-right: 1rem;
                margin-right: 0.75rem;
              "
            >
              <el-form label-width="100" label-position="top">
                <el-form-item label="创建人">
                  <el-select
                    class="w-100"
                    v-model="creator"
                    placeholder="请选择创建人"
                    filterable
                    clearable
                    :teleported="false"
                  >
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item of creatorList"
                      :key="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="当前审核人">
                  <el-select
                    class="w-100"
                    v-model="approver"
                    placeholder="请选择审核人"
                    filterable
                    clearable
                    :teleported="false"
                  >
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item of creatorList"
                      :key="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="调价周期">
                  <el-date-picker
                    class="w-100"
                    v-model="time"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    :popper-options="{ placement: 'bottom-start' }"
                  />
                </el-form-item>
              </el-form>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem"
            >
              <el-button type="primary" @click="reset">重置</el-button>
              <el-button type="primary" @click="filterSearch">确定</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <el-button type="primary" @click="popoverVisible = true">筛选</el-button>
        </template>
      </el-popover>
      <!-- <el-button type="primary" @click="reset">重置</el-button> -->
      <el-button
        @click="
          handleExport({
            ...search,
          })
        "
        :loading="exportLoading"
        type="primary"
        plain
      >
        导出
      </el-button>
    </template>
    <el-table :data="listData?.priceAdjustmentBeanList" v-loading="listLoading">
      <el-table-column :label="keyword" fixed width="150">
        <template #default="{ row }">
          <div
            v-if="[1, 2, 4].includes(row.approveStatus)"
            @click="toDetail(row.paCode, row.paDetailCode)"
            class="text-primary cursor-pointer"
          >
            <div v-if="isChildList">
              <div>{{ row[platformMap[type].child] }}</div>
              <div class="text-gray-400">{{ row[platformMap[type].parent] }}</div>
            </div>
            <div v-else>{{ row[platformMap[type].parent] }}</div>
          </div>
          <div v-else>
            <div v-if="isChildList">
              <div>{{ row[platformMap[type].child] }}</div>
              <div class="text-gray-400">{{ row[platformMap[type].parent] }}</div>
            </div>
            <div v-else>{{ row[platformMap[type].parent] }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="type === 'childasin'" label="MSKU" prop="skuCode" min-width="150" />
      <el-table-column label="产品名称" prop="spuName" min-width="120">
        <template #default="{ row }">
          <OverflowTooltip :content="row.spuName" :line="1" />
        </template>
      </el-table-column>
      <el-table-column v-if="showChannel" label="渠道" prop="channelDesc" />
      <el-table-column label="站点" min-width="120">
        <template #default="{ row }">
          <span>{{ row.siteList?.map((item) => item.siteName)?.join(',') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调价类型" prop="adjustTypeDesc" />
      <el-table-column label="售价" min-width="150">
        <template #default="{ row }">
          <div>
            调价前：{{ row.currentPrice }}
            <span class="text-gray-400">{{ row.currentPriceCurrencyCode }}</span>
          </div>
          <div>
            调价后：{{ row.adjustPrice }}
            <span class="text-gray-400">{{ row.adjustPriceCurrencyCode }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="毛利率" min-width="100">
        <template #default="{ row }">
          <div>
            调价前：{{ row.currentProfitRate }}
            <span class="text-gray-400">%</span>
          </div>
          <div>
            调价后：{{ row.adjustProfitRate }}
            <span class="text-gray-400">%</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="申请售价">
        <template #default="{ row }">
          <div class="d-flex flex-wrap gap-1">
            <div>{{ row.adjustPrice }}</div>
            <div class="text-gray-400">{{ row.adjustPriceCurrencyCode }}</div>
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="调价后毛利率" width="100">
        <template #default="{ row }">
          <span>{{ row.adjustProfitRate }}</span>
          <span class="text-gray-400 ms-1">%</span>
        </template>
      </el-table-column> -->

      <el-table-column label="调价周期" width="110">
        <template #default="{ row }">
          <div class="fs-7">{{ row.startTime }}</div>
          <div class="fs-7">{{ row.endTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="活动状态">
        <template #default="{ row }">
          <Tag :class="statusColors[row.status]">{{ statusMap[row.status] }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="90">
        <template #default="{ row }">
          <Tag :class="statusColors[row.approveStatus]">
            {{ approveStatusMap[row.approveStatus] }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="当前审核人" prop="approverName" min-width="110" />
      <el-table-column label="目标销量" prop="targetSales" />
      <el-table-column v-if="isAmazon" label="目标大类排名" prop="targetCategoryRank" width="110" />
      <el-table-column
        v-if="isAmazon"
        label="目标小类排名"
        prop="targetSubCategoryRank"
        width="110"
      />
      <el-table-column label="实际销量" prop="actualSales" />
      <el-table-column v-if="isAmazon" label="实际大类排名" prop="actualCategoryRank" width="110" />
      <el-table-column
        v-if="isAmazon"
        label="实际小类排名"
        prop="actualSubCategoryRank"
        width="110"
      />
      <el-table-column label="调价次数" prop="priceAdjustCount" v-if="!isHidePriceAdjustCount" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="操作" fixed="right" min-width="180">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '详情',
                key: 'detail',
                code: scope.row.paCode,
                detailCode: scope.row.paDetailCode,
                hide: ![1, 2, 4].includes(scope.row.approveStatus),
              },
              {
                label: '编辑',
                key: 'edit',
                code: scope.row.paCode,
                detailCode: scope.row.paDetailCode,
                hide:
                  (scope.row.approveStatus !== 0 && scope.row.approveStatus !== 3) ||
                  [3, 5].includes(scope.row.status),
              },
              {
                label: '复制',
                key: 'copy',
                code: scope.row.paCode,
                hide: isChildList,
              },
              {
                label: '提交审核',
                key: 'submit',
                code: scope.row.paCode,
                hide:
                  isChildList ||
                  (scope.row.approveStatus !== 0 && scope.row.approveStatus !== 3) ||
                  [3, 5].includes(scope.row.status),
              },
              {
                label: '取消',
                key: 'cancel',
                code: scope.row.paCode,
                hide:
                  (userInfo.memberCode !== scope.row.creator && !isSuperAdmin) ||
                  isChildList ||
                  scope.row.approveStatus !== 0,
              },
              {
                label: '撤销',
                key: 'cancel',
                code: scope.row.paCode,
                hide:
                  (userInfo.memberCode !== scope.row.creator && !isSuperAdmin) ||
                  isChildList ||
                  (scope.row.approveStatus !== 1 && scope.row.approveStatus !== 2) ||
                  [3, 5].includes(scope.row.status),
              },
              {
                label: '操作日志',
                key: 'log',
                code: scope.row.paCode,
                hide: isChildList,
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
  <OperationLog
    v-model="showLog"
    :select-type="1"
    :platform="platformMap[type]?.platform"
    :pa-code="curPaCode"
  />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { memberApi, PriceApi, priceApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import * as swal from '@/utils/swal';
  import useExport from '@/hooks/list/useExport';
  import OperationLog from '@/views/adjustprice/components/operationLog.vue';
  import SiteSelect from '@/views/adjustprice/adjustplatform/components/SiteSelect.vue';
  import { useStore } from '@/store/modules/useStore';
  import { pick } from 'lodash-es';

  const { isSuperAdmin, getInfo } = useStore();
  const userInfo = getInfo;
  const router = useRouter();

  const props = defineProps<{
    type: string;
    placeholder: string;
    keyword: string;
    service: any;
  }>();
  const adjustTypeMap = {
    1: '涨价',
    2: '降价',
    3: '秒杀',
    4: 'coupon',
    5: 'coupon/秒杀',
  };

  const statusMap = {
    0: '草稿中',
    1: '待审核',
    2: '已生效',
    3: '已结束',
    4: '已取消',
    5: '已过期',
  };

  const approveStatusMap = {
    0: '草稿中',
    1: '审核中',
    2: '审批通过',
    3: '审批驳回',
    4: '撤回/取消',
  };

  const statusColors = {
    0: 'blue',
    1: 'purple',
    2: 'green',
    3: 'red',
    4: 'black',
    5: 'red',
  };

  const platformMap = {
    amazonadjust: {
      platform: 1,
      parent: 'parentAsin',
      child: 'childAsin',
      firstColumnLabel: '子ASIN/MSKU',
      childList: {
        name: '子ASIN列表',
        path: 'childasinlist',
      },
    },
    childasin: {
      platform: 1,
      parent: 'parentAsin',
      parentType: 'amazonadjust',
      child: 'childAsin',
      firstColumnLabel: '子ASIN/MSKU',
    },
    shopifyadjust: {
      platform: 2,
      parent: 'productId',
      child: 'variantId',
      firstColumnLabel: 'Variant ID',
      childList: {
        name: 'SKU列表',
        path: 'skuadjustlist',
      },
    },
    skuadjust: {
      platform: 2,
      parent: 'productId',
      parentType: 'shopifyadjust',
      child: 'variantId',
      firstColumnLabel: 'Variant ID',
    },
    newplatformadjust: {
      platform: 3,
      parent: 'itemId',
      child: 'subItemId',
      firstColumnLabel: 'SPU',
      childList: {
        name: 'SKU列表',
        path: 'itemidadjustlist',
      },
    },
    itemidadjust: {
      platform: 3,
      parent: 'itemId',
      parentType: 'newplatformadjust',
      child: 'subItemId',
      firstColumnLabel: 'SPU',
    },
    tiktokadjust: {
      platform: 4,
      parent: 'productId',
      child: 'skuId',
      firstColumnLabel: 'SPU',
      childList: {
        name: 'SKU列表',
        path: 'itemidadjustlist',
      },
    },
  };
  const isAmazon = computed(() => {
    return ['amazonadjust', 'childasin'].includes(props.type);
  });

  const showChannel = computed(() => {
    return ['newplatformadjust', 'itemidadjust'].includes(props.type);
  });

  const isChildList = computed(() => {
    return ['childasin', 'itemidadjust', 'skuadjust'].includes(props.type);
  });

  const isHidePriceAdjustCount = computed(() => {
    return ['amazonadjust', 'shopifyadjust', 'tiktokadjust'].includes(props.type);
  });

  const popoverVisible = ref<boolean>(false);

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
    PriceApi.LuteosPriceQueryPriceInfoList.RequestQuery & { time?: string[] },
    PriceApi.LuteosPriceQueryPriceInfoList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      channelList: undefined,
      shopSiteList: undefined,
      adjustType: undefined,
      status: undefined,
      approveStatus: undefined,
      creator: undefined,
      approver: undefined,
      startTime: undefined,
      endTime: undefined,
      platform: platformMap[props.type]?.platform,
    },
    interceptSearchData: (searchData) => {
      const { shopSiteList, channelList } = searchData;
      return {
        ...pick(searchData, [
          'keyWord',
          'adjustType',
          'status',
          'approveStatus',
          'creator',
          'startTime',
          'endTime',
          'platform',
          'approver',
        ]),
        shopSiteList: shopSiteList?.join(','),
        channelList: channelList?.join(','),
      };
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: isChildList.value
      ? priceApi.luteosPriceDetailQuerySubPriceInfoList
      : priceApi.luteosPriceQueryPriceInfoList,
  });

  const add = () => {
    router.push(`/${props.type}/add`);
  };

  const toDetail = (code, detailCode) => {
    // eslint-disable-next-line no-unused-expressions
    isChildList.value
      ? router.push(`/${props.type}/detail?code=${code}&detailCode=${detailCode}`)
      : router.push(`/${props.type}/detail?code=${code}`);
  };

  const toEdit = (code, detailCode) => {
    // eslint-disable-next-line no-unused-expressions
    isChildList.value
      ? router.push(
          `/${platformMap[props.type].parentType}/edit?code=${code}&detailCode=${detailCode}`
        )
      : router.push(`/${props.type}/edit?code=${code}`);
  };

  const copy = async (code) => {
    const isConfirmed = await swal.confirm('请确认是否复制该调价活动');
    if (!isConfirmed) return;
    await priceApi.luteosPriceOperatePriceInfo({
      operateType: 1,
      paCode: code,
      platform: platformMap[props.type]?.platform,
    });
    ElMessage.success('复制成功');
    refreshList();
  };

  const submit = async (code) => {
    const isConfirmed = await swal.confirm('请确认是否提交审核');
    if (!isConfirmed) return;
    await priceApi.luteosPriceOperatePriceInfo({
      operateType: 2,
      paCode: code,
      platform: platformMap[props.type]?.platform,
    });
    ElMessage.success('已提交审核');
    refreshList();
  };

  const cancel = async (code) => {
    const isConfirmed = await swal.confirm('请确认是否将该调价活动取消/撤销');
    if (!isConfirmed) return;
    await priceApi.luteosPriceOperatePriceInfo({
      operateType: 3,
      paCode: code,
      platform: platformMap[props.type]?.platform,
    });
    ElMessage.success('取消成功');
    refreshList();
  };

  const showLog = ref<boolean>(false);
  const curPaCode = ref<string>(false);
  const handleActions = (item) => {
    const { key, code, detailCode } = item;
    switch (key) {
      case 'copy':
        copy(code);
        break;
      case 'detail':
        toDetail(code, detailCode);
        break;
      case 'edit':
        toEdit(code, detailCode);
        break;
      case 'log':
        curPaCode.value = code;
        showLog.value = true;
        break;
      case 'submit':
        submit(code);
        break;
      case 'cancel':
        cancel(code);
        break;
      default:
        break;
    }
  };
  const { handleExport, exportLoading } = useExport(
    isChildList.value
      ? priceApi.luteosPriceDetailExportSubPriceInfoList
      : priceApi.luteosPriceExportPriceInfoList
  );
  const reset = () => {
    creator.value = '';
    approver.value = '';
    time.value = [];
    resetSearch();
  };

  const time = ref();
  const creator = ref<string>('');
  const approver = ref<string>('');
  const filterSearch = () => {
    search.creator = creator.value;
    search.approver = approver.value;
    search.startTime = time.value?.[0];
    search.endTime = time.value?.[1];
    popoverVisible.value = false;
  };

  const creatorList = ref<any[]>([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };

  const toPath = (url) => {
    router.push(url);
  };
  onMounted(() => {
    getCreatorList();
  });
</script>

<style scoped lang="scss">
  .drawer-item {
    margin-bottom: 20px;
  }
</style>
