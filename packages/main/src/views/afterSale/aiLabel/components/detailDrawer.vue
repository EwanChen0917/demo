<template>
  <el-drawer
    class="detail-drawer"
    v-model="showDetail"
    direction="rtl"
    :show-close="false"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
  >
    666
  </el-drawer>
</template>

<script setup lang="ts">
  import { afterSaleApi } from '@/api';

  const showDetail = ref(false);
  const open = async (classification) => {
    showDetail.value = true;

    const res = await afterSaleApi.luteosAfterSaleServiceLabelQueryDetail({
      classification,
    });
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
