export const formatMoneyObj = (num: number) => {
  if (num == null || Number.isNaN(num)) return { value: '-', unit: '' };
  if (Math.abs(num) >= 100000000) {
    // 亿
    return {
      value: (num / 100000000).toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      unit: '亿',
      toString() {
        return `${this.value}${this.unit}`;
      },
    };
  }
  // 万
  return {
    value: (Math.round(num / 100) / 100).toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    unit: '万',
    toString() {
      return `${this.value}${this.unit}`;
    },
  };
};
export const formatPercent = (num: number) => {
  if (typeof num !== 'number' || Number.isNaN(num)) return '-';
  return (num * 100).toFixed(1);
};
export const formatNumber = (num: number | string, precision = 0) => {
  if (num == null || Number.isNaN(Number(num))) return '-';
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
};
export const formatTime = (seconds: number) => {
  if (seconds == null || Number.isNaN(seconds)) return '-';
  seconds = Math.floor(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours > 0 ? `${hours}小时` : ''}${minutes > 0 ? `${minutes}分钟` : ''}${secs}秒`;
};
