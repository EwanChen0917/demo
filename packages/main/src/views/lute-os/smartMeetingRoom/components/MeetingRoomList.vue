<template>
  <div class="meeting-room-list">
    <!-- 会议室列表 -->
    <div
      v-for="room in rooms"
      :key="room.roomCode"
      class="meeting-room-card-wrapper"
      :class="{ active: room.roomCode === props.activeRoom?.roomCode }"
      @click="handleSelect(room)"
    >
      <MeetingRoomCard :room="room" :active="room.roomCode === activeRoom?.roomCode" />
    </div>
  </div>
  <!-- <KeenPagination
    v-if="total > 0"
    class="mt-5"
    size="small"
    v-model:page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-size-option="[5, 10, 20]"
    :pager-count="3"
  /> -->
</template>

<script setup>
  import MeetingRoomCard from './MeetingRoomCard.vue';

  const props = defineProps({
    rooms: {
      type: Array,
      default: () => [],
    },
    activeRoom: {
      type: Object,
      default: null,
    },
    total: {
      type: Number,
      default: 0,
    },
  });
  const currentPage = defineModel('page');
  const pageSize = defineModel('pageSize');

  const emit = defineEmits(['select', 'search', 'page', 'pageSize']);

  const search = ref('');

  function handleSelect(room) {
    emit('select', room);
  }

  function onSearch(val) {
    emit('search', val);
  }

  function handleSizeChange(val) {
    emit('pageSize', val);
  }
  function handleCurrentChange(val) {
    emit('page', val);
  }
</script>

<style lang="scss" scoped>
  .meeting-room-list {
    display: flex;
    flex-direction: column;
    height: 69vh;
    overflow-y: auto;
    padding: 2px;
    gap: 24px;
    .filter-bar {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 12px;

      .room-search-input {
        flex: 1;
      }
      // .status-select {
      //   width: 120px;
      // }
    }

    .meeting-room-card-wrapper {
      cursor: pointer;
      border-radius: 8px;
      transition: box-shadow 0.2s, border-color 0.2s;
      &.active {
        box-shadow: 0 0 0 2px #02b368;
        // 或自定义激活样式
      }
    }
  }
  :deep(.el-pagination__sizes) {
    align-self: flex-end; // 保证和其它元素底部对齐
    // 或者
    margin-bottom: -5px; // 视实际字体微调
  }

  :deep(.el-pagination__total) {
    margin-right: auto;
  }
</style>
