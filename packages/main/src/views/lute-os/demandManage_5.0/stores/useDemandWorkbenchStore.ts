import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { merge, omitBy } from 'lodash-es';
import type { LocationQuery } from 'vue-router';
import { defaultWorkbenchQuery } from '../constants/routeMapping';
import type {
  DemandWorkbenchQueryState,
  DemandWorkbenchTabCount,
  DemandWorkbenchView,
  DemandWorkbenchWorkTab,
  DemandWorkbenchBizTab,
} from '../types/workbench';

const workbenchStateStorageKey = 'demand-manage-5-workbench-state';

const toSingleQueryValue = (value: string | string[] | null | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const useDemandWorkbenchStore = defineStore('demandWorkbench5', () => {
  const persistedState = useStorage<DemandWorkbenchQueryState>(
    workbenchStateStorageKey,
    merge({}, defaultWorkbenchQuery)
  );

  const isCollapsed = useStorage('demand-manage-5-sider-collapsed', false);

  const currentDemandTitle = ref('');

  const tabCountMap = ref<DemandWorkbenchTabCount>({
    all: undefined,
    todo: undefined,
    mine: undefined,
    processed: undefined,
  });

  const state = ref<DemandWorkbenchQueryState>(merge({}, defaultWorkbenchQuery, persistedState.value));

  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  const setCurrentDemandTitle = (title: string) => {
    currentDemandTitle.value = title;
  };

  const setState = (nextState: Partial<DemandWorkbenchQueryState>) => {
    state.value = merge({}, state.value, nextState);
    persistedState.value = merge({}, state.value);
  };

  const resetState = () => {
    state.value = merge({}, defaultWorkbenchQuery);
    persistedState.value = merge({}, defaultWorkbenchQuery);
  };

  const syncFromRouteQuery = (query: LocationQuery) => {
    const fromQueryState: Partial<DemandWorkbenchQueryState> = {
      view: toSingleQueryValue(query.view as string) as DemandWorkbenchQueryState['view'],
      workTab: toSingleQueryValue(query.workTab as string) as DemandWorkbenchQueryState['workTab'],
      bizTab: toSingleQueryValue(query.bizTab as string) as DemandWorkbenchQueryState['bizTab'],
      demandCode: toSingleQueryValue(query.demandCode as string) || '',
    };

    const safeState: Partial<DemandWorkbenchQueryState> = omitBy(fromQueryState, (value) => !value);
    setState(safeState);
  };

  const toRouteQuery = computed(() => {
    const query: Record<string, string> = {
      view: state.value.view,
      workTab: state.value.workTab,
      bizTab: state.value.bizTab,
    };
    if (state.value.demandCode) {
      query.demandCode = state.value.demandCode;
    }
    return query;
  });

  const setView = (view: DemandWorkbenchQueryState['view']) => {
    setState({ view });
  };

  const setWorkTab = (workTab: DemandWorkbenchQueryState['workTab']) => {
    setState({ workTab });
  };

  const setBizTab = (bizTab: DemandWorkbenchQueryState['bizTab']) => {
    setState({ bizTab });
  };

  const openDetail = (demandCode: string) => {
    setState({
      workTab: 'detail',
      demandCode,
      view: 'list',
    });
  };

  const openSubmit = () => {
    setState({
      workTab: 'submit',
      view: 'list',
      demandCode: '',
    });
  };

  const openList = () => {
    setState({
      workTab: 'list',
      view: 'list',
      demandCode: '',
    });
  };

  return {
    state,
    isCollapsed,
    currentDemandTitle,
    tabCountMap,
    toRouteQuery,
    setState,
    setView,
    setWorkTab,
    setBizTab,
    setCurrentDemandTitle,
    openDetail,
    openSubmit,
    openList,
    resetState,
    syncFromRouteQuery,
    toggleCollapse,
  };
});
