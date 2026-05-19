<template>
  <BaseFullfillment :columns="columns" type="logistics">
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
  </BaseFullfillment>
  <CustomDownLoadDialog ref="customDownLoadDialogRef" />
</template>

<script setup lang="ts" name="logisticsOrderFulfillment">
  import { computed, useTemplateRef } from 'vue';
  import { type stockCloumns } from '@/views/stock/components/stockTable.vue';
  import BaseFullfillment from './baseFullfillment.vue';
  import { fullfillmentVisualizationEnum } from '../enum';
  import CustomDownLoadDialog from '../components/customDownLoadDialog.vue';

  const customDownLoadDialogRef = useTemplateRef('customDownLoadDialogRef');
  const columns = computed<stockCloumns[]>(() => {
    return [
      {
        prop: fullfillmentVisualizationEnum.订单号,
        label: '订单号',
        minWidth: 200,
        fixed: 'left',
      },
      {
        prop: fullfillmentVisualizationEnum.期望发货日期,
        label: '期望发货日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.要求发货日期,
        label: '要求发货日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.仓库签出倒计时,
        label: '仓库签出倒计时',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.销售运营,
        label: '销售运营',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.订单员,
        label: '订单员',
        minWidth: 200,
      },
      {
        prop: fullfillmentVisualizationEnum.物流专员,
        label: '物流专员',
        minWidth: 200,
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
        showOverflowTooltip: true,
      },

      {
        prop: fullfillmentVisualizationEnum.订单状态,
        label: '订单状态',
        minWidth: 150,
      },
      {
        prop: fullfillmentVisualizationEnum.发货方式,
        label: '发货方式',
        minWidth: 220,
      },
      {
        prop: fullfillmentVisualizationEnum.交货方式,
        label: '交货方式',
        minWidth: 220,
      },
      {
        prop: fullfillmentVisualizationEnum.订单管理审核日期,
        label: '订单管理审核日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.推送仓库时间,
        label: '推送仓库时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.预计打包完成时间,
        label: '预计打包完成日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.实际打包完成时间,
        label: '实际打包完成日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.ESD预计发货日期,
        label: 'ESD预计发货日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.ASD实际发货日期,
        label: 'ASD实际发货日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.ETA预计到货日期,
        label: 'ETA预计到货日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.ATA实际签收日期,
        label: 'ATA实际签收日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.发货仓库,
        label: '发货仓库',
        minWidth: 220,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.配送方式,
        label: '物流渠道',
        minWidth: 220,
      },
      {
        prop: fullfillmentVisualizationEnum.快递单号,
        label: '快递单号',
        minWidth: 180,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.订单数量,
        label: '订单数量',
        minWidth: 100,
      },
      {
        prop: fullfillmentVisualizationEnum.附件列表B2B订单,
        label: '附件列表（B2B订单）',
        width: 170,
        slot: fullfillmentVisualizationEnum.附件列表B2B订单,
      },
      {
        prop: fullfillmentVisualizationEnum.附件列表仓库订单,
        label: '附件列表（仓库订单）',
        width: 170,
        slot: fullfillmentVisualizationEnum.附件列表仓库订单,
      },
      {
        prop: fullfillmentVisualizationEnum.打托信息,
        label: '打托信息',
        minWidth: 200,
        showOverflowTooltip: true,
      },
    ];
  });
  function handleB2bDownload(row: Record<string, any>) {
    if (!row.attachment1List) return;
    customDownLoadDialogRef.value?.open({ downloadList: row.attachment1List });
  }
  function handleWarehouseDownload(row: Record<string, any>) {
    if (!row.attachment2List) return;
    customDownLoadDialogRef.value?.open({ downloadList: row.attachment2List });
  }
</script>

<style scoped lang="scss"></style>
