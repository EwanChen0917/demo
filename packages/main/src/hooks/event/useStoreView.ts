import { platformApi, type PlatformContracts } from '@/api';

export function useStoreView(itemType: string, max = 5, immediate = true) {
  const platform = 'APP_BI';
  const moduleType = 'search';
  const viewList = ref<Array<PlatformContracts.SearchConditionBean>>([]);
  const loading = ref(false);
  let operation: 'init' | 'save' | 'delete' | '' = 'init';
  let initCallback: (() => void) | null = null;
  const initView = (cb: () => void) => {
    initCallback = cb;
  };
  const getViewList = async () => {
    const params = {
      platform,
      moduleType,
      itemType,
      pageNum: 1,
      pageSize: 100,
    };
    loading.value = true;
    const res = await platformApi.platformSearchQueryConditionList(params).finally(() => {
      loading.value = false;
    });
    const { recordList } = res || {};
    viewList.value =
      recordList?.map((item) => {
        const searchCondition = JSON.parse(item.searchCondition || '{}');
        return {
          ...item,
          searchCondition: searchCondition || [],
        };
      }) || [];
    if (operation === 'init') {
      initCallback && initCallback();
    }
    operation = '';
    return res;
  };
  const addView = async (
    payload: { name: string; isDefault: boolean; code?: string },
    conditions: Record<string, any>
  ) => {
    const params = {
      platform,
      moduleType,
      itemType,
      conditionName: payload.name,
      isDefault: payload.isDefault,
      conditionCode: payload.code,
      searchCondition: JSON.stringify(conditions),
    };
    loading.value = true;
    const res = await platformApi.platformSearchSaveCondition(params);
    getViewList();
    return res.conditionCode;
  };
  const updateView = () => {};
  const deleteView = async (conditionCode: string) => {
    await platformApi.platformSearchOperateCondition({
      itemCode: conditionCode,
      operateType: 'delete',
    });
    const index = viewList.value.findIndex((item) => item.conditionCode === conditionCode);
    if (index !== -1) {
      viewList.value.splice(index, 1);
    }
  };
  const setDefaultView = async (conditionCode: string) => {
    const currentOrDefault = viewList.value.filter(
      (item) => item.conditionCode === conditionCode || item.isDefault === 1
    );
    loading.value = true;
    await Promise.all(
      currentOrDefault.map((item) => {
        return platformApi.platformSearchSaveCondition({
          conditionCode: item.conditionCode,
          isDefault: item.conditionCode === conditionCode ? 1 : 0,
        });
      })
    );
    getViewList();
  };
  if (immediate) {
    getViewList();
  }
  return {
    loading,
    viewList,
    getViewList,
    addView,
    updateView,
    deleteView,
    setDefaultView,
    initView,
  };
}
