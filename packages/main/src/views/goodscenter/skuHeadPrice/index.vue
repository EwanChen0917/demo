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
      <el-tab-pane label="最新头程单价" name="new">
        <NewTable ref="newTableRef" :search="search" />
      </el-tab-pane>
      <el-tab-pane label="每月头程单价" name="month">
        <MonthTable ref="monthTableRef" :search="search" />
      </el-tab-pane>
    </el-tabs>
  </KeenList>
</template>

<script setup lang="ts" name="skuHeadPrice">
  import NewTable from '@/views/goodscenter/skuHeadPrice/components/newTable.vue';
  import MonthTable from '@/views/goodscenter/skuHeadPrice/components/monthTable.vue';

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
    switch (curTab.value) {
      case 'new':
        newTableRef.value.resetSearch();
        break;
      case 'month':
        monthTableRef.value.resetSearch();
        break;
      default:
        break;
    }
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key } = item;
  };
</script>

<style scoped lang="scss"></style>
