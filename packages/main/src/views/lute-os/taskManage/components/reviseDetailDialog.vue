<template>
  <el-dialog
    class="w-600px custom-dialog"
    :title="title"
    v-model="visible"
    @close="visible = false"
  >
    <template #header>
      <div class="header-title">变更内容</div>
    </template>
    <div>
      <div class="title">变更原因：</div>
      <div class="changeReason">{{ detailInfo?.changeReason }}</div>
      <div class="title" style="margin-top: 25px">时间变更：</div>
      <div class="times">
        <div class="origin-time">
          <span class="label">变更前任务截止时间</span>
          <span class="time">{{ detailInfo.endTime }}</span>
        </div>
        <div>
          <span class="label">变更后任务截止时间</span>
          <span class="time">{{ detailInfo.newEndTime }}</span>
        </div>
      </div>
      <div class="title" style="margin-top: 25px">任务类别变更：</div>
      <div class="times">
        <div class="origin-time">
          <span class="label">变更前任务类别</span>
          <span class="time">{{ detailInfo.taskCategoryName }}</span>
        </div>
        <div>
          <span class="label">变更后任务类别</span>
          <span class="time">{{ detailInfo.newTaskCategoryName }}</span>
        </div>
      </div>
      <template v-if="detailInfo?.useMilestone">
        <div class="milestones" style="margin-top: 6px; margin-bottom: 24px">
          <div class="title">任务里程碑：</div>
        </div>
        <el-table :data="detailInfo?.milestoneList">
          <el-table-column label="里程碑序号" type="index" align="center" width="120" />
          <el-table-column label="里程碑内容" align="center" prop="content">
            <template #default="{ row }">
              <div>{{ row?.content }}</div>
            </template>
          </el-table-column>
          <el-table-column label="截止时间" prop="nodeTime" align="center" width="120" />
        </el-table>
      </template>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="rejectDialogRef?.open(detailInfo?.taskCode, 'approve_change')"
        >
          拒绝变更
        </el-button>
        <el-button type="primary" @click="agree" v-loading="saveLoading">同意变更</el-button>
      </span>
    </template>
  </el-dialog>
  <RejectDialog ref="rejectDialogRef" @reject="handleReject" />
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { Plus } from '@element-plus/icons-vue';
  import RejectDialog from '@/views/lute-os/taskManage/components/rejectDialog.vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');
  const time = ref([]);
  const detailInfo = ref({});
  const rejectDialogRef = ref();

  const saveLoading = ref(false);
  const agree = async () => {
    try {
      saveLoading.value = true;
      await platformApi.platformTaskOperate({
        taskCode: detailInfo.value?.taskCode,
        operateType: 'approve_change',
        type: 1,
      });
      ElMessage.success(`变更成功`);
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (data) => {
    detailInfo.value = cloneDeep(data);
    time.value = [data.startTime, data.endTime];
    visible.value = true;
  };

  const handleReject = () => {
    visible.value = false;
    emit('success');
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .taskReviseDialog {
    background-color: red !important;
    width: 667px;
  }
  :deep(.el-dialog__header) {
    border: none !important;
  }
  .title {
    font-family: 'PingFang SC Regular';
    font-size: 16px;
    font-weight: 500;
    line-height: 22.4px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: rgba(0, 0, 0, 1);
  }
  .changeReason {
    margin-top: 18px;
  }
  .times {
    padding: 24px 30px;
    .origin-time {
      margin-bottom: 16px;
    }
    .label {
      margin-right: 16px;
      font-family: 'PingFang SC';
      font-size: 16px;
      font-weight: 400;
      line-height: 22.4px;
      text-align: left;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
      color: rgba(60, 61, 64, 1);
    }
    .time {
      font-family: Roboto;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      text-align: right;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
      color: rgba(26, 26, 34, 1);
    }
  }
  .milestones {
    display: flex;
    align-items: center;
    .add {
      font-size: 16px;
      font-family: 'PingFang SC';
    }
  }
  .delete-icon {
    cursor: pointer;
  }
  :deep(.el-textarea__inner) {
    background-color: unset;
    border-color: rgba(217, 217, 217, 1);
    margin-top: 10px;
    font-family: 'PingFang SC';
    font-size: 14px;
    line-height: 22px;
  }
  :deep(.el-table__header) {
    .el-table__cell {
      background-color: rgba(244, 244, 244, 1);
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 19.6px;
      color: rgba(89, 89, 89, 1);
      padding: 10px 0;
    }
  }
</style>
