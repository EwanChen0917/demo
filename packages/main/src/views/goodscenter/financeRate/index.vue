<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="原币种、原币种编码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="search.reportMonth"
        type="month"
        placeholder="报表月份"
        value-format="YYYYMM"
        :disabled-date="(time) => time > new Date()"
      />
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.rateList"
      class-name="table-row-dashed"
    >
      <!--      <el-table-column type="selection" width="40" reserve-selection />-->
      <el-table-column label="报表月份" prop="reportMonth" />
      <el-table-column label="汇率日期" prop="exchangeRateDate" />
      <el-table-column label="原币" prop="originalCurrency" />
      <el-table-column label="货币代码" prop="originalCurrencyCode" />
      <el-table-column label="人民币汇率" prop="rateCny" />
      <el-table-column label="美元汇率" prop="rateUsd" />
      <el-table-column label="数据状态" prop="dataStatus" />
      <el-table-column label="禁用状态" prop="disableStatus" />
      <el-table-column label="系统预置" prop="systemPreset" />
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

<script setup lang="ts" name="financeRate">
import useList from '@/hooks/list/useList';
  import { DataApi, dataApi } from '@/api';

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
    DataApi.LuteosDataQueryFinanceCurrencyRate.RequestQuery,
    DataApi.LuteosDataQueryFinanceCurrencyRate.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      reportMonth: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: dataApi.luteosDataQueryFinanceCurrencyRate,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key } = item;
  };
</script>

<style scoped lang="scss"></style>
