import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import type { DemandURQueryBean } from '@/api/platform/data-contracts';
import type { MaybeRef } from 'vue';
import type { DemandWorkbenchBizTab } from '../types/workbench';

export interface DemandColumnSchema {
  key: string;
  label: string;
  minWidth?: number;
  width?: number;
  sortable?: boolean;
  formatter?: (row: DemandURQueryBean) => string;
}

const formatDateValue = (value?: string) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '--');

export const useDemandColumns = (
  bizTab: MaybeRef<DemandWorkbenchBizTab>,
  visibleColumnKeys?: MaybeRef<string[] | undefined>
) => {
  const baseColumns = computed<DemandColumnSchema[]>(() => [
    { key: 'demandTitle', label: '需求标题', minWidth: 220 },
    {
      key: 'demandDesc',
      label: '需求描述',
      minWidth: 260,
      formatter: (row) => (row as any).demandDesc ?? '--',
    },
    { key: 'creatorName', label: '需求创建人', width: 140 },
    {
      key: 'createTime',
      label: '需求创建时间',
      minWidth: 180,
      sortable: true,
      formatter: (row) => formatDateValue(row.createTime),
    },
    { key: 'productLineDesc', label: '产品品线', minWidth: 140 },
    { key: 'categoryDesc', label: '产品分类', minWidth: 180 },
    { key: 'demandTypeDesc', label: '需求类型', minWidth: 140 },
    { key: 'demandPropertyDesc', label: '需求属性', minWidth: 140 },
    {
      key: 'handlerName',
      label: '需求执行人',
      minWidth: 140,
      formatter: (row) => {
        const demandHandlerList = (row as any).demandHandlerList;
        if (Array.isArray(demandHandlerList) && !isEmpty(demandHandlerList)) {
          return demandHandlerList
            .map((item) => item?.handlerName || item?.handler || '')
            .filter((item) => !!item)
            .join('、');
        }
        if (typeof demandHandlerList === 'string' && demandHandlerList) {
          return demandHandlerList;
        }
        return (row as any).handlerName ?? '--';
      },
    },
    { key: 'statusDesc', label: '需求状态', minWidth: 120 },
  ]);

  const columns = computed(() => {
    const currentVisibleColumnKeys = unref(visibleColumnKeys);
    const filteredColumns = [...baseColumns.value];
    if (!isEmpty(currentVisibleColumnKeys)) {
      return filteredColumns.filter((column) => currentVisibleColumnKeys?.includes(column.key));
    }
    return filteredColumns;
  });

  return {
    columns,
  };
};
