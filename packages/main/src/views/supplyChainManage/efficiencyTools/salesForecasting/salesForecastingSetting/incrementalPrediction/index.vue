<template>
  <KeenList @refresh="refreshList">
    <template #buttons>
      <!--      <el-button type="primary" @click="resetSearch">重置</el-button>-->
      <el-button type="primary" @click="editDialogRef.open()">新增活动增量</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="活动名称" prop="name" />
      <el-table-column label="活动渠道" prop="channelDesc" />
      <el-table-column label="活动填写日期" prop="dateRange" />
      <el-table-column label="活动预测对应周" prop="weekDesc" />
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="活动时间">
        <template #default="{ row }">
          {{ row.actStartDate && row.actEndDate ? row.actStartDate + '_' + row.actEndDate : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="row?.status === 0 ? 'green' : 'red'">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>
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
                label: '启用',
                key: 'enable',
                type: 'primary',
                row,
                permissionCode: '',
                hide: row?.status === 0,
              },
              {
                label: '禁用',
                key: 'disable',
                type: 'danger',
                row,
                permissionCode: '',
                hide: row?.status === 1,
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
  <EditDialog ref="editDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="incrementalPrediction">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import EditDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/incrementalPrediction/components/editDialog.vue';

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
    ErpApi.LuteosErpPlanPsfaiQueryList.RequestQuery,
    ErpApi.LuteosErpPlanPsfaiQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPsfaiQueryList,
  });

  const editDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value?.open(row);
    } else if (key === 'enable') {
      const isConfirmed = await swal.confirm('确定要启用吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpPlanPsfaiChangeStatus({
        id: row?.id,
        activityCode: row?.activityCode,
        status: 0,
      });
      ElMessage.success('启用成功');
      refreshList();
    } else if (key === 'disable') {
      const isConfirmed = await swal.confirm('确定要禁用吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpPlanPsfaiChangeStatus({
        id: row?.id,
        activityCode: row?.activityCode,
        status: 1,
      });
      ElMessage.success('禁用成功');
      refreshList();
    }
  };
</script>

<style scoped lang="scss"></style>
