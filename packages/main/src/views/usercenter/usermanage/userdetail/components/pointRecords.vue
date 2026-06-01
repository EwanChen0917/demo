<template>
  <KeenList @refresh="refreshList">
    <div>积分：{{ listData?.availablePoint ?? 0 }}</div>
    <template #buttons>
      <el-button type="primary" plain @click="handleAdd">发放积分</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.pointRecords"
      row-key="serialCode"
    >
      <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
      <el-table-column prop="createTime" label="日期" />
      <el-table-column label="积分">
        <template #default="scope">
          {{
            `${scope.row.type === PointRecordType.收入 ? '+' : '-'} ${Math.abs(scope.row.point)}`
          }}
        </template>
      </el-table-column>
      <el-table-column label="获得/消耗">
        <template #default="scope">
          {{ scope.row.type === PointRecordType.收入 ? '获得' : '消耗' }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="描述" />
      <el-table-column prop="serialCode" label="编号" />
      <el-table-column prop="balancePoint" label="余额" />
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

  <PointDistribute
    :uid="uid"
    :visible="addModalVisible"
    @close="handleAddModalClose"
    @window-close="refreshList"
  />
</template>

<script lang="ts" setup>
  import useList from '@/hooks/list/useList';
  import { userApi, UserApi, UserContracts } from '@/api/index';
  import { PointRecordType } from '@/types/api';
  import useAddModal from '@/hooks/list/useAddModal';
  import PointDistribute from './pointDistribute.vue';

  const route = useRoute();
  const uid = route.query.uid as string;

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
    UserApi.LuteosUserQueryPointRecords.RequestQuery,
    UserApi.LuteosUserQueryPointRecords.ResponseBody
  >({
    searchDefaults: {
      uid,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: userApi.luteosUserQueryPointRecords,
  });

  // 积分发放分
  const { addModalVisible, handleAdd, handleAddModalClose } = useAddModal({
    refreshList,
  });
</script>
