<template>
  <el-dialog v-model="visible" title="请扫码下载" @close="close" align-center>
    <div class="d-flex flex-column align-items-center gap-6">
      <qrcode-vue :value="qrCode" :size="175" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import QrcodeVue from 'qrcode.vue';

  const visible = ref(false);
  const qrCode = ref('');

  const open = (code) => {
    qrCode.value = code;
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
