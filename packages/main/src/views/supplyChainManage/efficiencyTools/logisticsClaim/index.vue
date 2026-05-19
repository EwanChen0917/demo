<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.claimNo" style="width: 180px" clearable placeholder="索赔单号"/>
    </template>

    <template #filters>
      <el-select v-model="search.type" placeholder="类型" style="width: 140px" clearable>
        <el-option v-for="item in ClaimType" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select
        v-model="search.abnormalType"
        placeholder="异常分类"
        style="width: 120px" clearable
      >
        <el-option v-for="item in ClaimGroupType" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="search.status" placeholder="状态" style="width: 100px" clearable>
        <el-option v-for="item in ClaimStatus" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-date-picker clearable
                      v-model="search.createTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="创建开始日期"
                      end-placeholder="创建结束日期"
                      value-format="YYYY-MM-DD"
                      style="min-width: 280px"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="onAdd(null)">新增</el-button>
      <el-button type="danger" @click="onRevoke(null)">作废</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList || listData?.records"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="50" fixed="left"/>
      <el-table-column label="索赔单号" prop="claimNo" fixed="left"/>
      <el-table-column label="业务单号" prop="businessNo"/>
      <el-table-column label="类型" prop="type">
        <template #default="{ row }">
          {{ getEnumLabel(ClaimType, row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="异常分类" prop="abnormalType">
        <template #default="{ row }">
          {{ getEnumLabel(ClaimGroupType, row.abnormalType) }}
        </template>
      </el-table-column>
      <el-table-column label="赔偿标准" prop="claimStandard">
        <template #default="{ row }">
          {{ getEnumLabel(ClaimStandard, row.claimStandard) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" min-width="100">
        <template #default="{ row }">
          <el-tag v-if="row.status === ClaimStatusEnum.已废弃" type="danger">已废弃</el-tag>
          <el-tag v-else-if="row.status === ClaimStatusEnum.已生效" type="success">已生效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="赔偿金额(RMB)" prop="compensationAmount"/>
      <el-table-column label="异常数量" prop="abnormalQuantity"/>
      <el-table-column label="单位" prop="unit"/>
      <el-table-column label="举证说明" prop="proofDesc" min-width="100">
        <template #default="{ row }">
          <overflowTooltip
            :content="row.proofDesc"
            :line="3"
            :fontSize="14"
          />
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" min-width="100">
        <template #default="{ row }">
          <overflowTooltip
            :content="row.remark"
            :line="3"
            :fontSize="14"
          />
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creator"/>
      <el-table-column label="创建时间" prop="createTime"/>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                row: row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
                hide: (row.status === ClaimStatusEnum.已废弃),
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                row: row,
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
    <EditDialog ref="editDialogRef" @success="refreshList()"/>
    <DetailDialog ref="detailDialogRef"/>
    <LogDialog ref="logDialogRef"/>
  </KeenList>
</template>

<script setup lang="ts" name="logisticsClaim">
  import useList from '@/hooks/list/useList';
  import { erpApi } from '@/api';
  import dayjs from 'dayjs';
  import {
    ClaimGroupType, ClaimStandard,
    ClaimStatus, ClaimStatusEnum,
    ClaimType, getEnumLabel,
  } from '@/views/supplyChainManage/efficiencyTools/logisticsClaim/enums';
  import EditDialog from './editDialog.vue';
  import DetailDialog from './detailDialog.vue';
  import LogDialog from './logDialog.vue';
  import { ElMessage } from "element-plus";
  import * as swal from "@/utils/swal";

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
    refreshList,
    resetSearch,
  } = useList({
    searchDefaults: {
      claimNo: undefined,
      abnormalType: undefined,
      type: undefined,
      status: undefined,
      createTime: [
        dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
      ], // 最近7天
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpLogisticsClaimQueryList,
    interceptSearchData: (data) => {
      let params = { ...data }
      let createTime = params.createTime;
      if (createTime) {
        params.startTime = createTime[0]; // dayjs(createTime[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        params.endTime = createTime[1]; // dayjs(createTime[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
      params.createTime = undefined;
      return params;
    },
  });

  const tableRef = ref();
  // 表格操作
  const editDialogRef = ref();
  const onAdd = (row) => {
    editDialogRef.value.open(row);
  };
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      onAdd(row);
    } else if (key === 'detail') {
      onDetail(row);
    } else if (key === 'log') {
      onLog(row);
    }
  };

  const onRevoke = async () => {
    let selectedRows = tableRef.value.getSelectionRows();
    if (!selectedRows || selectedRows.length <= 0) {
      ElMessage.error('请选择要作废的索赔单');
      return;
    }
    let validItems = selectedRows.filter(item => item.status === ClaimStatusEnum.已生效);
    if (!validItems.length) {
      ElMessage.error('没有选择已生效的索赔单');
      return;
    }

    const isConfirmed = await swal.confirm(`确定作废选中的${validItems.length}项吗？`);
    if (!isConfirmed) return;

    erpApi.luteosErpLogisticsClaimBatchInvalidate(
      validItems.map(item => item.id)
    ).then(() => {
      ElMessage.success('作废成功');
      refreshList();
    }).catch(() => {
      ElMessage.error('作废失败');
    });
  };

  const detailDialogRef = ref();
  const onDetail = (row) => {
    detailDialogRef.value.open(row);
  };

  const logDialogRef = ref();
  const onLog = (row) => {
    logDialogRef.value.open(row);
  };
</script>
<style scoped lang="scss">
  .text-tooltip {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
<style lang="scss">
  .logistics-claim-tooltip-wrap {
    max-width: 500px;
    word-break: break-all;
  }
</style>
