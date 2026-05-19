<template>
  <KeenList
    @refresh="runQuery"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="供应链SKU/供应链SKU名称"
        clearable
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <el-tabs v-model="curTab">
      <el-tab-pane label="最新采购单价" name="new">
        <NewTable ref="newTableRef" :search="search" />
      </el-tab-pane>
      <el-tab-pane label="每月采购单价" name="month">
        <MonthTable ref="monthTableRef" :search="search" />
      </el-tab-pane>
    </el-tabs>
  </KeenList>
</template>

<script setup lang="ts" name="purchasePrice">
  import NewTable from '@/views/goodscenter/purchasePrice/components/newTable.vue';
  import MonthTable from '@/views/goodscenter/purchasePrice/components/monthTable.vue';

  const curTab = ref('new');
  const newTableRef = ref();
  const monthTableRef = ref();

  const search = ref({
    keyword: undefined,
  });

  const runQuery = () => {
    switch (curTab.value) {
      case 'new':
        newTableRef.value.runQuery();
        break;
      case 'month':
        monthTableRef.value.runQuery();
        break;
      default:
        break;
    }
  };

  const resetSearch = () => {
    search.value.keyword = undefined;
  };
</script>

<style scoped lang="scss"></style>
