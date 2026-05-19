<template>
  <el-drawer v-model="isShow" direction="rtl" size="1200" close-on-click-modal>
    <template #header>
      <h4>公式依赖树</h4>
    </template>
    <template #default>
      <el-row class="mb-4" style="align-items: center; gap: 10px;">
        <span>显示实时值的 excel 行号：</span>
        <el-input-number v-model="lineNo" />
        <span>js公式</span>
        <el-switch v-model="formulaType" :active-value="1" :inactive-value="0" />
        <span>依赖项</span>
        <el-switch v-model="isShowDeps" :active-value="1" :inactive-value="0" />
      </el-row>
      <el-tree :key="tick" :load="loadNode" lazy :indent="48">
        <template #default="{ node, data }">
          <div style="padding: 4px 0">
            <div>
              <el-tag type="primary" size="small">{{ data.column.cellTag }}</el-tag>
              {{ data.column.cellCnName }}
              【 {{ String(realValueMap[data.column.cellFieldName]) }} 】
              <el-tag
                v-if="data.column.cellFieldFormula"
                size="small"
                type="info"
                effect="plain"
                class="tag-formula"
                @click.stop
              >
                {{
                  formulaType === 1
                    ? data.column.cellFieldFormula_formulaText
                    : data.column.cellFieldFormula
                }}
              </el-tag>
            </div>
            <div v-if="isShowDeps && data.column?.cellFieldFormula_allDepsColumns?.length">
              {{ data.column.cellFieldFormula_allDepsColumns.map((x) => x.cellTag).join(', ') }}
            </div>
          </div>
        </template>
      </el-tree>
    </template>
    <template #footer>
      <el-button @click="isShow = false">关闭</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import 'vxe-table/lib/style.css';
  import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';

  const isShow = ref(false);
  const budgetStoreCode = ref('');
  const column = ref(null);
  const tick = ref(0);
  const formulaType = ref(0);
  const isShowDeps = ref(0);

  const showDrawer = (code, _column) => {
    isShow.value = true;
    budgetStoreCode.value = code;
    column.value = _column;
    tick.value++;
    // console.log('_column=', _column);
  };

  const closeDrawer = () => {
    isShow.value = false;
  };

  let id = 2;
  const loadNode = (node, resolve) => {
    // console.log('node=', node, resolve);
    const currentColumn = node.data.column;
    if (node.level === 0) {
      resolve([
        {
          id: id++,
          label: column.value.cellTag,
          isLeaf: !(column.value.cellFieldFormula_depColumns?.length > 0),
          column: column.value,
        },
      ]);
    } else if (currentColumn) {
      resolve(
        currentColumn.cellFieldFormula_depColumns?.map?.((x) => {
          return {
            id: id++,
            label: x.cellTag,
            isLeaf: !(x.cellFieldFormula_depColumns?.length > 0),
            column: x,
          };
        }) || []
      );
    } else {
      resolve([]);
    }
  };

  const lineNo = ref(1);
  const realValueMap = computed(() => {
    if (!isShow.value) {
      return {};
    }
    return (
      (useBudgetStore(budgetStoreCode.value)?.getHotInstance?.()?.getDataMap?.() || [])[
        lineNo.value - 1
      ] || {}
    );
  });

  defineExpose({
    showDrawer,
  });
</script>

<style scoped lang="scss">
  :deep(.el-drawer__header) {
    margin-bottom: 0;
  }
  .tag-formula {
    letter-spacing: 2px;
  }
  :deep(.el-tree-node__content) {
    height: auto !important;
  }
</style>
