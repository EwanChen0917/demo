<template>
  <detailCard title="操作日志" class="card-wrap operate-log">
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

<script setup lang="ts">
  import { metaApi } from '@/api/index';

  const props = defineProps<{
    userCode: String;
  }>();

  const operateLogs = ref([]);
  const showOperateLogs = ref([]);
  const queryOperateLogs = () => {
    metaApi
      .luteosMetaQueryMetaOperateLog({
        userCode: props.userCode,
      })
      .then((res: any) => {
        operateLogs.value = res.logList || [];
        showOperateLogs.value = operateLogs.value.slice(0, 10);
      });
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
