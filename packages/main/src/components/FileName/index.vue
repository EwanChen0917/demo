<template>
  <div class="d-flex align-items-center gap-2">
    <SvgIcon :icon="getSvgIcon(file)" class="svg-icon svg-icon-1 svg-icon-primary" />
    <!-- 文件夹名称 -->
    <span
      v-if="file.fileType === 1"
      class="text-gray-800 text-hover-primary cursor-pointer"
      @click.stop="next(file)"
    >
      {{ file.fileName }}
    </span>
    <!-- 文件名称 -->
    <span
      v-else
      class="text-gray-800 text-hover-primary cursor-pointer"
      @click.stop="previewFile(file)"
    >
      {{ file.fileName }}.{{ file.extType }}
    </span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    file: any;
  }>();
  const emits = defineEmits(['preview', 'next']);
  const previewFile = (file) => {
    emits('preview', file);
  };
  // 获取图标
  const getSvgIcon = (row) => {
    let { extType } = row;
    if (row.fileType === 1) {
      extType = 'folder';
    }
    const svgIconMap = {
      folder: 'folder',
      pic: 'pic',
      pdf: 'pdf',
      word: 'word',
      excel: 'excel',
      txt: 'txt',
      default: 'defaultFile',
    };
    if (['jpg', 'jpeg', 'png', 'svg'].includes(extType)) {
      return svgIconMap.pic;
    }
    if (extType === 'pdf') {
      return svgIconMap.pdf;
    }
    if (['xls', 'xlsx'].includes(extType)) {
      return svgIconMap.excel;
    }
    if (['doc', 'docx'].includes(extType)) {
      return svgIconMap.word;
    }
    if (['txt'].includes(extType)) {
      return svgIconMap.txt;
    }
    if (['folder'].includes(extType)) {
      return svgIconMap.folder;
    }

    return svgIconMap.default;
  };
  const next = (file) => {
    emits('next', file);
  };
</script>

<style scoped lang="scss"></style>
