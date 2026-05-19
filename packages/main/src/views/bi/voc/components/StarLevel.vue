<template>
  <el-dialog
    v-model="visible"
    :title="spuName"
    append-to-body
    align-center
    class="star-level-dialog"
  >
    <div class="main-content" v-loading="loading">
      <BiCard title="星级评分">
        <vxe-table size="small" round :data="tableData">
          <vxe-column field="starLevel" title="星级">
            <template #default="{ row }">
              <el-rate :model-value="row.level" disabled size="small" />
            </template>
          </vxe-column>
          <vxe-column field="reviewCount" title="Review数量" align="right" class-name="font-din" />
          <vxe-column field="percentage" title="占比" align="right" class-name="font-din" />
        </vxe-table>
      </BiCard>
      <BiCard title="正负向标签">
        <template #ext>
          <IconTooltip content="此处标签来自亚马逊平台归类" iconClass="icon-xianxingtubiaoxunwen" />
        </template>
        <div class="tag-distribution" ref="tagDistribution"></div>
      </BiCard>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { biApi, BiContracts } from '@/api';
  import { useResizeObserver } from '@vueuse/core';
  import * as echarts from 'echarts';
  import { formatRate, formatNumberObj } from '../../utils/utils';
  import BiCard from '../../components/BiCard.vue';
  import IconTooltip from '../../components/IconTooltip.vue';

  const loading = ref(false);
  const visible = ref(false);
  const open = async (payload) => {
    visible.value = true;
    await initData(payload);
  };
  const close = () => {
    visible.value = false;
  };
  defineExpose({
    open,
    close,
  });

  const spuName = ref('');
  const tableData = ref<BiContracts.ReviewStarStatBean[]>([]);
  const chartData = ref<BiContracts.AfterSalesTagBean[]>([]);

  const searchParams = inject<Record<string, any>>('searchParams');
  const initData = async (payload) => {
    spuName.value = payload.spuName;
    loading.value = true;
    const res = await biApi
      .biVocProductRatingSpu({
        ...searchParams,
        startDate: payload.startDate,
        endDate: payload.endDate,
        spuCode: [payload.spuCode],
        level: 2,
        categoryLevel3Name: payload.categoryLevel3Name,
      })
      .finally(() => {
        loading.value = false;
      });
    tableData.value = new Array(5).fill(0).map((_, idx) => {
      const level = 5 - idx;
      const item = res.reviewStarStatBeanList.find((t) => t.starLevel?.startsWith(level));
      return {
        starLevel: `${level}星`,
        level,
        reviewCount: item ? item.reviewCount : 0,
        percentage: item ? formatRate(item.percentage, { maximumFractionDigits: 2 }) : '0%',
      };
    });
    chartData.value = res.tags || [];
    initTagDistribution();
  };

  const tagDistributionRef = useTemplateRef<HTMLDivElement>('tagDistribution');
  let chartInstance: echarts.ECharts | null = null;
  const initTagDistribution = () => {
    if (!chartInstance) {
      chartInstance = echarts.init(tagDistributionRef.value!);
      useResizeObserver(tagDistributionRef, () => {
        chartInstance!.resize();
      });
    }
    const chartOptions = {
      legend: {
        bottom: 0,
        left: 'center',
        icon: 'circle',
        itemHeight: 8,
        itemWidth: 8,
        itemGap: 16,
        textStyle: {
          color: '#999',
          fontSize: 12,
        },
        data: ['正向评价', '负向评价'],
      },
      tooltip: {
        trigger: 'axis' as const,
        formatter: (params) => {
          const { name } = params[0];
          const content = params.reduce((html, p, idx) => {
            const formatFn = formatNumberObj;
            const newHtml = `${html}<div style="display: flex; align-items: center;">
          <div style="background: ${
            p.color
          }; border-radius: 50%; width: 6px; height: 6px; margin-right: 8px;"></div>
          <div style="color: #666; font-size: 12px">${p.data.tag}</div>
          </div>
          <div class="font-din" style="font-size: 12px; color: #1f1f1f;text-align: right">${formatFn(
            p.value
          ).toString()}</div>`;
            return newHtml;
          }, '');
          return `
        <div style="color: #999; font-size: 12px; margin-bottom: 4px">${name}</div>
        <div style="display: grid; grid-template-columns: repeat(2, auto); column-gap: 10px; row-gap: 4px">${content}</div>
        `;
        },
      },
      grid: [
        {
          show: false,
          left: 10,
          top: 10,
          bottom: 34,
          containLabel: true,
          width: '39%',
        },
        {
          show: false,
          left: '51%',
          top: 10,
          bottom: 53,
          width: '0%',
        },
        {
          show: false,
          right: 10,
          top: 10,
          bottom: 34,
          containLabel: true,
          width: '39%',
        },
      ],
      xAxis: [
        {
          type: 'value',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'bottom',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#E6E6E6',
              type: 'dashed',
            },
          },
        },
        {
          gridIndex: 1,
          show: false,
        },
        {
          gridIndex: 2,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'bottom',
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#999',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#E6E6E6',
              type: 'dashed',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'category',
          inverse: true,
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#dedede',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: chartData.value.map(function (item) {
            return item.spuName;
          }),
        },
        {
          gridIndex: 1,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999',
              fontSize: 12,
              align: 'center',
            },
          },
          data: chartData.value.map(function (item) {
            return {
              value: item.tag,
            };
          }),
        },
        {
          gridIndex: 2,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#dedede',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: chartData.value.map(function (item) {
            return item.spuName;
          }),
        },
      ],
      series: [
        {
          name: '正向评价',
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: 14,
          itemStyle: {
            borderRadius: [5, 0, 0, 5],
            color: '#02B96B',
          },
          data: chartData.value.map((item) => {
            return {
              value: item.positiveCount,
              tag: item.tag,
            };
          }),
        },
        {
          name: '负向评价',
          type: 'bar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          barWidth: 14,
          itemStyle: {
            borderRadius: [0, 5, 5, 0],
            color: '#F53F3F',
          },
          data: chartData.value.map((item) => {
            return {
              value: item.negativeCount,
              tag: item.tag,
            };
          }),
        },
      ],
    };
    chartInstance.setOption(chartOptions);
  };
</script>

<style lang="scss" scoped>
  .main-content {
    display: flex;
    flex-direction: column;
    row-gap: 26px;
    .data-card {
      padding: 0;
      :deep(.data-card__header) {
        margin-bottom: 16px;
        .title {
          font-size: 13px;
        }
      }
    }
    :deep(.font-din) {
      font-family: DIN;
    }
    .el-rate {
      --el-rate-disabled-void-color: var(---N3, #ededed);
      --el-rate-fill-color: var(---C5, #ff9f22);
    }
    .tag-distribution {
      border: 1px solid var(---N2, #f5f5f5);
      border-radius: 10px;
      padding: 16px;
      height: 340px;
    }
  }
</style>
