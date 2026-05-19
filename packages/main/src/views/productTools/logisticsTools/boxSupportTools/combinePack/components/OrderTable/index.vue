<template>
  <vxe-table
    ref="refTable"
    :data="orderList"
    style="min-width: 1000px"
    show-overflow
    show-header-overflow
    show-footer-overflow
    v-loading="loading"
    height="600"
    :column-config="{ resizable: true }"
    :scroll-y="{ enabled: true, gt: 0 }"
    :scroll-x="{ enabled: true, gt: 0 }"
  >
    <vxe-column
      v-for="v in tableColumnList"
      :key="v.prop"
      :title="v.label"
      :width="v.width || '80px'"
      :fixed="v.fixed ? 'left' : ''"
    >
      <template v-if="v.prop === 'index'" #default="{ row, $rowIndex }">
        <span v-if="!row.isExtraData">{{ $rowIndex + 1 }}</span>
      </template>
      <template v-else-if="v.prop.startsWith('boxNumber')" #default="{ row }">
        <el-input-number
          style="width: 100%"
          v-model="row[v.prop]"
          v-if="v.canEdit"
          :min="0"
          :precision="row.isExtraData ? 2 : 0"
          :controls="false"
          placeholder="请输入"
          :max="9999.99"
        />
        <span v-else>{{ row[v.prop] }}</span>
      </template>
      <template v-else #default="{ row }">{{ row[v.prop] }}</template>
    </vxe-column>
  </vxe-table>

  <!--  <el-table ref="refTable" class-name="table-row-dashed" :data="orderList" v-loading="loading">
    <el-table-column
      v-for="v in tableColumnList"
      :key="v.prop"
      :label="v.label"
      :width="v.width || 'auto'"
      :fixed="v.fixed ? true : false"
    >
      <template v-if="v.prop === 'index'" #default="{ $index, row }">
        <span v-if="!row.isExtraData">{{ $index + 1 }}</span>
      </template>
      <template v-else-if="v.prop.startsWith('boxNumber')" #default="{ row }">
        <el-input-number
          v-model="row[v.prop]"
          v-if="v.canEdit"
          :min="0"
          :precision="row.isExtraData ? 2 : 0"
          :controls="false"
          placeholder="请输入"
          :max="9999.99"
        />
        <span v-else>{{ row[v.prop] }}</span>
      </template>
      <template v-else #default="{ row }">{{ row[v.prop] }}</template>
    </el-table-column>
  </el-table>-->
</template>

<script lang="ts" setup>
  import { SourceOrderBean } from '@/api/erp/data-contracts';
  import { ElMessage, ElTable } from 'element-plus';

  export type NewSourceOrderBeanType = SourceOrderBean & { totalBox?: number };
  const initTableColumnList = [
    {
      prop: 'index',
      label: '序号',
      slotName: 'index',
      width: 50,
      fixed: true,
    },
    {
      prop: 'referenceCode',
      label: '参考号',
      fixed: true,
      width: 120,
    },
    {
      prop: 'orderCode',
      label: '订单号',
      fixed: true,
      width: 120,
    },
    {
      prop: 'customerName',
      label: '客户名称',
      fixed: true,
      width: 120,
    },
    {
      prop: 'productName',
      label: '产品名称',
      fixed: true,
      width: 120,
    },
    {
      prop: 'sku',
      label: 'sku',
      fixed: true,
      width: 120,
    },
    {
      prop: 'qty',
      label: '数量',
      fixed: true,
    },
  ];
  const tableColumnList = ref<
    {
      prop: string;
      label: string;
      slotName?: string;
      canEdit?: boolean;
      width?: number;
      fixed: boolean;
    }[]
  >(initTableColumnList);
  const refTable = ref<InstanceType<typeof ElTable>>();
  const props = withDefaults(
    defineProps<{
      orderList: NewSourceOrderBeanType[] | undefined;
      loading?: boolean;
    }>(),
    {}
  );
  const changeTableColumnList = (
    list: { prop: string; label: string; slotName?: string; canEdit?: boolean }[]
  ) => {
    tableColumnList.value = list;
  };
  const sureBoxNumber = (totalBox: number, canEdit: boolean) => {
    const arr: { prop: string; label: string; slotName?: string; canEdit?: boolean }[] = [];
    if (!totalBox) {
      ElMessage.error('请输入总箱数');
    } else {
      for (let i = 0; i < totalBox; i += 1) {
        arr.push({
          prop: `boxNumber${i + 1}`,
          label: `箱号${i + 1}`,
          slotName: `boxNumber${i + 1}`,
          canEdit,
        });
      }
      tableColumnList.value = [...initTableColumnList, ...arr] as any;
    }
  };
  const resetTableColumnList = () => {
    tableColumnList.value = initTableColumnList;
  };
  defineExpose({
    changeTableColumnList,
    resetTableColumnList,
    tableColumnList,
    sureBoxNumber,
    initTableColumnList,
  });
</script>

<style scoped lang="scss">
  .table-row-dashed {
    :deep(.el-input) {
      width: 80px;
    }
  }
</style>
