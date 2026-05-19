<template>
  <div class="equipment-card">
    <!-- 设备型号/描述 -->
    <div class="device-content">
      <div class="device-info">
        <span class="model">{{ device?.deviceName + ' ' + device?.deviceModel }}</span>
        <!-- 设备状态标签 -->
        <Tag :color="StatusMap[device?.deviceType === 1 ? 'core' : 'auxiliary']">
          {{ device?.deviceType === 1 ? '核心设备' : '辅助设备' }}
        </Tag>
        <el-switch v-model="switchState" :before-change="handleBeforeSwitchChange" @change="emit('switch', device, $event)" :active-value="1" :inactive-value="0" v-permission="'deviceSwitch'" />
      </div>
      <div class="device-more-info">
        <div class="device-more-info-item">
          <span>型号：</span>
          <span>{{ device?.deviceModel }}</span>
        </div>
        <div class="device-more-info-item">
          <span>运行时长：</span>
          <span>{{ device?.operationHours }} 小时</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // props、事件占位
  const { device, beforeSwitch } = defineProps({
    device: {
      type: Object,
      default: () => ({}),
    },
    beforeSwitch: {
      type: Function,
      default: () => true,
    },
  });
  const emit = defineEmits(['switch', 'beforeSwitch']);

  const switchState = defineModel('on', { type: Number });
  function handleBeforeSwitchChange() {
    if (beforeSwitch) {
      return beforeSwitch(device, switchState.value);
    }
    return true;
  }
  const StatusMap = {
    core: 'blue',
    auxiliary: 'green',
  };
</script>

<style lang="scss" scoped>
  .equipment-card {
    padding: 8px 12px 12px 12px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 200px;
    box-sizing: border-box;

    .device-content {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .device-name {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 2px;
      }

      .device-info {
        color: #333;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        .el-switch {
          margin-left: auto;
        }
      }

      .device-actions {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        gap: 8px;
        align-items: center;
      }
      .device-more-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        color: #b9b9b9;
        font-size: 12px;
        .device-more-info-item {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
