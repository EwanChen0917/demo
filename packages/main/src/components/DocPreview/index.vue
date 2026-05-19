<template>
  <div v-if="visible" class="el-image-viewer__wrapper" style="z-index: 1050">
    <div class="el-image-viewer__mask"></div>
    <span
      class="el-image-viewer__btn el-image-viewer__close"
      @click="$emit('close')"
      style="z-index: 2"
    >
      <el-icon><Close /></el-icon>
    </span>
    <div class="el-image-viewer__canvas w-100 h-100 bg-color">
      <!--      微软提供的 OFFICE在线预览地址https://view.officeapps.live.com/op/view.aspx?src=你的地址（一定得是全路径，带http的那种）-->
      <!--      http://view.xdocin.com/xdoc?_xdoc=你的地址（一定得是全路径，带http的那种）-->
      <!-- <iframe
        class="w-100 h-100"
        style="z-index: 1"
        :src="
          type === 'doc'
            ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`
            : `https://view.xdocin.com/view?src=${encodeURIComponent(url)}`
        "
      ></iframe> -->
      <iframe
        class="w-100 h-100"
        style="z-index: 1"
        :src="`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Close } from '@element-plus/icons-vue';
  import 'element-plus/theme-chalk/src/image-viewer.scss';

  const props = defineProps<{
    visible: boolean;
    url: string;
    type?: string;
  }>();
  console.log(`https://view.xdocin.com/view?src=${encodeURIComponent(props.url)}`);
</script>

<style scoped lang="scss"></style>
