import { computed, ref, watch, type Ref } from 'vue';

type ExternalChangeMode = 'reset-first' | 'keep-valid-page';

interface UseLocalPaginationOptions<T> {
  /** 外部数据源（单一真源） */
  source: Ref<T[]>;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 分页器可选每页条数 */
  pageSizeOptions?: number[];
  /** 外部数据源变更后的页码处理策略 */
  onExternalChange?: ExternalChangeMode;
}

interface SetDataOptions {
  /** 替换数据后回到第一页 */
  resetToFirst?: boolean;
  /** 替换数据后跳转到最后一页 */
  jumpToLast?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
export default function useLocalPagination<T>(options: UseLocalPaginationOptions<T>) {
  const {
    source,
    defaultPageSize = 20,
    pageSizeOptions = [10, 20, 50, 100],
    onExternalChange = 'reset-first',
  } = options;

  const currentPage = ref(1);
  const pageSize = ref(defaultPageSize);

  /** 总条数（基于外部数据源实时计算） */
  const total = computed(() => source.value.length);
  /** 总页数，最小为 1，避免出现 0 页 */
  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)));
  /** 当前页展示数据切片 */
  const pagedRows = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    return source.value.slice(start, start + pageSize.value);
  });

  /** 将当前页码钳制在有效区间 [1, totalPages] */
  const clampCurrentPage = () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
    if (currentPage.value < 1) {
      currentPage.value = 1;
    }
  };

  /** 手动设置页码，并自动纠正越界 */
  const setPage = (page: number) => {
    currentPage.value = page;
    clampCurrentPage();
  };

  /** 设置每页条数，并按新页大小修正当前页 */
  const setPageSize = (size: number) => {
    pageSize.value = size;
    clampCurrentPage();
  };

  /** 替换整份数据源，并按选项决定页码行为 */
  const setData = (rows: T[], setOptions?: SetDataOptions) => {
    source.value = rows;
    if (setOptions?.jumpToLast) {
      currentPage.value = Math.max(1, Math.ceil(source.value.length / pageSize.value));
      return;
    }
    if (setOptions?.resetToFirst) {
      currentPage.value = 1;
      return;
    }

    clampCurrentPage();
  };

  /** 追加数据后默认跳转到最后一页（用于“新增后看见新增项”） */
  const appendRows = (rows: T[]) => {
    source.value = [...source.value, ...rows];
    currentPage.value = Math.max(1, Math.ceil(source.value.length / pageSize.value));
  };

  /** 按条件删除数据，并自动修正页码（防止空白页） */
  const removeBy = (predicate: (row: T) => boolean) => {
    source.value = source.value.filter((row) => !predicate(row));
    clampCurrentPage();
  };

  /** 重置到第一页 */
  const resetPage = () => {
    currentPage.value = 1;
  };

  /** 监听外部数据替换行为，统一执行页码策略 */
  watch(
    source,
    () => {
      if (onExternalChange === 'reset-first') {
        currentPage.value = 1;
      } else {
        clampCurrentPage();
      }
    },
    { deep: false }
  );

  return {
    currentPage,
    pageSize,
    pageSizeOptions,
    total,
    totalPages,
    pagedRows,
    setPage,
    setPageSize,
    setData,
    appendRows,
    removeBy,
    resetPage,
    clampCurrentPage,
  };
}
