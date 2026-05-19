<template>
  <el-dialog :title="title" :model-value="visibility" @close="close">
    <div v-for="(value, index) in failReasonData" class="text" :key="index">{{ value }}</div>
  </el-dialog>
</template>

<script lang="ts" setup>
  const title = ref('上报失败原因');
  const failReasonData = ref([]);
  const emit = defineEmits<{
    (event: 'close'): void;
  }>();
  const close = () => {
    visibility.value = false;
    emit('close');
  };
  const visibility = ref(false);
  const open = async (data) => {
    if (data) {
      failReasonData.value = data;
      visibility.value = true;
    } else {
      failReasonData.value = [];
    }
  };
  defineExpose({ open });
</script>
<style scoped lang="scss">
  .text {
    color: var(---N9, #1f1f1f);
    line-height: 26px;
  }
</style>
