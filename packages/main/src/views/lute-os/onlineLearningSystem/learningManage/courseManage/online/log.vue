<template>
  <detailCard title="操作日志" class="card-wrap operate-log">
    <div style="margin-bottom: 20px">
      <el-date-picker
        v-model="dataRange"
        type="datetimerange"
        size="normal"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="queryOperateLogs"
        clearable
      />
      <el-button style="margin-left: 12px" type="primary" size="default" @click="queryOperateLogs">
        搜索
      </el-button>
    </div>
    <div v-for="(item, index) in showOperateLogs" :key="index">
      <span class="primary-color">{{ item.operationTime + ' ' }}</span>
      <span class="primary-color fw-bold">{{ item.operatorName + ' ' }}</span>
      <span class="fs-7 text-muted">{{ item.operationContent + ' ' }}</span>
      <div class="separator separator-dashed my-3"></div>
    </div>
    <div class="pagination" v-if="operateLogs.length">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="operateLogs.length"
        @current-change="currentChange"
        @prev-click="currentChange"
        @next-click="currentChange"
      />
    </div>
    <div v-else class="no-data">暂无数据</div>
  </detailCard>
</template>

<script setup lang="ts" name="onlineCourseLog">
  import { platformApi } from '@/api/index';

  const route = useRoute();
  const operateLogs = ref([]);
  const showOperateLogs = ref([]);
  const dataRange = ref([]);
  const queryOperateLogs = () => {
    const params = {
      itemCode: route.query.courseCode,
      itemType: 'study_course',
      moduleType: 'study_course',
      pageSize: 100,
    };
    if (dataRange.value && dataRange.value.length === 2) {
      params.startTime = dataRange.value[0] || '';
      params.endTime = dataRange.value[1] || '';
    }
    platformApi.platformQueryLog(params).then((res: any) => {
      operateLogs.value = res.logList || [];
      showOperateLogs.value = operateLogs.value.slice(0, 10);
    });
    // studyApi.luteosStudyQueryLog(params).then((res: any) => {
    //   operateLogs.value = res.logList || [];
    //   showOperateLogs.value = operateLogs.value.slice(0, 10);
    // });
  };
  const currentChange = (val) => {
    showOperateLogs.value = operateLogs.value.slice((val - 1) * 10, val * 10);
  };

  onMounted(() => {
    queryOperateLogs();
  });
</script>

<style scoped lang="scss">
  .no-data {
    margin-left: 12px;
  }
</style>
