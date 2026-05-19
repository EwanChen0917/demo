<template>
  <div class="card">
    <div class="card-body">
      <el-table :data="tableData" v-loading="tableLoading" :maxHeight="maxHeight" >
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :fixed="column.fixed"
          :min-width="column.minWidth"
          :align="column.align"
          :headerAlign="column.headerAlign"
          :show-overflow-tooltip="column.showOverflowTooltip"
        >
          <template #header v-if="column.renderHeader">
            <component :is="column.renderHeader" :row="column" />
          </template>

          <template #default="scope" v-if="column.type && column.type === 'slot'">
            <slot :name="column.prop" :row="scope.row"></slot>
          </template>
          <template #default="scope" v-else>
            <div>
              <component :is="column.render" :row="scope.row" :scope="scope" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="pageInfo.currentPage"
        :page-size="pageInfo.size"
        :page-size-option="pageInfo.pageSizeOption"
        :total="pageInfo.total"
        @size-change="(value) => pagin('pagesize', value)"
        @current-change="(value) => pagin('curPage', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="downloadmanage">
  import { baseStore } from '@/store/modules/baseStore';
  import { columns } from './Table/tableColumn';
  import { queryFileRecordList } from '@/apis/newProduct';

  const state = reactive<{
    tableData: any;
    pageInfo: pageInfoItf;
  }>({
    tableData: [],
    pageInfo: {
      currentPage: 1,
      size: 10,
      pageSizeOption: [10, 20, 50, 100],
      total: 0,
    },
  });
  const { tableData, pageInfo } = toRefs(state);

  const baseStoreFn = baseStore();
  const { setTableLoading } = baseStoreFn;

  const route = useRoute();
  const router = useRouter();
  let query = route.query || {};
  const tableLoading = ref(false);

  const getTableData = () => {
    const { currentPage, size } = pageInfo.value;
    const fromLuteOs =
      !query.app_code ||
      (query.module_code && String(query.module_code).toLowerCase().includes('lute_os'));
    const data: any = {
      pageNum: currentPage,
      pageSize: size,
      appCode: query.app_code,
      moduleCode: query.module_code,
      recordType: 2,
      isSearchAllCreator: true,
      platformList: fromLuteOs ? ['lute_erp', 'lute_os_v2'] : ['lute_erp'],
    };
    if (baseStoreFn.tableLoading) {
      // console.log('请求中 , 取消请求,避免重复');
      return;
    }
    tableLoading.value = true;
    setTableLoading(true);
    queryFileRecordList(data).then((res) => {
      // console.log('返回数据res ', res);
      if (res && res.code === '200') {
        // if (res.code == 200) {
        const ret = { ...res.result };
        pageInfo.value.total = res.result.total || 0;
        tableData.value = ret.fileRecordList || [];
      }
      setTableLoading(false);
      tableLoading.value = false;
    });
  };
  watch(
    () => router.currentRoute.value.path,
    () => {
      // console.log(router.currentRoute.value.path);
      if (router.currentRoute.value.path === '/downloadmanage') {
        query = router.currentRoute.value.query;
        // console.log('watch getTabeData', query);
        getTableData();
      }
    },
    { immediate: true, deep: true }
  );

  getTableData();

  const pagin = (type: string, data: number) => {
    type === 'curPage' && (pageInfo.value.currentPage = data);
    type === 'pagesize' && ((pageInfo.value.currentPage = 1), (pageInfo.value.size = data));
    getTableData();
  };

  const maxHeight = computed(() => window.innerHeight - 110 - 76);

</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  background-color: #fff;
  .card-body {
    padding: 20px 16px;
  :deep(.el-pagination) {
    border: 1px solid #E9ECF0;
    border-top: none;
    border-radius: 0 0 10px 10px;
  }
  :deep(.el-table) {
    border: 1px solid #E9ECF0;
    border-bottom: none;
    border-radius: 10px 10px 0 0 ;
    .el-table__cell {
      border-color: #E9ECF0;
    }
    .el-table__inner-wrapper::before {
      // background-color: #E9ECF0;
      background-color: transparent;
    }
  }
  a {
    color: var(--el-color-primary);
  }
}
}

</style>
