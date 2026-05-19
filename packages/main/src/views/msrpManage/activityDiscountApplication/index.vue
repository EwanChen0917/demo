<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.spuCode" placeholder="产品SPU" class="me-2">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.skuCode" placeholder="产品SKU">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <CountrySelect v-model="search.countryCode" clearable />
      <ProductChannelSelect v-model="search.channel" clearable />
      <el-select
        v-model="search.gtm"
        :options="productlineList"
        :props="{ label: 'name', value: 'gtmPlCode' }"
        placeholder="GTM品线"
        clearable
        filterable
      />
      <DeptMember
        v-model="search.gtmMember"
        placeholder="GTM经理"
        title="gtm"
        clearable
        filterable
      />
      <el-select
        v-model="search.oaApproveStatus"
        :options="auditList"
        :props="{ label: 'name', value: 'value' }"
        placeholder="OA审核状态"
        clearable
      />
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="产品SPU/产品名称" min-width="220" fixed="left">
        <template #default="{ row }">
          <GoodsInfo v-if="row?.spuName" :title="row.spuCode" :subtitle="row.spuName" hide-image />
        </template>
      </el-table-column>
      <el-table-column label="产品SKU/产品名称" min-width="260" fixed="left">
        <template #default="{ row }">
          <GoodsInfo v-if="row?.skuCode" :title="row.skuCode" :subtitle="row.skuName" hide-image />
        </template>
      </el-table-column>
      <el-table-column label="国家" prop="country" />
      <el-table-column label="渠道" prop="channel" />
      <el-table-column label="GTM品线" prop="gtmName" min-width="160" />
      <el-table-column label="活动名称" prop="activityName" />
      <el-table-column label="促销等级" prop="promotionLevelDesc" />
      <el-table-column label="活动类型" prop="activityTypeDesc" />
      <el-table-column label="活动日期" min-width="200px">
        <template #default="{ row }">
          <div>{{ row.startDate }}-{{ row.endDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="MSRP价格" prop="msrp" min-width="110">
        <template #default="{ row }">
          <div>{{ row.msrp }} {{ row.currency }}</div>
        </template>
      </el-table-column>
      <el-table-column label="活动价" prop="promotionPrice">
        <template #default="{ row }">
          <div>{{ row.promotionPrice }} {{ row.currency }}</div>
        </template>
      </el-table-column>
      <el-table-column label="折扣率" prop="discountRate">
        <template #default="{ row }">
          <div>{{ row.discountRate }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="毛利率" min-width="110">
        <template #default="{ row }">
          <div>原毛利：{{ row.originalProfitRate == null ? '--' : row.originalProfitRate }}%</div>
          <div>活动：{{ row.activityProfitRate == null ? '--' : row.activityProfitRate }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="目标销量" prop="targetSales" />
      <el-table-column label="活动状态" prop="activityStatusDesc" min-width="110">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.activityStatus]" size="small">
            {{ row?.activityStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="OA审核状态" prop="oaApproveStatusDesc" min-width="110">
        <template #default="{ row }">
          <Tag :color="statusColorMapOA[row.oaApproveStatus]" size="small">
            {{ row?.oaApproveStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="当前审核人" prop="currentApprover" min-width="110" />
      <el-table-column label="创建人/创建时间" min-width="160">
        <template #default="{ row }">
          <div>{{ row.creator }}</div>
          <div>{{ row.createTimeStr }}</div>
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

<script setup lang="ts" name="activityDiscountApplication">
  import useList from '@/hooks/list/useList';
  import { statusColorMap, statusColorMapOA } from '../activityDiscountSchedule/enum';
  import { ProductApi, productApi, gtmApi } from '@/api';

  const PAGE_SIZE = 10;
  const auditList = [
    { name: '待审核', value: 0 },
    { name: '审核中', value: 1 },
    { name: '审核通过', value: 2 },
    { name: '已驳回', value: 3 },
  ];
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
    ProductApi.LuteosProductPromotionPlanApplyList.RequestQuery,
    ProductApi.LuteosProductPromotionPlanApplyList.ResponseBody
  >({
    searchDefaults: {
      oaApproveStatus: undefined,
      channel: undefined,
      countryCode: undefined,
      endDate: undefined,
      gtm: undefined,
      gtmMember: undefined,
      skuCode: undefined,
      spuCode: undefined,
      startDate: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductPromotionPlanApplyList,
  });
  const productlineList = ref<any[]>([]);
  const queryProductlineList = async () => {
    const res = await gtmApi.luteosGtmPlQueryList({ pageNum: 1, pageSize: 100 });
    productlineList.value = res?.gtmPlList || [];
  };
  queryProductlineList();
  // 表格操作
  const handleActions = async (item) => {
    const { key } = item;
  };
</script>

<style scoped lang="scss">
  .keyword-search {
    display: inline-flex;
    align-items: center;

    .keyword-search-type {
      border-radius: 6px 0px 0px 6px;
      background: #fff;

      :deep(.el-select__wrapper) {
        border-radius: 6px 0px 0px 6px;
        background: #fff;
      }
    }

    .keyword-search-word {
      transform: translateX(-1px);
      width: 150px !important;

      :deep(.el-input__wrapper) {
        border-radius: 0 6px 6px 0;
      }
    }
  }
</style>
