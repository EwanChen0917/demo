<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title">
        <h2>参与用户</h2>
      </div>
    </div>
    <div class="card-body p-0">
      <KeenList>
        <div>
          已发放 {{ listData?.issueTargetCodeNums ?? 0 }} 抽奖码，共
          {{ listData?.joinUserNums ?? 0 }} 用户参与
        </div>
        <el-table
          ref="tableRef"
          v-loading="listLoading"
          :data="listData?.activityUserList"
          row-key="id"
        >
          <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
          <el-table-column prop="targetCode" label="抽奖码" />
          <el-table-column prop="email" label="用户邮箱" />
          <el-table-column prop="prizeSourceName" label="获得途径" />
          <el-table-column prop="createTime" label="获得时间" />
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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useList from '@/hooks/list/useList';
  import { activityApi, ActivityApi, ActivityContracts } from '@/api/index';

  const form = inject<ActivityContracts.ActivitySaveReq>('form');

  const {
    // search,
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
    // runQuery,
    tableRef,
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<
    ActivityApi.LuteosActivityQueryActivityUserList.RequestQuery,
    ActivityApi.LuteosActivityQueryActivityUserList.ResponseBody
  >({
    searchDefaults: {
      activityCode: form!.activityCode!,
      activityType: form!.activityType,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: activityApi.luteosActivityQueryActivityUserList,
  });
</script>
