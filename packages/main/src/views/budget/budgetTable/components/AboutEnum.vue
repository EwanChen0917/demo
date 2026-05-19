<template>
  <el-drawer v-model="isShow" direction="rtl" size="900" close-on-click-modal>
    <template #header>
      <h4>关联枚举</h4>
    </template>
    <template #default>
      <el-collapse expand-icon-position="left" @change="(names) => (openNames = names)">
        <el-collapse-item
          v-for="(item, index) in sourceCode"
          :accordion="true"
          :key="index"
          :title="item.name"
          :name="index"
        >
          <el-row style="display: flex;gap:10px;margin-bottom: 10px;">
            <el-input v-model="item.searchText" style="width:150px;"/>
            <el-button type="primary" @click="onSearch(index, item.searchText)">搜索/下一个</el-button>
          </el-row>

          <CodeEditor
            v-if="openNames.includes(index)"
            :content="item.content"
            :ref="(el) => onSetRef(index, el)"
          />
        </el-collapse-item>
      </el-collapse>
    </template>
    <template #footer>
      <el-button @click="isShow = false">关闭</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import 'vxe-table/lib/style.css';
  import CodeEditor from '@/views/finance/pushMonitor/components/CodeViwer.vue';
  import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';

  const isShow = ref(false);
  const budgetStoreCode = ref('');
  const column = ref(null);

  const sourceCode = ref([]);
  const openNames = ref([]);

  watch(
    () => isShow.value,
    () => {
      if (!isShow.value) {
        sourceCode.value = [];
      }
    }
  );

  const showDrawer = (code, _column) => {
    isShow.value = true;
    budgetStoreCode.value = code;
    column.value = _column;
    sourceCode.value = [];
    let enumIds = [];

    if (_column.cellDropDownEnum) {
      enumIds.push(_column.cellDropDownEnum);
    }

    Object.keys(_column).forEach((key) => {
      const value = _column[key];
      // 正则匹配 enums\?\.\[(?<enumId>.*?)\]
      const regex = /enums\?\.\[(?<enumId>.*?)\]/g;
      // 可能匹配到多个
      let match;
      while ((match = regex.exec(value))) {
        const { enumId } = match.groups;
        if (!enumIds.includes(enumId)) {
          enumIds.push(enumId);
        }
      }
    });
    enumIds = [...new Set(enumIds)];
    if (enumIds.length) {
      const budgetStore = useBudgetStore(budgetStoreCode.value);
      const map = budgetStore.tableData.columnEnumsDetailMap;
      sourceCode.value = enumIds.map((x) => {
        return {
          name: x,
          content: JSON.stringify(map[x], null, 2),
        };
      });
    }
  };

  const closeDrawer = () => {
    isShow.value = false;
  };

  const elMap = {};
  const onSetRef = (index, el) => {
    elMap[index] = el;
    const editor = el?.editorRef?.getAceInstance?.();
    console.log('editor=', editor);
    if (editor) {
      editor.commands.exec('foldToLevel1', editor);
    }
  };

  const onSearch = (index, text) => {
    const editor = elMap[index]?.editorRef?.getAceInstance?.();
    if (editor) {
      editor.find(text);
    }
  };

  defineExpose({
    showDrawer,
  });
</script>

<style scoped lang="scss">
  :deep(.el-drawer__header) {
    margin-bottom: 0;
  }
</style>
