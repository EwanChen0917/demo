<template>
  <div class="point-desc">
    <div class="point-desc--title">
      {{ `${pageType === '全链路首页' ? '' : '经营'}指标数据说明` }}
    </div>
    <el-table :data="data" row-key="metric" :max-height="600" border>
      <el-table-column width="136" prop="metric" label="指标" />
      <el-table-column min-width="260" prop="metricDefinition" label="指标定义" />
      <el-table-column width="260" prop="dataSource" label="数据来源" />
      <el-table-column width="260" prop="updateFreq" label="数据更新频次" />
      <el-table-column width="140" prop="remark" label="备注" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { biApi, BiContracts } from '@/api/';

  const props = defineProps<{
    pageType: string;
  }>();

  const data = ref<BiContracts.MetricDefinitionBean[]>();

  biApi.biCommonQueryMetric({ page: props.pageType }).then((res) => {
    data.value = res.metricDefinitionList || [];
  });
</script>

<style lang="scss" scoped>
  .point-desc {
    width: 1200px;
    padding: 16px;
    .point-desc--title {
      color: var(---N9, #1f1f1f);

      /* 常规/Medium 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
      margin-bottom: 10px;
    }
  }
</style>
