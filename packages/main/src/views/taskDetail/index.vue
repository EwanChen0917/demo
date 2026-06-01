<template>
  <div class="task-list">
    <KeenList
      @refresh="refreshList"
      @reset-search="reset"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <el-input
          class="w-200px"
          v-model="search.taskCode"
          placeholder="请输入任务编号"
          clearable
          suffix-icon="search"
        />
        <el-input
          class="w-200px"
          v-model="search.businessCode"
          placeholder="请输入订单号"
          clearable
          suffix-icon="search"
        />
        <el-select v-model="search.status" placeholder="任务状态" clearable>
          <el-option
            v-for="item in taskStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="search.taskType" placeholder="任务类型" clearable>
          <el-option
            v-for="item in taskTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="time"
          type="datetimerange"
          @change="handleChangeTime"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </template>
      <template #buttons>
        <!-- <el-button
          :loading="buttonLoading"
          type="primary"
          @click="handleClickRetry"
          :disabled="!checkList.length"
        >
          重试
        </el-button> -->
        <!-- :service="erpApi.luteosErpBaseFlowExportList" -->
        <!-- <ExportBtn
          :params="{
            ...search,
          }"
        >
          导出当前列表
        </ExportBtn> -->
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        class-name="table-row-dashed"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column label="任务编号" prop="taskCode" />
        <el-table-column label="订单号" prop="businessCode" />
        <el-table-column label="任务类型" prop="taskTypeDesc" />
        <el-table-column label="任务状态" prop="status">
          <template #default="{ row }">
            <Tag
              v-if="row.status !== undefined && row.status !== null"
              :color="statusTag[row.status] ?? 'default'"
              size="small"
            >
              <span class="span-break">{{ row.statusDesc }}</span>
            </Tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="执行结果" prop="executeResult">
          <template #default="{ row }">
            <OverflowTooltip :content="row?.executeResult" :line="3" />
          </template>
        </el-table-column>
        <el-table-column label="重试次数" prop="retryCount" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="完成时间" prop="completeTime" />
        <el-table-column label="操作" fixed="right">
          <template #default="{ row }">
            <div class="col-op">
              <KeenActions
                display-style="buttons"
                :actions="[
                  // {
                  //   label: '重试',
                  //   key: 'retry',
                  //   type: 'primary',
                  //   hide: row.status != 3,
                  //   row,
                  // },
                  {
                    label: '操作日志',
                    key: 'log',
                    type: 'primary',
                    row,
                  },
                ]"
                @click="handleActions"
              />
            </div>
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
    </KeenList>
    <Log ref="logRef" />
  </div>
</template>

<script setup lang="ts" name="taskDetail">
  import useList from '@/hooks/list/useList';
  import { omsApi, OmsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import Log from './component/log.vue';

  const statusTag: Record<number, string> = {
    wait: 'blue',
    processing: 'yellow',
    success: 'green',
    failed: 'red',
    ignore: 'gray',
  };

  const time: any = ref([]);
  const PAGE_SIZE = 10;

  const taskStatusList = [
    { label: '待处理', value: 'wait' },
    { label: '处理中', value: 'processing' },
    { label: '成功', value: 'success' },
    { label: '失败', value: 'failed' },
    { label: '不处理', value: 'ignore' },
  ];

  const taskTypeList = [
    { label: '转FBA', value: 'transfer_fba' },
    { label: '提交出库', value: 'submit_outbound' },
  ];

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
    refreshList,
    resetSearch,
  } = useList<
    OmsApi.OmsCommonTaskQueryBusinessTaskList.RequestQuery,
    OmsApi.OmsCommonTaskQueryBusinessTaskList.ResponseBody
  >({
    searchDefaults: {
      taskCode: undefined,
      businessCode: undefined,
      startTime: undefined,
      endTime: undefined,
      status: undefined,
      taskType: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: omsApi.omsCommonTaskQueryBusinessTaskList,
  });

  onActivated(() => {
    refreshList();
  });

  const reset = () => {
    time.value = [];
    resetSearch();
  };

  const checkList = ref([]);
  const handleSelectionChange = (list) => (checkList.value = list);

  // 批量重试
  const buttonLoading = ref(false);
  const handleClickRetry = async () => {
    console.log(checkList.value, '9999');
    const filterData = checkList.value.filter((item) => item.status !== 3);
    if (filterData.length > 0) {
      ElMessage.warning('仅失败状态能执行【重试】操作');
      return;
    }
    try {
      buttonLoading.value = true;
      const taskCodeList = checkList.value.map((item) => item.taskCode);
      // console.log(taskCodeList,checkList.value);
      await omsApi.omsCommonTaskBatchRetry({
        taskCodeList: taskCodeList,
      });
      ElMessage.success('重试成功');
      refreshList();
    } finally {
      buttonLoading.value = false;
    }
  };

  // 操作
  const logRef = ref();
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'retry':
        const isConfirm = await swal.confirm('确定要重试吗？');
        if (isConfirm) {
          try {
            await omsApi.omsCommonTaskRetry({
              taskCode: row?.taskCode,
            });
            ElMessage.success('重试成功');
            refreshList();
          } finally {
          }
        }
        break;
      case 'log':
        logRef.value?.open(row);
        break;
      default:
        break;
    }
  };

  const handleChangeTime = (value) => {
    if (value?.length) {
      search.startTime = value[0];
      search.endTime = value[1];
      return;
    }
    search.startTime = undefined;
    search.endTime = undefined;
  };
</script>

<style lang="scss" scoped></style>
