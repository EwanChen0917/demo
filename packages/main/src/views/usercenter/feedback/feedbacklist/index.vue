<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.email" placeholder="用户邮箱">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-date-picker
        class="w-100"
        v-model="search.submitTime"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        :popper-options="{ placement: 'bottom-start' }"
      />
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        plain
        @click="
          handleExport({
            ...search,
          })
        "
        :loading="exportLoading"
      >
        导出
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.feedbackList"
      row-key="feedbackId"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="email" label="用户邮箱" />
      <el-table-column prop="username" label="用户名称" />
      <el-table-column prop="createTime" label="提交时间" width="180" />
      <el-table-column prop="content" label="提交内容" min-width="200" />
      <el-table-column label="图片" width="100">
        <template #default="scope">
          <el-image
            v-if="scope.row.imageList?.length"
            class="w-60px h-60px"
            :src="scope.row.imageList?.[0]"
            :preview-src-list="scope.row.imageList"
            fit="cover"
            lazy
            preview-teleported
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" width="120">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                payload: { code: scope.row.feedbackId },
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

<script lang="ts" setup name="feedbacklist">
import dayjs from 'dayjs';
  import { pick } from 'lodash-es';

  import useList from '@/hooks/list/useList';
  import useExport from '@/hooks/list/useExport';
  import { userApi, UserApi } from '@/api/index';

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
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<
    UserApi.LuteosUserFeedbackAdviceFeedback.RequestQuery & {
      submitTime?: [string, string];
    },
    UserApi.LuteosUserFeedbackAdviceFeedback.ResponseBody
  >({
    searchDefaults: {
      email: undefined,
      submitTime: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { submitTime } = searchData;
      return {
        ...pick(searchData, ['email']),
        submitTimeStart: submitTime?.[0]
          ? dayjs(submitTime?.[0]).startOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        submitTimeEnd: submitTime?.[1]
          ? dayjs(submitTime?.[1]).endOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
      };
    },
    service: userApi.luteosUserFeedbackAdviceFeedback,
  });
  const { handleExport, exportLoading } = useExport(userApi.luteosUserFeedbackExportAdviceFeedback);

  // 表格操作
  const handleActions = (item) => {
    const {
      key,
      payload: { code },
    } = item;

    if (key === 'view') {
      router.push(`/feedbacklist/detail?code=${code}`);
    }
  };
</script>
