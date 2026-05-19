<template>
  <div class="card card-flush py-4">
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title gap-5">
        <el-select v-model="type">
          <el-option value="day" label="按日统计" />
          <el-option value="week" label="按7日统计" />
          <el-option value="month" label="按月统计" />
        </el-select>
        <el-date-picker
          class="w-100"
          v-model="time"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
          :popper-options="{ placement: 'bottom-start' }"
        />
      </div>
    </div>
    <div class="card-body">
      <div class="my-4">合计次数：10次</div>
      <KeenChart id="device-detail-chart" :options="options" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from 'apexcharts';
  import { deviceApi, DeviceApi } from '@/api/index';

  const props = defineProps<{
    deviceCode: string;
    uid: string;
  }>();
  const type = ref<'day' | 'week' | 'month'>('day');
  const time = ref();

  const labelColor = window.KTUtil.getCssVariableValue('--bs-gray-500');
  const borderColor = window.KTUtil.getCssVariableValue('--bs-border-dashed-color');
  const baseColor = window.KTUtil.getCssVariableValue('--bs-primary');
  const lightColor = window.KTUtil.getCssVariableValue('--bs-primary');

  const options = reactive<ApexOptions>({
    series: [
      {
        name: 'Sales',
        data: [
          34.5, 34.5, 35, 35, 35.5, 35.5, 35, 35, 35.5, 35.5, 35, 35, 34.5, 34.5, 35, 35, 35.5,
          35.5, 35,
        ],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 80, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: [
        '',
        'Apr 02',
        'Apr 03',
        'Apr 04',
        'Apr 05',
        'Apr 06',
        'Apr 07',
        'Apr 08',
        'Apr 09',
        'Apr 10',
        'Apr 11',
        'Apr 12',
        'Apr 13',
        'Apr 14',
        'Apr 17',
        'Apr 18',
        'Apr 19',
        'Apr 21',
        '',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6,
      labels: {
        rotate: 0,
        rotateAlways: true,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      max: 36.3,
      min: 33,
      tickAmount: 6,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
    },
    colors: [lightColor],
    grid: {
      borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColor: baseColor,
      strokeWidth: 3,
    },
  });
</script>
