<template>
  <div class="home-wrapper">
    <searchLine @reset-search="handleResetSearch" @refresh="handleSearch">
      <template #search>
        <el-date-picker
          v-model="yearModel"
          type="year"
          value-format="YYYY"
          placeholder="请选择年份"
          style="width: 240px"
        />
      </template>
    </searchLine>
    <div class="content-wrapper">
      <el-scrollbar class="content-scrollbar">
        <BaseOrderEcharts style="margin-bottom: 20px" ref="baseOrderEchartsRef" />
        <CustomRegionEcharts style="margin-bottom: 20px" ref="customRegionEchartsRef" />
        <CustomRegionEcharts
          type="orderType"
          style="margin-bottom: 20px"
          ref="customRegionEchartsRef2"
        />
        <ExceptionEcharts style="margin-bottom: 20px" ref="exceptionEchartsRef" />
        <ExceptionEcharts
          type="typeException"
          style="margin-bottom: 20px"
          ref="exceptionEchartsRef2"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts" name="orderFulfillmentVisualizationDashboard">
  import { computed, provide, ref, onMounted, useTemplateRef } from 'vue';
  import SearchLine from '../components/searchLine.vue';
  import BaseOrderEcharts from '../echartsInstance/baseOrderEcharts/index.vue';
  import CustomRegionEcharts from '../echartsInstance/customRegionEcharts/index.vue';
  import ExceptionEcharts from '../echartsInstance/exceptionEcharts/index.vue';
  import { fulfillmentDashboardYearKey, channelListKey } from '../injectionKeys';
  import { baseUseVisualizationOptions } from '../hooks/baseUseVisualizationOptions';

  const { channelList, getChannelList } = baseUseVisualizationOptions();
  const year = ref(new Date().getFullYear());
  provide(fulfillmentDashboardYearKey, year);
  provide(channelListKey, channelList);
  const baseOrderEchartsRef = useTemplateRef('baseOrderEchartsRef');
  const customRegionEchartsRef = useTemplateRef('customRegionEchartsRef');
  const customRegionEchartsRef2 = useTemplateRef('customRegionEchartsRef2');
  const exceptionEchartsRef = useTemplateRef('exceptionEchartsRef');
  const exceptionEchartsRef2 = useTemplateRef('exceptionEchartsRef2');
  const yearModel = computed({
    get: () => String(year.value),
    set: (v: string | null) => {
      if (v) {
        const n = Number.parseInt(v, 10);
        if (!Number.isNaN(n)) year.value = n;
      }
    },
  });

  const handleSearch = () => {
    baseOrderEchartsRef.value?.getData();
    customRegionEchartsRef.value?.getData();
    customRegionEchartsRef2.value?.getData();
    exceptionEchartsRef.value?.getData();
    exceptionEchartsRef2.value?.getData();
  };
  const handleResetSearch = () => {
    yearModel.value = String(new Date().getFullYear());
  };

  onMounted(() => {
    getChannelList();
  });
</script>

<style scoped lang="scss">
  .home-wrapper {
    min-width: 1200px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .content-scrollbar {
    flex: 1 1 0;
    padding: 16px;
  }
</style>
