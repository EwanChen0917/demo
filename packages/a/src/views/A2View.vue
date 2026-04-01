<template>
  <el-card class="box-card">
    <h3>A2 子路由页面</h3>
    <p>这是来自 a 工程的 a2 子页面。</p>
    <el-button type="warning" @click="counter2++"
      >A2 计数: {{ counter2 }}</el-button
    >
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
const counter2 = ref(0);
</script>

<style scoped>
.box-card {
  padding: 16px;
}
</style>
