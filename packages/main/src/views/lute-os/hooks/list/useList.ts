import { omit, debounce } from 'lodash-es';
import { ref, reactive, computed, watch, UnwrapNestedRefs, nextTick } from 'vue';
import { useRequest } from 'vue-request';
import { RequestParams } from '@/api/index';
import { ElTable as ElTableType } from 'element-plus';
import usePagination from './usePagination';

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
  watchSearchKeys = searchDefaults
    ? Object.keys(omit(searchDefaults, 'searchType', 'searchValue'))
    : [],
  onSuccess,
}: HookProps<ListDataReqType, ListDataResType>) {
  // 查询参数
  const search = reactive<ListSearch<ListDataReqType>>(
    deepClone(searchDefaults ?? {})
  );
  const searchData = ref<ListDataReqType>();
  watch(
    search,
    (newValue) => {
      const newData = interceptSearchData
        ? interceptSearchData(newValue)
        : (newValue as ListSearch<ListDataReqType>);
      if (newData?.keyword) newData.keyword = newData.keyword.trim();
      if (newData?.keyWord) newData.keyWord = newData.keyWord.trim();
      searchData.value = omit(
        {
          ...newData,
          ...(newValue.searchType
            ? {
                [newValue.searchType]: newValue.searchValue || undefined,
              }
            : {}),
        },
        'searchType',
        'searchValue'
      ) as ListDataReqType;
    },
    {
      immediate: true,
    }
  );

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  const resetSearch = () => {
    if (searchDefaults) {
      const cloned = deepClone(searchDefaults);
      Object.keys(search).forEach((key) => {
        // 先清空所有 key
        delete search[key];
      });
      Object.keys(cloned).forEach((key) => {
        // 再恢复默认
        if (
          typeof cloned[key] === 'object' &&
          cloned[key] !== null &&
          !Array.isArray(cloned[key])
        ) {
          search[key] = {}; // 先赋空对象
          Object.assign(search[key], cloned[key]);
        } else {
          search[key] = cloned[key];
        }
      });
    }
  };
  
  // const resetSearch = () => {
  //   if (searchDefaults) {
  //     Object.keys(searchDefaults).forEach((key) => {
  //       (search as any)[key] = (searchDefaults as any)[key];
  //     });
  //     search.searchValue = searchDefaults?.searchValue ?? undefined;
  //   }
  // };

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
    manual: true,
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
    watch(
      watchSearchKeys.map((key) => () => (search as any)[key]),
      debounce((newVal, oldVal) => {
        runQuery(true);
        }, 300),
      {
        deep: true,
      }
    );
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

  onActivated(() => {
    if (serviceManual === undefined || serviceManual.value === false) runQuery();
    tableRef.value?.clearSelection();
  });

  const route = useRoute();
  onMounted(() => {
    if (
      (serviceManual === undefined || serviceManual.value === false) &&
      (route.fullPath.includes('/add') ||
        route.fullPath.includes('/edit') ||
        route.fullPath.includes('/detail') ||
        route.fullPath.includes('/skurelation') ||
        route.fullPath.includes('/influencerSend') ||
        (route.fullPath.includes('/audit') && !route.fullPath.includes('/auditRule')))
    )
      runQuery();
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
