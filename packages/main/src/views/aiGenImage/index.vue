<template>
  <div class="ai-image-list">
    <KeenList @refresh="refreshList" @reset-search="handleResetSearch">
      <template #search>
        <el-input
          v-model="search.keyword"
          class="ai-image-list__keyword"
          placeholder="任务名称、版本号"
          clearable
          @keyup.enter="runQuery(true)"
        >
          <template #suffix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>

      <template #filters>
        <DeptMember
          v-model="search.creatorList"
          class="ai-image-member-select"
          placeholder="创建人"
          multiple
          :max-collapse-tags="1"
        />
        <el-select
          v-model="search.status"
          class="ai-image-list__status-filter"
          placeholder="生图状态"
          clearable
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>

      <template #buttons>
        <el-button type="primary" @click="handleCreateTask">创建任务</el-button>
      </template>

      <template #default="{ tableHeight }">
        <el-table
          v-loading="listLoading"
          class="ai-image-task-table"
          :data="listData?.dataList || []"
          :height="tableHeight"
          row-key="taskCode"
        >
          <template #empty>
            <div class="ai-image-empty">
              <EmptyAnimation name="listEmpty" :width="128" :height="128" />
              <div class="ai-image-empty__text">暂无 AI 生图任务</div>
            </div>
          </template>
          <el-table-column label="图片信息" min-width="632">
            <template #default="{ row }">
              <TaskInfoCell :row="row" :keyword="search.keyword" />
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="100">
            <template #default="{ row }">
              <MemberCell
                :member-code="row.creator"
                :member-name="row.creatorName"
                :options="creatorOptions"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column label="设计师" width="112">
            <template #default="{ row }">
              <MemberCell
                :member-code="row.designerCode"
                :member-name="row.designerName"
                :options="designerOptions"
              />
            </template>
          </el-table-column> -->
          <el-table-column label="生图状态" width="150">
            <template #default="{ row }">
              <StatusCell :status="row.status" :status-name="row.statusName" />
            </template>
          </el-table-column>
          <el-table-column label="版本号" width="92">
            <template #default="{ row }">{{ row.versionNo ?? '-' }}</template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="160" />
          <el-table-column label="操作" width="154" fixed="right" align="right">
            <template #default="{ row }">
              <div class="ai-image-actions">
                <template v-if="!isFinalStatus(row.status, row.statusName)">
                  <el-button link type="primary" @click="handleContinueTask(row)">
                    继续任务
                  </el-button>
                  <span class="ai-image-actions__divider"></span>
                </template>
                <el-button link type="primary" @click="handleDetail(row)">详情</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          size="small"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </KeenList>
    <CreateTaskDrawer
      ref="createTaskDrawerRef"
      @success="handleTaskListRefresh"
      @created-single="handleCreatedSingleTask"
    />
    <TaskStageDrawer
      ref="taskStageDrawerRef"
      @success="handleTaskListRefresh"
      @close="handleTaskListRefresh"
    />
  </div>
</template>

<script setup lang="ts" name="aiGenImage">
  import { ref } from 'vue';
  import { aiGenerateImageApi } from '@/api';
  import type { AiGenerateImageApi, AiGenerateImageContracts } from '@/api';
  import useList from '@/hooks/list/useList';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import DeptMember from './components/DeptMember.vue';
  import CreateTaskDrawer from './drawers/CreateTaskDrawer.vue';
  import TaskStageDrawer from './drawers/TaskStageDrawer.vue';
  import MemberCell from './components/MemberCell.vue';
  import StatusCell from './components/StatusCell.vue';
  import TaskInfoCell from './components/TaskInfoCell.vue';
  import useCreatorOptions from './hooks/useCreatorOptions';
  import useDesignerOptions from './hooks/useDesignerOptions';
  import { useGenerateStatusOptions } from './hooks/useGenerateStatusOptions';
  import type { AiImageOpenStage } from './types';

  type TaskListReq = AiGenerateImageApi.LuteosAiAdTaskQueryTaskList.RequestBody;
  type TaskListResp = AiGenerateImageApi.LuteosAiAdTaskQueryTaskList.ResponseBody;
  type TaskListSearch = Omit<TaskListReq, 'pageNum' | 'pageSize'>;

  const PAGE_SIZE = 10;

  const { options: creatorOptions } = useCreatorOptions();
  const { options: designerOptions } = useDesignerOptions();
  const { options: statusOptions, isFinalStatus } = useGenerateStatusOptions();
  const createTaskDrawerRef = ref<InstanceType<typeof CreateTaskDrawer>>();
  const taskStageDrawerRef = ref<InstanceType<typeof TaskStageDrawer>>();

  const normalizeSearch = (data: TaskListSearch) => {
    return {
      keyword: data.keyword?.trim() || undefined,
      creatorList: data.creatorList?.length ? data.creatorList : undefined,
      // designerList: data.designerList?.length ? data.designerList : undefined,
      status: typeof data.status === 'number' ? data.status : undefined,
    };
  };

  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      pageSizeOption,
      handleCurrentChange,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<TaskListReq, TaskListResp>({
    searchDefaults: {
      keyword: undefined,
      creatorList: [],
      designerList: [],
      status: undefined,
    },
    interceptSearchData: normalizeSearch,
    watchSearchKeys: ['keyword', 'creatorList', 'status'],
    pageSize: PAGE_SIZE,
    service: aiGenerateImageApi.luteosAiAdTaskQueryTaskList,
  });

  const handleResetSearch = () => {
    resetSearch();
    runQuery(true);
  };

  const handleCreateTask = () => {
    createTaskDrawerRef.value?.open();
  };

  const handleContinueTask = (row: AiGenerateImageContracts.TaskListItemBean) => {
    taskStageDrawerRef.value?.open(row, 'auto');
  };

  const handleDetail = (row: AiGenerateImageContracts.TaskListItemBean) => {
    taskStageDrawerRef.value?.open(row, 'finished');
  };

  const handleTaskListRefresh = () => {
    runQuery();
  };

  const handleCreatedSingleTask = (taskCode: string, openStage: AiImageOpenStage) => {
    taskStageDrawerRef.value?.open(taskCode, openStage);
  };
</script>

<style scoped lang="scss">
  .ai-image-list__status-filter {
    width: 96px;
  }

  .ai-image-actions {
    display: inline-flex;
    align-items: center;
    height: 40px;

    :deep(.el-button) {
      height: 20px;
      padding: 0;
      font-size: 12px;
      line-height: 20px;
    }

    &__divider {
      width: 1px;
      height: 12px;
      margin: 0 9px;
      background: #e9ecf0;
    }
  }

  .ai-image-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 280px;
    color: var(--ai-image-secondary-text);

    &__text {
      margin-top: 8px;
      font-size: 12px;
      line-height: 20px;
    }
  }
</style>
