import localforage from 'localforage';
import { budgetApi } from '@/api';

localforage.config({
  driver: localforage.INDEXEDDB,
});
const isSupportIndexedDB = localforage.supports(localforage.INDEXEDDB);
export async function loadEnums(planYear, enumIds, tempStore) {
  if (tempStore) {
    tempStore.setTableLoading(`开始加载下拉列表数据...`);
  }

  // 从本地缓存中获取枚举
  const localEnumMap = {};
  if (isSupportIndexedDB) {
    const localTargets = enumIds.map((enumId) => {
      const flag = `BUDGETENUM${planYear}###${enumId}`;
      return localforage.getItem(flag).then((res) => {
        if (res) {
          try {
            localEnumMap[enumId] = JSON.parse(res);
          } catch (error) {
            console.log('error=', error);
          }
        }
      });
    });
    await Promise.allSettled(localTargets);
  }

  // 获取枚举的更新TAG
  let enumTags = {};
  try {
    enumTags = await budgetApi.financeBudgetPresentationTableQueryFillEnumsLastRefreshTime({
      planYear,
      enums: enumIds,
    });
  } catch (error) {
    console.log('error=', error);
  }

  const lastRefreshTime = enumTags?.lastRefreshTime || {};

  const needLoadEnumIds = [];
  const enumsResult = {};

  enumIds.forEach((enumId) => {
    const localEnum = localEnumMap[enumId];
    // 没有缓存，则需要加载
    if (!localEnum) {
      needLoadEnumIds.push(enumId);
      return;
    }
    // 缓存的tag不存在，则需要加载
    if (!lastRefreshTime[enumId]) {
      needLoadEnumIds.push(enumId);
      return;
    }
    // 缓存的tag不一致，则需要加载
    if (lastRefreshTime[enumId] !== localEnum.tag) {
      needLoadEnumIds.push(enumId);
      return;
    }
    // 缓存一致，则使用缓存
    enumsResult[enumId] = localEnum.data;
    console.log('使用缓存=', enumId);
  });
  console.log('需要加载的枚举=', needLoadEnumIds);

  if (needLoadEnumIds?.length) {
    let settledCount = 0;
    const enumTargets = needLoadEnumIds.map((x) => {
      // 由于枚举很大，因此需要一个一个取，否则后端溢出会报错
      return budgetApi
        .financeBudgetPresentationTableQueryFillEnums({
          enums: [x],
          planYear,
        })
        .then((res) => {
          const columnEnums = res.columnEnums || {};
          const lastRefreshTime = res.lastRefreshTime || {};
          if (isSupportIndexedDB) {
            Object.keys(columnEnums).forEach((enumId) => {
              try {
                const tag = lastRefreshTime[enumId];
                if (tag) {
                  const flag = `BUDGETENUM${planYear}###${enumId}`;
                  const enumStr = JSON.stringify({
                    tag,
                    data: columnEnums[enumId],
                  });
                  localforage.setItem(flag, enumStr);
                }
              } catch (error) {
                console.log('error=', error);
              }
            });
          }
          Object.assign(enumsResult, columnEnums);
        })
        .finally(() => {
          settledCount++;
          if (tempStore) {
            tempStore.setTableLoading(
              `下拉列表数据加载中(${settledCount}/${needLoadEnumIds.length})...`
            );
          }
        });
    });
    console.time('#time#枚举加载');
    await Promise.allSettled(enumTargets);
    console.timeEnd('#time#枚举加载');

    Object.keys(enumsResult).forEach((enumId) => {
      enumsResult[enumId] = Object.fromEntries(
        Object.entries(enumsResult[enumId]).map((x) => [x[0].replace(/\s+/g, ' '), x[1]])
      );
    });
  }
  return enumsResult;
}
export function clearBudgetEnums() {
  localforage.keys().then((keys) => {
    keys.forEach((key) => {
      if (key.startsWith('BUDGETENUM')) {
        localforage.removeItem(key);
      }
    });
  });
}
