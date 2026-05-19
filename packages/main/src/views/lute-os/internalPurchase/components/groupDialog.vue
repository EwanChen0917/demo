<template>
  <el-dialog
    v-model="visible"
    width="420px"
    class="group-dialog custom-dialog"
    align-center
    destroy-on-close
  >
    <div class="dialog-title">请钉钉扫码入群</div>
    <div class="dialog-body">
      <img :src="groupQr" alt="群聊二维码" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import groupQr from '../assets/group.png';

  const visible = defineModel<boolean>({ default: false });
</script>

<style scoped lang="scss">
  .dialog-title {
    color: #1f1f1f;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 12px;
  }
  .dialog-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    img {
      width: 360px;
      height: 360px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      object-fit: cover;
    }
    .dialog-tip {
      color: #4a4a4a;
      font-size: 14px;
      line-height: 20px;
    }
  }
  :global(.group-dialog-header) {
    display: none;
  }
</style>
