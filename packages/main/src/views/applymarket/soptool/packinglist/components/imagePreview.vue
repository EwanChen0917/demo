<template>
  <div class="image-preview-box">
    <template v-if="Array.isArray(image)">
      <el-image
        class="packing-preview-image"
        v-for="(src, index) in image"
        :src="(src as string)"
        :key="(src as string)"
        fit="contain"
        :lazy="true"
        style="width: 42px; height: 42px"
        @click="handleClick(index)"
      />
    </template>
    <template v-else>
      <el-image
        class="packing-preview-image"
        v-if="image"
        :src="(image as string)"
        fit="contain"
        :lazy="true"
        style="width: 42px; height: 42px"
        @click="handleClick()"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    image: {
      type: [Array, String],
      default() {
        return '';
      },
    },
  });
  const emits = defineEmits(['preview']);
  const handleClick = (index = 0) => {
    emits('preview', Array.isArray(props.image) ? props.image : [props.image], index);
    // emits('preview', [image]);
  };
</script>

<style scoped lang="scss">
  .image-preview-box {
    display: inline-flex;

    .packing-preview-image {
      margin-left: 10px;
      cursor: pointer;
    }
  }
</style>
