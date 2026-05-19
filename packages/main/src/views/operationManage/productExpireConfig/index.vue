<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.title" placeholder="审批名称/审批ID">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters></template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.configList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column prop="configType" label="商品层级" min-width="220px" />
      <el-table-column prop="goodsSn" label="商品类别/SPU/SKU" min-width="220px" />
      <el-table-column
        prop="durationDays"
        :formatter="(row) => `${row.durationDays}天`"
        label="提醒周期"
        min-width="140px"
      />
      <el-table-column
        prop="remindDays"
        label="持续时间"
        :formatter="(row) => `${row.remindDays}天`"
        min-width="140px"
      />
      <el-table-column prop="statusDesc" label="状态" min-width="140px">
        <template #default="{ row }">
          <Tag :color="stateColor[row.status]">{{ row.status ? '已启用' : '已禁用' }}</Tag>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作" width="80px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                recordCode: row.recordCode,
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
  <DetailDialog ref="detailDialogRef" @success="runQuery" />
</template>

<script lang="ts" setup name="productExpireConfig">
  import { productApi, ProductApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import DetailDialog from './components/detailDialog.vue';

  const PAGE_SIZE = 10;
  const {
    search,
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
    resetSearch,
    refreshList,
    runQuery,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductExpireConfigList.RequestQuery,
    ProductApi.LuteosProductExpireConfigList.ResponseBody
  >({
    searchDefaults: {
      title: '',
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductExpireConfigList,
  });
  const stateColor = ref({
    1: 'green',
    0: 'gray',
  });
  const handleActions = (item) => {
    const { key, recordCode } = item;
    if (key === 'edit') {
      edit(recordCode);
    }
  };
  // onMounted(() => {
  //   getDataList();
  // });
  const detailDialogRef = ref();
  const add = () => {
    detailDialogRef.value.open();
  };
  const edit = (recordCode) => {
    detailDialogRef.value.open(recordCode);
  };
</script>

<style scoped lang="scss">
  .status-tag {
    border: none;
    height: 28px;
  }
</style>
