<template>
  <div class="meeting-room-card" :class="{ active }">
    <div class="left">
      <div class="d-flex flex-direction-column w-100 justify-content-between align-items-end">
        <!-- 会议室名称 -->
        <div class="d-flex flex-direction-column w-67 justify-content-between room-name-wrapper">
          <el-tooltip :content="room?.roomName + '（' + room?.roomCapacity + '人）'" placement="top">
            <div class="room-name">{{ room?.roomName }}（{{ room?.roomCapacity + '人' }}）</div>
          </el-tooltip>
          <!-- 可容纳人数/标签等 -->
          <div class="room-info">
            <span class="people-range">{{ room?.roomCategoryDesc }}</span>
            <!-- 其他简要信息 -->
          </div>
        </div>
        <!-- 状态标签：空闲/使用中等 -->
        <Tag :color="statusMap[room?.status]" size="small" class="status-tag">
          {{ room?.statusDesc }}
        </Tag>
      </div>
      <div class="location" v-if="room?.address || room?.locationHint">{{ room?.address + (room?.floor ? ' ' + room?.floor + '楼' : '') + (room?.locationHint ? ' ' + room?.locationHint : '') }}</div>
      <div class="location" v-else> </div>
    </div>
    <!-- 预约按钮 -->
    <el-button type="primary" class="reserve-btn" @click.stop="handleReserve" v-if="false">
      预约
    </el-button>
  </div>
</template>

<script setup>
  // props、事件占位
  const props = defineProps({
    room: {
      type: Object,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['reserve']);

  function handleReserve() {
    emit('reserve', props.room);
  }

  const statusMap = {
    0: 'blue',
    1: 'red',
  };

  // 组件占位导入
  // import StatusTag from './StatusTag.vue'
</script>

<style lang="scss" scoped>
  .w-67 {
    width: 67%;
  }
  .meeting-room-card {
    padding: 16px;
    border-radius: 8px;
    background: #f7f7f7;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    transition: box-shadow 0.5s, border-color 0.5s;
    cursor: pointer;
    .left {
      display: flex;
      width: 100%;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      .room-name {
        max-width: 75%;
        overflow: hidden;
        font-size: 14px;
        margin-bottom: 2px;
        border-bottom: 1px solid transparent;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          color: #02b368;
          border-bottom: 1px solid #02b368;
        }
      }
      .room-info {
        color: #b9b9b9;
        font-size: 12px;
        margin-bottom: 4px;
      }
      .status-tag {
        margin-bottom: 4px;
      }
      .location {
        color: #b9b9b9;
        font-size: 12px;
      }
    }
  }
</style>
