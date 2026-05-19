<template>
  <el-dialog :title="title" v-model="visible" width="80%" @close="handleClose">
    <KeenList
      @refresh="refreshList"
      @reset-search="handleReset"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model.trim="search.code" placeholder="编码">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <el-input v-model.trim="search.name" placeholder="名称" style="margin-left: 10px">
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
        <el-table-column prop="remark" label="描述" />
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
                  label: '删除',
                  key: 'del',
                  type: 'danger',
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
  </el-dialog>
  <DetailEdit :title="title" ref="detailEditRef" @close-modal="closeModalRedact" />
</template>

<script setup lang="ts">
  import { BusinessDictSaveReq } from '@/api/finance/data-contracts';
  import { FinanceApi, financeApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { ElMessage, type TableInstance } from 'element-plus';
  import DetailEdit from './detailEdit.vue';

  const visible = ref(false);
  const title = ref('');

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
    FinanceApi.LuteosFinanceBusinessDictItemList.RequestQuery,
    FinanceApi.LuteosFinanceBusinessDictItemList.ResponseBody
  >({
    searchDefaults: {
      dictId: undefined,
      code: undefined,
      name: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeApi.luteosFinanceBusinessDictItemList,
    serviceManual: true,
  });

  const handleClose = () => {
    visible.value = false;
  };
  const handleReset = () => {
    const { dictId } = search;
    resetSearch();
    search.dictId = dictId;
  };
  const detailEditRef = ref<InstanceType<typeof DetailEdit>>();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'del') {
      const isConfirmed = await swal.confirm('请确认是否要删除该字典详情');
      if (!isConfirmed) return;
      await financeApi.luteosFinanceBusinessDictItemRemove({
        id: row.id,
      });
      ElMessage.success('删除成功');
      runQuery();
    } else if (key === 'edit') {
      detailEditRef.value?.open(row, 'edit');
    } else if (key === 'view') {
      // 查看
      detailEditRef.value?.open(row, 'view');
    }
  };
  const handleAdd = () => {
    detailEditRef.value?.open({ dictId: search.dictId }, 'add');
  };
  const open = (data: BusinessDictSaveReq) => {
    if (!data?.id) {
      ElMessage.error('请选择字典');
      return;
    }
    visible.value = true;
    search.dictId = data.id;
    title.value = data.name;
  };
  const closeModalRedact = (reload) => {
    if (reload) {
      runQuery();
    }
  };
  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
