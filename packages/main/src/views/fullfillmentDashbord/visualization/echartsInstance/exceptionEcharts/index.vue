<template>
  <DashboardCard :data-dashboard-year="dashboardYear" style="position: relative">
    <template #title>
      <span class="card-header_title">{{ title }}</span>
    </template>
    <template #actions>
      <div class="echarts-table-header">
        <el-form-item label="订单渠道">
          <el-select
            placeholder="请选择订单渠道"
            style="width: 200px"
            :options="channelList"
            clearable
            v-model="channel"
          />
        </el-form-item>
      </div>
    </template>
    <div class="base-order-echarts-wrapper" v-loading="loading">
      <div class="echarts-wrapper">
        <BarCharts :data="chartData" />
      </div>
      <div class="echarts-table">
        <div class="echarts-table-body">
          <crossTable :data="listData" />
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { omsApi } from '@/api';
  import CrossTable from '../../components/crossTable.vue';
  import BarCharts from './barCharts.vue';
  import { fulfillmentDashboardYearKey, channelListKey } from '../../injectionKeys';

  const channelList = inject(channelListKey, ref([]));
  const dashboardYear = inject(fulfillmentDashboardYearKey, ref(new Date().getFullYear()));
  const channel = ref('');
  const listData = ref();
  const chartData = computed(() => {
    if (!Array.isArray(listData.value) || listData.value.length === 0) return [];
    return listData.value.map((item) => {
      return {
        name: item.status,
        value: item.dimension.map((d) => {
          return {
            name: d.name,
            value: d.qty,
          };
        }),
      };
    });
  });
  type distributionType = 'regionException' | 'typeException';
  const props = withDefaults(
    defineProps<{
      type?: distributionType;
    }>(),
    {
      type: 'regionException',
    }
  );
  const title = computed(() => {
    return props.type === 'regionException' ? '客户大区异常订单分布' : '客户类型异常订单分布';
  });
  const loading = ref(false);
  const getData = async () => {
    try {
      if (loading.value) return;
      loading.value = true;
      let res: any = null;
      if (props.type === 'regionException') {
        res = await omsApi.omsFulfillmentBiDashboardDistributionExceptionRegion({
          year: dashboardYear.value,
          orderChannel: channel.value,
        });
      } else {
        res = await omsApi.omsFulfillmentBiDashboardDistributionExceptionCustomerType({
          year: dashboardYear.value,
          orderChannel: channel.value,
        });
      }
      if (!res) return;
      listData.value = res;
    } catch (error) {
      /** empty */
    } finally {
      loading.value = false;
    }
  };
  watch(
    dashboardYear,
    () => {
      getData();
    },
    { immediate: true }
  );
  watch(
    channel,
    () => {
      getData();
    },
    { immediate: true }
  );
  defineExpose({
    getData,
  });
</script>

<style scoped lang="scss">
  .base-order-echarts-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    border: 1px solid var(---N3, #ededed);
    border-radius: 10px;
  }
  .echarts-wrapper {
    flex: 1;
    width: 40%;
  }
  .echarts-table {
    max-width: 60%;
    min-width: 60%;
    min-height: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .echarts-table-body {
      flex: 1;
    }
  }
  .echarts-table-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    // align-items: center;
  }
  .echarts-table-body {
    flex: 1;
  }
</style>
