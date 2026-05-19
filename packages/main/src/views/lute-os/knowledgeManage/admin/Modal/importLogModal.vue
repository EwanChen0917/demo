<template>
  <el-dialog
    :title="title"
    :destroy-on-close="true"
    :model-value="visible"
    @close="emit('close')"
    align-center
  >
    <el-empty v-if="logList.length === 0" description="暂无数据" />
    <div class="check-log" v-else>
      <template v-for="(item, index) in logList" :key="index">
        <div class="log-item">
          姓名：【{{ item.creator }}】，{{ item.operationTypeDesc }} {{ item.content }} {{ operationTypeMap[item.operationType] }}时间: {{ item.updateTime }}
        </div>
      </template>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  title: string;
  logList: LogItem[];  
  code: string;
}>();
const emit = defineEmits<{
  (event: 'close'): void;
}>();
const operationTypeMap = {
  'add': '新增',
  'update': '更新',
}

interface LogItem {
  content: string;
  creator: string;
  creatorName: string;
  operationType: string;
  operationTypeDesc: string;
  updateTime: string;
}
</script>

<style scoped lang="scss">
.check-log {
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
  .log-item {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>