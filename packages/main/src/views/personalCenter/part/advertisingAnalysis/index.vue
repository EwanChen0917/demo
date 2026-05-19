<template>
  <DataCard title="广告分析">
    <template #title>
      <label class="link-label" @click="onDetail">
        <span>广告分析</span>
        <i class="iconfont icon-jiantouxiangyou"></i>
      </label>
    </template>
    <template #actions>
      <el-radio-group v-model="type" v-if="platformList.length > 1" @change="onPlatformChange">
        <el-radio-button v-for="item in platformList" :key="item.code" :value="item.code">
          {{ item.name }}
        </el-radio-button>
      </el-radio-group>
    </template>

    <HorizontalScrollContainer>
      <div class="content">
        <IndicatorTable v-for="(c, i) of indicator" :key="c.title" :is-split="i > 0" :config="c" />
      </div>
    </HorizontalScrollContainer>
  </DataCard>
</template>

<script setup lang="ts">
  import { AdAnalysisBean } from '@/api/bi/data-contracts';
  import { useRouter } from 'vue-router';
  import { formatPercent, formatNumberObj } from '@/views/bi/utils/utils';
  import HorizontalScrollContainer from '@/views/personalCenter/components/HorizontalScrollContainer.vue';
  import { decryptByBase64, encryptByBase64 } from '@/utils/aesTils';
  import { biApi } from '@/api';
  import dayjs from 'dayjs';
  import IndicatorTable from '../../components/IndicatorTable.vue';
  import DataCard from '../../components/DataCard.vue';
  import { useReport } from '../../hooks/useReport';

  const router = useRouter();

  const props = defineProps<{
    adAnalysis?: AdAnalysisBean;
  }>();

  const platformList = computed(() => {
    return [
      (props.adAnalysis?.amazonAdAnalysis && { name: '亚马逊', code: 'amazon', desc: '亚马逊' }) ||
        null,
      (props.adAnalysis?.shopifyAdAnalysis && {
        name: '独立站',
        code: 'station',
        desc: '独立站',
      }) ||
        null,
      (props.adAnalysis?.tiktokAdAnalysis && { name: 'TikTok', code: 'tk', desc: 'Tiktok平台' }) ||
        null,
    ].filter(Boolean);
  });

  const type = ref(platformList.value?.[0]?.code || '');

  watch(
    () => platformList.value,
    () => {
      if (!platformList.value?.length) {
        type.value = '';
        return;
      }
      if (platformList.value.find((x) => x.code === type.value)) {
        // 保留当前项
        return;
      }
      type.value = platformList.value?.[0]?.code || '';
    }
  );

  const indicator = computed(() => {
    const { amazonAdAnalysis, shopifyAdAnalysis, tiktokAdAnalysis } = props.adAnalysis || {};
    const hashMap = {
      amazon: amazonAdAnalysis,
      station: shopifyAdAnalysis,
      tk: tiktokAdAnalysis,
    };
    const currentAnalysis = hashMap[type.value] || {};
    return [
      {
        title: '广告花费',
        data: {
          current: formatNumberObj(currentAnalysis.adCost).value,
          last: currentAnalysis.adCostMom,
          yoy: currentAnalysis.adCostYoy,
        },
        unit: formatNumberObj(currentAnalysis.adCost).unit,
      },
      {
        title: '广告销售额',
        data: {
          current: formatNumberObj(currentAnalysis.adSalesAmount).value,
          last: currentAnalysis.adSalesAmountMom,
          yoy: currentAnalysis.adSalesAmountYoy,
        },
        unit: formatNumberObj(currentAnalysis.adSalesAmount).unit,
      },
      {
        title: 'CPC',
        data: {
          current: formatNumberObj(currentAnalysis.cpc).value,
          last: currentAnalysis.cpcMom,
          yoy: currentAnalysis.cpcYoy,
        },
        unit: formatNumberObj(currentAnalysis.cpc).unit,
      },
      {
        title: 'ROAS',
        data: {
          current: formatNumberObj(currentAnalysis.roas).value,
          last: currentAnalysis.roasMom,
          yoy: currentAnalysis.roasYoy,
        },
        unit: formatNumberObj(currentAnalysis.roas).unit,
      },
      {
        title: '广告费比',
        data: {
          current: formatPercent(currentAnalysis.adCostRate),
          last: currentAnalysis.adCostRateMom,
          yoy: currentAnalysis.adCostRateYoy,
        },
        unit: '%',
      },
      // {
      //   title: '广告销售额占比',
      //   data: {
      //     current: 0,
      //     last: 0,
      //     yoy: 0,
      //   },
      //   unit: '%',
      // },
    ];
  });
  const { report } = useReport();
  const buildQuery = inject<any>('buildQuery')!;
  const onDetail = async () => {
    const query = buildQuery();
    const filteredQuery = Object.keys(query).reduce((acc, key) => {
      let temp = query[key];
      if (isRef(query[key])) {
        temp = query[key].value;
      }
      if (
        (Array.isArray(temp) && temp.length > 0) ||
        (typeof temp !== 'object' && temp !== undefined && temp !== null && temp !== '')
      ) {
        acc[key] = temp;
        return acc;
      }
      return acc;
    }, {});
    if (filteredQuery.dateType === 'week') {
      const res = await biApi.biCommonQueryWeek({ weekStrEnd: filteredQuery.week });
      filteredQuery.startDate = res.weekList[0].startDate;
      filteredQuery.endDate = res.weekList[0].endDate;
    } else if (filteredQuery.dateType === 'month') {
      const dateObj = dayjs(filteredQuery.month);
      filteredQuery.startDate = dateObj.startOf('month').format('YYYY-MM-DD');
      const endDate = dateObj.endOf('month').format('YYYY-MM-DD');
      filteredQuery.endDate = dayjs().isAfter(endDate) ? endDate : dayjs().format('YYYY-MM-DD');
    }
    const pageUrl = '/bi/ad';
    const platform = platformList.value.find((item) => item!.code === type.value);
    report('drill_down_page', {
      special_topic_title: '广告分析',
      button_name: '广告分析',
      drill_down_page_name: `${platform!.name}广告分析`,
      drill_down_page_url: pageUrl,
    });
    router.push({
      path: pageUrl,
      query: {
        params: encryptByBase64(
          JSON.stringify({
            ...filteredQuery,
            categoryList: filteredQuery.category3List,
            platformList: [platform!.desc],
          })
        ),
      },
    });
  };
  const onPlatformChange = () => {
    const platform = platformList.value.find((item) => item!.code === type.value);
    report(platform?.name || 'click', {
      special_topic_title: '广告分析',
      button_name: platform?.name || '',
    });
  };
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-wrap: nowrap;
    min-width: 100%;
    gap: 16px;
    min-height: 94px;
    :deep(.indicator-table) {
      &:first-child {
        margin-left: 0;
      }
    }
  }
</style>
