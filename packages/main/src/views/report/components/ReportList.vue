<template>
  <header class="report-drawer-header">
    <div class="report-drawer-title">历史{{ reportType === 2 ? '报告' : '计划' }}列表</div>
    <el-select
      v-if="reportType === 2"
      v-model="search.memberCode"
      placeholder="选择成员"
      filterable
      clearable
    >
      <el-option
        v-for="item in memberList"
        :key="item?.memberCode"
        :label="item?.name"
        :value="item?.memberCode"
      />
    </el-select>
    <el-button v-if="isEditPermission" type="primary" link icon="plus" @click.stop="addPlan()">
      创建{{ reportType === 2 ? '报告' : '计划' }}
    </el-button>
  </header>
  <div class="report-detail-container" v-if="listData?.reportList">
    <ReportListCard
      v-model="listData.reportList[i]"
      v-for="(form, i) in listData.reportList || []"
      :key="form.reportCode"
      :isEditPermission="isEditPermission"
      :reportType="reportType"
      @copy="copyRow"
      @view="viewRow"
      @del="deleteRow"
      @edit-target="editTarget"
    />
    <div style="padding: 0 12px">
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <AddPlanDialog
    ref="addPlanDialogRef"
    :branch="branch"
    :reportType="reportType"
    @confirm="runQuery()"
  />
  <CopyPlanDialog
    ref="copyPlanDialogRef"
    :branch="branch"
    :reportType="reportType"
    @confirm="handleCopy"
  />
</template>

<script setup lang="ts">
  import { type MarketingApi, marketingApi, type MarketingContracts } from '@/api';
  import useList from '@/hooks/list/useList';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { GtmOptionBean, WeekReportDetailBean } from '@/api/marketing/data-contracts';
  import { checkPermission } from '@/utils/permission';
  import AddPlanDialog from '../modal/AddPlan.vue';
  import CopyPlanDialog from '../modal/CopyPlan.vue';
  import ReportListCard from './ReportListCard.vue';
  import type { ReportType } from '../type';

  const props = defineProps<{
    branch?: string;
    reportType: ReportType; // 报告类型(1 - 经营分析周报，2 - VOC周报，VOC报告必填, 3 - 亚马逊运营周报)
    option?: GtmOptionBean;
  }>();

  const emit = defineEmits<{
    view: [data: string];
  }>();
  const isEditPermission = computed(() => {
    return props?.option?.type === 2 || props?.reportType === 2;
  });
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
  } = useList<
    MarketingApi.LuteosMarketingWeekReportList.RequestQuery,
    MarketingApi.LuteosMarketingWeekReportList.ResponseBody
  >({
    searchDefaults: { branch: props.branch, reportType: props?.reportType, memberCode: undefined },
    pageSize: 10,
    service: marketingApi.luteosMarketingWeekReportList,
  });
  runQuery();
  watch(
    () => props.branch,
    (newJobNumber) => {
      search.branch = newJobNumber;
    }
  );
  const addPlanDialogRef = ref<InstanceType<typeof AddPlanDialog>>();
  const addPlan = () => {
    addPlanDialogRef.value?.open();
  };
  const copyPlanDialogRef = ref<InstanceType<typeof CopyPlanDialog>>();
  const copyRow = async (data: WeekReportDetailBean) => {
    copyPlanDialogRef.value?.open(data);
  };
  const handleCopy = async ({ reportCode, dateRange }) => {
    const res = await marketingApi.luteosMarketingWeekReportDetailCopy({
      fromReportCode: reportCode,
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
    ElMessage.success('复制成功');
    emit('view', { reportCode: res.reportCode, startDate: dateRange[0], endDate: dateRange[1] });
  };
  const viewRow = (row: any) => {
    emit('view', row);
  };

  const deleteRow = async (row: WeekReportDetailBean) => {
    const result = await ElMessageBox.confirm(
      '您确定要删除这条记录吗？删除后将不可恢复，请您谨慎操作！',
      '确定删除该记录吗？',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    if (!result) return;
    await marketingApi.luteosMarketingWeekReportDelete({ reportCode: row.reportCode! });
    ElMessage.success('删除成功');
    runQuery();
  };
  const editTarget = (data: WeekReportDetailBean) => {
    addPlanDialogRef.value?.open(data);
  };

  // 获取人员列表
  const memberList = ref<MarketingContracts.MemberBean[]>([]);
  const queryMemberList = async () => {
    const res = await marketingApi.luteosMarketingWeekReportQueryPermissionMemberList({
      reportType: props?.reportType,
    });
    memberList.value = res?.memberList || [];
  };
  queryMemberList();

  defineExpose({
    addPlan,
  });
</script>

<style lang="scss" scoped>
  .report-drawer-header {
    position: sticky;
    height: 30px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 4px 4px 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media screen and (min-width: 1080px) {
      padding: 4px 10px;
    }
  }
  .report-drawer-title {
    font-weight: 600;
  }
</style>
