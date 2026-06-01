<template>
  <KeenList @refresh="refreshList">
    <!-- <template #buttons> -->
    <!-- <el-button type="primary" @click="runQuery">查询</el-button> -->
    <!--      <el-button type="primary" @click="resetSearch">重置</el-button>-->
    <!--      <el-button type="primary" @click="editDialogRef.open()">新增策略</el-button>-->
    <!-- </template> -->
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="策略名称" prop="name" />
      <el-table-column label="渠道" prop="channelDesc" />
      <el-table-column label="预测方式" prop="typeDesc" />
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="状态" prop="">
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
                label: '详情',
                key: 'detail',
                type: 'primary',
                row,
              },
              /*{
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
              },*/
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
  <!--  <EditStrategyDialog ref="editDialogRef" @success="refreshList" />-->
  <StrategyDetailDialog ref="detailDialogRef" />
</template>

<script setup lang="ts" name="forecastingStrategy">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import StrategyDetailDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/forecastingStrategy/components/strategyDetailDialog.vue';
  // import EditStrategyDialog from '@/views/supplyChainManage/efficiencyTools/salesForecasting/salesForecastingSetting/forecastingStrategy/components/editStrategyDialog.vue';

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
    ErpApi.LuteosErpPlanPsfsQueryList.RequestQuery,
    ErpApi.LuteosErpPlanPsfsQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPsfsQueryList,
  });

  const editDialogRef = ref(null);
  const detailDialogRef = ref(null);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value?.open(row);
    } else if (key === 'enable') {
      const isConfirmed = await swal.confirm('确定要启用吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpPlanPsfsChangeStatus({
        id: row?.id,
        status: 0,
      });
      ElMessage.success('启用成功');
      refreshList();
    } else if (key === 'disable') {
      const isConfirmed = await swal.confirm('确定要禁用吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpPlanPsfsChangeStatus({
        id: row?.id,
        status: 1,
      });
      ElMessage.success('禁用成功');
      refreshList();
    } else if (key === 'detail') {
      detailDialogRef.value?.open(row);
    }
  };
</script>

<style scoped lang="scss"></style>
