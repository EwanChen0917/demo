<template>
  <div class="a-container">
    <el-card class="main-card">
      <h2>A 应用页面</h2>
      <p>这是来自 a 工程的内容。</p>
      <el-button type="primary" @click="clickCount++"
        >点击 {{ clickCount }} 次</el-button
      >

      <el-divider />

      <div class="nav-buttons">
        <router-link to="/a/a1">
          <el-button type="success">进入 A1 子路由</el-button>
        </router-link>
        <router-link to="/a/a2">
          <el-button type="warning">进入 A2 子路由</el-button>
        </router-link>
        <BaseButton>这是一个来自 shared 包的按钮组件</BaseButton>
      </div>
    </el-card>

    <div class="router-view-container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const clickCount = ref(0);
</script>

<style scoped lang="scss">
.a-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.main-card {
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-card h2 {
  color: #667eea;
  margin-bottom: 1rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.router-view-container {
  margin-top: 2rem;
}

a {
  text-decoration: none;
}
</style>
