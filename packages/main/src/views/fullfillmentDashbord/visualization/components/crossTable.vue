<template>
  <el-table :data="tableData" stripe class="cross-table" style="width: 100%">
    <el-table-column label="" prop="status" min-width="120px" fixed="left" />
    <el-table-column
      v-for="column in columns"
      :key="column.key"
      :label="column.label"
      :prop="`values.${column.key}`"
      min-width="120px"
      align="center"
    >
      <template #default="{ row }">
        {{ row.values[column.key] ?? 0 }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  type DimensionItem = {
    name: string;
    qty: number;
  };

  type CrossTableItem = {
    status: string;
    dimension: DimensionItem[];
  };

  type CrossTableRow = {
    status: string;
    values: Record<string, number>;
  };
  type CrossTableColumn = {
    key: string;
    label: string;
  };

  const TOTAL_KEY = '__total__';
  const TOTAL_LABEL = '合计';

  const props = withDefaults(
    defineProps<{
      data: CrossTableItem[];
      options?: {
        rowHeaderLabel?: string;
      };
    }>(),
    {
      data: () => [],
    }
  );
  const columns = computed<CrossTableColumn[]>(() => {
    const name = new Set<string>();
    props.data.forEach((item) => {
      item.dimension.forEach((dim) => {
        if (!dim || !dim.name) return;
        name.add(dim.name);
      });
    });
    const baseColumns = [...name].map((column) => ({ key: column, label: column }));
    return [...baseColumns, { key: TOTAL_KEY, label: TOTAL_LABEL }];
  });
  const tableData = computed<CrossTableRow[]>(() => {
    const rows = props.data.map((item) => {
      const values: Record<string, number> = {};
      let rowTotal = 0;
      item.dimension.forEach((dim) => {
        if (!dim || !dim.name) return;
        values[dim.name] = dim.qty;
        rowTotal += dim.qty || 0;
      });
      values[TOTAL_KEY] = rowTotal;
      return {
        status: item.status,
        values,
      };
    });

    const totalValues: Record<string, number> = {};
    columns.value.forEach((column) => {
      totalValues[column.key] = rows.reduce((sum, row) => sum + (row.values[column.key] ?? 0), 0);
    });

    return [
      ...rows,
      {
        status: TOTAL_LABEL,
        values: totalValues,
      },
    ];
  });
</script>

<style scoped lang="scss">
  .cross-table {
    width: 100%;
  }
</style>
