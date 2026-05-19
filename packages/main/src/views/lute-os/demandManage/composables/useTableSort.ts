import { ref } from 'vue'

interface OrderField {
  field: string
  label: string
}

export function useTableSort(orderFields: OrderField[]) {
  // 当前排序的prop和order
  const sortProp = ref('')
  const sortOrder = ref('') // 'asc' | 'desc'

  function getSortParams() {
    if (!sortProp.value || !sortOrder.value) return {}
    const found = orderFields.find(f => f.label === sortProp.value)
    if (!found) return {}
    return {
      orderBy: found.field,
      orderType: sortOrder.value
    }
  }

  function resetSort() {
    sortProp.value = ''
    sortOrder.value = ''
  }

  return {
    sortProp,
    sortOrder,
    getSortParams,
    resetSort
  }
}
