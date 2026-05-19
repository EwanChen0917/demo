<template>
  <div class="item-label" :style="{ fontSize: fontSize + 'px' }">
    <span v-if="label" class="label">
      {{ label }}
      <el-tooltip v-if="tips" :content="tips" placement="top">
        <i class="iconfont icon-xianxingtubiaoxunwen"></i>
      </el-tooltip>
      ：
    </span>
    <div class="value">
      <span v-if="value === null || value === ''">-</span>
      <OverflowTooltip :content="value" :line="1" :font-size="fontSize" :color="color" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: any;
      tips?: string;
      fontSize?: number;
      color?: string;
    }>(),
    {
      fontSize: 12,
    }
  );
</script>

<style scoped lang="scss">
  .item-label {
    display: flex;

    .label {
      flex-shrink: 0;
      color: #999999;
    }

    .value {
      flex: 1;
    }

    .icon-xianxingtubiaoxunwen {
      font-size: 14px;
    }
  }
</style>
