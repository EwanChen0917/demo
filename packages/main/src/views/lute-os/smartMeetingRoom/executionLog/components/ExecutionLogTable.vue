<template>
  <div class="execution-log-table">
    <KeenList @refresh="fetchTable" @reset-search="handleReset">
      <template #search>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          :clearable="false"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          class="w-260"
          @change="handleFiltersChange"
        />
      </template>

      <template #filters>
        <el-select
          v-model="filters.status"
          clearable
          placeholder="执行状态"
          class="w-180"
          @change="handleFiltersChange"
          @clear="handleFiltersChange"
        >
          <el-option label="成功" value="成功" />
          <el-option label="失败" value="失败" />
          <el-option label="冲突拦截" value="冲突拦截" />
          <el-option label="待执行" value="待执行" />
          <el-option label="关闭" value="关闭" />
        </el-select>

        <el-select
          v-model="filters.roomCode"
          filterable
          clearable
          placeholder="会议室"
          class="w-220"
          @change="handleFiltersChange"
          @clear="handleFiltersChange"
        >
          <el-option
            v-for="opt in roomSelectOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </template>

      <template #default="{ tableHeight }">
        <el-table :data="tableData" v-loading="tableLoading" :max-height="tableHeight">
          <el-table-column
            prop="executionSerialNo"
            label="执行流水号"
            min-width="160"
            show-overflow-tooltip
          />
          <el-table-column label="执行时间" min-width="170">
            <template #default="{ row }">
              <span :class="{ 'time-danger': row.status === 'fail' }">{{ row.executedAt }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="taskName" label="任务名称" min-width="140" show-overflow-tooltip />
          <el-table-column prop="taskCode" label="任务编号" min-width="160" show-overflow-tooltip />
          <el-table-column
            prop="triggerSource"
            label="触发源"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="triggerCondition"
            label="触发条件"
            min-width="160"
            show-overflow-tooltip
          />
          <el-table-column label="会议室" min-width="180">
            <template #default="{ row }">
              <div class="room-info">
                <span class="room-name">{{ parseRoomStr(row.roomStr).room }}</span>
                <span class="meeting-time" v-if="parseRoomStr(row.roomStr).time">
                  {{ parseRoomStr(row.roomStr).time }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="执行动作" min-width="180" show-overflow-tooltip>
            <template #default="{ row }">
              <div class="pre-wrap">{{ row.executeAction }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="durationText" label="运行时长" width="110" />
          <el-table-column label="执行状态" width="120">
            <template #default="{ row }">
              <span :class="statusClass(row.status)">{{ row.statusDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90" fixed="right">
            <template #default="{ row }">
              <ExecutionLogDetailPopover :row="row" />
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
  </div>
</template>

<script setup lang="ts" name="ExecutionLogTable">
  import { useDebounceFn } from '@vueuse/core';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { getExecutionLogApi } from '../api';
  import ExecutionLogDetailPopover from './ExecutionLogDetailPopover.vue';

  import type { ExecutionLogListItem, ExecutionStatus } from '../types';

  const api = getExecutionLogApi();

  const today = dayjs().format('YYYY-MM-DD');
  const dateRange = ref<[string, string] | null>([today, today]);

  const filters = reactive<{
    status?: ExecutionStatus;
    roomCode?: string;
  }>({
    status: undefined,
    roomCode: undefined,
  });

  const roomSelectOptions = ref<{ label: string; value: string }[]>([]);

  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const tableLoading = ref(false);
  const tableData = ref<ExecutionLogListItem[]>([]);

  const statusClass = (status: string) => {
    if (status === 'success') return 'status-success';
    if (status === 'fail') return 'status-fail';
    if (status === 'conflict') return 'status-conflict';
    if (status === 'waiting') return 'status-waiting';
    if (status === 'close') return 'status-closed';
    return '';
  };

  const parseRoomStr = (roomStr?: string) => {
    if (!roomStr) return { room: '-', time: '' };
    const match = roomStr.match(/^\[(.*?)\]\s*(.*)$/);
    if (match) {
      return { room: match[1], time: match[2] };
    }
    return { room: roomStr, time: '' };
  };

  const fetchTable = async () => {
    tableLoading.value = true;
    try {
      const [startDate, endDate] = dateRange.value ?? [today, today];
      const res = await api.queryExecutionLogList({
        startDate,
        endDate,
        status: filters.status,
        roomCode: filters.roomCode,
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      });
      pagination.total = res.total ?? 0;
      tableData.value = (res.executionLogList ?? []) as ExecutionLogListItem[];
    } catch (error: any) {
      ElMessage.error(error?.message || '查询执行日志失败');
    } finally {
      tableLoading.value = false;
    }
  };

  const debouncedFetch = useDebounceFn(fetchTable, 300);

  const handleFiltersChange = () => {
    pagination.pageNum = 1;
    debouncedFetch();
  };

  const handleReset = () => {
    dateRange.value = [today, today];
    filters.status = undefined;
    filters.roomCode = undefined;
    pagination.pageNum = 1;
    debouncedFetch();
  };

  const fetchRoomSelectOptions = async () => {
    const res = await api.queryMeetingRoomSelectList({});
    roomSelectOptions.value = (res.roomList ?? []) as any;
  };

  fetchRoomSelectOptions();

  const handlePageNumChange = (pageNum: number) => {
    pagination.pageNum = pageNum;
    fetchTable();
  };

  const handlePageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.pageNum = 1;
    fetchTable();
  };

  fetchTable();
</script>

<style lang="scss" scoped>
  .execution-log-table {
    width: 100%;
  }

  .w-260 {
    width: 260px;
  }

  .w-180 {
    width: 180px;
  }

  .w-220 {
    width: 220px;
  }

  .pre-wrap {
    white-space: pre-line;
    line-height: 18px;
  }

  .time-danger {
    color: #f56c6c;
    font-weight: 600;
  }

  .status-success {
    color: #02b96b;
    font-weight: 600;
  }

  .status-fail {
    color: #f56c6c;
    font-weight: 600;
  }

  .status-conflict {
    color: #e6a23c;
    font-weight: 600;
  }

  .status-waiting {
    color: #e6a23c;
    font-weight: 600;
  }

  .status-closed {
    color: #909399;
    font-weight: 600;
  }

  .room-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    .room-name {
      font-weight: 600;
      color: #333;
    }
    .meeting-time {
      font-size: 12px;
      color: #999;
    }
  }
</style>
