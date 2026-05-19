<template>
  <!-- 预算调整单 -->
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          clearable
          placeholder="单据编号/申请人"
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.adjustType" clearable placeholder="调整类型">
        <el-option label="预算内调整" value="budgetInternalAdjust" />
        <el-option label="预算外调整" value="budgetExternalAdjust" />
      </el-select>
      <el-tree-select
        multiple
        ref="catTreeSelectRef"
        placeholder="预算部门"
        v-model="search.applyDeptList"
        :data="deptTree"
        filterable
        clearable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        check-strictly
        popper-class="picker-cat-tree-select"
        highlight-current
      />
      <el-select
        v-model="search.gtmPlList"
        :options="(productLineList || []).map(x=>({label: x, value: x}))"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="GTM品线"
      />
      <el-select
        v-model="search.platformList"
        :options="platformOptions"
        :props="{
            label: 'name',
            value: 'code',
        }"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="平台"
      />
      <el-select
        v-model="search.areaList"
        :options="areaOptions"
        :props="{
            label: 'name',
            value: 'code',
        }"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="区域"
      />
      <el-select
        v-model="search.expenseAccountList"
        :options="expenseAccountList"
        :props="{
            label: 'name',
            value: 'code',
        }"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="费用科目"
      />
      <el-select
        v-model="search.marketingCampaignList"
        :options="(marketingCampaigneList || []).map(x=>({label: x, value: x}))"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="营销活动"
      />
      <el-select
        v-model="search.newProductList"
        :options="(productList || []).map(x=>({label: x, value: x}))"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="研发项目"
      />
      <el-select
        v-model="search.authStatusList"
        :options="adjustTypeStatusMap"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="审核状态"
      />
      <el-date-picker
        v-model="search.applyTime"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="-"
        start-placeholder="申请开始时间"
        end-placeholder="申请结束时间"
        class="w-310px"
      />
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column label="单据编号" prop="code" min-width="150px" />
      <el-table-column label="OA审批单号" prop="flowDesc" min-width="130px" />
      <el-table-column label="调整类型" prop="adjustTypeDesc" />
      <el-table-column label="申请人" prop="applyMember" />
      <el-table-column label="预算部门" prop="budgetDept" />
      <el-table-column label="GTM品线" prop="gtmPl" />
      <el-table-column label="平台" prop="platform" />
      <el-table-column label="区域" prop="area" />
      <el-table-column label="费用科目" prop="expenseAccount" />
      <el-table-column label="研发项目" prop="newProduct" />
      <el-table-column label="营销活动" prop="marketingCampaign" />
      <el-table-column label="预算周期" prop="budgetMonthDesc" />
      <el-table-column label="调整金额" prop="adjustAmount" />
      <el-table-column label="申请时间" prop="applyTime" width="150px" />
      <el-table-column label="审批状态" prop="authStatusDesc">
        <template #default="{ row }">
          <Tag :color="adjustTypeStatusColorMap[row.authStatus]" size="small">
            {{ row.authStatusDesc }}
          </Tag>
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

<script setup lang="ts" name="budgetAdjustTable">
  import useList from '@/hooks/list/useList';
  import { BudgetApi, budgetApi, memberApi, gtmApi, financeSystemApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { omit } from 'lodash-es';
  import { adjustTypeStatusMap, adjustTypeStatusColorMap } from '../enums/enums';

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
    { keyword?: string; pageNum: number; pageSize: number },
    BudgetApi.FinanceBudgetAdjustOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      adjustType: undefined,
      applyDeptList: undefined,
      applyTime: undefined,
      applyTimeEnd: undefined,
      applyTimeStart: undefined,
      areaList: undefined,
      authStatusList: undefined,
      expenseAccountList: undefined,
      gtmPlList: undefined,
      marketingCampaignList: undefined,
      newProductList: undefined,
      platformList: undefined,
    },
    interceptSearchData: (searchData) => {
      const { applyTime } = searchData;
      return {
        ...omit(searchData, 'applyTime'),
        applyTimeStart: applyTime ? applyTime[0] + ' 00:00:00' : undefined,
        applyTimeEnd: applyTime ? applyTime[1] + ' 23:59:59' : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: budgetApi.financeBudgetAdjustOrderQueryList,
  });
  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();
  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  // 搜索下拉
  const productLineList = ref([]); //预算-GTM品线
  const productList = ref([]); //预算-研发项目
  const marketingCampaigneList = ref([]); //基础资料-营销活动信息
  const getProductLineList = async () => {
    const res = await budgetApi.financeBudgetPresentationTableQueryFillEnums({
      enums: ['237', '228', '203'],
    });
    productLineList.value = Object.keys(res.columnEnums['237']).filter((item) => item);
    productList.value = Object.keys(res.columnEnums['228']).filter((item) => item);
    marketingCampaigneList.value = Object.keys(res.columnEnums['203']).filter((item) => item);
  };
  getProductLineList();
  // 平台
  const platformOptions = ref<any[]>([]);
  const getPlatformOptions = async () => {
    const res = await financeSystemApi.financeBasicQueryPlatformSelect({
      pageNum: 1,
      pageSize: 1000,
    });
    platformOptions.value = res;
  };
  getPlatformOptions();
  // 区域
  const areaOptions = ref<any[]>([]);
  const getAreaOptions = async () => {
    const res = await financeSystemApi.financeBasicQueryAllAreaSelect({
      keyword: '',
    });
    areaOptions.value = res;
  };
  getAreaOptions();
  // 费用科目
  const expenseAccountList = ref<any[]>([]);
  const getExpenseAccountList = async () => {
    const res = await budgetApi.financeBudgetPoolQueryExpenseAccountSelect({
      keyword: '',
    });
    expenseAccountList.value = res;
  };
  getExpenseAccountList();
</script>

<style scoped lang="scss">
  /* 这里可以添加样式 */
</style>
