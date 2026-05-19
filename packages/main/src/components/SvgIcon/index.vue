<template>
  <div
    v-if="isOnlineSvg"
    :style="{ '--svg-icon-url': `url(${icon})` }"
    class="svg-icon svg-icon-online"
    :class="className"
  ></div>
  <span v-else class="svg-icon" :class="className">
    <svg aria-hidden="true">
      <use :xlink:href="`#icon-${icon}`" />
    </svg>
  </span>
</template>

<script lang="ts" setup>
  const props = defineProps({
    // SVG 图标名称或在线URL
    icon: {
      type: String,
      required: true,
    },
    // 图标类名
    className: {
      type: String,
      default: '',
    },
  });

  const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon));
</script>

<style scoped lang="scss">
  .svg-icon-online {
    background-color: currentColor;
    mask-image: var(--svg-icon-url);
    -webkit-mask-image: var(--svg-icon-url);
    mask-size: cover;
    -webkit-mask-size: cover;
    display: inline-block;
  }
</style>
