<template>
  <div class="sales-data">
    <div class="sales-data__title">多维分析</div>
    <div class="table-container">
      <vxe-table
        ref="tableRef"
        :column-config="{ resizable: false }"
        :expand-config="expandConfig"
        :data="dataList"
        size="small"
        :round="true"
        min-height="400px"
        @sort-change="sortChange"
      >
        <vxe-column type="expand" width="24">
          <template #content="{ row }">
            <ExpandContent :data="row.children" />
          </template>
        </vxe-column>
        <vxe-column min-width="142" field="name" title="SPU名称" sortable />
        <vxe-column min-width="103" field="salesAmount" title="销售额 (万)" align="left" sortable>
          <template #default="{ row }">
            {{
              (row.salesAmount / 10000)?.toLocaleString('zh-CN', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column min-width="103" field="refundAmount" title="退款额 (万)" align="left" sortable>
          <template #default="{ row }">
            {{
              (row.refundAmount / 10000)?.toLocaleString('zh-CN', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column min-width="74" field="refundAmountRate" title="退款率" align="left" sortable>
          <template #default="{ row }">
            {{
              (row.refundAmountRate * 1).toLocaleString('zh-CN', {
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column
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
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column
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
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column width="117px" field="refundAmountRateTrend" title="退款率趋势" align="left">
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

<script lang="ts" setup>
  import { useTemplateRef } from 'vue';
  import { biApi, type BiContracts } from '@/api';
  import type { VxeTablePropTypes, VxeTableInstance } from 'vxe-table';
  import ExpandContent from './ExpandContent.vue';
  import TrendEcharts from '../../components/trendEcharts.vue';

  const props = defineProps<{
    drillDownAnalysis: BiContracts.AfterSalesDrillDownBean;
    searchParams: BiContracts.ManageAnalysisReq;
  }>();

  const expandConfig = ref<VxeTablePropTypes.ExpandConfig<BiContracts.AfterSalesBean>>({
    lazy: true,
    minHeight: 600,
    visibleMethod: ({ row }) => {
      return row.name !== '总计';
    },
    loadMethod({ row }) {
      // 调用接口
      return biApi
        .biAfterSalesQueryDimensionAnalysis({
          ...props.searchParams,
          dimensionList: row.dimensionList,
          dimensionType: row.dimensionType,
        })
        .then((res: BiContracts.AfterSalesAnalysisResp) => {
          // 返回数据
          row.children = {
            refundReasons: res?.refundReasons,
            tags: res?.tags,
          };
        });
    },
  });
  const drillDownPath = computed(() => {
    // 区域维度
    if (type.value === 'drillDownByArea') {
      return ['area', 'country', 'platform', 'category', 'spuName'];
    }
    // 国家维度
    if (type.value === 'drillDownByCountry') {
      return ['country', 'platform', 'category', 'spuName'];
    }
    // 平台维度
    if (type.value === 'drillDownByPlatform') {
      return ['platform', 'category', 'spuName'];
    }
    // 品类维度
    if (type.value === 'drillDownByCategory') {
      return ['category', 'spuName', 'area', 'country', 'platform'];
    }
    return [];
  });

  const type = ref('drillDownByCategory');

  const dataList = computed(() => {
    return (
      [props.drillDownAnalysis.drillDownTotal, ...props.drillDownAnalysis[type.value]].map(
        (item: BiContracts.InventoryDrillDownBean, index: number) => {
          if (!item) return {};
          return {
            ...item,
            name: index === 0 ? '总计' : item.spuName ?? '',
            dimensionList: [
              {
                dimension: 'spuName',
                dimensionValue: item.spuName,
              },
            ],
            dimensionType: 5,
            id: item.spuName || index,
            // level: 1,
            parentId: null,
            hasChild: index !== 0,
            children: [],
          };
        }
      ) || []
    );
  });
  const tableRef = useTemplateRef<VxeTableInstance>('tableRef');
  const sortChange = () => {
    // 根据排序条件重新获取数据或更新表格
    tableRef.value?.clearRowExpand();
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
  }
</style>
