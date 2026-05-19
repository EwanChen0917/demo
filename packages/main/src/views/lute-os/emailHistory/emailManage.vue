<template>
  <KeenList>
    <template #search>
      <el-input
        style="margin-right: 8px"
        v-model.trim="search.email"
        placeholder="推广邮箱"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <DeptMember
        class="form-item"
        v-model="search.owner"
        placeholder="使用人"
        :searchChildDept="false"
        style="width: 230px"
      />
      <el-tree-select
        ref="catTreeSelectRef"
        placeholder="所属部门"
        v-model="deptIdList"
        :data="deptTree"
        @change="handleDeptChange"
        filterable
        clearable
        multiple
        collapse-tags
        check-strictly
        popper-class="picker-cat-tree-select"
        highlight-current
        style="width: 230px"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.emailAccountList"
      row-key="id"
    >
      <el-table-column label="推广邮箱" prop="email" min-width="200">
        <template #default="{ row }">
          {{ row.email }}
          <Copy :content="row?.email" />
        </template>
      </el-table-column>
      <el-table-column label="邮箱组" prop="emailGroupName" />
      <el-table-column label="使用人" prop="ownerName" />
      <el-table-column label="所属部门" prop="deptName" />
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
                row,
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
  <EditEmailDialog
    v-if="editEmailVisible"
    :visible="editEmailVisible"
    :emailInfo="curEmailInfo"
    @close="handleClose"
  />
</template>

<script setup lang="ts" name="emailManage">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { MetaApi, metaApi, memberApi } from '@/api';
  import EditEmailDialog from '@/views/lute-os/emailHistory/components/editEmailDialog.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const PAGE_SIZE = 10;

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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    MetaApi.LuteosMetaEmailAccountQueryEmailList.RequestBody,
    MetaApi.LuteosMetaEmailAccountQueryEmailList.ResponseBody
  >({
    searchDefaults: {
      email: undefined,
      owner: undefined,
      deptIdList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaEmailAccountQueryEmailList,
  });

  const editEmailVisible = ref(false);
  const curEmailInfo = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      curEmailInfo.value = row;
      editEmailVisible.value = true;
    }
  };

  const handleClose = () => {
    editEmailVisible.value = false;
    refreshList();
  };
  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    console.log('deptTree', deptTree.value);
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  const deptIdList = ref([]);
  const handleDeptChange = (val) => {
    search.deptIdList = val.join(',');
  };
  const reset = () => {
    resetSearch();
    deptIdList.value = [];
  };
</script>

<style scoped lang="scss"></style>
