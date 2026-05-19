<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" clearable placeholder="编码/名称" style="width: 300px">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.status" clearable placeholder="状态">
        <el-option
          v-for="item in statusList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="add" v-permission="'paymentTermsAdd'">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.receiptConditionList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column label="编码" prop="code" min-width="120" />
      <el-table-column label="名称" prop="name" min-width="200" />
      <el-table-column label="结算方式" prop="settlementMethodDesc" min-width="120" />
      <el-table-column label="结算周期（天）" prop="settlementPeriod" min-width="120" />
      <el-table-column label="状态" prop="statusDesc" min-width="120">
        <template #default="{ row }">
          <Tag :color="+row.status === 1 ? 'green' : 'red'" size="small">
            {{ +row.status === 1 ? '已启用' : '已停用' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '停用',
                key: 'disable',
                type: 'danger',
                row: row,
                hide: [0].includes(+row.status),
                permissionCode: 'paymentTermsDisable',
              },
              {
                label: '启用',
                key: 'enable',
                type: 'primary',
                row: row,
                hide: [1].includes(+row.status),
                permissionCode: 'paymentTermsEnable',
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
    <AddModel v-if="modelVisible" :visible="modelVisible" @close="handleModelClose" />
  </KeenList>
</template>

<script setup lang="ts" name="paymentTerms">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import AddModel from './components/addModel.vue';

  const PAGE_SIZE = 10;
  const statusList = [
    // {name:'全部状态',code:''},
    { name: '已启用', code: 1 },
    { name: '已停用', code: 0 },
  ];
  const modelVisible = ref<boolean>(false);
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
    FinanceSystemApi.FinanceReceiptConditionQueryList.RequestBody,
    FinanceSystemApi.FinanceReceiptConditionQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      status: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeReceiptConditionQueryList,
  });

  const batchUpdateDialogRef = ref();

  const router = useRouter();

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'enable') {
      // 启用
      const res = await swal.confirm({
        title: `确认启用？`,
      });
      if (res) {
        await financeSystemApi.financeReceiptConditionUpdateStatus({ code: row.code, status: 1 });
        ElMessage.success('启用成功');
        refreshList();
      }
    } else {
      // 禁用
      const res = await swal.confirm({
        title: `确认停用？`,
      });
      if (res) {
        await financeSystemApi.financeReceiptConditionUpdateStatus({ code: row.code, status: 0 });
        ElMessage.success('停用成功');
        refreshList();
      }
    }
  };

  const add = () => {
    modelVisible.value = true;
  };

  const handleModelClose = (reload = false) => {
    console.log(reload);
    if (reload) {
      refreshList();
    }
    modelVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
