import { platformApi } from '@/api';
import axios from 'axios';

export async function uploadFileToOss({
  fileName,
  file,
  directory,
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
      host: res.host,
      ossKey,
      fileUrl: `${res.host}/${ossKey}`,
    };
  }
  return Promise.reject('上传失败');
}

