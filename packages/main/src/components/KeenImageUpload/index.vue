<template>
  <div v-bind="$attrs">
    <div
      v-show="modelValue?.startsWith('http')"
      class="image-input image-input-empty image-input-outline image-input-placeholder mb-3 img-preview"
      :class="modelValue ? 'no-placeholder' : ''"
      data-kt-image-input="true"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <KeenImagePreview :src="modelValue" :srcList="[modelValue]" :size="size" v-bind="options" />
      <el-upload
        :action="oss.host"
        :data="ossData"
        :show-file-list="false"
        list-type="picture"
        :before-upload="handleBeforeUpload"
        :on-success="handleSuccess"
        :disabled="disabled"
        :accept="accept"
      >
        <label
          v-if="!disabled && (!showPlus || (modelValue || tmpUrl))"
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bs-toggle="tooltip"
          data-kt-image-input-action="change"
          :title="tooltip"
          v-bind="editOptions"
        >
          <i class="bi bi-pencil-fill fs-7"></i>
        </label>
      </el-upload>
    </div>

    <el-upload
      v-show="!modelValue?.startsWith('http')"
      :action="oss.host"
      :data="ossData"
      :show-file-list="false"
      list-type="picture"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :disabled="disabled"
      :accept="accept"
    >
      <div
        class="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
        :class="(modelValue || tmpUrl) ? 'no-placeholder' : ''"
        data-kt-image-input="true"
      >
        <div
          class="image-input-wrapper bgi-position-center min-w-50px min-h-50px d-flex flex-center"
          :class="[`w-${size}px`, `h-${size}px`]"
          :style="{
            'background-image': modelValue?.startsWith('http')
              ? `url(${modelValue})`
              : tmpUrl
              ? `url(${tmpUrl})`
              : undefined,
            'background-size': 'cover',
            width: `${size}px`,
            height: `${size}px`,
          }"
        >
          <i v-if="showPlus && !(modelValue || tmpUrl)" class="bi bi-plus fs-2x" style="color: #02B96B"></i>
        </div>
        <label
          v-if="!disabled && (!showPlus || (modelValue || tmpUrl))"
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-bs-toggle="tooltip"
          data-kt-image-input-action="change"
          :title="tooltip"
          v-bind="editOptions"
        >
          <i class="bi bi-pencil-fill fs-7"></i>
        </label>
      </div>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
  import { omit } from 'lodash-es';
  import type { UploadRawFile, UploadFile } from 'element-plus';

  import { platformApi, PlatformApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue: any;
      directory?: string;
      tooltip?: string;
      accept?: string;
      sizeLimit?: number;
      disabled?: boolean;
      size?: number;
      options?: any;
      editOptions?: any;
      showPlus?: boolean;
    }>(),
    {
      tooltip: '选择图片',
      accept: '.png,.jpg,.jpeg',
      sizeLimit: 0,
      size: 150,
      showPlus: false,
    }
  );
  const emit = defineEmits<{
    (e: 'update:modelValue', val: string);
    (e: 'uploadSuccess', file: Object);
  }>();

  watch(
    () => props.modelValue,
    () => {
      if (!props.modelValue) tmpUrl.value = '';
    },
    {
      deep: true,
    }
  );

  const tmpUrl = ref('');
  const oss = reactive<PlatformApi.PlatformOssQueryOssTempPolicy.ResponseBody>({
    host: '',
    key: '',
    ossAccessKeyId: '',
    policy: '',
    signature: '',
  });
  const ossData = computed(() => omit(oss, ['host']));
  const handleBeforeUpload = async (rawFile: UploadRawFile) => {
    if (props.sizeLimit && rawFile.size > props.sizeLimit) {
      return Promise.reject(new Error('文件大小超过限制'));
    }

    if (!props.directory) {
      return Promise.reject(new Error('请设置上传目录'));
    }

    const res = await platformApi.platformOssQueryOssTempPolicy({
      directory: props.directory,
      filename: rawFile.name,
    });
    Object.assign(oss, res);

    return true;
  };

  const handleSuccess = (_: any, uploadFile: UploadFile) => {
    console.log(uploadFile);
    tmpUrl.value = uploadFile.url!;
    emit('update:modelValue', oss.key!);
    emit('uploadSuccess', {
      ossKey: oss.key,
      name: uploadFile.name,
    });
  };
</script>

<style scoped lang="scss">
  .img-preview {
    display: inline-block;
    box-shadow: var(--bs-box-shadow);

    .el-image {
      border: 3px solid var(--bs-body-bg) !important;
    }

    div {
      height: 0;
    }
  }
</style>
