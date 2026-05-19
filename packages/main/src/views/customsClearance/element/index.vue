<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model.trim="search.keyword" placeholder="海关编码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button type="primary" @click="add" v-permission="'customsClearanceElementAdd'">
        新增
      </el-button>
      <el-button
        type="primary"
        @click="importDialogRef?.open()"
        v-permission="'customsClearanceElementImport'"
      >
        导入
      </el-button>
    </template>
    <el-table
      v-loading="listLoading"
      :data="listData?.resultList"
      ref="xTable"
      max-height="65vh"
      row-key="productSku"
    >
      <el-table-column label="海关编码" prop="declarationCode" />
      <el-table-column label="要素名称" prop="declarationElement" />
      <el-table-column label="创建人" prop="creatorName" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="修改人" prop="updatorName" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
                permissionCode: 'customsClearanceElementEdit',
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
    <!-- 导入 -->
    <importDialog ref="importDialogRef" @success="refreshListData" />
    <!-- 新增 -->
    <addDialog
      v-if="addDialogShow"
      :visibility="addDialogShow"
      :id="id"
      @close="addDialogShow = false"
      @success="refreshList"
    />
  </KeenList>
</template>

<script setup lang="ts" name="customsClearanceElement">
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { type ErpApi, erpApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import importDialog from './components/importDialog.vue';
  import addDialog from './components/addDialog.vue';

  const router = useRouter();
  const importDialogRef = ref();
  const addDialogShow = ref(false);
  const id = ref();
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
    refreshList,
    runQuery,
    resetSearch,
  } = useList<
    ErpApi.LuteosErpCustomsQueryElementList.RequestQuery,
    ErpApi.LuteosErpCustomsQueryElementList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: 10,
    service: erpApi.luteosErpCustomsQueryElementList,
  });
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      id.value = row.id;
      addDialogShow.value = true;
    }
  };
  const add = () => {
    id.value = '';
    addDialogShow.value = true;
  };
  // 解决导入数据列表更新慢的问题
  const refreshListData = () => {
    setTimeout(() => {
      refreshList();
    }, 1000);
  };
</script>

<style lang="scss" scoped>
  .import-btn {
    background: #3e97ff !important;
  }
</style>
