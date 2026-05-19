<template>
  <el-dialog title="调查详情" :model-value="visible" @close="$emit('close')" width="70%">
    <KeenList>
      <el-table :data="listData?.recordList" v-loading="listLoading">
        <el-table-column label="问卷投放页面" prop="menu" min-width="150px"/>
        <el-table-column label="调查维度" prop="dimensionDesc" min-width="120px"/>
        <el-table-column label="填写人" prop="memberName" />
        <el-table-column label="评分" prop="score" min-width="280px">
          <template #default="{ row }">
            <el-rate v-model="row.score" :max="10" disabled />
          </template>
        </el-table-column>
        <el-table-column label="意见/建议" prop="content" min-width="200px"/>
        <el-table-column label="提交时间" prop="createTime" min-width="180px"/>
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
  </el-dialog>
</template>

<script setup lang="ts">
    import useList from '@/hooks/list/useList';
  import { platformApi, PlatformApi } from '@/api';

  const props = defineProps<{
    visible: boolean;
    feedbackCode: string;
  }>();

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
    PlatformApi.PlatformFeedbackQueryRecordList.RequestBody,
    PlatformApi.PlatformFeedbackQueryRecordList.ResponseBody
  >({
    searchDefaults: {
      feedbackCode: props.feedbackCode,
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformFeedbackQueryRecordList,
    serviceManual: false,
  });

  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  runQuery();
</script>

<style scoped lang="scss"></style>
