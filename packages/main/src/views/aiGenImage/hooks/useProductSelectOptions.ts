import { productApi } from '@/api';
import type { ProductContracts } from '@/api';

export interface ProductSelectOption {
  label: string;
  value: string;
  raw?: ProductContracts.CategoryItem | ProductContracts.ProductBean;
}

export interface PagedSelectState {
  keyword: string;
  pageNum: number;
  pageSize: number;
  total: number;
  loading: boolean;
  fetching: boolean;
  options: ProductSelectOption[];
}

const PAGE_SIZE = 20;

export function createPagedSelectState(): PagedSelectState {
  return {
    keyword: '',
    pageNum: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    loading: false,
    fetching: false,
    options: [],
  };
}

export function useProductSelectOptions() {
  // 品类第一页缓存（无关键词，page 1）
  let categoryFirstPage: { options: ProductSelectOption[]; total: number } | null = null;
  let categoryPrefetchPromise: Promise<void> | null = null;
  // 并发请求守卫，与 state.loading（控制 el-select 显示）分离
  const fetchingSet = new WeakSet<PagedSelectState>();

  const hasMore = (state: PagedSelectState) => {
    return state.options.length < state.total;
  };

  /** 预请求品类第一页并缓存 */
  const prefetchCategoryFirstPage = (): Promise<void> => {
    if (categoryFirstPage) return Promise.resolve();
    if (categoryPrefetchPromise) return categoryPrefetchPromise;
    categoryPrefetchPromise = (async () => {
      try {
        const res = await productApi.luteosProductCategoryQueryCategoryListByParam({
          categoryName: undefined,
          level: 3,
          status: 1,
          pageNum: 1,
          pageSize: PAGE_SIZE,
        });
        const list: any[] = res.categoryBeanList || res.categoryList || [];
        const options = list
          .filter((item) => !!item.categoryCode)
          .map((item) => ({
            label: item.categoryName || item.categoryCode || '-',
            value: item.categoryCode as string,
            raw: item,
          }));
        categoryFirstPage = {
          options,
          total: Number(res.total || options.length),
        };
      } catch (_e) {
        // 预请求失败不阻断流程，后续打开下拉时按需加载
      } finally {
        categoryPrefetchPromise = null;
      }
    })();
    return categoryPrefetchPromise;
  };

  /** 将缓存的首页数据写入 state，成功返回 true */
  const applyCategoryCache = (state: PagedSelectState): boolean => {
    if (!categoryFirstPage) return false;
    state.options = [...categoryFirstPage.options];
    state.total = categoryFirstPage.total;
    state.pageNum = 1;
    state.keyword = '';
    return true;
  };

  /** 清除品类首页缓存 */
  const resetCategoryCache = () => {
    categoryFirstPage = null;
    categoryPrefetchPromise = null;
  };

  const queryCategoryOptions = async (state: PagedSelectState, keyword = '', reset = true) => {
    if (fetchingSet.has(state)) return;
    fetchingSet.add(state);
    state.fetching = true;
    // 仅首次加载/搜索时展示 el-select loading，加载更多时保留已有选项
    if (reset) state.loading = true;
    try {
      state.keyword = keyword;
      state.pageNum = reset ? 1 : state.pageNum + 1;
      const res = await productApi.luteosProductCategoryQueryCategoryListByParam({
        categoryName: keyword || undefined,
        level: 3,
        status: 1,
        pageNum: state.pageNum,
        pageSize: state.pageSize,
      });
      const options = (res.categoryBeanList || res.categoryList || [])
        .filter((item) => !!item.categoryCode)
        .map((item) => ({
          label: item.categoryName || item.categoryCode || '-',
          value: item.categoryCode as string,
          raw: item,
        }));
      state.total = Number(res.total || options.length);
      state.options = reset ? options : state.options.concat(options);
    } finally {
      fetchingSet.delete(state);
      state.fetching = false;
      state.loading = false;
    }
  };

  const querySpuOptions = async (
    state: PagedSelectState,
    categoryCode?: string,
    keyword = '',
    reset = true
  ) => {
    if (fetchingSet.has(state) || !categoryCode) return;
    fetchingSet.add(state);
    state.fetching = true;
    if (reset) state.loading = true;
    try {
      state.keyword = keyword;
      state.pageNum = reset ? 1 : state.pageNum + 1;
      const res = await productApi.luteosProductQueryProductList({
        categoryCode,
        level: 3,
        keyWord: keyword || undefined,
        pageNum: state.pageNum,
        pageSize: state.pageSize,
      });
      const options = (res.productBeanList || [])
        .filter((item) => !!item.productSpu)
        .map((item) => ({
          label: item.name ? `${item.name} / ${item.productSpu}` : (item.productSpu as string),
          value: item.productSpu as string,
          raw: item,
        }));
      state.total = Number(res.total || options.length);
      state.options = reset ? options : state.options.concat(options);
    } finally {
      fetchingSet.delete(state);
      state.fetching = false;
      state.loading = false;
    }
  };

  return {
    hasMore,
    prefetchCategoryFirstPage,
    applyCategoryCache,
    resetCategoryCache,
    queryCategoryOptions,
    querySpuOptions,
  };
}
