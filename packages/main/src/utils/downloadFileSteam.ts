import { AxiosResponse } from 'axios';
// 文件流解析方法
export function downloadFileSteam(response: AxiosResponse) {
  try {
    const temp = response.headers['content-disposition'].split(';')[1].split('filename=')[1];
    const blob = response.data;
    const fileName = decodeURIComponent(temp);
    if (!blob) throw new Error('download url is avalid!');
    const url = window.URL.createObjectURL(blob);
    const linkEl = document.createElement('a');
    if ('download' in linkEl) {
      linkEl.download = fileName;
      document.body.appendChild(linkEl);
      linkEl.href = url;
      linkEl.click();
      linkEl.remove();
    } else {
      const win = window.open(url, '_self');
      win && (win.opener = null);
    }
  } catch (error) {
    console.log(error);
  }
}
