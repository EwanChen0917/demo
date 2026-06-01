<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.email" placeholder="用户邮箱">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        class="w-100"
        v-model="search.submitDateStr"
        placeholder="提交时间"
        value-format="YYYY-MM-DD"
        :popper-options="{ placement: 'bottom-start' }"
      />
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        plain
        @click="
          handleExport({
            codeList,
            ...search,
          })
        "
        :loading="exportLoading"
        :disabled="!listData?.activityPrizeExpectList?.length"
      >
        导出
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.activityPrizeExpectList"
      row-key="uid"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="email" label="用户邮箱" />
      <el-table-column prop="userName" label="用户名称" />
      <el-table-column prop="submitDate" label="提交时间" />
      <el-table-column prop="expectPrize" label="期望奖品" />
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

<script lang="ts" setup name="prizecollection">
// import dayjs from 'dayjs';

  import useList from '@/hooks/list/useList';
  import useExport from '@/hooks/list/useExport';
  import { activityApi, ActivityApi } from '@/api/index';

  const {
    search,
    // searchData,
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
    refreshList,
    resetSearch,
    // runQuery,
    tableRef,
    selectedKeys: codeList,
    handleSelectionChange,
  } = useList<
    ActivityApi.LuteosActivityExpectQueryActivityExpectList.RequestQuery,
    ActivityApi.LuteosActivityExpectQueryActivityExpectList.ResponseBody
  >({
    searchDefaults: {
      email: undefined,
      submitDateStr: undefined,
      // submitDateStr: dayjs().format('YYYY-MM-DD'),
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: activityApi.luteosActivityExpectQueryActivityExpectList,
  });
  const { handleExport, exportLoading } = useExport(
    activityApi.luteosActivityExpectExportActivityExpect
  );
</script>
