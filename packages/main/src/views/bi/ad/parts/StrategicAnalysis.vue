<template>
  <BiCard title="广告策略分析">
    <vxe-grid
      class="table-wrapper"
      :columns="columns"
      :data="tableData"
      round
      :sort-config="{
        remote: true,
      }"
      @sort-change="handleSort"
    >
      <template #level="{ row, column }">
        <span :class="row[column.field]">{{ row[column.field] || '合计' }}</span>
      </template>
      <template #number="{ row, column }">
        <span class="font-din">{{ formatNumberObj(row[column.field]) }}</span>
      </template>
      <template #rate="{ row, column }">
        <span class="font-din">{{ formatRate(row[column.field]) }}</span>
      </template>
    </vxe-grid>
  </BiCard>
</template>

<script lang="ts" setup>
  import { type VxeGridPropTypes, type VxeTablePropTypes } from 'vxe-table';
  import BiCard from '@/views/bi/components/BiCard.vue';
  import { type BiContracts } from '@/api';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  const props = defineProps<{
    adsLevel?: BiContracts.AdsLevelTotalDO;
  }>();
  const columns: VxeGridPropTypes.Columns = [
    {
      field: 'adsLevel',
      title: '广告分层',
      minWidth: 72,
      fixed: 'left',
      slots: { default: 'level' },
    },
    {
      field: 'cost',
      title: '广告花费',
      minWidth: 94,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'adSalesAmount',
      title: '广告销售额',
      minWidth: 102,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'adOrderQty',
      title: '广告订单量',
      minWidth: 102,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'impressions',
      title: '曝光量',
      minWidth: 102,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'clicks',
      title: '点击量',
      minWidth: 102,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'roas',
      title: 'ROAS',
      minWidth: 76,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'atv',
      title: 'ATV',
      minWidth: 76,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'ctr',
      title: 'CTR',
      minWidth: 76,
      sortable: true,
      align: 'right',
      slots: { default: 'rate' },
    },
    {
      field: 'cpc',
      title: 'CPC',
      minWidth: 76,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'cpm',
      title: 'CPM',
      minWidth: 76,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'cpa',
      title: 'CPA',
      minWidth: 76,
      sortable: true,
      align: 'right',
      slots: { default: 'number' },
    },
    {
      field: 'cvr',
      title: 'CVR',
      minWidth: 76,
      sortable: true,
      align: 'right',
      slots: { default: 'rate' },
    },
    {
      field: 'costProp',
      title: '广告花费占比',
      minWidth: 114,
      sortable: true,
      align: 'right',
      slots: { default: 'rate' },
    },
    {
      field: 'impressionsProp',
      title: '曝光量占比',
      minWidth: 102,
      sortable: true,
      align: 'right',
      slots: { default: 'rate' },
    },
  ];
  const tableData = ref<BiContracts.AdDetailDO[]>([]);
  let sortParams = { field: '', order: '' as VxeTablePropTypes.SortOrder };
  const handleSort = (params: { field: string; order: VxeTablePropTypes.SortOrder }) => {
    const { field, order } = params;
    sortParams = {
      field,
      order,
    };
    if (!order) return;
    props.adsLevel?.adsLevelList?.sort((a, b) => {
      const valA = a[field] || 0;
      const valB = b[field] || 0;
      if (order === 'asc') {
        return valA - valB;
      }
      return valB - valA;
    });
    tableData.value = [props.adsLevel?.total || {}, ...(props.adsLevel?.adsLevelList || [])];
  };
  watch(
    () => props.adsLevel,
    (newVal) => {
      handleSort(sortParams);
      tableData.value = [newVal?.total || {}, ...(newVal?.adsLevelList || [])];
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .table-wrapper {
    --vxe-ui-font-size-default: 12px;
  }
  .顶层 {
    display: flex;
    align-items: center;
    column-gap: 6px;
    &::before {
      content: '';
      width: 14px;
      height: 14px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill='%23fff' d='M0 0h14v14H0z'/%3E%3Cpath d='M7 2l5.196 9.75H1.804L7 2z' fill='%2302B96B'/%3E%3C/svg%3E");
    }
  }
  .中层 {
    display: flex;
    align-items: center;
    column-gap: 6px;
    &::before {
      content: '';
      width: 14px;
      height: 14px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill='%23fff' d='M0 0h14v14H0z'/%3E%3Crect x='1.5' y='3' width='11' height='8' rx='2' fill='%2302B96B'/%3E%3C/svg%3E");
    }
  }
  .底层 {
    display: flex;
    align-items: center;
    column-gap: 6px;
    &::before {
      content: '';
      width: 14px;
      height: 14px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill='%23fff' d='M14 14H0V0h14z'/%3E%3Cpath d='M7 12L1.804 2.25h10.392L7 12z' fill='%2302B96B'/%3E%3C/svg%3E");
    }
  }
  .font-din {
    font-family: 'DIN', sans-serif;
  }
</style>
