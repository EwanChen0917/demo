<template>
  <div class="index-exchange-rate">
    <block-title>外汇牌价</block-title>
    <div class="exchange-country">
      <exchange-country-selector v-model:modelValue="source" />
      <exchange-country-selector
        v-model:modelValue="target"
        :list="[{ name: '中国', code: 'CNY', flag: 'CN' }]"
      />
    </div>
    <div class="exchange-rate">
      <div v-if="loading">...</div>
      <div v-else-if="targetValue !== '-'">
        <span>{{ currentValue }}</span>
        <span style="padding: 0 12px">=</span>
        <span>{{ targetValue }}</span>
      </div>
      <div v-else>-</div>
    </div>
    <div class="exchange-tip" v-if="false">公司执行汇率: 7.20</div>
  </div>
</template>

<script setup lang="ts">
  import { dataApi, metaApi } from '@/api';
  import dayjs from 'dayjs';
  import BlockTitle from './components/blockTitle.vue';
  import ExchangeCountrySelector from './components/exchangeCountrySelector.vue';

  const props = withDefaults(
    defineProps<{
      monthValue: string;
    }>(),
    {
      monthValue: dayjs().format('YYYY-MM'),
    }
  );

  const source = ref('USD');
  const target = ref('CNY');

  const currentValue = ref(1);
  const targetValue = ref('');

  const loading = ref(false);

  watch(
    () => [source.value, target.value, props.monthValue],
    async () => {
      if (source.value && target.value) {
        loading.value = true;
        try {
          const res = await dataApi.luteosDataQueryFinanceCurrencyRate({
            keyword: source.value,
            reportMonth: props.monthValue,
            pageNum: 1,
            pageSize: 50,
          });
          const result = res.rateList?.find(
            (item) =>
              item.originalCurrencyCode &&
              item.originalCurrencyCode.toUpperCase() === source.value.toUpperCase()
          );
          targetValue.value = result?.rateCny || '-';
        } catch (error) {
          targetValue.value = '-';
        }
        loading.value = false;
      } else {
        targetValue.value = '';
      }
    },
    {
      immediate: true,
    }
  );
</script>

<style scoped lang="scss">
  .index-exchange-rate {
    background-color: white;
    padding: 20px;
    border-radius: 10px;

    .exchange-country {
      padding: 26px 12px 16px;
      display: flex;
      gap: 26px;
    }

    .exchange-rate {
      color: var(---N9, #1f1f1f);
      font-size: 18px;
      padding-left: 12px;
      font-weight: 500;
      color: var(---N9, #1f1f1f);

      /* 突出/Medium 18 */
      font-family: 'PingFang SC Medium';
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px; /* 144.444% */
    }

    .exchange-tip {
      padding-top: 12px;
      color: var(---N6, #999);
      font-size: 12px;
    }
  }
</style>
