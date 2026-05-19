<template>
  <div class="room-type-tabs">
    <!-- 会议室类型Tabs（使用ElRadioGroup+ElRadioButton） -->
    <el-radio-group v-model="roomType" class="type-tabs-group" @change="emit('change', roomType)">
      <el-radio-button label="all">全部</el-radio-button>
      <el-radio-button :label="1">培训室</el-radio-button>
      <el-radio-button :label="2">超大会议室</el-radio-button>
      <el-radio-button :label="3">大会议室</el-radio-button>
      <el-radio-button :label="4">中会议室</el-radio-button>
      <el-radio-button :label="5">小会议室</el-radio-button>
      <el-radio-button :label="0">其它</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup>
  const roomType = defineModel('roomType', {
    type: [String, Number],
    default: 'all',
  });

  const emit = defineEmits(['change']);
</script>

<style lang="scss" scoped>
  .room-type-tabs {
    margin-top: 16px;
    margin-left: 24px;
    .type-tabs-group {
      display: flex;
      gap: 12px;

      :deep(.el-radio-button__inner) {
        border-radius: 6px !important; // 强制所有按钮都有圆角
        border: none;
        margin-right: 0; // 去掉默认拼接
      }
    }
  }
</style>
