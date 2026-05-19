<template>
  <KeenList>
    <template #search>
      <el-select v-model="search.menu" clearable filterable placeholder="问卷投放页面">
        <el-option v-for="item in menuList" :key="item" :label="item" :value="item" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
    </template>
    <el-table :data="listData?.feedbackList" v-loading="listLoading">
      <el-table-column label="问卷投放页面" prop="menu" />
      <el-table-column label="调查维度" prop="dimensionDesc" />
      <el-table-column label="投放状态" prop="statusDesc" />
      <el-table-column label="提交人数" prop="memberNum" />
      <el-table-column label="平均评分" prop="avgScore" />
      <el-table-column label="操作" prop="">
        <template #default="{ row }">
          <KeenActions
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '停止投放',
                key: 'status',
                type: 'primary',
                text: true,
                row: row,
                hide: row.status === 0,
              },
              {
                label: '恢复投放',
                key: 'status',
                type: 'primary',
                text: true,
                row: row,
                hide: row.status === 1,
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

  <FeedBackDetailDialog
    v-if="detailVisible"
    :visible="detailVisible"
    :feedbackCode="feedbackCode"
    @close="handleClose"
  />
</template>

<script setup lang="ts" name="favourfeedback">
    import useList from '@/hooks/list/useList';
  import { platformApi, PlatformApi } from '@/api';
  import FeedBackDetailDialog from './Modal/feedbackDetail.vue';

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
    resetSearch,
    runQuery,
  } = useList<
    PlatformApi.PlatformFeedbackQueryList.RequestBody,
    PlatformApi.PlatformFeedbackQueryList.ResponseBody
  >({
    searchDefaults: {
      menu: undefined,
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformFeedbackQueryList,
  });

  const menuList = ref([]);
  const queryMenuList = () => {
    platformApi.platformFeedbackQueryMenuList().then((res: any) => {
      menuList.value = res.menuList || [];
    });
  };
  queryMenuList();

  const detailVisible = ref(false);
  const feedbackCode = ref('');
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'view':
        feedbackCode.value = row.feedbackCode;
        detailVisible.value = true;
        break;
      case 'status':
        await platformApi.platformFeedbackOperateFeedback({
          feedbackCode: row.feedbackCode,
          operateType: row.status === 1 ? 1 : 2,
        });
        runQuery();
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    feedbackCode.value = '';
    detailVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
