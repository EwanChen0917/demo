<template>
  <DataCard title="指标总览">
    <template #title>
      <label class="link-label">
        <span>全链路指标总览</span>
      </label>
    </template>
    <template #actions>
      <el-popover
        :visible="configVisible"
        trigger="click"
        placement="bottom-start"
        :teleported="false"
      >
        <template #reference>
          <el-button
            text
            @click="
              () => {
                configVisible = true;
                trendConfigVisible = false;
              }
            "
          >
            <template #icon>
              <i class="iconfont icon-kucunjichushezhi1"></i>
            </template>
            自定义指标
          </el-button>
        </template>
        <ConfigurablePoint
          title="自定义核心指标"
          :max="0"
          :configurable-point-list="configurablePointListFiltered"
          :default-config-list="defaultConfigList"
          @validate-failed="handleValidation"
          @confirm="handlePointConfigConfirm"
          @close="configVisible = false"
        />
      </el-popover>
    </template>
    <HorizontalScrollContainer>
      <div class="content">
        <IndicatorTable v-for="(c, i) of pointList" :key="c.label" :is-split="i > 0" :config="c" />
      </div>
    </HorizontalScrollContainer>
    <section class="point-trend-section">
      <div class="section-header">
        <span>趋势分析</span>
        <el-popover
          :visible="trendConfigVisible"
          trigger="click"
          placement="bottom-start"
          :teleported="false"
        >
          <template #reference>
            <el-button text @click="trendConfigVisible = true">
              <template #icon>
                <i class="iconfont icon-kucunjichushezhi1"></i>
              </template>
              <span :style="{ fontWeight: 400, fontFamily: 'PingFang SC' }">自定义指标</span>
            </el-button>
          </template>
          <ConfigurablePoint
            title="自定义趋势分析"
            :max="6"
            :configurable-point-list="configurablePointListFiltered"
            :default-config-list="defaultTrendConfigList"
            @validate-failed="handleTrendValidation"
            @confirm="
              (val) => {
                trendConfigList = [...val];
              }
            "
            @close="trendConfigVisible = false"
          />
        </el-popover>
      </div>
      <div class="trend-chart" ref="trendChartRef"></div>
    </section>
  </DataCard>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { FrontTrafficAnalysisBean } from '@/api/bi/data-contracts';
  import { formatFullNumberObj, formatNumberObj, formatRate } from '@/views/bi/utils/utils';
  import HorizontalScrollContainer from '@/views/personalCenter/components/HorizontalScrollContainer.vue';
  import { useResizeObserver } from '@vueuse/core';
  import { BiContracts } from '@/api';
  import { ElMessage } from 'element-plus';
  import IndicatorTable from '../../components/IndicatorTable.vue';
  import DataCard from '../../components/DataCard.vue';
  import ConfigurablePoint from '../../components/ConfigurablePoint.vue';

  const props = withDefaults(
    defineProps<{
      trafficAnalysis: FrontTrafficAnalysisBean;
      metricOverview: BiContracts.FrontPageAllMetricBean;
      metricOverviewTrend: BiContracts.FrontPageAllMetricBean[];
    }>(),
    {
      trafficAnalysis: () => ({}),
      metricOverview: () => ({}),
      metricOverviewTrend: () => [],
    }
  );

  const platformList = computed(() => {
    return [
      (props.trafficAnalysis?.amazonTrafficAnalysis && 'amazon') || null,
      (props.trafficAnalysis?.shopifyTrafficAnalysis && 'shopify') || null,
      (props.trafficAnalysis?.tiktokTrafficAnalysis && 'tiktok') || null,
    ].filter(Boolean);
  });
  const configVisible = ref(false);
  const trendConfigVisible = ref(false);
  const configurablePointList: {
    label: string;
    key: string;
    platform?: string;
    data?: any;
  }[] = [
    {
      label: '总会话数',
      key: 'totalSessions',
      platform: 'all',
      data: {
        current: 'totalSessions',
        isRate: false,
        last: 'totalSessionsMom',
        yoy: 'totalSessionsYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '会话数-亚马逊',
      key: 'totalSessionsAmazon',
      platform: 'amazon',
      data: {
        current: 'totalSessionsAmazon',
        isRate: false,
        last: 'totalSessionsAmazonMom',
        yoy: 'totalSessionsAmazonYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '会话数-独立站',
      key: 'totalSessionsShopify',
      platform: 'shopify',
      data: {
        current: 'totalSessionsShopify',
        isRate: false,
        last: 'totalSessionsShopifyMom',
        yoy: 'totalSessionsShopifyYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '会话数-TikTok',
      key: 'totalSessionsTiktok',
      platform: 'tiktok',
      data: {
        current: 'totalSessionsTiktok',
        isRate: false,
        last: 'totalSessionsTiktokMom',
        yoy: 'totalSessionsTiktokYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '总广告曝光量',
      key: 'adImpressionsCount',
      platform: 'all',
      data: {
        current: 'adImpressionsCount',
        isRate: false,
        last: 'adImpressionsCountMom',
        yoy: 'adImpressionsCountYoy',
        yAxisIndex: 0,
      },
    },
    {
      label: '广告曝光量-亚马逊',
      key: 'adImpressionsCountAmazon',
      platform: 'amazon',
      data: {
        current: 'adImpressionsCountAmazon',
        isRate: false,
        last: 'adImpressionsCountAmazonMom',
        yoy: 'adImpressionsCountAmazonYoy',
        yAxisIndex: 0,
      },
    },
    {
      label: '广告曝光量-独立站',
      key: 'adImpressionsCountShopify',
      platform: 'shopify',
      data: {
        current: 'adImpressionsCountShopify',
        isRate: false,
        last: 'adImpressionsCountShopifyMom',
        yoy: 'adImpressionsCountShopifyYoy',
        yAxisIndex: 0,
      },
    },
    {
      label: '广告曝光量-TikTok',
      key: 'adImpressionsCountTiktok',
      platform: 'tiktok',
      data: {
        current: 'adImpressionsCountTiktok',
        isRate: false,
        last: 'adImpressionsCountTiktokMom',
        yoy: 'adImpressionsCountTiktokYoy',
        yAxisIndex: 0,
      },
    },
    {
      label: '总红人曝光量',
      key: 'impressionsKolCount',
      platform: 'all',
      data: {
        current: 'impressionsKolCount',
        isRate: false,
        last: 'impressionsKolCountMom',
        yoy: 'impressionsKolCountYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '红人曝光量-亚马逊',
      key: 'impressionsKolCountAmazon',
      platform: 'amazon',
      data: {
        current: 'impressionsKolCountAmazon',
        isRate: false,
        last: 'impressionsKolCountAmazonMom',
        yoy: 'impressionsKolCountAmazonYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '红人曝光量-独立站',
      key: 'impressionsKolCountShopify',
      platform: 'shopify',
      data: {
        current: 'impressionsKolCountShopify',
        isRate: false,
        last: 'impressionsKolCountShopifyMom',
        yoy: 'impressionsKolCountShopifyYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '红人曝光量-TikTok',
      key: 'impressionsKolCountTiktok',
      platform: 'tiktok',
      data: {
        current: 'impressionsKolCountTiktok',
        isRate: false,
        last: 'impressionsKolCountTiktokMom',
        yoy: 'impressionsKolCountTiktokYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '总广告点击量',
      key: 'adClickCount',
      platform: 'all',
      data: {
        current: 'adClickCount',
        isRate: false,
        last: 'adClickCountMom',
        yoy: 'adClickCountYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '广告点击量-亚马逊',
      key: 'adClickCountAmazon',
      platform: 'amazon',
      data: {
        current: 'adClickCountAmazon',
        isRate: false,
        last: 'adClickCountAmazonMom',
        yoy: 'adClickCountAmazonYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '广告点击量-独立站',
      key: 'adClickCountShopify',
      platform: 'shopify',
      data: {
        current: 'adClickCountShopify',
        isRate: false,
        last: 'adClickCountShopifyMom',
        yoy: 'adClickCountShopifyYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '广告点击量-TikTok',
      key: 'adClickCountTiktok',
      platform: 'tiktok',
      data: {
        current: 'adClickCountTiktok',
        isRate: false,
        last: 'adClickCountTiktokMom',
        yoy: 'adClickCountTiktokYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '总销量',
      key: 'salesQty',
      platform: 'all',
      data: {
        current: 'salesQty',
        isRate: false,
        last: 'salesQtyMom',
        yoy: 'salesQtyYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '销量-亚马逊',
      key: 'salesQtyAmazon',
      platform: 'amazon',
      data: {
        current: 'salesQtyAmazon',
        isRate: false,
        last: 'salesQtyAmazonMom',
        yoy: 'salesQtyAmazonYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '销量-独立站',
      key: 'salesQtyShopify',
      platform: 'shopify',
      data: {
        current: 'salesQtyShopify',
        isRate: false,
        last: 'salesQtyShopifyMom',
        yoy: 'salesQtyShopifyYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '销量-TikTok',
      key: 'salesQtyTiktok',
      platform: 'tiktok',
      data: {
        current: 'salesQtyTiktok',
        isRate: false,
        last: 'salesQtyTiktokMom',
        yoy: 'salesQtyTiktokYoy',
        yAxisIndex: 1,
      },
    },
    {
      label: '总VOC率',
      key: 'vocRate',
      platform: 'all',
      data: {
        current: 'vocRate',
        isRate: true,
        last: 'vocRateMom',
        yoy: 'vocRateYoy',
        yAxisIndex: 2,
      },
    },
    {
      label: 'VOC率-亚马逊',
      key: 'vocRateAmazon',
      platform: 'amazon',
      data: {
        current: 'vocRateAmazon',
        isRate: true,
        last: 'vocRateAmazonMom',
        yoy: 'vocRateAmazonYoy',
        yAxisIndex: 2,
      },
    },
    {
      label: 'VOC率-独立站',
      key: 'vocRateShopify',
      platform: 'shopify',
      data: {
        current: 'vocRateShopify',
        isRate: true,
        last: 'vocRateShopifyMom',
        yoy: 'vocRateShopifyYoy',
        yAxisIndex: 2,
      },
    },
    {
      label: 'VOC率-TikTok',
      key: 'vocRateTiktok',
      platform: 'tiktok',
      data: {
        current: 'vocRateTiktok',
        isRate: true,
        last: 'vocRateTiktokMom',
        yoy: 'vocRateTiktokYoy',
        yAxisIndex: 2,
      },
    },
  ];

  const configurablePointListFiltered = computed(() => {
    if (platformList.value.length === 0) {
      return [];
    }
    if (platformList.value.length === 3) {
      return configurablePointList;
    }
    const filtered = configurablePointList.filter((item) =>
      platformList.value.includes(item.platform!)
    );
    return filtered.map((item) => {
      return {
        ...item,
        key: item.key,
        label: item.label.split('-')[0],
      };
    });
  });
  const configurablePointMap = computed(() =>
    configurablePointListFiltered.value.reduce((acc, cur) => {
      acc[cur.key] = cur;
      return acc;
    }, {} as Record<string, { label: string; key: string; data?: any }>)
  );
  const defaultConfigList = computed(() => {
    if (platformList.value.length === 3) {
      return [
        'totalSessions',
        'adImpressionsCount',
        'impressionsKolCount',
        'adClickCount',
        'salesQty',
        'vocRate',
      ];
    }
    return configurablePointListFiltered.value.slice(0, 6).map((item) => item.key);
  });
  const handlePointConfigConfirm = (val: string[]) => {
    currentSelectedPoints.value = [...val];
    configVisible.value = false;
  };
  const currentSelectedPoints = ref<string[]>(defaultConfigList.value);
  const pointList = computed(() => {
    return currentSelectedPoints.value.map((key) => {
      const dataKey = configurablePointMap.value[key].data;
      const currentObj = dataKey.isRate
        ? formatRate(props.metricOverview?.[dataKey.current])
        : formatNumberObj(props.metricOverview?.[dataKey.current]);
      const data = {
        ...dataKey,
        current: currentObj.value,
        last: props.metricOverview?.[dataKey.last],
        yoy: props.metricOverview?.[dataKey.yoy],
      };
      return {
        ...configurablePointMap.value[key],
        title: configurablePointMap.value[key].label,
        unit: currentObj.unit,
        data,
      };
    });
  });
  const handleValidation = (val: string[]) => {
    if (val.length === 0) {
      ElMessage.warning('请至少勾选1个核心指标');
    } else if (val.length > 6) {
      ElMessage.warning('最多可勾选6个核心指标');
    }
  };

  const defaultTrendConfigList = computed(() => {
    if (platformList.value.length === 3) {
      return ['totalSessions', 'impressionsKolCount', 'salesQty'];
    }
    return configurablePointListFiltered.value.slice(0, 3).map((item) => item.key);
  });
  const trendConfigList = ref<string[]>(defaultTrendConfigList.value);
  watch(
    () => platformList.value,
    (newVal, oldVal) => {
      if (newVal.length === 3 && oldVal.length === 3) {
        return;
      }
      if (newVal.length === 1 && oldVal.length === 1 && newVal[0] === oldVal[0]) {
        return;
      }
      trendConfigList.value = defaultTrendConfigList.value;
      handlePointConfigConfirm(defaultConfigList.value);
    }
  );
  const trendChartRef = useTemplateRef('trendChartRef');
  let trendChart: echarts.ECharts | null = null;
  const COLORS = ['#258DFF', '#02B96B', '#FF9F22', '#FF663E', '#A55BF5', '#F53F3F'];
  const Y_AXIS_OFFSET_GAP = 60;

  const buildYAxes = (items: string[]) => {
    let leftCount = 0;
    let rightCount = 0;
    return items.map((key, idx) => {
      const pointData = configurablePointMap.value[key]?.data;
      const isRate = pointData?.isRate;
      const isRight = idx % 2 === 1;
      const position = isRight ? 'right' : 'left';
      const sideIndex = isRight ? rightCount : leftCount;
      if (isRight) rightCount += 1;
      else leftCount += 1;
      const axisColor = COLORS[idx % COLORS.length];
      return {
        type: 'value',
        show: true,
        position,
        alignTicks: false,
        offset: sideIndex * Y_AXIS_OFFSET_GAP,
        axisLine: {
          show: true,
          lineStyle: { color: axisColor },
        },
        axisLabel: {
          show: true,
          color: axisColor,
          fontSize: 12,
          fontFamily: 'PingFang SC',
          formatter: (value: number) =>
            isRate ? formatRate(value).toString() : formatFullNumberObj(value),
        },
        splitLine: {
          show: idx === 0,
          lineStyle: { color: '#E6E6E6', type: 'dashed' as const },
        },
        nameTextStyle: {
          fontSize: 11,
          fontWeight: 400,
          color: '#999',
          align: 'right' as const,
        },
      };
    });
  };

  const initTrendChart = () => {
    if (!trendChart) {
      trendChart = echarts.init(trendChartRef.value);
      useResizeObserver(trendChartRef, () => {
        trendChart?.resize();
      });
    }
    const items = trendConfigList.value;
    const yAxis = buildYAxes(items);

    let leftAxesCount = 0;
    let rightAxesCount = 0;
    items.forEach((_, idx) => {
      if (idx % 2 === 1) rightAxesCount += 1;
      else leftAxesCount += 1;
    });
    const gridLeft = Math.max((leftAxesCount - 1) * Y_AXIS_OFFSET_GAP, 10);
    const gridRight = Math.max((rightAxesCount - 1) * Y_AXIS_OFFSET_GAP, 10);

    const option = {
      legend: {
        bottom: 0,
        left: 'center',
        itemWidth: 18,
        itemHeight: 10,
        itemGap: 16,
        textStyle: {
          color: '#999',
          borderColor: 'transparent',
          borderWidth: 1,
        },
        data: items.map((item) => {
          const point = configurablePointMap.value[item];
          return {
            name: point.label,
            icon: point.data.isRate
              ? 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z'
              : 'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z',
          };
        }),
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: 12,
        },
      },
      grid: {
        top: 20,
        left: gridLeft,
        right: gridRight,
        bottom: 46,
        height: 'auto',
        containLabel: true,
      },
      color: COLORS,
      xAxis: {
        type: 'category',
        data: props.metricOverviewTrend?.map((item) => item.period),
        axisLabel: {
          show: true,
          color: '#999',
          fontSize: 12,
          fontFamily: 'PingFang SC',
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#E6E6E6',
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: '#E6E6E6',
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis,
      series: items.map((item, idx) => ({
        name: configurablePointMap.value[item].label,
        type: 'line',
        data: props.metricOverviewTrend?.map((d) => d[item]),
        yAxisIndex: idx,
        smooth: true,
        symbol: 'circle',
        showSymbol: true,
        symbolSize: 6,
        itemStyle: {
          borderColor: '#fff',
        },
        lineStyle: {
          width: 2,
        },
        label: {
          show: true,
          formatter: (params) => {
            const dataKey = configurablePointMap.value[item].data;
            if (dataKey.isRate) {
              return formatRate(params.value).toString();
            }
            return formatNumberObj(params.value).toString();
          },
        },
        tooltip: {
          valueFormatter: (value: number) => {
            const dataKey = configurablePointMap.value[item].data;
            if (dataKey.isRate) {
              return formatRate(value).toString();
            }
            return formatNumberObj(value).toString();
          },
        },
      })),
    };
    trendChart.setOption(option, { replaceMerge: ['series', 'yAxis'] });
  };
  nextTick(() => {
    initTrendChart();
  });
  watch([() => trendConfigList.value, () => props.metricOverviewTrend], () => {
    nextTick(() => {
      initTrendChart();
    });
  });

  const handleTrendValidation = (val: string[]) => {
    if (val.length === 0) {
      ElMessage.warning('请至少勾选1个指标趋势');
    } else if (val.length > 5) {
      ElMessage.warning('最多可勾选5个指标趋势');
    }
  };
</script>

<style lang="scss" scoped>
  .data-card {
    position: relative;
  }
  .content {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    min-width: 100%;
    min-height: 94px;
    :deep(.indicator-table) {
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .point-trend-section {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      color: var(---N9, var(---N9, #1f1f1f));
      text-overflow: ellipsis;

      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
    }
    .trend-chart {
      width: 100%;
      height: 300px;
    }
  }
</style>
