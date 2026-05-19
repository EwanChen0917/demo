<template>
  <div class="execution-overview">
    <div class="overview-grid">
      <div class="task-card">
        <div class="task-card-header">
          <div class="task-card-title">任务执行概览</div>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
            class="w-160"
            @change="fetchTaskOverview"
            :clearable="false"
          />
        </div>
        <div class="task-metrics">
          <div class="task-metric-item">
            <div class="metric-title">任务执行成功率</div>
            <div class="metric-value">{{ taskOverview.successRate.toFixed(2) }}%</div>
            <div class="metric-sub">
              <el-icon class="warn-icon"><WarningFilled /></el-icon>
              失败任务
              <span class="metric-sub-strong">{{ taskOverview.abnormalTaskCount }}</span>
              个
            </div>
          </div>
          <div class="task-metric-item">
            <div class="metric-title">任务执行次数</div>
            <div class="metric-value">{{ taskOverview.taskExecutionCount.toLocaleString() }}</div>
            <div class="metric-sub">
              较昨日
              <span :class="deltaInfo.class">{{ deltaInfo.text }}</span>
            </div>
          </div>
        </div>
        <div class="mini-chart">
          <KeenChart id="smr-exec-trend" :options="trendOptions" :height="150" />
        </div>
      </div>

      <div class="chart-card">
        <div class="metric-title">设备在线数</div>
        <div class="metric-value metric-value--device">
          {{ deviceOverview.deviceOnlineCount }}
          <span class="metric-unit">/{{ deviceOverview.deviceTotalCount }}</span>
        </div>
        <div class="metric-sub metric-sub--device">
          <el-icon class="warn-icon"><WarningFilled /></el-icon>
          离线设备
          <span class="metric-sub-strong">{{ deviceOverview.deviceOfflineCount }}</span>
          个
        </div>
        <div class="chart-title">设备在线情况</div>
        <div class="mini-chart">
          <KeenChart id="smr-device-online" :options="deviceOnlineOptions" :height="150" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ExecutionOverview">
  import type { ApexOptions } from 'apexcharts';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import { WarningFilled } from '@element-plus/icons-vue';
  import { getExecutionLogApi } from '../api';
  import type { DeviceOnlineStat } from '../types';

  const api = getExecutionLogApi();
  const today = dayjs().format('YYYY-MM-DD');

  const date = ref(today);
  const taskOverview = reactive({
    successRate: 0,
    abnormalTaskCount: 0,
    taskExecutionCount: 0,
    taskExecutionDeltaRate: 0,
    trend: [] as { hour: string; count: number }[],
  });
  const deviceOverview = reactive({
    deviceOnlineCount: 0,
    deviceTotalCount: 0,
    deviceOfflineCount: 0,
    deviceOnlineRate: 0,
    deviceOnlineStats: [] as DeviceOnlineStat[],
  });

  const deltaInfo = computed(() => {
    const rate = taskOverview.taskExecutionDeltaRate ?? 0;
    if (rate > 0) return { class: 'delta-up', text: `▲ ${rate}%` };
    if (rate < 0) return { class: 'delta-down', text: `▼ ${Math.abs(rate)}%` };
    return { class: 'delta-flat', text: '-' };
  });

  const trendOptions = computed<ApexOptions>(() => {
    const categories = taskOverview.trend.map((x) => x.hour);
    const series = [
      {
        name: '次数',
        data: taskOverview.trend.map((x) => x.count),
      },
    ];

    return {
      chart: {
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
        parentHeightOffset: 0,
        offsetY: -10,
      },
      stroke: { curve: 'smooth', width: 2 },
      colors: ['#02b96b'],
      markers: { size: 3 },
      dataLabels: { enabled: false },
      xaxis: {
        categories,
        labels: {
          style: { colors: '#999', fontSize: '10px' },
          offsetY: -5,
        },
        axisBorder: {
          show: true,
          color: 'rgba(0,0,0,0.06)',
          height: 1,
        },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          style: { colors: '#999' },
          formatter: (val) => val.toFixed(0),
        },
      },
      tooltip: { theme: 'light' },
      grid: {
        borderColor: 'rgba(0,0,0,0.06)',
        padding: {
          top: 0,
          right: 0,
          bottom: -10,
          left: 10,
        },
      },
      series: series as any,
    };
  });

  const deviceOnlineOptions = computed<ApexOptions>(() => {
    const categories = deviceOverview.deviceOnlineStats.map((x) => x.deviceTypeName);

    return {
      chart: {
        type: 'line',
        stacked: false,
        toolbar: { show: false },
        fontFamily: 'inherit',
        parentHeightOffset: 0,
        offsetY: -10,
      },
      colors: ['#02b96b', '#d9534f', '#fec006'],
      stroke: {
        width: [0, 0, 2],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 4,
        },
      },
      markers: {
        size: [0, 0, 3],
        strokeWidth: 2,
        hover: { size: 5 },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories,
        labels: {
          style: { colors: '#999', fontSize: '10px' },
          offsetY: -5,
        },
        axisBorder: {
          show: true,
          color: 'rgba(0,0,0,0.06)',
          height: 1,
        },
        axisTicks: { show: false },
      },
      yaxis: [
        {
          min: 0,
          tickAmount: 3,
          forceNiceScale: true,
          labels: {
            style: { colors: '#999' },
            formatter: (val: any) => val.toFixed(0),
          },
        },
        {
          seriesName: '设备数',
          show: false,
        },
        {
          opposite: true,
          min: 0,
          max: 100,
          tickAmount: 3,
          labels: {
            style: { colors: '#999' },
            formatter: (val: any) => val.toFixed(0) + '%',
          },
        },
      ],
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -5,
      },
      tooltip: {
        theme: 'light',
        shared: true,
        intersect: false,
        custom: ({ dataPointIndex }: any) => {
          const stat = deviceOverview.deviceOnlineStats[dataPointIndex];
          if (!stat) return '';
          return `
            <div style="padding: 10px; font-size: 12px; line-height: 1.8;">
              <div style="font-weight: 600; margin-bottom: 4px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 4px;">${stat.deviceTypeName}</div>
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span style="color: #666;">设备数:</span>
                <span style="font-weight: 600;">${stat.deviceCount}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span style="color: #666;">设备在线数:</span>
                <span style="color: #02b96b; font-weight: 600;">${stat.onlineCount}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span style="color: #666;">设备在线率:</span>
                <span style="color: #02b96b; font-weight: 600;">${stat.onlineRate}%</span>
              </div>
            </div>
          `;
        },
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.06)',
        padding: {
          top: 0,
          right: 0,
          bottom: -10,
          left: 10,
        },
      },
      series: [
        {
          name: '设备数',
          type: 'bar',
          data: deviceOverview.deviceOnlineStats.map((x) => x.deviceCount),
        },
        {
          name: '设备在线数',
          type: 'bar',
          data: deviceOverview.deviceOnlineStats.map((x) => x.onlineCount),
        },
        {
          name: '设备在线率',
          type: 'line',
          data: deviceOverview.deviceOnlineStats.map((x) => x.onlineRate),
        },
      ] as any,
    };
  });

  const fetchTaskOverview = async () => {
    try {
      const res = await api.queryExecutionOverview({ date: date.value });
      taskOverview.successRate = res.successRate ?? 0;
      taskOverview.abnormalTaskCount = res.abnormalTaskCount ?? 0;
      taskOverview.taskExecutionCount = res.taskExecutionCount ?? 0;
      taskOverview.taskExecutionDeltaRate = res.taskExecutionDeltaRate ?? 0;
      taskOverview.trend = res.trend ?? [];
    } catch (error: any) {
      ElMessage.error(error?.message || '查询执行概览失败');
    }
  };

  const fetchDeviceOverview = async () => {
    try {
      const res = await api.queryExecutionOverview({ date: today });
      deviceOverview.deviceOnlineCount = res.deviceOnlineCount ?? 0;
      deviceOverview.deviceTotalCount = res.deviceTotalCount ?? 0;
      deviceOverview.deviceOfflineCount = res.deviceOfflineCount ?? 0;
      deviceOverview.deviceOnlineRate = res.deviceOnlineRate ?? 0;
      deviceOverview.deviceOnlineStats = res.deviceOnlineStats ?? [];
    } catch (error: any) {
      ElMessage.error(error?.message || '查询执行概览失败');
    }
  };

  fetchTaskOverview();
  fetchDeviceOverview();
</script>

<style lang="scss" scoped>
  .execution-overview {
    width: 100%;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: 1.4fr 1.3fr;
    gap: 12px;
    align-items: stretch;
  }

  .task-card {
    border-radius: 12px;
    padding: 10px 16px 6px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }

  .task-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .task-card-title {
    font-size: 13px;
    color: #333;
    font-weight: 600;
  }

  .task-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .task-metric-item {
    min-width: 0;
  }

  .metric-title {
    font-size: 12px;
    color: #666;
  }

  .metric-value {
    margin-top: 6px;
    font-weight: 700;
    font-size: 26px;
    color: #111;
  }

  .metric-unit {
    font-size: 16px;
    color: #999;
    font-weight: 500;
    margin-left: 2px;
  }

  .metric-sub {
    margin-top: 6px;
    font-size: 12px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .metric-sub-strong {
    font-weight: 600;
    color: #333;
  }

  .warn-icon {
    font-size: 12px;
    color: #e6a23c;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(230, 162, 60, 0.16);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .delta-up {
    color: #d9534f;
    font-weight: 600;
  }

  .delta-down {
    color: #02b96b;
    font-weight: 600;
  }

  .delta-flat {
    color: #999;
    font-weight: 600;
  }

  .chart-card {
    border-radius: 12px;
    padding: 10px 16px 6px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }

  .metric-value--device {
    margin-top: 4px;
    font-size: 22px;
  }

  .metric-sub--device {
    margin-top: 6px;
    margin-bottom: 10px;
  }

  .chart-title {
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
  }

  .mini-chart {
    margin-top: auto;
  }

  .w-160 {
    width: 160px;
  }
</style>
