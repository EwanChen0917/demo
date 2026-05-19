<template>
  <div class="auth-list">
    <div class="list-tip">应用名称（应用编码）
      ：{{ codeParams.appName }} ({{ codeParams.appCode }})</div>
      <el-button style="margin: 16px 0;" type="primary" @click="addOrEditRef?.open('add')">新增账号</el-button>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="id"
        class-name="table-row-dashed"
      >
        <el-table-column label="账号名称" prop="accountName" />
        <el-table-column label="账号标识" prop="accountId" />
        <el-table-column label="Token过期时间" prop="expiresTime">
          <template #default="{ row }">
            <span :class="{ 'over-due': overdue[row.id] }">
              {{ getInitTime(row.expiresTime, row.id) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="刷新次数" prop="refreshCount" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <Tag v-if="overdue[row.id]" color="red">Token失效</Tag>
            <Tag v-else :color="row.status === 1 ? 'green' : 'red'">
              {{ statusMap[row?.status] }}
            </Tag>
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
                  // permissionCode: 'setPermission',
                  row,
                },
                {
                  label: '删除',
                  key: 'delete',
                  type: 'primary',
                  // permissionCode: 'deletePermission',
                  row,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    <AddOrEditDialog
      ref="addOrEditRef"
      :platformCode="codeParams.platformCode"
      :appCode="codeParams.appCode"
      @success="refreshList"
    />
  </div>
</template>

<script setup lang="ts" name="authAccountList">
  import useList from '@/hooks/list/useList';
  import { PlatformApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useRoute } from 'vue-router';
  import * as swal from '@/utils/swal';
  import AddOrEditDialog from './components/AddOrEditDialog.vue';

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
    PlatformApi.PlatformChannelAccountQueryList.RequestQuery,
    PlatformApi.PlatformChannelAccountQueryList.ResponseBody
  >({
    searchDefaults: {
      appCode: route.query?.appCode,
      platformCode: route.query?.platformCode,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformChannelAccountQueryList,
  });

  const addOrEditRef = ref();

  const statusMap = {
    1: '正常',
    0: '禁用',
  };

  const codeParams = ref<{ platformCode?: string; appCode?: string; appName?: string }>({});
  watch(
    () => route.query,
    (newVal) => {
      codeParams.value = newVal;
    },
    {
      deep: true,
      immediate: true,
    }
  );

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      addOrEditRef.value?.open('edit', row.id);
    } else if (key === 'delete') {
      const isConfirmed = await swal.confirm('确认删除吗？');
      if (!isConfirmed) return;
      try {
        await platformApi.platformChannelAccountDelete({ id: row.id });
        ElMessage.success('删除成功');
        refreshList();
      } finally {
      }
    }
  };

  const overdue = ref({});
  const getInitTime = (time, id) => {
    if (!time) return '-';
    const date = new Date();
    const timeDate = new Date(time);
    // 没过期
    if (date <= timeDate) return time;
    // 过期
    if (date > timeDate) {
      overdue.value[id] = true;
      return `${time}（已过期）`;
    }
  };
</script>

<style scoped lang="scss">
  .over-due {
    color: #dc2626;
  }
  .auth-list {
     padding: 10px 16px;
     height: calc(100vh - 90px);
    .list-tip {
      color: #666;
    }
    :deep(.el-table) {
      height: calc(100% - 82px);
    }
    :deep(.el-dialog) {
      margin-top: 10vh;
      // margin-bottom: 10vh;
      max-width: 650px;
      padding: 0;
      border-radius: 10px;
      .el-dialog__header {
        margin: 0 20px;
        padding: 16px 0;
        border-bottom: 1px solid #ededed;
      }
      .el-dialog__body {
        min-height: 200px;
        max-height: calc(100vh - 320px);
        padding: 20px;
        overflow: auto;
      }
      .el-dialog__footer {
        border-top: 1px solid #ededed;
        padding: 16px 20px;
      }
    }
  }
</style>
