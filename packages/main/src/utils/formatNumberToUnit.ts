export function formatNumberToUnit(num) {
  // 处理非数字类型
  if (typeof num !== 'number' || Number.isNaN(num)) {
    return '0';
  }

  const absNum = Math.abs(num);
  let result;

  if (absNum >= 100000000) {
    // 处理亿单位
    const value = absNum / 100000000;
    result = `${formatDecimal(value)}亿`;
  } else if (absNum >= 10000) {
    // 处理万单位
    const value = absNum / 10000;
    result = `${formatDecimal(value)}万`;
  } else {
    // 小于1万的处理
    result = absNum.toString();
  }

  // 处理负数
  return num < 0 ? `-${result}` : result;
}

// 辅助函数：格式化小数（保留1位小数，并移除末尾的0）
function formatDecimal(value) {
  // 先保留一位小数（四舍五入）
  const fixedValue = value.toFixed(1);
  // 移除末尾的.0
  return parseFloat(fixedValue).toString();
}

const protoObj = {
  value: 0,
  unit: '',
  toString() {
    return `${this.value}${this.unit}`;
  },
};
export const formatNumberObj = (num?: number, options: Intl.NumberFormatOptions = {}) => {
  const result = Object.create(protoObj);
  if (num === null || num === undefined || Number.isNaN(num)) {
    result.value = '-';
    result.unit = '';
    return result;
  }
  const isNegative = num < 0;
  const n = Math.abs(num);
  let value = '';
  let unit = '';
  if (n >= 100000000) {
    // 亿
    value = Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n / 100000000);
    unit = '亿';
  } else if (n >= 10000) {
    // 万
    value = Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(n / 10000);
    unit = '万';
  } else {
    value = Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(n);
  }
  result.value = isNegative ? `-${value}` : value;
  result.unit = unit;
  return result;
};
export const formatRate = (num?: number, options: Intl.NumberFormatOptions = {}) => {
  const result = Object.create(protoObj);
  if (num === null || num === undefined || Number.isNaN(num)) {
    result.value = '-';
    result.unit = '';
    return result;
  }
  result.value = new Intl.NumberFormat('zh-CN', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  })
    .format(num)
    .slice(0, -1);
  result.unit = '%';
  return result;
};
export default formatNumberToUnit;
