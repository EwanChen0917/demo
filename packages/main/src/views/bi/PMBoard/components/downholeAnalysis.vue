<template>
  <div class="pm-sales-data">
    <div class="sales-data__title">
      <span>销售明细分析</span>
      <div class="operation">
        <ConfigColumns
          ref="selectPropertyRef"
          title="自定义列"
          :width="748"
          bindClass="custom-col"
          moduleType="list"
          :property-list-prop="[propertyList]"
          @success="configColumns"
        />
      </div>
    </div>
    <div class="table-container" v-loading="loading">
      <vxe-grid ref="gridRef" v-bind="gridOptions" :columns="columns" :data="dataList">
        <template #number="{ row, column }">
          <span>{{ formatMoneyObj(row[column.field]) }}</span>
        </template>
        <template #percent="{ row, column }">
          <span>{{ formatPercent(row[column.field]) }}%</span>
        </template>
        <template #score="{ row, column }">
          <el-popover trigger="click" placement="left-end">
            <template #reference>
              <div class="score-tag" :class="`score-${ScoreLevel[row.scoreLevel]}`">
                <SvgIcon v-if="row.scoreLevel" :icon="ScoreLevel[row.scoreLevel]" />
                <span class="score-text">
                  {{ row.score?.toFixed(1) ?? '-' }}&nbsp;{{ row.scoreLevel }}
                </span>
              </div>
            </template>
            <div class="score-popover-content">
              <div class="score-trend-title">评分趋势</div>
              <div class="score-trend">
                <DataEchart v-if="row.scoreTrendList" :data="row.scoreTrendList" color="#02B96B" />
              </div>
            </div>
          </el-popover>
        </template>
        <template #amazonRank="{ row, column }">
          <img
            class="rank-img"
            v-if="row[column.field] && row[column.field] < 4"
            :src="getImg(`kpiRank${+row[column.field]}.png`)"
            alt=""
          />
          <span>{{ row[column.field] === null ? '-' : `Top${row[column.field]}` }}</span>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Reactive, useTemplateRef } from 'vue';
  import { biApi } from '@/api';
  import type { VxeColumnProps } from 'vxe-table';
  import { formatMoneyObj, formatPercent } from '../../utils/utils';
  import DataEchart from '../../components/trendEcharts.vue';

  // 标签自动布局、全局过渡动画等特性
  const loading = inject('loading', ref(false));
  enum ScoreLevel {
    'good' = '优秀',
    '优秀' = 'good',
    'regular' = '良好',
    '良好' = 'regular',
    'poor' = '警惕',
    '警惕' = 'poor',
  }
  const props = defineProps<{
    searchParams: any;
  }>();
  const selectPropertyRef =
    useTemplateRef<InstanceType<typeof SelectProperty>>('selectPropertyRef');
  const type = ref('drillDownByArea');
  const drillDownPath = computed(() => {
    // 品类维度
    return ['category', 'spuName'];
  });
  const detailData = inject<Reactive<any>>('detailData', {});
  const dataList = computed(() => {
    return (
      detailData.drillDownByCategoryList?.map((item, index) => {
        return {
          ...item,
          name: item[drillDownPath.value[0]],
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
      }) || []
    );
  });

  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biDeveloperSalesQueryDimensionAnalysis({
      ...props.searchParams,
      dimensionList: row.dimensionList || [],
      dimensionType: row.dimensionType,
    });
    if (res) {
      return (
        res.drillDownByCategoryList.map((item, idx) => {
          const id = `${row.id}-${idx}`;
          let hasChild = true;
          const dimensionList = [
            ...(row.dimensionList || []),
            {
              dimension: drillDownPath.value[row.dimensionList.length],
              dimensionValue: item[drillDownPath.value[row.dimensionList.length]] ?? '',
            },
          ];
          if (dimensionList.length === drillDownPath.value.length) {
            hasChild = false;
          }
          // if (row.level === 1) {
          //   id = `${item.area}${item.country}`;
          //   hasChild = true;
          // } else if (row.level === 2) {
          //   id = `${item.area}${item.country}${item.platform}`;
          //   hasChild = true;
          // } else if (row.level === 3) {
          //   id = `${item.area}${item.country}${item.platform}${item.category}`;
          //   hasChild = true;
          // } else {
          //   id = `${item.area}${item.country}${item.platform}${item.category}${item.spuName}`;
          //   hasChild = false;
          // }
          return {
            ...item,
            id,
            name: item[drillDownPath.value[row.dimensionList.length]],
            dimensionList,
            parentId: row.id,
            hasChild,
            children: [],
          };
        }) || []
      );
    }
    return [];
  };
  const propertyList = reactive<{
    title: string;
    propertyArr: Array<
      {
        key: string;
        label: string;
        checked: boolean;
        readonly?: boolean;
      } & VxeColumnProps & {
          slots?: {
            default: string;
          };
        }
    >;
  }>({
    title: '可选',
    propertyArr: [
      {
        key: 'name',
        label: '三级品类/SPU',
        fixed: 'left',
        minWidth: 206,
        sortable: true,
        treeNode: true,
        checked: true,
        readonly: true,
      },
      {
        key: 'saleQty',
        label: '销量',
        minWidth: 94,
        align: 'right',
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'saleQtyRate',
        label: '销量占比',
        minWidth: 94,
        align: 'right',

        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'salesAmount',
        label: '销售额',
        minWidth: 120,
        align: 'right',

        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'salesAmountRate',
        label: '销售额占比',
        minWidth: 102,
        align: 'right',
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'mainBusinessIncome',
        label: '营收收入',
        minWidth: 120,
        align: 'right',
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'mainBusinessIncomeRate',
        label: '营收收入占比',
        minWidth: 114,
        align: 'right',
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'grossProfitAmount',
        label: '毛利额',
        minWidth: 120,
        align: 'right',
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'grossProfitAmountRate',
        label: '毛利额占比',
        minWidth: 102,
        align: 'right',
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'grossProfitRate',
        label: '毛利率',
        minWidth: 94,
        align: 'right',
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'refundAmountRate',
        label: '退款率',
        minWidth: 94,
        align: 'right',
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'score',
        label: '评分',
        minWidth: 94,
        align: 'right',

        sortable: true,
        slots: { default: 'score' },
        checked: true,
      },
      {
        key: 'top3AvgScore',
        label: '垂直TOP3平均评分',
        minWidth: 146,

        align: 'right',
        formatter: ({ row }) => {
          return row.top3AvgScore ? `${row.top3AvgScore.toFixed(1)}分` : '-';
        },
        sortable: true,
        checked: true,
      },
      {
        key: 'amazonCategoryRanking',
        label: '亚马逊小类排名',
        minWidth: 126,
        align: 'right',
        slots: { default: 'amazonRank' },
        sortable: true,
        checked: true,
      },
      {
        key: 'adCost',
        label: '推广费',
        minWidth: 120,
        align: 'right',

        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'adCostRate',
        label: '推广费率',
        align: 'right',

        minWidth: 94,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'inventoryTurnoverDays',
        label: '库存周转天数',
        minWidth: 114,
        align: 'right',

        sortable: true,
        checked: true,
        formatter: ({ row }) => {
          return row.inventoryTurnoverDays
            ? `${Intl.NumberFormat('zh-CN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(row.inventoryTurnoverDays)}天`
            : '-';
        },
      },
      {
        key: 'refundAmount',
        label: '退款额',
        minWidth: 120,
        align: 'right',

        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
    ],
  });
  const columns = computed(() => {
    return propertyList.propertyArr
      .filter((item) => item.checked)
      .map((item) => {
        const { key: field, label: title, ...rest } = item;
        return {
          field,
          title,
          minWidth: rest.minWidth || 120,
          ...rest,
        };
      });
  });
  const gridOptions = computed(() => {
    return {
      border: false,
      showOverflow: true,
      maxHeight: 480,
      virtualYConfig: {
        enabled: true,
        gt: 0,
      },
      cellConfig: {
        height: 48,
      },
      treeConfig: {
        transform: true,
        rowField: 'id',
        parentField: 'parentId',
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
  });
  const configColumns = (config) => {
    propertyList.propertyArr.forEach((item) => {
      const col = config.find((c) => c === item.key);
      if (col) {
        item.checked = false;
      } else {
        item.checked = true;
      }
    });
  };
  const getImg = (name: string) => {
    return new URL(`../../../../assets/images/${name}`, import.meta.url).href;
  };
</script>

<style scoped lang="scss">
  .pm-sales-data {
    --vxe-ui-font-size-default: 12px;
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
      margin-bottom: 24px;
      padding-left: 8px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background-color: #02b96b;
        margin-right: 8px;
        border-radius: 15px;
      }
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
    .score-tag {
      cursor: pointer;
      padding: 0 4px;
      border-radius: 4px;
      height: 20px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      gap: 2px;
      border-bottom: 1px dashed #c5c5c5;
      .svg-icon {
        font-size: 10px;
        :deep(svg) {
          width: 12px;
          height: 12px;
        }
      }
    }
    .score-regular {
      color: var(---C5, #ff9f22);
      --bs-text-muted: #ff9f22;
    }
    .score-good {
      color: var(---C4, #02b96b);
      --bs-text-muted: #02b96b;
    }
    .score-poor {
      color: var(---C7, #f53f3f);
      --bs-text-muted: #f53f3f;
    }
    .returnRate:not(.disabled):hover {
      cursor: pointer;
      color: #02b96b;
    }
    .returnRate.disabled {
      cursor: not-allowed;
    }
    :deep(.table--tree-node-leaf) {
      border-bottom: 1px solid var(---N2, #f5f5f5);
      background: var(---N1, #f7f7f7);
    }
  }
  .rank-img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
  .score-popover-content {
    display: flex;
    width: 159px;
    padding: 12px 16px 16px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    .score-trend-title {
      color: var(---N8, #666);

      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
    }
    .score-trend {
      width: 127px;
      height: 60px;
      flex-shrink: 0;
    }
  }
</style>
