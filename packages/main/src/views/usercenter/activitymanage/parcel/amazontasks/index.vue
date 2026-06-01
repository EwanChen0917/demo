<template>
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
    <!-- <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template> -->
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
                taskCode: scope.row.taskCode,
              },
              {
                label: '驳回',
                key: 'reject',
                type: 'primary',
                text: true,
                taskCode: scope.row.taskCode,
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
  >
</template>

<script lang="ts" setup name="amazontasks">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import { Picture as IconPicture } from '@element-plus/icons-vue';
  import useList from '@/hooks/list/useList';
  import { activityApi, ActivityApi } from '@/api/index';
  import * as swal from '@/utils/swal';

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
    ActivityApi.LuteosActivityParcelQueryAmazonTasks.RequestQuery,
    ActivityApi.LuteosActivityParcelQueryAmazonTasks.ResponseBody
  >({
    searchDefaults: {
      userEmail: undefined,
      createTime: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: activityApi.luteosActivityParcelQueryAmazonTasks,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, taskCode } = item;
    if (key === 'resolve') {
      const isConfirmed = await swal.resolveConfirm();
      if (!isConfirmed) return;
      auditRun({
        taskCode,
        status: 2,
        remark: document.getElementById('resolve_remark').value,
      });
    } else if (key === 'reject') {
      const isConfirmed = await swal.rejectConfirm();
      if (!isConfirmed) return;
      auditRun({
        taskCode,
        status: 3,
        remark: document.getElementById('reject_reason').value,
      });
    }
  };

  // 审核操作
  const { run: auditRun } = useRequest(activityApi.luteosActivityParcelCheckAmazonTask, {
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
