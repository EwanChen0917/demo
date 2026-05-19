import { budgetApi } from '@/api';
import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
import dayjs from 'dayjs';
import { BudgetCode } from '@/views/budget/budgetTable/types/type';
import debounce from 'lodash-es/debounce';

// 由表格配置的公式调用
const budgetApiMap = {
  async dwsFinMultiPlatformMonthFinal(code: BudgetCode, params: any[]) {
    if (!params?.length) {
      return;
    }
    const budgetStore = useBudgetStore(code);
    const { detail } = budgetStore;
    const month = detail?.distributeMonthSub1;
    if (!month) {
      return;
    }
    return budgetApi.financeBudgetPresentationTableDwsFinMultiPlatformMonthFinal({
      endMonth: +dayjs(month).format('YYYYMM'),
      startMonth: +dayjs(month).format('YYYY01'),
      paramList: params,
    });
  },
  async dwdChannelSkuInventory(code: BudgetCode, params: any[]) {
    if (!params?.length) {
      return;
    }
    const budgetStore = useBudgetStore(code);
    const { detail } = budgetStore;
    const month = detail?.distributeMonthSub1;
    if (!month) {
      return;
    }

    return budgetApi.financeBudgetPresentationTableDwdChannelSkuInventory({
      month: +dayjs(month).format('MM'),
      year: +dayjs(month).format('YYYY'),
      paramList: params,
    });
  },
  async queryPurchaseCostPrice(code: BudgetCode, params: any[]) {
    if (!params?.length) {
      return;
    }
    const budgetStore = useBudgetStore(code);
    const { detail } = budgetStore;
    const month = detail?.distributeMonthSub1;
    if (!month) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    return budgetApi.financeBudgetPresentationTableQueryPurchaseCostPrice({
      relevanceCode: urlParams.get('schemeCode') + urlParams.get('nowStepCode'),
      paramList: params,
    });
  },
};

export function runQueryBudgetApi(queryName: string, code: BudgetCode, params: any) {
  // console.log('runQueryBudgetApi', queryName, code, params);
  if (!queryName || !code || !params) {
    return Promise.resolve(null);
  }
  return addTarget(queryName, code, params);
}

const targets = [];

function runTargets() {
  // 将相同 queryName、code 的 targets 合并
  const targetMap = {};
  targets.forEach((target) => {
    const groupSignature = `${target.queryName}_${target.code}`;
    targetMap[groupSignature] = targetMap[groupSignature] || [];
    targetMap[groupSignature].push(target);
  });
  Object.values(targetMap).forEach((queryTargets) => {
    const { queryName } = queryTargets[0];
    const { code } = queryTargets[0];

    const fun = budgetApiMap[queryName];
    if (!fun) {
      queryTargets.forEach((target) => {
        target.targetResolve(null);
      });
      return;
    }

    const ParallelCount = 3000;
    const groupList = [];
    for (let i = 0; i < queryTargets.length; i += ParallelCount) {
      groupList.push(queryTargets.slice(i, i + ParallelCount));
    }
    groupList.forEach((group) => {
      fun(
        code,
        group.map((x) => x.params)
      )
        .then((list) => {
          if (Array.isArray(list) && list.length === group.length) {
            list.forEach((x, i) => {
              const target = group[i];
              target.targetResolve(x);
            });
          }
        })
        .catch((e) => {
          group.forEach((target) => {
            target.targetResolve(null);
          });
        });
    });
  });
  // 清空 targets
  targets.length = 0;
}

const runTargetDebounce = debounce(runTargets, 500);

function addTarget(queryName, code, params) {
  let targetResolve = null;
  const targetPromise = new Promise((resolve) => {
    targetResolve = resolve;
  });
  targets.push({
    targetResolve,
    targetPromise,
    queryName,
    code,
    params,
  });
  runTargetDebounce();
  return targetPromise;
}
