<template>
  <div class="content-table" :class="{ 'content-evide': showEvide }">
    <EvidenceChain
      v-if="showEvide"
      :card-info="cardInfo"
      :showTitle="true"
      @drawer-click="emit('drawer-click')"
    />
    <el-table :data="localTableData.tableData" :max-height="456" style="width: 100%">
      <el-table-column
        v-if="yDataFlag"
        class-name="row-title"
        label=""
        prop="rowHeader"
        width="40"
        align="center"
      />
      <el-table-column
        v-for="item in localTableData.columnData"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import EvidenceChain from './evidenceChain.vue';

  const props = withDefaults(
    defineProps<{
      tableData: any;
      cardInfo: Object;
      showEvide?: boolean;
    }>(),
    {
      tableData: () => [],
      cardInfo: () => {
        return {};
      },
      showEvide: false,
    }
  );

  const emit = defineEmits<{
    (event: 'drawer-click'): void;
  }>();

  const yDataFlag = ref(false);
  const localTableData = ref<{ columnData?: Array<string>; tableData?: Array<any> }>({});
  watch(
    () => props.tableData,
    (newTable) => {
      if (Object.keys(newTable).length) {
        // console.log(newTable, '0000');
        localTableData.value.columnData = newTable.data.headers;
        // 有行表头
        localTableData.value.tableData = transformData(newTable.data.headers, newTable.data.rows);
      }
    },
    {
      deep: true,
      immediate: true,
    }
  );

  function transformData(headers, rows) {
    const headerLen = headers.length;
    return rows.map((row) => {
      const obj = {};
      // 情况1：row 长度 > 表头 → 第一个值作为 rowHeader
      if (row.length > headerLen) {
        yDataFlag.value = true;
        obj.rowHeader = row[0];
        // 从第2个元素开始匹配表头
        row.slice(1).forEach((val, idx) => {
          if (headers[idx]) obj[headers[idx]] = val;
        });
      }
      // 情况2：长度相等 → 直接一一对应
      else {
        yDataFlag.value = false;
        row.forEach((val, idx) => {
          if (headers[idx]) obj[headers[idx]] = val;
        });
      }
      return obj;
    });
  }
</script>

<style lang="scss" scoped>
  .content-evide {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .content-table {
    overflow: hidden;
    width: 100%;
    :deep(.el-table__inner-wrapper::before) {
      width: 0;
    }
    :deep(.el-table) {
      border-radius: 10px;
      border: 1px solid var(---N3, #eff0f0);
      thead th {
        background-color: var(---N1, #f7f7f7);
        color: #1f1f1f;
        font-family: 'PingFang SC Medium';
        font-weight: 400;
        font-size: 12px;
      }
    }
    :deep(.row-title) {
      background-color: var(---N1, #f7f7f7);
      color: #1f1f1f;
      font-family: 'PingFang SC Medium';
      font-weight: 600;
    }
    :deep(.row-title:nth-child(1)) {
      border-bottom: none;
    }
    // :deep(.el-table) {
    //   .el-table__body-wrapper {
    //     max-height: calc(456px - 40px);
    //     overflow: auto;
    //     scrollbar-width: none;
    //   }
    // }
  }
</style>
