<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchData"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-select
        v-model="search.budgetSchemeYears"
        :options="budgetYearList"
        :props="{ label: 'budgetYear', value: 'budgetYear' }"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="预算年度"
      />
      <el-select
        v-model="search.budgetSchemeNames"
        :options="schemeList"
        :props="{ label: 'name', value: 'name' }"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="请选择预算方案"
      />
      <el-select
        v-model="search.budgetSchemeLevels"
        :options="draftList"
        :props="{ label: 'name', value: 'code' }"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="稿件"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="updateDialogRef.open()">更新</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      @selection-change="handleSelectionChange"
      row-key="code"
      class-name="table-row-dashed"
    >
      <el-table-column label="规则识别码" prop="code" min-width="180" />
      <el-table-column label="汇总表模板" prop="ruleName" min-width="180" />
      <el-table-column label="预算年度" prop="budgetSchemeYear" />
      <el-table-column label="预算方案" prop="budgetSchemeName" min-width="150" />
      <el-table-column label="稿件" prop="budgetSchemeLevelDesc" />
      <el-table-column label="最新更新成功时间" prop="updateTime" min-width="160" />
      <el-table-column label="更新进度" width="200">
        <template #default="{ row }">
          <el-progress
            :percentage="row.generateProgress"
            :stroke-width="8"
            :show-text="false"
            status="success"
          />
        </template>
      </el-table-column>
      <el-table-column label="更新状态" prop="generateStatusDesc">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.generateStatus]" size="small">
            {{ row.generateStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="失败原因" prop="failedReason" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.failedReason" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '更新',
                key: 'update',
                type: 'primary',
                row: row,
              },
              {
                label: '导出',
                key: 'export',
                type: 'primary',
                row: row,
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
    <UpdateDialog ref="updateDialogRef" @success="refreshList" />
  </KeenList>
</template>

<script setup lang="ts" name="budgetSummaryList">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, budgetApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import UpdateDialog from './components/updateDialog.vue';
  import { status, statusColorMap } from './enum';

  const route = useRoute();
  const router = useRouter();
  const PAGE_SIZE = 10;
  const schemeList = ref([]);
  const budgetYearList = ref([]);
  const draftList = ref([
    { name: '一稿', code: 1 },
    { name: '一稿修订版', code: 2 },
    { name: '终稿', code: 3 },
  ]);
  const updateDialogRef = ref();
  const timer = ref(null);
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
    FinanceSystemApi.FinanceBudgetRuleSummaryResultQueryList.RequestBody,
    FinanceSystemApi.FinanceBudgetRuleSummaryResultQueryList.ResponseBody
  >({
    searchDefaults: {
      budgetSchemeLevels: undefined,
      budgetSchemeNames: undefined,
      budgetSchemeYears: undefined,
      codes: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBudgetRuleSummaryResultQueryList,
    onSuccess: () => {
      // 轮询进度
      if (timer.value) clearInterval(timer.value);
      timer.value = setInterval(async () => {
        if (listData.value?.recordList?.length) {
          const codes = listData.value?.recordList
            ?.filter((item) => item?.code && item.generateStatus === status.生成中)
            ?.map((item) => item?.code);
          if (codes?.length) {
            const res = await financeSystemApi.financeBudgetRuleSummaryResultQueryList({
              codes,
            });
            listData.value.recordList = listData.value?.recordList?.map((item) => {
              const newItem = res?.recordList?.find((i) => i?.code === item?.code);
              if (newItem) {
                return { ...item, ...newItem };
              }
              return item;
            });
          }
        }
      }, 5000);
    },
  });
  // 汇总表字段取值配置-固定指标
  const schemeQueryList = async () => {
    const res = await budgetApi.financeBudgetSchemeQueryNameList();
    if (res) {
      schemeList.value = res.map((item) => {
        return { name: item };
      });
    }
  };
  schemeQueryList();
  // 预算配置年度
  const getBudgetYearSettings = async () => {
    const res = await budgetApi.financeBudgetYearSettingsList();
    if (res) {
      budgetYearList.value = res || [];
    }
  };
  getBudgetYearSettings();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key == 'update') {
      updateDialogRef.value.open(row);
    } else if (key == 'export') {
      handleExport(row);
    }
  };
  const handleExport = async (row) => {
    const res = await financeSystemApi.financeBudgetRuleSummaryResultExportList({ code: row.code });
    const isConfirmed = await swal.confirm({
      icon: 'success',
      title: '导出成功，具体请前往下载中心查看',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (!isConfirmed) return;

    await nextTick();
    router.push({
      path: '/downloadmanage',
      query: {
        app_code: res?.appCode,
        module_code: res?.moduleCode,
        record_type: 2,
      },
    });
  };

  const tableRef = ref(null);
  // 勾选
  const codeList = ref([]);
  const handleSelectionChange = (list) => {
    codeList.value = list.map((item) => item.code);
  };
  const batchSearchRef = ref();

  const resetSearchData = () => {
    batchSearchRef.value?.clear();
    resetSearch();
  };
  watch(
    () => route.path,
    () => {
      // 组件销毁时清除定时器
      if (timer.value) {
        clearInterval(timer.value);
      }
    }
  );
</script>

<style scoped lang="scss"></style>
