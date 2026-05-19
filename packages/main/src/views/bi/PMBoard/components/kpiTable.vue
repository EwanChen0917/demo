<template>
  <div class="pm-sales-data" v-loading="loading">
    <div class="sales-data__title">
      <span>KPI达成排行榜</span>
      <div class="operation">
        <ConfigColumns
          v-if="searchParams.dateType !== 'week'"
          ref="selectPropertyRef"
          title="自定义列"
          :width="748"
          bindClass="custom-col"
          moduleType="list"
          :property-list-prop="[propertyList]"
          @success="configColumns"
        />
        <el-radio-group v-model="type">
          <el-radio-button value="spuSalesAnalysisList">BY SPU</el-radio-button>
          <el-radio-button value="developerSpuSalesAnalysisList">BY 产品经理</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="table-container">
      <vxe-grid
        ref="gridRef"
        v-bind="gridOptions"
        :columns="columns"
        max-height="480px"
        :data="dataList"
      >
        <template #rank="{ rowIndex }">
          <img
            v-if="rowIndex < 3"
            class="rank-img"
            :src="getImg(`kpiRank${rowIndex + 1}.png`)"
            alt=""
          />
          <span v-else>{{ rowIndex + 1 }}</span>
        </template>
        <template #spuName="{ row }">
          <img class="spu-img" :src="row.spuImg" alt="" />
          <span>{{ row.spuName }}</span>
        </template>
        <template #number="{ row, column }">
          <span :class="row[column.field] > 0 ? 'positive' : 'negative'">
            {{ formatMoneyObj(row[column.field]) }}
          </span>
        </template>
        <template #percent="{ row, column }">
          <span :class="row[column.field] > 0 ? 'positive' : 'negative'">
            {{ formatPercent(row[column.field]) }}%
          </span>
        </template>
        <template #score="{ row, column }">
          <div class="score-tag" :class="`score-${ScoreLevel[row.scoreLevel]}`">
            <SvgIcon v-if="row.scoreLevel" :icon="ScoreLevel[row.scoreLevel]" />
            <span class="score-text">
              {{ row.score?.toFixed(1) ?? '-' }}&nbsp;{{ row.scoreLevel }}
            </span>
          </div>
        </template>
        <template #completion="{ row, column }">
          <span :class="ScoreLevel[row[`${column.field}HealthLevel`]]">
            {{ formatPercent(row[`${column.field}CompletionRate`]) }}% |
            {{ row[`${column.field}HealthLevel`] }}
          </span>
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

  // 标签自动布局、全局过渡动画等特性

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
  const type = ref('spuSalesAnalysisList');
  const detailData = inject<Reactive<any>>('detailData', {});
  const dataList = computed(() => {
    return detailData[type.value] || [];
  });

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
        key: 'budgetSalesAmount',
        label: '销售额目标',
        align: 'right',
        minWidth: 120,
        sortable: true,
        slots: { default: 'number' },
        treeNode: true,
        checked: true,
        readonly: true,
      },
      {
        key: 'actualSalesAmount',
        label: '销售额实际',
        align: 'right',
        minWidth: 120,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'salesAmountDiff',
        label: '销售额差值',
        align: 'right',
        minWidth: 114,
        className: 'diff-color',
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'salesAmount',
        label: '销售额达成率',
        align: 'right',
        minWidth: 124,
        sortable: true,
        slots: { default: 'completion' },
        checked: true,
      },
      {
        key: 'budgetGtmGrossProfit',
        label: '毛利额目标',
        align: 'right',
        minWidth: 120,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'actualGtmGrossProfit',
        label: '毛利额实际',
        align: 'right',
        minWidth: 120,
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'gtmGrossProfitDiff',
        label: '毛利额差值',
        align: 'right',
        minWidth: 102,
        className: 'diff-color',
        sortable: true,
        slots: { default: 'number' },
        checked: true,
      },
      {
        key: 'gtmGrossProfit',
        label: '毛利额达成率',
        align: 'right',
        minWidth: 114,
        sortable: true,
        slots: { default: 'completion' },
        checked: true,
      },
      {
        key: 'budgetGtmGrossProfitRate',
        label: '毛利率目标',
        align: 'right',
        minWidth: 102,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'actualGtmGrossProfitRate',
        label: '毛利率实际',
        align: 'right',
        minWidth: 102,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'gtmGrossProfitRateDiff',
        label: '毛利率差值',
        align: 'right',
        minWidth: 102,
        className: 'diff-color',
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'budgetRefundAmountRate',
        label: '退款率目标',
        align: 'right',
        minWidth: 102,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'actualRefundAmountRate',
        label: '退款率实际',
        align: 'right',
        minWidth: 102,
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
      {
        key: 'refundAmountRateDiff',
        label: '退款率差值',
        align: 'right',
        minWidth: 102,
        className: 'diff-color',
        sortable: true,
        slots: { default: 'percent' },
        checked: true,
      },
    ],
  });
  const loading = inject<Ref<boolean>>('loading', ref(false));
  const columns = computed(() => {
    if (props.searchParams.dateType === 'week') {
      return [
        {
          title: '排名',
          width: 52,
          align: 'center',
          // fixed: 'left',
          slots: { default: 'rank' },
        },
        {
          ...(type.value === 'spuSalesAnalysisList'
            ? { field: 'spuName', title: 'SPU名称', slots: { default: 'spuName' } }
            : { field: 'developerName', title: '产品经理' }),
          minWidth: 200,
          // fixed: 'left',
        },
        {
          field: 'actualSalesAmount',
          title: '销售额实际',
          minWidth: 120,
          align: 'right',
          sortable: true,
          slots: { default: 'number' },
          checked: true,
        },
        {
          field: 'actualGtmGrossProfit',
          title: '毛利额实际',
          minWidth: 120,
          align: 'right',
          sortable: true,
          slots: { default: 'number' },
          checked: true,
        },
        {
          field: 'actualGtmGrossProfitRate',
          title: '毛利率实际',
          minWidth: 102,
          align: 'right',
          sortable: true,
          slots: { default: 'percent' },
          checked: true,
        },
        {
          field: 'actualRefundAmountRate',
          title: '退款率实际',
          minWidth: 102,
          align: 'right',
          sortable: true,
          slots: { default: 'percent' },
          checked: true,
        },
      ];
    }
    const properties = propertyList.propertyArr
      .filter((item) => item.checked)
      .map((item) => {
        const { key: field, label: title, ...rest } = item;
        return {
          field,
          title,
          minWidth: 120,
          ...rest,
        };
      });
    return [
      {
        title: '排名',
        width: 52,
        align: 'center',
        // fixed: 'left',
        slots: { default: 'rank' },
      },
      {
        ...(type.value === 'spuSalesAnalysisList'
          ? { field: 'spuName', title: 'SPU名称', slots: { default: 'spuName' } }
          : { field: 'developerName', title: '产品经理' }),
        minWidth: 200,
        // fixed: 'left',
      },
      ...properties,
    ];
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
        column-gap: 24px;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
    .score-tag {
      padding: 0 4px;
      border-radius: 4px;
      font-size: 0;
      height: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      gap: 2px;
      .svg-icon {
        font-size: 10px;
        :deep(svg) {
          width: 12px;
          height: 12px;
        }
      }
    }
    .score-regular {
      background: var(---l5, #fffaeb);
      color: var(---C5, #ff9f22);
      --bs-text-muted: #ff9f22;
    }
    .score-good {
      background: var(---l4, #e8fff1);
      color: var(---C4, #02b96b);
      --bs-text-muted: #02b96b;
    }
    .score-poor {
      background: var(---l8, #ffe8f1);
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
  .spu-img {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    object-fit: contain;
    margin-right: 12px;
  }
  .rank-img {
    width: 20px;
    height: 20px;
  }
  :deep(.diff-color) {
    & .positive {
      color: #02b96b;
    }
    & .negative {
      color: #f53f3f;
    }
  }
  .good {
    color: #02b96b;
  }
  .regular {
    color: #ff9f22;
  }
  .poor {
    color: #f53f3f;
  }
</style>
