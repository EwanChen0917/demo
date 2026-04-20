import html2pdf from 'html2pdf.js';
import { ElMessage } from 'element-plus';
import { platformApi } from '@/api';
import axios from 'axios';

// let worker;
// if (typeof Worker !== 'undefined') {
//   const blob = new Blob([`(${toPdf.toString()})()`]);
//   const url = window.URL.createObjectURL(blob);
//   worker = new Worker(url);
// }

// function toPdf() {
//   onmessage = async (e) => {
//     const { pdf } = e.data;
//     console.log('worker', e);
//     // const pdfInstance = pdf.toPdf();
//     const blob = await pdf.output('blob');
//     postMessage(blob);
//   };
// }

// 导出生成pdf
export const exportToPDF = async (id = '#pdf-area') => {
  const element = document.querySelector(id);
  const options = {
    margin: 0, // 内边距
    filename: 'mark.pdf', // pdf文件名字
    image: { type: 'png' }, // 生成图片的类型以及清晰度
    pagebreak: { mode: id, after: '.box-mark-area-item' }, // 处理是否元素分割
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: [4, 6], orientation: 'portrait' },
  };
  try {
    const pdf = html2pdf().set(options).from(element, 'element');
    const pdfInstance = pdf.toPdf();
    const blob = await pdfInstance.output('blob');
    return blob;
  } catch (error) {
    ElMessage.error(`生成失败`);
    return null;
  }
};
// 上传pdf文件
export const uploadFile = async (file: Blob, filename = 'boxMark') => {
  const fileName = `${filename}${Date.now()}.pdf`;
  const res: any = await platformApi.platformOssQueryOssTempPolicy({
    directory: 'boxMark',
    filename: fileName,
  });
  const instance = axios.create({
    baseURL: res.host,
  });
  const formDataObj = new FormData();
  formDataObj.append('key', res.key);
  formDataObj.append('ossAccessKeyId', res.ossAccessKeyId);
  formDataObj.append('policy', res.policy);
  formDataObj.append('signature', res.signature);
  formDataObj.append('provider', res.provider);
  formDataObj.append('bucket', res.bucket);
  formDataObj.append('success_action_status', res.success_action_status);
  formDataObj.append('file', file, fileName);
  // 使用这个实例来发起请求
  await instance.post('/', formDataObj);
  return res.key;
};

export default {};
