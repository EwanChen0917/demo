<template>
  <el-dialog
    width="900px"
    title="推送任务历史记录"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="单据编号/推送条件" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>

      <div class="task-list" v-if="listData?.recordList?.length">
        <div class="task-item" v-for="(item, index) in listData?.recordList" :key="index">
          <div class="task-item-header">
            <div class="left">
              <div class="type">推送批次：#{{ item?.batchNo }}</div>
              <Tag :color="taskColorMap[item?.status]" size="small">
                {{ taskStatusMap[item?.status] }}
              </Tag>
            </div>
            <div class="right">
              <span v-if="item?.status === taskStatus.进行中">
                预计剩余时间：{{ item?.remainingTime }}
              </span>
              <span v-else>耗时：{{ item?.useTime }}</span>
            </div>
          </div>
          <div class="text-gray-600">{{ item?.pushRemark }}</div>
          <div class="task-item-footer">
            <div class="left">
              已处理：{{ item?.successCount + item?.failCount }} / {{ item?.totalCount }}单
            </div>
            <div class="right" v-if="item?.status === taskStatus.进行中">
              开始时间：{{ item?.createTime }}
            </div>
            <div class="right" v-else>完成时间：{{ item?.finishTime }}</div>
          </div>
        </div>
      </div>
      <div v-else class="no-data">暂无数据</div>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
  </el-dialog>
</template>

<script setup lang="ts">
  import { FinanceSystemApi, financeSystemApi } from '@/api';
  import {
    progressStatusMap,
    taskColorMap,
    taskStatus,
    taskStatusMap,
  } from '@/views/finance/income/incomeStatement/enum';

  import useList from '@/hooks/list/useList';

  const visible = ref(false);

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
    FinanceSystemApi.FinanceIncomeStatementOrderQueryPushBatchList.RequestBody,
    FinanceSystemApi.FinanceIncomeStatementOrderQueryPushBatchList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeIncomePaymentConfirmationOrderQueryPushBatchList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key } = item;
  };

  const open = () => {
    resetSearch();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 60vh;
    overflow-y: auto;
    .task-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #e4e4e4;
      border-radius: 12px;
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }
      &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }
</style>
