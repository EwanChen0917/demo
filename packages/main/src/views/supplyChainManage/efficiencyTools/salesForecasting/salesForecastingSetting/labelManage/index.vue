<template>
  <KeenList @refresh="refreshList">
    <template #buttons>
      <el-button type="primary" @click="editDialogRef.open()">新增标签</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="标签名称" prop="name" />
      <el-table-column label="标签类型" prop="typeDesc" />
      <el-table-column label="标签项">
        <template #default="{ row }">
          <div
            class="d-flex align-items-center gap-2"
            v-for="item in row.tagItemList"
            :key="item.itemCode"
          >
            <img style="width: 25px; height: 25px" :src="item?.fullIconUrl" />
            <span>{{ item?.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row,
                permissionCode: '',
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                row,
                permissionCode: '',
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
  <EditLabelDialog ref="editDialogRef" @success="refreshList" />
  <LogDialog ref="logDialogRef" />
</template>

<script setup lang="ts" name="labelManage">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import LogDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/labelManage/components/logDialog.vue';
  import EditLabelDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/labelManage/components/editLabelDialog.vue';

  const PAGE_SIZE = 10;

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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpPlanPsftQueryList.RequestQuery,
    ErpApi.LuteosErpPlanPsftQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPsftQueryList,
  });

  const logDialogRef = ref();
  const editDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value?.open(row);
    } else if (key === 'log') {
      logDialogRef.value?.open(row?.operationLogBeanList);
    }
  };
</script>

<style scoped lang="scss"></style>
