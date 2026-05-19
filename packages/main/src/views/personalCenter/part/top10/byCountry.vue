<template>
  <div class="top-10-by-country">
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
      <vxe-column field="name" title="区域/国家/SPU名称" width="22%" tree-node sortable>
        <template #default="{ row }">
          <div class="area-name">
            <img
              v-if="row.levelFlag === LevelFlag.Country && countryCode[row.name]"
              width="16"
              :src="`https://flagcdn.com/${countryCode[row.name].toLowerCase()}.svg`"
              crossOrigin="anonymous"
              alt=""
            />
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
          {{
            row.advertisingCost !== null
              ? `¥${formatNumberObj(row.advertisingCost).toString()}`
              : '-'
          }}
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
  import { AreaSalesAnalysisBean, Dimension } from '@/api/bi/data-contracts';
  import countryCode from '@/views/bi/decisionAnalysis/country-code.json';
  import { biApi } from '@/api';
  import { formatNumberObj } from '@/views/bi/utils/utils';

  const props = withDefaults(
    defineProps<{
      areaSalesAnalysisList: AreaSalesAnalysisBean;
      loading: boolean;
    }>(),
    {
      areaSalesAnalysisList: () => ({}),
    }
  );

  enum LevelFlag {
    Area = 1,
    Country = 2,
  }

  const tableData = computed(() => {
    return props.areaSalesAnalysisList.map((x, i) => {
      return {
        id: x.area,
        rank: i + 1,
        name: x.area,
        area: x.area,
        country: x.country,
        salesVolume: x.saleQty,
        salesVolumeRatio: x.saleQtyProp,
        salesAmount: x.salesAmount,
        salesAmountRatio: x.salesAmountProp,
        advertisingCost: x.adCost,
        hasChild: true,
        parentId: null,
        levelFlag: LevelFlag.Area,
      };
    });
  });

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
      if (row.levelFlag === LevelFlag.Area) {
        query.dimensionType = LevelFlag.Area;
        query.dimensionList = [
          {
            dimension: 'area',
            dimensionValue: row.area,
          },
        ];
        const res = await biApi.biFrontpageSalesQueryDimensionAnalysis(query);
        return res.areaSalesAnalysisList.map((x, i) => {
          return {
            id: `${x.area}-${x.country}`,
            rank: '',
            name: x.country,
            area: x.area,
            country: x.country,
            salesVolume: x.saleQty,
            salesVolumeRatio: x.saleQtyProp,
            salesAmount: x.salesAmount,
            salesAmountRatio: x.salesAmountProp,
            advertisingCost: x.adCost,
            hasChild: true,
            parentId: row.area,
            levelFlag: LevelFlag.Country,
          };
        });
      }
      if (row.levelFlag === LevelFlag.Country) {
        query.dimensionType = LevelFlag.Area;
        query.dimensionList = [
          {
            dimension: 'area',
            dimensionValue: row.area,
          },
          {
            dimension: 'country',
            dimensionValue: row.country,
          },
        ];
        const res = await biApi.biFrontpageSalesQueryDimensionAnalysis(query);
        return res.areaSalesAnalysisList.map((x, i) => {
          return {
            id: x.country,
            rank: '',
            name: x.spuName,
            area: x.area,
            country: x.country,
            salesVolume: x.saleQty,
            salesVolumeRatio: x.saleQtyProp,
            salesAmount: x.salesAmount,
            salesAmountRatio: x.salesAmountProp,
            advertisingCost: x.adCost,
            hasChild: false,
            parentId: `${row.area}-${row.country}`,
          };
        });
      }
    },
  });

  const rowClassName = (params) => {
    if (!params.row.levelFlag) {
      return 'table--tree-node-leaf';
    }
  };
</script>

<style scoped lang="scss">
  .top-10-by-country {
    width: 100%;
  }

  .area-name {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 12px;
    position: relative;
    top: 2px;

    img {
      width: 16px;
      height: auto;
    }
  }

  :deep(.table--tree-node-leaf) {
    border-bottom: 1px solid var(---N2, #f5f5f5);
    background: var(---N1, #f7f7f7);
  }
</style>
