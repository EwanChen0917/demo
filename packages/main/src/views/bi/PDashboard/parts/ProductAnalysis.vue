<template>
  <BiCard
    class="product-analysis"
    :title="type === 'voc' ? 'VOC - 重点产品趋势分析' : '退货 - 重点产品趋势分析'"
  >
    <template #actions>
      <div class="operation">
        <el-select
          v-if="mode === 'chartMode'"
          v-model="spuNameList"
          placeholder="SPU"
          :options="spuOptions"
          :props="{ label: 'label', value: 'value' }"
          :clearable="true"
          filterable
          multiple
          collapse-tags
          collapse-tags-tooltip
        />
        <!-- voc -->
        <div v-if="type === 'voc'" class="operation-item-group">
          <el-select v-if="searchParams.dateType === 'month'" v-model="selectedPeriod" placeholder="计算周期">
            <el-option label="月累" value="monthAccumulate" />
            <el-option label="年累" value="yearAccumulate" />
            <el-option label="上市周期对比" value="launchCycleCompare" />
          </el-select>
          <el-select v-else-if="searchParams.dateType === 'year'" v-model="selectedPeriod" placeholder="计算周期">
            <el-option label="年累" value="yearAccumulate" />
            <el-option label="上市周期对比" value="launchCycleCompare" />
          </el-select>
          <el-select v-else-if="searchParams.dateType === 'week'" v-model="selectedPeriod" placeholder="计算周期">
            <el-option label="自然周期对比" value="weekNaturalCompare" />
            <el-option label="上市周期对比" value="launchCycleCompare" />
          </el-select>
        </div>
        <!-- 退货 -->
        <div v-else class="operation-item-group">
          <el-select v-if="searchParams.dateType === 'month'" v-model="selectedPeriod" placeholder="计算周期">
            <el-option label="月累" value="monthAccumulate" />
            <el-option label="年累" value="yearAccumulate" />
            <el-option
              v-if="selectedReturnType !== 'refundAmount'"
              label="上市周期对比"
              value="launchCycleCompare"
            />
          </el-select>
          <el-select v-else-if="searchParams.dateType === 'year'" v-model="selectedPeriod" placeholder="计算周期">
            <el-option label="年累" value="yearAccumulate" />
            <el-option
              v-if="selectedReturnType !== 'refundAmount'"
              label="上市周期对比"
              value="launchCycleCompare"
            />
          </el-select>
          <el-select v-else-if="searchParams.dateType === 'week'" v-model="selectedPeriod" placeholder="计算周期">
            <el-option label="自然周期对比" value="weekNaturalCompare" />
            <el-option
              v-if="selectedReturnType !== 'refundAmount'"
              label="上市周期对比"
              value="launchCycleCompare"
            />
          </el-select>
          <el-select v-model="selectedReturnType" placeholder="数据口径">
            <el-option label="退货" value="returnQty" />
            <el-option label="退款" value="refundAmount" />
          </el-select>
        </div>
        <el-radio-group v-model="mode">
          <el-radio-button value="chartMode">图表模式</el-radio-button>
          <el-radio-button value="listMode">列表模式</el-radio-button>
        </el-radio-group>
      </div>
    </template>

    <div v-show="mode === 'chartMode'" class="chart-container">
      <div class="chart-area" ref="lineChartRef"></div>
    </div>
    <div v-show="mode === 'listMode'">
      <el-table
        ref="tableRef"
        :data="sortedTableData"
        row-key="spuName"
        border
        :rowClassName="({ row }: any) => (row.isTotal ? 'total-row' : '')"
        style="width: 100%"
        @sort-change="handleSort"
      >
        <!-- SPU 名称固定列 -->
        <el-table-column prop="spuName" label="SPU名称" minWidth="120" fixed="left">
          <template #default="{ row }">
            <span
              :class="{ clickable: !row.isTotal }"
              @click="!row.isTotal && handleSelectSpu(row)"
            >
              {{ row.spuName }}
            </span>
          </template>
        </el-table-column>

        <!-- 时间周期列组（倒序，最新在左） -->
        <el-table-column
          v-for="col in tableColumns"
          :key="col"
          :label="col"
          align="center"
          minWidth="220"
        >
          <!-- 销量（字段级权限控制） -->
          <el-table-column
            v-permission="'saleQuery'"
            :label="salesQtyColumLabel"
            align="right"
            minWidth="118"
            sortable="custom"
            :sort-orders="['descending', 'ascending', null]"
            :column-key="`${col}||saleQty`"
          >
            <template #default="{ row }">
              <span>
                {{ formatNumberObj(getCellVal(row, col, tableMetricConfig.saleQtyField)) }}
              </span>
            </template>
          </el-table-column>
          <!-- 销售额（字段级权限控制） -->
          <el-table-column
            v-permission="'saleQuery'"
            :label="salesAmountColumLabel"
            align="right"
            minWidth="118"
            sortable="custom"
            :sort-orders="['descending', 'ascending', null]"
            :column-key="`${col}||salesAmount`"
          >
            <template #default="{ row }">
              <span>
                {{ formatNumberObj(getCellVal(row, col, tableMetricConfig.salesAmountField)) }}
              </span>
            </template>
          </el-table-column>
          <!-- VOC量/退货量/退款额 -->
          <el-table-column
            :label="tableMetricConfig.vocCountLabel"
            align="right"
            minWidth="120"
            sortable="custom"
            :sort-orders="['descending', 'ascending', null]"
            :column-key="`${col}||vocCount`"
          >
            <template #default="{ row }">
              <span v-if="tableMetricConfig.vocCountLabel.indexOf('退款额') > -1 || selectedPeriod === 'launchCycleCompare'">
                {{ formatNumberObj(getCellVal(row, col, tableMetricConfig.vocCountField)) }}
              </span>
              <span
                v-else
                :class="{ clickable: !row.isTotal }"
                @click="handleColCellClick(row, col, tableMetricConfig.vocCountField)"
              >
                {{ formatNumberObj(getCellVal(row, col, tableMetricConfig.vocCountField)) }}
              </span>
            </template>
          </el-table-column>
          <!-- VOC率/退货率/退款率 -->
          <el-table-column
            :label="tableMetricConfig.vocRateLabel"
            align="right"
            minWidth="120"
            sortable="custom"
            :sort-orders="['descending', 'ascending', null]"
            :column-key="`${col}||vocRate`"
          >
            <template #default="{ row }">
              <span>
                {{
                  formatRate(getCellVal(row, col, tableMetricConfig.vocRateField), {
                    maximumFractionDigits: 2,
                  })
                }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </BiCard>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import { LineChart, BarChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { type BiContracts } from '@/api';
  import { useResizeObserver } from '@vueuse/core';
  import { formatNumberObj, formatRate } from '../../utils/utils';
  import BiCard from '../../components/BiCard.vue';
  import { DEFAULT_SPU_NAME } from '../constant';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const props = defineProps<{
    type: 'voc' | 'return';
    periodType: 'yearAccumulate' | 'monthAccumulate' | 'weekNaturalCompare' | 'launchCycleCompare';
    spuTrend?: BiContracts.ProductManagerLevelTrendVO;
    spuLevel3MapList?: BiContracts.ProductManagerLevelDO;
    spuLaunchCycleReturnTrend?: BiContracts.ProductManagerLevelTrendVO;
  }>();
  const emit = defineEmits<{
    skipParticulars: [payload: Record<string, any>];
    'update:periodType': [value: 'yearAccumulate' | 'monthAccumulate' | 'weekNaturalCompare' | 'launchCycleCompare'];
  }>();
  const searchParams = inject<any>('searchParams');
  const spuName = defineModel<string>('spuName', { default: DEFAULT_SPU_NAME });

  // 当前数据源：上市周期对比时切换为 spuLaunchCycleReturnTrend，否则用 spuTrend
  const activeTrend = computed(() => {
    if (selectedPeriod.value === 'launchCycleCompare') {
      return props.spuLaunchCycleReturnTrend;
    }
    return props.spuTrend;
  });

  const spuOptions = computed(() => {
    return props.spuTrend?.rows?.map((item) => {
      return {
        label: item.spuName,
        value: item.spuName,
      };
    });
  });
  const spuNameList = ref<string[]>(['M9吸奶器', 'M5吸奶器', 'Air 1吸奶器']);
  const selectedMetric = ref<string>(props.type === 'voc' ? 'vocCount' : 'returnQty');
  const selectedPeriod = computed({
    set: (value) => emit('update:periodType', value),
    get: () => props.periodType,
  });
  const selectedReturnType = ref<string>('returnQty');
  const salesQtyColumLabel = computed(() => {
    let label = '销量';
    if (selectedPeriod.value === 'yearAccumulate') {
      label += '(年累)';
    } else if (selectedPeriod.value === 'monthAccumulate') {
      label += '(月累)';
    }
    return label;
  });

  const salesAmountColumLabel = computed(() => {
    let label = '销售额';
    if (selectedPeriod.value === 'yearAccumulate') {
      label += '(年累)';
    } else if (selectedPeriod.value === 'monthAccumulate') {
      label += '(月累)';
    }
    return label;
  });

  // VOC 图表的量/率字段配置，根据 selectedPeriod 决定
  const vocMetricConfig = computed(() => {
    const isWeek = searchParams.dateType === 'week';
    const isYear = selectedPeriod.value === 'yearAccumulate' && !isWeek;
    const isMonth = selectedPeriod.value === 'monthAccumulate' && !isWeek;
    let countLabel;
    let rateLabel;
    let countField;
    let rateField;
    if (isYear) {
      countLabel = 'VOC量(年累)';
      rateLabel = 'VOC率(年累)';
      countField = 'vocCountCumulative';
      rateField = 'cumulativeVocProp';
    } else if (isMonth) {
      countLabel = 'VOC量(月累)';
      rateLabel = 'VOC率(月累)';
      countField = 'vocCount';
      rateField = 'vocProp';
    } else {
      countLabel = 'VOC量';
      rateLabel = 'VOC率';
      countField = 'vocCount';
      rateField = 'vocProp';
    }
    return {
      countField,
      rateField,
      countLabel,
      rateLabel,
    };
  });

  // 退货/退款图表的量/率字段配置，根据 selectedPeriod + selectedReturnType 决定
  const returnMetricConfig = computed(() => {
    const isRefund = selectedReturnType.value === 'refundAmount';
    const isWeek = searchParams.dateType === 'week';
    const isYear = selectedPeriod.value === 'yearAccumulate' && !isWeek;
    const isMonth = selectedPeriod.value === 'monthAccumulate' && !isWeek;
    let countField;
    let rateField;
    let countLabel;
    let rateLabel;
    let totalCountField;
    let totalRateField;
    if (isRefund) {
      // 退款
      if (isYear) {
        countLabel = '退款额(年累)';
        rateLabel = '退款率(年累)';
      } else if (isMonth) {
        countLabel = '退款额(月累)';
        rateLabel = '退款率(月累)';
      } else {
        countLabel = '退款额';
        rateLabel = '退款率';
      }
      countField = isYear ? 'refundAmountCumulative' : 'refundAmount';
      rateField = isYear ? 'refundAmountRateCumulative' : 'refundAmountRate';
      totalCountField = isYear ? 'totalRefundAmountCumulative' : 'totalRefundAmount';
      totalRateField = isYear ? 'totalRefundAmountRateCumulative' : 'totalRefundAmountRate';
    } else {
      // 退货（含上市周期对比）
      if (isYear) {
        countLabel = '退货量(年累)';
        rateLabel = '退货率(年累)';
      } else if (isMonth) {
        countLabel = '退货量(月累)';
        rateLabel = '退货率(月累)';
      } else {
        countLabel = '退货量';
        rateLabel = '退货率';
      }
      countField = isYear ? 'returnQtyCumulative' : 'returnQty';
      rateField = isYear ? 'returnRateCumulative' : 'returnRate';
      totalCountField = isYear ? 'totalReturnQtyCumulative' : 'totalReturnQty';
      totalRateField = isYear ? 'totalReturnRateCumulative' : 'totalReturnRate';
    }

    return {
      countField,
      rateField,
      countLabel,
      rateLabel,
      totalCountField,
      totalRateField,
    };
  });

  watch(
    () => props.type,
    () => {
      selectedMetric.value = props.type === 'voc' ? 'vocCount' : 'returnQty';
    }
  );
  watch(
    () => searchParams.dateType,
    () => {
      selectedMetric.value = props.type === 'voc' ? 'vocCount' : 'returnQty';
      if (searchParams.dateType === 'month') {
        selectedPeriod.value = 'monthAccumulate';
      } else if (searchParams.dateType === 'year') {
        selectedPeriod.value = 'yearAccumulate';
      } else if (searchParams.dateType === 'week') {
        selectedPeriod.value = 'weekNaturalCompare';
      }
    }
  );
  const mode = ref<string>('chartMode');

  // 图表用columns升序
  const chartColumns = computed(() => {
    return [...(activeTrend.value?.columns || [])].reverse();
  });

  // SPU 颜色池，每个 SPU 固定一个颜色
  const SPU_COLORS = ['#02B96B', '#258DFF', '#FF9F22', '#FF663E', '#A855F7', '#EC4899'];

  // 为 VOC 图表生成双系列（量柱状 + 率折线），每个 SPU 一种颜色
  const vocChartSeries = computed(() => {
    const trend = activeTrend.value;
    const { countField, rateField } = vocMetricConfig.value;
    const spuMap: Record<string, any> =
      trend?.rows?.reduce((acc, curr) => {
        acc[curr.spuName as unknown as string] = curr;
        return acc;
      }, {}) || {};

    const series: any[] = [];
    const columns = chartColumns.value;
    spuNameList.value.forEach((spuNameItem, colorIdx) => {
      const color = SPU_COLORS[colorIdx % SPU_COLORS.length];
      const row = spuMap[spuNameItem];

      const countData = columns.map((col) => {
        const cell = row?.[col] as any;
        return cell?.[countField] ?? null;
      });
      const rateData = columns.map((col) => {
        const cell = row?.[col] as any;
        return cell?.[rateField] ?? null;
      });

      // 量：柱状图，name 直接用 SPU 名（作为图例标识）
      series.push({
        name: spuNameItem,
        type: 'bar',
        yAxisIndex: 0,
        barMaxWidth: 16,
        itemStyle: { color, borderRadius: [3, 3, 0, 0] },
        data: countData,
        isRate: false,
      });
      // 率：折线图，name 加后缀区分，不出现在图例，点击图例时通过事件联动
      series.push({
        name: `${spuNameItem}__rate__`,
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: false,
        itemStyle: { color, borderColor: '#fff' },
        data: rateData,
        isRate: true,
      });
    });
    return series;
  });

  // 退货图表系列：量（柱状）+ 率（折线），与 vocChartSeries 逻辑对称
  const returnChartSeries = computed(() => {
    const trend = activeTrend.value;
    const { countField, rateField } = returnMetricConfig.value;
    const spuMap: Record<string, any> =
      trend?.rows?.reduce((acc, curr) => {
        acc[curr.spuName as unknown as string] = curr;
        return acc;
      }, {}) || {};

    const series: any[] = [];
    const columns = chartColumns.value;
    spuNameList.value.forEach((spuNameItem, colorIdx) => {
      const color = SPU_COLORS[colorIdx % SPU_COLORS.length];
      const row = spuMap[spuNameItem];

      const countData = columns.map((col) => {
        const cell = row?.[col] as any;
        return cell?.[countField] ?? null;
      });
      const rateData = columns.map((col) => {
        const cell = row?.[col] as any;
        return cell?.[rateField] ?? null;
      });

      series.push({
        name: spuNameItem,
        type: 'bar',
        yAxisIndex: 0,
        barMaxWidth: 16,
        itemStyle: { color, borderRadius: [3, 3, 0, 0] },
        data: countData,
        isRate: false,
      });
      series.push({
        name: `${spuNameItem}__rate__`,
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: false,
        itemStyle: { color, borderColor: '#fff' },
        data: rateData,
        isRate: true,
      });
    });
    return series;
  });

  const ICON_BAR =
    'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z';

  const xAxisBase = {
    nameTextStyle: { show: false },
    axisLabel: { show: true, color: '#999' },
    axisLine: { show: true, lineStyle: { color: '#E6E6E6' } },
    axisTick: { show: true, alignWithLabel: true, lineStyle: { color: '#E6E6E6' } },
    splitLine: { show: false },
  };

  const yAxisBase = {
    splitNumber: 4,
    nameTextStyle: { fontSize: 12, fontWeight: 400, color: '#999' },
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: true, lineStyle: { color: '#E6E6E6', type: 'dashed' } },
  };

  let chart: any = null;
  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
        chart.resize();
      });
      // 点击图例时，同步控制对应 SPU 的率折线系列显隐
      chart.on('legendselectchanged', (e: any) => {
        const rateName = `${e.name}__rate__`;
        chart.dispatchAction({
          type: e.selected[e.name] ? 'legendSelect' : 'legendUnSelect',
          name: rateName,
        });
      });
    }

    let option: any;

    if (props.type === 'voc') {
      // VOC：双 Y 轴，量（柱状）+ 率（折线），每个 SPU 同色
      const series = vocChartSeries.value;
      const { countLabel, rateLabel } = vocMetricConfig.value;
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter(params: any) {
            const { name } = params[0];
            // 按 SPU 名分组，量系列 name = SPU 名，率系列 name = "SPU名__rate__"
            const spuMap: Record<string, { color: string; count?: any; rate?: any }> = {};
            params.forEach((p: any) => {
              const isRateSeries = (p.seriesName as string).endsWith('__rate__');
              const spuKey = isRateSeries
                ? (p.seriesName as string).replace('__rate__', '')
                : p.seriesName;
              if (!spuMap[spuKey]) spuMap[spuKey] = { color: p.color };
              if (isRateSeries) {
                spuMap[spuKey].rate = p.value;
              } else {
                spuMap[spuKey].count = p.value;
              }
            });
            const content = Object.entries(spuMap)
              .map(([spu, { color, count, rate }]) => {
                return `<div style="display:flex;align-items:center;justify-content:space-between;min-width:240px;gap:8px">
                  <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                    <div style="background:${color};border-radius:2px;width:10px;height:10px;flex-shrink:0"></div>
                    <div style="color:#666;font-size:12px">${spu}</div>
                  </div>
                  <div style="font-family:DIN;color:#1f1f1f;display:flex;align-items:center;gap:6px;white-space:nowrap">
                    <span>${count != null ? formatNumberObj(count).toString() : '-'}</span>
                    <span style="color:#d9d9d9">|</span>
                    <span>${
                      rate != null ? formatRate(rate, { maximumFractionDigits: 2 }) : '-'
                    }</span>
                  </div>
                </div>`;
              })
              .join('');
            const header = `<div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <div style="color:#666;font-size:12px">${name}</div>
              <div style="color:#999;font-size:11px;display:flex;gap:6px">
                <span>${countLabel}</span><span style="color:#d9d9d9">|</span><span>${rateLabel}</span>
              </div>
            </div>`;
            return `${header}<div style="display:flex;flex-direction:column;gap:4px">${content}</div>`;
          },
        },
        legend: {
          bottom: 0,
          textStyle: { fontSize: 12, color: '#999' },
          itemWidth: 18,
          itemHeight: 10,
          itemGap: 26,
          // 每个 SPU 只显示一条图例，name 与量系列一致
          data: series
            .filter((s) => !s.isRate)
            .map((s) => ({
              name: s.name,
              icon: ICON_BAR,
            })),
        },
        grid: {
          top: 10,
          left: 1,
          right: 1,
          bottom: selectedPeriod.value === 'launchCycleCompare' ? 80 : 54,
          containLabel: true,
        },
        xAxis: {
          ...xAxisBase,
          type: 'category',
          data: chartColumns.value,
        },
        yAxis: [
          {
            ...yAxisBase,
            type: 'value',
            name: `量 (${countLabel})`,
            nameTextStyle: { ...yAxisBase.nameTextStyle, align: 'right' },
            axisLabel: {
              color: '#999',
              formatter(value: number) {
                const { value: v, unit } = formatNumberObj(value);
                return `${v}${unit}`;
              },
            },
          },
          {
            ...yAxisBase,
            type: 'value',
            name: `率 (${rateLabel})`,
            nameTextStyle: { ...yAxisBase.nameTextStyle, align: 'left' },
            splitLine: { show: false },
            axisLabel: {
              color: '#999',
              formatter(value: number) {
                return formatRate(value, { maximumFractionDigits: 2 });
              },
            },
          },
        ],
        series: series.map((s) => {
          const { isRate: _, ...rest } = s;
          return rest;
        }),
      };
    } else {
      // 退货：双 Y 轴，量（柱状）+ 率（折线），与 VOC 对称
      const series = returnChartSeries.value;
      const { countLabel, rateLabel } = returnMetricConfig.value;
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter(params: any) {
            const { name } = params[0];
            const spuMap: Record<string, { color: string; count?: any; rate?: any }> = {};
            params.forEach((p: any) => {
              const isRateSeries = (p.seriesName as string).endsWith('__rate__');
              const spuKey = isRateSeries
                ? (p.seriesName as string).replace('__rate__', '')
                : p.seriesName;
              if (!spuMap[spuKey]) spuMap[spuKey] = { color: p.color };
              if (isRateSeries) {
                spuMap[spuKey].rate = p.value;
              } else {
                spuMap[spuKey].count = p.value;
              }
            });
            const content = Object.entries(spuMap)
              .map(([spu, { color, count, rate }]) => {
                return `<div style="display:flex;align-items:center;justify-content:space-between;min-width:240px;gap:8px">
                  <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                    <div style="background:${color};border-radius:2px;width:10px;height:10px;flex-shrink:0"></div>
                    <div style="color:#666;font-size:12px">${spu}</div>
                  </div>
                  <div style="font-family:DIN;color:#1f1f1f;display:flex;align-items:center;gap:6px;white-space:nowrap">
                    <span>${count != null ? formatNumberObj(count).toString() : '-'}</span>
                    <span style="color:#d9d9d9">|</span>
                    <span>${
                      rate != null ? formatRate(rate, { maximumFractionDigits: 2 }) : '-'
                    }</span>
                  </div>
                </div>`;
              })
              .join('');
            const header = `<div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <div style="color:#666;font-size:12px">${name}</div>
              <div style="color:#999;font-size:11px;display:flex;gap:6px">
                <span>${countLabel}</span><span style="color:#d9d9d9">|</span><span>${rateLabel}</span>
              </div>
            </div>`;
            return `${header}<div style="display:flex;flex-direction:column;gap:4px">${content}</div>`;
          },
        },
        legend: {
          bottom: 0,
          textStyle: { fontSize: 12, color: '#999' },
          itemWidth: 18,
          itemHeight: 10,
          itemGap: 26,
          data: series
            .filter((s) => !s.isRate)
            .map((s) => ({
              name: s.name,
              icon: ICON_BAR,
            })),
        },
        grid: {
          top: 10,
          left: 1,
          right: 1,
          bottom: selectedPeriod.value === 'launchCycleCompare' ? 80 : 54,
          containLabel: true,
        },
        xAxis: {
          ...xAxisBase,
          type: 'category',
          data: chartColumns.value,
        },
        yAxis: [
          {
            ...yAxisBase,
            type: 'value',
            name: `量 (${countLabel})`,
            nameTextStyle: { ...yAxisBase.nameTextStyle, align: 'right' },
            axisLabel: {
              color: '#999',
              formatter(value: number) {
                const { value: v, unit } = formatNumberObj(value);
                return `${v}${unit}`;
              },
            },
          },
          {
            ...yAxisBase,
            type: 'value',
            name: `率 (${rateLabel})`,
            nameTextStyle: { ...yAxisBase.nameTextStyle, align: 'left' },
            splitLine: { show: false },
            axisLabel: {
              color: '#999',
              formatter(value: number) {
                return formatRate(value, { maximumFractionDigits: 2 });
              },
            },
          },
        ],
        series: series.map((s) => {
          const { isRate: _, ...rest } = s;
          return rest;
        }),
      };
    }

    chart.setOption(option, true);
  };
  const lineChartRef = useTemplateRef<HTMLElement | null>('lineChartRef');
  const init = () => {
    initEcharts(lineChartRef.value!);
  };
  // 切换退款口径时，若当前选择了「上市周期对比」则自动重置为月累或年累
  watch(selectedReturnType, (val) => {
    if (val === 'refundAmount' && selectedPeriod.value === 'launchCycleCompare') {
      if (searchParams.dateType === 'month') {
        selectedPeriod.value = 'monthAccumulate';
      } else if (searchParams.dateType === 'year') {
        selectedPeriod.value = 'yearAccumulate';
      } else if (searchParams.dateType === 'week') {
        selectedPeriod.value = 'weekNaturalCompare';
      }
    }
  });

  // 监听图表数据来源变化及 selectedPeriod / selectedReturnType 切换，触发图表重绘
  watch(
    [vocChartSeries, returnChartSeries, selectedPeriod, selectedReturnType],
    () => {
      nextTick(() => {
        init();
      });
    },
    { immediate: true, deep: true }
  );
  // ---- 列表模式 ----
  // 根据 type / selectedPeriod / selectedReturnType 决定各指标字段名和列头
  const tableMetricConfig = computed(() => {
    // 退货/退款
    if (props.type === 'return') {
      const { countField, rateField, countLabel, rateLabel } = returnMetricConfig.value;
      return {
        vocCountField: countField,
        vocCountLabel: countLabel,
        vocRateField: rateField,
        vocRateLabel: rateLabel,
        salesAmountField:
          selectedPeriod.value === 'yearAccumulate' ? 'salesAmountCumulative' : 'salesAmount',
        saleQtyField: selectedPeriod.value === 'yearAccumulate' ? 'saleQtyCumulative' : 'saleQty',
      };
    }

    // VOC
    const { countField, rateField, countLabel, rateLabel } = vocMetricConfig.value;
    return {
        vocCountField: countField,
        vocCountLabel: countLabel,
        vocRateField: rateField,
        vocRateLabel: rateLabel,
        salesAmountField:
          selectedPeriod.value === 'yearAccumulate' ? 'salesAmountCumulative' : 'salesAmount',
        saleQtyField: selectedPeriod.value === 'yearAccumulate' ? 'saleQtyCumulative' : 'saleQty',
      };
  });

  // 列头时间列：最新在左（倒序），上市周期对比只取近 10 条
  const tableColumns = computed(() => {
    const cols = [...(activeTrend.value?.columns || [])];
    if (selectedPeriod.value === 'launchCycleCompare') {
      return cols.slice(0, 10);
    }
    return cols;
  });

  // 安全取单元格对应字段值
  const getCellVal = (row: any, col: string, field: string) => {
    return row[col]?.[field] ?? null;
  };

  // 列表行数据：合计行 + 各 SPU 行，只保留 tableColumns 对应列
  const tableData = computed(() => {
    const trend = activeTrend.value;
    if (!trend) return [];
    const cols = tableColumns.value;
    const { vocCountField, vocRateField, saleQtyField, salesAmountField } = tableMetricConfig.value;

    const isYearAccumulate = selectedPeriod.value === 'yearAccumulate';
    const isLaunchCycleCompare = selectedPeriod.value === 'launchCycleCompare';
    const spuTrendAny = isLaunchCycleCompare ? props.spuLaunchCycleReturnTrend : props.spuTrend;

    let totalCountMap: Record<string, number> | undefined;
    let totalRateMap: Record<string, number> | undefined;

    if (props.type === 'return') {
      // 退货/退款合计字段来自 returnMetricConfig
      const { totalCountField, totalRateField } = returnMetricConfig.value;
      totalCountMap = spuTrendAny?.[totalCountField] as Record<string, number> | undefined;
      totalRateMap = spuTrendAny?.[totalRateField] as Record<string, number> | undefined;
    } else {
      // VOC 合计字段
      const totalVocCountField = isYearAccumulate ? 'totalVocCountCumulative' : 'totalVocCount';
      const totalVocRateField = isYearAccumulate ? 'totalCumulativeVocProp' : 'totalVocProp';
      totalCountMap = spuTrendAny?.[totalVocCountField] as Record<string, number> | undefined;
      totalRateMap = spuTrendAny?.[totalVocRateField] as Record<string, number> | undefined;
    }

    const totalSaleQtyField = isYearAccumulate ? 'totalSaleQtyCumulative' : 'totalSaleQty';
    const totalSalesAmountField = isYearAccumulate
      ? 'totalSalesAmountCumulative'
      : 'totalSalesAmount';
    const totalSaleQtyMap = spuTrendAny?.[totalSaleQtyField] as Record<string, number> | undefined;
    const totalSalesAmountMap = spuTrendAny?.[totalSalesAmountField] as
      | Record<string, number>
      | undefined;

    const totalRow: Record<string, any> = { spuName: '合计', isTotal: true };
    cols.forEach((col) => {
      totalRow[col] = {
        [vocCountField]: totalCountMap?.[col],
        [vocRateField]: totalRateMap?.[col],
        [saleQtyField]: totalSaleQtyMap?.[col],
        [salesAmountField]: totalSalesAmountMap?.[col],
      };
    });

    // SPU 行：只保留当前展示列的数据
    const spuRows = (trend.rows || []).map((row: any) => {
      const r: Record<string, any> = { spuName: row.spuName };
      cols.forEach((col) => {
        r[col] = row[col];
      });
      return r;
    });

    return [totalRow, ...spuRows];
  });

  const handleSelectSpu = (row: any) => {
    if (row.isTotal) return;
    spuName.value = row.spuName;
  };

  const handleColCellClick = (row: any, col: string, field: string) => {
    if (row.isTotal) return;
    const payload: Record<string, any> = {
      moduleType: 'productAnalysis',
      spuNameList: row.spuName,
      date: col,
    };
    if (field.toLowerCase().includes('cumulative')) {
      payload.dateType = 'year';
    }
    emit('skipParticulars', payload);
  };

  // ---- 列表排序 ----
  const tableRef = useTemplateRef<any>('tableRef');

  const sortState = ref<{ columnKey: string; order: 'descending' | 'ascending' | null }>({
    columnKey: '',
    order: null,
  });

  const handleSort = ({ column, order }: { column: any; order: string | null }) => {
    sortState.value = { columnKey: column?.columnKey ?? '', order: order as any };
  };

  // metric 逻辑标识 → 当前实际字段名的映射
  const metricToField = computed(() => {
    const { saleQtyField, salesAmountField, vocCountField, vocRateField } = tableMetricConfig.value;
    return {
      saleQty: saleQtyField,
      salesAmount: salesAmountField,
      vocCount: vocCountField,
      vocRate: vocRateField,
    } as Record<string, string>;
  });

  // 合计行置顶，SPU 行按当前排序列排序；空值始终排末尾
  const sortedTableData = computed(() => {
    const rows = tableData.value;
    const totalRows = rows.filter((r: any) => r.isTotal);
    const spuRows = rows.filter((r: any) => !r.isTotal);

    const { columnKey, order } = sortState.value;
    if (!columnKey || !order) return [...totalRows, ...spuRows];

    // columnKey 格式：`${col}||${metric}`，metric 是稳定的逻辑标识
    const sepIdx = columnKey.indexOf('||');
    const col = columnKey.slice(0, sepIdx);
    const metric = columnKey.slice(sepIdx + 2);
    // 从当前配置中取实际字段名，保证切换口径后始终对应正确字段
    const field = metricToField.value[metric];
    if (!field) return [...totalRows, ...spuRows];

    const sorted = [...spuRows].sort((a: any, b: any) => {
      const aVal = a[col]?.[field] ?? null;
      const bVal = b[col]?.[field] ?? null;
      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;
      return order === 'ascending' ? aVal - bVal : bVal - aVal;
    });

    return [...totalRows, ...sorted];
  });

  // 切换统计口径或退货/退款类型时：同时重置数据状态和表格 UI 箭头
  const resetSort = () => {
    sortState.value = { columnKey: '', order: null };
    nextTick(() => {
      tableRef.value?.clearSort();
    });
  };

  watch([selectedPeriod, selectedReturnType], resetSort);
</script>

<style scoped lang="scss">
  .product-analysis {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    .operation {
      margin-left: auto;
      display: flex;
      align-items: center;
      column-gap: 8px;
      font-size: 14px;
      color: #1f1f1f;
      .operation-item-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .el-select {
        min-width: 72px;
        width: unset;
        :deep(.el-select__placeholder) {
          width: unset;
          position: initial;
          transform: initial;
        }
        :deep(.el-tag) {
          max-width: unset !important;
        }
      }
    }
  }
  .chart-container {
    width: 100%;
    .chart-area {
      width: 100%;
      height: 405px;
    }
  }
  :deep(.highlight-row) {
    --el-table-row-hover-bg-color: transparent;
    --el-table-border: var(---P6, #02b96b);
    background-color: var(---P1, #f0fff6);
    box-shadow: inset 0 0 0 1px var(---P6, #02b96b);
  }
  .clickable {
    line-height: 20px;
    cursor: pointer;
    border-bottom: 1px dashed var(---N5, #c5c5c5);
    &:hover {
      color: var(---P6, #02b96b);
      border-color: currentColor;
    }
  }
  :deep(.el-table thead.is-group th.el-table__cell) {
    border-color: white;
  }
  :deep(.el-table.is-scrolling-left th.el-table-fixed-column--left) {
    border-color: white !important;
  }
</style>
