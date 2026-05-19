<template>
  <div class="task-operation-buttons">
    <template v-if="row.status === '运行中'">
      <el-button type="primary" link v-permission="getPermissionCode('pause')" @click="emit('pause', row)">
        暂停
      </el-button>
      <el-button type="primary" link v-permission="getPermissionCode('close')" @click="emit('close', row)">
        关闭
      </el-button>
    </template>
    <template v-else-if="row.status === '已暂停'">
      <el-button
        type="primary"
        link
        v-permission="getPermissionCode('resume')"
        @click="emit('resume', row)"
      >
        恢复
      </el-button>
      <el-button type="primary" link v-permission="getPermissionCode('edit')" @click="emit('edit', row)">
        编辑
      </el-button>
      <el-button type="primary" link v-permission="getPermissionCode('close')" @click="emit('close', row)">
        关闭
      </el-button>
    </template>
    <template v-else-if="row.status === '待执行'">
      <el-button type="primary" link v-permission="getPermissionCode('pause')" @click="emit('pause', row)">
        暂停
      </el-button>
    </template>
    <template v-else>-</template>
  </div>
</template>

<script setup lang="ts" name="TaskOperationButtons">
  import type { AutomationTaskListItem } from '../types';

  defineProps<{
    row: AutomationTaskListItem;
  }>();

  const emit = defineEmits<{
    (event: 'pause', row: AutomationTaskListItem): void;
    (event: 'resume', row: AutomationTaskListItem): void;
    (event: 'close', row: AutomationTaskListItem): void;
    (event: 'edit', row: AutomationTaskListItem): void;
  }>();

  type TaskOperationAction = 'pause' | 'resume' | 'close' | 'edit';

  const operationPermissionMap: Record<TaskOperationAction, string> = {
    pause: 'automationTaskPause',
    resume: 'automationTaskPause',
    close: 'automationTaskClose',
    edit: 'automationTaskEdit',
  };

  const getPermissionCode = (action: TaskOperationAction) => operationPermissionMap[action];
</script>

<style lang="scss" scoped>
  .task-operation-buttons {
    display: inline-flex;
    gap: 10px;
    align-items: center;
  }
</style>
