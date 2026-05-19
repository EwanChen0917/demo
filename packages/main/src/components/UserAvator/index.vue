<template>
  <el-tooltip popper-class="action_tool_tip text-gray-600" effect="light" placement="top">
    <template #content>
      <div>{{ name }}</div>
      <div>{{ title }}</div>
    </template>
    <el-avatar class="cursor-pointer" :size="size" :src="url" />
  </el-tooltip>
</template>

<script setup lang="ts">
  import { ElTooltip } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      url: string; // 头像图片的URL
      size?: number;
      name?: string;
      title?: string;
    }>(),
    {
      size: 25,
    }
  );
</script>

<style scoped lang="scss"></style>
