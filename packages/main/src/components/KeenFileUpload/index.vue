<template>
  <div class="upload-container">
    <el-upload
      :action="oss.host"
      :data="ossData"
      :show-file-list="showFileList"
      :before-upload="handleBeforeUpload"
      :disabled="disabled"
      v-model:file-list="fileList"
      :limit="limit"
      :on-success="handleSuccess"
      :accept="accept"
      :on-exceed="handleExceed"
      :on-progress="handleProgress"
      :multiple="multiple"
      ref="uploadRef"
      :on-preview="handlePreview"
      :on-error="handleError"
      class="upload-wrap"
    >
      <slot></slot>
    </el-upload>
    <!-- fileList展示 -->
    <!--    <ul
      class="el-upload-list el-upload-list&#45;&#45;text"
      v-if="showFileList && fileList?.length"
      :style="uploadListStyle"
    >
      <li
        class="el-upload-list__item is-success"
        tabindex="0"
        v-for="(file, index) in fileList"
        :key="index"
      >
        <template v-if="file.isEdit">
          <el-space>
            <el-input
              maxlength="500"
              v-model="inputFileName"
              class="file-name"
              :disabled="disabled"
            />
            &lt;!&ndash; 确认编辑 &ndash;&gt;
            <div
              class="action-button btn btn-sm btn-icon btn-light-primary btn-active-primary confirm-file"
              @click="confirmFileName(file)"
            >
              <SvgIcon icon="arrows-arr085" class="svg-icon svg-icon-1" />
            </div>
            &lt;!&ndash; 取消编辑 &ndash;&gt;
            <div
              class="action-button btn btn-sm btn-icon btn-light-danger btn-active-danger cancel-file"
              @click="cancelFileName(file)"
            >
              <SvgIcon icon="arrows-arr088" class="svg-icon svg-icon-1" />
            </div>
          </el-space>
        </template>
        <template v-else>
          <div class="el-upload-list__item-info" @click.stop.prevent="handleEditFileName(file)">
            <a
              class="el-upload-list__item-name"
              :style="{ textAlign: overflowHidden ? 'center' : 'left' }"
            >
              <SvgIcon class="el-icon el-icon&#45;&#45;document unknown" :class="(file as any).suffix" />
              <span
                :class="{ 'el-upload-list__item-file-name': overflowHidden }"
                :title="file.name"
                :style="{ overflowWrap: overflowHidden ? 'break-word' : 'anywhere' }"
              >
                {{ file.name }}
              </span>
              <el-progress
                :percentage="file.percentage"
                status="success"
                class="process"
                v-if="file.percentage < 100"
              />
            </a>
          </div>
          <label class="el-upload-list__item-status-label" v-if="+file.percentage === 100">
            &lt;!&ndash; 去掉对 图标 &ndash;&gt;
            &lt;!&ndash; <SvgIcon
              icon="uploadSuccess"
              class="el-icon el-icon&#45;&#45;upload-success el-icon&#45;&#45;circle-check"
            /> &ndash;&gt;
          </label>
          &lt;!&ndash; <SvgIcon
            icon="iconClose"
            class="el-icon el-icon&#45;&#45;close"
            @click="handleDelFile(index)"
            v-if="!disabled"
          /> &ndash;&gt;
          <SvgIcon
            class="iconfont icon-shanchu el-icon&#45;&#45;close"
            @click="handleDelFile(index)"
            v-if="!disabled"
          />
          <template v-if="showOperate || manual">
            <SvgIcon icon="preview" class="preview-file" @click="preViewFile(file)" />
            <SvgIcon icon="download" class="download-file" @click="downloadFile(file)" />
          </template>
        </template>
      </li>
    </ul>-->
  </div>
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :fileName="fileName"
    @close="handlePreviewClose"
  />
</template>

<script lang="ts" setup>
  import { genFileId, ElMessage } from 'element-plus/es';
  import { omit } from 'lodash-es';
  import type { UploadRawFile, UploadFile, UploadUserFile } from 'element-plus';
  import axios from 'axios';
  import { download } from '@/utils/download';

  import mammoth from 'mammoth';
  import { platformApi, PlatformApi } from '@/api';

  type UploadFileType = UploadUserFile & {
    ossKey?: string;
  };

  const props = withDefaults(
    defineProps<{
      modelValue: UploadFileType[];
      directory: string;
      accept?: string;
      sizeLimit?: number;
      disabled?: boolean;
      multiple?: boolean;
      showFileList?: boolean;
      limit?: number;
      isPublic?: boolean;
      isNeedThumbnail?: boolean;
      uploadListStyle?: object; // 控制文件列表样式
      showOperate?: boolean; // 是否展示操作按钮
      overflowHidden?: boolean; // 文件名超出是否超出隐藏
      isValidateFileName?: boolean; // 是否过滤文件名称-特殊字符
      manual?: boolean; // 新增，手动模式 支持外部传入filelist
      validSameFile?: boolean; // 校验同名文件
      existedFiles?: string[]; // 要校验的文件名
    }>(),
    {
      limit: 1,
      sizeLimit: 0,
      multiple: false,
      showFileList: true,
      isPublic: false,
      isNeedThumbnail: true,
      showOperate: false,
      overflowHidden: true,
      isValidateFileName: false,
      manual: false,
    }
  );
  const emit = defineEmits<{
    (e: 'update:modelValue', val: UploadFileType[]);
    (e: 'success', val, file: UploadFileType);
    (e: 'change', val, file: UploadFileType);
    (e: 'preview', val);
    (e: 'uploadThumbnailSuccess', val);
    (e: 'uploadThumbnailFail', val);
    (e: 'change', val);
    (e: 'fileNameClick');
    (e: 'fileDelete', val);
  }>();

  const fileList = ref<UploadFileType[]>(props.modelValue);

  watch(
    () => fileList.value,
    (v) => {
      emit('update:modelValue', v);
      emit('change', v);
    },
    {
      deep: true,
      immediate: true,
    }
  );

  if (props.manual) {
    watch(
      () => props.modelValue,
      (val) => {
        fileList.value = val || [];
      },
      { deep: true, immediate: true }
    );
  }

  watchEffect(() => {
    fileList.value?.forEach((item: any) => {
      item.suffix = 'unknown';
      const tmp = item.name.split('.');
      if (tmp.length >= 2) {
        item.suffix = tmp[tmp.length - 1];
      }
    });
    // // console.log(fileList.value);
  });

  const oss = reactive<PlatformApi.PlatformOssQueryOssTempPolicy.ResponseBody>({
    host: '',
    key: '',
    ossAccessKeyId: '',
    policy: '',
    signature: '',
  });

  const handleProgress = (event: any, file: any, files: any) => {
    files.forEach((element: any) => {
      if (element.uid === file.uid) {
        file.percentage = event.percent;
      }
    });
  };

  const ossMap = {};
  const ossData = computed(() => omit(oss, ['host']));
  const isVideo = ref(false);
  const handleBeforeUpload = async (rawFile: UploadRawFile) => {
    // 新增：校验文件是否已上传
    if (props.validSameFile && props.existedFiles?.some((f) => f === rawFile.name)) {
      ElMessage.error(`${rawFile.name}文件已上传，不允许重复上传`);
      return Promise.reject(new Error('该文件已上传，不允许重复上传'));
    }
    // 超过限制时不再上传
    if (isOverLimit.value) {
      isOverLimit.value = false;
      return false;
    }
    // 如果需要校验，校验文件名是否包含特殊字符和空格
    const isValidString = /[$@#%& ]/.test(rawFile.name);
    if (props.isValidateFileName && isValidString) {
      ElMessage.error('文件名不能包含空格或者特殊字符[$@#%&]');
      return Promise.reject(new Error('文件名不能包含空格或者特殊字符[$@#%&]'));
    }

    // console.log('beforeUpload——————————start');
    if (props.accept) {
      const extension = props.accept.split(',');
      const tmp = rawFile.name.split('.');
      let suffix = '';
      if (tmp.length >= 2) {
        suffix = `.${tmp[tmp.length - 1]}`;
      }
      // // console.log(extension, rawFile, suffix);
      if (!extension.includes(suffix)) {
        ElMessage.error('文件类型不支持');
        return Promise.reject(new Error('文件类型不支持'));
      }
    }
    if (props.sizeLimit && rawFile.size > props.sizeLimit) {
      ElMessage.error('文件大小超过限制');
      return Promise.reject(new Error('文件大小超过限制'));
    }
    const videoType = [
      'mpg',
      'mpeg',
      'mpe',
      'mpv',
      'avi',
      'asf',
      'wmv',
      'mov',
      '3gp',
      '3g2',
      'rm',
      'rmvb',
      'flv',
      'f4v',
      'mp4',
    ];
    const fileType = rawFile.name.split('.')[1] && rawFile.name.split('.')[1].toLocaleLowerCase();

    isVideo.value = videoType.includes(fileType);
    // 视频存到公共桶，其余存到临时桶
    const queryApi =
      props.isPublic && isVideo.value
        ? 'platformOssQueryOssPublicPolicy'
        : 'platformOssQueryOssTempPolicy';
    const res = await platformApi[queryApi]({
      directory: props.directory,
      filename: props.isPublic && isVideo.value ? rawFile.name : encodeURIComponent(rawFile.name),
    });
    if (isVideo.value && props.isNeedThumbnail) {
      try {
        getVideoFirstFrame(rawFile, res.key);
      } catch (err) {
        console.error(err);
      }
    }
    Object.assign(oss, res);
    ossMap[rawFile.name] = res;
    // console.log('beforeUpload——————————result', res);
    // console.log('beforeUpload——————————end');
    return true;
  };

  const handleSuccess = (_: any, uploadFile: UploadFileType) => {
    const ossInfo = ossMap[uploadFile.name] || {};
    // // console.log('Upload handleSuccess start', '进入sucess 赋值osskey', ossInfo);
    // eslint-disable-next-line no-param-reassign
    uploadFile.ossKey = ossInfo.key;
    // 将视频的缩略图放进去

    if (isVideo.value) {
      fileList.value.forEach((item) => {
        if (thumbnailMap.value[item.ossKey]) {
          item.thumbnailKey = thumbnailMap.value[item.ossKey].ossKey;
        }
      });
    }
    // // console.log(fileList.value);
    emit('success', uploadFile.ossKey, uploadFile);
    // // console.log(_, uploadFile);
  };
  const handlePreview = (uploadFile: UploadFile) => {
    emit('preview', uploadFile);
  };
  const uploadRef = ref();
  const isOverLimit = ref(false);
  const handleExceed = (files) => {
    // console.log('Upload handleExceed start', files);
    // 判断文件数量是否超过限制
    if (files.length + fileList.value.length > props.limit && props.limit > 1) {
      isOverLimit.value = true;
      ElMessage.error(`上传文件数量不能超过 ${props.limit} 个`);
      return;
    }
    uploadRef.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    uploadRef.value!.handleStart(file);
    uploadRef.value!.submit();
  };
  const handleError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFile) => {
    // console.log('上传失败', error, uploadFile, uploadFiles);
    throw error;
  };

  const thumbnailKey = ref('');
  const thumbnailMap = ref({});
  // 获取视频第一帧
  const getVideoFirstFrame = (file, key) => {
    thumbnailKey.value = key;
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url;

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0.1; // 设置时间，确保能正确抓取到第一帧
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob: any) => {
        const frameName = `frame-${file.name}.png`;
        // 上传缩列图
        uploadThumbnail(blob, frameName);
      }, 'image/png');
    });
  };

  //  上传缩列图
  const uploadThumbnail = async (blob, frameName) => {
    const res: any = await platformApi.platformOssQueryOssTempPolicy({
      directory: props.directory,
      filename: frameName,
    });
    if (res.key) {
      const formData = new FormData();
      const instance = axios.create({
        baseURL: res.host,
      });
      formData.append('key', res.key);
      formData.append('ossAccessKeyId', res.ossAccessKeyId);
      formData.append('policy', res.policy);
      formData.append('signature', res.signature);
      formData.append('provider', res.provider);
      formData.append('bucket', res.bucket);
      formData.append('success_action_status', res.success_action_status);
      formData.append('file', blob, frameName);
      // 使用这个实例来发起请求
      instance
        .post('/', formData)
        .then(() => {
          if (!thumbnailMap.value[thumbnailKey.value]) {
            thumbnailMap.value[thumbnailKey.value] = {
              ossKey: res.key,
              fileName: frameName,
            };
          }
          emit('uploadThumbnailSuccess', {
            thumbnailKey: thumbnailKey.value,
            ossKey: res.key,
            fileName: frameName,
          });
        })
        .catch(() => {
          emit('uploadThumbnailFail', {
            thumbnailKey: thumbnailKey.value,
            ...res,
          });
        });
    }
  };
  const inputFileName = ref('');
  // 修改名称
  const handleEditFileName = (file) => {
    if (props.manual) return;
    if (props.showOperate && +file.percentage === 100 && !props.disabled) {
      file.oldName = file.name;
      file.extType = file.name.split('.')[1];
      inputFileName.value = file.name.split('.').slice(0, -1).join('.');
      file.isEdit = true;
    }
    emit('fileNameClick');
  };
  // 确定修改
  const confirmFileName = (file) => {
    file.isEdit = false;
    file.name = `${inputFileName.value}.${file.extType}`;
  };
  // 取消修改
  const cancelFileName = (file) => {
    file.name = file.oldName;
    file.isEdit = false;
  };

  // 删除文件
  const handleDelFile = (index) => {
    fileList.value.splice(index, 1);
    if (props.manual) {
      emit('fileDelete', index);
    }
  };

  const previewVisible = ref(false);
  const fileUrl = ref('');
  const fileName = ref('');
  // 预览
  const preViewFile = async (file) => {
    await setFileUrl(file);
    if (fileUrl.value) {
      fileName.value = file.name;
      previewVisible.value = true;
    } else {
      ElMessage.error('获取完整路径失败，请重试');
    }
  };
  // 下载
  const downloadFile = async (file) => {
    await setFileUrl(file);
    if (fileUrl.value) {
      download(fileUrl.value, file.name);
    } else {
      ElMessage.error('获取完整路径失败，请重试');
    }
  };
  // 设置完整url
  const setFileUrl = async (file) => {
    const data = ossMap[file.name] || {};
    if (data.host && data.key) {
      fileUrl.value = `${data.host}/${data.key}`;
    } else {
      const res: any = await platformApi.platformQueryUrl({ ossKey: file.ossKey || file.key });
      fileUrl.value = res.url || '';
    }
  };

  const handlePreviewClose = () => {
    previewVisible.value = false;
    fileUrl.value = '';
  };

  // 解析视频文件时长
  const fileRef = ref();
  const parseFile = () => {
    const file = fileRef.value.files[0];
    // console.log(file);
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        mammoth
          .extractRawText({ arrayBuffer })
          .then(function (result) {
            // console.log(result.value);
          })
          .catch(function (error) {
            console.error(error);
          });
      };
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target.result;
        // console.log(contents);
      };
      reader.readAsText(file);
    } else if (['video/mp4', 'video/ogg', 'audio/mpeg', 'video/x-matroska'].includes(file.type)) {
      const path = URL.createObjectURL(file);
      const video = document.createElement('video');

      video.addEventListener('loadedmetadata', function () {
        // console.log(video);
        const { duration } = video;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        // console.log(`视频时长: ${minutes}分${seconds}秒`);
        URL.revokeObjectURL(path);
      });
      video.addEventListener('error', (e) => {
        // 加载失败也需要回收一下
        URL.revokeObjectURL(path);
      });
      video.src = path;
      video.load();
    }
  };

  const clearFile = () => {
    uploadRef.value?.clearFiles();
  };

  defineExpose({
    uploadRef,
    clearFile,
  });
</script>

<style scoped lang="scss">
  .upload-container {
    width: 100%;
    overflow: hidden;
    line-height: 36px;
  }
  .upload-wrap {
    width: 100%;
  }
  .el-upload-list {
    width: 90%;
    &:has(.tools) {
      width: calc(100% - 60px);
    }
  }
  .el-upload-list:hover {
    background: none !important;
  }
  .el-upload-list--text {
    max-width: 440px;
    // min-width: 400px;
    margin-bottom: 0.75rem;
  }
  .unknown {
    background-size: 14px;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('@/assets/images/icon_unknown.svg');
    margin-left: 2px;
  }
  .xls,
  .xlsx {
    background-image: url('@/assets/images/icon_xlsx.svg');
  }
  .pptx,
  .pptx {
    background-image: url('@/assets/images/icon_pptx.svg');
  }
  .pdf {
    background-image: url('@/assets/images/icon_pdf.svg');
  }
  .txt {
    background-image: url('@/assets/images/icon_txt.svg');
  }
  .docx,
  .doc {
    background-image: url('@/assets/images/icon_docx.svg');
  }
  .jpg,
  .jpeg,
  .png,
  .svg {
    background-image: url('@/assets/images/icon_img.svg');
  }
  .zip,
  .gzip,
  .rar,
  .zip,
  .gz,
  .bz,
  .tar {
    background-image: url('@/assets/images/icon_yasuo.svg');
  }
  .el-upload-list {
    border-radius: 8px;
    color: #1f1f1f;
    .el-upload-list__item-name {
      color: #1f1f1f;
      font-size: 12px !important;
    }
    .el-upload-list__item.is-success {
      background-color: #f5f5f5 !important;
      border-radius: 8px;
      height: 36px;
      margin-bottom: 6px;
      &:has(.el-progress) {
        height: 50px;
      }
      .el-progress {
        top: 25px;
      }
      &:hover {
        background-color: #f5f5f5 !important;
      }
    }
  }
  .file-name {
    min-width: 380px;
  }
  .process {
    width: 94% !important;
    :deep(.el-progress__text) {
      display: none;
    }
    :deep(.el-progress-bar__outer) {
      height: 4px !important;
      margin-top: 11px;
    }
  }
  .preview-file {
    font-size: 12px;
    position: absolute;
    right: -25px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer;
    :deep(svg) {
      width: 15px !important;
      height: 15px !important;
    }
  }
  .download-file {
    font-size: 12px;
    position: absolute;
    right: -55px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer;
    :deep(svg) {
      width: 12px !important;
      height: 12px !important;
    }
  }
  .confirm-file {
    position: absolute;
    right: -40px;
    top: 4px;
  }
  .cancel-file {
    position: absolute;
    top: 4px;
    right: -80px;
  }
</style>
