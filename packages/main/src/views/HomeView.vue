<template>
  <div class="home-page">
    <el-card class="hero-card" shadow="hover">
      <h1>主应用首页</h1>
      <p>
        欢迎进入 Vue3 Monorepo 示例。你可以从上方导航进入 A、B 两个业务模块。
      </p>

      <div class="quick-actions">
        <router-link to="/a/a1">
          <el-button type="primary">进入 A1 页面</el-button>
        </router-link>
        <router-link to="/b">
          <el-button type="success">进入 B 页面</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-card {
  padding: 1.5rem;
}

.hero-card h1 {
  margin: 0 0 1rem;
  color: #303133;
}

.hero-card p {
  margin: 0;
  color: #606266;
  line-height: 1.8;
}

.quick-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
}

a {
  text-decoration: none;
}
</style>
