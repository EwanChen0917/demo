<template>
  <DataCard title="售后分析">
    <template #title>
      <label class="link-label" @click="onDetail">
        <span>售后分析</span>
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
    <div class="content">
      <Amazon
        v-if="type === 'amazon'"
        :amazonAfterSalesAnalysis="afterSalesAnalysis?.amazonAfterSalesAnalysis || {}"
      />
      <Station
        v-else-if="type === 'station'"
        :data="afterSalesAnalysis?.shopifyAfterSalesAnalysis || {}"
      />
      <Station
        v-else-if="type === 'tk'"
        :data="afterSalesAnalysis?.tiktokAfterSalesAnalysis || {}"
      />
    </div>
  </DataCard>
</template>

<script setup lang="ts">
  import { AfterSalesAnalysisBean } from '@/api/bi/data-contracts';
  import { encryptByBase64 } from '@/utils/aesTils';
  import DataCard from '../../components/DataCard.vue';
  import Amazon from './Amazon.vue';
  import Station from './Station.vue';
  import { useReport } from '../../hooks/useReport';

  const router = useRouter();

  const props = withDefaults(
    defineProps<{
      afterSalesAnalysis: AfterSalesAnalysisBean;
    }>(),
    {
      afterSalesAnalysis: {
        amazonAfterSalesAnalysis: {},
        shopifyAfterSalesAnalysis: {},
        tiktokAfterSalesAnalysis: {},
      },
    }
  );

  const platformList = computed(() => {
    return [
      (props.afterSalesAnalysis?.amazonAfterSalesAnalysis && {
        name: '亚马逊',
        code: 'amazon',
        desc: '亚马逊',
      }) ||
        null,
      (props.afterSalesAnalysis?.shopifyAfterSalesAnalysis && {
        name: '独立站',
        code: 'station',
        desc: '独立站',
      }) ||
        null,
      (props.afterSalesAnalysis?.tiktokAfterSalesAnalysis && {
        name: 'TikTok',
        code: 'tk',
        desc: 'Tiktok平台',
      }) ||
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
  const buildQuery = inject<any>('buildQuery')!;
  const { report } = useReport();
  const onDetail = () => {
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
    const url = '/bi/voc';
    report('drill_down_page', {
      special_topic_title: '售后分析',
      button_name: '售后分析',
      drill_down_page_name: '售后分析',
      drill_down_page_url: url,
    });
    const platform = platformList.value.find((item) => item!.code === type.value);
    router.push({
      path: url,
      query: {
        params: encryptByBase64(
          JSON.stringify({ ...filteredQuery, platformList: [platform!.desc] })
        ),
      },
    });
  };
  const onPlatformChange = (value: string) => {
    const platform = platformList.value.find((item) => item!.code === value);
    report(platform?.name || 'click', {
      special_topic_title: '售后分析',
      button_name: platform?.name || '',
    });
  };
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
  }
</style>
