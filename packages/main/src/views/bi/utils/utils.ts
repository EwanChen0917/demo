import { platformApi } from '@/api';
import {
  type XAXisComponentOption,
  type YAXisComponentOption,
  type BarSeriesOption,
  type LineSeriesOption,
  type GridComponentOption,
} from 'echarts';

export const formatMoneyObj = (num?: number) => {
  if (num === null || num === undefined || Number.isNaN(num))
    return {
      value: '-',
      unit: '',
      toString() {
        return this.value;
      },
    };
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
export const formatPercent = (num?: number) => {
  if (typeof num !== 'number' || Number.isNaN(num)) return '-';
  return (num * 100).toLocaleString('zh-CN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
const protoObj = {
  value: 0,
  unit: '',
  toString() {
    return `${this.value}${this.unit}`;
  },
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
export const formatFullNumberObj = (num?: number, options: Intl.NumberFormatOptions = {}) => {
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
  } else if (n >= 1e7) {
    // 千万
    value = Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(n / 1e7);
    unit = '千万';
  } else if (n >= 1e4) {
    // 万
    value = Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(n / 1e4);
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
export const formatNumberByBase = (num?: number, base = 10000, precision = 2) => {
  const result = Object.create(protoObj);
  if (num === null || num === undefined || Number.isNaN(num)) {
    result.value = '-';
    result.unit = '';
    return result;
  }
  return Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num / base);
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
export const generateLegend = (options, data?: { name: string; isRate?: boolean }[]) => {
  return {
    show: true,
    itemWidth: 18,
    itemHeight: 10,
    itemGap: 16,
    textStyle: {
      color: '#999',
      fontFamily: 'PingFang SC',
      borderWidth: 1,
      borderColor: 'transparent',
    },
    data: data?.map((d) => ({
      name: d.name,
      icon: d.isRate
        ? 'path://M921.13851 0a511.743616 511.743616 0 0 1 511.743616 511.743616h409.394893v102.348724h-419.629765a511.845965 511.845965 0 0 1-1003.017489 0H0V511.743616h409.394893a511.743616 511.743616 0 0 1 511.743617-511.743616zM524.639556 614.09234a409.599591 409.599591 0 0 0 792.997908 0H1098.201801A204.492749 204.492749 0 0 1 744.075218 614.09234H524.741904zM921.13851 102.348723a409.394893 409.394893 0 0 0-409.394894 409.394893h204.697447a204.697447 204.697447 0 1 1 409.394893 0h204.697447a409.394893 409.394893 0 0 0-409.394893-409.394893z'
        : 'path://M282.537577 94.179192m188.358385 0l753.43354 0q188.358385 0 188.358385 188.358385l0 376.71677q0 188.358385-188.358385 188.358385l-753.43354 0q-188.358385 0-188.358385-188.358385l0-376.71677q0-188.358385 188.358385-188.358385Z',
    })),
    ...options,
  };
};
export const generateTooltip = (options = {}) => {
  return {
    trigger: 'axis' as const,
    formatter: (params) => {
      const { name } = params[0];
      const content = params.reduce((html, p, idx) => {
        const formatFn = p.seriesType === 'line' ? formatRate : formatNumberObj;
        const newHtml = `${html}<div style="display: flex; align-items: center;">
          <div style="background: ${
            p.color
          }; border-radius: 50%; width: 6px; height: 6px; margin-right: 8px;"></div>
          <div style="color: #666; font-size: 12px">${p.seriesName}</div>
          </div>
          <div class="font-din" style="font-size: 12px; color: #1f1f1f;text-align: right">${formatFn(
            p.value
          ).toString()}</div>`;
        return newHtml;
      }, '');
      return `
        <div style="color: #999; font-size: 12px; margin-bottom: 4px">${name}</div>
        <div style="display: grid; grid-template-columns: repeat(2, auto); column-gap: 10px; row-gap: 4px">${content}</div>
        `;
    },
    ...options,
  };
};
export const generateGrid = (options: GridComponentOption) => {
  return {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    height: 'auto',
    containLabel: true,
    ...options,
  };
};
export const generateXAxis = (options) => {
  return {
    type: 'category',
    alignTicks: true,
    axisLabel: {
      show: true,
      color: '#999',
      fontSize: 12,
      fontFamily: 'PingFang SC',
      hideOverlap: true,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#E6E6E6',
      },
    },
    axisTick: {
      show: true, // 隐藏x轴刻度线
      alignWithLabel: true,
      lineStyle: {
        color: '#E6E6E6',
      },
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#EDEDED',
        type: 'dashed',
      },
    },
    ...options,
  };
};

export const generateYAxis = (options) => {
  return {
    type: 'value',
    alignTicks: true,
    nameTextStyle: {
      fontSize: 11,
      fontWeight: 400,
      color: '#999',
      align: 'right',
    },
    axisLabel: {
      color: '#999',
      fontSize: 12,
      hideOverlap: true,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#999',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#EDEDED',
        type: 'dashed',
      },
    },
    ...options,
  };
};

export const generateBarSeries = (options: BarSeriesOption) => {
  return {
    type: 'bar',
    barWidth: 8,
    itemStyle: {
      borderRadius: [2, 2, 0, 0],
    },
    label: {
      show: false,
      position: 'right',
      color: '#333',
      fontFamily: 'DIN',
      fontSize: 11,
      formatter(params) {
        return formatNumberObj(params.value).toString();
      },
    },
    ...options,
  };
};
export const generateLineSeries = (options: LineSeriesOption) => {
  return {
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 7,
    itemStyle: {
      borderColor: '#fff',
    },
    tooltip: {
      valueFormatter(value) {
        return formatRate(value, { maximumFractionDigits: 2 }).toString();
      },
    },
    ...options,
  };
};

export const generatePieSeries = (options) => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    // 2. 调整图表主体区域（为图例留出空间）
    grid: {
      right: 0,
      left: 0,
      bottom: 0,
      containLabel: true,
    },
    legend: {
      show: false,
      selectedMode: false,
      bottom: 0, // 距离右侧容器的距离（单位px或百分比）
      left: 'left', // 垂直居中
      align: 'left', // 图例文本左对齐
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      borderRadius: 8,
      textStyle: {
        fontSize: 12,
        color: '#999',
        rich: {
          a: {
            color: '#999',
          },
          b: {
            color: '#1F1F1F',
          },
        },
      },
      itemGap: 10,
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['65%', '90%'],
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          focus: 'series',
          label: {
            show: false,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        label: {
          show: false,
          formatter: '{name|{c}%}\n{name|{b}}',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            name: {
              fontSize: 12,
              color: '#1f1f1f',
              lineHeight: 20,
            },
          },
        },
      },
    ],
    ...options,
  };
  return option;
};

export const queryConditions = async (key: string) => {
  const params = {
    platform: 'ERP',
    moduleType: 'BI',
    itemType: key,
    pageNum: 1,
    pageSize: 100,
  };
  const res = await platformApi.platformSearchQueryConditionList(params);
  return res;
};

export const saveConditions = async (key: string, conditions: Record<string, any>) => {
  const params = {
    platform: 'ERP',
    moduleType: 'BI',
    itemType: key,
    searchCondition: JSON.stringify(conditions),
  };
  const res = await platformApi.platformSearchSaveCondition(params);
  return res.conditionCode;
};
export const deleteConditions = async (conditionCode: string) => {
  await platformApi.platformSearchOperateCondition({
    itemCode: conditionCode,
    operateType: 'delete',
  });
};
