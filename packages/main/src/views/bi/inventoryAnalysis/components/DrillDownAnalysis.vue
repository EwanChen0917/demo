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
            <template v-if="type === 'drillDownByArea'">区域/平台/品类</template>
            <template v-if="type === 'drillDownByPlatform'">平台/地区/品类</template>
            <template v-if="type === 'drillDownByCategory'">品类/区域/平台</template>
          </template>
          <template #default="{ row }">
            <div :style="{ paddingLeft: '10px' }">{{ row.name || '-' }}</div>
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="111"
          field="inventoryTurnoverDay"
          title="成品周转天数"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{
              row.inventoryTurnoverDay?.toLocaleString('zh-CN', {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="stockSalesRate"
          title="成品存销比"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{
              row.stockSalesRate?.toLocaleString('zh-CN', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) || '-'
            }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="135"
          field="stockAmount"
          title="成品库存金额 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ row.stockAmount ? (row.stockAmount / 10000).toFixed(2) : '-' }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="151"
          field="past30DaysSalesCost"
          title="近30天销售成本 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ row.past30DaysSalesCost ? (row.past30DaysSalesCost / 10000).toFixed(2) : '-' }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="162"
          field="next120DaysSalesCost"
          title="预测月均销售成本 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ row.next120DaysSalesCost ? (row.next120DaysSalesCost / 10000).toFixed(2) : '-' }}
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
  import { VxeTablePropTypes } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';

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
  const type = ref('drillDownByPlatform');
  const drillDownPath = computed(() => {
    // 区域维度
    if (type.value === 'drillDownByArea') {
      return ['area', 'platform', 'category'];
    }
    // 平台维度
    if (type.value === 'drillDownByPlatform') {
      return ['platform', 'area', 'category'];
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
    const res: any = await biApi.biInventoryQueryDimensionAnalysis({
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
