<template>
  <el-card class="box-card">
    <h3>A1 子路由页面</h3>
    <p>这是来自 a 工程的 a1 子页面。</p>
    <el-button type="success" @click="counter1++">A1 计数: {{ counter1 }}</el-button>
  </el-card>
</template>

<script setup lang="ts">
const counter1 = ref(0);
</script>

<style scoped lang="scss">
.box-card {
  padding: 16px;
}
</style>
