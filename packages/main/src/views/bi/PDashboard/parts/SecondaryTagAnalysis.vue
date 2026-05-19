<template>
  <BiCard :title="type === 'voc' ? '产品问题累计VOC标签TOP5' : '产品问题累计退货留言TOP5'">
    <div class="secondary-tag-analysis">
      <div class="chart-area" ref="chartRef"></div>
      <div class="table-container">
        <vxe-grid
          ref="gridRef"
          v-bind="gridOptions"
          :columns="columns"
          :data="dataList"
          :round="true"
          @cell-click="handleCellClick"
        >
          <template #name="{ row, column }">
            <span :class="{ 'hover-underline': !row.isTotal }">
              {{ row[column.field] }}
            </span>
          </template>
          <template #voc="{ row, column }">
            <span>
              {{ row.isRate ? formatRate(row[column.field]) : formatNumberObj(row[column.field]) }}
            </span>
          </template>
        </vxe-grid>
      </div>
    </div>
  </BiCard>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import { TreemapChart } from 'echarts/charts';
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
  import { VxeColumnProps } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';
  import { useResizeObserver } from '@vueuse/core';
  import BiCard from '../../components/BiCard.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    TreemapChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const props = defineProps<{
    // 二级标签列表
    level2List?: BiContracts.ProductManagerLevelDO[];
    // 二级标签趋势数据
    level2Trend?: BiContracts.ProductManagerLevelTrendVO;
    type: 'voc' | 'return';
  }>();

  const emit = defineEmits<{
    skipParticulars: [payload: { level2: string; level3?: string; date?: string }];
  }>();
  const searchParams = inject<BiContracts.CommonAnalysisReq>('searchParams')!;
  const color = [
    ['#FFFAF3', '#FF9F22'],
    ['#F2F9FF', '#258DFF'],
    ['#EFF9F6', '#02B96B'],
    ['#FCF9FF', '#A55BF5'],
  ];
  const treemapData = computed(() => {
    return props.level2List?.map((item, index) => {
      return {
        value: item.vocCount,
        name: item.level2,
        itemStyle: {
          color: color[index % color.length][0],
        },
        emphasis: {
          itemStyle: {
            color: color[index % color.length][0],
            borderColor: color[index % color.length][1],
          },
        },
        ext: {
          vocProp: item?.vocProp,
          cumulativeVocProp: item?.cumulativeVocProp,
        },
      };
    });
  });

  let chart: any = null;

  const initEcharts = (el: HTMLElement) => {
    if (!chart) {
      chart = echarts.init(el);
      useResizeObserver(el, () => {
        chart.resize();
      });
    }
    const option = {
      tooltip: {
        trigger: 'item',
        lineStyle: {
          type: 'dashed',
          width: 1,
        },
        formatter: (params: any) => {
          const data = params.data?.ext || {};
          return `
          <div style="color: #1F1F1F; font-size: 12px;">${params.name}</div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">${
              props.type === 'voc' ? 'VOC量' : '退货量'
            }：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${formatNumberObj(
              params.value
            ).toString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
            <span style="color: #666; font-size: 12px;">${
              ['month', 'year'].includes(searchParams.dateType!)
                ? props.type === 'voc'
                  ? 'VOC率(年累)'
                  : '退货率(年累)'
                : props.type === 'voc'
                ? 'VOC率'
                : '退货率'
            }：</span>
            <span style="color: #1F1F1F; font-size: 12px;">${formatRate(
              ['month', 'year'].includes(searchParams.dateType!)
                ? data.cumulativeVocProp
                : data.vocProp,
              { maximumFractionDigits: 2 }
            )}</span>
          </div>
          `;
        },
      },

      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 'auto',
        containLabel: true,
      },
      series: [
        {
          type: 'treemap',
          data: treemapData.value || [],
          width: '100%',
          height: '100%',
          nodeClick: false, // 点击无反应
          roam: false, // 禁止缩放
          label: {
            padding: [10, 12],
            formatter(a) {
              return `{a|${a.name}}\n{b|${
                props.type === 'voc' ? 'VOC数量' : '退数量'
              }:} {c|${formatNumberObj(a.data.value).toString()}}\n${
                ['month', 'year'].includes(searchParams.dateType!)
                  ? `{b|${props.type === 'voc' ? 'VOC率(年累)' : '退货率(年累)'}:} {c|${formatRate(
                      a.data.ext?.cumulativeVocProp
                    )}}`
                  : `{b|${props.type === 'voc' ? 'VOC率' : '退货率'}:} {c|${formatRate(
                      a.data.ext?.vocProp
                    )}}`
              }`;
            },
            rich: {
              a: {
                fontSize: 13,
                color: '#1F1F1F',
                fontWeight: 600,
                lineHeight: 22,
                padding: [0, 0, 10, 0],
              },
              b: {
                fontSize: 12,
                color: '#999',
                lineHeight: 20,
                padding: [0, 0, 6, 0],
              },
              c: {
                fontSize: 12,
                color: '#1F1F1F',
                padding: [0, 0, 6, 0],
              },
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 4,
          },
          breadcrumb: {
            show: false,
          },
        },
      ],
    };
    chart.setOption(option);
  };
  const chartRef = useTemplateRef<HTMLElement | null>('chartRef');
  const init = () => {
    initEcharts(chartRef.value!);
  };
  watch(
    () => treemapData.value,
    () => {
      nextTick(() => {
        init();
      });
    }
  );

  const drillDownPath = computed(() => {
    // 品类维度
    return ['level2', 'level3'];
  });
  const dataList = ref<any>([]);
  watch(
    () => props.level2Trend,
    (newVal) => {
      const totalRow = {
        name: '合计：',
        isTotal: true,
        id: 'total',
        hasChild: false,
        ...(newVal?.[props.type === 'voc' ? 'totalVocCount' : 'totalReturnQty'] ||
          Object.create(null)),
      };
      const vocProp = {
        name: ['month', 'year'].includes(searchParams.dateType!)
          ? `${props.type === 'voc' ? 'VOC率(年累)' : '退货率(年累)'}：`
          : `${props.type === 'voc' ? 'VOC率' : '退货率'}：`,
        isTotal: true,
        id: ['month', 'year'].includes(searchParams.dateType!) ? 'cumulativeProp' : 'prop',
        isRate: true,
        hasChild: false,
        ...((['month', 'year'].includes(searchParams.dateType!)
          ? newVal?.[props.type === 'voc' ? 'totalCumulativeVocProp' : 'totalReturnRateCumulative']
          : newVal?.[props.type === 'voc' ? 'totalVocProp' : 'totalReturnRate']) ||
          Object.create(null)),
      };

      const rows =
        newVal?.rows?.map((item, index) => {
          return {
            ...item,
            name: item[drillDownPath.value[0]],
            dimension: drillDownPath.value[0],
            dimensionValue: item[drillDownPath.value[0]] ?? '',
            dimensionList: [
              {
                dimension: drillDownPath.value[0],
                dimensionValue: item[drillDownPath.value[0]] ?? '',
              },
            ],
            id: index,
            // level: 1,
            parentId: null,
            hasChild: true,
            children: [],
          };
        }) || [];
      dataList.value = [totalRow, vocProp, ...rows];
    },
    { immediate: true }
  );
  const getDimensionAnalysis = async (row) => {
    const fetchList =
      props.type === 'voc'
        ? [biApi.biProductManagerQueryLevel3ByLevel2]
        : [biApi.biProductManagerQueryReturnLevel3ByLevel2];
    const res: any = await fetchList[row.dimensionList.length - 1]({
      ...searchParams,
      [row.dimension]: row.dimensionValue,
    });
    if (res) {
      return (
        res.level2Trend.rows.map((item, idx) => {
          const id = `${row.id}-${idx}`;
          return {
            ...item,
            level2: row.dimension === 'level2' ? row.dimensionValue : row.level2,
            id,
            dimension: drillDownPath.value[row.dimensionList.length],
            dimensionValue: item[drillDownPath.value[row.dimensionList.length]] ?? '',
            name: item[drillDownPath.value[row.dimensionList.length]],
            parentId: row.id,
            hasChild: false,
            children: [],
          };
        }) || []
      );
    }
    return [];
  };
  const gridOptions = {
    border: false,
    showOverflow: true,
    size: 'small' as const,
    rowClassName: ({ row }) => {
      if (row.isTotal) {
        return 'total-row';
      }
      if (row.hasChild === false) {
        return 'leaf-row cursor-pointer';
      }
      return 'cursor-pointer';
    },
    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'parentId',
      accordion: true,
      lazy: true,
      hasChild: 'hasChild',
      iconOpen: 'vxe-custom--square-plus vxe-custom--square-minus',
      iconClose: 'vxe-custom--square-plus',
      loadMethod({ row }) {
        // 异步加载子节点
        return new Promise((resolve) => {
          getDimensionAnalysis(row).then((res: any) => {
            resolve(res);
          });
        });
      },
    },
  };
  const columns: Ref<VxeColumnProps[]> = computed(() => [
    {
      field: 'name',
      title: '二级/三级',
      minWidth: 125,
      fixed: 'left' as const,
      treeNode: true,
      slots: {
        default: 'name',
      },
    },
    ...(props.level2Trend?.columns?.map((col) => {
      return {
        field: col,
        title: col,
        minWidth: 120,
        sortable: true,
        align: 'right' as const,
        slots: {
          default: 'voc',
        },
      };
    }) || []),
  ]);
  const handleCellClick = ({ row, column }) => {
    if (row.isTotal) {
      return;
    }
    const payload = {
      level3: row.level3,
      level2: row.level2,
    };
    if (column.property !== 'name') {
      emit('skipParticulars', {
        ...payload,
        date: column.property,
      });
      return;
    }
    emit('skipParticulars', payload);
  };
</script>

<style lang="scss" scoped>
  .secondary-tag-analysis {
    display: flex;
    column-gap: 30px;
    .chart-area {
      width: 0;
      flex: 1;
    }
    .table-container {
      width: 0;
      flex: 2.2;
      :deep(.total-row),
      :deep(.leaf-row) {
        background-color: var(---N1, #f7f7f7);
      }
    }
  }
  .hover-underline {
    margin-left: 12px;
    &:hover {
      border-bottom: 1px dashed var(---N5, #c5c5c5);
      line-height: 20px;
      cursor: pointer;
    }
  }
</style>
