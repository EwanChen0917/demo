<template>
  <el-upload
    class="keen-drag-upload"
    drag
    :action="oss.host"
    :data="ossData"
    v-model:file-list="fileList"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :limit="limit"
    :accept="accept"
    :multiple="multiple"
    :disabled="disabled"
    :show-file-list="showFileList"
  >
    <slot>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件到此处
        <em>或点击上传</em>
      </div>
    </slot>
    <template #tip v-if="showTip">
      <div class="el-upload__tip">
        <slot name="tip">
          {{ tipText }}
        </slot>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';
  import type { UploadRawFile, UploadFile } from 'element-plus';
  import { platformApi, PlatformApi } from '@/api';

  interface Props {
    modelValue?: any[];
    directory?: string;
    accept?: string;
    sizeLimit?: number;
    limit?: number;
    multiple?: boolean;
    disabled?: boolean;
    showFileList?: boolean;
    showTip?: boolean;
    tipText?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    directory: 'default-upload',
    accept: '',
    sizeLimit: 10 * 1024 * 1024,
    limit: 1,
    multiple: false,
    disabled: false,
    showFileList: true,
    showTip: true,
    tipText: '支持拖拽上传或点击上传',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', val: any[]): void;
    (e: 'success', ossKey: string, file: any): void;
    (e: 'change', fileList: any[]): void;
  }>();

  const fileList = ref<any[]>(props.modelValue || []);

  watch(
    () => props.modelValue,
    (val) => {
      fileList.value = val || [];
    },
    { deep: true }
  );

  watch(
    fileList,
    (val) => {
      emit('update:modelValue', val);
      emit('change', val);
    },
    { deep: true }
  );

  const oss = reactive<PlatformApi.PlatformOssQueryOssTempPolicy.ResponseBody>({
    host: '',
    key: '',
    ossAccessKeyId: '',
    policy: '',
    signature: '',
  });

  const ossMap: Record<string, any> = {};
  const ossData = computed(() => omit(oss, ['host']));

  const handleBeforeUpload = async (rawFile: UploadRawFile) => {
    if (props.accept) {
      const extension = props.accept.split(',');
      const tmp = rawFile.name.split('.');
      let suffix = '';
      if (tmp.length >= 2) {
        suffix = `.${tmp[tmp.length - 1]}`;
      }
      if (!extension.includes(suffix)) {
        ElMessage.error('文件类型不支持');
        return false;
      }
    }

    if (props.sizeLimit && rawFile.size > props.sizeLimit) {
      ElMessage.error(`文件大小不能超过 ${Math.floor(props.sizeLimit / 1024 / 1024)}M`);
      return false;
    }

    try {
      const res = await platformApi.platformOssQueryOssTempPolicy({
        directory: props.directory,
        filename: encodeURIComponent(rawFile.name),
      });
      Object.assign(oss, res);
      ossMap[rawFile.name] = res;
      return true;
    } catch (error) {
      console.error( error);
      return false;
    }
  };

  const handleSuccess = (_: any, uploadFile: any) => {
    const ossInfo = ossMap[uploadFile.name] || {};
    uploadFile.ossKey = ossInfo.key;
    ElMessage.success('上传成功');
    emit('success', ossInfo.key, uploadFile);
  };

  const handleError = (error: Error) => {
    ElMessage.error('上传失败');
    console.error(error);
  };

  const handleExceed = () => {
    ElMessage.error(`上传文件数量不能超过 ${props.limit} 个`);
  };

  const handleRemove = (file: UploadFile) => {
    const index = fileList.value.findIndex((f) => f.uid === file.uid);
    if (index > -1) {
      fileList.value.splice(index, 1);
    }
  };

  const clearFiles = () => {
    fileList.value = [];
  };

  defineExpose({
    clearFiles,
    fileList,
  });
</script>

<style scoped lang="scss">
  .keen-drag-upload {
    width: 100%;
  }
</style>

