<template>
  <el-image
    class="rt_avator"
    :src="url"
    :fit="fit"
    :style="styleObj"
    @error="handleError"
    v-if="isShowImage && url"
  />
  <EleLetter :name="name" v-else :styleObj="styleObj" />
</template>

<script setup lang="ts">
  import { ElImage } from 'element-plus';
  import EleLetter from './letter.vue';

  const props = withDefaults(
    defineProps<{
      url: string;
      fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
      styleObj?: any;
      isHandleError: boolean;
      name: string;
    }>(),
    { fit: 'cover', styleObj: { width: '50px', height: '50px' }, isHandleError: false }
  );

  const state = reactive<{
    isShowImage: any;
  }>({
    isShowImage: true,
  });
  const { isShowImage } = toRefs(state);

  const handleError = () => {
    if (props.isHandleError) {
      isShowImage.value = false;
    }
  };
</script>

<style lang="scss" scoped>
  .rt_avator {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>
