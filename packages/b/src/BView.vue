<template>
  <div class="b-container">
    <el-card class="main-card">
      <h2>B 应用页面</h2>
      <p>这是来自 b 工程的内容。</p>
      <el-input v-model="text" placeholder="输入内容" class="input-field" />
      <p class="input-display">当前输入: {{ text }}</p>
      <base-button>这是一个来自 shared 包的按钮组件</base-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const text = ref("");
</script>

<style scoped lang="scss">
.b-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.main-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-card h2 {
  color: #667eea;
  margin-bottom: 1rem;
}

.input-field {
  margin: 1rem 0;
  max-width: 400px;
}

.input-display {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-weight: 500;
}
</style>
