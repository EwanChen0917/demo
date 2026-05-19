import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { dataApi } from '@/api';

const EXP_DURATION = 60 * 60 * 1000;

type CurrencyOption = {
  currencyCode?: string;
  currencyName?: string;
  value?: string;
  label?: string;
};

export const useCurrencyLabel = () => {
  const currencyOptions = useStorage<CurrencyOption[]>('currencyOptions', []);
  const currencyExpiration = useStorage<number>('currencyOptionsExpiration', 0);

  const ensureCurrencyOptions = async () => {
    const now = Date.now();
    if (currencyOptions.value?.length && now <= (currencyExpiration.value || 0)) return;
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyOptions.value = res.currencyList ?? [];
    currencyExpiration.value = now + EXP_DURATION;
  };

  void ensureCurrencyOptions();

  const currencyLabelMap = computed<Record<string, string>>(() =>
    (currencyOptions.value ?? []).reduce((acc, cur) => {
      const code = cur?.currencyCode || cur?.value;
      const name = cur?.currencyName || cur?.label;
      if (code && name) acc[code] = name;
      return acc;
    }, {} as Record<string, string>)
  );

  const extendCurrencyMapFromStorage = (map: Record<string, string>) => {
    Object.entries(currencyLabelMap.value).forEach(([code, label]) => {
      map[code] = label;
    });
  };

  const buildLabelGetter = (map: Record<string, string>) => {
    return (code?: string) => {
      if (!code) return '';
      if (map[code]) return map[code];
      extendCurrencyMapFromStorage(map);
      return map[code] || '';
    };
  };

  const formatCurrencyLabel = (code?: string) => {
    if (!code) return '--';
    const name = currencyLabelMap.value[code];
    return name ? `【${code}】${name}` : code;
  };

  return {
    formatCurrencyLabel,
    extendCurrencyMapFromStorage,
    buildLabelGetter,
  };
};
