<template>
  <KeenList>
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
    <template #filters></template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <!--      <ExportBtn :service="exportService" :params="search">导出</ExportBtn>-->
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
  import NewTable from '@/views/lute-os/goodscenter/purchasePrice/components/newTable.vue';
  import MonthTable from '@/views/lute-os/goodscenter/purchasePrice/components/monthTable.vue';

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

  // 表格操作
  const handleActions = async (item) => {
    const { key } = item;
  };
</script>

<style scoped lang="scss"></style>
