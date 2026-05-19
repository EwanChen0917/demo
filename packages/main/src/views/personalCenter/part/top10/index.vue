<template>
  <DataCard title="排行榜 Top10">
    <template #title>
      <span>排行榜 Top10</span>
      <i v-if="false" class="iconfont icon-jiantouxiangyou"></i>
    </template>
    <template #actions>
      <el-radio-group v-model="type" @change="onDimensionChange">
        <el-radio-button value="sale">BY SPU</el-radio-button>
        <el-radio-button value="country">BY 区域国家</el-radio-button>
        <el-radio-button value="gtm">BY GTM组</el-radio-button>
      </el-radio-group>
    </template>
    <div class="content">
      <BySpu
        v-if="type === 'sale'"
        :loading="loading"
        :spuSalesAnalysisList="state.spuSalesAnalysisList"
      />
      <ByCountry
        v-else-if="type === 'country'"
        :loading="loading"
        :areaSalesAnalysisList="state.areaSalesAnalysisList"
      />
      <ByGtm
        v-else-if="type === 'gtm'"
        :loading="loading"
        :gtmSalesAnalysisList="state.gtmSalesAnalysisList"
      />
    </div>
  </DataCard>
</template>

<script setup lang="ts">
  import { biApi } from '@/api';
  import {
    AreaSalesAnalysisBean,
    GtmSalesAnalysisBean,
    SpuSalesAnalysisBean,
  } from '@/api/bi/data-contracts';
  import DataCard from '../../components/DataCard.vue';
  import BySpu from './bySpu.vue';
  import ByCountry from './byCountry.vue';
  import ByGtm from './byGtm.vue';
  import { useReport } from '../../hooks/useReport';

  // withDefaults(
  //   defineProps<{
  //     spuSalesAnalysisList: SpuSalesAnalysisBean;
  //     areaSalesAnalysisList: AreaSalesAnalysisBean;
  //     gtmSalesAnalysisList: GtmSalesAnalysisBean;
  //   }>(),
  //   {
  //     spuSalesAnalysisList: [],
  //     areaSalesAnalysisList: [],
  //     gtmSalesAnalysisList: [],
  //   }
  // );
  const state = reactive({
    spuSalesAnalysisList: [] as SpuSalesAnalysisBean[],
    areaSalesAnalysisList: [] as AreaSalesAnalysisBean[],
    gtmSalesAnalysisList: [] as GtmSalesAnalysisBean[],
  });
  const type = ref('sale');

  const dimensionMap = {
    sale: 'BY SPU',
    country: 'BY 区域国家',
    gtm: 'BY GTM组',
  };
  const apiMap = {
    sale: {
      key: 'spuSalesAnalysisList',
      api: biApi.biFrontpageQuerySpuSalesAnalysisList,
    },
    country: {
      key: 'areaSalesAnalysisList',
      api: biApi.biFrontpageQueryAreaSalesAnalysisList,
    },
    gtm: {
      key: 'gtmSalesAnalysisList',
      api: biApi.biFrontpageQueryGtmSalesAnalysisList,
    },
  };
  let searchParams = {};
  const loading = ref(false);
  const init = async (payload) => {
    searchParams = payload;
    try {
      loading.value = true;
      const res = await apiMap[type.value].api(searchParams);
      state[apiMap[type.value].key] = res[apiMap[type.value].key] || [];
    } catch (error) {
      console.error('查询排行榜数据失败', error);
    } finally {
      loading.value = false;
    }
  };
  defineExpose({
    init,
  });
  const { report } = useReport();
  const onDimensionChange = (value) => {
    init(searchParams);
    report(dimensionMap[value] || 'click', {
      special_topic_title: '排行榜 Top10',
      button_name: dimensionMap[value],
    });
  };
</script>

<style lang="scss" scoped>
  :deep(.vxe-table) {
    --vxe-ui-table-border-color: var(---N2, #f5f5f5);
    --vxe-ui-table-border-radius: 7px;
    --vxe-ui-table-resizable-line-color: var(---N5, #c5c5c5);
    --vxe-ui-table-cell-padding-small: 7px 12px;
    --vxe-ui-table-column-icon-border-color: var(---N5, #c5c5c5);

    .vxe-cell--sort {
      padding-left: 7px;
    }

    .vxe-sort--asc-btn.sort--active,
    .vxe-sort--desc-btn.sort--active {
      color: var(--el-color-primary);
    }

    .vxe-cell--title {
      color: var(---N9, #1f1f1f);
      /* 较弱/Medium 12 */
      font-family: 'PingFang SC Medium';
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 166.667% */
    }

    .vxe-table--header-wrapper {
      background-color: var(---N1, #f7f7f7);
    }

    .row--hover {
      background-color: var(---N1, #f7f7f7);
    }

    .vxe-cell--col-resizable {
      &:before {
        height: 12px;
        background-color: #dedede;
      }
    }

    .vxe-cell {
      color: var(---N9, #1f1f1f);
      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }

    .vxe-icon-square-plus {
      //border-color: #DEDEDE;
      //&:before, &:after {
      //  background-color: #f90;
      //}
    }
  }
</style>
