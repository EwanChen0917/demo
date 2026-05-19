<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="看板编码、看板名称" />
    </template>
    <template #buttons>
      <el-button type="primary" @click="editDialogRef?.open()">
        <el-icon><Plus /></el-icon>
        新增看板
      </el-button>
    </template>
    <el-table :data="listData?.list || []" v-loading="listLoading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="reportCode" label="看板编码" />
      <el-table-column prop="reportName" label="看板名称" />
      <el-table-column prop="reportDesc" label="看板描述" />
      <el-table-column prop="menuCode" label="所属菜单编码" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" min-width="90">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '管理配置',
                key: 'manageConfig',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '管理维度',
                key: 'manageDimensionDashboard',
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
  <ConfigDialog ref="configDialogRef" @success="refreshList" />
  <DimensionDialog ref="dimensionDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="dashboardManage">
  import useList from '@/hooks/list/useList';
  import { biApi, BiApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import EditDialog from './components/editDialog.vue';
  import ConfigDialog from './components/configDialog.vue';
  import DimensionDialog from './components/dimensionDialog.vue';

  const PAGE_SIZE = 10;
  const editDialogRef = ref<InstanceType<typeof EditDialog>>();
  const configDialogRef = ref<InstanceType<typeof ConfigDialog>>();
  const dimensionDialogRef = ref<InstanceType<typeof DimensionDialog>>();
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
  } = useList<BiApi.BiReportList.RequestBody, BiApi.BiReportList.ResponseBody>({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: biApi.biReportList,
  });

  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'edit':
        editDialogRef.value?.open(row);
        break;
      case 'delete':
        const isConfirmed = await swal.confirm('确定删除该看板吗？');
        if (!isConfirmed) return;
        await biApi.biReportDelete(row.id);
        ElMessage.success('删除成功');
        refreshList();
        break;
      case 'manageConfig':
        configDialogRef.value?.open(row);
        break;
      case 'manageDimensionDashboard':
        dimensionDialogRef.value?.open(row);
        break;
    }
  };
</script>

<style scoped lang="scss"></style>
