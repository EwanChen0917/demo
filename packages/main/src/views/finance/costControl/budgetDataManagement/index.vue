<template>
  <div>
    <KeenCard title="" position="start" grow v-if="progressShow">
      <div class="task-list">
        <h5>获取预算进度</h5>
        <div class="task-item">
          <div class="task-item-header">
            <div class="left">
              <Tag :color="taskColorMap[initBudgetPoolStatusList?.status]" size="small">
                {{ taskStatusMap[initBudgetPoolStatusList?.status] }}
              </Tag>
            </div>
            <div class="right">
              <span>耗时：{{ initBudgetPoolStatusList?.useTime || '-' }}</span>
            </div>
          </div>
          <el-progress
            :percentage="
              initBudgetPoolStatusList?.progress ? initBudgetPoolStatusList?.progress : 0
            "
            :show-text="false"
            :status="initBudgetPoolStatusList?.status == 3 ? 'exception' : 'success'"
            :stroke-width="8"
          />
          <div class="task-initBudgetPoolStatusList-footer">
            <div class="right">完成时间：{{ initBudgetPoolStatusList?.finishTime || '-' }}</div>
          </div>
        </div>
      </div>
    </KeenCard>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model.trim="search.keyword" placeholder="预算编号" class="w-200px" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-tree-select
          multiple
          ref="catTreeSelectRef"
          placeholder="预算部门"
          v-model="search.budgetDeptIdList"
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
        <el-select v-model="search.status" filterable clearable placeholder="预算状态">
          <el-option label="草稿" value="0" />
          <el-option label="已发布" value="1" />
        </el-select>
        <el-date-picker
          v-model="search.budgetYear"
          type="year"
          :clearable="false"
          placeholder="预算年度"
          value-format="YYYY"
          format="YYYY"
        />
        <el-select v-model="search.monthStart" @change="changeMonth(0)" placeholder="期间起">
          <el-option
            v-for="item in monthList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="Number(search.monthStart) > Number(search.monthEnd)"
          />
        </el-select>
        <el-select v-model="search.monthEnd" @change="changeMonth(1)" placeholder="期间止">
          <el-option
            v-for="item in monthList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="Number(search.monthEnd) < Number(search.monthStart)"
          />
        </el-select>
      </template>
      <template #buttons>
        <ExportBtn
          :service="budgetApi.financeBudgetPoolExportList"
          :params="{
            ...omit(search, ['monthStart', 'monthEnd']),
            budgetMonthStart: `${search.budgetYear}${search.monthStart}`,
            budgetMonthEnd: `${search.budgetYear}${search.monthEnd}`,
          }"
        >
          导出
        </ExportBtn>
      </template>
      <template #tools-prepend>
        <el-tooltip placement="top">
          <template #content>
            <div>
              <div>上次获取预算时间：{{ initBudgetPoolStatusList?.finishTime || '-' }}</div>
              <div style="padding-left: 73px">
                耗时：{{ initBudgetPoolStatusList?.useTime || '-' }}
              </div>
            </div>
          </template>
          <el-button
            type="primary"
            plain
            :loading="progressShow"
            @click="budgetTimeDialogRef?.open"
          >
            获取预算
          </el-button>
        </el-tooltip>
      </template>
      <!-- @selection-change="handleSelectionChange" -->
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        row-key="code"
        class-name="table-row-dashed"
        v-if="tableShow"
      >
        <!-- <el-table-column
          type="selection"
          width="40"
          reserve-selection
          :selectable="(row) => row.status == status.草稿"
          fixed="left"
        /> -->
        <el-table-column label="预算编号" prop="code" min-width="150" fixed="left" />
        <el-table-column label="预算分类" prop="budgetCategory" min-width="150" fixed="left" />
        <el-table-column label="预算部门" prop="budgetDept" min-width="150" fixed="left" />
        <el-table-column label="GTM品线" prop="gtmPl" min-width="150" fixed="left" />
        <el-table-column label="平台" prop="platform" fixed="left" />
        <el-table-column label="区域" prop="area" fixed="left" />
        <el-table-column label="费用科目" prop="expenseAccount" min-width="120" fixed="left" />
        <el-table-column label="研发项目" prop="newProduct" />
        <el-table-column label="营销活动" prop="marketingCampaign" />
        <el-table-column
          :label="month.budgetMonthDesc"
          :prop="month.budgetMonthDesc"
          align="center"
          v-for="(month, index) in listData?.recordList[0]?.monthAmountList"
          v-if="listData?.recordList.length"
        >
          <el-table-column
            :label="item.label"
            :prop="item.key"
            :width="item?.width"
            v-for="item in tableTitle"
          >
            <template #default="{ row }">
              <div
                v-if="
                  row.monthAmountList[index] &&
                  row.monthAmountList[index].budgetMonthDesc == month.budgetMonthDesc
                "
              >
                <span :class="{ 'num-text': item.label == '剩余金额' }">
                  {{ row.monthAmountList[index][item.key] }}
                </span>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="状态" prop="statusDesc" fixed="right" width="100">
          <template #default="{ row }">
            <Tag :color="statusColorMap[row?.status]">
              {{ row.statusDesc }}
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
    <!-- 获取预算 -->
    <budgetTimeDialog ref="budgetTimeDialogRef" @success="getInitBudgetPoolStatusData" />
  </div>
</template>

<script setup lang="ts" name="budgetDataManagement">
  import useList from '@/hooks/list/useList';
  import { BudgetApi, budgetApi, financeSystemApi, memberApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import budgetTimeDialog from './components/budgetTimeDialog.vue';
  import { omit } from 'lodash-es';
  import dayjs from 'dayjs';
  import { status, statusColorMap } from '../enums/enums';

  const PAGE_SIZE = 10;
  const tableTitle = [
    { label: '预算期初', key: 'initBudgetAmount' },
    { label: '上期结转', key: 'carryForwardAmount' },
    { label: '预算内调整', key: 'internalAdjustAmount', width: '120px' },
    { label: '预算外调整', key: 'externalAdjustAmount', width: '120px' },
    { label: '已锁定', key: 'lockedAmount' },
    { label: '已占用', key: 'occupiedAmount' },
    { label: '已执行', key: 'executedAmount' },
    { label: '剩余金额', key: 'remainingAmount' },
  ];
  const monthList = [
    { label: '1月', value: '01' },
    { label: '2月', value: '02' },
    { label: '3月', value: '03' },
    { label: '4月', value: '04' },
    { label: '5月', value: '05' },
    { label: '6月', value: '06' },
    { label: '7月', value: '07' },
    { label: '8月', value: '08' },
    { label: '9月', value: '09' },
    { label: '10月', value: '10' },
    { label: '11月', value: '11' },
    { label: '12月', value: '12' },
  ];
  const taskStatusMap = ['未开始', '生成中', '生成成功', '生成失败'];
  const taskColorMap = {
    0: 'gray',
    1: 'blue',
    2: 'green',
    3: 'red',
  };
  const budgetTimeDialogRef = ref();
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
    { keyword?: string; pageNum: number; pageSize: number },
    BudgetApi.FinanceBudgetPoolQueryList.ResponseBody
  >({
    searchDefaults: {
      status: '',
      areaList: undefined,
      budgetCategoryList: undefined,
      budgetDeptIdList: undefined,
      budgetMonthEnd: dayjs().subtract(1, 'month').format('YYYYMM'),
      budgetMonthStart: dayjs().subtract(1, 'month').format('YYYYMM'),
      // budgetMonthEnd: dayjs().format('YYYY') + '12',
      // budgetMonthStart: dayjs().format('YYYY') + '01',
      budgetYear: dayjs().format('YYYY'),
      monthStart: dayjs().subtract(0, 'month').format('MM'),
      monthEnd: dayjs().subtract(0, 'month').format('MM'),
      expenseAccountList: undefined,
      gtmPlList: undefined,
      keyword: undefined,
      marketingCampaignList: undefined,
      newProductList: undefined,
      platformList: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { monthStart, monthEnd } = searchData;
      return {
        ...omit(searchData, ['monthStart', 'monthEnd']),
        budgetMonthStart: `${searchData.budgetYear}${monthStart}`,
        budgetMonthEnd: `${searchData.budgetYear}${monthEnd}`,
      };
    },
    pageSize: PAGE_SIZE,
    service: budgetApi.financeBudgetPoolQueryList,
  });

  const headerCellStyle = (data) => {
    const columnIndexShow =
      data.columnIndex < 8 ||
      (data.columnIndex < 24 && data.columnIndex > 15) ||
      (data.columnIndex < 40 && data.columnIndex > 31) ||
      (data.columnIndex < 56 && data.columnIndex > 47) ||
      (data.columnIndex < 72 && data.columnIndex > 63) ||
      (data.columnIndex < 88 && data.columnIndex > 79);
    const keys = tableTitle.map((res) => {
      return res.key;
    });
    let months = [];
    const columnIndexShow2 = [9, 11, 13, 15, 17, 19];
    if (listData.value?.recordList?.length) {
      months = listData.value?.recordList[0]?.monthAmountList.map((res) => {
        return res.budgetMonthDesc;
      });
    }
    if (
      (columnIndexShow && keys.includes(data.column.property)) ||
      (columnIndexShow2.includes(data.columnIndex) &&
        months.includes(data.column.property) &&
        listData.value?.recordList?.length)
    ) {
      return { 'background-color': 'var(--el-color-primary-light-9) !important' };
    }
  };

  const cellStyle = (data) => {
    const columnIndexShow =
      (data.columnIndex < 17 && data.columnIndex > 8) ||
      (data.columnIndex < 33 && data.columnIndex > 24) ||
      (data.columnIndex < 49 && data.columnIndex > 40) ||
      (data.columnIndex < 65 && data.columnIndex > 56) ||
      (data.columnIndex < 81 && data.columnIndex > 72) ||
      (data.columnIndex < 97 && data.columnIndex > 88);
    if (
      columnIndexShow &&
      listData.value?.recordList?.length &&
      data.column.property !== 'statusDesc'
    ) {
      return { 'background-color': 'var(--el-color-primary-light-9) !important' };
    }
  };
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
  // 查询初始化预算池获取进度状态
  const timer = ref(null);
  const progressShow = ref(false);
  const tableShow = ref(true);
  const tableShowType = ref(0);
  const initBudgetPoolStatusList = ref({ status: 0 });
  const getInitBudgetPoolStatus = (code) => {
    const batchCode = sessionStorage.getItem('financeBudgetBatchCode') || code;
    if (batchCode) {
      timer.value = setInterval(() => {
        getInitBudgetPoolStatusData(batchCode, 1);
      }, 3000);
    }
  };
  const getInitBudgetPoolStatusData = async (batchCode, type) => {
    const res = await budgetApi.financeBudgetPoolQueryInitBudgetPoolStatus({
      batchCode: JSON.parse(batchCode),
    });
    initBudgetPoolStatusList.value = res;
    if (res.status == 2) {
      clearInterval(timer.value);
      refreshList();
      progressShow.value = false;
      if (tableShowType.value) {
        //解决表格高度问题
        tableShow.value = false;
        setTimeout(() => {
          tableShow.value = true;
          tableShowType.value = 0;
        }, 10);
      }
    } else {
      progressShow.value = true;
      tableShowType.value = 1;
    }
    if (type == 0) {
      getInitBudgetPoolStatus('');
    }
  };
  getInitBudgetPoolStatus('');

  const changeMonth = (type) => {
    if (type == 0 && Number(search.monthStart) > Number(search.monthEnd)) {
      search.monthEnd = search.monthStart;
    }
    if (type == 1 && Number(search.monthStart) > Number(search.monthEnd)) {
      search.monthStart = search.monthEnd;
    }
  };
  const tableRef = ref(null);
  // 勾选
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.code);
  };
</script>

<style scoped lang="scss">
  :deep(.el-table--border .el-table__cell) {
    border-right: none;
  }
  :deep(
      .el-table.is-scrolling-left.el-table--border
        .el-table-fixed-column--left.is-last-column.el-table__cell
    ) {
    border-right: none;
  }
  .num-text {
    color: var(--el-color-primary);
  }
  .task-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    min-height: 100px;
    width: 550px;
    .task-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
      width: 30%;
      padding: 10px;
      border: 1px solid #e4e4e4;
      border-radius: 12px;

      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          gap: 5px;
        }
      }
    }
  }
</style>
