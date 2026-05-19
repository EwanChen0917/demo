<template>
  <el-form label-position="top">
    <KeenCard :title="meetingInfo.summary">
      <el-row :gutter="20">
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="预定人" prop="organizerDisplayName">
            {{ meetingInfo.organizerDisplayName }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="预定人部门">
            {{ meetingInfo.deptName }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="开始时间">
            {{ getHms(meetingInfo.startDatetime) }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="结束时间">
            {{ getHms(meetingInfo.endDatetime) }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="会议日期" prop="startDate">
            {{ meetingInfo.startDate }}
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :offset="0">
          <el-form-item label="会议时长（分）" prop="meetingDuration">
            <p class="format-txt">
              {{ meetingInfo.meetingDuration }}
            </p>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24" :offset="0">
          <el-form-item label="参会人" prop="calendarList">
            <p class="format-txt">
              {{ meetingInfo.calendarList }}
            </p>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <KeenCard title="">
    <el-table :data="listData">
      <el-table-column label="提交人" prop="memberName" />
      <el-table-column label="提交时间" prop="createTime" min-width="180" />
      <el-table-column label="1.您是否参加了本次会议？" prop="Q001" min-width="180">
        <template #default="{ row }">
          {{ getDesc(row, 'Q001') }}
        </template>
      </el-table-column>
      <el-table-column label="2.您未参加本次会议的原因？" prop="Q002" min-width="180">
        <template #default="{ row }">
          {{ getDesc(row, 'Q002') }}
        </template>
      </el-table-column>
      <el-table-column label="3.您何时被通知要参加本次会议？" prop="Q003" min-width="200">
        <template #default="{ row }">
          {{ getDesc(row, 'Q003') }}
        </template>
      </el-table-column>
      <el-table-column label="4.您是否收到了本次会议的资料" prop="Q004" min-width="220">
        <template #default="{ row }">
          {{ getDesc(row, 'Q004') }}
        </template>
      </el-table-column>
      <el-table-column label="5.您参加本次会议中是否有人迟到？" prop="Q005" min-width="220">
        <template #default="{ row }">
          {{ getDesc(row, 'Q005') }}
        </template>
      </el-table-column>
      <el-table-column label="6.您在本次会议中的主要角色?" prop="Q006" min-width="190">
        <template #default="{ row }">
          {{ getDesc(row, 'Q006') }}
        </template>
      </el-table-column>
      <el-table-column label="7.您对于本次会议的其他与会人如何评价？" prop="Q007" min-width="250">
        <template #default="{ row }">
          {{ getDesc(row, 'Q007') }}
        </template>
      </el-table-column>
      <el-table-column label="8.本次会议是否准时结束？" prop="Q008" min-width="180">
        <template #default="{ row }">
          {{ getDesc(row, 'Q008') }}
        </template>
      </el-table-column>
      <el-table-column label="9.您如何评价本次会议产出的结果？" prop="Q009" min-width="220">
        <template #default="{ row }">
          {{ getDesc(row, 'Q009') }}
        </template>
      </el-table-column>
      <el-table-column label="10.您如何评价会后工作安排？" prop="Q010" min-width="190">
        <template #default="{ row }">
          {{ getDesc(row, 'Q010') }}
        </template>
      </el-table-column>
      <el-table-column
        label="11.为了提升公司会议效率和效果，您还有哪些好建议？"
        prop="Q011"
        min-width="330"
      >
        <template #default="{ row }">
          {{ getDesc(row, 'Q011') }}
        </template>
      </el-table-column>
    </el-table>
  </KeenCard>
</template>

<script setup lang="ts" name="meetingdetail">
  import { evaluateApi } from '@/api';

  const route = useRoute();
  const calendarId = route.query.id;
  const meetingInfo = ref({});
  const listData = ref([]);
  const queryDetail = async () => {
    const res = await evaluateApi.luteosEvaluateQueryEvaluateDetail({
      calendarId,
      type: 0,
    });
    meetingInfo.value = res || {};
    listData.value = res.userEvaluateBeanList || [];
  };
  if (calendarId) {
    queryDetail();
  }
  const getHms = (time) => {
    if (!time) {
      return '';
    }
    const date = new Date(time);

    // 使用 getHours, getMinutes 和 getSeconds 方法获取时分秒
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // 创建一个函数来在数值小于10时在前面添加"0"
    function formatTime(i) {
      if (i < 10) {
        i = `0${i}`;
      }
      return i;
    }

    // 使用formatTime函数对时分秒进行格式化
    hours = formatTime(hours);
    minutes = formatTime(minutes);

    // 将时分秒组合成一个字符串
    return `${hours}:${minutes}`;
  };

  const getDesc = (row, key) => {
    return row.evaluateResult[key] || '--';
  };
</script>

<style scoped lang="scss">
  :deep(.el-form-item__label) {
    font-weight: bold;
  }
  .format-txt {
    white-space: pre-line;
    line-height: 20px;
    margin-top: 15px;
  }
</style>
