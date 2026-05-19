<template>
  <BaseFullfillment :columns="columns" type="plan" />
</template>

<script setup lang="ts" name="planOrderFulfillment">
  import { computed } from 'vue';
  import { type stockCloumns } from '@/views/stock/components/stockTable.vue';
  import BaseFullfillment from './baseFullfillment.vue';
  import { fullfillmentVisualizationEnum } from '../enum';

  const columns = computed<stockCloumns[]>(() => {
    return [
      {
        prop: fullfillmentVisualizationEnum.部门,
        label: '部门',
        minWidth: 220,
        fixed: 'left',
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.客户类型,
        label: '客户类型',
        minWidth: 120,
      },
      {
        prop: fullfillmentVisualizationEnum.客户名称,
        label: '客户名称',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.订单号,
        label: '订单号',
        minWidth: 220,
        showOverflowTooltip: true,
      },
      {
        prop: fullfillmentVisualizationEnum.期望发货日期,
        label: '期望发货日期',
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
      // {
      //   prop: fullfillmentVisualizationEnum.产品名称,
      //   label: '产品名称',
      //   minWidth: 200,
      //   showOverflowTooltip: true,
      // },
      // {
      //   prop: fullfillmentVisualizationEnum.产品SKU,
      //   label: '产品SKU',
      //   minWidth: 200,
      //   showOverflowTooltip: true,
      // },
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
        prop: fullfillmentVisualizationEnum.发货仓库,
        label: '仓库',
        minWidth: 200,
        showOverflowTooltip: true,
      },
      // {
      //   prop: fullfillmentVisualizationEnum.品线计划员,
      //   label: '品线计划员',
      //   minWidth: 200,
      // },
      {
        prop: fullfillmentVisualizationEnum.预计齐套日期,
        label: '预计齐套日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.实际齐套日期,
        label: '实际齐套日期',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.预计到货时间,
        label: '预计到货时间',
        minWidth: 180,
      },
      {
        prop: fullfillmentVisualizationEnum.实际到货日期,
        label: '实际到货日期',
        minWidth: 180,
      },
    ];
  });
</script>

<style scoped lang="scss"></style>
