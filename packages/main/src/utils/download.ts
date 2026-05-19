import { saveAs } from 'file-saver';
// export const blobDownload = (blob, filename) => {
//   const blobFiles = new Blob([blob]);
//   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//     window.navigator.msSaveOrOpenBlob(blob, filename);
//   } else {
//     const elink = document.createElement('a'); // 创建a标签
//     elink.download = filename;
//     elink.style.display = 'none';
//     elink.href = URL.createObjectURL(blobFiles);
//     document.body.appendChild(elink);
//     elink.click(); // 触发点击a标签事件
//     document.body.removeChild(elink);
//   }
// };
import axios, { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

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
    // const temp = response.headers['content-disposition'].split(';')[1].split('filename=')[1];
    const fileName = response.headers['content-disposition'].split('=')[1];
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    if (!blob) throw new Error('download url is avalid!');
    saveAs(blob, fileName);
    // const url = window.URL.createObjectURL(blob);
    // const linkEl = document.createElement('a');
    // if ('download' in linkEl) {
    //   linkEl.download = fileName;
    //   document.body.appendChild(linkEl);
    //   linkEl.href = url;
    //   linkEl.click();
    //   linkEl.remove();
    // } else {
    //   const win = window.open(url, '_self');
    //   win && (win.opener = null);
    // }
  } catch (error) {
    console.log(error);
  }
}

const stripFileNameQuotes = (value: string) => {
  return value.trim().replace(/^["']|["']$/g, '');
};

const decodeFileName = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const getFileNameFromDisposition = (contentDisposition?: string) => {
  if (!contentDisposition) return '';

  const utf8Match = contentDisposition.match(/filename\*\s*=\s*(?:UTF-8'[^']*')?([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeFileName(stripFileNameQuotes(utf8Match[1]));
  }

  const fileNameMatch = contentDisposition.match(/filename\s*=\s*("([^"]+)"|[^;]+)/i);
  if (fileNameMatch?.[1]) {
    return decodeFileName(stripFileNameQuotes(fileNameMatch[1]));
  }

  return '';
};

export function downloadFileSteamForResolvedName(response: AxiosResponse) {
  try {
    const fileName =
      getFileNameFromDisposition(response.headers['content-disposition']) || 'download';
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    if (!blob) throw new Error('download url is avalid!');
    saveAs(blob, fileName);
  } catch (error) {
    console.log(error);
  }
}
