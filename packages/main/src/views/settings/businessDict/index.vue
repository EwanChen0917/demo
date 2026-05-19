<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model.trim="search.code" placeholder="字典编码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model.trim="search.name" placeholder="字典名称" style="margin-left: 10px">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="outline" @click="handleAdd">新增</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.list" highlight-current-row>
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="remark" label="使用场景说明" />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '查看',
                key: 'view',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                text: true,
                row: scope.row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>

  <DictionaryModal ref="dictionaryModalRef" @close-modal="closeModalRedact" />
  <DetailModal ref="detailModalRef" />
</template>

<script lang="ts" setup name="busdict">
  import { type TableInstance } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { type FinanceApi, financeApi } from '@/api/index';
  import DictionaryModal from './Modal/edit.vue';
  import DetailModal from './Modal/detail.vue';

  const PAGE_SIZE = 10;

  const tableRef = ref<TableInstance>();
  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    FinanceApi.LuteosFinanceBusinessDictList.RequestQuery,
    FinanceApi.LuteosFinanceBusinessDictList.ResponseBody
  >({
    searchDefaults: {
      code: undefined,
      name: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeApi.luteosFinanceBusinessDictList,
  });

  const dictionaryModalRef = ref<InstanceType<typeof DictionaryModal>>();
  const detailModalRef = ref<InstanceType<typeof DetailModal>>();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      dictionaryModalRef.value?.open(row, 'edit');
    } else if (key === 'view') {
      // 查看
      dictionaryModalRef.value?.open(row, 'view');
    } else if (key === 'detail') {
      // 查看
      detailModalRef.value?.open(row);
    }
  };

  const handleAdd = () => {
    dictionaryModalRef.value?.open(null, 'add');
  };

  const closeModalRedact = (reload) => {
    if (reload) {
      runQuery();
    }
  };
</script>

<style scoped lang="scss"></style>
