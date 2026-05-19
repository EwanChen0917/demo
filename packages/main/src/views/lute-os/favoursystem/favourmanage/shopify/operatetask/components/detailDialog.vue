<template>
  <el-dialog title="折扣码详情" :model-value="visible" @close="emit('close')" width="70%">
    <div>红人渠道</div>
    <div class="mb-4">{{ form?.channelName }}</div>
    <div>渠道账号</div>
    <div class="mb-4">{{ form?.channelAccount }}</div>
    <div>渠道链接</div>
    <div class="mb-4">{{ form?.channelHome }}</div>

    <div>操作日志</div>
    <div v-for="(item, index) in listData?.logList" :key="index">
      <span class="primary-color">{{ item.operationTime + ' ' }}</span>
      <span class="primary-color fw-bold">{{ item.operatorName + ' ' }}</span>
      <span class="fs-7 text-muted">{{ item.operationContent + ' ' }}</span>
      <div class="separator separator-dashed my-3"></div>
    </div>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-dialog>
</template>

<script setup lang="ts">
  import { MetaApi, metaApi } from '@/api';
  import useList from '@/hooks/list/useList';

  const props = defineProps<{
    visible: boolean;
    taskCode: string;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  const form = ref({});

  watchEffect(async () => {
    if (props.taskCode) {
      const res = await metaApi.luteosMetaQueryMarkTaskStationDetail({
        taskCode: props.taskCode,
      });
      form.value.channelHome = res?.channelHome;
      form.value.channelAccount = res?.channelAccount;
      form.value.channelName = res?.channelName;
      runQuery();
    }
  });

  const {
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    runQuery,
  } = useList<
    MetaApi.LuteosMetaQueryMetaCommonOperateLog.RequestQuery,
    MetaApi.LuteosMetaQueryMetaCommonOperateLog.ResponseBody
  >({
    searchDefaults: {
      itemCode: props.taskCode,
      moduleType: 'mark_task',
    },
    pageSize: 10,
    service: metaApi.luteosMetaQueryMetaCommonOperateLog,
  });
</script>

<style scoped lang="scss"></style>
