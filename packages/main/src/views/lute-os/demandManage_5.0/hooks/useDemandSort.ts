import type { DemandSortState } from '../types/workbench';

interface DemandSortField {
  field: string;
  prop: string;
}

export const useDemandSort = (sortFields: DemandSortField[]) => {
  const sortState = ref<DemandSortState>({
    orderField: '',
    orderType: '',
  });

  const updateSortByTable = (prop: string, order: 'ascending' | 'descending' | null) => {
    const matchedField = sortFields.find((item) => item.prop === prop);
    if (!matchedField || !order) {
      sortState.value = { orderField: '', orderType: '' };
      return;
    }
    sortState.value = {
      orderField: matchedField.field,
      orderType: order === 'ascending' ? 'asc' : 'desc',
    };
  };

  const resetSort = () => {
    sortState.value = { orderField: '', orderType: '' };
  };

  return {
    sortState,
    updateSortByTable,
    resetSort,
  };
};

