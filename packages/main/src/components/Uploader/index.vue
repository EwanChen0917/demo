<template>
  <div class="uploader-wrapper">
    <div class="image-preview-item" :key="(item as string)" v-for="(item, index) of fileList">
      <el-image
        style="width: 100%; height: 100%"
        :src="getFileUrl(item as string)"
        fit="fill"
        :lazy="true"
      />
      <div class="image-operation">
        <el-icon @click="removeFile(index, item as string)"><Delete /></el-icon>
        <el-icon
          @click="
            viewerIndex = index;
            showViewer = true;
          "
        >
          <Search />
        </el-icon>
      </div>
    </div>
    <el-upload
      class="uploader"
      :action="oss.host"
      :data="ossData"
      ref="uploaderRef"
      :auto-upload="true"
      :before-upload="onBeforeUpdate"
      :limit="1"
      :on-exceed="onExceed"
      :on-error="handleError"
      :on-success="handleSuccess"
      :show-file-list="false"
      :accept="accept"
      v-loading="loading"
    >
      <template #trigger>
        <div v-if="fileType === 'image'" class="add-pic-icon">
          <el-icon><Plus /></el-icon>
        </div>
        <el-button v-else plain size="small" type="primary">选择文件</el-button>
      </template>
    </el-upload>
  </div>
  <el-image-viewer
    :initial-index="viewerIndex"
    @close="
      () => {
        showViewer = false;
      }
    "
    v-if="showViewer"
    :url-list="fileList.map((item) => getFileUrl(item as string))"
  />
</template>

<script setup lang="ts">
  import { platformApi, PlatformApi } from '@/api/index';
  import { omit } from 'lodash-es';
  import { Plus, Delete } from '@element-plus/icons-vue';

  const props = defineProps({
    modelValue: {
      type: Array,
      default() {
        return [];
      },
    },
    limit: {
      type: Number,
      default: Infinity,
    },
    sizeLimit: {
      type: Number,
      default: 0,
    },
    directory: {
      type: String,
      default: '12121',
    },
    fileType: {
      type: String,
      default: 'image',
    },
    accept: {
      type: String,
      default: '.png,.jpg,.jpeg',
    },
  });
  const showViewer = ref(false);
  const viewerIndex = ref(0);
  const emits = defineEmits(['update:modelValue']);
  const fileList = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });
  const uploaderRef = ref();
  const fileMap = ref({});
  const onExceed = () => {};
  const oss = reactive<PlatformApi.PlatformOssQueryOssTempPolicy.ResponseBody>({
    host: '',
    key: '',
    ossAccessKeyId: '',
    policy: '',
    signature: '',
  });
  const ossData = computed(() => omit(oss, ['host']));
  const loading = ref(false);
  const onBeforeUpdate = async (rawFile): Promise<any> => {
    if (props.sizeLimit && rawFile.size > props.sizeLimit) {
      return Promise.reject(new Error('文件大小超过限制'));
    }
    loading.value = true;
    const res = await platformApi
      .platformOssQueryOssTempPolicy({
        directory: props.directory,
        filename: rawFile.name,
      })
      .catch(() => {
        loading.value = false;
      });
    if (res) {
      Object.assign(oss, res);
      return true;
    }
    return Promise.reject(new Error('OSS 获取失败'));
  };
  const handleSuccess = (_, uploadFile) => {
    loading.value = false;
    fileMap.value[oss.key as string] = {
      ...uploadFile,
      url: window.URL.createObjectURL(uploadFile.raw),
    };
    fileList.value.push(oss.key);
    uploaderRef.value.clearFiles();
  };
  const handleError = () => {
    loading.value = false;
    uploaderRef.value.clearFiles();
  };
  const getFileUrl = (file: string) => {
    if (file.startsWith('http')) {
      return file;
    }
    return fileMap.value[file] ? fileMap.value[file].url : '';
  };
  const removeFile = (index: number, item: string) => {
    if (fileMap.value[item]) {
      // 释放前端预览url
      window.URL.revokeObjectURL(fileMap.value[item]?.url);
      Reflect.deleteProperty(fileMap.value, item);
    }
    fileList.value.splice(index, 1);
  };
  onUnmounted(() => {
    // 释放前端预览url
    Object.entries(fileMap.value).forEach((uploadFile: any) => {
      if (uploadFile[1].url) {
        window.URL.revokeObjectURL(uploadFile[1].url);
        Reflect.deleteProperty(fileMap.value, uploadFile[0]);
      }
    });
  });
</script>

<style scoped lang="scss">
  .uploader-wrapper {
    display: inline-flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    .image-preview-item {
      vertical-align: middle;
      width: 100px;
      height: 100px;
      display: inline-block;
      position: relative;
      .image-operation {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        font-size: 24px;
        display: none;
        gap: 12px;
        color: #f1f1f1;
        align-items: center;
        justify-content: center;
      }
      &:hover {
        cursor: pointer;
        &::before {
          content: '';
          display: block;
          position: absolute;
          background: rgba(0, 0, 0, 0.5);
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 1;
        }
        .image-operation {
          display: flex;
        }
      }
    }
    .uploader {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
    .add-pic-icon {
      width: 100px;
      height: 100px;
      border: 1px dashed #d1d1d1;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;
      .el-icon {
        font-size: 30px;
        color: #c1c1c1;
      }
      &:hover {
        border-color: #a1a1a1;
        .el-icon {
          color: #a3a3a3;
        }
      }
    }
  }
</style>
