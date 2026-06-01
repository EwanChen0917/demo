<template>
  <el-dialog width="65%" title="转移主账号" v-model="visible" @close="visible = false" align-center>
    <div class="d-flex align-items-center" style="padding: 0 16px">
      <div class="w-100px">当前用户</div>
      <el-input class="w-250px" disabled v-model="form.name" />
    </div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <div class="d-flex align-items-center">
          <div class="w-100px">选择用户</div>
          <el-input v-model="search.keyword" placeholder="用户名/手机号/企业邮箱" clearable>
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
        </div>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="id"
        class-name="table-row-dashed"
        max-height="45vh"
      >
        <el-table-column label="单选" width="55" align="center">
          <template #default="{ row }">
            <el-radio
              v-model="curAccount"
              :label="row?.accountCode"
              :disabled="form?.accountCode === row?.accountCode"
            >
              {{}}
            </el-radio>
          </template>
        </el-table-column>
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
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { MemberApi, memberApi } from '@/api';

  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits(['success']);

  const visible = ref(false);
  const form = ref({});

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
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: memberApi.luteosMemberQueryAccountMemberList,
  });

  const curAccount = ref();

  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      await memberApi.luteosMemberChangeMasterUser({
        accountCode: curAccount.value,
      });
      ElMessage.success('转移成功');
      emits('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    curAccount.value = null;
    form.value.name = row?.name;
    form.value.accountCode = row?.accountCode;
    resetSearch();
    runQuery();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
