<template>
  <DataCard title="流量分析">
    <template #title>
      <label class="link-label" @click="onDetail">
        <span>流量分析</span>
        <i class="iconfont icon-jiantouxiangyou"></i>
      </label>
    </template>
    <template #actions>
      <el-radio-group v-model="type" v-if="platformList.length > 0" @change="onPlatformChange">
        <el-radio-button v-for="item in platformList" :value="item.code" :key="item.code">
          {{ item.name }}
        </el-radio-button>
      </el-radio-group>
    </template>
    <HorizontalScrollContainer>
      <div class="content">
        <IndicatorTable
          v-for="(c, i) of indicator.filter((item) => !(props.dateType === 'day' && item.data?.current === '-'))"
          :key="c.title"
          :is-split="i > 0"
          :config="c"
        />
      </div>
    </HorizontalScrollContainer>
  </DataCard>
</template>

<script setup lang="ts">
  import { FrontTrafficAnalysisBean } from '@/api/bi/data-contracts';
  import { useRouter } from 'vue-router';
  import { formatPercent, formatNumberObj } from '@/views/bi/utils/utils';
  import HorizontalScrollContainer from '@/views/personalCenter/components/HorizontalScrollContainer.vue';
  import { decryptByBase64 } from '@/utils/aesTils';
  import IndicatorTable from '../../components/IndicatorTable.vue';
  import DataCard from '../../components/DataCard.vue';
  import { useReport } from '../../hooks/useReport';

  const router = useRouter();

  const props = withDefaults(
    defineProps<{
      dateType: string;
      trafficAnalysis: FrontTrafficAnalysisBean;
    }>(),
    {
      dateType: 'day',
      trafficAnalysis: () => ({}),
    }
  );

  const platformList = computed(() => {
    return props.dateType === 'day'
      ? [
          (props.trafficAnalysis?.amazonTrafficAnalysis && { name: '亚马逊', code: 'amazon' }) ||
            null,
        ]
      : [
          (props.trafficAnalysis?.amazonTrafficAnalysis && { name: '亚马逊', code: 'amazon' }) ||
            null,
          (props.trafficAnalysis?.shopifyTrafficAnalysis && { name: '独立站', code: 'station' }) ||
            null,
          (props.trafficAnalysis?.tiktokTrafficAnalysis && { name: 'TikTok', code: 'tk' }) || null,
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
    let { amazonTrafficAnalysis, shopifyTrafficAnalysis, tiktokTrafficAnalysis } =
      props.trafficAnalysis;
    amazonTrafficAnalysis = amazonTrafficAnalysis || {};
    shopifyTrafficAnalysis = shopifyTrafficAnalysis || {};
    tiktokTrafficAnalysis = tiktokTrafficAnalysis || {};
    switch (type.value) {
      case 'amazon':
        return [
          {
            title: '总页面浏览量',
            data: {
              current: formatNumberObj(amazonTrafficAnalysis.totalPageViews).value,
              last: amazonTrafficAnalysis.pageViewsMom,
              yoy: amazonTrafficAnalysis.pageViewsYoy,
            },
            unit: formatNumberObj(amazonTrafficAnalysis.totalPageViews).unit,
          },
          {
            title: '总会话数',
            data: {
              current: formatNumberObj(amazonTrafficAnalysis.totalSessions).value,
              last: amazonTrafficAnalysis.sessionsMom,
              yoy: amazonTrafficAnalysis.sessionsYoy,
            },
            unit: formatNumberObj(amazonTrafficAnalysis.totalPageViews).unit,
          },
          {
            title: '转化率',
            data: {
              current: formatPercent(amazonTrafficAnalysis.conversionRate),
              last: amazonTrafficAnalysis.conversionRateMom,
              yoy: amazonTrafficAnalysis.conversionRateYoy,
            },
            unit: '%',
          },
          {
            title: '搜索曝光量',
            data: {
              current: formatNumberObj(amazonTrafficAnalysis.impressionsCount).value,
              last: amazonTrafficAnalysis.impressionsCountMom,
              yoy: amazonTrafficAnalysis.impressionsCountYoy,
            },
            unit: formatNumberObj(amazonTrafficAnalysis.impressionsCount).unit,
          },
          {
            title: '搜索点击量',
            data: {
              current: formatNumberObj(amazonTrafficAnalysis.clickCount).value,
              last: amazonTrafficAnalysis.clickCountMom,
              yoy: amazonTrafficAnalysis.clickCountYoy,
            },
            unit: formatNumberObj(amazonTrafficAnalysis.clickCount).unit,
          },
          {
            title: '搜索点击率',
            data: {
              current: formatPercent(amazonTrafficAnalysis.clickRateAmazon),
              last: amazonTrafficAnalysis.clickRateAmazonMom,
              yoy: amazonTrafficAnalysis.clickRateAmazonYoy,
            },
            unit: '%',
          },
        ];
      case 'station':
        return [
          {
            title: '总页面浏览量',
            data: {
              current: formatNumberObj(shopifyTrafficAnalysis.totalPageViews).value,
              last: shopifyTrafficAnalysis.pageViewsMom,
              yoy: shopifyTrafficAnalysis.pageViewsYoy,
            },
            unit: formatNumberObj(shopifyTrafficAnalysis.totalPageViews).unit,
          },
          {
            title: '总会话数',
            data: {
              current: formatNumberObj(shopifyTrafficAnalysis.totalSessions).value,
              last: shopifyTrafficAnalysis.sessionsMom,
              yoy: shopifyTrafficAnalysis.sessionsYoy,
            },
            unit: formatNumberObj(shopifyTrafficAnalysis.totalSessions).unit,
          },
          {
            title: '转化率',
            data: {
              current: formatPercent(shopifyTrafficAnalysis.conversionRate),
              last: shopifyTrafficAnalysis.conversionRateMom,
              yoy: shopifyTrafficAnalysis.conversionRateYoy,
            },
            unit: '%',
          },
          {
            title: '访问用户数',
            data: {
              current: formatNumberObj(shopifyTrafficAnalysis.totalUsers).value,
              last: shopifyTrafficAnalysis.usersMom,
              yoy: shopifyTrafficAnalysis.usersYoy,
            },
            unit: formatNumberObj(shopifyTrafficAnalysis.totalUsers).unit,
          },
          {
            title: '加购会话数',
            data: {
              current: formatNumberObj(shopifyTrafficAnalysis.addToCartSessions).value,
              last: shopifyTrafficAnalysis.addToCartSessionsMom,
              yoy: shopifyTrafficAnalysis.addToCartSessionsYoy,
            },
            unit: formatNumberObj(shopifyTrafficAnalysis.addToCartSessions).unit,
          },
          {
            title: '加购率',
            data: {
              current: formatPercent(shopifyTrafficAnalysis.addToCartRate),
              last: shopifyTrafficAnalysis.addToCartRateMom,
              yoy: shopifyTrafficAnalysis.addToCartRateYoy,
            },
            unit: '%',
          },
        ];
      case 'tk':
        return [
          {
            title: '总页面浏览量',
            data: {
              current: formatNumberObj(tiktokTrafficAnalysis.totalPageViews).value,
              last: tiktokTrafficAnalysis.pageViewsMom,
              yoy: tiktokTrafficAnalysis.pageViewsYoy,
            },
            unit: formatNumberObj(tiktokTrafficAnalysis.totalPageViews).unit,
          },
          {
            title: '总会话数',
            data: {
              current: formatNumberObj(tiktokTrafficAnalysis.totalSessions).value,
              last: tiktokTrafficAnalysis.sessionsMom,
              yoy: tiktokTrafficAnalysis.sessionsYoy,
            },
            unit: formatNumberObj(tiktokTrafficAnalysis.totalSessions).unit,
          },
          {
            title: '转化率',
            data: {
              current: formatPercent(tiktokTrafficAnalysis.conversionRate),
              last: tiktokTrafficAnalysis.conversionRateMom,
              yoy: tiktokTrafficAnalysis.conversionRateYoy,
            },
            unit: '%',
          },
          {
            title: '访问用户数',
            data: {
              current: formatNumberObj(tiktokTrafficAnalysis.totalUsers).value,
              last: tiktokTrafficAnalysis.usersMom,
              yoy: tiktokTrafficAnalysis.usersYoy,
            },
            unit: formatNumberObj(tiktokTrafficAnalysis.totalUsers).unit,
          },
          {
            title: '曝光量',
            data: {
              current: formatNumberObj(tiktokTrafficAnalysis.impressions).value,
              last: tiktokTrafficAnalysis.impressionsMom,
              yoy: tiktokTrafficAnalysis.impressionsYoy,
            },
            unit: formatNumberObj(tiktokTrafficAnalysis.impressions).unit,
          },
          {
            title: '点击率',
            data: {
              current: formatPercent(tiktokTrafficAnalysis.clickThroughRate),
              last: tiktokTrafficAnalysis.clickThroughRateMom,
              yoy: tiktokTrafficAnalysis.clickThroughRateYoy,
            },
            unit: '%',
          },
        ];
      default:
        return [];
    }
  });

  const { report } = useReport();
  const drilldownMap = {
    amazon: {
      title: '亚马逊',
      menuCode: 'M2025072316382182591626',
      frameUrl:
        'aHR0cHM6Ly9maW5lYmkubHV0ZW9zLmNvbS93ZWJyb290L2RlY2lzaW9uL3Y1L2Rlc2lnbi9yZXBvcnQvODE4Mzc2YWQ0NjUwNGU0MjkxZTk1ZDFiNDFmMDhjYWEvdmlldz9lbnRyeVR5cGU9Nw==',
    },
    station: {
      title: '独立站',
      menuCode: 'M2025091119535617062738',
      frameUrl:
        'aHR0cHM6Ly9maW5lYmkubHV0ZW9zLmNvbS93ZWJyb290L2RlY2lzaW9uL3Y1L2Rlc2lnbi9yZXBvcnQvYWQwN2YwNTM1NDgzNDRhNzg3MzIzMTk3MjQ5ZTU4YmQvdmlldz9lbnRyeVR5cGU9Nw==',
    },
    tk: {
      title: 'TikTok',
      menuCode: 'M2025072410072516803441',
      frameUrl:
        'aHR0cHM6Ly9maW5lYmkubHV0ZW9zLmNvbS93ZWJyb290L2RlY2lzaW9uL3Y1L2Rlc2lnbi9yZXBvcnQvNzhmOGE1OWQ0ZTc2NDE2NGJiN2Y0NzAwNWEzMTJlNzEvdmlldw==',
    },
  };
  const onDetail = () => {
    if (!drilldownMap[type.value].menuCode) return;
    report('drill_down_page', {
      special_topic_title: '流量分析',
      button_name: '流量分析',
      drill_down_page_name: `${drilldownMap[type.value].title}流量分析`,
      menuCode: drilldownMap[type.value].menuCode,
      drill_down_page_url: decryptByBase64(drilldownMap[type.value].frameUrl),
    });
    router.push({
      name: 'frame',
      params: {
        menuCode: drilldownMap[type.value].menuCode,
        frameUrl: drilldownMap[type.value].frameUrl,
      },
    });
  };
  const onPlatformChange = () => {
    const platform = platformList.value.find((item) => item!.code === type.value);
    report(platform?.name || 'click', {
      special_topic_title: '流量分析',
      button_name: platform?.name || '',
    });
  };
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    min-width: 100%;
    min-height: 94px;
    :deep(.indicator-table) {
      &:first-child {
        margin-left: 0;
      }
    }
  }
</style>
