// import { nextTick, ref, reactive } from 'vue'
export default function useTableData(_getDataList: any, params: any, pageSize = 10) {
  const searchParams = ref({
    // multiKeyword: undefined,
    // sortName: undefined,
    // sortOrder: undefined,
    ...params,
  });
  const tableLoading = ref(false);
  const tableTotal = ref({});
  const pagination = reactive({
    layout: 'prev, pager, next',
    pages: 0,
    pageNum: 1,
    pageSize,
    pageSizes: [10, 20, 50, 100],
    total: 0,
  });
  // const sortConfig = reactive({
  //   defaultSort: { field: '', order: 'desc' },
  //   trigger: 'cell',
  //   remote: true,
  //   orders: ['desc', 'asc', null]
  // })
  function handleTabClick() {
    nextTick(() => {
      search();
    });
  }
  function resetParams() {
    searchParams.value = {
      // multiKeyword: undefined,
      // sortName: undefined,
      // sortOrder: undefined,
      ...params,
    };
    search();
  }
  function search() {
    pagination.pageNum = 1;
    _getDataList();
  }
  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    pagination.pageNum = 1;
    _getDataList();
  }
  function handleCurrentChange(val: number) {
    console.log(val);
    pagination.pageNum = val;
    _getDataList();
  }
  // function sortChange({ property, order }) {
  //   searchParams.sortName = property
  //   searchParams.sortOrder = order
  //   search()
  // }
  return {
    searchParams,
    tableLoading,
    tableTotal,
    pagination,
    // sortConfig,
    search,
    handleTabClick,
    resetParams,
    handleSizeChange,
    handleCurrentChange,
  };
}
