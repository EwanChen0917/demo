<template>
  <div class="chart-switch" :class="`is-${view}`">
    <div class="chart-switch__header">
      <span class="chart-switch__bar"></span>
      <span class="chart-switch__title">{{ title }}</span>
      <img
        v-if="!pieOnly"
        class="chart-switch__toggle"
        :src="toggleIcon"
        alt=""
        @click="toggleView"
      />
    </div>
    <div class="chart-switch__body">
      <div ref="chartRef" class="chart-switch__plot"></div>
      <div v-if="view === 'pie'" class="chart-switch__center">
        <span class="chart-switch__center-label">总计</span>
        <span class="chart-switch__center-value">{{ total }}</span>
      </div>
      <div
        v-if="view === 'pie'"
        class="chart-switch__legend"
        :class="{ 'is-compact': legendItems.length <= 2 }"
      >
        <div v-for="item in legendItems" :key="item.name" class="chart-switch__legend-item">
          <span class="chart-switch__legend-dot" :style="{ backgroundColor: item.color }"></span>
          <span class="chart-switch__legend-text">
            {{ item.name }}：
            <span class="chart-switch__legend-value">{{ item.value }}</span>
            <span class="chart-switch__legend-separator">｜</span>
            <span class="chart-switch__legend-value">{{ item.percent }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { getTooltipBase } from '../../utils';

  const chartPieIcon = new URL('../../assets/svgs/icon-chart-pie.svg', import.meta.url).href;
  const chartBarIcon = new URL('../../assets/svgs/icon-chart-bar.svg', import.meta.url).href;

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    showTop10: {
      type: Boolean,
      default: true,
    },
    pieOnly: {
      type: Boolean,
      default: false,
    },
  });

  const chartRef = ref(null);
  let chartInstance = null;
  const colorMap = {
    P0: '#f53f3f',
    P1: '#ff9f22',
    P2: '#02b96b',
    P3: '#258dff',
    社媒: '#258dff',
    新闻: '#02b96b',
  };
  const defaultColors = ['#f53f3f', '#ff9f22', '#02b96b', '#258dff'];
  const processData = (data) => {
    const hasOthers = data.some((item) => {
      const name = String(item?.name ?? '')
        .trim()
        .toLowerCase();
      return name === 'others' || name === '其他';
    });
    if (!props.showTop10 || data.length <= 10 || hasOthers) return data;

    const sorted = [...data].sort((a, b) => b.value - a.value);
    const top10 = sorted.slice(0, 10);
    const others = sorted.slice(10);
    const othersTotal = others.reduce((sum, item) => sum + item.value, 0);

    return [...top10, { name: '其他', value: othersTotal }];
  };
  const processedData = computed(() => processData(props.data));
  const total = computed(() => {
    return processedData.value.reduce((sum, item) => sum + (item.value || 0), 0);
  });
  const view = ref('pie');
  const toggleIcon = computed(() => (view.value === 'pie' ? chartBarIcon : chartPieIcon));
  const legendItems = computed(() => {
    return processedData.value.map((item, index) => {
      const value = item.value || 0;
      const percent = total.value ? `${((value / total.value) * 100).toFixed(1)}%` : '0%';
      return {
        name: item.name,
        value,
        percent,
        color: colorMap[item.name] || defaultColors[index % defaultColors.length],
      };
    });
  });

  const toggleView = () => {
    if (props.pieOnly) return;
    view.value = view.value === 'pie' ? 'bar' : 'pie';
    updateChart();
  };

  const getPieOption = (data) => {
    const colors = legendItems.value.map((item) => item.color);
    return {
      tooltip: {
        trigger: 'item',
        ...getTooltipBase(),
        formatter: (params) => {
          const percent =
            params.data?.percent ??
            (params.data?.rate !== undefined && params.data?.rate !== null
              ? `${params.data.rate}%`
              : '');
          return `<div style="display:flex;flex-direction:column;gap:4px;">
            <div style="font-size:12px;line-height:20px;color:#666;">${props.title}</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="width:8px;height:8px;border-radius:50%;background:${
                params.color
              };display:inline-block;"></span>
              <span style="font-size:12px;line-height:20px;color:#666;">${params.name}</span>
              <span style="font-size:12px;line-height:20px;color:#666;">：</span>
              <span style="font-size:12px;line-height:20px;color:#1f1f1f;font-family:DIN, sans-serif;font-weight:500;">${
                params.value
              }</span>
              ${
                percent
                  ? `<span style="font-size:12px;line-height:20px;color:#999;font-family:DIN, sans-serif;font-weight:500;">${percent}</span>`
                  : ''
              }
            </div>
          </div>`;
        },
      },
      color: colors,
      series: [
        {
          type: 'pie',
          radius: ['60%', '80%'],
	          center: ['50%', '50%'],
	          avoidLabelOverlap: false,
	          itemStyle: {
	            borderRadius: 0,
	            borderColor: '#fff',
	            borderWidth: 2,
	          },
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: data.map((item, index) => ({
            ...item,
            percent:
              item.percent ??
              (item.rate !== undefined && item.rate !== null ? `${item.rate}%` : undefined),
            itemStyle: {
              color: colors[index],
            },
          })),
        },
      ],
    };
  };

  const getBarOption = (data) => {
    const colors = legendItems.value.map((item) => item.color);
    return {
      tooltip: {
        trigger: 'item',
        ...getTooltipBase(),
        formatter: (params) => {
          return `<div style="display:flex;flex-direction:column;gap:4px;">
            <div style="font-size:12px;line-height:20px;color:#666;">${props.title}</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="width:8px;height:8px;border-radius:50%;background:${params.color};display:inline-block;"></span>
              <span style="font-size:12px;line-height:20px;color:#666;">${params.name}</span>
              <span style="font-size:12px;line-height:20px;color:#666;">：</span>
              <span style="font-size:12px;line-height:20px;color:#1f1f1f;font-family:DIN, sans-serif;font-weight:500;">${params.value}</span>
            </div>
          </div>`;
        },
      },
      grid: {
        top: 16,
        left: 24,
        right: 16,
        bottom: 24,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.name),
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#e7e9e8' } },
        axisLabel: { color: '#8a8f8d', fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f4f5f5' } },
        axisLabel: { color: '#8a8f8d', fontSize: 12 },
      },
      series: [
        {
          type: 'bar',
          data: data.map((item, index) => ({
            value: item.value,
            itemStyle: {
              color: colors[index % colors.length],
              borderRadius: [4, 4, 0, 0],
            },
          })),
          barWidth: 22,
        },
      ],
    };
  };

  const updateChart = () => {
    if (!chartInstance) return;

    const option =
      view.value === 'pie'
        ? getPieOption(processedData.value, {
            radius: ['60%', '80%'],
            center: ['50%', '50%'],
          })
        : getBarOption(processedData.value);
    chartInstance.setOption(option, true);
  };

  const handleResize = () => {
    chartInstance?.resize();
  };

  onMounted(() => {
    nextTick(() => {
      chartInstance = echarts.init(chartRef.value);
      updateChart();
      window.addEventListener('resize', handleResize);
    });
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    chartInstance?.dispose();
  });

  watch(
    () => props.data,
    () => {
      updateChart();
    },
    { deep: true }
  );
</script>

<style scoped lang="scss">
  .chart-switch {
    background: #fff;
    padding: 20px 16px 24px;
    border-radius: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .chart-switch__header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chart-switch__bar {
    width: 3px;
    height: 14px;
    border-radius: 15px;
    background: #02b96b;
  }

  .chart-switch__title {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #262626;
  }

  .chart-switch__toggle {
    margin-left: auto;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .chart-switch__body {
    position: relative;
    flex: 1;
    margin-top: 20px;
    min-height: 272px;
  }

  .chart-switch__plot {
    position: absolute;
    left: 50%;
    top: 12px;
    width: 196px;
    height: 196px;
    transform: translateX(-50%);
  }

  .chart-switch__center {
    position: absolute;
    left: 50%;
    top: 110px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    z-index: 1;
  }

  .chart-switch__center-label {
    font-size: 12px;
    line-height: 20px;
    color: #585a5a;
  }

  .chart-switch__center-value {
    font-size: 18px;
    line-height: 26px;
    color: #262626;
    font-weight: 500;
  }

  .chart-switch__legend {
    position: absolute;
    left: 0;
    top: 224px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 24px;
    justify-content: center;
  }

  .chart-switch__legend.is-compact {
    top: 252px;
  }

  .chart-switch.is-bar .chart-switch__body {
    min-height: 260px;
  }

  .chart-switch.is-bar .chart-switch__plot {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: none;
  }

  .chart-switch__legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 20px;
    color: #8a8f8d;
  }

  .chart-switch__legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .chart-switch__legend-text {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .chart-switch__legend-value {
    color: #262626;
  }

  .chart-switch__legend-separator {
    color: #e7e9e8;
  }
</style>
