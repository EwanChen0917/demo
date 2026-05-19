<template>
  <div class="top-10-by-gtm">
    <vxe-table
      :data="tableData"
      :tree-config="treeConfig"
      :row-class-name="rowClassName"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true }"
      :round="true"
      :loading="loading"
      size="small"
    >
      <vxe-column type="seq" title="排名" width="60" sortable>
        <template #default="{ row }">
          <Rank :rank="row.rank || ''" />
        </template>
      </vxe-column>
      <vxe-column field="name" title="GTM组/SPU名称" width="22%" tree-node sortable>
        <template #default="{ row }">
          <div class="area-name">
            <span>{{ row.name }}</span>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="salesAmount" title="销售额" width="10%" sortable>
        <template #default="{ row }">¥{{ formatNumberObj(row.salesAmount).toString() }}</template>
      </vxe-column>
      <vxe-column field="salesAmountRatio" title="销售额组内占比" width="22%" sortable>
        <template #default="{ row }">
          <progress-bar :percent="row.salesAmountRatio" />
        </template>
      </vxe-column>
      <vxe-column field="salesVolume" title="销量" width="10%" sortable>
        <template #default="{ row }">
          {{ toThousands(row.salesVolume) }}
        </template>
      </vxe-column>
      <vxe-column field="salesVolumeRatio" title="销量组内占比" width="22%" sortable>
        <template #default="{ row }">
          <progress-bar :percent="row.salesVolumeRatio" />
        </template>
      </vxe-column>
      <vxe-column
        field="advertisingCost"
        title="广告花费额"
        width="100"
        :resizable="false"
        sortable
      >
        <template #default="{ row }">
          ¥{{ formatNumberObj(row.advertisingCost).toString() }}
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
  import { VxeTablePropTypes } from 'vxe-table';
  import Rank from '@/views/personalCenter/components/rank.vue';
  import ProgressBar from '@/views/personalCenter/components/progressBar.vue';
  import { toThousands } from '@/utils/toThousands';
  import { GtmSalesAnalysisBean } from '@/api/bi/data-contracts';
  import { biApi } from '@/api';
  import { formatNumberObj } from '@/views/bi/utils/utils';

  const props = withDefaults(
    defineProps<{
      gtmSalesAnalysisList: GtmSalesAnalysisBean;
    }>(),
    {
      gtmSalesAnalysisList: () => ({}),
      loading: false,
    }
  );

  enum LevelFlag {
    GTM = 6,
  }

  const tableData = computed(() => {
    return props.gtmSalesAnalysisList.map((x, i) => {
      return {
        id: x.gtmProductLine,
        rank: i + 1,
        name: x.gtmProductLine,
        gtm: x.gtmProductLine,
        salesVolume: x.saleQty,
        salesVolumeRatio: x.saleQtyProp,
        salesAmount: x.salesAmount,
        salesAmountRatio: x.salesAmountProp,
        advertisingCost: x.adCost,
        levelFlag: LevelFlag.GTM,
        hasChild: true,
        parentId: null,
      };
    });
  });

  // console.log(tableData.value);

  const buildQuery = inject('buildQuery');

  const treeConfig = ref<VxeTablePropTypes.TreeConfig<any>>({
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
    lazy: true,
    hasChild: 'hasChild',
    iconOpen: 'vxe-custom--square-plus vxe-custom--square-minus',
    iconClose: 'vxe-custom--square-plus',
    async loadMethod({ row }) {
      const query = buildQuery();
      if (row.levelFlag === LevelFlag.GTM) {
        query.dimensionType = LevelFlag.GTM;
        query.dimensionList = [
          {
            dimension: 'gtmProductLine',
            dimensionValue: row.gtm,
          },
        ];
        const res = await biApi.biFrontpageSalesQueryDimensionAnalysis(query);
        const value = res.gtmSalesAnalysisList.map((x, i) => {
          return {
            id: x.spuName,
            rank: '',
            name: x.spuName,
            gtm: x.gtmProductLine,
            salesVolume: x.saleQty,
            salesVolumeRatio: x.saleQtyProp,
            salesAmount: x.salesAmount,
            salesAmountRatio: x.salesAmountProp,
            advertisingCost: x.adCost,
            hasChild: false,
            parentId: row.id,
          };
        });
        // console.log(value);
        return value;
      }
      return Promise.resolve([]);
    },
  });

  const rowClassName = (params) => {
    if (!params.row.levelFlag) {
      return 'table--tree-node-leaf';
    }
  };
</script>

<style scoped lang="scss">
  .top-10-by-gtm {
    width: 100%;
  }

  .area-name {
    margin-left: 12px;
    position: relative;
    top: 2px;
  }

  :deep(.table--tree-node-leaf) {
    border-bottom: 1px solid var(---N2, #f5f5f5);
    background: var(---N1, #f7f7f7);
  }
</style>
