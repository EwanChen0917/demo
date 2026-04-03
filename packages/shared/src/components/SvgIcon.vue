<template>
  <svg
    :class="['svg-icon', className]"
    :style="{ width: size, height: size, color }"
    aria-hidden="true"
  >
    <use :href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  prefix?: string;
  size?: string;
  color?: string;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  size: "1em",
  color: "currentColor",
  className: "",
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
