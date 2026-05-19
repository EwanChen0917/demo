import { platformApi } from '@/api';
import type {
  DemandDetailResp,
  DemandExecuteSaveReq,
  DemandListV3CountResp,
  DemandListV3QueryReq,
  DemandListQueryReq,
  DemandListQueryResp,
  DemandOperateReq,
  DemandProcessStepResp,
} from '@/api/platform/data-contracts';
import { isNil, omitBy } from 'lodash-es';
import type {
  DemandWorkbenchBizTab,
  DemandWorkbenchCountResult,
  DemandWorkbenchListQuery,
  DemandWorkbenchListResult,
} from '../types/workbench';

const menuTagMap: Record<DemandWorkbenchBizTab, string> = {
  all: 'submit_list',
  todo: 'submit_approving',
  mine: 'submit_mine',
  processed: 'submit_end',
};

const handleTabTypeMap: Record<DemandWorkbenchBizTab, DemandListV3QueryReq['handleTabType']> = {
  all: 0,
  todo: 1,
  mine: 2,
  processed: 3,
};

export const queryDemandList = (req: DemandListQueryReq) => platformApi.platformDemandV2List(req);

export const queryDemandV3Count = () => platformApi.platformDemandV3Count();

export const queryDemandDetail = (demandCode: string): Promise<DemandDetailResp> =>
  platformApi.platformDemandDetail({ demandCode, demandModule: 'user_research' });

export const queryDemandProcessStep = (demandCode: string): Promise<DemandProcessStepResp> =>
  platformApi.platformDemandQueryDemandProcessStep({ demandCode });

export const saveDemand = (req: Record<string, any>) => platformApi.platformDemandSave(req);

export const operateDemand = (req: DemandOperateReq) => platformApi.platformDemandOperate(req);

export const interApproveDemand = (req: DemandExecuteSaveReq) => platformApi.platformDemandInterApprove(req);

export const queryDemandCategoryTree = () => platformApi.platformDemandQueryCategoryTree();

export const queryWorkbenchTabList = async (
  params: DemandWorkbenchListQuery
): Promise<DemandWorkbenchListResult> => {
  const req: DemandListV3QueryReq & { statusList?: number[] } = {
    pageNum: params.pageNum,
    pageSize: params.pageSize,
    demandModule: 'user_research',
    menuTag: menuTagMap[params.bizTab],
    handleTabType: handleTabTypeMap[params.bizTab],
    keyword: params.keyword,
    creator: params.creator,
    productLine: params.productLine,
    categoryCode: params.categoryCode,
    demandType: params.demandType,
    demandProperty: params.demandProperty,
    demandHandlerList: params.demandHandlerList ?? [],
    statusList: params.statusList ?? [],
    orderField: params.orderField,
    orderType: params.orderType,
  };

  const normalizedReq = omitBy(req, isNil) as DemandListV3QueryReq;
  const response: DemandListQueryResp = await platformApi.platformDemandV3List(normalizedReq);
  return {
    list: response.demandList ?? [],
    total: response.total ?? 0,
  };
};

export const queryWorkbenchTabCount = async (): Promise<DemandWorkbenchCountResult> => {
  const raw: DemandListV3CountResp = await queryDemandV3Count();
  const countMap = {
    all: raw.allNum,
    todo: raw.waitMeNum,
    mine: raw.myCreateNum,
    processed: raw.myHandledNum,
  };
  return { countMap, raw };
};
