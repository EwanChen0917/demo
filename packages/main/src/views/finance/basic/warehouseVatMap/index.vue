<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          clearable
          placeholder="仓库编码/仓库名称/VAT"
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="addWarehouseVatMap">新增</el-button>
      <el-button class="button" type="primary" @click="importWarehouseVatMap">导入</el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column label="仓库编码" prop="warehouseCode" />
      <el-table-column label="仓库名称" prop="warehouseName" />
      <el-table-column label="VAT" prop="vat" />
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <Tag :color="+row.status === 1 ? 'green' : 'red'" size="small">
            {{ +row.status === 1 ? '启用' : '禁用' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" prop="effectiveTime" />
      <el-table-column label="失效时间" prop="expirationTime" />
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
              },
              // 状态
              {
                label: row.status === 1 ? '禁用' : '启用',
                key: 'status',
                type: 'primary',
                row: row,
              },
              // 删除
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
  <ImportModal ref="importModalRef" @success="refreshList" />
</template>

<script setup lang="ts" name="warehouseVatMap">
import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi } from '@/api';
  import EditDialog from './components/EditDialog.vue';
  import * as swal from '@/utils/swal';
  import ImportModal from './components/importModal.vue';

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
  } = useList<ErpApi.LuteosErpWarehouseVatQueryReq, ErpApi.LuteosErpWarehouseVatQueryListResp>({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpWarehouseVatQueryList,
  });

  const editDialogRef = ref();
  const importModalRef = ref();

  const addWarehouseVatMap = () => {
    editDialogRef.value.open();
  };
  const importWarehouseVatMap = () => {
    importModalRef.value.open();
  };

  const handleActions = async (action) => {
    const { key, row } = action;
    switch (key) {
      case 'edit':
        editDialogRef.value.open({ ...row });
        break;
      case 'status':
        const isOk = await swal.confirm(
          `确认${row.status === 1 ? '禁用' : '启用'}该仓库VAT映射吗？`
        );
        if (!isOk) return;
        await erpApi.luteosErpWarehouseVatChangeStatus({
          id: row.id,
          status: row.status === 1 ? 0 : 1,
        });
        runQuery();
        break;
      case 'delete':
        const isConfirmed = await swal.confirm(`确认删除该仓库VAT映射吗？`);
        if (!isConfirmed) return;
        const res = await erpApi.luteosErpWarehouseVatDelete({ id: row.id });
        if (res) {
          runQuery();
        }
        break;
    }
  };
</script>

<style scoped lang="scss">
  /* 这里可以添加样式 */
</style>
