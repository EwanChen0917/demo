<template>
  <el-scrollbar height="100%">
    <main class="report-drawer-body">
      <ReportDetail
        v-if="reportCode"
        ref="reportDetailRef"
        v-model="reportCode"
        :branch="branch"
        :option="option"
        :target="target"
        :reportType="reportType"
      />
      <ReportList
        v-else
        ref="reportListRef"
        :branch="branch"
        :option="option"
        :reportType="reportType"
        @view="viewDetail"
      />
    </main>
  </el-scrollbar>
</template>

<script setup lang="ts">
  import type { GtmOptionBean, WeekReportBean } from '@/api/marketing/data-contracts';
  import { marketingApi } from '@/api';
  import ReportList from './ReportList.vue';
  import ReportDetail from './ReportDetail.vue';
  import type { ReportType } from '../type';

  const props = defineProps<{
    branch?: string;
    reportType: ReportType; // 报告类型(1 - 经营分析周报，2 - VOC周报，VOC报告必填, 3 - 亚马逊运营周报)
    option?: GtmOptionBean;
  }>();

  // flag 为true时显示计划列表，为false时显示计划详情
  const reportCode = ref('');
  // 第一次进入时，获取最新的reportCode

  watch(
    () => props.branch,
    () => {
      marketingApi
        .luteosMarketingWeekReportList({
          branch: props?.branch,
          reportType: props?.reportType,
          pageSize: 1,
          pageNum: 1,
        })
        .then((res) => {
          if (Array.isArray(res.reportList) && res.reportList.length > 0) {
            viewDetail(res.reportList[0]);
          } else {
            reportCode.value = '';
          }
        });
    },
    { immediate: true }
  );
  const target = ref<WeekReportBean>({});
  const reportDetailRef = ref<InstanceType<typeof ReportDetail>>();

  const viewDetail = (row: WeekReportBean) => {
    reportCode.value = row.reportCode!;
    target.value = row;
  };
  const reportListRef = ref<InstanceType<typeof ReportList>>();
</script>

<style lang="scss" scoped>
  .report-drawer-body {
    overflow: hidden;
    width: 100%;
  }
</style>
