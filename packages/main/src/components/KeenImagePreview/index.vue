<template>
  <el-image
    :class="[`w-${size}px`, `h-${size}px`]"
    :src="props.src"
    v-if="props.src"
    :preview-src-list="props?.srcList"
    :fit="props.fit"
    preview-teleported
    style="border-radius: 0.475rem; min-width: 50px; min-height: 50px"
    :style="{ width: `${size}px`, height: `${size}px` }"
    v-bind="options"
  >
    <template #error>
      <div class="default-img">
        <img src="@/assets/images/productDefaultImg.svg" />
      </div>
    </template>
  </el-image>
  <el-image
    v-else
    :class="[`w-${size}px`, `h-${size}px`]"
    :src="emptyImg"
    :preview-src-list="props?.srcList"
    :fit="props.fit"
    preview-teleported
    style="border-radius: 0.475rem; min-width: 50px; min-height: 50px"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<script setup lang="ts">
  import emptyImg from '@/assets/images/system/empty.png';

  const props = withDefaults(
    defineProps<{
      src: string;
      srcList?: [];
      size?: number;
      fit?: string;
      options?: any;
    }>(),
    {
      size: 50,
      fit: 'cover',
    }
  );
</script>

<style scoped lang="scss">
  .default-img {
    width: 100%;
    height: 100%;
    background-color: #b0f1cc;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
      height: 50%;
    }
  }
</style>
