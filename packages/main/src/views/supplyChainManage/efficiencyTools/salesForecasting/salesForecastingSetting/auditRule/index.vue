<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters>
      <el-select clearable v-model="search.status" placeholder="请选择状态">
        <el-option label="启用" :value="0" />
        <el-option label="禁用" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">新增审核流</el-button>
    </template>
    <vxe-table
      border="inner"
      max-height="900px"
      v-loading="listLoading"
      :data="listData?.recordList"
    >
      <vxe-column field="name" title="审核规则名称" />
      <vxe-column field="priority" title="优先级" />
      <vxe-column field="nodeNums" title="审核节点" />
      <vxe-column field="creatorDesc" title="创建人" />
      <vxe-column field="updateTime" title="更新时间" />
      <vxe-column field="status" title="状态">
        <template #default="{ row }">
          <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '禁用',
                key: 'close',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.status),
                row: row,
              },
              {
                label: '启用',
                key: 'open',
                type: 'primary',
                text: true,
                hide: ![1].includes(+row.status),
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
</template>

<script lang="ts" setup name="auditRule">
  import { erpApi, ErpApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';

  const activeTab = ref(1);
  const tabStatusList = [{ status: 1, statusName: '审核流设置' }];
  const importUpdateDialogRef = ref();
  const store = useStore();
  const colorMap = {
    0: 'green',
    1: 'red',
  };
  const router = useRouter();
  const route = useRoute();
  const { code } = route.query as {
    code?: string;
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
    ErpApi.LuteosErpBaseFlowQueryList.RequestBody,
    ErpApi.LuteosErpBaseFlowQueryList.ResponseBody
  >({
    searchDefaults: {
      type: 3,
      status: 0,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpBaseFlowQueryList,
  });

  const add = () => {
    router.push({
      path: '/salesForecastingSetting/auditRule/add',
      query: {
        type: 3,
      },
    });
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      router.push({
        path: '/salesForecastingSetting/auditRule/detail',
        query: { code: row.code },
      });
    } else if (key === 'edit') {
      router.push({
        path: '/salesForecastingSetting/auditRule/edit',
        query: { code: row.code },
      });
    } else if (key === 'close' || key === 'open') {
      changeStatus(row);
    }
  };
  const changeStatus = async (row) => {
    const res = await swal.confirm({
      title: `确认${row.status === 0 ? '禁用' : '启用'}？`,
    });
    if (res) {
      await erpApi.luteosErpBaseFlowChangeStatus({
        code: row.code,
        status: row.status === 0 ? 1 : 0,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
</script>

<style scoped lang="scss"></style>
