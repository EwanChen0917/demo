<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select
        v-model="search.customerCodeList"
        clearable
        filterable
        placeholder="客户"
        multiple
        collapse-tags
        collapse-tags-tooltip
        max-collapse-tags="2"
        style="min-width: 260px"
      >
        <el-option
          v-for="item in customerList"
          :key="`${item.code}-${item.name}`"
          :label="`${item.name || ''}  ${item.code || ''}`"
          :value="item.code"
        />
      </el-select>
    </template>
    <template #filters>
      <DeptMember
        v-model="search.salesOperationsCodeList"
        placeholder="销售运营"
        clearable
        class="w-200px"
        :manual="true"
        :manual-options="memberList"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      />
      <DeptMember
        v-model="search.salesCodeList"
        placeholder="销售"
        clearable
        class="w-200px"
        :manual="true"
        :manual-options="memberList"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      />
      <DeptMember
        v-model="search.logisticsSpecialistCodeList"
        placeholder="物流专员"
        clearable
        class="w-200px"
        :manual="true"
        :manual-options="memberList"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      />
      <DeptMember
        v-model="search.orderClerkCodeList"
        placeholder="订单员"
        clearable
        class="w-200px"
        :manual="true"
        :manual-options="memberList"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-button
        type="primary"
        :loading="importLoading"
        :disabled="importLoading"
        @click="handleImport"
      >
        导入
      </el-button>
      <el-button
        type="primary"
        :loading="exportLoading"
        :disabled="exportLoading"
        @click="handleExport"
      >
        导出
      </el-button>
    </template>

    <stockTable
      ref="tableRef"
      :data="tableList"
      :columns="columns"
      :loading="listLoading"
      :show-index="true"
      row-key="id"
    >
      <template #actions="{ row }">
        <el-button type="text" @click="handleEdit(row)">编辑</el-button>
      </template>
    </stockTable>

    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>

  <CustomerIntegrationMappingDialog
    ref="dialogRef"
    @success="refreshList"
    :member-list="memberList"
  />
  <fullfillmentCustomImportDialog
    ref="importDialogRef"
    type="relation"
    @success="handleImportSuccess"
    @cancel="handleImportCancel"
    @close="handleImportClose"
  />
</template>

<script setup lang="ts" name="orderfullfillmentCustomer">
  import { computed, onMounted, ref } from 'vue';
  import useList from '@/hooks/list/useList';
  import stockTable, { type stockCloumns } from '@/views/stock/components/stockTable.vue';
  import { erpApi, ErpApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus/es';
  import * as swal from '@/utils/swal';
  import { urlDownload } from '@/utils/download';
  import {
    CustomerDockingRelationBean,
    CustomerDockingRelationQueryListReq,
  } from '@/api/erp/data-contracts';
  import CustomerIntegrationMappingDialog from '../components/CustomerIntegrationMappingDialog.vue';
  import { baseUseVisualizationOptions } from '../hooks/baseUseVisualizationOptions';
  import fullfillmentCustomImportDialog, {
    ImportDialogOption,
  } from '../components/fullfillmentCustomImportDialog.vue';

  const PAGE_SIZE = 10;
  const exportLoading = ref(false);
  const importLoading = ref(false);
  const dialogRef = ref<InstanceType<typeof CustomerIntegrationMappingDialog>>();
  export type customerRelationItem = CustomerDockingRelationBean;
  const { customerList, queryCustomerList, memberList, queryMemberList } =
    baseUseVisualizationOptions();
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
    tableRef,
  } = useList<
    ErpApi.LuteosErpBaseCustomerDockingRelationQueryList.RequestBody,
    ErpApi.LuteosErpBaseCustomerDockingRelationQueryList.ResponseBody
  >({
    searchDefaults: {
      customerCodeList: undefined,
      logisticsSpecialistCodeList: undefined,
      orderClerkCodeList: undefined,
      salesCodeList: undefined,
      salesOperationsCodeList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpBaseCustomerDockingRelationQueryList,
  });

  const tableList = computed(() => {
    return listData.value?.recordList ?? [];
  });

  const columns = computed<stockCloumns[]>(() => {
    return [
      {
        prop: 'customerCode',
        label: '客户编码',
        minWidth: 140,
        fixed: 'left',
      },
      { prop: 'customerName', label: '客户名称', minWidth: 180 },
      { prop: 'customerStatusDesc', label: '客户状态', minWidth: 120 },
      { prop: 'salesOperationsName', label: '销售运营', minWidth: 140, showOverflowTooltip: true },
      { prop: 'salesName', label: '销售', minWidth: 140, showOverflowTooltip: true },
      { prop: 'orderClerkName', label: '订单员', minWidth: 140, showOverflowTooltip: true },
      {
        prop: 'logisticsSpecialistName',
        label: '物流专员',
        minWidth: 140,
        showOverflowTooltip: true,
      },
      { prop: 'actions', label: '操作', width: 100, slot: 'actions', fixed: 'right' },
    ];
  });

  const handleCreate = () => {
    dialogRef.value?.open({ type: 'create' });
  };

  const handleEdit = (row: customerRelationItem) => {
    dialogRef.value?.open({ type: 'edit', row });
  };

  const buildExportParams = () => {
    const params: CustomerDockingRelationQueryListReq = {
      ...search,
      pageNum: current.value,
      pageSize: pageSize.value,
    };

    const arrayKeys = ['customerCodeList'];
    arrayKeys.forEach((key) => {
      const val = params[key];
      if (!val || (Array.isArray(val) && val.length === 0)) {
        params[key] = undefined;
      } else if (!Array.isArray(val)) {
        params[key] = [val];
      }
    });
    return params;
  };

  const handleExport = async () => {
    try {
      if (exportLoading.value) return;
      const isConfirmed = await swal.confirm({
        title: '确认',
        text: '确定要导出吗？',
      });
      if (!isConfirmed) return;

      exportLoading.value = true;
      const res = await erpApi.luteosErpBaseCustomerDockingRelationExport(buildExportParams());
      if (!res?.downloadUrl) {
        ElMessage.error('导出失败，请重试');
        return;
      }
      urlDownload(res.downloadUrl);
    } catch (error: unknown) {
      ElMessage.error((error as Error)?.message || '导出失败，请重试');
    } finally {
      exportLoading.value = false;
    }
  };
  const importDialogRef = useTemplateRef('importDialogRef');
  const importDialogConfig: ImportDialogOption = {
    title: '导入客户对接关系',
    importScene: 'oms_fulfillment_bi_logistics',
    requirementList: ['仅支持 xls、xlsx 文件格式', '请先下载模板并按模板填写后导入'],
    uploadService: erpApi.luteosErpBaseCustomerDockingRelationImport,
    templateService: erpApi.luteosErpBaseCustomerDockingRelationDownImportTemplate,
  };
  const handleImport = () => {
    if (importLoading.value) return;
    if (!importDialogRef.value) return;
    importLoading.value = true;
    importDialogRef.value.open(importDialogConfig);
  };
  const handleImportSuccess = () => {
    refreshList();
  };
  const handleImportCancel = () => {
    importLoading.value = false;
  };
  const handleImportClose = () => {
    importLoading.value = false;
  };
  onMounted(() => {
    queryCustomerList();
  });
  queryMemberList();
</script>

<style scoped lang="scss"></style>
