<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="供应商名称/供应商代码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button
        :loading="!!store.taskMap.supplierSync"
        class="button"
        @click="handleRefresh"
        type="primary"
        v-permission="'supplierRefresh'"
      >
        {{ !!store?.taskMap.supplierSync ? '刷新中' : '手动刷新' }}
      </el-button>
    </template>
    <vxe-table border="inner" :data="listData?.recordList" v-loading="listLoading">
      <vxe-column field="code" title="供应商代码" />
      <vxe-column field="name" title="供应商名称" />
      <vxe-column title="采购未交数量">
        <template #default="{ row }">
          <span class="text-primary cursor-pointer" @click="toWaitPick(row)">
            {{ row.purchaseWaitPickQty }}
          </span>
        </template>
      </vxe-column>
      <vxe-column field="purchaserName" title="采购员" />
      <vxe-column field="status" title="供应商状态">
        <template #default="{ row }">
          <Tag :color="row.status === 0 ? 'green' : 'red'">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column field="loginStatus" title="登录状态">
        <template #default="{ row }">
          <Tag :color="row.loginStatus === 1 ? 'green' : 'red'">{{ row.loginStatusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '登录信息',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: row.loginStatus === 0 ? '启用' : '禁用',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '供应商产品',
                key: 'link',
                type: 'primary',
                hide: !isSuperAdmin,
                text: true,
                row: row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </vxe-column>
    </vxe-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <LoginInfoDialog v-if="visible" :visible="visible" :loginInfo="loginInfo" @close="handleClose" />
</template>

<script setup lang="ts" name="supplierManage">
  import { ElMessage } from 'element-plus';
  import LoginInfoDialog from '@/views/supplyChainManage/efficiencyTools/supplierManage/components/loginInfoDialog.vue';
  import useList from '@/hooks/list/useList';
  import { SupplierApi, supplierApi, memberApi, platformApi } from '@/api';
  import { SupplierListItem } from '@/api/supplier/data-contracts';
  import * as swal from '@/utils/swal';
  import useTask from '@/store/modules/task';
  import { stopSupplierRefresh, supplierRefresh } from '@/worker/controls/notice';
  import { useStore } from '@/store/modules/useStore';

  const store = useTask();
  const user = useStore();
  const { isSuperAdmin } = useStore();

  const handleRefresh = async () => {
    await erpApi.luteosErpPlatformRefresh({
      modelCode: 'SUPPLIER_INIT',
      forceRefresh: true,
    });
    store.taskMap.supplierSync = true;
    supplierRefresh(user.token as string);
  };

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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    SupplierApi.LuteosSupplierQueryList.RequestQuery,
    SupplierApi.LuteosSupplierQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      status: '',
    },
    pageSize: PAGE_SIZE,
    service: supplierApi.luteosSupplierQueryList,
  });

  const visible = ref<boolean>(false);
  const loginInfo = ref<SupplierListItem>({});
  const showLoginInfo = (row) => {
    loginInfo.value = row;
    visible.value = true;
  };

  const changeAccountStatus = async (row) => {
    const isConfirmed = await swal.confirm(`确定要${row.loginStatus === 0 ? '启用' : '禁用'}吗？`);
    if (!isConfirmed) return;
    await memberApi.luteosMemberChangeAccountStatus({
      accountCode: row.accountCode,
      loginStatus: 1 - row.loginStatus,
    });
    ElMessage.success();
    refreshList();
  };
  const router = useRouter();
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      showLoginInfo(row);
    }
    if (key === 'edit') changeAccountStatus(row);
    if (key === 'link') {
      router.push(`/supplyrelation?code=${row.code}`);
    }
  };

  const handleClose = () => {
    visible.value = false;
  };

  const toWaitPick = (row) => {
    router.push(`/supplierManage/waitPick?code=${row.code}&name=${row.name}`);
  };

  onMounted(() => {
    supplierRefresh(user.token as string);
  });

  onBeforeUnmount(() => {
    stopSupplierRefresh();
  });
</script>

<style scoped lang="scss"></style>
