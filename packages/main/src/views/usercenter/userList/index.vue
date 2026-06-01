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
    <template #filters>
      <el-select v-model="search.source" placeholder="员工类型" clearable filterable>
        <el-option
          v-for="item in accountSource"
          :label="item?.desc"
          :value="item?.value"
          :key="item?.value"
        />
      </el-select>
      <el-select
        v-model="search.roleCodeList"
        placeholder="角色"
        clearable
        multiple
        filterable
        :options="roleList"
        :props="{ label: 'roleName', value: 'roleCode' }"
      />
      <el-tree-select
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
    </template>
    <template #buttons>
      <el-button type="primary" @click="addUser">新增用户</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <!--      <el-table-column type="selection" width="40" reserve-selection />-->
      <el-table-column label="用户名" prop="name" min-width="120" fixed="left">
        <template #default="{ row }">
          <div class="d-flex gap-2">
            <span>{{ row?.name }}</span>
            <Tag color="blue" v-if="row?.isMaster">主账号</Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phone" min-width="140" />
      <el-table-column
        label="企业邮箱"
        :formatter="
          (row) => {
            return row?.email || '-';
          }
        "
        prop="email"
        min-width="180"
      />
      <el-table-column label="部门" min-width="140">
        <template #default="{ row }">
          {{ row?.deptList?.map((item) => item.desc).join('、') }}
        </template>
      </el-table-column>
      <el-table-column label="员工类型" prop="sourceDesc" min-width="140">
        <template #default="{ row }">
          <el-tag v-if="row.sourceDesc" :type="getSourceTagType(row.sourceDesc)">
            {{ row.sourceDesc }}
          </el-tag>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" prop="position" min-width="140" />
      <el-table-column label="上次登录时间" prop="lastLogin" min-width="140" />
      <el-table-column label="在职状态">
        <template #default="{ row }">
          <Tag v-if="row.jobStatusDesc" :color="row.jobStatus === 0 ? 'green' : 'red'">
            {{ row?.jobStatusDesc }}
          </Tag>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="系统状态">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            :disabled="!!row.isMaster"
            @change="changeStatus(row?.accountCode, row.status)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: 'setPermission',
                row,
              },
              {
                label: '复制权限',
                key: 'copy',
                type: 'primary',
                permissionCode: 'copyPermission',
                row,
              },
              {
                label: '查看权限',
                key: 'check',
                type: 'primary',
                permissionCode: 'checkPermission',
                row,
              },
              {
                label: '复制授权链接',
                key: 'authLink',
                type: 'primary',
                permissionCode: 'cozyAuthLink',
                row,
                hide: row.source !== 3,
              },
              {
                label: '转移主账号',
                key: 'transfer',
                type: 'primary',
                permissionCode: 'transferAdmin',
                row,
                hide: !row.isMaster,
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
  <EditDialog ref="editDialogRef" @success="refreshList" />
  <TransferDialog ref="transferDialogRef" @success="refreshList" />
  <CopyDialog ref="copyDialogRef" @success="refreshList" />
  <PermissionDialog ref="permissionDialogRef" />
  <CopyAuthDialog ref="copyAuthDialogRef" />
</template>

<script setup lang="ts" name="userList">
  import useList from '@/hooks/list/useList';
  import { MemberApi, memberApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import EditDialog from '@/views/usercenter/userList/components/editDialog.vue';
  import TransferDialog from '@/views/usercenter/userList/components/transferDialog.vue';
  import CopyDialog from '@/views/usercenter/userList/components/copyDialog.vue';
  import PermissionDialog from '@/views/usercenter/userList/components/permissionDialog.vue';
  import CopyAuthDialog from '@/views/usercenter/userList/components/copyAuthDialog.vue';
  import { fetchAccountSourceDict } from './api';

  const PAGE_SIZE = 10;
  const router = useRouter();
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
      source: undefined,
      keyword: undefined,
      deptIdList: undefined,
      roleCodeList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: memberApi.luteosMemberQueryAccountMemberList,
  });

  const roleList = ref([]);
  const loading = ref(false);
  const getRoleList = async () => {
    loading.value = true;
    const res: any = await platformApi.platformRoleQueryRoleList();
    loading.value = false;
    roleList.value = res.roleList;
  };
  getRoleList();

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
    return deptTreeData.value?.map((item) => mapNode(item));
  });

  const editDialogRef = ref();
  const transferDialogRef = ref();
  const copyDialogRef = ref();
  const permissionDialogRef = ref();
  const copyAuthDialogRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      router.push({
        name: 'userListEdit',
        query: { accountCode: row?.accountCode, mode: 'edit' },
      });
    } else if (key === 'transfer') {
      transferDialogRef.value?.open(row);
    } else if (key === 'copy') {
      copyDialogRef.value?.open(row?.roleList?.map((role) => role.value));
    } else if (key === 'check') {
      permissionDialogRef.value?.open(row?.accountCode);
    } else if (key === 'authLink') {
      copyAuthDialogRef.value?.open(row?.accountCode);
    }
  };

  const changeStatus = async (accountCode, status) => {
    await memberApi.luteosMemberChangeAccountStatus({
      accountCode,
      loginStatus: status ? 1 : 0,
    });
    ElMessage.success(status ? '启用成功' : '禁用成功');
  };
  const addUser = () => {
    router.push({ name: 'userListAdd' });
  };
  const accountSource = ref([]);
  const sourceTagTypeMap = {
    员工: 'success',
    海外客服: 'warning',
    外部员工: 'warning',
    审计顾问: 'danger',
    经销商: 'info',
    供应商: 'info',
    'Open-Api对接客户': 'info',
    SRM: 'info',
  };
  const getSourceTagType = (sourceDesc) => sourceTagTypeMap[sourceDesc] ?? 'info';
  const initDict = async () => {
    const res = await fetchAccountSourceDict();
    accountSource.value = res?.dictMap?.account_source || [];
  };
  initDict();
</script>

<style scoped lang="scss"></style>
