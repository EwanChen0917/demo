<template>
  <div class="card card-flush py-4">
    <div class="card-body">
      <KeenChart id="device-detail-chart" :options="options" ref="chart" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from 'apexcharts';

  const props = defineProps<{
    timeList: string[];
    dataList: string[];
    name: string;
  }>();

  const chart = ref(null);

  const labelColor = window.KTUtil.getCssVariableValue('--bs-gray-500');
  const borderColor = window.KTUtil.getCssVariableValue('--bs-border-dashed-color');
  const baseColor = window.KTUtil.getCssVariableValue('--bs-primary');
  const lightColor = window.KTUtil.getCssVariableValue('--bs-primary');

  const dataList = computed(() => props.dataList);
  const timeList = computed(() => props.timeList);

  const options = reactive<ApexOptions>({
    series: [
      {
        name: props.name,
        data: dataList,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      toolbar: {
        show: false,
      },
      height: 400,
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
      categories: timeList,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6,
      labels: {
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
