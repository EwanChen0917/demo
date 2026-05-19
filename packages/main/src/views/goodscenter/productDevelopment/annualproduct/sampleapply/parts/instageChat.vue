<template>
  <div id="kt_project_overview_graph" class="card-rounded-bottom" style="height: 445px"></div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    seriesData: any;
    xaxisData?: any;
  }>();
  const initGraph = function () {
    const element: any = document.getElementById('kt_project_overview_graph');
    if (!element) {
      return;
    }
    element.innerHTML = '';
    const height = parseInt(element.style.height) || 400;

    const options = {
      series: props.seriesData,
      chart: {
        type: 'area',
        height,
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
        type: 'solid',
        opacity: 1,
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: ['#7039e4'],
      },
      xaxis: {
        categories: props.xaxisData,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          rotate: 30,
          style: {
            colors: '#A1A5B7',
            fontSize: '12px',
          },
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: '#3E97FF',
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
        max: 100,
        labels: {
          style: {
            colors: '#A1A5B7',
            fontSize: '12px',
          },
          formatter: function formatter(val) {
            // 9以下，整数多出小数点问题
            if (window.isNaN(val)) {
              return val;
            }
            return val.toFixed(0);
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
        y: {
          formatter(val) {
            return `${val}%`;
          },
        },
      },
      colors: ['#7039e412'],
      grid: {
        borderColor: '#F4F4F4',
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        // size: 5,
        colors: ['#7039e4'],
        strokeColor: ['#7039e4'],
        strokeWidth: 3,
      },
    };

    const chart = new window.ApexCharts(element, options);
    chart.render();
  };
  if (props.seriesData.length > 0) {
    nextTick(() => {
      initGraph();
    });
  }
  watch(
    props,
    () => {
      if (props.seriesData.length > 0) {
        nextTick(() => {
          initGraph();
        });
      }
    },
    { immediate: true, deep: true }
  );

  /* watchEffect(() => {
console.log('props', props);
nextTick(() => {
initGraph();
});
}); */
</script>

<style scoped lang="scss"></style>
