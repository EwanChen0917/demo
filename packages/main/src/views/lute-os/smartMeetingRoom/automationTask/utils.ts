import { isEqual, sortBy } from 'lodash-es';

import type { ExecuteAction, TriggerCondition } from './types';

export const formatTriggerConditionText = (conditions: TriggerCondition[]) => {
  const list = (conditions || []).map((c) => `${c.name}${c.minutes}分钟`);
  return list.join('\n');
};

export const formatExecuteActionText = (actions: ExecuteAction[]) => {
  const list = (actions || []).map((a) => `${a.deviceType}：${a.actionValue}`);
  return list.join('\n');
};

export const normalizeTriggerConditions = (conditions: TriggerCondition[]) => {
  const normalized = (conditions || []).map((c) => ({ key: c.key, minutes: c.minutes }));
  return sortBy(normalized, [(x) => x.key, (x) => x.minutes]);
};

export const normalizeExecuteActions = (actions: ExecuteAction[]) => {
  const normalized = (actions || []).map((a) => ({ deviceType: a.deviceType, actionValue: a.actionValue }));
  return sortBy(normalized, [(x) => x.deviceType, (x) => x.actionValue]);
};

export const isSameTriggerConditions = (a: TriggerCondition[], b: TriggerCondition[]) => {
  return isEqual(normalizeTriggerConditions(a), normalizeTriggerConditions(b));
};

export const isSameExecuteActions = (a: ExecuteAction[], b: ExecuteAction[]) => {
  return isEqual(normalizeExecuteActions(a), normalizeExecuteActions(b));
};

export const isMutualExclusiveActions = (a: ExecuteAction[], b: ExecuteAction[]) => {
  const mapA = new Map(normalizeExecuteActions(a).map((x) => [x.deviceType, x.actionValue]));
  const mapB = new Map(normalizeExecuteActions(b).map((x) => [x.deviceType, x.actionValue]));

  if (mapA.size !== mapB.size) return false;
  for (const [deviceType, valueA] of mapA.entries()) {
    const valueB = mapB.get(deviceType);
    if (valueB == null) return false;
    if (valueA === valueB) return false;
  }
  return true;
};
