<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <FinanceWarehouseSelect
        v-model="search.sourceList"
        placeholder="仓库名称"
        clearable
        filterable
        multiple
      />
      <el-select
        v-model="search.targetList"
        :options="organizationList"
        :props="{label: 'name', value: 'name'}"
        placeholder="所属组织"
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        multiple
      />
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option :value="1" label="已启用" />
        <el-option :value="0" label="已停用" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="editDialogRef?.open()">新增</el-button>
      <ExportBtn :service="platformApi.platformMappingExportQueryList" :params="search">
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSpu"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column label="所属组织" prop="target" />
      <el-table-column label="仓库名称" prop="source">
        <template #default="{ row }">
          <div class="fs-7">{{ row?.source }}</div>
          <div class="fs-7 text-gray-500">{{ row?.sourceExt1 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row?.status]">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" prop="vaildStartTime" />
      <el-table-column label="失效时间" prop="vaildEndTime" />

      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                row,
              },

              {
                label: '启用',
                key: 'enable',
                type: 'success',
                hide: row?.status === 1,
                permissionCode: '',
                row,
              },
              {
                label: '停用',
                key: 'disable',
                type: 'danger',
                hide: row?.status === 0,
                permissionCode: '',
                row,
              },
              {
                label: '删除',
                key: 'del',
                type: 'danger',
                permissionCode: '',
                row,
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
  <EditDialog
    ref="editDialogRef"
    @success="
      () => {
        refreshList();
        queryMap();
      }
    "
    name="仓库"
    mappingCode="finance_mapping_warehouse_org"
    :organizationList="organizationList"
  />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { financeApi, platformApi, PlatformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import EditDialog from '@/views/finance/organizationMap/components/editDialog.vue';

  const statusColorMap = {
    0: 'red',
    1: 'green',
  };

  const editDialogRef = ref();
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
    PlatformApi.PlatformMappingQueryList.RequestBody,
    PlatformApi.PlatformMappingQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      mappingCode: 'finance_mapping_warehouse_org',
      status: undefined,
      sourceList: undefined,
      targetList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformMappingQueryList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      editDialogRef.value?.open(row);
    } else if (key === 'del') {
      const isConfirm = await swal.confirm('确认删除吗？');
      if (!isConfirm) return;
      await platformApi.platformMappingDeleted({ ids: [row?.id] });
      ElMessage.success('删除成功');
      refreshList();
    } else if (key === 'enable') {
      const isConfirm = await swal.confirm('确认启用吗？');
      if (!isConfirm) return;
      await platformApi.platformMappingChangeStatus({ id: row?.id, status: 1 });
      ElMessage.success('启用成功');
      refreshList();
    } else if (key === 'disable') {
      const isConfirm = await swal.confirm('确认停用吗？');
      if (!isConfirm) return;
      await platformApi.platformMappingChangeStatus({ id: row?.id, status: 0 });
      ElMessage.success('停用成功');
      refreshList();
    }
  };

  const organizationList = ref([]);
  const queryMap = async () => {
    const res = await financeApi.luteosFinanceSettlementOrganizationList({
      pageNum: 1,
      pageSize: 100,
    });
    organizationList.value = res?.list || [];
  };

  queryMap();
</script>

<style scoped lang="scss"></style>
