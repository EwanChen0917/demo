<template>
  <el-dialog title="任务详情" v-model="visibility" width="1200px" :before-close="close">
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">任务详情</span>
      </div>
    </template>

    <!-- 任务基本信息 -->
    <div class="task-info-section">
      <h4>任务基本信息</h4>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="info-item">
            <label>任务单号：</label>
            <span>{{ taskInfo?.taskNo }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <label>任务类型：</label>
            <span>{{ taskInfo?.taskType }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <label>任务优先级：</label>
            <el-tag :type="getPriorityTagType(taskInfo?.priority)">
              {{ taskInfo?.priority }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <label>执行状态：</label>
            <el-tag :type="getStatusTagType(taskInfo?.status)">
              {{ getStatusText(taskInfo?.status) }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <label>回传状态：</label>
            <el-tag :type="getStatusTagType(taskInfo?.callbackStatus)">
              {{ getStatusText(taskInfo?.callbackStatus) }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <label>执行时间：</label>
            <span>{{ formatDateTime(taskInfo?.executeTime) }}</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 任务明细列表 -->
    <div class="task-details-section">
      <h4>任务明细</h4>
      <el-table
        v-loading="detailsLoading"
        :data="taskDetails"
        class-name="table-row-dashed"
        max-height="400"
      >
        <el-table-column prop="taskDetailNo" label="任务单行号" min-width="140" fixed="left" />
        <el-table-column prop="taskType" label="任务类型" min-width="120" />
        <el-table-column prop="poNo" label="采购单号" min-width="150" v-if="showPoNo" />
        <el-table-column prop="inboundNo" label="入库单号" min-width="150" v-if="showInboundNo" />
        <el-table-column prop="receiveNo" label="收货单号" min-width="150" v-if="showReceiveNo" />
        <el-table-column prop="snCode" label="SN码" min-width="150" v-if="showSnCode" />
        <el-table-column prop="vendor" label="供应商" min-width="200" />
        <el-table-column prop="destWarehouse" label="目的仓" min-width="120" />
        <el-table-column prop="sku" label="产品SKU" min-width="150" v-if="showSku" />
        <el-table-column prop="scSku" label="供应链SKU" min-width="150" v-if="showScSku" />
        <el-table-column prop="quantity" label="数量" min-width="100" v-if="showQuantity" />
        <el-table-column prop="unitPrice" label="单价" min-width="100" v-if="showUnitPrice" />
        <el-table-column prop="taxAmount" label="税额" min-width="100" v-if="showTaxAmount" />
        <el-table-column
          prop="totalAmount"
          label="含税金额"
          min-width="120"
          v-if="showTotalAmount"
        />
        <el-table-column prop="orderDate" label="下单日期" min-width="120" />
        <el-table-column prop="status" label="执行状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="executeTime" label="执行时间" min-width="150">
          <template #default="{ row }">
            {{ formatDateTime(row.executeTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="errorMessage" label="失败原因" min-width="200" v-if="hasError">
          <template #default="{ row }">
            <el-tooltip v-if="row.errorMessage" :content="row.errorMessage" placement="top">
              <span class="error-text">{{ row.errorMessage }}</span>
            </el-tooltip>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 执行日志 -->
    <div class="execution-log-section" v-if="executionLogs.length">
      <h4>执行日志</h4>
      <el-timeline>
        <el-timeline-item
          v-for="log in executionLogs"
          :key="log.id"
          :timestamp="formatDateTime(log.timestamp)"
          :type="getLogType(log.level)"
        >
          <div class="log-content">
            <div class="log-level">{{ log.level }}</div>
            <div class="log-message">{{ log.message }}</div>
            <div class="log-details" v-if="log.details">{{ log.details }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <template #footer>
      <span>
        <el-button @click="close">关闭</el-button>
        <el-button v-if="taskInfo?.status === 'failed'" type="warning" @click="handleRetry">
          重试任务
        </el-button>
        <el-button v-if="taskInfo?.status === 'pending'" type="primary" @click="handleRefresh">
          刷新状态
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { ElMessage } from 'element-plus';

  interface TaskDetailItem {
    taskDetailNo: string;
    taskType: string;
    poNo?: string;
    inboundNo?: string;
    receiveNo?: string;
    snCode?: string;
    vendor: string;
    destWarehouse: string;
    sku?: string;
    scSku?: string;
    quantity?: number;
    unitPrice?: number;
    taxAmount?: number;
    totalAmount?: number;
    orderDate: string;
    status: 'pending' | 'success' | 'failed';
    executeTime?: string;
    errorMessage?: string;
  }

  interface ExecutionLog {
    id: string;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR';
    message: string;
    details?: string;
  }

  const visibility = ref(false);
  const taskInfo = ref<any>(null);
  const taskDetails = ref<TaskDetailItem[]>([]);
  const executionLogs = ref<ExecutionLog[]>([]);
  const detailsLoading = ref(false);

  // 根据任务类型显示不同的列
  const showPoNo = computed(() => taskInfo.value?.taskType?.includes('采购'));
  const showInboundNo = computed(() => taskInfo.value?.taskType?.includes('入库'));
  const showReceiveNo = computed(() => taskInfo.value?.taskType?.includes('收货'));
  const showSnCode = computed(() => taskInfo.value?.taskType?.includes('SN'));
  const showSku = computed(
    () => taskInfo.value?.taskType?.includes('SN') || taskInfo.value?.taskType?.includes('入库')
  );
  const showScSku = computed(
    () => taskInfo.value?.taskType?.includes('SN') || taskInfo.value?.taskType?.includes('入库')
  );
  const showQuantity = computed(
    () => taskInfo.value?.taskType?.includes('入库') || taskInfo.value?.taskType?.includes('采购')
  );
  const showUnitPrice = computed(() => taskInfo.value?.taskType?.includes('采购'));
  const showTaxAmount = computed(() => taskInfo.value?.taskType?.includes('采购'));
  const showTotalAmount = computed(() => taskInfo.value?.taskType?.includes('采购'));
  const hasError = computed(() => taskDetails.value.some((item) => item.status === 'failed'));

  // 状态相关方法
  const getStatusText = (status: string) => {
    const statusMap = {
      pending: '未开始',
      success: '成功',
      failed: '失败',
    };
    return statusMap[status] || status;
  };

  const getStatusTagType = (status: string) => {
    const statusMap = {
      pending: 'info',
      success: 'success',
      failed: 'danger',
    };
    return statusMap[status] || 'info';
  };

  const getPriorityTagType = (priority: number) => {
    if (priority >= 8) return 'danger';
    if (priority >= 5) return 'warning';
    return 'success';
  };

  const getLogType = (level: string) => {
    const typeMap = {
      INFO: 'primary',
      WARN: 'warning',
      ERROR: 'danger',
    };
    return typeMap[level] || 'primary';
  };

  // 日期格式化
  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return '-';
    return new Date(dateTime).toLocaleString();
  };

  // 打开弹窗
  async function open(task: any): Promise<void> {
    taskInfo.value = task;
    visibility.value = true;
    await loadTaskDetails();
    await loadExecutionLogs();
  }

  // 加载任务明细
  const loadTaskDetails = async () => {
    detailsLoading.value = true;
    try {
      // 模拟API调用
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      // 生成模拟明细数据
      taskDetails.value = Array.from({ length: 5 }, (_, index) => ({
        taskDetailNo: `${taskInfo.value.taskNo}-${index + 1}`,
        taskType: taskInfo.value.taskType,
        poNo: taskInfo.value.poNo,
        inboundNo: taskInfo.value.inboundNo,
        receiveNo: taskInfo.value.receiveNo,
        snCode: taskInfo.value.snCode,
        vendor: taskInfo.value.vendor,
        destWarehouse: taskInfo.value.destWarehouse,
        sku: taskInfo.value.sku,
        scSku: taskInfo.value.scSku,
        quantity: Math.floor(Math.random() * 100) + 10,
        unitPrice: Math.floor(Math.random() * 100) + 50,
        taxAmount: Math.floor(Math.random() * 50) + 10,
        totalAmount: Math.floor(Math.random() * 1000) + 100,
        orderDate: taskInfo.value.orderDate,
        status: ['pending', 'success', 'failed'][index % 3] as 'pending' | 'success' | 'failed',
        executeTime: new Date().toISOString(),
        errorMessage: index === 2 ? '库存不足，请核实后重试' : undefined,
      }));
    } catch (error) {
      ElMessage.error('加载任务明细失败');
    } finally {
      detailsLoading.value = false;
    }
  };

  // 加载执行日志
  const loadExecutionLogs = async () => {
    try {
      // 模拟API调用
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });

      executionLogs.value = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          level: 'INFO',
          message: '任务开始执行',
          details: '开始处理任务明细行',
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 200000).toISOString(),
          level: 'INFO',
          message: '进入A01库存分配池',
          details: '更新在制库存数量',
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 100000).toISOString(),
          level: 'WARN',
          message: '部分明细行执行失败',
          details: '库存不足，需要回滚已写入的库存数据',
        },
        {
          id: '4',
          timestamp: new Date().toISOString(),
          level: 'ERROR',
          message: '任务执行失败',
          details: '回滚库存数据完成，任务状态更新为失败',
        },
      ];
    } catch (error) {
      ElMessage.error('加载执行日志失败');
    }
  };

  // 关闭弹窗
  const close = () => {
    visibility.value = false;
    taskInfo.value = null;
    taskDetails.value = [];
    executionLogs.value = [];
  };

  // 重试任务
  const handleRetry = async () => {
    try {
      // 这里应该调用实际的API来重试任务
      // await retryTask(taskInfo.value.taskNo);

      ElMessage.success('任务重试成功');
      await loadTaskDetails();
      await loadExecutionLogs();
      emits('refresh');
    } catch (error) {
      ElMessage.error('任务重试失败');
    }
  };

  // 刷新状态
  const handleRefresh = async () => {
    await loadTaskDetails();
    await loadExecutionLogs();
    emits('refresh');
  };

  const emits = defineEmits<{
    (event: 'refresh'): void;
  }>();

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    gap: 12px;

    .dialog-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }
  }

  .task-info-section,
  .task-details-section,
  .execution-log-section {
    margin-bottom: 24px;

    h4 {
      margin: 0 0 16px 0;
      font-size: 14px;
      font-weight: 500;
      color: var(--el-text-color-primary);
      border-bottom: 1px solid var(--el-border-color-light);
      padding-bottom: 8px;
    }
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    label {
      font-weight: 500;
      color: var(--el-text-color-regular);
      margin-right: 8px;
      min-width: 80px;
    }

    span {
      color: var(--el-text-color-primary);
    }
  }

  .log-content {
    .log-level {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .log-message {
      color: var(--el-text-color-primary);
      margin-bottom: 4px;
    }

    .log-details {
      color: var(--el-text-color-regular);
      font-size: 12px;
    }
  }

  .error-text {
    color: var(--el-color-danger);
    cursor: pointer;
  }
</style>
