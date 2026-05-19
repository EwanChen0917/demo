<template>
  <div class="report-container-new">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <el-select
        v-model="currentSelectTime"
        style="width: 220px"
        placeholder="请选择时间"
        :teleported="false"
        clearable
      >
        <el-option v-for="item in timeList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button class="btn-add" @click="createReport">+ 创建报告</el-button>
    </div>
    <!-- 卡片列表 -->
    <div class="cards-container">
      <div v-if="showList.length" class="cards-list">
        <div class="card-item" v-for="(report, index) in showList" :key="index">
          <!-- 卡片头部 -->

          <div class="card-item-header">
            <span class="card-item-title">{{ report.detailList?.[0]?.target }}</span>
            <span class="card-item-author">{{ report.creator }}</span>
          </div>
          <div class="card-item-memo">
            <div class="analysis-period">
              分析周期：{{ report.startDate }} - {{ report.endDate }}
            </div>
            <div class="card-item-actions">
              <el-button type="text" size="small" icon="Edit" @click="editRow(report)">
                编辑
              </el-button>
              <span class="gap">|</span>
              <el-button type="text" size="small" icon="Delete" @click="deleteRow(report)">
                删除
              </el-button>
            </div>
          </div>
          <!-- 内容区域 - 使用 v-html 渲染富文本 -->
          <div class="w-e-text-container">
            <div data-slate-editor>
              <div class="card-item-content" v-html="report.detailContents"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="cards-empty">
        <div>
          <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
        </div>
        <div>当前暂无内容</div>
      </div>
    </div>
    <div style="padding: 0 4px">
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <AddReportDialog
    ref="addReportDialog"
    :report-type="reportType"
    :branch="branch"
    @reload="runQuery"
  />
</template>

<script setup lang="ts">
  import { ElMessage, ElSelect } from 'element-plus';
  import useList from '@/hooks/list/useList.js';
  import { marketingApi } from '@/api/index.js';
  import * as swal from '@/utils/swal';
  import AddReportDialog from './AddReportDialog.vue';
  import '@wangeditor/editor/dist/css/style.css';

  const props = withDefaults(
    defineProps<{
      branch?: string;
      reportType?: string | number;
    }>(),
    {
      branch: 'monthReport',
      reportType: 3,
    }
  );

  // 响应式数据
  const timeList = ref<string[]>([]);
  const currentSelectTime = ref<string>('');

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
    searchDefaults: {
      branch: props.branch,
      reportType: props?.reportType,
      memberCode: undefined,
    },
    pageSize: 10,
    service: async (params) => {
      const res = await marketingApi.luteosMarketingWeekReportList(params);
      for (const report of res.reportList || []) {
        report.reportDateRange = `${report.startDate} - ${report.endDate}`;
        const detail = await marketingApi.luteosMarketingWeekReportDetailList({
          reportCode: report.reportCode,
          pageNum: 1,
          pageSize: 20,
        });
        report.detailList = detail.detailList;
        report.detailContents = (detail.detailList || []).map((x) => x.plan).join('<br><br>');
      }

      timeList.value = [...new Set(res.reportList.map((x) => x.reportDateRange))].filter((x) => x);
      timeList.value.sort((a, b) => {
        const aEndTime = String(a).split(' - ').pop();
        const bEndTime = String(b).split(' - ').pop();
        // 按照 endTime 字符串倒序
        return aEndTime > bEndTime ? -1 : 1;
      });
      currentSelectTime.value = timeList.value[0] || '';
      return res;
    },
  });

  const showList = computed(() => {
    // currentSelectTime.value
    const list = listData.value?.reportList || [];
    if (!currentSelectTime.value) {
      return list;
    }
    return list.filter((x) => {
      return x.reportDateRange === currentSelectTime.value;
    });
  });

  // 方法
  const addReportDialog = ref(null);
  const createReport = () => {
    addReportDialog.value.open(null);
  };

  const editRow = (row) => {
    addReportDialog.value.open(row);
  };

  const deleteRow = async (row) => {
    const isConfirmed = await swal.confirm(`您确定要删除这条记录吗？`);
    if (!isConfirmed) return;
    await marketingApi.luteosMarketingWeekReportDelete({ reportCode: row.reportCode! });
    ElMessage.success('删除成功');
    runQuery();
  };
</script>

<style lang="scss" scoped>
  .report-container-new {
    width: 100%;
    margin: 0 auto;
    padding: 16px 0 0 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
    min-height: 0;
    background: #fff;
    text-align: left;
    position: relative;
    z-index: 0; // 防止时间选择器置顶

    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 20px;

      .el-select {
        min-width: 0;
        flex: 1;
      }

      .btn-add {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }
    }

    .cards-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 10px;
      overflow-y: auto;
      min-height: 500px;
      flex: 1;

      .cards-list {
        height: 100%;
      }

      .cards-empty {
        margin-top: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(---N6);
        font-size: 14px;
      }

      .card-item {
        padding: 23px 20px;
        background-color: #fff;
        transition: all 0.3s ease;
        margin-bottom: 6px;
        borrader-radius: 0;

        .card-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          word-break: break-all;

          .card-item-title {
            font-size: 16px;
            font-weight: 600;
            color: #303133;
          }

          .card-item-author {
            font-size: 12px;
            color: var(---N6);
            word-break: keep-all;
          }
        }

        .card-item-memo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          color: var(---N6);

          .analysis-period {
            font-size: 12px;
            color: var(---N6);
            font-weight: 400;
          }

          .card-item-actions {
            display: flex;
            align-items: center;
            gap: 4px;

            .gap {
              color: #d9d9d9;
            }

            :deep(.el-button) {
              color: var(---N6);
              font-weight: 400;
              padding: 0;

              &:hover {
                color: var(--el-color-primary);
              }
            }
          }
        }

        .card-item-content {
          color: #606266;
          word-break: break-all;

          * {
            line-height: 1.8;
            font-size: 14px;
          }

          :deep(p) {
            color: var(---N8);
          }

          :deep(img) {
            max-width: 100%;
            height: auto !important;
          }
        }

        + .card-item {
          border-top: 6px solid var(---N2);
        }
      }
    }
  }
</style>
