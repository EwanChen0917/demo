<template>
  <el-drawer
    v-model="visible"
    size="80%"
    title="领用详情"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :destroy-on-close="true"
    :append-to-body="true"
    class="custom-drawer"
  >
    <DetailDrawerContent ref="contentRef" @close="visible = false" />
  </el-drawer>
</template>
<script setup lang="ts">
  import DetailDrawerContent from '../detail.vue';

  const visible = ref(false);

  const contentRef = ref<InstanceType<typeof DetailDrawerContent>>();
  const open = (code: string) => {
    visible.value = true;
    nextTick(() => {
      contentRef.value?.init(code);
    });
  };
  defineExpose({
    open,
  });
</script>
