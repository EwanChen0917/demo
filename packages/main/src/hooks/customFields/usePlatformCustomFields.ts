import { platformApi } from '@/api';
import { computed, ref, unref, type Ref } from 'vue';

type MaybeRef<T> = T | Ref<T>;

export interface CustomFieldProperty {
  key?: string;
  checked?: boolean;
  [k: string]: any;
}

export interface CustomFieldGroup {
  title?: string;
  propertyArr?: CustomFieldProperty[];
  checkedArr?: string[];
  [k: string]: any;
}

export interface UsePlatformCustomFieldsOptions {
  platform?: string;
  moduleType: 'list' | 'export' | 'detail' | string;
  itemType: MaybeRef<any> | (() => any);
  baseFields: MaybeRef<CustomFieldGroup[]>;
  pageSize?: number;
  pageNum?: number;
}

function safeParseHideList(searchCondition: any): string[] {
  if (!searchCondition) return [];
  try {
    const parsed =
      typeof searchCondition === 'string' ? JSON.parse(searchCondition) : searchCondition;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildFieldsWithHideList(base: CustomFieldGroup[], hideList: string[]) {
  return (base || []).map((group) => {
    const propertyArr = (group.propertyArr || []).map((p) => {
      const key = p?.key;
      return {
        ...p,
        checked: key ? !hideList.includes(key) : !!p?.checked,
      };
    });
    const checkedArr = (group.propertyArr || [])
      .filter((p) => p?.key && !hideList.includes(p.key))
      .map((p) => p.key as string);
    return {
      ...group,
      propertyArr,
      checkedArr,
    };
  });
}

function buildFieldsDefault(base: CustomFieldGroup[]) {
  return (base || []).map((group) => {
    return {
      ...group,
      checkedArr: (group.propertyArr || []).filter((p) => p?.checked).map((p) => p.key),
    };
  });
}

function resolveItemType(itemType: UsePlatformCustomFieldsOptions['itemType']) {
  if (typeof itemType === 'function') return itemType();
  return unref(itemType);
}

/**
 * 统一处理平台自定义字段（list/export/detail）的回显：
 * - 拉取 conditionCode + searchCondition（hideList）
 * - 生成每组的 propertyArr.checked + checkedArr
 */
export function usePlatformCustomFields(options: UsePlatformCustomFieldsOptions) {
  const conditionCode = ref<any>(null);
  const fieldList = ref<CustomFieldGroup[]>([]);
  const hideList = ref<string[]>([]);

  const platform = computed(() => options.platform ?? 'lute_erp');
  const pageSize = computed(() => options.pageSize ?? 1);
  const pageNum = computed(() => options.pageNum ?? 1);

  const refresh = async () => {
    const base = unref(options.baseFields) || [];
    const itemTypeVal = resolveItemType(options.itemType);

    const res = await platformApi.platformSearchQueryConditionList({
      platform: platform.value,
      moduleType: options.moduleType,
      itemType: itemTypeVal,
      pageSize: pageSize.value,
      pageNum: pageNum.value,
    });

    if (res?.recordList?.length) {
      const first = res.recordList[0];
      hideList.value = safeParseHideList(first?.searchCondition);
      fieldList.value = buildFieldsWithHideList(base, hideList.value);
      conditionCode.value = first?.conditionCode;
      return;
    }

    fieldList.value = buildFieldsDefault(base);
    conditionCode.value = null;
  };

  return {
    conditionCode,
    fieldList,
    hideList,
    refresh,
  };
}
