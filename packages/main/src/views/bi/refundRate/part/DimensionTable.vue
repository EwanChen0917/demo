<template>
  <div class="sales-data">
    <div class="sales-data__title">多维分析</div>
    <div class="table-container">
      <vxe-table
        :column-config="{ resizable: false }"
        :tree-config="treeConfig"
        :data="dataList"
        size="small"
        :round="true"
        min-height="400px"
      >
        <vxe-column
          min-width="196"
          field="name"
          title="品类/SPU名称/区域/国家"
          tree-node
          fixed="left"
          :class-name="cellClassName"
        >
          <template #default="{ row }">
            <div :style="{ paddingLeft: '10px' }">{{ row.name || '-' }}</div>
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="salesAmount"
          title="销售额 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ formatNumberByBase(row.salesAmount, 10000, 1).toString() }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="99"
          field="refundAmount"
          title="退款额 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ formatNumberByBase(row.refundAmount, 10000, 1).toString() }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="76"
          field="refundAmountRate"
          title="退款率"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{
              (row.refundAmountRate * 1)?.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })
            }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="refundAmountRateMom"
          title="退款率环比"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{
              (row.refundAmountRateMom * 1)?.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="refundAmountRateYoy"
          title="退款率同比"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{
              (row.refundAmountRateYoy * 1)?.toLocaleString('zh-CN', {
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          width="117px"
          field="refundAmountRateTrends"
          title="退款率趋势"
          align="left"
        >
          <template #default="{ row }">
            <div
              :style="{
                width: '97px',
                height: '20px',
              }"
            >
              <div :style="{ width: '100%', height: '40px', transform: 'translateY(-10PX)' }">
                <TrendEcharts
                  v-if="row.refundAmountRateTrends"
                  color="#02B96B"
                  :data="
                    row.refundAmountRateTrends.map(({ month, refundAmountRate }) => ({
                      month,
                      value: refundAmountRate,
                    }))
                  "
                />
              </div>
            </div>
          </template>
        </vxe-column>
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
  // 标签自动布局、全局过渡动画等特性
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import type { VxeTablePropTypes } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';
  import TrendEcharts from '../../components/trendEcharts.vue';
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
    drillDownAnalysis: BiContracts.AfterSalesDrillDownBean;
    searchParams: any;
  }>();
  const type = ref('drillDownByCategory');
  const drillDownPath = computed(() => {
    // 品类维度
    if (type.value === 'drillDownByCategory') {
      return ['category', 'spuName', 'area', 'country'];
    }
    return [];
  });
  const dataList = computed(() => {
    if (!props.drillDownAnalysis[type.value]) {
      return [];
    }
    return [props.drillDownAnalysis.drillDownTotal, ...props.drillDownAnalysis[type.value]].map(
      (item: BiContracts.AfterSalesDrillDownBean, index: number) => {
        return {
          ...item,
          name: index === 0 ? '总计' : item[drillDownPath.value[0]] ?? '',
          dimensionList: [
            {
              dimension: drillDownPath.value[0],
              dimensionValue: item[drillDownPath.value[0]] ?? '',
            },
          ],
          id: item[drillDownPath.value[0]] || index,
          // level: 1,
          parentId: null,
          hasChild: index !== 0, // 总计行没有子节点
          children: [],
        };
      }
    );
  });
  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biAfterSalesQueryDimensionAnalysis({
      ...props.searchParams,
      dimensionList: row.dimensionList || [],
      dimensionType: row.dimensionType,
    });
    if (res) {
      return (
        res.drillDownAnalysis[type.value].map((item) => {
          const id = `${item.area}${item.country}${item.platform}${item.category}${item.spuName}`;
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
  const cellClassName = ({ row }) => {
    return row.hasChild ? '' : 'table--tree-node-leaf';
  };
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 24px 20px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
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
    :deep(.table--tree-node-leaf) {
      border: 1px solid var(---N2, #f5f5f5);
      background: var(---N1, #f7f7f7);
    }
  }
</style>
