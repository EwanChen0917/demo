import ExcelJS from 'exceljs';
import { budgetApi, platformApi } from '@/api';
import axios from 'axios';

/*
 * 读取表格
 * @param url 文件地址
 * @return workbook
 */
export async function fetchExcelStreamByUrl(url: string) {
  const res = await fetch(url);
  return await readTable(res);
}

/*
 * 读取表格
 * @param res 文件流
 * @return workbook
 */
async function readTable(res: any) {
  const buffer = await res.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  // console.log('workbook', workbook);
  return workbook;
}

/*
 * excel 主题色转换算法
 * @param r  red
 * @param g  green
 * @param b  blue
 * @param tint 色调 -1 ~ -1
 */
export function applyTint(r: number, g: number, b: number, tint: number) {
  if (tint > 0) {
    r = Math.floor(r + (255 - r) * tint);
    g = Math.floor(g + (255 - g) * tint);
    b = Math.floor(b + (255 - b) * tint);
  } else {
    r = Math.floor(r * (1 + tint));
    g = Math.floor(g * (1 + tint));
    b = Math.floor(b * (1 + tint));
  }
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `rgb(${r},${g},${b})`;
}

/*
 * 构建Excel列名称 [A,B,C,D,E,...]
 * @param count 列数
 * @return string[]
 */
export function buildExcelColumnHeaderNames(count: number): string[] {
  const arr = [];
  for (let i = 0; i < count; i++) {
    let result = '';
    let num = i + 1; // Excel列从1开始

    while (num > 0) {
      const remainder = (num - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result; // 65 是 'A' 的 ASCII 码
      num = Math.floor((num - 1) / 26);
    }

    arr.push(result);
  }

  return arr;
}

/*
 * 睡眠
 * @param ms 毫秒
 * @return Promise<void>
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    // 返回 Jobid
    let jobId = null;
    if (isSaveBudget) {
      jobId = await budgetApi.financeBudgetPresentationTableSaveFillDetailOssFile({
        fileName,
        host: res.host,
        fileUrl: `${res.host}/${ossKey}`,
        ossKey,
      });
    }
    return {
      jobId,
      fileName,
      host: res.host,
      fileUrl: `${res.host}/${ossKey}`,
      ossKey,
    };
  }
  return Promise.reject('上传失败');
}

/*
 * 转义正则字符
 * @param str
 * @return string
 */
export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

const tempStarSymbol = '__START__';
const tempStarSymbolReg = new RegExp(tempStarSymbol, 'g');

/*
 * 模糊搜索文本
 * @param filterText 筛选文本
 * @param regFlags 正则标志
 * @return RegExp
 */
export function buildFuzzySearchText(filterText: string, regFlags: string) {
  return new RegExp(
    escapeRegExp(filterText.replace(/\*/g, tempStarSymbol)).replace(tempStarSymbolReg, '.+'),
    regFlags
  );
}

// 添加数字千分位逗号
const reg = /\B(?=(\d{3})+(?!\d))/g;

/*
 * 添加数字千分位逗号
 * @param numStr 数字字符串
 * @return string
 */
export function addNumberCommas(numStr: string) {
  const parts = numStr.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  const formattedInteger = integerPart.replace(reg, ',');

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

/*
 * 等待某个时刻的到来
 * @param tick 时间戳
 * @return Promise<void>
 */
export function waitUnit(tick) {
  if (!tick) {
    return;
  }
  // 当时间戳到达 tick 时，promise 状态为 resolve
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (Date.now() >= tick) {
        clearInterval(timer);
        resolve();
      }
    }, 500);
  });
}
