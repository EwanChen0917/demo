<template>
  <el-dialog title="添加属性" v-model="visible" width="70%" @close="visible = false" append-to-body>
    <categoryDetail ref="categoryDetailRef"  />
  </el-dialog>
</template>

<script setup lang="ts">
    import categoryDetail from '@/views/goodscenter/categorymanage/categorydetail/index.vue'

    const categoryDetailRef = ref<typeof categoryDetail>(null);
  
  const visible = ref<boolean>(false);
  
  const open = (code) => {
    visible.value = true;
    nextTick(() => {
      categoryDetailRef.value?.init(code);
    });
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss">
</style>
