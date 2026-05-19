<template>
  <!--  <el-tabs v-model="search.bigStatus" tab-position="top">-->
  <!--    <el-tab-pane-->
  <!--      v-for="item in tabStatusList"-->
  <!--      :key="item.status"-->
  <!--      :label="item.statusName"-->
  <!--      :name="item.status"-->
  <!--    >-->
  <!--      <template #label>-->
  <!--        {{ item.statusName }}-->
  <!--        <span class="tab-count">({{ statusStatistics[item.code] }})</span>-->
  <!--      </template>-->
  <!--    </el-tab-pane>-->
  <!--  </el-tabs>-->
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
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
        v-model="search[searchTypeMap[searchType].key]"
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
      <el-select v-model="timeType" style="width: 130px" @change="handleTimeChange(time)">
        <el-option :value="1" label="原地区创建" />
        <el-option :value="2" label="北京时间创建" />
      </el-select>
      <el-date-picker
        style="width: 300px"
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
        :clearable="false"
        :disabled-date="(time) => time > dayjs()"
      />
      <el-select
        style="width: 120px"
        v-model="search.channel"
        placeholder="渠道"
        filterable
        clearable
        @change="search.status = undefined"
      >
        <el-option
          v-for="item in listData?.channelEnums"
          :value="item.value"
          :label="item.desc"
          :key="item.value"
        />
      </el-select>
      <el-select
        style="width: 160px"
        v-model="search.status"
        placeholder="原单状态"
        filterable
        clearable
      >
        <template #empty>{{ search.channel ? '暂无数据' : '请先选择渠道' }}</template>
        <el-option
          v-for="item in listData?.statusEnums?.filter(
            (item) => item.filterKeyWord === search.channel
          )"
          :value="item.value"
          :label="item.desc"
          :key="item.value"
        />
      </el-select>
      <el-select v-model="search.shop" placeholder="店铺" filterable clearable>
        <el-option
          v-for="item in listData?.shopEnums"
          :value="item.value"
          :label="item.desc"
          :key="item.value"
        />
      </el-select>
      <el-select style="width: 120px" v-model="search.site" placeholder="站点" filterable clearable>
        <el-option
          v-for="item in listData?.siteEnums"
          :value="item.value"
          :label="`${item.value} - ${item.desc}`"
          :key="item.value"
        />
      </el-select>
      <CountrySelect
        style="width: 120px"
        v-model="search.country"
        placeholder="收货国家"
        filterable
        clearable
      />
      <el-select
        style="width: 135px"
        v-model="search.hasTimeoutNotShipped"
        placeholder="是否超时未发货"
        filterable
        clearable
        v-if="
          search.channel === 'amazon' &&
          (search.status === 'amazon_1' || search.status === 'amazon_0')
        "
      >
        <el-option value="是" label="是" />
        <el-option value="否" label="否" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="exportSelect">导出</el-button>
    </template>
    <!-- :data="listData?.recordList" -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="订单号/参考单号" prop="orderCode" min-width="200" fixed>
        <template #default="{ row }">
          <div class="text-dark">
            {{ row?.orderCode || '--' }}
            <Copy :content="row?.orderCode" />
          </div>
          <div>
            {{ row?.refNo || '--' }}
            <Copy :content="row?.refNo" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="原单状态" prop="orderStatusDesc" min-width="100" />
      <el-table-column label="渠道名称" prop="channel" />
      <el-table-column label="店铺" min-width="190">
        <template #default="{ row }">
          <div class="text-dark" style="word-break: break-all">
            {{ row.shop }}
            <Copy :content="row.shop" />
          </div>
          <div class="fs-7">{{ row.site }} {{ row.siteName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="交易额" min-width="160">
        <template #default="{ row }">
          <div class="fs-7">原币：{{ row.originalCurrencyAmount }} {{ row.currency }}</div>
          <div class="fs-7">美元：{{ row.usdCurrencyAmount }} USD</div>
          <div class="fs-7">人民币：{{ row.cnyCurrencyAmount }} CNY</div>
        </template>
      </el-table-column>
      <el-table-column label="买家信息" min-width="250">
        <template #default="{ row }">
          <div class="fs-7" v-if="search.channel === 'amazon'">买家：{{ row.buyerName }}</div>
          <div class="fs-7" style="word-break: break-all">邮箱：{{ row.buyerEmail }}</div>
          <div class="fs-7">电话：{{ row.buyerPhone }}</div>
          <div class="fs-7">国家或地区：{{ row.buyerCountryDesc }}</div>
          <div class="fs-7">省/州：{{ row.buyerProvince }}</div>
          <div class="fs-7">城市：{{ row.buyerCity }}</div>
          <div class="fs-7">邮编：{{ row.buyerZipcode }}</div>
        </template>
      </el-table-column>
      <el-table-column label="配送方式" prop="shippingDesc" />
      <el-table-column label="时间信息" min-width="260">
        <template #default="{ row }">
          <div class="fs-7">创建（原地区）：{{ row.localCreateTime }}</div>
          <div class="fs-7">创建（北京时间）：{{ row.createTime }}</div>
          <div class="fs-7" v-show="false">更新时间：{{ row.updateTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="平台SKU" prop="sellerSku" min-width="160" />
      <el-table-column label="数量" prop="numInt" />
      <el-table-column label="单价" prop="price" min-width="100">
        <template #default="{ row }">{{ row.price }} {{ row.currency }}</template>
      </el-table-column>
      <el-table-column label="父ASIN" prop="parentAsin" min-width="140">
        <template #default="{ row }">
          {{ row?.parentAsin || '--' }}
          <Copy :content="row?.parentAsin" />
        </template>
      </el-table-column>
      <el-table-column label="ASIN" prop="asin" min-width="140">
        <template #default="{ row }">
          {{ row?.asin || '--' }}
          <Copy :content="row?.asin" />
        </template>
      </el-table-column>
      <!--      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                permissionCode: '',
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>-->
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

<script setup lang="ts" name="allChannelOrder">
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  // import { pick } from 'lodash-es';
  import dayjs from 'dayjs';
  // import { RequestBody } from '@/api/erp/ApiRoute';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  const router = useRouter();
  const PAGE_SIZE = 10;
  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: '100', code: 'waitConfirm', statusName: '待确认', count: '' },
    { status: '200', code: 'waitAuth', statusName: '待审核', count: '' },
    { status: '300', code: 'waitSend', statusName: '待发货', count: '' },
    { status: '400', code: 'send', statusName: '已发货', count: '' },
    { status: '500', code: 'error', statusName: '异常', count: '' },
    { status: '600', code: 'abandon', statusName: '废弃', count: '' },
  ];
  const searchType = ref('0');

  const searchTypeMap = {
    0: {
      key: 'orderCode',
      label: '订单号',
      placeholder: '订单号(多个可用空格或逗号分隔)',
    },
    1: {
      key: 'sellerSku',
      label: '平台SKU',
      placeholder: '平台SKU',
    },
    2: {
      key: 'asin',
      label: 'ASIN',
      placeholder: 'ASIN',
    },
  };

  const time = ref<any>([
    dayjs().subtract(1, 'week')?.format('YYYY-MM-DD'),
    dayjs()?.format('YYYY-MM-DD'),
  ]);
  const timeType = ref<number>(1);
  const oldTime = ref([
    dayjs().subtract(1, 'week')?.format('YYYY-MM-DD'),
    dayjs()?.format('YYYY-MM-DD'),
  ]);

  const handleTimeChange = (val) => {
    if (dayjs(val[0]).add(3, 'month').isBefore(dayjs(val[1]))) {
      ElMessage.warning('时间跨度不能超过3个月');
      time.value = oldTime.value;
      return;
    }

    search.createTimeStart = undefined;
    search.createTimeEnd = undefined;
    search.localCreateTimeStart = undefined;
    search.localCreateTimeEnd = undefined;
    if (val) {
      // if (timeType.value === 1) {
      //   search.createTimeStart = val[0] || '';
      //   search.createTimeEnd = val[1] || '';
      // } else if (timeType.value === 2) {
      //   search.localCreateTimeStart = val[0] || '';
      //   search.localCreateTimeEnd = val[1] || '';
      // }
      if (timeType.value === 1) {
        search.localCreateTimeStart = val[0] || '';
        search.localCreateTimeEnd = val[1] || '';
      } else if (timeType.value === 2) {
        search.createTimeStart = val[0] || '';
        search.createTimeEnd = val[1] || '';
      }
    }
    oldTime.value = val;
  };

  const searchStatusCount = ref(true);

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
    finishFlag,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpOrderQueryAllChannelList.RequestBody,
    ErpApi.LuteosErpOrderQueryAllChannelList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      orderCode: undefined,
      sellerSku: undefined,
      asin: undefined,
      channel: 'shopify',
      site: undefined,
      country: undefined,
      shop: undefined,
      status: undefined,
      createTimeStart: dayjs().subtract(1, 'week')?.format('YYYY-MM-DD'),
      createTimeEnd: dayjs()?.format('YYYY-MM-DD'),
      localCreateTimeStart: undefined,
      localCreateTimeEnd: undefined,
      bigStatus: '',
      hasTimeoutNotShipped: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    interceptSearchData: (searchData) => {
      return {
        ...searchData,
        searchStatusCount: searchStatusCount.value,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOrderQueryAllChannelList,
  });
  watchEffect(() => {
    if (
      !(
        search.channel === 'amazon' &&
        (search.status === 'amazon_1' || search.status === 'amazon_0')
      )
    ) {
      search.hasTimeoutNotShipped = '';
    }
  });

  const statusStatistics = ref({
    abandon: 0,
    all: 0,
    error: 0,
    send: 0,
    waitAuth: 0,
    waitConfirm: 0,
    waitSend: 0,
  });
  watch(
    () => finishFlag.value,
    () => {
      searchStatusCount.value = false;
      statusStatistics.value = listData.value?.statusStatistics;
    }
  );

  // 勾选产品
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.orderCode);
  };
  const params = ref();
  const tableRef = ref();
  const exportSelect = async () => {
    if (codeList.value.length === 0) {
      ElMessage.warning('请选择要导出的订单');
      return;
    }
    // exportSelectRef.value?.open({
    //   ...search,
    //   queryParam: getQueryParam(),
    //   idList: codeList,
    // });
    // console.log(search, getQueryParam());
    params.value = {
      ...search,
      // queryParam: getQueryParam(),
      orderCodeList: codeList.value,
    };
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    try {
      const res = await erpApi.luteosErpOrderExportQueryAllChannelList({
        ...params.value,
      });
      tableRef.value.clearSelection();
      // emit('success');
      // visible.value = false;
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;
      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          // record_type: 2,
        },
      });
      openWindow(path.href);
    } catch (e) {
      swal.error(`导出失败: ${e.message}`);
    }
  };
  const handleSearchTypeChange = () => {
    for (const index in searchTypeMap) {
      if (index !== searchType.value) {
        search[searchTypeMap[index].key] = undefined;
      }
    }
  };

  // 重置
  const reset = () => {
    timeType.value = 1;
    time.value = [dayjs().subtract(1, 'week'), dayjs()];
    resetSearch();
  };
</script>

<style scoped lang="scss"></style>
