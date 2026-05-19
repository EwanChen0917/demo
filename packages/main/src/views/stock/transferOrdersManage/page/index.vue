<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-input
        v-model="search.codeKeyword"
        placeholder="请输入单据编码"
        clearable
        class="w-300px"
        max-length="50"
        show-word-limit
      />
    </template>
    <template #filters>
      <el-select
        v-model="search.status"
        placeholder="请选择单据状态"
        clearable
        class="w-200px"
        :options="statusList"
      />
      <DeptMember
        v-model="search.productPlannerCode"
        placeholder="请选择计划专员"
        clearable
        style="width: 200px"
        :manual="true"
        :manual-options="memberList"
      />
    </template>
    <template #buttons>
      <!--暂时隐藏-->
      <!-- <el-button type="primary" @click="handleCreate">新建</el-button> -->

      <!-- <el-button :disabled="selectedRows.length === 0" type="primary" @click="handleSubmitSelected">
        提交
      </el-button> -->
      <!-- <el-button :disabled="selectedRows.length === 0" type="primary" @click="handleAuditSelected">
        审核
      </el-button> -->
      <!-- <el-button :disabled="selectedRows.length === 0" type="danger" @click="handleVoidSelected">
        作废
      </el-button> -->
      <!--暂时隐藏-->
      <!-- <el-button type="primary" :loading="importLoading" @click="handleImport">导入</el-button> -->
      <el-button type="primary" :loading="exportLoading" @click="handleExport">导出</el-button>
    </template>

    <stockTable
      ref="tableRef"
      :data="listData?.recordList"
      :columns="columns"
      :loading="listLoading"
      :show-index="true"
      :show-selection="true"
      row-key="code"
      @selection-change="handleSelectionChange"
    >
      <template #status="{ row }">
        <el-tag :type="row?.status === TransferPlanOrderStatus.Void ? 'danger' : 'primary'">
          {{ statusList.find((item) => item.value === row.status)?.label }}
        </el-tag>
      </template>
      <template #createBy="{ row }">
        <span>
          {{ row?.createBy === TransferPlanPerson.系统 ? '系统' : row?.createBy || '-' }}
        </span>
      </template>
      <template #auditBy="{ row }">
        <span>
          {{ row?.auditBy === TransferPlanPerson.系统 ? '系统' : row?.auditBy || '-' }}
        </span>
      </template>
      <template #actions="{ row }">
        <KeenActions
          display-style="buttons"
          :actions="[
            {
              label: '编辑',
              key: 'edit',
              type: 'primary',
              text: true,
              hide: row?.status !== TransferPlanOrderStatus.Created,
              row,
            },
            {
              label: '提交',
              key: 'submit',
              type: 'primary',
              text: true,
              hide: row?.status !== TransferPlanOrderStatus.Created,
              row,
            },
            {
              label: '审核',
              key: 'audit',
              type: 'primary',
              text: true,
              hide: row?.status !== TransferPlanOrderStatus.PendingAudit,
              row,
            },
            {
              label: '详情',
              key: 'detail',
              type: 'primary',
              text: true,
              row,
            },
            {
              label: '作废',
              key: 'void',
              type: 'danger',
              text: true,
              hide: row?.status !== TransferPlanOrderStatus.Created,
              row,
            },
          ]"
          @click="handleRowActions"
        />
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

  <TransferOrdersDetailDrawer ref="detailDrawerRef" @success="refreshList" />
  <TransferPlanOrderImportDialog ref="importDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="stockTransferOrderManage">
  import { ref, onMounted, computed, watch, nextTick, useTemplateRef } from 'vue';
  import { ElMessage } from 'element-plus/es';
  import useList from '@/hooks/list/useList';
  import stockTable, { stockCloumns } from '@/views/stock/components/stockTable.vue';
  import { OmsApi, omsApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { useTransOrderManage } from '../hooks/useTransferOrderManage';
  import TransferOrdersDetailDrawer from './detail.vue';
  import { TransferPlanOrderStatus, TransferPlanPerson } from '../enums/transferPlanOrderStatus';
  import TransferPlanOrderImportDialog from '../components/transferPlanOrderImportDialog.vue';

  const {
    getStatusList,
    statusList,
    submitTransferPlanOrder,
    abandonTransferPlanOrder,
    memberList,
    queryMemberList,
  } = useTransOrderManage();
  const PAGE_SIZE = 10;
  const exportLoading = ref(false);
  const router = useRouter();

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
    OmsApi.OmsTransferPlanQueryList.RequestBody,
    OmsApi.OmsTransferPlanQueryList.ResponseBody
  >({
    searchDefaults: {
      codeKeyword: undefined,
      status: TransferPlanOrderStatus.PendingAudit,
      productPlannerCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsTransferPlanQueryList,
  });

  const columns = ref<stockCloumns[]>([
    {
      prop: 'code',
      label: '单据编码',
      minWidth: 140,
      fixed: 'left',
      showOverflowTooltip: true,
    },
    { prop: 'status', label: '单据状态', minWidth: 100, slot: 'status' },
    { prop: 'productPlannerName', label: '计划专员', minWidth: 120 },
    { prop: 'totalApplyQty', label: '申请数量', minWidth: 100 },
    { prop: 'totalAuditQty', label: '审核数量', minWidth: 100 },
    { prop: 'skuLineCount', label: 'SKU数量', minWidth: 100 },
    { prop: 'createTime', label: '创建时间', minWidth: 160 },
    { prop: 'createBy', label: '创建人', minWidth: 120, slot: 'createBy' },
    { prop: 'auditTime', label: '审核时间', minWidth: 160 },
    { prop: 'auditBy', label: '审核人', minWidth: 120, slot: 'auditBy' },

    { prop: 'actions', label: '操作', width: 120, fixed: 'right', slot: 'actions' },
  ]);

  const detailDrawerRef = useTemplateRef('detailDrawerRef');
  const importDialogRef = useTemplateRef('importDialogRef');
  const selectedRowMap = ref(new Map<string, any>());
  const selectedRows = computed(() => Array.from(selectedRowMap.value.values()));

  const handleCreate = () => {
    detailDrawerRef.value?.open({ type: 'add' });
  };

  const handleVoidSelected = async () => {
    if (selectedRows.value.length === 0) return;
    const voidableRows = selectedRows.value.filter(
      (row: any) =>
        row?.status !== TransferPlanOrderStatus.Void &&
        row?.status !== TransferPlanOrderStatus.Audited
    );
    const validCodes = voidableRows
      .map((row: any) => String(row?.code || '').trim())
      .filter(Boolean);
    const uniqueCodes = Array.from(new Set(validCodes));

    if (uniqueCodes.length === 0) {
      ElMessage.warning('当前状态不支持作废');
      return;
    }

    const filteredCount = selectedRows.value.length - uniqueCodes.length;
    if (filteredCount > 0) {
      ElMessage.warning(`已自动过滤${filteredCount}条不支持作废的数据`);
    }

    const isConfirmed = await swal.confirm({
      title: '作废确认',
      text:
        uniqueCodes.length === 1
          ? '确认作废？'
          : `已选中${uniqueCodes.length}条数据，\n 确认作废？`,
    });
    if (!isConfirmed) return;
    await Promise.all(uniqueCodes.map((code) => omsApi.omsTransferPlanAbandon({ code })));
    await clearSelected();
    ElMessage.success('作废成功');
    refreshList();
  };

  const handleSelectionChange = (selection: any[]) => {
    const currentPageKeys = new Set(
      (listData.value?.recordList || []).map((row: any) => String(row?.code || '')).filter(Boolean)
    );

    currentPageKeys.forEach((key) => {
      selectedRowMap.value.delete(key);
    });

    selection.forEach((row: any) => {
      const key = String(row?.code || '');
      if (!key) return;
      selectedRowMap.value.set(key, row);
    });
  };

  const clearSelected = async () => {
    selectedRowMap.value.clear();
    await nextTick();
    tableRef.value?.clearSelection?.();
  };

  const handleExport = async () => {
    try {
      if (exportLoading.value) return;
      const isConfirmed = await swal.confirm({
        title: '确认',
        text: '确定要导出吗？',
      });
      if (!isConfirmed) return;
      const checkedRows = tableRef.value?.getCheckedRows?.();
      const isChecked = checkedRows?.length > 0;
      exportLoading.value = true;
      let listQuery = {};
      if (!isChecked) {
        listQuery = {
          ...search,
          pageNum: current.value,
          pageSize: pageSize.value,
        };
      }
      const res = await omsApi.omsTransferPlanExport({
        exportType: 1,
        listQuery: !isChecked ? listQuery : undefined,
        codes: isChecked ? checkedRows?.map((row: any) => row.code) : undefined,
      } as any);

      const isConfirmedExport = await swal.confirm({
        icon: 'success',
        title: '导出成功，具体请前往下载中心查看',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmedExport) return;

      await nextTick();
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: (res as any)?.appCode,
          module_code: (res as any)?.moduleCode,
          record_type: 2,
        },
      });
    } catch (error: any) {
      ElMessage.error(error?.message || '导出失败，请重试');
    } finally {
      exportLoading.value = false;
    }
  };
  const importLoading = ref(false);
  const handleImport = () => {
    importDialogRef.value?.open({
      type: 'list',
    });
  };
  const handleRowAction = (row?: any) => {
    if (!row?.code) {
      ElMessage.warning('缺少单据编码');
      return;
    }
    detailDrawerRef.value?.open({ type: row?.status, code: row.code });
  };

  const handleRowActions = async (item: { key: string; row?: any }) => {
    const { key, row } = item || {};
    if (key === 'detail') {
      handleRowAction(row);
      return;
    }
    if (key === 'submit') {
      await handleRowSubmit(row);
      return;
    }
    if (key === 'edit') {
      detailDrawerRef.value?.open({ type: TransferPlanOrderStatus.Created, code: row.code });
      return;
    }
    if (key === 'audit') {
      handleRowAction(row);
      return;
    }
    if (key === 'void') {
      handleRowVoid(row);
    }
  };

  const handleRowSubmit = async (row?: any) => {
    if (!row?.code) {
      ElMessage.warning('缺少单据编码');
      return;
    }
    if (row?.status !== TransferPlanOrderStatus.Created) {
      ElMessage.warning('仅支持对“已创建”状态的单据进行提交');
      return;
    }
    const ok = await submitTransferPlanOrder({
      code: row.code,
    });
    if (!ok) return;
    ElMessage.success('提交成功');
    await clearSelected();
    refreshList();
  };

  const handleRowVoid = (row?: any) => {
    if (!row?.code) {
      ElMessage.warning('缺少单据编码');
      return;
    }
    if (
      row?.status === TransferPlanOrderStatus.Void ||
      row?.status === TransferPlanOrderStatus.Audited
    ) {
      ElMessage.warning('当前状态不支持作废');
      return;
    }
    abandonTransferPlanOrder(row.code)
      .then(async (ok) => {
        if (!ok) return;
        await clearSelected();
        ElMessage.success('作废成功');
        refreshList();
      })
      .catch(() => {
        // 请求失败时 axios 封装已提示，这里不重复提示
      });
  };

  watch(
    () => [current.value, pageSize.value, listData.value?.recordList],
    async () => {
      // 不做回显：翻页/刷新后清掉当前页勾选，但保留跨页缓存
      await nextTick();
      tableRef.value?.clearSelection?.();
    }
  );
  onMounted(() => {
    getStatusList();
    queryMemberList();
  });
</script>

<style scoped lang="scss"></style>
