<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.tagName" placeholder="标签名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button type="primary" @click="showEditTag">新增标签</el-button>
    </template>
    <el-table :data="listData?.tagList" v-loading="listLoading">
      <el-table-column type="selection" width="40" />
      <el-table-column label="标签名称" prop="tagDesc" />
      <el-table-column label="关联报表" prop="unionMappingReportDesc" />
      <el-table-column label="排序" prop="sort" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '删除',
                key: 'del',
                type: 'primary',
                text: true,
                row: row,
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

  <AddTag
    v-if="tagVisible"
    :title="addTagTitle"
    :info="tagInfo"
    :visible="tagVisible"
    @close="handleTagClose"
  />
</template>

<script setup lang="ts" name="datamarketTag">
  import useList from '@/hooks/list/useList';
  import { datamarketApi, DatamarketApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import AddTag from './components/editTag.vue';

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
    runQuery,
    refreshList,
    resetSearch,
  } = useList<
    DatamarketApi.LuteosDatamarketTagQueryReportLabelList.RequestBody,
    DatamarketApi.LuteosDatamarketTagQueryReportLabelList.ResponseBody
  >({
    searchDefaults: {
      tagName: undefined,
      module: 'data_market',
    },
    pageSize: PAGE_SIZE,
    service: datamarketApi.luteosDatamarketTagQueryReportLabelList,
  });

  const tagVisible = ref<boolean>(false);
  const handleTagClose = (reload = false) => {
    if (reload) {
      runQuery();
    }
    tagVisible.value = false;
    tagInfo.value = {};
  };

  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'view':
        showDetail(row);
        break;
      case 'del':
        cancelOrder(row.tagCode);
        break;
      default:
        break;
    }
  };
  const addTagTitle = ref('');
  const showEditTag = () => {
    tagVisible.value = true;
    addTagTitle.value = '新增标签';
    tagInfo.value = {};
  };

  const tagInfo = ref({});
  const showDetail = (row) => {
    tagInfo.value.tagName = row.tagDesc;
    tagInfo.value.sort = row.sort;
    tagInfo.value.tagCode = row.tagCode;
    tagInfo.value.reportCodeList = [];
    if (row.mappingReportList && row.mappingReportList.length) {
      tagInfo.value.reportCodeList = row.mappingReportList.map((item) => item.mappingReportCode);
    }
    addTagTitle.value = '编辑标签';
    tagVisible.value = true;
  };

  const cancelOrder = async (tagCode) => {
    const res = await swal.delConfirm();
    if (res) {
      await datamarketApi.luteosDatamarketTagDeleteTag({
        tagCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
</script>

<style scoped lang="scss"></style>
