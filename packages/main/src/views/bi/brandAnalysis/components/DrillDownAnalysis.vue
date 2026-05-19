<template>
  <div class="sales-data">
    <div class="sales-data__title">多维分析</div>
    <div class="table-container">
      <vxe-table
        v-if="dataList.length"
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
          title="区域/国家"
          tree-node
          fixed="left"
          :class-name="cellClassName"
        />
        <vxe-column
          :class-name="cellClassName"
          min-width="111"
          field="brandVoiceCount"
          title="品牌声量数"
          align="left"
          sortable
        >
          <template #default="scoped">
            {{ scoped.row.brandVoiceCount ? toThousands(scoped.row.brandVoiceCount) : '-' }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="123"
          field="customerCount"
          title="新增注册用户数"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ row.customerCount ? toThousands(row.customerCount) : '-' }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="135"
          field="purchaseCustomerCount"
          title="购买用户数"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ row.purchaseCustomerCount ? toThousands(row.purchaseCustomerCount) : '-' }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="151"
          field="repurchaseRate"
          title="复购率"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{
              row.repurchaseRate
                ? row.repurchaseRate.toLocaleString('zh-CN', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '-'
            }}
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
  import type { VxeTablePropTypes } from 'vxe-table';
  import { biApi, type BiContracts } from '@/api';
  import { toThousands } from '@/utils/toThousands';

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
  const type = ref('drillDownByArea');
  const drillDownPath = computed(() => {
    // 区域维度
    if (type.value === 'drillDownByArea') {
      return ['area', 'country'];
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
    const res: any = await biApi.biBrandQueryDimensionAnalysis({
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
      border-bottom: 1px solid var(---N2, #f5f5f5);
      background: var(---N1, #f7f7f7);
    }
  }
</style>
