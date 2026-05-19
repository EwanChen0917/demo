<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="表名、表描述" />
    </template>
    <template #buttons>
      <el-button type="primary" @click="editDialogRef?.open()">
        <el-icon><Plus /></el-icon>
        新增数据表
      </el-button>
    </template>
    <el-table :data="listData?.list || []" v-loading="listLoading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="table" label="表" />
      <el-table-column prop="tableName" label="表名" />
      <el-table-column prop="tableDesc" label="表描述" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" min-width="90">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '管理维度',
                key: 'manageDimension',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '管理指标',
                key: 'manageIndicator',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
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
  </KeenList>
  <EditDialog ref="editDialogRef" @success="refreshList" />
  <DimensionDialog ref="dimensionDialogRef" @success="refreshList" />
  <IndicatorDialog ref="indicatorDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="dataSheetManage">
  import useList from '@/hooks/list/useList';
  import { biApi, BiApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import EditDialog from './components/editDialog.vue';
  import DimensionDialog from './components/dimensionDialog.vue';
  import IndicatorDialog from './components/indicatorDialog.vue';

  const PAGE_SIZE = 10;
  const editDialogRef = ref<InstanceType<typeof EditDialog>>();
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
    runQuery,
    refreshList,
    resetSearch,
  } = useList<BiApi.BiTableList.RequestBody, BiApi.BiTableList.ResponseBody>({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: biApi.biTableList,
  });

  const dimensionDialogRef = ref();
  const indicatorDialogRef = ref();
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'edit':
        editDialogRef.value?.open(row);
        break;
      case 'delete':
        const isConfirmed = await swal.confirm('确定删除该数据表吗？');
        if (!isConfirmed) return;
        await biApi.biTableDelete(row.id);
        ElMessage.success('删除成功');
        refreshList();
        break;
      case 'manageDimension':
        dimensionDialogRef.value?.open(row);
        break;
      case 'manageIndicator':
        indicatorDialogRef.value?.open(row);
        break;
    }
  };
</script>

<style scoped lang="scss"></style>
