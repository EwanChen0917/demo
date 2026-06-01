<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.activityName" placeholder="活动名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option :value="ActivityStatus.开启" label="开启" />
        <el-option :value="ActivityStatus.关闭" label="关闭" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd">新增活动</el-button>
      <el-button
        class="button"
        type="primary"
        plain
        @click="
          handleExport({
            codeList,
            ...search,
          })
        "
        :loading="exportLoading"
        :disabled="!listData?.activityList?.length"
      >
        导出
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.activityList"
      row-key="activityCode"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="activityCode" label="活动ID" />
      <el-table-column prop="name" label="活动名称" />
      <el-table-column prop="startTime" label="抽奖时间" min-width="120" />
      <el-table-column label="活动状态">
        <template #default="scope">
          <span
            class="badge"
            :class="[
              scope.row.status === ActivityStatus.开启 ? 'badge-light-success' : 'badge-light',
            ]"
          >
            {{ ActivityStatus[scope.row.status] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="activityUserNums" label="参与人数" />
      <el-table-column prop="createTime" label="创建时间" min-width="120" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column label="操作" width="110">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                payload: { code: scope.row.activityCode },
              },
              {
                label: '关闭',
                key: 'close',
                type: 'danger',
                text: true,
                hide: scope.row.status === ActivityStatus.关闭,
                payload: { code: scope.row.activityCode, name: scope.row.name },
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
</template>

<script lang="ts" setup name="activitylist">
import useList from '@/hooks/list/useList';
  import useExport from '@/hooks/list/useExport';
  import { activityApi, ActivityApi } from '@/api/index';
  import { ActivityStatus, ActivityType } from '@/types/api';
  import * as swal from '@/utils/swal';

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
    resetSearch,
    // runQuery,
    tableRef,
    selectedKeys: codeList,
    handleSelectionChange,
  } = useList<
    ActivityApi.LuteosActivityQueryActivityList.RequestQuery,
    ActivityApi.LuteosActivityQueryActivityList.ResponseBody
  >({
    searchDefaults: {
      activityName: undefined,
      activityType: ActivityType.抽奖,
      status: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: activityApi.luteosActivityQueryActivityList,
  });
  const { handleExport, exportLoading } = useExport(activityApi.luteosActivityExportActivity);

  // 表格操作
  const handleActions = async (item) => {
    const {
      key,
      payload: { code, name },
    } = item;

    if (key === 'view') {
      router.push(`/activitylist/detail?code=${code}`);
    } else if (key === 'close') {
      const isConfirmed = await swal.confirm({
        title: '请确认',
        html: `<p>确定关闭 <span class="text-primary">${name}</span> 吗？</p>`,
      });
      if (isConfirmed) {
        await activityApi.luteosActivityOperateActivity({
          activityCode: code,
          activityType: 1,
          operateType: 1,
        });
        refreshList();
      }
    }
  };

  // 新增操作

  const handleAdd = () => {
    router.push(`/activitylist/add`);
  };
</script>
