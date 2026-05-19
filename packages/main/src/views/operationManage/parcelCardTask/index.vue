<template>
  <el-tabs v-model="search.type" tab-position="top">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
        <!-- <span class="tab-count">({{ (listData as any)?.statusStatistics[item.code] }})</span> -->
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.userEmail" placeholder="用户邮箱">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="search.createTime"
        type="date"
        value-format="YYYY-MM-DD"
        placeholder="请选择上传时间"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="goSourcestat">来源统计</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.tasks"
      row-key="categoryCode"
      class-name="table-row-dashed"
    >
      <!--        <el-table-column type="selection" width="40" reserve-selection />-->
      <el-table-column prop="createTime" label="上传日期" />
      <el-table-column prop="imageUrl" label="截图">
        <template #default="scope">
          <KeenImagePreview :src="scope.row.imageUrl" :src-list="[scope.row.imageUrl]" />
        </template>
      </el-table-column>
      <el-table-column prop="userEmail" label="用户邮箱" />
      <el-table-column label="状态">
        <template #default="scope">
          <span v-if="scope.row.status === 1" class="badge badge-light-primary">
            {{ statusMap[scope.row.status] }}
          </span>
          <span v-else-if="scope.row.status === 2" class="badge badge-light-success">
            {{ statusMap[scope.row.status] }}
          </span>
          <span v-else-if="scope.row.status === 3" class="badge badge-light-warning">
            {{ statusMap[scope.row.status] }}
          </span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column prop="taskType" label="渠道">
        <template #default="{ row }">
          {{ row.taskType === 1 ? '社媒' : '亚马逊' }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="approverName" label="审核人" />
      <el-table-column prop="approveTime" label="审核时间" />
      <el-table-column label="操作" align="activity">
        <template #default="scope">
          <KeenActions
            v-if="scope.row.status == 1"
            display-style="buttons"
            :actions="[
              {
                label: '通过',
                key: 'resolve',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '驳回',
                key: 'reject',
                type: 'primary',
                text: true,
                row: scope.row,
              },
            ]"
            @click="handleActions"
          />
          <div v-else>
            {{ scope.row.operateMessage }}
          </div>
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

<script lang="ts" setup name="parcelCardTask">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/hooks/list/useList';
  import { activityApi, ActivityApi } from '@/api/index';
  import * as swal from '@/utils/swal';

  const tabStatusList = [
    { status: '', code: 'all', statusName: '全部', count: '' },
    { status: 1, code: 'waitAuth', statusName: '社媒', count: '' },
    { status: 2, code: 'authNoPass', statusName: '亚马逊', count: '' },
  ];
  const statusMap = {
    1: '待审核',
    2: '审核通过',
    3: '审核驳回',
  };
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    ActivityApi.LuteosActivityParcelQueryTasks.RequestQuery,
    ActivityApi.LuteosActivityParcelQueryTasks.ResponseBody
  >({
    searchDefaults: {
      type: '',
      userEmail: undefined,
      createTime: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: activityApi.luteosActivityParcelQueryTasks,
  });
  const router = useRouter();
  const goSourcestat = () => {
    const path = router.resolve({
      name: 'sourcestat',
    });
    router.push(path.href);
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'resolve') {
      const isConfirmed = await swal.resolveConfirm();
      if (!isConfirmed) return;
      const params = {
        taskCode: row.taskCode,
        status: 2,
        remark: document.getElementById('resolve_remark').value || '',
      };
      const fn = row.taskType === 1 ? auditRunSocial : auditRunAmazon;
      fn(params);
    } else if (key === 'reject') {
      const isConfirmed = await swal.rejectConfirm();
      if (!isConfirmed) return;
      const params = {
        taskCode: row.taskCode,
        status: 3,
        remark: document.getElementById('reject_reason').value || '',
      };
      const fn = row.taskType === 1 ? auditRunSocial : auditRunAmazon;
      fn(params);
    }
  };

  // 审核操作
  const { run: auditRunAmazon } = useRequest(activityApi.luteosActivityParcelCheckAmazonTask, {
    manual: true,
    async onSuccess() {
      ElMessage.success({
        message: '审核成功',
        duration: 5 * 1000,
      });
      await refreshList();
    },
    onError(e) {
      swal.error(`审核失败: ${e.message}`);
    },
  });
  const { run: auditRunSocial } = useRequest(activityApi.luteosActivityParcelCheckSocialTask, {
    manual: true,
    async onSuccess() {
      ElMessage.success({
        message: '审核成功',
        duration: 5 * 1000,
      });
      await refreshList();
    },
    onError(e) {
      swal.error(`审核失败: ${e.message}`);
    },
  });
</script>

<style scoped lang="scss"></style>
