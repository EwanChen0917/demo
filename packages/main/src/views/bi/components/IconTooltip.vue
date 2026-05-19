<template>
  <el-tooltip :content="content" placement="top">
    <slot>
      <i @click="$emit('click')" class="iconfont" :class="iconClass" v-bind="$attrs"></i>
    </slot>
  </el-tooltip>
</template>

<script lang="ts" setup>
  defineProps<{
    iconClass: string;
    content: string;
  }>();
  defineEmits<{
    click: [];
  }>();
</script>

<style lang="scss" scoped>
  .iconfont {
    cursor: pointer;
    font-size: 16px;
    color: #999999;
  }
</style>
