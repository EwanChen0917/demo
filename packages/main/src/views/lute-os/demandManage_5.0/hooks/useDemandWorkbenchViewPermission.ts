import { checkPermission } from '@/utils/permission';
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';
import type { DemandWorkbenchView } from '../types/workbench';

const viewPermissionCodeMap: Partial<Record<DemandWorkbenchView, string>> = {
  personalStats: 'demand5PersonalStatsMenu',
  deptStats: 'demand5DeptStatsMenu',
};

export const useDemandWorkbenchViewPermission = (
  route: RouteLocationNormalizedLoaded,
  router: Router
) => {
  const normalizeViewByPermission = (view: DemandWorkbenchView): DemandWorkbenchView => {
    const permissionCode = viewPermissionCodeMap[view];
    if (!permissionCode) {
      return view;
    }
    return checkPermission(permissionCode) ? view : 'list';
  };

  const normalizeRouteViewQuery = async () => {
    const routeView = `${route.query.view ?? ''}` as DemandWorkbenchView | '';
    if (!routeView) {
      return;
    }
    const normalizedView = normalizeViewByPermission(routeView as DemandWorkbenchView);
    if (normalizedView === routeView) {
      return;
    }
    const nextQuery = { ...route.query };
    if (normalizedView === 'list') {
      delete nextQuery.view;
    } else {
      nextQuery.view = normalizedView;
    }
    await router.replace({
      path: route.path,
      query: nextQuery,
    });
  };

  return {
    normalizeViewByPermission,
    normalizeRouteViewQuery,
  };
};

