<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="用户名/手机号/企业邮箱" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button
        type="primary"
        @click="addDialogRef?.open(route?.query?.roleCode)"
        v-permission="'addRoleUser'"
      >
        添加用户
      </el-button>
      <el-button
        type="primary"
        @click="batchDelete"
        :disabled="!selectedRows?.length || route?.query?.roleCode === 'R00000000'"
        v-permission="'deleteRoleUser'"
      >
        移除用户
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="40"
        reserve-selection
        :selectable="
          (row) =>
            !(row?.isMaster && route?.query?.roleCode === 'R00000001') &&
            route?.query?.roleCode !== 'R00000000'
        "
      />
      <el-table-column label="用户名" prop="name" min-width="120" fixed="left">
        <template #default="{ row }">
          <div class="d-flex gap-2">
            <span>{{ row?.name }}</span>
            <Tag color="blue" v-if="row?.isMaster">主账号</Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="部门" min-width="140">
        <template #default="{ row }">
          {{ row?.deptList?.map((item) => item.desc).join('、') }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phone" min-width="140" />
      <el-table-column label="企业邮箱" prop="email" min-width="180" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '移除用户',
                key: 'delete',
                type: 'danger',
                permissionCode: 'deleteRoleUser',
                row,
                disabled:
                  (row.isMaster && route?.query?.roleCode === 'R00000001') ||
                  route?.query?.roleCode === 'R00000000',
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
  <AddDialog ref="addDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="roleUser">
  import useList from '@/hooks/list/useList';
  import { MemberApi, memberApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import AddDialog from '@/views/usercenter/role/components/addDialog.vue';

  const route = useRoute();

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
    MemberApi.LuteosMemberQueryAccountMemberList.RequestQuery,
    MemberApi.LuteosMemberQueryAccountMemberList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      deptIdList: undefined,
      roleCodeList: [route?.query?.roleCode],
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

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'delete') {
      const isConfirmed = await swal.confirm('确定移除当前用户？移除后该用户将失去当前角色权限');
      if (!isConfirmed) return;
      await memberApi.luteosMemberChangeRoleUser({
        roleCode: route.query.roleCode as string,
        deleteUserAccountCodeList: [row?.accountCode],
        addUserAccountCodeList: [],
      });
      ElMessage.success('移除成功');
      refreshList();
    }
  };

  const batchDelete = async () => {
    const isConfirmed = await swal.confirm('确定移除勾选用户？移除后用户将失去当前角色权限');
    if (!isConfirmed) return;
    await memberApi.luteosMemberChangeRoleUser({
      roleCode: route.query.roleCode as string,
      deleteUserAccountCodeList: selectedRows.value?.map((item) => item.accountCode),
      addUserAccountCodeList: [],
    });
    ElMessage.success('移除成功');
    refreshList();
  };

  const addDialogRef = ref();
</script>

<style scoped lang="scss"></style>
