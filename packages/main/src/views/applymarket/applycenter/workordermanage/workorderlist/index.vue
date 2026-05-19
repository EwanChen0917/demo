<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="工单名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input
        style="width: 140px"
        v-model="search.creator"
        placeholder="申请人"
        v-if="!isSelf"
        suffix-icon="el-icon-date"
      />
      <el-input
        style="width: 140px"
        v-model="search.operator"
        placeholder="处理人"
        v-if="!isSelf"
        suffix-icon="el-icon-date"
      />
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option
          v-for="item in STATUS_LIST"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </template>

    <el-table v-loading="listLoading" :data="listData?.workflowRecordList" row-key="workflowCode">
      <!-- <el-table-column type="selection" width="40" /> -->
      <el-table-column class-name="fw-bold" prop="workflowCode" label="工单ID" />
      <el-table-column prop="workflowSubject" label="工单名称" min-width="150" />
      <el-table-column prop="workflowTypeDesc" label="工单类型" />
      <el-table-column prop="creatorName" label="申请人" />
      <el-table-column prop="createTime" label="申请时间" min-width="100" />
      <el-table-column label="处理人">
        <template #default="{ row }">
          <div v-for="(item, index) in row?.operatorList" :key="index">
            {{ item }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operationTime" label="处理时间" min-width="100" />
      <!-- <el-table-column prop="statusDesc" label="状态" /> -->
      <el-table-column label="状态">
        <template #default="scope">
          <span
            v-if="scope.row.status === 11 || scope.row.status === 21"
            class="badge badge-light-success"
          >
            {{ scope.row.statusDesc }}
          </span>
          <span
            v-else-if="scope.row.status === 0 || scope.row.status === 1"
            class="badge badge-light-warning"
          >
            {{ scope.row.statusDesc }}
          </span>
          <span
            v-else-if="
              scope.row.status === -1 || scope.row.status === 12 || scope.row.status === 22
            "
            class="badge badge-light-danger"
          >
            {{ scope.row.statusDesc }}
          </span>
          <span
            v-else-if="scope.row.status === 10 || scope.row.status === 20"
            class="badge badge-light-primary"
          >
            {{ scope.row.statusDesc }}
          </span>
          <span v-else class="badge badge-light-secondary">{{ scope.row.statusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                ...scope.row,
              },
              {
                hide: scope.row.workflowType !== 2 || scope.row.status !== 20 || !isSelf,
                label: '已处理',
                key: 'deal',
                type: 'primary',
                workflowCode: scope.row.workflowCode,
              },
              ...(scope.row.status === 10
                ? [
                    {
                      label: '撤销申请',
                      key: 'withdraw',
                      type: 'primary',
                      text: true,
                      ...scope.row,
                    },
                  ]
                : []),
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
</template>

<script lang="ts" setup name="myworkorder">
  import useList from '@/hooks/list/useList';
  import { platformApi, PlatformApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage } from 'element-plus';

  // 状态 -1-推送失败 0-初始化(未推送) 10-审批中 11-已通过 12-已驳回 13-已撤销 20-待办中 21-已完成 22-已删除
  const STATUS_LIST = [
    {
      label: '初始化',
      value: 0,
    },
    {
      label: '推送失败',
      value: 1,
    },
    {
      label: '审批中',
      value: 10,
    },
    {
      label: '已通过',
      value: 11,
    },
    {
      label: '已驳回',
      value: 12,
    },
    {
      label: '已撤销',
      value: 13,
    },
    {
      label: '待办中',
      value: 20,
    },
    {
      label: '已完成',
      value: 21,
    },
    {
      label: '已删除',
      value: 22,
    },
  ];

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
    // runQuery,
    // selectedKeys,
  } = useList<
    PlatformApi.PlatformWorkflowQueryWorkflowRecordList.RequestQuery,
    PlatformApi.PlatformWorkflowQueryWorkflowRecordList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      creator: undefined,
      operator: undefined,
      status: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: 10,
    service: platformApi.platformWorkflowQueryWorkflowRecordList,
  });

  const route = useRoute();
  const { keyword } = route.query as {
    keyword?: string;
  };
  search.keyword = keyword;

  const { userInfo } = useStore();

  const isSelf = computed(() => {
    if (route.fullPath.includes('/myworkorder')) {
      search.creator = userInfo?.name;
      search.operator = userInfo?.name;
      return true;
    }
    search.creator = undefined;
    search.operator = undefined;
    return false;
  });

  const router = useRouter();
  // 表格操作
  const handleActions = async (item) => {
    const { key, workflowCode, workflowType } = item;

    if (key === 'view') {
      const url = `/workorderlist/detail?code=${workflowCode}&type=${workflowType}`;
      if (url) {
        router.push(url);
      }
      return;
    }

    if (key === 'withdraw') {
      const isConfirmed = await swal.confirm('确定要撤销申请吗？');
      if (!isConfirmed) return;
      await platformApi.platformWorkflowHandleWorkflow({
        workflowCode,
        workflowType: 1,
      });
      ElMessage.success('撤销成功');
      refreshList();
    }

    if (key === 'deal') {
      const isConfirmed = await swal.confirm('是否已处理？');
      if (!isConfirmed) return;
      await platformApi.platformWorkflowHandleWorkflow({
        workflowCode,
        workflowType: 2,
      });
      refreshList();
    }
  };
</script>
