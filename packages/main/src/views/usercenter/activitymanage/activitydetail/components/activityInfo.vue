<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title"><h2>活动信息</h2></div>
    </div>
    <div class="card-body pt-0 px-20">
      <el-form-item label="活动名称" prop="name" required>
        <el-input
          v-model="form!.name"
          placeholder="请输入活动名称"
          :disabled="form!.activityStarted"
        />
      </el-form-item>
      <el-form-item label="活动时间" required>
        <KeenFlex :fluids="3">
          <template #fluid-item="{ idx }">
            <el-form-item v-if="idx === 0" prop="startTime">
              <el-date-picker
                v-model="form!.startTime"
                placeholder="开始时间"
                :disabled-date="
                  (date) =>
                    dayjs(date).isBefore(dayjs(), 'date') ||
                    (form?.endTime ? !dayjs(date).isBefore(dayjs(form.endTime), 'date') : false)
                "
                value-format="YYYY-MM-DD"
                :disabled="form!.activityStarted"
                :popper-options="{ placement: 'bottom-start' }"
              />
            </el-form-item>
            <el-form-item v-if="idx === 1" prop="endTime">
              <el-date-picker
                v-if="idx === 1"
                v-model="form!.endTime"
                :disabled-date="
                  (date) =>
                    dayjs(date).isBefore(dayjs(), 'date') || form?.startTime
                      ? !dayjs(date).isAfter(dayjs(form?.startTime), 'date')
                      : false
                "
                placeholder="结束时间"
                value-format="YYYY-MM-DD"
                :disabled="form!.activityStarted"
                :popper-options="{ placement: 'bottom-start' }"
              />
            </el-form-item>
            <span v-if="idx === 2">（最后一天为中奖码公示时间）</span>
          </template>
        </KeenFlex>
      </el-form-item>
      <el-form-item label="状态" prop="status" required>
        <el-radio-group v-model="form!.status" :disabled="form!.activityStarted">
          <el-radio :label="ActivityStatus.开启">开启</el-radio>
          <el-radio :label="ActivityStatus.关闭">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ActivityContracts } from '@/api/index';
  import { ActivityStatus } from '@/types/api';
  import dayjs from 'dayjs';

  const form = inject<ActivityContracts.ActivitySaveReq & { activityStarted: boolean }>('form');
</script>
