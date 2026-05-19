<template>
  <el-tabs v-model="activedTab" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList>
    <template #search>
      <!-- <el-input
        style="width: 280px"
        v-model="search.keyword"
        placeholder="客户名称/客户编码/报价单"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input> -->
    </template>
    <template #filters></template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">新增审核流</el-button>
    </template>
    <vxe-table
      border="inner"
      max-height="900px"
      v-loading="listLoading"
      :data="listData?.recordList"
    >
      <vxe-column field="name" title="审核流名称" />
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

<script lang="ts" setup name="demandAuditSetting">
    import { platformApi, PlatformApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';

  const activedTab = ref(1);
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
    PlatformApi.PlatformFlowQueryList.RequestBody,
    PlatformApi.PlatformFlowQueryList.ResponseBody
  >({
    searchDefaults: {
      type: 101,
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformFlowQueryList,
  });

  const add = () => {
    const path = router.resolve({
      name: 'auditSettingAdd',
    });
    router.push(path.href);
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'auditSettingDetail',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'auditSettingEdit',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'close' || key === 'open') {
      changeStatus(row);
    }
  };
  const changeStatus = async (row) => {
    const res = await swal.confirm({
      title: `确认${row.status === 0 ? '关闭' : '开启'}？`,
    });
    if (res) {
      await platformApi.platformFlowChangeStatus({
        code: row.code,
        status: row.status === 0 ? 1 : 0,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
</script>

<style scoped lang="scss">
  :deep(.el-descriptions__content),
  :deep(.el-descriptions__label) {
    color: #7e8299 !important;
    font-weight: normal !important;
  }

  :deep(.el-table-fixed-column--left) {
    background-color: white !important;
  }

  :deep(.el-table-fixed-column--right) {
    background-color: white !important;
  }

  .multi-supplySku {
    background-color: orange;
    color: #fff;
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 2px;
    vertical-align: middle;
    margin-right: 4px;

    & + span {
      vertical-align: middle;
    }
  }
</style>
