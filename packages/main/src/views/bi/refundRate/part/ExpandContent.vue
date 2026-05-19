<template>
  <div class="expand-content">
    <section class="reason-part">
      <div class="part__title">退款原因分布（亚马逊）</div>
      <div :gutter="24" class="reason-row">
        <div
          :span="12"
          v-for="(reason, index) in data.refundReasons"
          :key="index"
          class="reason-item"
        >
          <span>{{ reason.refundReason }}</span>
          <el-Progress
            :percentage="reason.orderCountRate * 100"
            :format="
              () =>
                ` ${reason.orderCount} / ${reason.orderCountRate.toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}`
            "
          />
        </div>
      </div>
    </section>
    <section class="tags-part">
      <div class="part__title tags-title">
        <span>评论标签分布（亚马逊）</span>
        <div class="legend-section">
          <div class="legend-item">
            <i class="color-icon positive"></i>
            <span>正向</span>
          </div>
          <div class="legend-item">
            <i class="color-icon negative"></i>
            <span>负向</span>
          </div>
        </div>
      </div>
      <div class="tags-chart" ref="tagsChartContainer"></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts/core';
  import { useTemplateRef } from 'vue';

  const props = defineProps<{
    data: {
      refundReasons: Array<{
        refundReason: string;
        orderCount: number;
        orderCountRate: number;
      }>;
      tags: Array<{
        tag: string;
        positiveCount: number;
        negativeCount: number;
      }>;
    };
  }>();

  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
    }
    const option = {
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        show: false,
      },
      grid: {
        height: 'auto',
        top: '0',
        left: '24px',
        right: '32px',
        bottom: '0',
        containLabel: true,
      },
      color: ['#02B96B', '#F53F3F'],
      yAxis: {
        type: 'category',
        inverse: true,
        position: 'left',
        offset: 10,
        data: props.data?.tags?.map((item) => item.tag) || [],
        nameTextStyle: {
          show: false,
          fontSize: 12,
          fontWeight: 400,
          color: '#000',
          align: 'right',
        },
        axisLabel: {
          show: true,
          color: '#999',
          fontSize: 12,
          fontWeight: 400,
        },
        axisLine: {
          show: true,
          onZero: false, // 防止自动调整位置
          lineStyle: {
            color: '#E6E6E6',
          }, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#ededed',
            type: 'dashed',
          },
        },
      },
      xAxis: {
        type: 'value',
        boundaryGap: ['1%', '3%'],
        axisLabel: {
          show: false, // 隐藏x轴刻度标签
        },
        axisLine: {
          show: true, // 隐藏y轴刻度线
          lineStyle: {
            color: '#ededed',
            // type: 'dashed',
          },
        },
        axisTick: {
          show: false, // 隐藏y轴刻度线
        },
        splitLine: {
          show: false, // 隐藏x轴分割线
        },
      },
      series: [
        {
          name: '正向',
          type: 'bar',
          stack: 'Total',
          data: props.data.tags.map((item) => -item.positiveCount) || [],
          barWidth: 16,
          label: {
            show: true,
            position: 'left',
            align: 'right',
            fontFamily: 'DIN',
            formatter: (params: any) => {
              return `{value|${-params.value}}`;
            },
            rich: {
              value: {
                color: '#02B96B',
                fontSize: 12,
                fontWeight: 400,
              },
            },
          },
          tooltip: {
            valueFormatter(value) {
              return -value;
            },
          },
        },
        {
          name: '负向',
          type: 'bar',
          stack: 'Total',
          barWidth: 16,
          label: {
            show: true,
            position: 'right',
            fontFamily: 'DIN',
            formatter: (params: any) => {
              return `{value|${params.value || ''}}`;
            },
            rich: {
              value: {
                color: '#F53F3F',
                fontSize: 12,
                fontWeight: 400,
              },
            },
          },
          data: props.data.tags.map((item) => +item.negativeCount) || [],
        },
      ],
    };
    chart.setOption(option);
  };
  const chartContainer = useTemplateRef<HTMLElement>('tagsChartContainer');
  const init = () => {
    initEcharts(chartContainer.value! as HTMLElement);
  };
  onMounted(() => {
    if (chartContainer.value && props.data.tags?.length) {
      init();
    }
  });
</script>

<style lang="scss" scoped>
  .expand-content {
    overflow: hidden;
    ---tag-count: v-bind(props.data.tags.length);
    .reason-part,
    .tags-part {
      padding: 10px 20px 16px;
    }
    .part__title {
      color: var(---N9, #1f1f1f);

      /* 常规/Medium 13 */
      font-family: 'PingFang';
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 169.231% */
      margin-bottom: 12px;
    }
    .reason-row {
      width: 630px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 30px;
      row-gap: 4px;
    }
    .reason-item {
      padding: 5px 0;
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 8px;
      color: var(---N9, #1f1f1f);

      /* 较弱/Regular 12 */
      font-family: 'PingFang regular', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      :deep(.el-progress-bar) {
        width: 90px;
      }
      :deep(.el-progress__text) {
        text-align: left;
        margin-left: 8px;
        width: 72px;
        font-family: 'PingFang regular', sans-serif;
        font-size: 12px !important;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
    }
    .tags-chart {
      width: 703px;
      height: calc(var(---tag-count, 1) * 35px);
      margin: 0 auto;
    }
    .tags-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .legend-section {
        display: flex;
        align-items: center;
        column-gap: 22px;
        color: var(---N6, #999);

        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
      .legend-item {
        display: flex;
        align-items: center;
        column-gap: 8px;
      }
      .color-icon {
        display: inline-block;
        width: 12px;
        height: 7px;
        border-radius: 2px;
      }
      .positive {
        background-color: #02b96b;
      }
      .negative {
        background-color: #f53f3f;
      }
    }
  }
</style>
