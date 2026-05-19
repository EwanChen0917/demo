<template>
  <el-dialog title="请钉钉扫码入群付款" v-model="visible" @close="visible = false">
    <div class="d-flex flex-column align-items-center gap-6">
      <qrcode-vue :value="qrCode" :size="175" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import QrcodeVue from 'qrcode.vue';
  import { commonApi } from '@/api';

  const visible = ref(false);

  const qrCode = ref();
  const queryQrCode = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialList({
      scene: 'group_qr_code',
      pageNum: 1,
      pageSize: 10,
    });
    qrCode.value = res?.materialList?.[0]?.linkUrl;
  };

  const open = () => {
    queryQrCode();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
