import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { merge, isEmpty } from 'lodash-es';
import { memberApi, platformApi } from '@/api';
import { useStore } from '@/store/modules/useStore';

type BaseInfoKey = 'categoryOptions' | 'isProductCenter' | 'deptMemberOptions';

type DemandBaseInfoState = {
  ownerMemberCode: string;
  categoryOptions: any[];
  isProductCenter: boolean;
  deptMemberOptions: any[];
  loadedAtMap: Record<BaseInfoKey, number>;
  expireAtMap: Record<BaseInfoKey, number>;
};

const baseInfoStorageKey = 'demand-manage-5-base-info';

const CATEGORY_OPTIONS_TTL = 12 * 60 * 60 * 1000;
const PRODUCT_CENTER_TTL = 2 * 60 * 60 * 1000;
const DEPT_MEMBER_OPTIONS_TTL = 2 * 60 * 60 * 1000;

const defaultState: DemandBaseInfoState = {
  ownerMemberCode: '',
  categoryOptions: [],
  isProductCenter: true,
  deptMemberOptions: [],
  loadedAtMap: {
    categoryOptions: 0,
    isProductCenter: 0,
    deptMemberOptions: 0,
  },
  expireAtMap: {
    categoryOptions: 0,
    isProductCenter: 0,
    deptMemberOptions: 0,
  },
};

export const useDemandBaseInfoStore = defineStore('demandBaseInfo5', () => {
  const userInfoStore = useStore();
  const persistedState = useStorage<DemandBaseInfoState>(baseInfoStorageKey, merge({}, defaultState));
  const state = ref<DemandBaseInfoState>(merge({}, defaultState, persistedState.value));

  const loadingMap = ref<Record<BaseInfoKey, boolean>>({
    categoryOptions: false,
    isProductCenter: false,
    deptMemberOptions: false,
  });
  const errorMap = ref<Record<BaseInfoKey, string | null>>({
    categoryOptions: null,
    isProductCenter: null,
    deptMemberOptions: null,
  });

  let categoryOptionsPromise: Promise<any[]> | null = null;
  let isProductCenterPromise: Promise<boolean> | null = null;
  let deptMemberOptionsPromise: Promise<any[]> | null = null;

  const syncPersistedState = () => {
    persistedState.value = merge({}, state.value);
  };

  const setState = (nextState: Partial<DemandBaseInfoState>) => {
    state.value = merge({}, state.value, nextState);
    syncPersistedState();
  };

  const setTtl = (key: BaseInfoKey, ttl: number) => {
    const now = Date.now();
    setState({
      loadedAtMap: {
        ...state.value.loadedAtMap,
        [key]: now,
      },
      expireAtMap: {
        ...state.value.expireAtMap,
        [key]: now + ttl,
      },
    });
  };

  const isExpired = (key: BaseInfoKey) => Date.now() >= (state.value.expireAtMap[key] || 0);
  const currentMemberCode = computed(() => `${userInfoStore.getInfo?.memberCode || ''}`);
  const ensureOwnerScope = () => {
    if (state.value.ownerMemberCode === currentMemberCode.value) {
      return;
    }
    state.value = merge({}, defaultState, { ownerMemberCode: currentMemberCode.value });
    syncPersistedState();
  };

  const ensureCategoryOptions = async (options?: { force?: boolean }) => {
    ensureOwnerScope();
    const force = Boolean(options?.force);
    const hasAvailableCache = !isEmpty(state.value.categoryOptions);
    if (!force && hasAvailableCache && !isExpired('categoryOptions')) {
      return state.value.categoryOptions;
    }
    if (categoryOptionsPromise) {
      return categoryOptionsPromise;
    }

    loadingMap.value.categoryOptions = true;
    errorMap.value.categoryOptions = null;
    categoryOptionsPromise = platformApi
      .platformDemandQueryCategoryTree()
      .then((res) => {
        const categoryOptions = [
          { categoryCode: '0', categoryName: '新品调研', fullCategoryName: '新品调研' },
          ...(res.categoryDataList ?? []),
        ];
        setState({ categoryOptions });
        setTtl('categoryOptions', CATEGORY_OPTIONS_TTL);
        return categoryOptions;
      })
      .catch((error) => {
        errorMap.value.categoryOptions = `${error?.message || error || ''}`;
        return state.value.categoryOptions;
      })
      .finally(() => {
        loadingMap.value.categoryOptions = false;
        categoryOptionsPromise = null;
      });

    return categoryOptionsPromise;
  };

  const ensureProductCenter = async (options?: { force?: boolean }) => {
    ensureOwnerScope();
    const force = Boolean(options?.force);
    const hasLoaded = Boolean(state.value.loadedAtMap.isProductCenter);
    if (!force && hasLoaded && !isExpired('isProductCenter')) {
      return state.value.isProductCenter;
    }
    if (isProductCenterPromise) {
      return isProductCenterPromise;
    }

    loadingMap.value.isProductCenter = true;
    errorMap.value.isProductCenter = null;
    isProductCenterPromise = platformApi
      .platformDemandIsProductCenterDept()
      .then((res) => {
        const isProductCenter = Boolean(res.productCenterDeptFlag ?? true);
        setState({ isProductCenter });
        setTtl('isProductCenter', PRODUCT_CENTER_TTL);
        return isProductCenter;
      })
      .catch((error) => {
        errorMap.value.isProductCenter = `${error?.message || error || ''}`;
        return state.value.isProductCenter;
      })
      .finally(() => {
        loadingMap.value.isProductCenter = false;
        isProductCenterPromise = null;
      });

    return isProductCenterPromise;
  };

  const ensureBaseInfo = async (options?: { force?: boolean }) => {
    ensureOwnerScope();
    await Promise.allSettled([
      ensureCategoryOptions({ force: options?.force }),
      ensureProductCenter({ force: options?.force }),
      ensureDeptMemberOptions({ force: options?.force }),
    ]);
  };

  const ensureDeptMemberOptions = async (options?: { force?: boolean }) => {
    ensureOwnerScope();
    const force = Boolean(options?.force);
    const hasAvailableCache = !isEmpty(state.value.deptMemberOptions);
    if (!force && hasAvailableCache && !isExpired('deptMemberOptions')) {
      return state.value.deptMemberOptions;
    }
    if (deptMemberOptionsPromise) {
      return deptMemberOptionsPromise;
    }

    loadingMap.value.deptMemberOptions = true;
    errorMap.value.deptMemberOptions = null;
    deptMemberOptionsPromise = memberApi
      .luteosMemberQueryDeptMemberList({
        operatorDepartmentCode: 'all_dept',
        searchChildDept: true,
      })
      .then((res) => {
        const deptMemberOptions = res.memberList ?? [];
        setState({ deptMemberOptions });
        setTtl('deptMemberOptions', DEPT_MEMBER_OPTIONS_TTL);
        return deptMemberOptions;
      })
      .catch((error) => {
        errorMap.value.deptMemberOptions = `${error?.message || error || ''}`;
        return state.value.deptMemberOptions;
      })
      .finally(() => {
        loadingMap.value.deptMemberOptions = false;
        deptMemberOptionsPromise = null;
      });

    return deptMemberOptionsPromise;
  };

  const refreshAll = async () => {
    ensureOwnerScope();
    await ensureBaseInfo({ force: true });
  };

  const reset = () => {
    state.value = merge({}, defaultState, { ownerMemberCode: currentMemberCode.value });
    loadingMap.value = {
      categoryOptions: false,
      isProductCenter: false,
      deptMemberOptions: false,
    };
    errorMap.value = {
      categoryOptions: null,
      isProductCenter: null,
      deptMemberOptions: null,
    };
    syncPersistedState();
  };

  const categoryOptions = computed(() => state.value.categoryOptions);
  const isProductCenter = computed(() => state.value.isProductCenter);
  const deptMemberOptions = computed(() => state.value.deptMemberOptions);
  const deptMemberMap = computed(() =>
    state.value.deptMemberOptions.reduce<Record<string, any>>((acc, item) => {
      acc[item.memberCode] = item;
      return acc;
    }, {})
  );

  return {
    state,
    loadingMap,
    errorMap,
    categoryOptions,
    isProductCenter,
    deptMemberOptions,
    deptMemberMap,
    ensureCategoryOptions,
    ensureProductCenter,
    ensureDeptMemberOptions,
    ensureBaseInfo,
    refreshAll,
    reset,
    isExpired,
    setState,
  };
});
