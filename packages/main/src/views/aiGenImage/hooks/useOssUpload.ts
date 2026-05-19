/**
 * OSS 文件上传 Composable
 */

import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { platformApi } from '@/api';
import type { UploadState, OssUploadCallbacks } from '../types';
import { IMAGE_UPLOAD_DIRECTORY, MAX_FILE_SIZE_MB } from '../constants';

/**
 * OSS 文件上传 composable
 */
export default function useOssUpload() {
  /** 上传状态 */
  const uploadState = ref<UploadState>('idle');
  /** 上传进度 */
  const uploadProgress = ref(0);
  /** 上传后的 OSS key */
  const uploadedFileKey = ref('');

  /**
   * 上传文件到 OSS
   * @param file 要上传的文件
   * @param callbacks 上传回调配置
   */
  const uploadToOss = async (file: File, callbacks: OssUploadCallbacks) => {
    const { onProgress, onSuccess, onError } = callbacks;

    try {
      // 1. 获取 OSS 临时凭证
      const ossRes = await platformApi.platformOssQueryOssTempPolicy({
        directory: IMAGE_UPLOAD_DIRECTORY,
        filename: file.name,
      });

      if (!ossRes || !ossRes.host) {
        throw new Error('获取上传凭证失败');
      }

      const ossKey = ossRes.key || '';

      // 2. 构建 FormData
      const formDataObj = new FormData();
      formDataObj.append('key', ossKey);
      formDataObj.append('OSSAccessKeyId', ossRes.ossAccessKeyId || '');
      formDataObj.append('policy', ossRes.policy || '');
      formDataObj.append('signature', ossRes.signature || '');
      formDataObj.append('file', file);

      // 3. 使用 XHR 上传（支持上传进度监控）
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          onSuccess(ossKey);
        } else {
          onError(new Error('上传失败'));
        }
      };

      xhr.onerror = () => {
        onError(new Error('网络错误'));
      };

      xhr.open('POST', ossRes.host);
      xhr.send(formDataObj);
    } catch (error) {
      onError(error instanceof Error ? error : new Error('上传失败'));
    }
  };

  /**
   * 重置上传状态
   */
  const resetUpload = () => {
    uploadState.value = 'idle';
    uploadProgress.value = 0;
    uploadedFileKey.value = '';
  };

  /**
   * 验证文件大小
   * @param file 文件对象
   * @param maxSizeMB 最大文件大小（MB），默认使用常量配置
   */
  const validateFileSize = (file: File, maxSizeMB = MAX_FILE_SIZE_MB): boolean => {
    const isValid = file.size / 1024 / 1024 < maxSizeMB;
    if (!isValid) {
      ElMessage.error(`文件大小不能超过 ${maxSizeMB}MB!`);
    }
    return isValid;
  };

  /**
   * 验证文件扩展名
   * @param file 文件对象
   * @param validExtensions 有效的扩展名数组
   */
  const validateFileExtension = (file: File, validExtensions: string[]): boolean => {
    const fileName = file.name;
    const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    const isValid = validExtensions.includes(ext);
    if (!isValid) {
      ElMessage.error(`文件格式不正确，仅支持 ${validExtensions.join(' / ')}`);
    }
    return isValid;
  };

  /**
   * 判断文件是否为 Excel 格式
   */
  const isExcelFile = (filename: string): boolean => {
    const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    return ['.xlsx', '.xls'].includes(ext);
  };

  return {
    uploadState,
    uploadProgress,
    uploadedFileKey,
    uploadToOss,
    resetUpload,
    validateFileSize,
    validateFileExtension,
    isExcelFile,
  };
}
