import useTask from '@/store/modules/task';
import NoticeWorker from '../tasks/notice.ts?worker';

const worker = new NoticeWorker();
// 接受任务执行结果
worker.onmessage = (e): void => {
  const store = useTask();
  if (e.data.event === 'stop-sampleorderRefresh') {
    store.taskMap.samplesendSync = !e.data.result;
  } else if (e.data.event === 'stop-turnoverRefresh') {
    store.taskMap.turnoverSync = !e.data.result;
  } else if (e.data.event === 'stop-supplierRefresh') {
    store.taskMap.supplierSync = !e.data.result;
  } else if (e.data.event === 'stop-B2BOrderRefresh') {
    store.taskMap.B2BOrderSync = !e.data.result?.canFlag;
    store.taskMap.lastRefreshTime = e.data.result?.lastRefreshTime;
  } else if (e.data.event === 'stop-fbaSendRefresh') {
    store.taskMap.fbaSendSync = !e.data.result?.canFlag;
  } else if (e.data.event === 'stop-customsDeclarationPlanRefresh') {
    store.taskMap.customsDeclarationPlanSync = !e.data.result?.canFlag;
    store.taskMap.customsDeclarationPlanLastRefreshTime = e.data.result?.lastRefreshTime;
  } else if (e.data.event === 'stop-financeBudgetSync') {
    store.taskMap[e.data.type].apiSync = !e.data.result?.canFlag;
    store.taskMap[e.data.type].lastRefreshTime = e.data.result?.lastRefreshTime;
  } else if (e.data.event === 'stop-overSeaSendRefresh') {
    store.taskMap.overSeaSendSync = !e.data.result?.canFlag;
  }
};
export const sampleorderRefresh = (token: string) => {
  worker.postMessage({
    event: 'sampleorderCanRefresh-start',
    token,
  });
};
export const stopSampleorderRefresh = () => {
  worker.postMessage({
    event: 'sampleorderCanRefresh-end',
  });
};
export const turnoverRefresh = (token: string) => {
  worker.postMessage({
    event: 'turnoverSync-start',
    token,
  });
};
export const stopTurnoverRefresh = () => {
  worker.postMessage({
    event: 'turnoverSync-end',
  });
};
export const supplierRefresh = (token: string) => {
  worker.postMessage({
    event: 'supplierSync-start',
    token,
  });
};
export const stopSupplierRefresh = () => {
  worker.postMessage({
    event: 'supplierSync-end',
  });
};
export const B2BOrderRefresh = (token: string) => {
  worker.postMessage({
    event: 'B2BOrderSync-start',
    token,
  });
};
export const stopB2BOrderRefresh = () => {
  worker.postMessage({
    event: 'B2BOrderSync-end',
  });
};
export const fbaSendRefresh = (token: string) => {
  worker.postMessage({
    event: 'fbaSendSync-start',
    token,
  });
};
export const stopFbaSendRefresh = () => {
  worker.postMessage({
    event: 'fbaSendSync-end',
  });
};
export const customsDeclarationPlanRefresh = (token: string) => {
  worker.postMessage({
    event: 'customsDeclarationPlanSync-start',
    token,
  });
};
export const stopCustomsDeclarationPlanRefresh = () => {
  worker.postMessage({
    event: 'customsDeclarationPlanSync-end',
  });
};
export const financeBudgetRefresh = (token: string, type: string) => {
  worker.postMessage({
    event: 'financeBudgetSync-start',
    token,
    type,
  });
};
export const stopFinanceBudgetRefresh = () => {
  worker.postMessage({
    event: 'financeBudgetSync-end',
  });
};
export const overSeaSendRefresh = (token: string) => {
  worker.postMessage({
    event: 'overSeaSendSync-start',
    token,
  });
};
export const stopOverSeaSendRefresh = () => {
  worker.postMessage({
    event: 'overSeaSendSync-end',
  });
};
