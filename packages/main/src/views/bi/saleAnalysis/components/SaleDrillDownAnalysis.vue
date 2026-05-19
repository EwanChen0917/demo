<template>
  <div class="sales-data">
    <div class="sales-data__title">
      多维分析
      <span class="operation">
        <el-radio-group v-model="type">
          <el-radio-button value="drillDownByPlatform">BY平台维度</el-radio-button>
          <el-radio-button value="drillDownByArea">BY区域维度</el-radio-button>
          <el-radio-button value="drillDownByCategory">BY品类维度</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="table-container">
      <!-- <pre>{{ dataList }}</pre> -->
      <vxe-table
        border="full"
        ref="tableRef"
        :column-config="{ resizable: false }"
        :tree-config="treeConfig"
        :data="dataList"
        size="small"
        :round="true"
        min-height="400px"
      >
        <vxe-column
          min-width="156"
          field="name"
          title="区域/国家/平台/品类/SPU名称"
          tree-node
          fixed="left"
          :class-name="cellClassName"
        >
          <template #header>
            <template v-if="type === 'drillDownByArea'">区域/国家/平台</template>
            <template v-if="type === 'drillDownByPlatform'">平台/区域/国家</template>
            <template v-if="type === 'drillDownByCategory'">品类/区域/平台</template>
          </template>
          <template #default="{ row }">
            <div :style="{ paddingLeft: '10px' }">{{ row.name || '-' }}</div>
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="80"
          field="dateProgress"
          title="时间进度"
          align="left"
        >
          <template #default="{ row }">
            {{
              (row.dateProgress * 1)?.toLocaleString('zh-CN', {
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <!-- 销售额 -->
        <vxe-colgroup align="center" title="销售额">
          <vxe-column
            :class-name="cellClassName"
            min-width="93"
            field="budgetSalesAmount"
            title="目标 (万)"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{ formatNumberByBase(row.budgetSalesAmount, 10000, 2).toString() }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="93"
            field="actualSalesAmount"
            title="实际 (万)"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{ formatNumberByBase(row.actualSalesAmount, 10000, 2).toString() }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="84"
            field="salesAmountCompletionRate"
            title="达成率"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{
                (row.salesAmountCompletionRate * 1)?.toLocaleString('zh-CN', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) || '-'
              }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="90"
            field="salesAmountDiff"
            title="差值"
            align="left"
            sortable
          >
            <template #default="{ row }">
              <div class="score-tag">
                <SvgIcon
                  v-if="row.salesAmountHealthLevel"
                  :class="`score-${ScoreLevel[row.salesAmountHealthLevel]}`"
                  :icon="ScoreLevel[row.salesAmountHealthLevel]"
                />
                <span class="score-text">
                  {{
                    (row.salesAmountDiff * 1)?.toLocaleString('zh-CN', {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }) || '-'
                  }}
                </span>
              </div>
            </template>
          </vxe-column>
        </vxe-colgroup>
        <!-- 营业收入 -->
        <vxe-colgroup header-align="center" title="营业收入">
          <vxe-column
            :class-name="cellClassName"
            min-width="93"
            field="budgetMainBusinessIncome"
            title="目标 (万)"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{ formatNumberByBase(row.budgetMainBusinessIncome, 10000, 2).toString() }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="93"
            field="actualMainBusinessIncome"
            title="实际 (万)"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{ formatNumberByBase(row.actualMainBusinessIncome, 10000, 2).toString() }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="84"
            field="past30DaysSalesCost"
            title="达成率"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{
                (row.mainBusinessIncomeCompletionRate * 1)?.toLocaleString('zh-CN', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) || '-'
              }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="90"
            field="mainBusinessIncomeDiff"
            title="差值"
            align="left"
            sortable
          >
            <template #default="{ row }">
              <div class="score-tag">
                <SvgIcon
                  v-if="row.mainBusinessIncomeHealthLevel"
                  :class="`score-${ScoreLevel[row.mainBusinessIncomeHealthLevel]}`"
                  :icon="ScoreLevel[row.mainBusinessIncomeHealthLevel]"
                />
                <span class="score-text">
                  {{
                    (row.mainBusinessIncomeDiff * 1)?.toLocaleString('zh-CN', {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }) || '-'
                  }}
                </span>
              </div>
            </template>
          </vxe-column>
        </vxe-colgroup>
        <!-- 毛利额 -->
        <vxe-colgroup align="center" title="毛利额">
          <vxe-column
            :class-name="cellClassName"
            min-width="93"
            field="budgetGtmGrossProfit"
            title="目标 (万)"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{ formatNumberByBase(row.budgetGtmGrossProfit, 10000, 2).toString() || '-' }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="93"
            field="actualGtmGrossProfit"
            title="实际 (万)"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{ formatNumberByBase(row.actualGtmGrossProfit, 10000, 2).toString() || '-' }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="84"
            field="gtmGrossProfitCompletionRate"
            title="达成率"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{
                (row.gtmGrossProfitCompletionRate * 1)?.toLocaleString('zh-CN', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) || '-'
              }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="90"
            field="gtmGrossProfitDiff"
            title="差值"
            align="left"
            sortable
          >
            <template #default="{ row }">
              <div class="score-tag">
                <SvgIcon
                  v-if="row.gtmGrossProfitHealthLevel"
                  :class="`score-${ScoreLevel[row.gtmGrossProfitHealthLevel]}`"
                  :icon="ScoreLevel[row.gtmGrossProfitHealthLevel]"
                />
                <span class="score-text">
                  {{
                    (row.gtmGrossProfitDiff * 1)?.toLocaleString('zh-CN', {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }) || '-'
                  }}
                </span>
              </div>
            </template>
          </vxe-column>
        </vxe-colgroup>
        <!-- 毛利率 -->
        <vxe-colgroup align="center" title="毛利率">
          <vxe-column
            :class-name="cellClassName"
            min-width="84"
            field="budgetGtmGrossProfitRate"
            title="目标"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{
                (row.budgetGtmGrossProfitRate * 1)?.toLocaleString('zh-CN', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) || '-'
              }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="84"
            field="actualGtmGrossProfitRate"
            title="实际"
            align="left"
            sortable
          >
            <template #default="{ row }">
              {{
                (row.actualGtmGrossProfitRate * 1)?.toLocaleString('zh-CN', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) || '-'
              }}
            </template>
          </vxe-column>
          <vxe-column
            :class-name="cellClassName"
            min-width="90"
            field="gtmGrossProfitRateDiff"
            title="差值"
            align="left"
            sortable
          >
            <template #default="{ row }">
              <div class="score-tag">
                <SvgIcon
                  v-if="row.gtmGrossProfitRateHealthLevel"
                  :class="`score-${ScoreLevel[row.gtmGrossProfitRateHealthLevel]}`"
                  :icon="ScoreLevel[row.gtmGrossProfitRateHealthLevel]"
                />
                <span class="score-text">
                  {{
                    (row.gtmGrossProfitRateDiff * 1)?.toLocaleString('zh-CN', {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }) || '-'
                  }}
                </span>
              </div>
            </template>
          </vxe-column>
        </vxe-colgroup>
        <template #empty>
          <div class="empty-content">
            <SvgIcon icon="empty" />
            <p>当前暂无内容</p>
          </div>
        </template>
      </vxe-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { VxeTablePropTypes } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';
  import { formatNumberByBase } from '../../utils/utils';

  const treeConfig = ref<VxeTablePropTypes.TreeConfig<any>>({
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
  });
  const props = defineProps<{
    searchParams: BiContracts.ManageAnalysisReq;
    drillDownAnalysis: BiContracts.InventoryDrillDownAnalysisBean;
  }>();

  enum ScoreLevel {
    'good' = '优秀',
    '优秀' = 'good',
    'regular' = '良好',
    '良好' = 'regular',
    'poor' = '警惕',
    '警惕' = 'poor',
  }
  const type = ref('drillDownByPlatform');
  const drillDownPath = computed(() => {
    // 区域维度
    if (type.value === 'drillDownByArea') {
      return ['area', 'country', 'platform'];
    }
    // 平台维度
    if (type.value === 'drillDownByPlatform') {
      return ['platform', 'area', 'country'];
    }
    // 品类维度
    if (type.value === 'drillDownByCategory') {
      return ['category', 'area', 'platform'];
    }
    return [];
  });
  const dataList = computed(() => {
    return (
      [props.drillDownAnalysis.drillDownTotal, ...props.drillDownAnalysis[type.value]].map(
        (item: BiContracts.InventoryDrillDownBean, index: number) => {
          if (!item) return {};
          return {
            ...item,
            name: index === 0 ? '总计' : item[drillDownPath.value[0]] ?? '',
            dimensionList: [
              {
                dimension: drillDownPath.value?.[0],
                dimensionValue: item?.[drillDownPath.value?.[0]] ?? '',
              },
            ],
            id: item[drillDownPath.value?.[0]] || index,
            // level: 1,
            parentId: null,
            hasChild: index !== 0,
            children: [],
          };
        }
      ) || []
    );
  });
  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biSalesQueryDimensionAnalysis({
      ...props.searchParams,
      dimensionList: row.dimensionList || [],
      dimensionType: row.dimensionType,
    });
    if (res) {
      return (
        res.drillDownAnalysis[type.value].map((item) => {
          if (!item) return {};
          const id = `${item.area}${item.country}${item.platform}${item.category}${item.spuName}`;
          let hasChild = true;
          const dimensionList = [
            ...(row.dimensionList || []),
            {
              dimension: drillDownPath.value?.[row.dimensionList.length],
              dimensionValue: item[drillDownPath.value?.[row.dimensionList.length]] ?? '',
            },
          ];
          if (dimensionList.length === drillDownPath.value.length) {
            hasChild = false;
          }
          return {
            ...item,
            id,
            name: item[drillDownPath.value?.[row.dimensionList.length]],
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
  const cellClassName = ({ row }) => {
    return row.hasChild ? '' : 'table--tree-node-leaf';
  };
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 16px 20px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      color: var(---N9, #1f1f1f);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
    :deep(table) {
      border: 1px solid var(---N2, #ededed);
      border-collapse: collapse;
    }
    :deep(th) {
      border: 1px solid var(---N3, #ededed);
      background: var(---N1, #f7f7f7);
      border-collapse: collapse;
    }
    .score-tag {
      border-radius: 4px;
      font-size: 0;
      height: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      .svg-icon :deep(svg) {
        width: 12px;
        height: 12px;
      }
    }
    .score-regular {
      color: var(---C5, #ff9f22);
    }
    .score-good {
      color: var(---C4, #02b96b);
    }
    .score-poor {
      color: var(---C7, #f53f3f);
    }
    .empty-content {
      min-height: 244px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 21.8px;
      color: var(---N6, #999);
      text-align: center;

      /* 常规/Regular 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
      .svg-icon {
        font-size: 100px;
        height: 100px;
        width: 100px;
        :deep(svg) {
          width: 100%;
          height: 100%;
        }
      }
    }
    :deep(td.table--tree-node-leaf) {
      border: 1px solid var(---N3, #ededed);
      background: var(---N1, #f7f7f7);
    }
    :deep(.divider) {
      border-left: 1px solid var(---N4, #dedede);
      border-right: 1px solid var(---N4, #dedede);
    }
    .divider-left {
      border-right: 1px solid var(---N4, #dedede);
    }
    .divider-right {
      border-left: 1px solid var(---N4, #dedede);
    }
  }
</style>
