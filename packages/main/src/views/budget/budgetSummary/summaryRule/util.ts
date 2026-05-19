import ExcelJS from 'exceljs';
import { budgetApi, platformApi } from '@/api';
import axios from 'axios';
/*
 * 上传文件到OSS
 * @param fileName 文件名
 * @param file 文件
 * @param directory 文件目录
 * @return Promise<{jobId: string, fileName: string, host: string, fileUrl: string, ossKey: string}>
 */
export async function uploadFileToOss({
  fileName,
  file,
  directory,
  isSaveBudget,
}: {
  fileName: string;
  file: File;
  directory: string;
}) {
  const res: any = await platformApi.platformOssQueryOssTempPolicy({
    directory,
    filename: fileName,
  });
  const ossKey = res.key;
  if (ossKey) {
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
    formData.append('file', file, fileName);
    await instance.post('/', formData);
    return {
      fileName,
      host: res.host,
      fileUrl: `${res.host}/${ossKey}`,
      ossKey,
    };
  }
  return Promise.reject('上传失败');
}
