<!-- 任务单据管理 -->
<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input
        v-model="search.taskName"
        clearable
        style="width: 350px"
        placeholder="请输入任务类型名称"
        maxlength="50"
      />
    </template>

    <template #buttons>
      <!-- <el-button type="success" @click="handleAddTaskType">新增任务类型</el-button> -->
    </template>

    <template #tools-prepend>
      <el-tooltip placement="top">
        <template #content>
          <div>任务单据管理系统</div>
        </template>
        <i class="iconfont icon-xianxingtubiaoxunwen" style="color: var(--bs-success)"></i>
      </el-tooltip>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.list"
      class-name="table-row-dashed"
    >
      <el-table-column prop="taskType" label="任务编码" min-width="140" fixed="left">
        <template #default="{ row }">
          <div class="d-flex">
            <OverflowTooltip :content="row?.taskType" :line="2" />
            <Copy :content="row.taskType" />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="taskName" label="任务类型名称" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.taskName" :line="2" />
        </template>
      </el-table-column>

      <el-table-column prop="priority" label="任务优先级" min-width="120">
        <template #default="{ row }">
          <el-tag :type="getPriorityTagType(row.priority)">
            {{ row.priority }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="parentId" label="上一级" min-width="120">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.parentId" :line="2" />
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" min-width="120">
        <template #default="{ row }">
          {{ formatDateTime(row.createTime) }}
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作" min-width="150" fixed="right">
        <template #default="{ row }">
          <div class="d-flex align-items-center gap-2">
            <el-switch
              v-model="row.status"
              :active-value="'enabled'"
              :inactive-value="'disabled'"
              @change="handleStatusChange(row)"
            />
            <el-button type="text" >禁用</el-button>
            <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
          </div>
        </template>
      </el-table-column> -->
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

  <!-- 任务类型设置详情弹窗 -->
  <TaskTypeDetailDialog ref="taskTypeDialogRef" @success="handleTaskTypeSuccess" />
</template>

<script setup lang="ts" name="taskDocumentManagement">
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { cisApi, CisApi } from '@/api';
  import TaskTypeDetailDialog from '../components/TaskTypeDetailDialog.vue';

  // const searchType = ref('keyword');
  const tableRef = ref();
  const taskTypeDialogRef = ref();
  const PAGE_SIZE = 10;

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
    // runQuery,
    resetSearch,
    refreshList,
  } = useList<
    CisApi.CisTaskConfigQueryList.RequestBody,
    CisApi.CisTaskConfigQueryList.ResponseBody
  >({
    searchDefaults: {
      taskName: undefined,
    },
    pageSize: PAGE_SIZE,
    // 这里暂时使用模拟数据，实际使用时需要替换为真实的API服务
    service: cisApi.cisTaskConfigQueryList,
  });

  const getPriorityTagType = (priority: string) => {
    const priorityMap = {
      high: 'danger',
      medium: 'warning',
      low: 'success',
    };
    return priorityMap[priority] || 'info';
  };

  // 状态相关方法
  const getStatusText = (status: string) => {
    const statusMap = {
      1: '启用',
      0: '禁用',
    };
    return statusMap[status] || status;
  };

  const getStatusTagType = (status: string) => {
    const statusMap = {
      1: 'success',
      0: 'danger',
    };
    return statusMap[status] || 'info';
  };

  // 日期格式化
  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return '-';
    return new Date(dateTime).toLocaleString();
  };

  // 任务类型操作成功回调
  const handleTaskTypeSuccess = () => {
    ElMessage.success('任务类型操作成功');
    // 这里可以刷新相关数据
    refreshList();
  };
</script>

<style scoped>
  .gap-2 {
    gap: 8px;
  }
</style>
