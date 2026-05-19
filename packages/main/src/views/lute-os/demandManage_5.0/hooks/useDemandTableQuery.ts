import { useDebounceFn } from '@vueuse/core';
import { cloneDeep, omitBy, isNil, isEqual } from 'lodash-es';
import type { DemandURQueryBean } from '@/api/platform/data-contracts';
import { getDefaultDemandFilterForm } from './useDemandFilters';
import { queryWorkbenchTabCount, queryWorkbenchTabList } from '../services/demandApi';
import type {
  DemandSortState,
  DemandWorkbenchBizTab,
  DemandWorkbenchTabCount,
} from '../types/workbench';

import { useDemandWorkbenchStore } from '../stores/useDemandWorkbenchStore';

const defaultSortState: DemandSortState = {
  orderField: '',
  orderType: '',
};

export const useDemandTableQuery = (
  bizTab: Ref<DemandWorkbenchBizTab>
) => {
  const workbenchStore = useDemandWorkbenchStore();
  const loading = ref(false);
  const countLoading = ref(false);
  const list = ref<DemandURQueryBean[]>([]);
  const total = ref(0);
  const pageNum = ref(1);
  const pageSize = ref(10);
  const latestListRequestId = ref(0);
  const filterForm = ref(getDefaultDemandFilterForm());
  const sortState = ref<DemandSortState>(cloneDeep(defaultSortState));
  const tabCountMap = computed(() => workbenchStore.tabCountMap);

  const normalizedFilterForm = computed(() =>
    omitBy(
      {
        ...filterForm.value,
        demandHandlerList: filterForm.value.demandHandlerList ?? [],
        statusList: filterForm.value.statusList ?? [],
      },
      (value) => isNil(value) || value === '' || (Array.isArray(value) && value.length === 0)
    )
  );

  const runQuery = async () => {
    const requestId = latestListRequestId.value + 1;
    latestListRequestId.value = requestId;
    loading.value = true;
    try {
      const fallbackOrderField = bizTab.value === 'mine' ? 'demand.create_time' : undefined;
      const fallbackOrderType = bizTab.value === 'mine' ? 'desc' : undefined;
      const response = await queryWorkbenchTabList({
        ...normalizedFilterForm.value,
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        bizTab: bizTab.value,
        orderField: sortState.value.orderField || fallbackOrderField,
        orderType: sortState.value.orderType || fallbackOrderType,
      });
      if (requestId !== latestListRequestId.value) {
        return;
      }
      list.value = response.list;
      total.value = response.total;
    } finally {
      if (requestId !== latestListRequestId.value) {
        return;
      }
      loading.value = false;
    }
  };

  const runQueryDebounced = useDebounceFn(async () => {
    pageNum.value = 1;
    await runQuery();
  }, 220);

  const refreshTabCount = async () => {
    countLoading.value = true;
    try {
      const result = await queryWorkbenchTabCount();
      workbenchStore.tabCountMap = {
        ...workbenchStore.tabCountMap,
        ...result.countMap,
      };
    } finally {
      countLoading.value = false;
    }
  };

  const resetFilters = async () => {
    filterForm.value = getDefaultDemandFilterForm();
    sortState.value = cloneDeep(defaultSortState);
    pageNum.value = 1;
  };

  const setPageNum = async (value: number) => {
    pageNum.value = value;
    await runQuery();
  };

  const setPageSize = async (value: number) => {
    pageSize.value = value;
    pageNum.value = 1;
    await runQuery();
  };

  const updateSort = async (orderField: string, orderType: DemandSortState['orderType']) => {
    sortState.value = { orderField, orderType };
    pageNum.value = 1;
    await runQuery();
  };

  const refreshAll = async () => {
    await Promise.all([runQuery(), refreshTabCount()]);
  };

  watch(
    bizTab,
    (nextValue, prevValue) => {
      if (nextValue === prevValue) {
        return;
      }
      sortState.value = cloneDeep(defaultSortState);
    }
  );

  watch(
    normalizedFilterForm,
    (nextValue, prevValue) => {
      if (isEqual(nextValue, prevValue)) {
        return;
      }
      pageNum.value = 1;
      runQueryDebounced();
    },
    { deep: true }
  );

  return {
    loading,
    countLoading,
    list,
    total,
    pageNum,
    pageSize,
    filterForm,
    sortState,
    tabCountMap,
    normalizedFilterForm,
    runQuery,
    runQueryDebounced,
    refreshTabCount,
    resetFilters,
    setPageNum,
    setPageSize,
    updateSort,
    refreshAll,
  };
};
