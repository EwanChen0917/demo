import { omit, debounce } from 'lodash-es';
import { ref, reactive, computed, watch, UnwrapNestedRefs, nextTick, onActivated } from 'vue';
import { useRequest } from 'vue-request';
import { RequestParams } from '@/api/index';
import { ElTable as ElTableType } from 'element-plus';
import { useTabbarStore } from '@/store/modules/useTabbar';
import usePagination from './usePagination';

const route = useRoute();
const tabbarStore = useTabbarStore();

type ListSearch<T> = Omit<T, 'pageSize' | 'pageNum'> & {
  searchType?: string;
  searchValue?: string;
};

interface HookProps<ListDataReqType, ListDataResType> {
  searchDefaults?: ListSearch<ListDataReqType>;
  interceptSearchData?: (
    data: UnwrapNestedRefs<ListSearch<ListDataReqType>>
  ) => ListSearch<ListDataReqType>;
  pageSize?: number;
  pageNum?: number;
  service: (query: ListDataReqType, params?: RequestParams) => Promise<ListDataResType>;
  serviceManual?: boolean;
  watchSearchKeys?: string[]; // 默认会监听所有key
  onSuccess?: (data: ListDataResType) => void;
  keywordImediateSearch?: boolean; // keyword 一位也触发查询
}

export default function useList<
  ListDataReqType extends {
    pageSize: number;
    pageNum: number;
  },
  ListDataResType extends {
    total?: number;
  }
>({
  pageSize: defaultPageSize,
  pageNum: defaultPageNum,
  searchDefaults,
  interceptSearchData,
  service,
  serviceManual,
  keywordImediateSearch,
  watchSearchKeys = searchDefaults ? Object.keys(searchDefaults) : [],
  onSuccess,
}: HookProps<ListDataReqType, ListDataResType>) {
  // 查询参数
  const search = reactive<ListSearch<ListDataReqType>>({
    ...(searchDefaults ?? ({} as ListSearch<ListDataReqType>)),
  });
  const searchData = ref<ListDataReqType>();
  watch(
    search,
    (newValue) => {
      const newData = interceptSearchData
        ? interceptSearchData(newValue)
        : (newValue as ListSearch<ListDataReqType>);
      if (newData?.keyword && !Array.isArray(newData.keyword))
        newData.keyword = newData.keyword.trim();
      if (newData?.keyWord && !Array.isArray(newData.keyWord))
        newData.keyWord = newData.keyWord.trim();
      searchData.value = {
        ...newData,
        ...(newValue.searchType
          ? {
              [newValue.searchType]: newValue.searchValue || undefined,
            }
          : {}),
      } as ListDataReqType;
    },
    {
      immediate: true,
    }
  );
  const resetSearch = () => {
    if (searchDefaults) {
      Object.keys(searchDefaults).forEach((key) => {
        (search as any)[key] = (searchDefaults as any)[key];
      });
      search.searchValue = searchDefaults?.searchValue ?? undefined;
    }
  };

  // 分页参数
  const { current, pageSize, pageSizeOption, handlePageSizeChange, handleCurrentChange } =
    usePagination({
      pageSize: defaultPageSize,
      pageNum: defaultPageNum,
    });

  const finishFlag = ref<boolean>(false); // 是否完成查询，用于判断是否需要刷新列表
  // 查询接口
  const {
    run: queryList,
    data: listData,
    loading: listLoading,
    refresh: refreshList,
  } = useRequest(service, {
    manual: serviceManual,
    defaultParams: [
      {
        ...searchData.value,
        pageNum: current.value,
        pageSize: pageSize.value,
      } as ListDataReqType,
    ],
    async onSuccess(data: ListDataResType) {
      onSuccess?.(data);
      finishFlag.value = true;
    },
  });

  const runQuery = (reset?: boolean) => {
    if (reset && current.value !== 1) {
      // 防止重复查询
      current.value = 1;
      return;
    }

    nextTick(() => {
      queryList({
        ...searchData.value,
        pageNum: current.value,
        pageSize: pageSize.value,
      } as ListDataReqType);
    });
  };
  if (watchSearchKeys?.length) {
    // keyword >= 两位再查询
    // skuCode >= 三位再查询
    /** 各 watch 共用同一防抖，避免重置等场景下 filter 与 keyword 各触发一次导致双请求 */
    const debouncedSearchQuery = debounce(() => {
      runQuery(true);
    }, 300);
    const filterArr = watchSearchKeys.filter(
      (item) => item !== 'skuCode' && item !== 'remark' && item !== 'keyWord' && item !== 'keyword'
    );
    const keyArr = watchSearchKeys.filter((item) => item === 'keyWord' || item === 'keyword');
    const skuArr = watchSearchKeys.filter((item) => item === 'skuCode');
    const remarkArr = watchSearchKeys.filter((item) => item === 'remark');
    // 备货调整不用这里防抖查询，因为防抖查询会触发多次请求
    if (keyArr.length > 0 || skuArr.length > 0 || remarkArr.length > 0) {
      // watch(
      //   filterArr.map((key) => () => (search as any)[key]),
      //   debounce((newVal, oldVal, key) => {
      //     runQuery(true);
      //   }, 300)
      // );
      watch(
        filterArr.map((key) => () => (search as any)[key]),
        () => debouncedSearchQuery()
      );
      if (keyArr.length > 0) {
        // watch(
        //   keyArr.map((key) => () => (search as any)[key]),
        //   debounce((newVal, oldVal, key) => {
        //     // console.log('newVal', newVal);
        //     if (newVal[0]?.length >= 2) {
        //       runQuery(true);
        //     } else if ((newVal[0]?.length === 1 && keywordImediateSearch) || !newVal[0]) {
        //       runQuery(true);
        //     } else if (newVal[0]?.length === 0) {
        //       runQuery(true);
        //     }
        //   }, 300)
        // );
        watch(
          keyArr.map((key) => () => (search as any)[key]),
          (newVal) => {
            if (newVal[0]?.length >= 2) {
              debouncedSearchQuery();
            } else if ((newVal[0]?.length === 1 && keywordImediateSearch) || !newVal[0]) {
              debouncedSearchQuery();
            } else if (newVal[0]?.length === 0) {
              debouncedSearchQuery();
            }
          }
        );
      }
      if (skuArr.length > 0) {
        // watch(
        //   skuArr.map((key) => () => (search as any)[key]),
        //   debounce((newVal, oldVal, key) => {
        //     if (newVal[0]?.length >= 3) {
        //       runQuery(true);
        //     } else if (newVal[0]?.length === 0 || !newVal[0]) {
        //       runQuery(true);
        //     }
        //   }, 300)
        // );
        watch(
          skuArr.map((key) => () => (search as any)[key]),
          (newVal) => {
            if (newVal[0]?.length >= 3) {
              debouncedSearchQuery();
            } else if (newVal[0]?.length === 0 || !newVal[0]) {
              debouncedSearchQuery();
            }
          }
        );
      }
      if (remarkArr.length > 0) {
        // watch(
        //   remarkArr.map((key) => () => (search as any)[key]),
        //   debounce((newVal, oldVal, key) => {
        //     if (newVal[0]?.length >= 5) {
        //       runQuery(true);
        //     } else if (newVal[0]?.length === 0 || !newVal[0]) {
        //       runQuery(true);
        //     }
        //   }, 300)
        // );
        watch(
          remarkArr.map((key) => () => (search as any)[key]),
          (newVal) => {
            if (newVal[0]?.length >= 5) {
              debouncedSearchQuery();
            } else if (newVal[0]?.length === 0 || !newVal[0]) {
              debouncedSearchQuery();
            }
          }
        );
      }
    } else {
      // watch(
      //   watchSearchKeys.map((key) => () => (search as any)[key]),
      //   debounce((newVal, oldVal, key) => {
      //     runQuery(true);
      //   }, 300)
      // );
      watch(
        watchSearchKeys.map((key) => () => (search as any)[key]),
        () => debouncedSearchQuery()
      );
    }
  }

  // 数据响应
  const total = computed(() => listData.value?.total ?? 0);
  watch([current, pageSize], () => {
    runQuery();
  });

  // 表格选择
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  // 多选
  const selectedKeys = ref<(string | number)[]>([]);
  const selectedRows = ref<any[]>([]);
  const handleSelectionChange = (selection) => {
    const rowKey = tableRef.value?.rowKey;
    if (rowKey) {
      const key = typeof rowKey === 'function' ? rowKey(selection) : rowKey;
      selectedRows.value = selection;
      console.log('selection', selectedRows.value);
      selectedKeys.value = selection.map((item) => item[key]);
    }
  };
  // 单选
  const selectedKey = ref<string | number>('');
  const handleTableCurrentChange = (val) => {
    if (!val) {
      selectedKey.value = '';
      return;
    }
    const rowKey = tableRef.value?.rowKey;
    if (rowKey) {
      const key = typeof rowKey === 'function' ? rowKey(val) : rowKey;
      selectedKey.value = val[key];
    }
  };
  watch(listData, () => {
    selectedKeys.value = [];
    selectedRows.value = [];
    selectedKey.value = '';
    tableRef.value?.clearSelection();
  });

  onActivated(async () => {
    if (tabbarStore?.refreshRoute === route?.name) {
      runQuery();
      nextTick(() => {
        tabbarStore.setRefreshRoute(null);
      });
    }
  });

  // 导出
  return {
    // 数据
    search,
    searchData,
    resetSearch,
    listData,
    listLoading,
    finishFlag,
    // 分页
    pagination: {
      total,
      current,
      pageSize,
      pageSizeOption,
      handlePageSizeChange,
      handleCurrentChange,
    },
    // 操作
    runQuery,
    refreshList,
    // 表格选择
    tableRef,
    selectedKeys,
    selectedRows,
    handleSelectionChange,
    selectedKey,
    handleTableCurrentChange,
  };
}
