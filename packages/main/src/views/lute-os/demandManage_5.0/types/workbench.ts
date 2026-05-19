import type { DemandListV3CountResp, DemandListV3QueryReq, DemandURQueryBean } from '@/api/platform/data-contracts';

export type DemandWorkbenchView = 'list' | 'personalStats' | 'deptStats';
export type DemandWorkbenchWorkTab = 'list' | 'submit' | 'detail';
export type DemandWorkbenchBizTab = 'all' | 'todo' | 'mine' | 'processed';
export type DemandWorkbenchSortOrder = '' | 'asc' | 'desc';

export interface DemandWorkbenchQueryState {
  view: DemandWorkbenchView;
  workTab: DemandWorkbenchWorkTab;
  bizTab: DemandWorkbenchBizTab;
  demandCode: string;
}

export interface DemandFilterForm {
  keyword: string;
  creator: string;
  productLine: string;
  categoryCode: string;
  demandType: number | undefined;
  demandProperty: number | undefined;
  demandHandlerList: string[];
  statusList: number[];
}

export interface DemandSortState {
  orderField: string;
  orderType: DemandWorkbenchSortOrder;
}

export type DemandWorkbenchTabCount = Partial<Record<DemandWorkbenchBizTab, number>>;

export interface DemandWorkbenchListQuery extends DemandFilterForm {
  pageNum: number;
  pageSize: number;
  bizTab: DemandWorkbenchBizTab;
  orderField?: string;
  orderType?: DemandWorkbenchSortOrder;
}

export interface DemandWorkbenchListResult {
  list: DemandURQueryBean[];
  total: number;
}

export interface DemandWorkbenchCountResult {
  countMap: DemandWorkbenchTabCount;
  raw: DemandListV3CountResp;
}

export type DemandListBaseReq = Omit<DemandListV3QueryReq, 'pageNum' | 'pageSize'>;
