<template>
  <div class="status-tag" :style="getStatusStyle(status)"><slot></slot></div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    status: string | number;
    statusDesc?: string;
  }>();

  const getStatusStyle = (status: string | number) => {
    if ([2, 3, 4, 5].includes(Number(status))) {
      return {
        color: '#FF4C34',
        width: '84px',
        background: '#FF4C340F',
      };
    }
    const statusStyles = {
      0: { color: '#979797', width: '78px', background: '#F3F3F3' },
      1: { color: '#34AC36', width: '84px', background: '#34AC360F' },
      6: { color: '#979797', width: '78px', background: '#F3F3F3' },
    };
    return statusStyles[status] || {};
  };
</script>

<style scoped lang="scss">
  .status-tag {
    text-align: center;
    font-family: PingFang SC;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    border-radius: 4px;
  }
</style>
