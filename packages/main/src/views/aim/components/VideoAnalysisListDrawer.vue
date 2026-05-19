<template>
  <el-drawer
    v-model="visible"
    title="视频分析列表"
    direction="rtl"
    size="960px"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    class="video-analysis-drawer"
    @close="handleClose"
  >
    <div class="drawer-content">
      <!-- 表格区域 -->
      <div class="table-wrapper">
        <el-table
          v-loading="listLoading"
          :data="listData?.dataList"
          style="width: 100%"
          height="calc(100vh - 140px)"
          :cell-style="{ padding: '12px' }"
          :header-cell-style="{
            padding: '0 12px 12px',
            fontWeight: 500,
            fontSize: '12px',
            color: '#262626',
          }"
        >
          <!-- 空状态插槽 -->
          <template #empty>
            <div class="table-empty-state">
              <EmptyAnimation name="listEmpty" :width="128" :height="128" />
              <div class="empty-text">暂无数据</div>
            </div>
          </template>
          <!-- 序号列 -->
          <el-table-column label="序号" width="74" align="left">
            <template #default="{ $index }">
              <span class="cell-text">{{ $index + 1 + (current - 1) * pageSize }}</span>
            </template>
          </el-table-column>

          <!-- 视频名称列 -->
          <el-table-column label="视频名称" min-width="200">
            <template #default="{ row }">
              <div class="video-name-cell">
                <span class="video-icon"></span>
                <OverflowTooltip :content="row.title" :line="1" class="video-name" />
              </div>
            </template>
          </el-table-column>

          <!-- 状态列 -->
          <el-table-column label="状态" width="240">
            <template #default="{ row }">
              <div class="status-cell">
                <!-- 进行中状态 -->
                <el-tag
                  v-if="[0, 1].includes(row.splitStatus)"
                  class="status-tag status-pending"
                  effect="plain"
                  size="small"
                >
                  进行中
                </el-tag>
                <!-- 失败状态 -->
                <template v-else-if="[2, 4].includes(row.splitStatus)">
                  <el-tag class="status-tag status-failed" effect="plain" size="small">失败</el-tag>
                  <el-tooltip :content="row.remark || ''" placement="top" :show-after="300">
                    <span class="error-reason">{{ row.remark || '' }}</span>
                  </el-tooltip>
                </template>
              </div>
            </template>
          </el-table-column>

          <!-- 创建时间列 -->
          <el-table-column label="创建时间" width="175">
            <template #default="{ row }">
              <span class="cell-text">{{ row.createTime || '-' }}</span>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column label="操作" width="80">
            <template #default="{ row }">
              <el-button
                v-if="[2, 4].includes(row.splitStatus)"
                link
                type="primary"
                @click="handleRetry(row)"
              >
                重试
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页区域 -->
      <div class="analysis-pagination-wrapper">
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
  </el-drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { videoAnalysisApi, VideoAnalysisApi } from '@/api/index';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';

  // Props
  const props = defineProps<{
    modelValue: boolean;
  }>();

  // Emits
  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
    (e: 'refresh'): void;
  }>();

  // 抽屉显示状态
  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });

  const PAGE_SIZE = 20;

  // 使用 useList hook
  const {
    listData,
    listLoading,
    refreshList,
    runQuery,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
  } = useList<
    VideoAnalysisApi.LuteosAiVideoAnalysisVideoPage.RequestBody,
    VideoAnalysisApi.LuteosAiVideoAnalysisVideoPage.ResponseBody
  >({
    searchDefaults: {
      splitStatus: [0, 1, 2, 4],
    },
    pageSize: PAGE_SIZE,
    service: videoAnalysisApi.luteosAiVideoAnalysisVideoPage,
    serviceManual: true, // 手动调用
  });

  // 监听抽屉打开时刷新列表
  watch(visible, (newVal) => {
    if (newVal) {
      runQuery(true);
    }
  });

  // 关闭抽屉
  function handleClose() {
    emit('close');
  }

  // 重试分析
  async function handleRetry(row: any) {
    try {
      await videoAnalysisApi.luteosAiVideoAnalysisRetryAnalysis({ videoId: row.id });
      ElMessage.success('重试请求已发送');
      refreshList();
      emit('refresh');
    } catch (error) {
      console.error('重试失败:', error);
    }
  }
</script>

<style lang="scss">
  // el-drawer 被 teleport 到 body 下，需要使用非 scoped 样式
  .video-analysis-drawer {
    &.el-drawer {
      padding: 16px 20px 0;
    }
    .el-drawer__header {
      margin-bottom: 0;
      padding: 0 0 15px;
      border-bottom: 1px solid var(---N2, #f5f5f5);

      .el-drawer__title {
        font-size: 16px;
        font-weight: 500;
        color: var(---N9, #1f1f1f);
        line-height: 24px;
      }

      .el-drawer__close-btn {
        padding: 0;

        .el-icon {
          font-size: 20px;
          color: var(---N6, #8a8f8d);
        }
      }
    }

    .el-drawer__body {
      padding: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .drawer-content {
      padding: 16px 0px 0 !important;
    }
    .table-wrapper .el-table .el-table__row td {
      border-bottom: 0px !important;
    }
    .el-table__inner-wrapper::before {
      height: 0px !important;
    }
  }
</style>

<style lang="scss" scoped>
  .drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
    padding-bottom: 0;
  }

  .table-wrapper {
    flex: 1;
    overflow: auto;

    :deep(.el-table) {
      .el-table__header-wrapper {
        th {
          background-color: var(---N0, #ffffff);
          border-bottom: 1px solid var(---N2, #f5f5f5);
        }
      }

      .el-table__row {
        td {
          border-bottom: 1px solid var(---N2, #f5f5f5);
        }
      }
    }
  }

  .cell-text {
    font-size: 12px;
    color: var(---N9, #1f1f1f);
    line-height: 20px;
  }

  .video-name-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;

    .video-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      background-image: url('@/assets/images/icon_video.png');
      background-size: contain;
      background-repeat: no-repeat;
    }

    .video-name {
      flex: 1;
      min-width: 0;
      font-size: 12px;
      color: var(---N9, #1f1f1f);
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .status-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;

    .status-tag {
      flex-shrink: 0;
      height: 20px;
      padding: 0 6px;
      font-size: 12px;
      line-height: 20px;
      border-radius: 4px;

      // &.status-pending {
      //   color: var(---N6, #8a8f8d);
      //   background-color: transparent;
      //   border-color: var(---N6, #8a8f8d);
      // }

      &.status-pending {
        color: var(---B6, #258dff);
        background-color: transparent;
        border-color: var(---B6, #258dff);
      }

      &.status-failed {
        color: var(---C7, #f53f3f);
        background-color: transparent;
        border-color: var(---C7, #f53f3f);
      }

      // &.status-success {
      //   color: var(---P6, #02b96b);
      //   background-color: transparent;
      //   border-color: var(---P6, #02b96b);
      // }
    }

    .error-reason {
      flex: 1;
      min-width: 0;
      font-size: 12px;
      color: var(---C7, #f53f3f);
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .table-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    color: #999;

    .empty-text {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }
</style>
<style lang="scss">
  .analysis-pagination-wrapper {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    border-top: 1px solid var(---N2, #f5f5f5);
    // background-color: var(---N0, #ffffff);
    .el-pagination {
      box-shadow: none;
    }
  }
</style>
