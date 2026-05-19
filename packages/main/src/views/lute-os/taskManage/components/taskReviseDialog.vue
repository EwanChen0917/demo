<template>
  <el-dialog class="custom-dialog w-600px" v-model="visible" @close="visible = false">
    <template #header>
      <div class="header-title">发起变更</div>
    </template>
    <div>
      <div class="title">变更原因：</div>
      <el-input
        type="textarea"
        :rows="4"
        v-model="detailInfo.changeReason"
        placeholder="请输入变更原因"
      />
      <div class="title" style="margin-top: 25px">时间变更：</div>
      <div class="times">
        <div class="origin-time">
          <span class="label">变更前任务截止时间</span>
          <span class="time">{{ detailInfo.endTime }}</span>
        </div>
        <div>
          <span class="label">变更后任务截止时间</span>
          <el-date-picker
            id="timeSelectRef"
            ref="timeSelectRef"
            placeholder="请选择"
            v-model="detailInfo.newEndTime"
            type="date"
            value-format="YYYY-MM-DD"
            clearable
            :disabled-date="(date) => dayjs(date).isBefore(Date.now(), 'date')"
          />
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
          <el-select
            id="categorySelectRef"
            ref="categorySelectRef"
            style="width: 160px"
            v-model="detailInfo.newTaskCategoryCode"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in categoryOptions"
              :value="item.taskCategoryCode"
              :label="item.taskCategoryName"
              :key="item.taskCategoryCode"
            />
          </el-select>
        </div>
      </div>
      <template v-if="detailInfo?.useMilestone">
        <div class="milestones" style="margin-top: 6px; margin-bottom: 24px">
          <div class="title">任务里程碑：</div>
          <el-link type="primary" :underline="false">
            <el-icon size="16">
              <Plus />
            </el-icon>
            <span class="add" @click="addMilestone">添加</span>
          </el-link>
        </div>
        <el-table :data="detailInfo?.milestoneList">
          <el-table-column label="里程碑序号" type="index" align="center" width="120" />
          <el-table-column label="里程碑内容" align="center">
            <template #default="{ row, $index }">
              <el-input size="small" :id="`editor${$index}`" v-model="row.content" />
            </template>
          </el-table-column>
          <el-table-column label="截止时间" prop="nodeTime" align="center" width="120">
            <template #default="{ row, $index }">
              <el-date-picker
                :id="`nodeTime${$index}`"
                v-model="row.nodeTime"
                size="small"
                type="date"
                placeholder="请选择"
                value-format="YYYY-MM-DD"
                :disabled-date="(date) => dayjs(date).isAfter(detailInfo.newEndTime, 'date')"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template #default="{ $index }">
              <img
                class="delete-icon"
                src="@/assets/svgs/deleteOutlined.svg"
                alt=""
                @click="deleteItem($index)"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { Plus } from '@element-plus/icons-vue';
  import dayjs from 'dayjs';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const detailInfo = ref({});

  const categoryOptions = ref<any[]>([]);
  const getCategoryOptions = async () => {
    const res = await platformApi.platformTaskGetTaskCategoryList();
    categoryOptions.value = res.taskCategoryList || [];
  };
  getCategoryOptions();

  const saveLoading = ref(false);
  const save = async () => {
    if (!detailInfo.value.changeReason) {
      ElMessage.warning('请填写变更原因');
      return;
    }
    if (!detailInfo.value.taskCategoryCode) {
      ElMessage.warning('请选择任务类别');
      return;
    }
    if (!detailInfo.value.newEndTime) {
      ElMessage.warning('请选择截止时间');
      return;
    }
    if (detailInfo.value?.useMilestone) {
      let emptyIndex = -1;
      let emptyTimeIndex = -1;
      for (let i = 0; i < detailInfo.value.milestoneList.length; i++) {
        if (!detailInfo.value.milestoneList[i].nodeTime) {
          emptyTimeIndex = i;
          break;
        }
        if (
          !detailInfo.value.milestoneList[i].content ||
          detailInfo.value.milestoneList[i].content === '<p><br></p>'
        ) {
          emptyIndex = i;
          break;
        }
      }
      if (emptyIndex !== -1) {
        const isConfirmed = await swal.confirm({
          text: `请填写第${emptyIndex + 1}个里程碑内容`,
          confirmButtonText: '去填写',
        });
        if (!isConfirmed) return;
        document.getElementById(`editor${emptyIndex}`)?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById(`editor${emptyIndex}`)?.focus();
        }, 300);
        return;
      }
      if (emptyTimeIndex !== -1) {
        const isConfirmed = await swal.confirm({
          text: `请填写第${emptyTimeIndex + 1}个里程碑时间`,
          confirmButtonText: '去填写',
        });
        if (!isConfirmed) return;
        document.getElementById(`nodeTime${emptyTimeIndex}`)?.scrollIntoView({
          behavior: 'smooth',
        });
        setTimeout(() => {
          document.getElementById(`nodeTime${emptyTimeIndex}`)?.focus();
        }, 300);
        return;
      }
    }
    try {
      saveLoading.value = true;
      const res = await platformApi.platformTaskChange({
        taskCode: detailInfo.value.taskCode,
        changeReason: detailInfo.value.changeReason,
        newEndTime: detailInfo.value.newEndTime,
        milestoneList: detailInfo.value.milestoneList,
        taskCategoryCode: detailInfo.value.newTaskCategoryCode,
      });
      ElMessage.success('发起成功');
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (data) => {
    detailInfo.value = cloneDeep(data);
    console.log(detailInfo.value);
    visible.value = true;
  };

  const deleteItem = async (index) => {
    const isConfirm = await swal.confirm('确定删除该里程碑？');
    if (!isConfirm) return;
    detailInfo.value.milestoneList.splice(index, 1);
  };

  const addMilestone = () => {
    detailInfo.value.milestoneList.push({
      nodeTime: '',
      content: '',
    });
  };

  defineExpose({
    open,
    save,
  });
</script>

<style scoped lang="scss">
  .taskReviseDialog {
    background-color: red !important;
    width: 667px;
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
  .title:before {
    content: '*';
    color: var(--el-color-danger);
    margin-right: 4px;
    font-size: 14px;
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
