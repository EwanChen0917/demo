<template>
  <KeenList @refresh="refreshList" @reset-search="resetSearch">
    <template #search>
      <el-tree-select
        clearable
        filterable
        node-key="deptId"
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        highlight-current
        v-model="search.deptIds"
        multiple
        :data="deptTreeData"
        :render-after-expand="false"
        placeholder="部门"
        check-strictly
        style="width: 260px"
        popper-class="picker-cat-tree-select"
      />
    </template>
    <template #filters>
      <el-input
        v-model="search.customerName"
        clearable
        placeholder="客户名称"
        style="width: 220px"
        :max-length="50"
        show-word-limit
      />
      <DeptMember
        v-model="search.salesOperations"
        placeholder="销售运营"
        clearable
        multiple
        maxCollapseTags="1"
        style="width: 220px"
        :manual="true"
        :manual-options="memberList"
      />
      <DeptMember
        v-model="search.salesPerson"
        placeholder="销售"
        clearable
        multiple
        maxCollapseTags="1"
        style="width: 220px"
        :manual="true"
        :manual-options="memberList"
      />
      <el-select
        v-model="search.customerTypes"
        clearable
        multiple
        placeholder="客户类型"
        :options="b2bClientType"
        :props="{
          label: 'desc',
          value: 'value',
        }"
      />

      <el-select
        v-model="search.fulfillmentStatuses"
        clearable
        placeholder="订单状态"
        multiple
        :options="orderStatusList"
      />
      <DeptMember
        v-model="search.orderClerks"
        placeholder="订单员"
        clearable
        maxCollapseTags="1"
        style="width: 220px"
        multiple
        :manual="true"
        :manual-options="memberList"
      />

      <el-form-item label="创建时间:" v-if="showVisualization" style="margin-bottom: 0">
        <DateRangePicker
          v-model:startDate="search.createTimeStart"
          v-model:endDate="search.createTimeEnd"
          start-placeholder="创建开始日期"
          end-placeholder="创建截止日期"
          :width="'270px'"
          :outputDateOnly="true"
        />
      </el-form-item>
      <el-form-item label="要求发货时间:" v-if="showVisualization" style="margin-bottom: 0">
        <DateRangePicker
          v-if="showVisualization"
          v-model:startDate="search.requiredShipDateStart"
          v-model:endDate="search.requiredShipDateEnd"
          start-placeholder="要求发货开始日期"
          end-placeholder="要求发货截止日期"
          :width="'270px'"
          :outputDateOnly="true"
        />
      </el-form-item>

      <el-form-item label="实际发货时间:" v-if="showVisualization" style="margin-bottom: 0">
        <DateRangePicker
          v-if="showVisualization"
          v-model:startDate="search.actualShipDateStart"
          v-model:endDate="search.actualShipDateEnd"
          start-placeholder="实际发货开始日期"
          end-placeholder="实际发货截止日期"
          :width="'270px'"
          :outputDateOnly="true"
        />
      </el-form-item>
      <el-form-item label="预计到货时间:" v-if="!showVisualization" style="margin-bottom: 0">
        <DateRangePicker
          v-if="!showVisualization"
          v-model:startDate="search.expectedArrivalDateStart"
          v-model:endDate="search.expectedArrivalDateEnd"
          start-placeholder="预计到货开始日期"
          end-placeholder="预计到货截止日期"
          :width="'270px'"
          :outputDateOnly="true"
        />
      </el-form-item>
      <el-form-item label="实际到货时间:" v-if="!showVisualization" style="margin-bottom: 0">
        <DateRangePicker
          v-if="!showVisualization"
          v-model:startDate="search.actualArrivalDateStart"
          v-model:endDate="search.actualArrivalDateEnd"
          start-placeholder="实际到货开始日期"
          end-placeholder="实际到货截止日期"
          :width="'270px'"
          :outputDateOnly="true"
        />
      </el-form-item>

      <el-input
        v-model="search.erpCode"
        :max-length="50"
        show-word-limit
        clearable
        placeholder="订单号"
        style="width: 220px"
      />
      <el-date-picker
        v-model="search.year"
        type="year"
        clearable
        value-format="YYYY"
        format="YYYY"
        placeholder="年份"
        style="width: 140px"
      />
    </template>

    <template #buttons>
      <slot name="buttons"></slot>
      <el-button
        type="primary"
        v-if="!showVisualization"
        @click="handleClickExport"
        :loading="exportLoading"
      >
        导出
      </el-button>
      <el-button
        type="primary"
        v-if="!showVisualization"
        @click="handleClickImport"
        :loading="importLoading"
      >
        导入
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
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
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
  <fullfillmentCustomImportDialog
    v-if="!showVisualization"
    ref="importDialogRef"
    :type="props.type"
    @success="handleImportSuccess"
    @cancel="handleImportCancel"
    @close="handleImportClose"
  />
</template>

<script setup lang="ts" name="orderFulfillmentVisualization">
  import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';
  import dayjs from 'dayjs';
  import { omsApi, OmsApi } from '@/api';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus/es';
  import * as swal from '@/utils/swal';
  import useList from '@/hooks/list/useList';
  import stockTable, { type stockCloumns } from '@/views/stock/components/stockTable.vue';
  import DateRangePicker from '@/views/stock/stockCenter/components/common/DateRangePicker.vue';
  import type { CommonRespCommonExportResp } from '@/api/oms/data-contracts';
  import fullfillmentCustomImportDialog, {
    ImportDialogOption,
  } from '../components/fullfillmentCustomImportDialog.vue';
  import { baseUseVisualizationOptions } from '../hooks/baseUseVisualizationOptions';
  import type { ExtractResult } from '../..';

  const {
    deptTreeData,
    getDeptTreeData,
    b2bClientType,
    queryB2bClientType,
    orderStatusList,
    memberList,
    queryMemberList,
  } = baseUseVisualizationOptions();
  const router = useRouter();
  const tableRef = useTemplateRef('tableRef');
  type FulfillmentBiResult = ExtractResult<OmsApi.OmsFulfillmentBiPage.ResponseBody>;
  type commonExportResult = ExtractResult<CommonRespCommonExportResp>;
  type FullfillmentType = Exclude<NonNullable<typeof props.type>, 'order'>;

  type ExportOption = {
    title: string;
    exportService?: (
      params: OmsApi.OmsFulfillmentBiPage.RequestBody
    ) => Promise<CommonRespCommonExportResp>;
  };
  const props = withDefaults(
    defineProps<{
      columns: stockCloumns[];
      type?: 'logistics' | 'order' | 'warehouse' | 'plan';
    }>(),
    {
      columns: () => [],
      type: 'order',
    }
  );
  const showVisualization = computed(() => props.type === 'order');
  const PAGE_SIZE = 10;
  const defaultStartDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
  const defaultEndDate = dayjs().format('YYYY-MM-DD');
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
  } = useList<OmsApi.OmsFulfillmentBiPage.RequestBody, FulfillmentBiResult>({
    searchDefaults: {
      actualShipDateEnd: showVisualization.value ? defaultEndDate : undefined,
      actualShipDateStart: showVisualization.value ? defaultStartDate : undefined,
      actualArrivalDateEnd: !showVisualization.value ? defaultEndDate : undefined,
      actualArrivalDateStart: !showVisualization.value ? defaultStartDate : undefined,
      expectedArrivalDateEnd: !showVisualization.value ? defaultEndDate : undefined,
      expectedArrivalDateStart: !showVisualization.value ? defaultStartDate : undefined,
      createTimeEnd: showVisualization.value ? defaultEndDate : undefined,
      createTimeStart: showVisualization.value ? defaultStartDate : undefined,
      requiredShipDateEnd: showVisualization.value ? defaultEndDate : undefined,
      requiredShipDateStart: showVisualization.value ? defaultStartDate : undefined,
      salesOperations: undefined,
      salesPerson: undefined,
      year: undefined,
      customerName: undefined,
      customerTypes: undefined,
      deptIds: undefined,
      erpCode: undefined,
      fulfillmentStatuses: undefined,
      orderClerks: undefined,
      moduleType: props.type,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsFulfillmentBiPage as any,
  });

  const tableList = computed(() => {
    return listData.value?.recordList ?? [];
  });

  const columns = computed<stockCloumns[]>(() => {
    return props.columns || [];
  });
  const exportLoading = ref(false);
  const importLoading = ref(false);
  const importDialogRef = useTemplateRef('importDialogRef');

  const importDialogConfigMap: Record<FullfillmentType, ImportDialogOption> = {
    logistics: {
      title: '物流导入',
      importScene: 'oms_fulfillment_bi_logistics',
      requirementList: ['仅支持 xls、xlsx 文件格式', '请先下载模板并按模板填写后导入'],
      uploadService: omsApi.omsFulfillmentBiLogisticsImport,
      templateService: omsApi.omsFulfillmentBiLogisticsImportTemplate,
    },
    warehouse: {
      title: '仓储导入',
      importScene: 'oms_fulfillment_bi_warehouse',
      requirementList: ['仅支持 xls、xlsx 文件格式', '请先下载模板并按模板填写后导入'],
      uploadService: omsApi.omsFulfillmentBiOrderImport,
      templateService: omsApi.omsFulfillmentBiOrderImportTemplate,
    },
    plan: {
      title: '计划导入',
      requirementList: ['仅支持 xls、xlsx 文件格式', '请先下载模板并按模板填写后导入'],
      uploadService: omsApi.omsFulfillmentBiPlanImport,
      templateService: omsApi.omsFulfillmentBiPlanImportTemplate,
    },
  };
  const exportConfigMap: Record<FullfillmentType, ExportOption> = {
    logistics: {
      title: '物流导出',
      exportService: omsApi.omsFulfillmentBiLogisticsExport,
    },
    warehouse: {
      title: '仓储导出',
      exportService: omsApi.omsFulfillmentBiOrderExport,
    },
    plan: {
      title: '计划导出',
      exportService: omsApi.omsFulfillmentBiPlanExport,
    },
  };

  const handleClickExport = async () => {
    if (exportLoading.value) return;
    if (props.type === 'order') return;
    try {
      const isConfirmed = await swal.confirm({
        title: '确认',
        text: '确定要导出吗？',
      });
      if (!isConfirmed) return;
      exportLoading.value = true;

      const exportOptions = exportConfigMap[props.type];
      if (!exportOptions.exportService) {
        return;
      }
      const res = (await exportOptions.exportService({
        ...search,
        pageNum: current.value,
        pageSize: pageSize.value,
      })) as commonExportResult;
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
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
    } catch (error: unknown) {
      ElMessage.error((error as Error)?.message || '导出失败，请重试');
    } finally {
      exportLoading.value = false;
    }
  };
  const handleClickImport = async () => {
    if (importLoading.value) return;
    importLoading.value = true;
    try {
      importDialogRef.value?.open(importDialogConfigMap[props.type]);
    } finally {
      importLoading.value = false;
    }
  };
  queryMemberList();
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
    getDeptTreeData();
    queryB2bClientType();
  });
  defineExpose({
    refreshList,
  });
</script>

<style scoped lang="scss"></style>
