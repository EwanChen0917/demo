import { reactive, ref } from 'vue';

export interface ProcurementTabCountConfig<
  Counts extends Record<string, any> = Record<string, any>,
  Key extends string | number = string | number
> {
  key: Key;
  countField: keyof Counts & string;
}

const normalizeCount = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

export const useProcurementActiveTab = <
  Counts extends Record<string, any> = Record<string, any>,
  Key extends string | number = string | number
>(
  configs: ProcurementTabCountConfig<Counts, Key>[],
  initialKey?: Key,
  priorityKeys?: Key[]
) => {
  const fallbackKey = initialKey ?? (configs[0]?.key as Key);
  const activeTab = ref<Key>(fallbackKey);
  const tabCountMap = reactive<Record<string | number, number>>(
    configs.reduce((acc, cur) => {
      acc[cur.key] = 0;
      return acc;
    }, {} as Record<string | number, number>)
  );

  const syncCounts = (counts?: Counts | null) => {
    configs.forEach((config) => {
      const raw = counts ? (counts as Record<string, unknown>)[config.countField as string] : 0;
      tabCountMap[config.key] = normalizeCount(raw);
    });
  };

  const initActiveTabByCounts = (counts?: Counts | null) => {
    syncCounts(counts);
    const priorities = (priorityKeys && priorityKeys.length ? priorityKeys : configs.map((c) => c.key)) as Key[];
    const nextActive = priorities.find((key) => (tabCountMap[key] ?? 0) > 0) ?? fallbackKey;
    activeTab.value = nextActive;
  };

  return {
    activeTab,
    tabCountMap,
    syncCounts,
    initActiveTabByCounts,
  };
};
