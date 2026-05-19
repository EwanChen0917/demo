<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="商品名称/SPU" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="week"
        value-format="YYYY-MM-DD"
        format="YYYY年第ww周"
        @change="handleWeekChange"
        type="week"
        placeholder="周数"
        :disabled-date="disabledDate"
      />
    </template>
    <template #buttons>
      <ExportBtn
        :service="productApi.luteosProductTiktokExportTiktokWeekReportList"
        :params="search"
      >
        导出
      </ExportBtn>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.tiktokTkShopReportList">
      <el-table-column label="统计时间" prop="startDate" min-width="100px">
        <template #default="{ row }">
          <div>{{ row.year }}年</div>
          <div>{{ row.month }}月</div>
          <div>第{{ row.week }}周</div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" min-width="220">
        <template #default="{ row }">
          <GoodsInfo
            :title="row.productName"
            :subtitle="row.productSpu"
            hide-image
            copy-title
            copy-subtitle
            :url="`/goodslist/detail?code=${row.productSpu}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌" prop="brandName" />
      <el-table-column label="合作量" prop="cooperationNum" />
      <el-table-column label="达人挂链量" prop="onlineLinkNum" />
      <el-table-column label="曝光量" prop="vvNum" />

      <el-table-column label="订单量" min-width="120px">
        <template #default="{ row }">
          <div class="fs-7">广告：{{ row.adsOrderNum }}</div>
          <div class="fs-7">自然：{{ row.naturalOrderNum }}</div>
        </template>
      </el-table-column>
      <el-table-column label="总订单量" prop="orderSum" />

      <el-table-column label="订单金额($)" min-width="140px">
        <template #default="{ row }">
          <div class="fs-7">广告：{{ row.adsOrderAmount }}</div>
          <div class="fs-7">自然：{{ row.naturalOrderAmount }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="paymentSum" min-width="160px">
        <template #header>
          总订单金额($)
          <el-tooltip content="未去除折扣" placement="top" effect="dark">
            <el-icon><InfoFilled /></el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="priceSum" min-width="160px">
        <template #header>
          成交金额($)
          <el-tooltip content="不含税&运费" placement="top" effect="dark">
            <!-- content to trigger tooltip here -->
            <el-icon><InfoFilled /></el-icon>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="" prop="sampleAmount" min-width="120px">
        <template #header>
          样品费用($)
          <el-tooltip content="采购成本+头程+尾程" placement="top" effect="dark">
            <el-icon><InfoFilled /></el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="广告费用($)" prop="adsFee" min-width="120px" />
      <el-table-column label="合作费用($)" min-width="170px">
        <template #default="{ row }">
          <div class="fs-7">固定合作费用：{{ row.fixCooperFee }}</div>
          <div class="fs-7">红人佣金费用：{{ row.userCommissionFee }}</div>
          <div class="fs-7">服务商佣金费用：{{ row.serviceCommissionFee }}</div>
        </template>
      </el-table-column>
      <el-table-column label="总费用($)" prop="sumFee" min-width="120px" />
      <el-table-column label="ROI" min-width="170px">
        <template #default="{ row }">
          <div class="fs-7">总ROI：{{ row.sumRoiStr }}</div>
          <div class="fs-7">自然流量ROI：{{ row.naturalFlowRoiStr }}</div>
          <div class="fs-7">广告ROI：{{ row.adsRoiStr }}</div>
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
</template>

<script lang="ts" setup name="tkweeklyanalysis">
  import { ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';

  const PAGE_SIZE = 10;
  const year = ref();
  const month = ref();
  const week = ref();
  const quarterList = ref([
    {
      code: 1,
      name: '第一季度',
    },
    {
      code: 2,
      name: '第二季度',
    },
    {
      code: 3,
      name: '第三季度',
    },
    {
      code: 4,
      name: '第四季度',
    },
  ]);
  const handleYearChange = (val) => {
    if (val) {
      search.year = new Date(val).getFullYear();
    } else {
      search.year = undefined;
    }
    month.value = '';
  };
  const handleMonthChange = (val) => {
    if (val) {
      search.month = new Date(val).getMonth() + 1;
    } else {
      search.month = undefined;
    }
  };

  const getWeekNumber = (d) => {
    // 将日期复制到一个新的Date对象中，这样我们就不会修改原始日期
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // 0是周日，这里设置为周一作为一周的开始
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // 获取一年的第一周，这周至少有4天在新的一年中
    const startOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // 计算两个日期之间的差，得到周数，向下取整
    const weekNo = Math.ceil(((d - startOfYear) / 86400000 + 1) / 7);
    return weekNo;
  };
  const handleWeekChange = (val) => {
    if (val) {
      search.week = getWeekNumber(new Date(val));
    } else {
      search.week = undefined;
    }
  };
  const disabledDate = (time) => {
    if (year.value) {
      return time.getFullYear() !== year.value.getFullYear();
    }
  };

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ProductApi.LuteosProductTiktokQueryTiktokWeekReportList.RequestQuery,
    ProductApi.LuteosProductTiktokQueryTiktokWeekReportList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      quarter: undefined,
      year: undefined,
      month: undefined,
      week: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductTiktokQueryTiktokWeekReportList,
  });

  const reset = () => {
    resetSearch();
    year.value = '';
    month.value = '';
    week.value = '';
  };
</script>

<style scoped lang="scss">
  :deep(.el-table) {
    .el-icon {
      margin-left: 2px;
      font-size: 13px;
      vertical-align: -2px;
    }
  }
</style>
