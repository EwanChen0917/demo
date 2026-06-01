<template>
  <el-dialog
    width="65%"
    title="添加用户"
    v-model="visible"
    @close="visible = false"
    align-center
    append-to-body
  >
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <div class="d-flex align-items-center">
          <el-input v-model="search.keyword" placeholder="用户名/手机号/企业邮箱" clearable>
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <el-tree-select
            style="margin-left: 16px; width: 180px"
            ref="catTreeSelectRef"
            placeholder="部门"
            v-model="search.deptIdList"
            :data="deptTree"
            filterable
            clearable
            multiple
            check-strictly
            popper-class="picker-cat-tree-select"
            highlight-current
          />
        </div>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="id"
        class-name="table-row-dashed"
        max-height="45vh"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column label="用户名" prop="name" min-width="120">
          <template #default="{ row }">
            <div class="d-flex gap-2">
              <span>{{ row?.name }}</span>
              <Tag color="blue" v-if="row?.isMaster">主账号</Tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone" min-width="140" />
        <el-table-column label="企业邮箱" prop="email" min-width="180" />
        <el-table-column label="部门" min-width="140">
          <template #default="{ row }">
            {{ row?.deptList?.map((item) => item.desc).join('、') }}
          </template>
        </el-table-column>
        <el-table-column label="角色" min-width="140">
          <template #default="{ row }">
            {{ row?.roleList?.map((item) => item.desc).join('、') }}
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

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { memberApi, MemberApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits(['success']);
  const visible = ref(false);

  const PAGE_SIZE = 10;
  const curRoleCode = ref('');

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
    MemberApi.LuteosMemberQueryAccountMemberList.RequestQuery,
    MemberApi.LuteosMemberQueryAccountMemberList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      deptIdList: undefined,
      notRoleCodeList: undefined,
      jobStatus: 0,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: memberApi.luteosMemberQueryAccountMemberList,
  });

  const selectedRows = ref([]);
  const handleSelectionChange = (val) => {
    selectedRows.value = val;
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });

  const tableRef = ref(null);
  const open = (roleCode) => {
    console.log('roleCode', roleCode);
    curRoleCode.value = roleCode;
    resetSearch();
    search.notRoleCodeList = [roleCode];
    visible.value = true;
    queryDeptTree();
    tableRef.value?.clearSelection();
  };

  const saveLoading = ref(false);
  const save = async () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择用户');
      return;
    }
    try {
      saveLoading.value = true;
      await memberApi.luteosMemberChangeRoleUser({
        roleCode: curRoleCode.value,
        addUserAccountCodeList: selectedRows.value?.map((item) => item.accountCode),
        deleteUserAccountCodeList: [],
      });
      ElMessage.success('添加成功');
      emits('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
