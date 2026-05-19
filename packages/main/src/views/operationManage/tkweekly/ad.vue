<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="广告系列名称/广告组名称/店铺SKU" clearable>
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
      <ExportBtn :service="productApi.luteosProductTiktokExportTiktokAdsList" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.tiktokAdsQueryList">
      <el-table-column label="店铺SKU" prop="sellerSku" min-width="160px" />
      <el-table-column
        show-overflow-tooltip
        label="广告系列名称"
        prop="campaignName"
        min-width="260px"
      />
      <el-table-column label="广告组名称" prop="adGroupName" min-width="300px">
        <template #default="{ row }">
          <div>{{ row.adGroupName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="广告费用" prop="cost" />
      <el-table-column label="每次点击费用" prop="cpc" min-width="100px" />
      <el-table-column label="千次展示费用" prop="cpm" min-width="100px" />
      <el-table-column label="曝光量" prop="impression" />
      <el-table-column label="点击量" prop="clicks" />
      <el-table-column label="点击通过率" prop="ctrStr" />
      <el-table-column label="广告支出回报率" prop="roas" min-width="120px" />
      <el-table-column label="付费数" prop="purchases" />
      <el-table-column label="平均付费成本" prop="costPerPurchase" min-width="120px" />
      <el-table-column label="付费率" prop="purchaseRateStr" />
      <el-table-column label="平均订单价值" prop="averageOrderValue" min-width="110px" />
      <el-table-column label="总收入" prop="grossRevenue" min-width="110px" />
      <el-table-column label="币种" prop="currency" />
      <el-table-column label="统计时间" min-width="140px">
        <template #default="{ row }">
          <div class="fs-7">开始：{{ row.startDate }}</div>
          <div class="fs-7">结束：{{ row.endDate }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="店铺SKU" prop="sellerSku" min-width="150px" /> -->
      <!-- <el-table-column label="统计周数" prop="week" /> -->
      <!-- <el-table-column label="统计月份" prop="month" /> -->
      <!-- <el-table-column label="统计年份" prop="year" /> -->
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

<script lang="ts" setup name="tkweeklyad">
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
    ProductApi.LuteosProductTiktokQueryTiktokAdsList.RequestQuery,
    ProductApi.LuteosProductTiktokQueryTiktokAdsList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      year: undefined,
      quarter: undefined,
      month: undefined,
      week: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductTiktokQueryTiktokAdsList,
  });
  const reset = () => {
    resetSearch();
    year.value = '';
    month.value = '';
    week.value = '';
  };
</script>

<style scoped lang="scss"></style>
