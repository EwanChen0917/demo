<template>
  <el-dialog width="800" title="邮件内容" v-model="visible" @close="visible = false" align-center>
    <div class="email-content" v-html="emailContent"></div>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);
  const emailContent = ref('');

  const open = (content) => {
    emailContent.value = content;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .email-content {
    padding-right: 10px;
    max-height: 65vh;
    overflow-y: scroll;
  }
</style>
