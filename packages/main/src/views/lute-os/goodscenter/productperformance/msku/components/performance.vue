<template>
  <KeenList>
    <template #search>
      <el-date-picker
        v-model="searchDate"
        type="daterange"
        @change="handleDateChange"
        value-format="YYYY-MM-DD"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.sellerPriceList" row-key="44">
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="日期" prop="recordDate" min-width="120" />
      <el-table-column label="实时售价" prop="price">
        <template #default="{ row }">{{ row.price }}&nbsp;{{ row.currency }}</template>
      </el-table-column>
      <el-table-column label="大类排名" prop="bigCategoryRanking" />
      <el-table-column label="小类排名" prop="smallCategoryRanking" />
      <el-table-column label="市占" prop="marketShare" />
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

<script lang="ts" setup>
    import { ElTable as ElTableType } from 'element-plus';
  import { productApi, ProductApi } from '@/api/index';
  import useList from '@/views/lute-os/hooks/list/useList';

  const props = defineProps<{
    skuInfo?: object;
  }>();

  const route = useRoute();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 设置默认十五天
  const endDate = new Date(); // 当前日期
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 15);
  const searchDate = ref([formatDate(startDate), formatDate(endDate)]);

  const PAGE_SIZE = 10;
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
  } = useList<
    ProductApi.LuteosProductPerformanceQuerySkuPerformance.RequestQuery,
    ProductApi.LuteosProductPerformanceQuerySkuPerformance.ResponseBody
  >({
    searchDefaults: {
      startDate: undefined,
      endDate: undefined,
      shop: props.skuInfo.shop,
      channel: props.skuInfo.channel,
      site: props.skuInfo.site,
      msku: route.query.code,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductPerformanceQuerySkuPerformance,
  });

  const handleDateChange = (val) => {
    if (val && val.length) {
      search.startDate = val[0];
      search.endDate = val[1];
    } else {
      search.startDate = undefined;
      search.endDate = undefined;
    }
  };
</script>

<style scoped lang="scss"></style>
