import { saveAs } from 'file-saver';
import axios, { AxiosResponse } from 'axios';
import { ElMessage, ElNotification } from 'element-plus/es';

export const urlDownload = (url: string) => {
  if (!url) {
    ElMessage.error('下载地址错误');
    return;
  }
  const elink = document.createElement('a'); // 创建a标签
  elink.style.display = 'none';
  elink.href = url;
  document.body.appendChild(elink);
  elink.click(); // 触发点击a标签事件
  document.body.removeChild(elink);
};

/**
 * 文件流下载（带弹窗提示）
 * @param url 文件下载地址
 */
export const downloadWithNotification = async (url: string) => {
  if (!url) {
    ElMessage.error('下载地址错误');
    return;
  }
  const notification = ElNotification({
    title: '文件正在导出，请稍后...',
    type: 'success',
    loading: true,
    duration: 0,
    offset: 50,
    showBorderTypeColor: false,
    zIndex: 99999,
  });
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    // 尝试从响应头获取文件名，如果没有则从 URL 中提取
    let fileName = '';
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=(['"]?)([^'"\n]*?)\1(?:;|$)/i);
      if (match && match[2]) {
        fileName = decodeURIComponent(match[2]);
      }
    }
    if (!fileName) {
      // 从 URL 中提取文件名
      const urlPath = url.split('?')[0];
      fileName = urlPath.substring(urlPath.lastIndexOf('/') + 1) || 'download';
    }
    const blob = new Blob([response.data], {
      type: response.headers['content-type'] || 'application/octet-stream',
    });
    saveAs(blob, fileName);
    notification.close();
    ElNotification({
      title: '文件下载成功',
      type: 'success',
      offset: 50,
      showBorderTypeColor: false,
      zIndex: 99999,
    });
  } catch (error) {
    notification.close();
    ElMessage.error('文件下载失败');
    console.error('下载失败:', error);
  }
};
export const download = async (url: string, filename: string) => {
  const x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = () => {
    const downloadUrl = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename; // 设置下载的文件名
    a.style.display = 'none';
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
  };
  x.send();
};
// 文件流解析方法
export function downloadFileSteam(response: AxiosResponse) {
  try {
    const fileName = response.headers['content-disposition'].split('=')[1];
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    if (!blob) throw new Error('download url is avalid!');
    saveAs(blob, fileName);
  } catch (error) {
    console.log(error);
  }
}
