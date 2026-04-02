<template>
  <div class="main-app">
    <nav class="app-navigation">
      <el-menu mode="horizontal" :default-active="$route.path" class="nav-menu">
        <el-menu-item index="/">
          <router-link to="/">首页</router-link>
        </el-menu-item>
        <el-sub-menu index="/a">
          <template #title>A 模块</template>
          <el-menu-item index="/a/a1">
            <router-link to="/a/a1">A1 页面</router-link>
          </el-menu-item>
          <el-menu-item index="/a/a2">
            <router-link to="/a/a2">A2 页面</router-link>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/b">
          <router-link to="/b">B 模块</router-link>
        </el-menu-item>
      </el-menu>
    </nav>

    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-navigation {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-menu {
  border-bottom: none;
  justify-content: center;
}

.app-container {
  flex: 1;
  background-color: #f5f5f5;
}

:deep(.el-menu-item) {
  border-bottom: none !important;
}

:deep(.el-menu-item a) {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
