<template>
  <el-drawer v-model="isShow" direction="rtl" size="900" close-on-click-modal>
    <template #header>
      <h4>数据校验异常列表</h4>
    </template>
    <template #default>
      <div style="margin-bottom: 10px">
        <el-button type="primary" v-if="!isFixMode" @click="batchProcess">批量处理异常</el-button>
        <el-button type="primary" @click="onBatchUseRecomandValue" v-if="isFixMode">
          全部使用【推荐值】
        </el-button>
      </div>
      <vxe-table :data="list" border="full" stripe highlight-hover-row height="auto">
        <vxe-column type="seq" width="60" title="序号" />
        <vxe-column field="row" title="行号" width="80">
          <template #default="{ row }">
            {{ row.row + 1 }}
          </template>
        </vxe-column>
        <vxe-column field="columnName" title="列名" width="150" />
        <vxe-column field="value" title="值" width="150" />
        <vxe-column
          v-if="isFixMode"
          field="recomandValue"
          title="推荐值"
          class-name="recomandValue"
        >
          <template #default="{ row }">
            {{
              row.recommandValue === null ||
              row.recommandValue === undefined ||
              row.recommandValue === ''
                ? '(清空)'
                : row.recommandValue
            }}
            <el-button v-if="isFixMode" type="primary" @click="onUse(row)">使用</el-button>
          </template>
        </vxe-column>
        <vxe-column field="message" title="错误信息">
          <template #default="{ row }">
            <span style="color: red">
              {{ row.message }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="op" title="操作" width="80">
          <template #default="{ row }">
            <el-button type="primary" plain @click="onTarget(row)">定位</el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </template>
    <template #footer>
      <el-button @click="isShow = false">关闭</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
  import 'vxe-table/lib/style.css';
  import { VxeTable, VxeColumn } from 'vxe-table';
  import { getDefaultValueFromColumn } from '@/views/budget/budgetTable/script/budgetTable';
  import { sleep } from '@/views/budget/budgetTable/util/util';
  import { ValidateMessageItem } from '@/views/budget/budgetTable/types/type';
  import { validateCells } from '@/views/budget/budgetTable/script/budgetValidator';

  const isShow = ref(false);
  const budgetStoreCode = ref('');
  const isFixMode = ref(false);

  const list = computed(() => {
    if (!isShow.value) {
      return [];
    }
    const budgetStore = useBudgetStore(budgetStoreCode.value);
    const arr: ValidateMessageItem[] = budgetStore?.validateMessages;
    if (!arr?.length) {
      return [];
    }
    const instance = budgetStore.getHotInstance();

    const datamap = instance.getDataMap();

    return arr.map((item) => {
      const column = budgetStore.getColumn(item.prop);
      const rowIndex = datamap.findIndex(
        (x) => x.__code && (x.__code === item.__code || x.__code === item.rowCode)
      );

      let recommandValue;
      if (isFixMode.value) {
        const column = budgetStore.getColumn(item.prop);
        const defaultValue = getDefaultValueFromColumn(budgetStore.getHotInstance().simpleFormula, column, rowIndex);
        if (defaultValue === null || defaultValue === undefined) {
          recommandValue = defaultValue;
        } else {
          recommandValue = defaultValue;
        }
      }

      return {
        ...item,
        columnName: column?.cellCnName,
        row: rowIndex,
        recommandValue,
      };
    });
  });

  const showDrawer = (code) => {
    isFixMode.value = false;
    isShow.value = true;
    budgetStoreCode.value = code;
  };
  const closeDrawer = () => {
    isShow.value = false;
  };

  const batchProcess = () => {
    isFixMode.value = true;
  };

  const setValueToTable = async (rows) => {
    const cells = [];
    const budgetStore = useBudgetStore(budgetStoreCode.value);
    rows.forEach((row) => {
      cells.push([row.row, row.prop, row.recommandValue]);
    });
    const instance = budgetStore.getHotInstance();
    if (rows.length > 5) {
      budgetStore.setTableLoading('正在写入推荐值，请稍等');
      await sleep(500);
      instance.setDataAtRowProp(cells);
      await sleep(500);
      budgetStore.setTableLoading('写入成功', false);
      budgetStore.clearTableLoading(1000);
    } else {
      instance.setSourceDataAtCell(cells);
    }

    budgetStore.deleteCellsValidateMessage(rows);

    const needValidateRows = [];

    rows.forEach((row) => {
      if (
        row.recommandValue !== null &&
        row.recommandValue !== undefined &&
        row.recommandValue !== ''
      ) {
        needValidateRows.push({
          rowCode: row.rowCode,
          row: row.row,
          prop: row.prop,
          value: row.recommandValue,
        });
      }
    });
    // console.log('needValidateRows=', needValidateRows);

    if (needValidateRows.length) {
      validateCells(budgetStoreCode.value, needValidateRows);
    }
    // instance.render();
  };

  const onBatchUseRecomandValue = () => {
    setValueToTable(list.value);
  };
  const onUse = (row) => {
    setValueToTable([row]);
  };

  const emit = defineEmits(['view-to']);
  const onTarget = (row) => {
    emit('view-to', row.row, row.prop);
    closeDrawer();
  };

  // 暴露方法给父组件
  defineExpose({
    showDrawer,
  });
</script>

<style scoped lang="scss">
  :deep(.el-drawer__header) {
    margin-bottom: 0;
  }

  :deep(.vxe-table) {
    margin-top: 10px;
  }

  :deep(.recomandValue) {
    background-color: #50cd894f !important;
  }
</style>
