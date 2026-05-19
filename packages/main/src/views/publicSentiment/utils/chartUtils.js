/**
 * 生成饼图配置
 * @param {Array} data - 数据 [{ name, value }]
 * @param {String} title - 标题
 * @returns {Object} ECharts 配置
 */
export const getTooltipBase = () => ({
  backgroundColor: '#ffffff',
  borderRadius: 10,
  padding: [10, 12],
  borderWidth: 0,
  extraCssText: 'box-shadow: 0 6px 36px rgba(6, 8, 27, 0.08);',
});

export const generatePieOption = (data, title) => {
  return {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      ...getTooltipBase(),
      formatter: (params) => {
        const tooltipTitle = title || params.seriesName || '';
        const percent = params.percent != null ? `${params.percent}%` : '';
        const titleBlock = tooltipTitle
          ? `<div style="font-size:12px;line-height:20px;color:#666;">${tooltipTitle}</div>`
          : '';
        return `<div style="display:flex;flex-direction:column;gap:4px;">
          ${titleBlock}
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="width:8px;height:8px;border-radius:50%;background:${params.color};display:inline-block;"></span>
            <span style="font-size:12px;line-height:20px;color:#666;">${params.name}</span>
            <span style="font-size:12px;line-height:20px;color:#666;">：</span>
            <span style="font-size:12px;line-height:20px;color:#1f1f1f;font-family:DIN, sans-serif;font-weight:500;">${params.value}</span>
            ${percent ? `<span style="font-size:12px;line-height:20px;color:#999;font-family:DIN, sans-serif;font-weight:500;">${percent}</span>` : ''}
          </div>
        </div>`;
      },
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};

/**
 * 生成柱状图配置
 * @param {Array} data - 数据 [{ name, value }]
 * @param {String} title - 标题
 * @returns {Object} ECharts 配置
 */
export const generateBarOption = (data, title) => {
  return {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      ...getTooltipBase(),
      formatter: (params) => {
        const item = params?.[0] || {};
        const dataItem = item.data || {};
        const percent =
          dataItem.percent != null ? `${dataItem.percent}%` : dataItem.ratio ? `${dataItem.ratio}%` : '';
        const titleBlock = title
          ? `<div style="font-size:12px;line-height:20px;color:#666;">${title}</div>`
          : '';
        return `<div style="display:flex;flex-direction:column;gap:4px;">
          ${titleBlock}
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="width:8px;height:8px;border-radius:50%;background:${item.color};display:inline-block;"></span>
            <span style="font-size:12px;line-height:20px;color:#666;">${item.name || ''}</span>
            <span style="font-size:12px;line-height:20px;color:#666;">：</span>
            <span style="font-size:12px;line-height:20px;color:#1f1f1f;font-family:DIN, sans-serif;font-weight:500;">${item.value ?? ''}</span>
            ${percent ? `<span style="font-size:12px;line-height:20px;color:#999;font-family:DIN, sans-serif;font-weight:500;">${percent}</span>` : ''}
          </div>
        </div>`;
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
        itemStyle: {
          color: '#258dff',
        },
      },
    ],
  };
};

/**
 * 处理 Top 10 数据
 * @param {Array} data - 原始数据
 * @returns {Array} Top 10 + 其他
 */
export const processTop10 = (data = []) => {
  if (data.length <= 10) return data;

  const sorted = [...data].sort((a, b) => b.value - a.value);
  const top10 = sorted.slice(0, 10);
  const others = sorted.slice(10);
  const othersTotal = others.reduce((sum, item) => sum + item.value, 0);

  return [...top10, { name: '其他', value: othersTotal }];
};
