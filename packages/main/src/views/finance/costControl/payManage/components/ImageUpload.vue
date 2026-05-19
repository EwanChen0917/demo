<template>
  <div
    class="img-upload"
    ref="imgUploadRef"
    v-loading="uploading"
    @drop="onDrop"
    @dragover="onDragover"
    @dragenter="onDragenter"
    @dragleave="onDragleave"
  >
    <div class="mb-3">点击 "+" 或者拖拽图片到此处</div>
    <div class="img-list">
      <div class="img-item" v-for="(item, index) in fileList" :key="index">
        <el-image
          :src="item.url"
          class="preview-image"
          fit="cover"
          :preview-src-list="fileList.map(x=>x.url)"
          :initial-index="index"
        />
        <div class="img-delete" @click="handleRemove(index)">
          <CircleClose />
        </div>
      </div>
      <div class="img-add">
        <div class="icon-add">
          <Plus />
        </div>
        <input
          ref="uploadInput"
          type="file"
          multiple
          accept="image/*"
          @change="handleFileChange"
          class="upload-input"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Plus, CircleClose } from '@element-plus/icons-vue';
  import { platformApi } from '@/api';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import { uploadFileToOss } from "../utils";
  import * as swal from "@/utils/swal";

  const props = defineProps<{
    fileList: any[];
  }>();

  const emit = defineEmits<{
    (e: 'update:fileList', value: string[]): void;
    (e: 'change', value: string[]): void;
  }>();

  const uploadInput = ref<HTMLInputElement | null>(null);

  const handleAdd = () => {
    uploadInput.value?.click();
  };

  const uploading = ref(false);

  const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const { files } = target;

    if (files && files.length > 0) {
      if (files.length > 30) {
        ElMessage.error('单次最多上传30张图片');
        target.value = '';
        return;
      }

      uploading.value = true;
      for (const file of files) {
        try {
          const { fileUrl, ossKey } = await uploadFileToOss({
            fileName: file.name,
            file,
            directory: 'costControlPayManage',
          });
          if (!fileUrl) {
            throw new Error('上传失败');
          }
          const list = [...props.fileList, { url: fileUrl, ossKey }];
          emit('update:fileList', list);
          emit('change', list);
        } catch (error) {
          ElMessage.error(error);
        }
      }
    }
    uploading.value = false;
    target.value = '';
  };

  const handleRemove =async (index: number) => {
    const isConfirmed = await swal.confirm('确定删除吗？');
    if (!isConfirmed) return;
    const newList = [...props.fileList];
    newList.splice(index, 1);
    const list = [...newList];
    emit('update:fileList', list);
    emit('change', list);
  };

  const imgUploadRef = ref(null);
  const onDrop = (ev) => {
    const { files } = ev.dataTransfer;
    imgUploadRef.value.classList.remove('dragging');
    handleFileChange({ target: { files } });
    ev.preventDefault();
  };
  const onDragover = (ev) => {
    imgUploadRef.value.classList.add('dragging');
    ev.preventDefault();
  };
  const onDragenter = (ev) => {
    imgUploadRef.value.classList.add('dragging');
    ev.preventDefault();
  };
  const onDragleave = (ev) => {
    imgUploadRef.value.classList.remove('dragging');
    ev.preventDefault();
  };
</script>

<style scoped lang="scss">
  .img-upload {
    min-height: 400px;
    padding: 10px;
    &.dragging {
      background-color: #ebffef;
    }
    .img-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .img-item,
    .img-add {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 6px;
    }

    .img-item {
      border: 1px solid #dcdfe6;

      .preview-image {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .img-delete {
        position: absolute;
        top: -6px;
        right: -6px;
        width: 20px;
        height: 26px;
        background-color: white;
        color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        border-radius: 50%;

        &:hover {
          opacity: 1;
        }
      }

      &:hover {
        .img-delete {
          opacity: 1;
        }
      }
    }

    .img-add {
      border: 1px dashed #dcdfe6;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #8c939d;
      transition: all 0.3s;

      .icon-add {
        width: 30px;
        height: 30px;
      }

      &:hover {
        border-color: #409eff;
        color: #409eff;
      }

      .upload-input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
</style>
