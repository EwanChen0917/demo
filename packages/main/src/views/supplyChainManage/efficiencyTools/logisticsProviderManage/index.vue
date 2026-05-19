<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="codeType" class="mw-125px" @change="selectCode">
        <el-option value="supplierName" label="物流商名称" />
        <el-option value="supplierCode" label="物流商编码" />
      </el-select>
      <el-space>
        <el-input
          v-model="search[codeType]"
          placeholder="批量搜索请用空格或‘,’隔开"
          clearable
          class="w-350px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <el-select placeholder="状态" v-model="search.status" clearable style="min-width: 180px">
          <el-option :value="1" label="启用" />
          <el-option :value="0" label="禁用" />
        </el-select>
      </el-space>
    </template>

    <template #buttons>
      <el-button class="button" type="primary" @click="addLogistic">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="物流商编码" prop="supplierCode" min-width="150" fixed />
      <el-table-column label="物流商名称" prop="supplierName" min-width="150" fixed />
      <el-table-column label="物流商类型" prop="supplierTypeDesc">
        <template #default="{ row }">
          {{ row.supplierTypeDesc }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="row.status === 1 ? 'green' : 'red'">
            {{ row?.status == 1 ? '启用' : '禁用' }}
          </Tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="150" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '登录链接',
                key: 'loginLink',
                type: 'primary',
                disabled: !row?.status,
                text: true,
                row: row,
              },
              {
                label: '启用',
                key: 'enable',
                type: 'primary',
                text: true,
                row: row,
                hide: row.status === 1,
              },
              {
                label: '禁用',
                key: 'disable',
                type: 'primary',
                text: true,
                row: row,
                hide: row.status === 0,
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
  <LogDialog ref="logRef" />
  <LoginLinkDialog ref="LoginLinkDialogRef" />
  <EditLogisticDialog ref="editLogisticRef" :title="logisticDialogTitle" @success="runQuery" />
</template>

<script setup lang="ts" name="logisticsProviderManagement">
  import { ElTable as ElTableType, ElMessage, ElMessageBox } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import LogDialog from './components/logDialog.vue';
  import EditLogisticDialog from './components/editDialog.vue';
  import LoginLinkDialog from './components/loginLink.vue';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();

  const logRef = ref();
  const LoginLinkDialogRef = ref();
  const editLogisticRef = ref();
  const logisticDialogTitle = ref({});

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
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpLogisticsSupplierQueryList.RequestQuery,
    ErpApi.LuteosErpLogisticsSupplierQueryList.ResponseBody
  >({
    searchDefaults: {
      supplierName: undefined,
      supplierCode: undefined,
      status: 1,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpLogisticsSupplierQueryList,
  });

  const codeType = ref('supplierName');

  const selectCode = () => {
    ['supplierName', 'supplierCode'].forEach((i) => {
      if (i !== codeType.value) {
        search[i] = undefined;
      }
    });
  };

  // 新增
  const addLogistic = () => {
    logisticDialogTitle.value = {
      name: '新增物流商',
      type: 'add',
    };
    editLogisticRef?.value?.open();
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (true) {
      case key === 'detail':
      case key === 'edit':
        logisticDialogTitle.value = {
          name: key === 'detail' ? '物流商详情' : '编辑物流商',
          type: key,
        };
        editLogisticRef?.value?.open(row);
        break;

      case key === 'log':
        // 日志
        logRef?.value?.open(row.supplierCode);
        break;

      case key === 'loginLink':
        // 日志链接
        try {
          const res = await erpApi.luteosErpLogisticsSupplierQueryAccountToken({
            supplierCode: row.supplierCode,
          });
          LoginLinkDialogRef?.value?.open({ ...res, supplierCode: row.supplierCode });
        } catch (error) {
          console.log(error, 'error');
        }
        break;

      case key === 'enable':
      case key === 'disable':
        const action = key === 'enable' ? '启用' : '禁用';
        const isConfirmed = await ElMessageBox.confirm(`确认${action}该物流渠道吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        if (isConfirmed) {
          await erpApi.luteosErpLogisticsSupplierChangeStatus({
            status: 1 - row?.status,
            supplierCode: row?.supplierCode,
          });
          ElMessage.success('操作成功');
          refreshList();
        }
        break;
      default:
        break;
    }
  };
</script>

<style lang="scss" scoped></style>
