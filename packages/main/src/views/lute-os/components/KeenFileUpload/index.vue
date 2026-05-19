<template>
  <div class="upload-container">
    <el-upload
      :action="oss.host"
      :data="ossData"
      :show-file-list="false"
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
      :drag="drag"
    >
      <slot></slot>
    </el-upload>
    <!-- fileList展示 -->
    <ul
      class="el-upload-list el-upload-list--text"
      v-if="showFileList && fileList?.length"
      :style="Object.assign({ width: showOperate ? 'calc(90% - 50px)' : '90%' }, uploadListStyle)"
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
            <!-- 确认编辑 -->
            <div
              class="action-button btn btn-sm btn-icon btn-light-primary btn-active-primary confirm-file"
              @click="confirmFileName(file)"
            >
              <SvgIcon icon="arrows-arr085" class="svg-icon svg-icon-1" />
            </div>
            <!-- 取消编辑 -->
            <div
              class="action-button btn btn-sm btn-icon btn-light-danger btn-active-danger cancel-file"
              @click="cancelFileName(file)"
            >
              <SvgIcon icon="arrows-arr088" class="svg-icon svg-icon-1" />
            </div>
          </el-space>
        </template>
        <template v-else>
          <div class="el-upload-list__item-info" @click="handleEditFileName(file)">
            <a
              class="el-upload-list__item-name"
              :style="{ textAlign: overflowHidden ? 'center' : 'left' }"
            >
              <SvgIcon icon="iconDocument" class="el-icon el-icon--document" />
              <span
                :class="{ 'el-upload-list__item-file-name': overflowHidden }"
                :title="file.name"
                :style="{
                  overflowWrap: overflowHidden ? 'break-word' : 'anywhere',
                }"
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
            <SvgIcon
              icon="uploadSuccess"
              class="el-icon el-icon--upload-success el-icon--circle-check"
            />
          </label>
          <SvgIcon
            icon="iconClose"
            class="el-icon el-icon--close"
            @click="handleDelFile(index)"
            v-if="!disabled && (!props.localDeleteOnly || file.raw)"
          />
          <template v-if="showOperate">
            <div class="file-ops" role="group" aria-label="文件操作">
              <button v-if="allowPreview" type="button" class="file-op" @click="preViewFile(file)">
                <SvgIcon icon="preview" class="op-icon" />
                <span class="op-label">预览</span>
              </button>

              <button v-if="allowDownload" type="button" class="file-op" @click.stop="downloadFile(file)">
                <SvgIcon icon="download" class="op-icon" />
                <span class="op-label">下载</span>
              </button>

              <span v-if="!allowPreview && !allowDownload" class="file-ops-tip">
                {{ disabledOperateTip }}
              </span>
            </div>
          </template>
        </template>
      </li>
    </ul>
  </div>
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :key="fileUrl"
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
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
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
      showOperate: boolean; // 是否展示操作按钮
      overflowHidden?: boolean; // 文件名超出是否超出隐藏
      isValidateFileName?: boolean; // 是否过滤文件名称-特殊字符
      drag?: boolean; // 是否开启拖拽上传
      localDeleteOnly?: boolean; // 是否仅本地文件可删除
      allowPreview?: boolean;
      allowDownload?: boolean;
      disabledOperateTip?: string;
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
      drag: false,
      localDeleteOnly: false,
      allowPreview: true,
      allowDownload: true,
      disabledOperateTip: '暂无权限查看该文件',
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

  watch(
    () => props.modelValue,
    (v) => {
      fileList.value = v;
    },
    {
      deep: true,
    }
  );

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

    console.log('beforeUpload——————————start');
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
    console.log('beforeUpload——————————result', res);
    console.log('beforeUpload——————————end');
    return true;
  };

  const handleSuccess = (_: any, uploadFile: UploadFileType) => {
    const ossInfo = ossMap[uploadFile.name] || {};
    console.log('Upload handleSuccess start', '进入sucess 赋值osskey', ossInfo);
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
    if (props.localDeleteOnly) {
      uploadFile['localDeleteOnly'] = true; // 仅本地文件加标识
    }
    console.log(fileList.value);
    emit('success', uploadFile.ossKey, uploadFile);
    console.log(_, uploadFile);
  };
  const handlePreview = (uploadFile: UploadFile) => {
    emit('preview', uploadFile);
  };
  const uploadRef = ref();
  const isOverLimit = ref(false);
  const handleExceed = (files) => {
    console.log('Upload handleExceed start', files);
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
    console.log('上传失败', error, uploadFile, uploadFiles);
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
  };

  const previewVisible = ref(false);
  const fileUrl = ref('');
  const fileName = ref('');
  // 预览
  const preViewFile = async (file) => {
    if (!props.allowPreview) {
      ElMessage.warning(props.disabledOperateTip);
      return;
    }
    const isResolved = await setFileUrl(file);
    console.log(fileUrl.value);
    if (fileUrl.value) {
      fileName.value = file.name;
      previewVisible.value = true;
    } else if (isResolved) {
      ElMessage.error('获取完整路径失败，请重试');
    }
  };
  // 下载
  const downloadFile = async (file) => {
    if (!props.allowDownload) {
      ElMessage.warning(props.disabledOperateTip);
      return;
    }
    const isResolved = await setFileUrl(file);
    if (fileUrl.value) {
      download(fileUrl.value, file.name);
    } else if (isResolved) {
      ElMessage.error('获取完整路径失败，请重试');
    }
  };
  // 设置完整url
  const setFileUrl = async (file) => {
    fileUrl.value = '';
    const data = ossMap[file.name] || {};
    if (data.host && data.key) {
      fileUrl.value = `${data.host}/${data.key}`;
      return true;
    } else {
      try {
        const res: any = await platformApi.platformQueryUrl({ ossKey: file.ossKey || file.key });
        fileUrl.value = res.url || '';
        return true;
      } catch (error) {
        console.error('获取完整路径失败', error);
        ElMessage.warning(props.disabledOperateTip);
        return false;
      }
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
    console.log(file);
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        mammoth
          .extractRawText({ arrayBuffer })
          .then(function (result) {
            console.log(result.value);
          })
          .catch(function (error) {
            console.error(error);
          });
      };
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target.result;
        console.log(contents);
      };
      reader.readAsText(file);
    } else if (['video/mp4', 'video/ogg', 'audio/mpeg', 'video/x-matroska'].includes(file.type)) {
      const path = URL.createObjectURL(file);
      const video = document.createElement('video');

      video.addEventListener('loadedmetadata', function () {
        console.log(video);
        const { duration } = video;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        console.log(`视频时长: ${minutes}分${seconds}秒`);
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
    preViewFile,
  });
</script>

<style scoped lang="scss">
  .upload-container {
    width: 100%;
    overflow: hidden;
  }
  .upload-wrap {
    width: 100%;
  }
  .el-upload-list {
    width: 90%;
  }
  .el-upload-list:hover {
    background: none !important;
  }
  .el-upload-list--text {
    max-width: 440px;
    // min-width: 400px;
    margin-bottom: 0.75rem;
  }
  .el-upload-list__item-file-name {
    display: inline-block; // 或 block
    max-width: 240px; // 给一个固定宽度
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
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
      height: 2px !important;
      margin-top: 11px;
    }
  }
  .preview-file {
    font-size: 12px;
    color: #3e97ff;
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
    color: #3e97ff;
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
  .el-upload-list__item-name {
    cursor: default !important;
  }

  .file-ops {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 12px;
    align-items: center;
    z-index: 2;
  }

  .file-op {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
  }

  .op-label {
    color: #333;
    font-size: 13px;
    font-weight: bold;
    display: inline-block;
  }

  .file-ops-tip {
    color: #909399;
    font-size: 12px;
    line-height: 1.2;
    white-space: nowrap;
  }

  .el-upload-list__item-status-label {
    position: absolute;
    right: 130px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .el-icon.el-icon--close {
    position: absolute;
    right: 130px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    cursor: pointer;
  }
</style>
