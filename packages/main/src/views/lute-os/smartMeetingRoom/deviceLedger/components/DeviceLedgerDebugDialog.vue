<template>
  <el-dialog v-model="visible" width="560px" destroy-on-close align-center title="调试设备">
    <div class="debug-content">
      <div class="debug-row">
        <div class="label">设备名称：</div>
        <div class="value">{{ row?.deviceName }}</div>
      </div>
      <div class="debug-row">
        <div class="label">设备类型：</div>
        <div class="value">{{ row?.deviceTypeName }}</div>
      </div>
      <div class="debug-row align-center">
        <div class="label">执行命令：</div>
        <el-switch v-model="status" active-value="ON" inactive-value="OFF" />
      </div>
      <div class="debug-actions">
        <el-button type="primary" :loading="loading" @click="emit('confirm')">执行命令</el-button>
        <el-button @click="visible = false">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts" name="DeviceLedgerDebugDialog">
  type DeviceLedgerRow = {
    deviceName: string;
    deviceTypeName: string;
  };

  defineProps<{
    row: DeviceLedgerRow | null;
    loading: boolean;
  }>();

  const visible = defineModel<boolean>('visible', { default: false });
  const status = defineModel<'ON' | 'OFF'>('status', { default: 'ON' });

  const emit = defineEmits<{
    (event: 'confirm'): void;
  }>();
</script>

<style lang="scss" scoped>
  .debug-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .debug-row {
      display: flex;
      gap: 12px;
      .label {
        width: 90px;
        color: #666;
      }
      .value {
        flex: 1;
        color: #333;
      }
      &.align-center {
        align-items: center;
      }
    }
    .debug-actions {
      display: flex;
      justify-content: center;
      gap: 18px;
      margin-top: 6px;
    }
  }
</style>
