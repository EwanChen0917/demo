<template>
  <div class="dimension-analysis-section">
    <div class="dimension-changer">
      <el-radio-group v-model="type" text-color="#fff" fill="#02b96b" size="large">
        <el-radio-button value="voc">VOC</el-radio-button>
        <el-radio-button value="return">退货</el-radio-button>
      </el-radio-group>
    </div>
    <SecondaryTagAnalysis
      :level2List="state.level2List"
      :level2Trend="state.level2Trend"
      :type="type"
      @skip-particulars="skipParticulars"
    />
    <TertiaryTagAnalysis
      :level3MapList="state.level3MapList"
      :spuLevel3MapList="state.spuLevel3MapList"
      :type="type"
      :spuName="spuName"
      @skip-particulars="skipParticulars"
    />
    <ProductAnalysis
      :spuTrend="state.spuTrend"
      :type="type"
      v-model:spuName="spuName"
      v-model:periodType="periodType"
      :spuLevel3MapList="state.spuLevel3MapList"
      :spuLaunchCycleReturnTrend="state.spuLaunchCycleReturnTrend"
      @skip-particulars="skipParticulars"
    />
    <SpuTagAnalysis
      ref="spuTagAnalysis"
      :periodType="periodType"
      :spuLevel3MapList="state.spuLevel3MapList"
      :spuLevel3LaunchCycleMapList="state.spuLevel3LaunchCycleMapList"
      :spuName="spuName"
      :type="type"
      @skip-particulars="skipParticulars"
    />
  </div>
</template>

<script lang="ts" setup>
  import type { BiContracts } from '@/api';
  import SecondaryTagAnalysis from './SecondaryTagAnalysis.vue';
  import TertiaryTagAnalysis from './TertiaryTagAnalysis.vue';
  import ProductAnalysis from './ProductAnalysis.vue';
  import { DEFAULT_SPU_NAME } from '../constant';
  import SpuTagAnalysis from './SpuTagAnalysis.vue';

  const props = defineProps<{
    level2List?: BiContracts.ProductManagerLevelDO[];
    returnLevel2List?: BiContracts.ProductManagerLevelDO[];
    level2Trend?: BiContracts.ProductManagerLevelTrendVO;
    returnLevel2Trend?: BiContracts.ProductManagerLevelTrendVO;
    level3MapList?: BiContracts.ProductManagerLevelDO;
    returnLevel3MapList?: BiContracts.ProductManagerLevelDO;
    spuLevel3MapList?: BiContracts.ProductManagerLevelDO;
    spuReturnLevel3MapList?: BiContracts.ProductManagerLevelDO;
    spuTrend?: BiContracts.ProductManagerLevelTrendVO;
    spuReturnTrend?: BiContracts.ProductManagerLevelTrendVO;
    spuLaunchCycleReturnTrend?: BiContracts.ProductManagerLevelTrendVO;
    spuLevel3LaunchCycleMapList?: BiContracts.ProductManagerLevelDO;
    spuReturnLevel3LaunchCycleMapList?: BiContracts.ProductManagerLevelDO;
  }>();
  const emit = defineEmits<{
    skipParticulars: [payload: Record<string, any>];
  }>();
  const skipParticulars = (payload: Record<string, any>) => {
    emit(
      'skipParticulars',
      type.value === 'return'
        ? { ...payload, vocSource: '退货留言' }
        : { ...payload, vocSource: ['客服工单'], dataSource: ['Zendesk'] }
    );
  };
  const spuName = ref(DEFAULT_SPU_NAME);
  const periodType = ref<'yearAccumulate' | 'monthAccumulate' | 'weekNaturalCompare' | 'launchCycleCompare'>('monthAccumulate');
  const type = ref<'voc' | 'return'>('voc');

  const state = computed(() => {
    const dataMap = {
      voc: {
        level2List: props.level2List,
        level2Trend: props.level2Trend,
        level3MapList: props.level3MapList,
        spuLevel3MapList: props.spuLevel3MapList,
        spuTrend: props.spuTrend,
        spuLaunchCycleReturnTrend: props.spuLaunchCycleReturnTrend,
        spuLevel3LaunchCycleMapList: props.spuLevel3LaunchCycleMapList,
      },
      return: {
        level2List: props.returnLevel2List?.map((item) => {
          return {
            level2: item.level2,
            vocCount: item.returnQty, // 转换vocCount为退货数量
            vocProp: item.returnRate, // 转换vocProp为退货数量占比
            cumulativeVocProp: item.returnRateCumulative,
          };
        }),
        level2Trend: props.returnLevel2Trend,
        level3MapList: props.returnLevel3MapList,
        spuLevel3MapList: props.spuReturnLevel3MapList,
        spuTrend: props.spuReturnTrend,
        spuLaunchCycleReturnTrend: props.spuLaunchCycleReturnTrend,
        spuLevel3LaunchCycleMapList: props.spuReturnLevel3LaunchCycleMapList,
      },
    };
    return dataMap[type.value];
  });

  const spuTagAnalysis = useTemplateRef<any>('spuTagAnalysis');
  watch(
    () => spuName.value,
    () => {
      spuTagAnalysis.value?.$el.scrollIntoView({ behavior: 'smooth' });
    }
  );
</script>

<style lang="scss" scoped>
  .dimension-analysis-section {
    border-radius: 10px;
    background: #fff;
    .dimension-changer {
      padding: 20px 16px 0;
      position: sticky;
      top: 0;
      background: #fff;
      z-index: 2003; // 高于表格固定行列
    }
  }
</style>
