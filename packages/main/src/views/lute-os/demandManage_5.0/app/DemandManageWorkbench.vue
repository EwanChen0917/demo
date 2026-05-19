<template>
  <div class="dm5-layout">
    <DemandManageSider
      :active-view="workbenchStore.state.view"
      @change="handleViewChange"
      @refresh="handleViewRefresh"
    />
    <section class="dm5-main">
      <div class="dm5-content">
        <KeepAlive :include="['DemandListPage', 'DemandPersonalStats', 'DemandDeptStats']">
          <component :is="activeViewComponent" :key="activeViewRenderKey" />
        </KeepAlive>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { merge, omitBy } from 'lodash-es';
  import { useRoute, useRouter } from 'vue-router';
  import { defaultWorkbenchQuery } from '../constants/routeMapping';
  import { useDemandWorkbenchViewPermission } from '../hooks/useDemandWorkbenchViewPermission';
  import { useDemandBaseInfoStore } from '../stores/useDemandBaseInfoStore';
  import { useDemandWorkbenchStore } from '../stores/useDemandWorkbenchStore';
  import type { DemandWorkbenchQueryState, DemandWorkbenchView } from '../types/workbench';
  // import DemandManageHeader from './DemandManageHeader.vue';
  import DemandManageSider from './DemandManageSider.vue';
  import DemandListPage from '../modules/list/DemandListPage.vue';
  import DemandStatisticsDepartment from '../modules/statistics/DemandStatisticsDepartment.vue';
  import DemandStatisticsPersonal from '../modules/statistics/DemandStatisticsPersonal.vue';
  import '../styles/index.scss';

  const route = useRoute();
  const router = useRouter();
  const workbenchStore = useDemandWorkbenchStore();
  const demandBaseInfoStore = useDemandBaseInfoStore();
  const { normalizeViewByPermission, normalizeRouteViewQuery } =
    useDemandWorkbenchViewPermission(route, router);

  const viewRefreshTokenMap = ref<Record<DemandWorkbenchView, number>>({
    list: 0,
    personalStats: 0,
    deptStats: 0,
  });
  const activeViewComponent = computed(() => {
    switch (workbenchStore.state.view) {
      case 'list':
        return DemandListPage;
      case 'personalStats':
        return DemandStatisticsPersonal;
      case 'deptStats':
        return DemandStatisticsDepartment;
      default:
        return DemandListPage;
    }
  });
  const activeViewRenderKey = computed(
    () => `${workbenchStore.state.view}-${viewRefreshTokenMap.value[workbenchStore.state.view]}`
  );

  const resolveRouteNameState = (): Partial<DemandWorkbenchQueryState> => {
    const routeName = `${route.name ?? ''}`;
    const routeBizTabMap: Partial<Record<string, DemandWorkbenchQueryState['bizTab']>> = {
      demandSubmitList: 'all',
      demandExecuteList: 'all',
      demandSubmitToApprove: 'todo',
      demandExecuteToApprove: 'todo',
      demandExecuteToProcess: 'todo',
      demandSubmitMyDemand: 'mine',
      demandExecuteMyDemand: 'mine',
      demandSubmitDone: 'processed',
    };

    if (routeName === 'demandSubmitCreate') {
      return {
        view: 'list',
        workTab: 'submit',
        demandCode: '',
      };
    }

    if (routeName === 'demandDetail') {
      return {
        view: 'list',
        workTab: 'detail',
        demandCode: `${route.params.id ?? ''}`,
      };
    }

    if (routeName === 'demandStatisticsPersonal') {
      return {
        view: 'personalStats',
        workTab: 'list',
        demandCode: '',
      };
    }

    if (routeName === 'demandStatistics') {
      return {
        view: 'deptStats',
        workTab: 'list',
        demandCode: '',
      };
    }

    const bizTab = routeBizTabMap[routeName];
    if (bizTab) {
      return {
        view: 'list',
        workTab: 'list',
        bizTab,
        demandCode: '',
      };
    }

    return {};
  };

  const resolveRouteState = (): DemandWorkbenchQueryState => {
    const queryState = {
      view: route.query.view as DemandWorkbenchQueryState['view'],
      workTab: route.query.workTab as DemandWorkbenchQueryState['workTab'],
      bizTab: route.query.bizTab as DemandWorkbenchQueryState['bizTab'],
      demandCode: (route.query.demandCode as string) || '',
    };
    const mergedState = merge(
      {},
      defaultWorkbenchQuery,
      resolveRouteNameState(),
      omitBy(queryState, (value) => !value)
    );
    mergedState.view = normalizeViewByPermission(mergedState.view);
    return mergedState;
  };

  const syncStateByRoute = () => {
    const routeState = resolveRouteState();
    workbenchStore.setState(routeState);
  };

  const resolveViewQuery = (view: DemandWorkbenchView) => {
    if (view === 'list') {
      return workbenchStore.toRouteQuery;
    }
    return {
      ...workbenchStore.toRouteQuery,
      view,
    };
  };

  const handleViewChange = (view: DemandWorkbenchView) => {
    const nextView = normalizeViewByPermission(view);
    if (nextView !== view) {
      return;
    }
    if (view === 'list') {
      workbenchStore.setView('list');
    } else {
      workbenchStore.setState({
        view,
        workTab: 'list',
        demandCode: '',
      });
    }
    router.replace({
      path: route.path,
      query: resolveViewQuery(view),
    });
  };

  const handleViewRefresh = async (view: DemandWorkbenchView) => {
    if (view === 'list') {
      await demandBaseInfoStore.refreshAll();
    }
    viewRefreshTokenMap.value[view] += 1;
  };

  watch(
    () => route.fullPath,
    () => {
      void normalizeRouteViewQuery();
      syncStateByRoute();
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  .dm5-layout {
    display: flex;
    height: calc(100vh - 80px); // Fixed height to fill viewport
    // background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
    overflow: hidden; // Prevent outer scroll
  }

  .dm5-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    overflow: hidden;
  }

  .dm5-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
