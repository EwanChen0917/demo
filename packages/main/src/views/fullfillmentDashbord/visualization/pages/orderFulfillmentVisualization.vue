<template>
  <BaseFullfillment :columns="columns" type="order" ref="baseFullfillmentRef">
    <template #attachment1List="{ row }">
      <el-button
        type="text"
        @click="handleB2bDownload(row)"
        :disabled="!row.attachment1List || row.attachment1List.length === 0"
      >
        下载
      </el-button>
    </template>
    <template #attachment2List="{ row }">
      <el-button
        type="text"
        @click="handleWarehouseDownload(row)"
        :disabled="!row.attachment2List || row.attachment2List.length === 0"
      >
        下载
      </el-button>
    </template>
    <template #actions="{ row }">
      <el-button type="text" @click="handleEditDetail(row)">计划编辑</el-button>
    </template>
  </BaseFullfillment>
  <OrderFulfillmentPlanDialog ref="planDialogRef" @success="handlePlanDialogSuccess" />

  <CustomDownLoadDialog ref="customDownLoadDialogRef" />
</template>

<script setup lang="ts" name="orderVisualization">
  import { computed, ref, useTemplateRef } from 'vue';
  import { type stockCloumns } from '@/views/stock/components/stockTable.vue';
  import BaseFullfillment from './baseFullfillment.vue';
  import OrderFulfillmentPlanDialog from '../components/OrderFulfillmentPlanDialog.vue';
  import { fullfillmentVisualizationEnum } from '../enum';
  import CustomDownLoadDialog from '../components/customDownLoadDialog.vue';

  const baseFullfillmentRef = useTemplateRef('baseFullfillmentRef');
  const customDownLoadDialogRef = useTemplateRef('customDownLoadDialogRef');
  const columns = computed<stockCloumns[]>(() => {
    return [
      {
        prop: fullfillmentVisualizationEnum.部门,
        label: '部门',
        minWidth: 200,
        fixed: 'left',
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.客户类型,
        label: '客户类型',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.客户编码,
        label: '客户编码',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.客户名称,
        label: '客户名称',
        minWidth: 180,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.齐套号,
        label: '齐套号',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.订单号,
        label: '订单号',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.履约状态,
        label: '履约状态',
        minWidth: 150,
      },
      {
        prop: fullfillmentVisualizationEnum.订单渠道,
        label: '订单渠道',
        minWidth: 150,
      },
      {
        prop: fullfillmentVisualizationEnum.参考单号,
        label: '参考单号',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.销售运营,
        label: '销售运营',
        minWidth: 250,
      },
      {
        prop: fullfillmentVisualizationEnum.销售,
        label: '销售',
        minWidth: 250,
      },
      {
        prop: fullfillmentVisualizationEnum.订单员,
        label: '订单员',
        minWidth: 250,
      },
      {
        prop: fullfillmentVisualizationEnum.物流专员,
        label: '物流专员',
        minWidth: 250,
      },
      {
        prop: fullfillmentVisualizationEnum.销售出库单号,
        label: '销售出库单号',
        minWidth: 250,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.三方出库单号,
        label: '三方出库单号',
        minWidth: 250,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.期望发货日期,
        label: '期望发货日期',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.要求发货日期,
        label: '要求发货日期',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.仓库签出倒计时,
        label: '仓库签出倒计时',
        minWidth: 160,
      },
      {
        prop: fullfillmentVisualizationEnum.收件人国家,
        label: '收件人国家',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.收件人省州,
        label: '收件人省/州',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.创建时间,
        label: '创建时间',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.创建人,
        label: '创建人',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.上级审核时间,
        label: '上级审核时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.上级审核人,
        label: '上级审核人',
        minWidth: 200,
      },

      {
        prop: fullfillmentVisualizationEnum.会计审核时间,
        label: '会计审核时间',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.会计审核人,
        label: '会计审核人',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.订单管理审核时间,
        label: '订单管理审批审核时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.订单管理审核人,
        label: '订单管理审批审核人',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.预计齐套时间,
        label: '预计齐套时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.实际齐套日期,
        label: '实际齐套日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.推送仓库时间,
        label: '推送仓库时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.预计打包完成时间,
        label: '预计打包完成时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.实际打包完成时间,
        label: '实际打包完成时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.预计发货时间,
        label: '预计发货时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.实际发货时间,
        label: '实际发货时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.预计到货时间,
        label: '预计到货时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.实际到货时间,
        label: '实际到货时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.发货仓库,
        label: '发货仓库',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.配送方式,
        label: '物流渠道',
        minWidth: 220,
      },
      {
        prop: fullfillmentVisualizationEnum.交货方式,
        label: '交货方式',
        minWidth: 220,
      },
      {
        prop: fullfillmentVisualizationEnum.快递单号,
        label: '快递单号',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.订单数量,
        label: '订单数量',
        minWidth: 120,
      },
      {
        prop: fullfillmentVisualizationEnum.订单附件,
        label: '订单附件',
        width: 100,
        slot: fullfillmentVisualizationEnum.订单附件,
        fixed: 'right',
      },
      {
        prop: fullfillmentVisualizationEnum.出库单附件,
        label: '出库单附件',
        width: 110,
        slot: fullfillmentVisualizationEnum.出库单附件,
        fixed: 'right',
      },
      {
        prop: fullfillmentVisualizationEnum.打托信息,
        label: '打托信息',
        minWidth: 120,
      },
      {
        prop: fullfillmentVisualizationEnum.订单来源,
        label: '订单来源',
        minWidth: 120,
      },
      {
        prop: 'operations',
        label: '操作',
        width: 100,
        slot: 'actions',
        fixed: 'right',
      },
    ];
  });
  const planDialogRef = ref<InstanceType<typeof OrderFulfillmentPlanDialog>>();

  const handleEditDetail = (row: Record<string, any>) => {
    planDialogRef.value?.open({ row });
  };

  const handlePlanDialogSuccess = () => {
    baseFullfillmentRef.value?.refreshList();
  };
  function handleB2bDownload(row: Record<string, any>) {
    const downloadList = Array.isArray(row?.attachment1List) ? row.attachment1List : [];
    if (!downloadList.length) return;
    customDownLoadDialogRef.value?.open({ title: '订单附件', downloadList });
  }
  function handleWarehouseDownload(row: Record<string, any>) {
    const downloadList = Array.isArray(row?.attachment2List) ? row.attachment2List : [];
    if (!downloadList.length) return;
    customDownLoadDialogRef.value?.open({ title: '出库单附件', downloadList });
  }
</script>

<style scoped lang="scss"></style>
