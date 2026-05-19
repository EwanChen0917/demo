<template>
  <div class="equipment-list">
    <!-- 设备列表 -->
    <div
      v-for="device in devices"
      :key="device.deviceCode"
      class="equipment-card-wrapper"
      :class="{ active: device.deviceCode === props.activeDeviceId }"
    >
      <!-- 单个设备卡片 -->
      <EquipmentCard :device="device" :beforeSwitch="beforeSwitch" v-model:on="device.status" @switch="emit('switch', $event)" />
    </div>
  </div>
</template>

<script setup>
  import EquipmentCard from './EquipmentCard.vue';
  // props 占位
  const props = defineProps({
    devices: {
      type: Array,
      default: () => [],
    },
    beforeSwitch: {
      type: Function,
    },
    activeDeviceId: {
      type: [String, Number],
      default: '',
    },
    total: {
      type: Number,
      default: 0,
    },
  });

  const emit = defineEmits(['switch']);
</script>

<style lang="scss" scoped>
  .equipment-list {
    margin-top: 18px;
    width: 52vw;
    display: grid;
    align-content: start;
    max-height: 54vh;
    overflow-y: auto;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 90px;
    .equipment-card-wrapper {
      // cursor: pointer;
      transition: box-shadow 0.2s, border-color 0.2s;
      &.active {
        box-shadow: 0 0 0 2px #02b368;
        // 或自定义激活样式
      }
    }
  }
  :deep(.el-pagination) {
    padding-bottom: 0;
    padding-right: 2px;
    box-shadow: none;
  }
</style>
