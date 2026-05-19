<template>
  <header class="report-drawer-header" v-loading="listLoading">
    <div>
      <span class="report-drawer-title">查看{{ reportType === 2 ? '报告' : '计划' }}</span>
      <span
        :class="['report-drawer-target', isEditPermission ? 'allow-edit' : 'disable-edit']"
        disabled
        @click="editTarget"
      >
        {{ `（${target.startDate} 至 ${target.endDate}）` }}
      </span>
    </div>
    <el-button type="primary" link @click.stop="viewList()">
      查看历史{{ reportType === 2 ? '报告' : '计划' }}
    </el-button>
  </header>
  <div class="report-detail-container" v-if="listData?.detailList">
    <ReportCard
      v-model="listData.detailList[i]"
      v-for="(form, i) in listData.detailList || []"
      :key="form.detailCode"
      :isEditPermission="isEditPermission"
      :config="config"
      @save="saveRow"
      @del="deleteRow"
      @cancel="refresh"
      @auto-save="autoSave"
      @img-view="handleImgView"
    />
    <div class="operation-line" v-if="isEditPermission">
      <el-button icon="plus" @click.stop="addRow">新增分析对象</el-button>
    </div>
    <el-image-viewer @close="handleClose" v-if="fileUrl" :url-list="[fileUrl]" />
  </div>
  <AddPlanDialog
    ref="addPlanDialogRef"
    :reportType="reportType"
    :branch="props.branch"
    @confirm="updateTarget"
  />
</template>

<script setup lang="ts">
  import { type MarketingApi, marketingApi } from '@/api';
  import type {
    GtmOptionBean,
    WeekReportBean,
    WeekReportDetailBean,
  } from '@/api/marketing/data-contracts';
  import useList from '@/hooks/list/useList';
  import { ElMessage, ElMessageBox, type MessageHandler } from 'element-plus';
  import ReportCard from './ReportCard.vue';
  import AddPlanDialog from '../modal/AddPlan.vue';
  import { useReportTypeConfig } from '../config/reportType';
  import type { ReportType } from '../type';

  const props = defineProps<{
    target: WeekReportBean;
    branch?: string;
    option?: GtmOptionBean;
    reportType: ReportType; // 报告类型(1 - 经营分析周报，2 - VOC周报，VOC报告必填, 3-亚马逊运营周报)
  }>();
  const reportCode = defineModel<string>();
  const config = useReportTypeConfig(props.reportType);
  const isEditPermission = computed(() => {
    return props.option?.type === 2 || props.reportType === 2;
  });

  const { search, listData, listLoading, refreshList, runQuery } = useList<
    Omit<
      MarketingApi.LuteosMarketingWeekReportDetailList.RequestQuery,
      'pageSize' | 'pageNumber'
    > & {
      pageSize: number;
      pageNum: number;
    },
    MarketingApi.LuteosMarketingWeekReportDetailList.ResponseBody
  >({
    searchDefaults: { reportCode: reportCode.value!, branch: props.branch },
    pageSize: 20,
    service: marketingApi.luteosMarketingWeekReportDetailList,
  });
  runQuery();
  watch([() => props.branch, reportCode], ([newJobNumber, newReportCode]) => {
    search.branch = newJobNumber;
    search.reportCode = newReportCode;
  });
  const viewList = async () => {
    await autoSave();
    reportCode.value = '';
  };
  const deleteRow = async (row: WeekReportDetailBean & { edit: boolean }) => {
    const result = await ElMessageBox.confirm(
      '您确定要删除该分析对象吗？删除后将不可恢复，请您谨慎操作！',
      '删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }
    );
    if (!result) return;
    if (row.detailCode) {
      await marketingApi.luteosMarketingWeekReportDeleteDetail({ detailCode: row.detailCode! });
    }
    ElMessage.success('删除成功');
    refreshList();
  };
  const addRow = async (): Promise<void> => {
    if (isEmptyRow(listData.value?.detailList)) {
      ElMessage.warning('请先删除空的分析对象');
      return;
    }
    await autoSave();
    listData.value?.detailList?.push({ edit: true, visible: true });
  };
  const isEmptyRow = (list?: WeekReportDetailBean[]) => {
    return (
      list &&
      list.some(
        (row) => !row.target && !row.plan && !row.doText && !row.check && !row.action && !row.remark
      )
    );
  };
  let messagge: MessageHandler | null = null;
  const autoSave = (errorCb?: () => void, cb?: () => void) => {
    return new Promise((resolve, reject) => {
      for (const row of listData.value?.detailList || []) {
        if (!row.target && row.edit) {
          messagge = ElMessage.error('自动保存失败，分析对象不能为空');
          errorCb && errorCb();
          reject(new Error('分析对象不能为空'));
          return;
        }
        if (row.edit) {
          saveRow(row, true);
        }
      }
      resolve(true);
      cb && cb();
    });
  };
  const saveRow = async (row: WeekReportDetailBean, isAutoSave: boolean) => {
    // 不是自动保存, 即手动保存时，分析对象为空保存提示
    if (!isAutoSave && !row.target) {
      messagge && messagge.close();
      ElMessage.error('分析对象不能为空');
      return;
    }
    row.loading = true;
    if (!row.detailCode) {
      // 新增接口
      const res = await marketingApi
        .luteosMarketingWeekReportCreateDetail({
          ...row,
          reportCode: reportCode.value,
          status: isAutoSave ? 0 : 1,
        })
        .finally(() => {
          row.loading = false;
        });
      row.detailCode = res.detailCode;
      row.status = isAutoSave ? 0 : 1; // 自动保存，0是草稿 1是正式
      messagge && messagge.close();
      ElMessage.success('新增成功');
    } else {
      await marketingApi
        .luteosMarketingWeekReportUpdateDetail({ ...row, status: isAutoSave ? 0 : 1 })
        .finally(() => {
          row.loading = false;
        });
      messagge && messagge.close();
      ElMessage.success('修改成功');
    }
    isAutoSave || (row.edit = false);
  };
  const refresh = async () => {
    await refreshList();
  };
  const fileUrl = ref<string>();
  const handleImgView = (url: string) => {
    fileUrl.value = url;
  };
  const handleClose = () => {
    fileUrl.value = '';
  };
  const addPlanDialogRef = ref<InstanceType<typeof AddPlanDialog>>();
  const editTarget = () => {
    isEditPermission.value && addPlanDialogRef.value!.open(props.target);
  };
  const updateTarget = (data: string[]) => {
    const [startDate, endDate] = data;
    props.target.startDate = startDate;
    props.target.endDate = endDate;
  };
  defineExpose({
    autoSave,
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
  .report-drawer-target {
    font-size: 14px;
    opacity: 0.88;
    cursor: pointer;
    &.allow-edit:hover {
      font-size: 16px;
      text-decoration: underline;
    }
    &.disable-edit {
      cursor: not-allowed;
    }
  }
  .operation-line {
    opacity: 0.68;
    width: 100%;
    margin: 6px 0;
    display: flex;
    justify-content: center;
  }
</style>
