<template>
  <DashboardCard style="position: relative">
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
        <pieCharts ref="pannelChartsRef" :data="pieData" />
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
  import PieCharts from './pieCharts.vue';
  import { fulfillmentDashboardYearKey, channelListKey } from '../../injectionKeys';

  const dashboardYear = inject(fulfillmentDashboardYearKey, ref(new Date().getFullYear()));
  const channelList = inject(channelListKey, ref([]));
  type distributionType = 'orderRegion' | 'orderType';
  const props = withDefaults(
    defineProps<{
      type?: distributionType;
    }>(),
    {
      type: 'orderRegion',
    }
  );
  const title = computed(() => {
    return props.type === 'orderRegion' ? '客户大区订单状态分布' : '客户类型订单状态分布';
  });
  const listData = ref();
  const channel = ref('');
  const pieData = computed(() => {
    if (!Array.isArray(listData.value) || listData.value.length === 0) return [];
    return listData.value.map((item) => {
      const dimension = item?.dimension || [];
      const total = dimension.reduce((acc, cur) => {
        return acc + (cur?.qty ?? 0);
      }, 0);
      return {
        name: item?.status ?? '未知',
        value: total,
      };
    });
  });
  const loading = ref(false);
  const getData = async () => {
    try {
      if (loading.value) return;
      loading.value = true;
      let res: any = null;
      if (props.type === 'orderRegion') {
        res = await omsApi.omsFulfillmentBiDashboardDistributionStatusRegion({
          year: dashboardYear.value,
          orderChannel: channel.value,
        });
      } else {
        res = await omsApi.omsFulfillmentBiDashboardDistributionStatusCustomerType({
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
  onMounted(() => {
    // getData();
  });
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
