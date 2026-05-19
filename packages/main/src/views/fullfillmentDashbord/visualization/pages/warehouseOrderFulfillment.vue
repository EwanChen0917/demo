<template>
  <BaseFullfillment :columns="columns" type="warehouse">
    <template #attachment1List="{ row }">
      <el-button
        type="text"
        @click="handleB2bDownload(row)"
        :disabled="!row.attachment1List || row.attachment1List.length === 0"
      >
        下载
      </el-button>
    </template>
  </BaseFullfillment>
  <CustomDownLoadDialog ref="customDownLoadDialogRef" />
</template>

<script setup lang="ts" name="warehouseFulfillment">
  import { computed, useTemplateRef } from 'vue';
  import { type stockCloumns } from '@/views/stock/components/stockTable.vue';
  import BaseFullfillment from './baseFullfillment.vue';
  import { fullfillmentVisualizationEnum } from '../enum';
  import CustomDownLoadDialog from '../components/customDownLoadDialog.vue';

  const customDownLoadDialogRef = useTemplateRef('customDownLoadDialogRef');
  const columns = computed<stockCloumns[]>(() => {
    return [
      {
        prop: fullfillmentVisualizationEnum.部门,
        label: '部门',
        minWidth: 220,
        showOverflowTooltip: true,
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
        prop: fullfillmentVisualizationEnum.销售出库单号,
        label: '销售出库单号',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.三方出库单号,
        label: '三方出库单号',
        minWidth: 200,
        showOverflowTooltip: true,
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
        minWidth: 130,
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
        prop: fullfillmentVisualizationEnum.订单状态,
        label: '订单状态',
        minWidth: 160,
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
        prop: fullfillmentVisualizationEnum.快递单号,
        label: '快递单号',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.订单数量,
        label: '订单数量',
        minWidth: 160,
      },
      {
        prop: fullfillmentVisualizationEnum.附件列表B2B订单,
        label: '附件列表（B2B订单）',
        width: 170,
        slot: fullfillmentVisualizationEnum.附件列表B2B订单,
        fixed: 'right',
      },
    ];
  });
  function handleB2bDownload(row: Record<string, any>) {
    if (!row.attachment1List) return;
    customDownLoadDialogRef.value?.open({ downloadList: row.attachment1List });
  }
</script>

<style scoped lang="scss"></style>
