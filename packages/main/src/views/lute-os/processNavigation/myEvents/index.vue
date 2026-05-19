<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="审批名称/审批ID" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 140px"
        v-model="search.status"
        placeholder="请选择状态"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="审批中" value="10" />
        <el-option label="已通过" value="11" />
        <el-option label="已驳回" value="12" />
        <el-option label="已撤销" value="13" />
        <el-option label="待办中" value="20" />
        <el-option label="已完成" value="21" />
        <el-option label="已删除" value="22" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column prop="workflowCode" label="审批ID" min-width="220px" />
      <el-table-column prop="workflowSubject" label="审批名称" min-width="220px" />
      <!-- <el-table-column prop="matterName" label="关联事项名称" min-width="200px" /> -->
      <el-table-column prop="creator" label="申请人" min-width="140px" />
      <el-table-column prop="statusDesc" label="状态" min-width="140px">
        <template #default="{ row }">
          <!-- <el-tag class="status-tag" :hit="false" :type="stateColor[row.status]">
            {{ row.statusDesc }}
          </el-tag> -->
          <Tag :color="stateColor[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" min-width="180px" />
      <el-table-column align="right" label="操作" width="80px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                workflowCode: row.workflowCode,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
</template>

<script lang="ts" setup name="myEvents">
    import { processApi, ProcessApi } from '@/api/index';
  import useList from '@/views/lute-os/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';

  const router = useRouter();

  const PAGE_SIZE = 10;
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    resetSearch,
    refreshList,
    runQuery,
    // selectedKeys,
  } = useList<
    ProcessApi.LuteosProcessNavigationApproveQueryList.RequestQuery,
    ProcessApi.LuteosProcessNavigationApproveQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      status: '',
    },
    pageSize: PAGE_SIZE,
    service: processApi.luteosProcessNavigationApproveQueryList,
  });
  const stateColor = ref({
    10: 'blue',
    11: 'green',
    12: 'red',
    13: 'yellow',
    20: 'blue',
    21: 'green',
    22: 'gray',
  });
  const handleActions = (item) => {
    const { key, workflowCode } = item;
    if (key === 'view') {
      const path = router.resolve({
        name: 'myEventDetail',
        query: {
          code: workflowCode,
        },
      });
      router.push(path.href);
    }
  };
  // onMounted(() => {
  //   getDataList();
  // });
</script>

<style scoped lang="scss">
  :deep(.el-table-fixed-column--left) {
    background-color: white !important;
  }

  :deep(.el-table-fixed-column--right) {
    background-color: white !important;
  }

  .status-tag {
    border: none;
    height: 28px;
  }
</style>
