<template>
  <el-select v-model="value" placeholder="请选择年份" clearable filterable :teleported="false">
    <el-option value="2023" />
    <el-option value="2024" />
  </el-select>
</template>

<script setup lang="ts">
  const value = ref<string>('');
</script>

<style scoped lang="scss"></style>
