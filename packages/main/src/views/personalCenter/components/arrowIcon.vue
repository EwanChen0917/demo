<template>
  <svg
    :width="fontSize"
    :height="fontSize"
    viewBox="0 0 16 16"
    fill="none"
    :style="{minWidth: fontSize + 'px', minHeight: fontSize + 'px'}"
    xmlns="http://www.w3.org/2000/svg"
    class="arrow-icon"
  >
    <path
      v-if="isUp"
      d="M11.5221 8.76948C11.9747 9.28675 11.6074 10.0963 10.92 10.0963H4.80156C4.11423 10.0963 3.74689 9.28674 4.1995 8.76948L7.25874 5.2732C7.57747 4.90893 8.14414 4.90894 8.46286 5.2732L11.5221 8.76948Z"
      :fill="upColor"
    />
    <path
      v-else
      d="M11.5221 7.23052C11.9747 6.71325 11.6074 5.90372 10.92 5.90372H4.80156C4.11423 5.90372 3.74689 6.71326 4.1995 7.23052L7.25874 10.7268C7.57747 11.0911 8.14414 11.0911 8.46286 10.7268L11.5221 7.23052Z"
      :fill="downColor"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  isUp?: boolean;
  upColor?: string;
  downColor?: string;
  fontSize?: number | string;
}

withDefaults(defineProps<Props>(), {
  isUp: false,
  upColor: '#F53F3F',
  downColor: '#02B96B',
  fontSize: 16
});
</script>
