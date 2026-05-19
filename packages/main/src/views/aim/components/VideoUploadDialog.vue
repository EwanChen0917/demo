<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :width="currentStep === 2 && validationResult?.failedCount === 0 ? '388px' : '640px'"
    class="video-upload-dialog"
    :class="currentStep === 2 && validationResult?.failedCount === 0 ? 'small-dialog' : ''"
  >
    <!-- 弹窗头部 -->
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">{{ currentStep === 1 ? '上传视频' : '数据解析' }}</span>
        <div class="close-btn" @click="handleClose">
          <i class="Root-tyicon icon-Root-tyguanbi"></i>
        </div>
      </div>
      <!-- <div class="header-divider"></div> -->
    </template>

    <!-- 弹窗内容 -->
    <div class="dialog-content">
      <template v-if="currentStep === 1">
        <!-- 选择业务类型行 - 水平布局 -->
        <div class="form-row">
          <div class="form-label">选择业务类型</div>
          <el-select
            v-model="formData.business"
            placeholder="请选择"
            class="business-select"
            :disabled="currentStep > 1"
          >
            <el-option
              v-for="item in businessOptions"
              :key="item.value"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </div>

        <!-- 导入Excel文件行 -->
        <div class="form-row import-row">
          <div class="form-label">导入Excel文件</div>
          <div class="download-template" @click="handleDownloadTemplate">
            <i class="iconfont icon-xiazai"></i>
            <span class="download-text">下载模版</span>
          </div>
        </div>

        <!-- 上传区域 -->
        <div class="upload-section">
          <!-- 拖拽上传区域 - 始终显示 -->
          <div class="upload-area">
            <el-upload
              ref="uploadRef"
              class="upload-dragger"
              drag
              :limit="1"
              :show-file-list="false"
              :http-request="customUpload"
              :before-upload="handleBeforeUpload"
              :disabled="uploadState === 'uploading'"
              accept=".xlsx,.xls"
            >
              <div class="upload-content">
                <div class="upload-text">
                  <span class="upload-text-primary">
                    拖放到此处 /
                    <span style="color: #02b96b">点击上传</span>
                  </span>
                </div>
              </div>
            </el-upload>
            <div class="upload-hint">支持上传xls、xlsx等格式文件</div>
          </div>

          <!-- 上传文件列表 - 独立显示在下方（上传中或上传成功时显示） -->
          <div v-if="uploadState === 'uploading' || uploadedFile" class="uploaded-file-wrap">
            <div class="uploaded-file-item">
              <!-- <i class="Root-tyicon icon-Root-tywenjianjia"></i> -->
              <img src="../assets/images/xlsx-icon.svg" alt="excel" class="xlsx-icon" />
              <span class="file-name">{{ uploadedFile?.name || uploadFileName }}</span>
              <span class="delete-btn" @click="handleDeleteFile">
                <i class="iconfont icon-shanchu"></i>
              </span>
            </div>
            <!-- 上传中进度条 -->
            <div v-if="uploadState === 'uploading'" class="upload-progress-bar">
              <div class="progress-wrapper">
                <el-progress :percentage="uploadProgress" :show-text="false" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 后端校验错误列表 -->
      <div v-if="currentStep === 2" class="validation-result">
        <template v-if="validationResult?.failedCount > 0">
          <div class="validation-summary">
            文件数据共
            <span class="color-success">{{ validationResult.total }}</span>
            条，有效数据
            <span class="color-success">{{ validationResult.succeededCount }}</span>
            条，无效数据
            <span class="color-failed">{{ validationResult.failedCount }}</span>
            条，原因如下：
          </div>
          <div class="error-table-wrapper">
            <el-table :data="validationResult.failedData" max-height="600">
              <el-table-column type="index" label="序号" width="60" />
              <el-table-column prop="fileUrl" label="视频地址" min-width="200">
                <template #default="{ row }">
                  <div class="file-url-cell">
                    <el-tooltip :content="row.fileUrl" placement="top" :disabled="!row.fileUrl">
                      <span class="file-url-text" @click="openVideoUrl(row.fileUrl)">
                        {{ row.fileUrl }}
                      </span>
                    </el-tooltip>
                    <Copy :content="row.fileUrl" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="failResult"
                label="无效原因"
                min-width="150"
                show-overflow-tooltip
              />
            </el-table>
          </div>
        </template>
        <template v-else>
          <div class="validation-summary">
            文件数据共
            <span class="color-success">{{ validationResult.total }}</span>
            条，均为有效数据，是否确认上传？
          </div>
        </template>
      </div>
    </div>

    <!-- 弹窗底部 -->
    <template #footer>
      <div class="dialog-footer">
        <!-- 步骤1：上传文件 -->
        <template v-if="currentStep === 1">
          <el-button @click="handleClose">取消</el-button>
          <el-button
            type="primary"
            :loading="submitLoading"
            :disabled="!formData.business || !uploadFileUrl"
            @click="handleNext"
          >
            下一步
          </el-button>
        </template>
        <!-- 步骤2：校验结果 -->
        <template v-else-if="currentStep === 2">
          <el-button @click="handleBack">上一步</el-button>
          <!-- <el-button size="small" @click="handleBack" v-if="validationResult?.failedCount > 0">
            上一步
          </el-button> -->
          <!-- <el-button size="small" @click="handleClose" v-else>取消</el-button> -->
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="handleNext"
            :disabled="validationResult?.succeededCount <= 0"
          >
            立即上传 {{ validationResult.succeededCount }}
          </el-button>
        </template>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
  import Copy from '@/components/Copy/index.vue';
  import { ElMessage, ElLoading, ElNotification } from 'element-plus';
  import { debounce } from 'lodash-es';
  import { useRouter } from 'vue-router';
  import type { UploadProps, UploadInstance, UploadRequestOptions } from 'element-plus';
  import { videoAnalysisApi, VideoAnalysisApi } from '@/api/index';
  import { platformApi, productFileApi } from '@/api';
  import { urlDownload } from '@/utils/videoDownload';
  import type {
    VideoBusinessBean,
    VideoImportExcelBean,
    ImportDataResp,
  } from '@/api/videoAnalysis/data-contracts';
  import { getCookieToken } from '@/hooks/web/useCookie';

  // Props 和 Emits
  interface Props {
    visible: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'success'): void;
  }>();

  const router = useRouter();

  // 对话框可见性
  const dialogVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
  });

  // 引用
  const uploadRef = ref<UploadInstance>();

  // 状态
  const currentStep = ref(1); // 1: 上传步骤, 2: 校验结果步骤
  const uploadState = ref<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const uploadProgress = ref(0);
  const uploadFileName = ref('');
  const uploadFileUrl = ref('');
  const submitLoading = ref(false);

  // 存储通知实例，用于跳转时关闭
  let endNotificationInstance: ReturnType<typeof ElNotification> | null = null;

  // 已上传成功的文件信息（与上传中状态分开管理）
  const uploadedFile = ref<{ name: string; url: string } | null>(null);

  // 业务类型选项
  const businessOptions = ref<VideoBusinessBean[]>([]);

  // 表单数据
  const formData = reactive({
    business: '',
  });

  // 表单错误
  const formErrors = reactive({
    business: '',
    file: '',
  });

  // 后端校验结果
  interface ValidationResult {
    total: number;
    succeededCount: number;
    failedCount: number;
    recordCode: string;
    succeededData: any[];
    failedData: any[];
  }
  const validationResult = ref<ValidationResult>({
    total: 0,
    succeededCount: 0,
    failedCount: 0,
    recordCode: '',
    succeededData: [],
    failedData: [],
  });

  // 监听弹窗打开，获取业务类型选项
  watch(
    () => props.visible,
    async (val) => {
      if (val) {
        resetForm();
        await fetchBusinessOptions();
      }
    }
  );

  // 获取业务类型选项
  async function fetchBusinessOptions() {
    if (businessOptions.value.length) return;
    try {
      const res = await videoAnalysisApi.luteosAiVideoAnalysisGetImportLable();
      businessOptions.value = res.videoBusiness || [];
    } catch (error) {
      console.error('获取业务类型选项失败', error);
    }
  }

  // 重置表单
  function resetForm() {
    currentStep.value = 1;
    uploadState.value = 'idle';
    uploadProgress.value = 0;
    uploadFileName.value = '';
    uploadFileUrl.value = '';
    uploadedFile.value = null;
    formData.business = '';
    formErrors.business = '';
    formErrors.file = '';
    validationResult.value = {
      total: 0,
      succeededCount: 0,
      failedCount: 0,
      recordCode: '',
      succeededData: [],
      failedData: [],
    };
  }

  // 关闭弹窗
  function handleClose() {
    dialogVisible.value = false;
    resetForm();
  }

  // 返回上一步
  function handleBack() {
    currentStep.value = 1;
  }

  const loading = ref(false);
  // 当前上传文件的 OSS key
  const currentOssKey = ref('');

  // 文件上传前校验(仅做格式和大小校验)
  const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
    // 校验文件格式
    const fileName = file.name;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    const validExtensions = ['.xlsx', '.xls'];

    if (!validExtensions.includes(fileExtension)) {
      ElMessage.error('文件格式不正确,仅支持 .xlsx 或 .xls 格式!');
      return false;
    }

    // 校验文件大小
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      ElMessage.error('文件大小不能超过 10MB!');
      return false;
    }

    return true;
  };

  // 自定义上传方法，确保使用最新的 OSS 凭证
  const customUpload = async (options: UploadRequestOptions) => {
    const { file, onProgress, onSuccess, onError } = options;

    uploadState.value = 'uploading';
    uploadFileName.value = file.name;
    uploadProgress.value = 0;
    formErrors.file = '';
    loading.value = true;

    try {
      // 1. 先获取 OSS 临时凭证
      const ossRes = await platformApi.platformOssQueryOssTempPolicy({
        directory: 'aim/temp',
        filename: file.name,
      });

      if (!ossRes || !ossRes.host) {
        throw new Error('获取上传凭证失败');
      }

      // 保存 key 用于后续获取文件 URL
      currentOssKey.value = ossRes.key || '';

      // 2. 构建 FormData
      const formData = new FormData();
      formData.append('key', ossRes.key || '');
      formData.append('OSSAccessKeyId', ossRes.ossAccessKeyId || '');
      formData.append('policy', ossRes.policy || '');
      formData.append('signature', ossRes.signature || '');
      formData.append('file', file);

      // 3. 使用 fetch 上传（注意：fetch 不支持上传进度监控）
      // const response = await fetch(ossRes.host!, {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (response.ok) {
      //   loading.value = false;
      //   uploadState.value = 'success';
      //   uploadProgress.value = 100;
      //   // OSS 上传成功后，文件 URL 就是 host + key
      //   uploadFileUrl.value = currentOssKey.value;
      //   // 更新已上传文件信息
      //   uploadedFile.value = {
      //     name: file.name,
      //     url: currentOssKey.value,
      //   };
      //   // 清空 el-upload 内部文件列表，允许重新选择文件
      //   uploadRef.value?.clearFiles();
      //   ElMessage.success('文件上传成功');
      //   onSuccess(response);
      // } else {
      //   throw new Error('上传失败');
      // }

      // 3. 使用 XHR 上传（支持上传进度监控）
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          uploadProgress.value = percent;
          onProgress({ percent } as any);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          loading.value = false;
          uploadState.value = 'success';
          uploadProgress.value = 100;
          // OSS 上传成功后，文件 URL 就是 host + key
          uploadFileUrl.value = currentOssKey.value;
          // 更新已上传文件信息
          uploadedFile.value = {
            name: file.name,
            url: uploadFileUrl.value,
          };
          // 清空 el-upload 内部文件列表，允许重新选择文件
          uploadRef.value?.clearFiles();
          ElMessage.success('文件上传成功');
          onSuccess(xhr.response);
        } else {
          handleUploadError(new Error('上传失败'));
        }
      };

      xhr.onerror = () => {
        handleUploadError(new Error('网络错误'));
      };

      const handleUploadError = (error: Error) => {
        loading.value = false;
        uploadState.value = 'idle';
        uploadRef.value?.clearFiles();
        // ElMessage.error(error?.message || '文件上传失败');
        onError(error as any);
      };

      xhr.open('POST', ossRes.host!);
      xhr.send(formData);
    } catch (error: any) {
      loading.value = false;
      uploadState.value = 'idle';
      // 清空 el-upload 内部文件列表，允许重新选择文件
      uploadRef.value?.clearFiles();
      // ElMessage.error(error?.message || '文件上传失败');
      onError(error);
    }
  };

  // 删除已上传文件
  function handleDeleteFile() {
    uploadState.value = 'idle';
    uploadProgress.value = 0;
    uploadFileName.value = '';
    uploadFileUrl.value = '';
    uploadedFile.value = null;
  }

  // 下载导入模板
  const downloadLoading = ref(false);
  async function handleDownloadTemplate() {
    downloadLoading.value = true;
    try {
      const res = await productFileApi.luteosAiFileQueryImportTemplate({
        importScene: 'advertising_video_import',
      });
      urlDownload(res.templateUrl as string);
    } catch (error: any) {
      ElMessage.error(error?.message || '下载模板失败');
    } finally {
      downloadLoading.value = false;
    }
  }

  // 表单校验
  function validateForm(): boolean {
    let isValid = true;
    formErrors.business = '';
    formErrors.file = '';

    if (!formData.business) {
      formErrors.business = '请选择业务类型';
      isValid = false;
    }

    if (!uploadedFile.value) {
      formErrors.file = '请上传文件';
      isValid = false;
    }

    return isValid;
  }

  // 下一步/确认上传
  async function handleNext() {
    if (currentStep.value === 1) {
      // 步骤1: 前端校验 -> 后端解析文件
      if (!validateForm()) {
        return;
      }
      await analyzeFile();
    } else {
      // 步骤2: 确认上传
      await startImport();
    }
  }

  // 解析文件（后端校验）
  const analyzeFile = debounce(async () => {
    submitLoading.value = true;
    const loading = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)',
      target: '.el-dialog__body',
    });

    try {
      // API 返回类型是 CommonRespImportDataResp，但响应拦截器会自动解包 result
      const res = (await videoAnalysisApi.luteosAiVideoAnalysisAnalysisImportFile({
        business: formData.business,
        fileUrl: uploadFileUrl.value,
      })) as unknown as ImportDataResp;
      loading.close();

      if (res) {
        currentStep.value = 2;
        const total = (res.succeededCount || 0) + (res.failedCount || 0);
        validationResult.value = {
          total,
          succeededCount: res.succeededCount || 0,
          failedCount: res.failedCount || 0,
          recordCode: res.recordCode || '',
          // succeededData 用于下一步导入视频
          // 接口类型定义是 object，实际返回的是数组，使用 Array.isArray 确保类型安全
          succeededData: Array.isArray(res.succeededData) ? res.succeededData : [],
          failedData: Array.isArray(res.failedData) ? res.failedData : [],
        };
      }
    } catch (error: any) {
      // if (error !== 'cancel') {
      //   ElMessage.error(error?.message || '文件解析失败');
      // }
    } finally {
      loading.close();
      submitLoading.value = false;
    }
  }, 300);

  // 开始导入视频（视频转移）
  async function startImport() {
    submitLoading.value = true;
    dialogVisible.value = false;

    const beginNotification = ElNotification({
      title: '视频上传中',
      dangerouslyUseHTMLString: true,
      message:
        '<div>准备工作将在后台进行，您可以进行其他操作或前往 <span class="color-success" style="color: #02b96b; cursor: pointer;" onclick="window.dispatchEvent(new CustomEvent(\'navigate-to-upload\'))">上传中心</span> 查看进度。</div>',
      type: 'success',
      loading: true,
      duration: 0,
      showBorderTypeColor: false,
    });

    try {
      const res = await videoAnalysisApi.luteosAiVideoAnalysisStartImportFile({
        business: formData.business,
        dataList: validationResult.value.succeededData,
      });

      beginNotification.close();

      endNotificationInstance = ElNotification({
        title: '视频上传完成',
        dangerouslyUseHTMLString: true,
        message: `<div>视频上传成功，视频分析还需等待较长时间，可前往 <span class="color-success" style="color: #02b96b; cursor: pointer;" onclick="window.dispatchEvent(new CustomEvent('navigate-to-upload'))">上传中心</span> 查看。</div>`,
        type: 'success',
        offset: 50,
        duration: 0,
        showFooter: true,
        footerTip: '刚刚',
        buttonText: '前往查看',
        onButtonClick: () => {
          endNotificationInstance?.close();
          router.push({ path: '/salesForecastingLog', query: { refresh: Date.now() } });
        },
      });

      emit('success');
      handleClose();
    } catch (error: any) {
      // ElMessage.error(error?.message || '导入失败');
    } finally {
      submitLoading.value = false;
      beginNotification.close();
    }
  }

  // 打开视频链接
  const openVideoUrl = (url) => {
    window.open(url, '_blank');
  };

  // 处理通知中的跳转事件
  const handleNavigateToUpload = () => {
    router.push({ path: '/salesForecastingLog', query: { refresh: Date.now() } });
    endNotificationInstance?.close();
  };

  const handleNavigateToDownload = () => {
    router.push({ path: '/downloadmanage', query: { refresh: Date.now() } });
    endNotificationInstance?.close();
  };

  // 监听自定义事件
  onMounted(() => {
    window.addEventListener('navigate-to-upload', handleNavigateToUpload);
    window.addEventListener('navigate-to-download', handleNavigateToDownload);
  });

  onUnmounted(() => {
    window.removeEventListener('navigate-to-upload', handleNavigateToUpload);
    window.removeEventListener('navigate-to-download', handleNavigateToDownload);
  });
</script>

<style lang="scss" scoped>
  .color-success {
    color: var(---P6, var(---P6, #02b96b));
  }
  .color-failed {
    color: var(---C8, var(---C8, #f53f3f));
  }
  .video-upload-dialog {
    &.small-dialog {
      .dialog-header {
        padding: 0;
      }
      .header-divider {
        height: 0px;
      }
    }
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 0px 0px 16px;
  }

  .dialog-title {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
  }

  .close-btn {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #8a8f8d;
    .Root-tyicon {
      font-size: 20px;
    }
  }

  .header-divider {
    height: 1px;
    background-color: #eff0f0;
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* 表单行 - 水平布局 */
  .form-row {
    display: flex;
    align-items: center;
    gap: 12px;

    .form-label {
      font-size: 12px;
      color: var(---N8, var(---N8, #585a5a));
      white-space: nowrap;
      flex-shrink: 0;
      margin-bottom: 0;

      .required {
        color: #f53f3f;
        margin-right: 2px;
      }
    }

    .business-select {
      width: 120px;
    }
  }

  /* 导入Excel文件行 */
  .import-row {
    .download-template {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #02b96b;
      cursor: pointer;

      .iconfont {
        font-size: 14px;
      }
      .download-text {
        font-size: 12px;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .upload-section {
    margin-top: 0;
  }

  .upload-area {
    position: relative;
    .upload-hint {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      color: #8a8f8d;
      margin-top: 0;
      margin-top: 24px;
      text-align: center;
      pointer-events: none;
    }

    :deep(.el-upload) {
      width: 100%;
    }

    :deep(.el-upload-dragger) {
      width: 100%;
      height: 288px;
      border: 1px dashed var(---N4, #dedede);
      border-radius: 6px;
      background-color: var(---N1, #f8f8f8);
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        border-color: #02b96b;
      }
      &.is-dragover {
        background: var(---P1, #f0fff6);
      }
    }
  }

  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .upload-text {
      display: flex;
      flex-direction: column;
      align-items: center;

      .upload-text-primary {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  /* 上传中进度条 */
  .upload-progress-bar {
    margin-top: 12px;
    padding: 0 4px 0 23px;
    .progress-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;

      :deep(.el-progress) {
        flex: 1;
      }

      .progress-text {
        font-size: 12px;
        color: #8a8f8d;
        min-width: 36px;
      }
    }
  }

  /* 已上传文件列表项 - 根据 Figma 设计稿 */
  .uploaded-file-wrap {
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #f8f8f8;
  }
  .uploaded-file-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .file-icon {
      font-size: 20px;
      color: #107c41;
      flex-shrink: 0;
    }

    .file-name {
      font-size: 12px;
      color: #262626;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .delete-btn {
      cursor: pointer;
      color: #8a8f8d;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;

      &:hover {
        color: #f53f3f;
      }

      .iconfont {
        font-size: 14px;
      }
    }
  }

  /* 兼容旧样式 */
  .upload-progress {
    border: 1px dashed #c5c5c5;
    border-radius: 6px;
    padding: 16px;
    background-color: #fff;

    .file-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      .file-icon {
        font-size: 24px;
        color: #107c41;
      }

      .file-name {
        font-size: 14px;
        color: #262626;
      }
    }

    .progress-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;

      :deep(.el-progress) {
        flex: 1;
      }

      .progress-text {
        font-size: 12px;
        color: #8a8f8d;
        min-width: 36px;
      }
    }
  }

  .upload-success {
    border: 1px dashed #c5c5c5;
    border-radius: 6px;
    padding: 16px;
    background-color: #fff;

    .file-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .file-icon {
        font-size: 24px;
        color: #107c41;
      }

      .file-name {
        font-size: 14px;
        color: #262626;
        flex: 1;
      }

      .success-icon {
        font-size: 16px;
        color: #02b96b;
      }

      .delete-btn {
        cursor: pointer;
        color: #8a8f8d;

        &:hover {
          color: #f53f3f;
        }
      }
    }
  }

  .validation-result {
    .validation-summary {
      font-size: 12px;
      color: #585a5a;
      margin-bottom: 12px;
      line-height: 20px;
    }

    .file-url-cell {
      display: flex;
      align-items: center;
      gap: 2px;

      .file-url-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: var(---P6, #02b96b);
        }
      }
    }

    .error-table-wrapper {
      border-top: 1px solid #f4f5f5;
      border-left: 1px solid #f4f5f5;
      border-right: 1px solid #f4f5f5;
      border-radius: 6px;
      overflow: hidden;
      :deep(.el-table th.el-table__cell) {
        background-color: var(---N1, #f8f8f8);
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
</style>

<style lang="scss">
  .video-upload-dialog.el-dialog {
    // border-radius: 10px !important;
    // overflow: hidden !important;
    padding: 16px 20px !important;
    .el-dialog__header {
      margin: 0 !important;
      padding: 0 0 16px !important;
      border-bottom: 1px solid #ededed !important;
    }

    .el-dialog__body {
      padding: 16px 0px 0px !important;
      max-height: 430px !important;
    }

    .el-dialog__footer {
      border-top: 0px !important;
      padding: 16px 0 0 !important;
      margin-top: 0 !important;
    }
  }
</style>
