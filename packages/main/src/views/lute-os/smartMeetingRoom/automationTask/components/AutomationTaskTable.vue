<template>
  <div class="automation-task-table">
    <KeenList @refresh="fetchTable" @reset-search="handleReset">
      <template #search>
        <el-input
          v-model="filters.taskCode"
          clearable
          placeholder="任务名称/编码"
          class="w-280"
          @input="handleFiltersChange"
          @clear="handleFiltersChange"
        />
      </template>

      <template #filters>
        <el-select
          v-model="filters.statusList"
          multiple
          clearable
          placeholder="任务状态"
          class="w-220"
          @change="handleFiltersChange"
          @clear="handleFiltersChange"
        >
          <el-option label="待执行" value="待执行" />
          <el-option label="运行中" value="运行中" />
          <el-option label="已暂停" value="已暂停" />
          <el-option label="已关闭" value="已关闭" />
        </el-select>
      </template>

      <template #buttons>
        <el-button type="primary" @click="handleAddTask" v-permission="'automationTaskAdd'">
          +添加任务
        </el-button>
      </template>

      <template #default="{ tableHeight }">
        <el-table :data="tableData" v-loading="tableLoading" :max-height="tableHeight">
          <el-table-column prop="taskName" label="任务名称" min-width="140" show-overflow-tooltip />
          <el-table-column prop="taskCode" label="任务编码" min-width="160" show-overflow-tooltip />
          <el-table-column label="触发条件" min-width="170" show-overflow-tooltip>
            <template #default="{ row }">
              <div class="pre-wrap">{{ displayTriggerText(row) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="执行动作" min-width="170" show-overflow-tooltip>
            <template #default="{ row }">
              <div class="pre-wrap">{{ displayActionText(row) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="最新运行时间" min-width="170">
            <template #default="{ row }">
              <span>{{ row.latestRunAt || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务开始执行时间" min-width="170">
            <template #default="{ row }">
              <span>{{ row.taskStartTime || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务常定时间" width="120">
            <template #default="{ row }">
              <span>
                {{ row.keepLightFlag && row.keepMinutes ? `${row.keepMinutes}分钟` : '-' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="任务状态" width="110">
            <template #default="{ row }">
              <span :class="statusClass(row.status)">{{ row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140" fixed="right">
            <template #default="{ row }">
              <TaskOperationButtons
                :row="row"
                @pause="handlePause"
                @resume="handleResume"
                @close="handleClose"
                @edit="handleEdit"
              />
            </template>
          </el-table-column>
        </el-table>

        <KeenPagination
          :current="pagination.pageNum"
          :page-size="pagination.pageSize"
          :page-size-option="[10, 20, 50, 100]"
          :total="pagination.total"
          @size-change="handlePageSizeChange"
          @current-change="handlePageNumChange"
        />
      </template>
    </KeenList>

    <AutomationTaskFormDialog
      v-model:visible="formVisible"
      :mode="formMode"
      :editing-row="editingRow"
      @submitted="handleSubmitted"
    />
  </div>
</template>

<script setup lang="ts" name="AutomationTaskTable">
  import { useDebounceFn } from '@vueuse/core';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { getAutomationTaskApi } from '../api';
  import type { AutomationTaskListItem, AutomationTaskStatus, SelectOption } from '../types';
  import AutomationTaskFormDialog from './AutomationTaskFormDialog.vue';
  import TaskOperationButtons from './TaskOperationButtons.vue';

  const api = getAutomationTaskApi();

  const filters = reactive<{
    taskCode?: string;
    statusList: AutomationTaskStatus[];
  }>({
    taskCode: undefined,
    statusList: [],
  });

  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const tableLoading = ref(false);
  const tableData = ref<AutomationTaskListItem[]>([]);

  const formVisible = ref(false);
  const formMode = ref<'add' | 'edit'>('add');
  const editingRow = ref<AutomationTaskListItem | null>(null);

  const statusClass = (status: AutomationTaskStatus) => {
    if (status === '运行中') return 'status-running';
    if (status === '待执行') return 'status-waiting';
    if (status === '已暂停') return 'status-paused';
    return 'status-closed';
  };

  const displayTriggerText = (row: AutomationTaskListItem) => {
    return row.triggerConditionStr || '-';
  };

  const displayActionText = (row: AutomationTaskListItem) => {
    return row.executeActionStr;
  };

  const fetchTable = async () => {
    tableLoading.value = true;
    try {
      const res = await api.queryAutomationTaskList({
        keyword: filters.taskCode,
        statusList: filters.statusList,
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      });
      pagination.total = res.total;
      tableData.value = res.taskList;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      ElMessage.error(message || '查询任务列表失败');
    } finally {
      tableLoading.value = false;
    }
  };

  const debouncedFetchTable = useDebounceFn(fetchTable, 300);

  const handleFiltersChange = () => {
    pagination.pageNum = 1;
    debouncedFetchTable();
  };

  const handleReset = () => {
    filters.taskCode = undefined;
    filters.statusList = [];
    pagination.pageNum = 1;
    debouncedFetchTable();
  };

  const handlePageNumChange = (pageNum: number) => {
    pagination.pageNum = pageNum;
    fetchTable();
  };

  const handlePageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.pageNum = 1;
    fetchTable();
  };

  const handleAddTask = () => {
    formMode.value = 'add';
    editingRow.value = null;
    formVisible.value = true;
  };

  const handleEdit = (row: AutomationTaskListItem) => {
    formMode.value = 'edit';
    editingRow.value = row;
    formVisible.value = true;
  };

  const handleSubmitted = () => {
    fetchTable();
  };

  const handlePause = async (row: AutomationTaskListItem) => {
    const ok = await swal.confirm({
      title: '你确认要暂停当前任务吗',
      text: '暂停后，任务将不再执行！',
      icon: 'warning',
    });
    if (!ok) return;

    await api.pauseAutomationTask(row.taskCode);
    ElMessage.success('已暂停');
    fetchTable();
  };

  const handleResume = async (row: AutomationTaskListItem) => {
    const ok = await swal.confirm({
      title: '你确认要恢复当前任务吗',
      text: '恢复后，任务将重新执行！',
      icon: 'warning',
    });
    if (!ok) return;

    await api.resumeAutomationTask(row.taskCode);
    ElMessage.success('已恢复');
    fetchTable();
  };

  const handleClose = async (row: AutomationTaskListItem) => {
    const ok = await swal.confirm({
      title: '你确认要关闭当前任务吗',
      text: '关闭后，任务将永久关闭，无法恢复！',
      icon: 'warning',
    });
    if (!ok) return;

    await api.closeAutomationTask(row.taskCode);
    ElMessage.success('已关闭');
    fetchTable();
  };

  fetchTable();
</script>

<style lang="scss" scoped>
  .automation-task-table {
    width: 100%;
  }

  .w-280 {
    width: 280px;
  }

  .w-220 {
    width: 220px;
  }

  .pre-wrap {
    white-space: pre-line;
    line-height: 18px;
  }

  .status-running {
    color: #02b96b;
    font-weight: 600;
  }

  .status-waiting {
    color: #e6a23c;
    font-weight: 600;
  }

  .status-paused {
    color: #f56c6c;
    font-weight: 600;
  }

  .status-closed {
    color: #909399;
    font-weight: 600;
  }
</style>
