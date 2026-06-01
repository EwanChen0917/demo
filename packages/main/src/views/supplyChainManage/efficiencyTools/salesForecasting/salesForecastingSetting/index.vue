<template>
  <el-tabs>
    <el-tab-pane label="预测策略">
      <ForecastingStrategy />
    </el-tab-pane>
    <el-tab-pane label="活动增量预测">
      <IncrementalPrediction />
    </el-tab-pane>
    <el-tab-pane label="自动打标">
      <AutoMark />
    </el-tab-pane>
    <el-tab-pane label="标签管理">
      <LabelManage />
    </el-tab-pane>
    <el-tab-pane label="审核规则">
      <AuditRule />
    </el-tab-pane>
    <el-tab-pane label="预测商品匹配">
      <ProductMatch />
    </el-tab-pane>
    <el-tab-pane label="站点映射">
      <SiteRelation />
    </el-tab-pane>
    <el-tab-pane label="销量汇总设置">
      <SalesSummary />
    </el-tab-pane>
    <el-tab-pane label="客户汇总预测">
      <Customer />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="salesForecastingSetting">
  import ForecastingStrategy from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/forecastingStrategy/index.vue';
  import IncrementalPrediction from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/incrementalPrediction/index.vue';
  import AutoMark from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/autoMark/index.vue';
  import LabelManage from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/labelManage/index.vue';
  import ProductMatch from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/productMatch/index.vue';
  import SiteRelation from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/siteRelation/index.vue';
  import AuditRule from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/auditRule/index.vue';
  import SalesSummary from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/salesSummary/index.vue';
  import Customer from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/customer/index.vue';
</script>

<style scoped lang="scss"></style>
