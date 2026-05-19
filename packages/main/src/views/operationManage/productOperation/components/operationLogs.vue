<template>
  <el-dialog title="操作日志" :model-value="visible" width="700px" :before-close="close">
    <el-timeline class="time-wrap" v-if="logs.length">
      <el-timeline-item
        v-for="(item, index) in logs"
        :key="index"
        :color="'#409eff'"
        :timestamp="`${item.operationTime}&nbsp;&nbsp;更新人：${item.operatorName}`"
        placement="top"
      >
        <el-card>
          <h4>更新内容</h4>
          <p>{{ item.operationContent }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-else class="no-data">暂无数据</div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { productOperationApi } from '@/api/index';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      projectCode: string;
    }>(),
    {
      visible: false,
    }
  );

  const close = () => {
    props.visible = false;
    emits('close');
  };
  const emits = defineEmits<{
    (ev: string);
  }>();

  const logs = ref([]);
  const queryLogs = () => {
    productOperationApi
      .luteosOpetationQueryOperationProjectLogList({
        projectCode: props.projectCode,
      })
      .then((res) => {
        logs.value = res.logList || [];
      });
  };

  onMounted(() => {
    queryLogs();
  });
</script>

<style scoped lang="scss">
  .time-wrap {
    :deep(.el-timeline-item__timestamp) {
      color: #409eff;
    }
  }
  .no-data {
    text-align: center;
  }
</style>
