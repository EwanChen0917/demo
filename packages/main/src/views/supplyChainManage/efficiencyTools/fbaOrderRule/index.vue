<template>
  <KeenList @refresh="refreshList">
    <template #buttons>
      <el-button class="button" type="primary" @click="addMonitorRule">新增监控规则</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.result" row-key="id">
      <el-table-column label="规则名称" prop="ruleName" min-width="140" />
      <el-table-column label="状态" prop="status" min-width="140">
        <template #default="{ row }">
          <div>
            <Tag :color="statusColorMap[row.status]" size="small">
              {{ row?.status == 0 ? '关闭' : '开启' }}
            </Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="消息推送" prop="pushType">
        <template #default="{ row }">
          {{ messagePushType[row.pushType] }}
        </template>
      </el-table-column>
      <el-table-column label="监控规则">
        <template #default="{ row }">
          <div v-if="orderType[row.monitorRule?.orderType]">
            订单类型：{{ orderType[row.monitorRule?.orderType] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '设置',
                key: 'config',
                type: 'primary',
                row,
                permissionCode: 'fbaOrderRuleAdd',
              },
              {
                label: '关闭',
                key: 'updateStatus',
                type: 'danger',
                row: row,
                hide: row.status === 0,
              },
              {
                label: '开启',
                key: 'updateStatus',
                type: 'primary',
                row: row,
                hide: row.status === 1,
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

<script setup lang="ts" name="fbaOrderRule">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { orderType, messagePushType } from './type';

  const router = useRouter();
  const route = useRoute();

  const PAGE_SIZE = 10;
  const statusColorMap = {
    0: 'purple',
    1: 'blue',
  };

  const {
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
  } = useList<
    ErpApi.LuteosErpFirstVesselTimelinessQueryList.RequestQuery,
    ErpApi.LuteosErpFirstVesselTimelinessQueryList.ResponseBody
  >({
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpInventoryFbaShipmentMonitorQuery,
  });

  // 监控规则
  const addMonitorRule = () => {
    router.push({ name: 'fbaOrderRuleAdd' });
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'config') {
      router.push({
        name: 'fbaOrderRuleEdit',
        query: {
          ruleId: row.ruleId,
        },
      });
    }
    if (key === 'updateStatus') {
      const isConfirmed = await swal.confirm(`确定要${row.status === 0 ? '开启' : '关闭'}吗？`);
      if (!isConfirmed) return;
      const rowStatus: number = row.status === 0 ? 1 : 0;
      const result = await erpApi.luteosErpInventoryFbaShipmentMonitorChangeStatus({
        ruleId: row.ruleId,
        status: rowStatus,
      });
      if (result) {
        ElMessage.success(row.status === 0 ? '开启成功' : '关闭成功');
        // 手动更新列表的状态
        row.status = rowStatus;
      }
      if (!result) ElMessage.error(row.status === 0 ? '开启失败' : '关闭失败');
      // runQuery();
    }
  };

  onActivated(() => {
    // 保存后 刷新列表
    route.params.refresh && runQuery();
  });
</script>

<style lang="scss" scoped></style>
