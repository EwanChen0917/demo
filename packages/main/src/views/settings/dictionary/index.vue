<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="字典名称/编码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.moduleCode" clearable filterable placeholder="字典模块">
        <el-option
          v-for="item in moduleList"
          :key="item.moduleCode"
          :label="item.moduleName"
          :value="item.moduleCode"
        />
      </el-select>

      <el-select v-model="search.status" clearable filterable placeholder="状态">
        <el-option label="启用" :value="1" />
        <el-option label="未启用" :value="0" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd">新增</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.dictRespList">
      <el-table-column type="selection" min-width="40" align="center" />
      <el-table-column prop="moduleCode" label="模块编码" />
      <el-table-column prop="moduleName" label="模块名称" />
      <el-table-column prop="dictCode" label="字典编码" />
      <el-table-column prop="dictName" label="字典值" />
      <el-table-column prop="statusDesc" label="状态" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '删除',
                key: 'del',
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

  <DictionaryModal
    v-if="dictionaryVisible"
    :visible="dictionaryVisible"
    :info="curRow"
    @close-modal="closeModalRedact"
  />
</template>

<script lang="ts" setup name="dictionary">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { platformApi, PlatformApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import DictionaryModal from './Modal/edit.vue';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    PlatformApi.PlatformDictQueryPage.RequestQuery,
    PlatformApi.PlatformDictQueryPage.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      moduleCode: undefined,
      status: undefined,
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformDictQueryPage,
  });

  const moduleList = ref([]);
  const queryModuleList = () => {
    platformApi.platformDictQueryDictModuleList().then((res: any) => {
      moduleList.value = res.moduleList || [];
    });
  };
  queryModuleList();

  const curRow = ref({});

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;

    if (key === 'del') {
      const isConfirmed = await swal.confirm('请确认是否要删除该字典');
      if (!isConfirmed) return;
      await platformApi.platformDictDelete({
        moduleCode: row.moduleCode,
        dictCode: row.dictCode,
      });
      ElMessage.success('删除成功');
      runQuery();
    } else if (key === 'edit') {
      dictionaryVisible.value = true;
      curRow.value = row;
    }
  };

  const handleAdd = () => {
    dictionaryVisible.value = true;
    curRow.value = {};
  };

  const dictionaryVisible = ref(false);
  const closeModalRedact = (reload) => {
    if (reload) {
      runQuery();
    }
    dictionaryVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
