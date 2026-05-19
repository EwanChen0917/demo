<template>
  <el-icon v-if="state === 1" class="el-input__icon" color="var(--el-color-primary)">
    <Loading />
  </el-icon>
  <el-icon v-else-if="state === 2" class="el-input__icon" color="var(--el-color-success)">
    <CircleCheck />
  </el-icon>
  <el-icon v-else-if="state === 10" class="el-input__icon" color="var(--el-color-danger)">
    <CircleClose />
  </el-icon>
</template>

<script lang="ts" setup>
  import { CircleCheck, Loading, CircleClose } from '@element-plus/icons-vue';

  defineProps<{
    state?: number; // 0 初始状态，1 加载，2 成功 10 失败
  }>();
</script>
