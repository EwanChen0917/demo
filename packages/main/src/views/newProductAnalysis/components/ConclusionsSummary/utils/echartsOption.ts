const themeColor = [
  '#02B96B',
  '#258DFF',
  '#0CC1E2',
  '#FFBF1F',
  '#FF9F22',
  '#F53F3F',
  '#FF4EAF',
  '#A55BF5',
];

export const getEchartsData = (chartData) => {
  if (
    chartData.chart_type == 'line_chart' ||
    chartData.chart_type == 'bar_chart' ||
    chartData.chart_type == 'area_chart'
  ) {
    // console.log(chartData, 'chartData line');
    const { values, categories } = chartData.data;
    const { title, x_label, y_label, chart_type } = chartData;

    // 基础配置（所有图表通用）
    const option = {
      color: themeColor,
      tooltip: { trigger: 'axis' },
      grid: { left: 0, right: 0, bottom: 0, top: 16, containLabel: true },
      xAxis: {
        type: 'category',
        // name: x_label,
        data: categories,
        axisLabel: {
          interval: 0,
          rotate: 45,
          width: 110,
          overflow: 'break',
          align: 'right',
          margin: 15,
          formatter: function (value) {
            return value.replace(/(.*?)（(.*?)）/, '$1\n（$2）');
          }
        },
      },
      yAxis: {
        type: 'value',
        // name: y_label,
      },
      series: [] as any,
    };

    // 根据图表类型自动配置
    switch (chart_type) {
      // 折线图
      case 'line_chart':
        option.series.push({
          name: y_label,
          type: 'line',
          data: values,
          smooth: true, // 平滑曲线
        });
        break;

      // 柱状图
      case 'bar_chart':
        option.series.push({
          name: y_label,
          type: 'bar',
          data: values,
          barMaxWidth: 32,
          itemStyle: { borderRadius: [4, 4, 0, 0] }, // 圆角柱子
        });
        break;

      // 面积图（带填充的折线图）
      case 'area_chart':
        option.series.push({
          name: y_label,
          type: 'line',
          data: values,
          smooth: true,
          areaStyle: {}, // 开启面积填充
          lineStyle: { width: 2 },
          symbol: 'circle', // 数据点样式
        });
        break;

      // 默认折线图
      default:
        option.series.push({
          name: y_label,
          type: 'line',
          data: values,
          smooth: true,
        });
    }

    return option;
  } else if (chartData.chart_type == 'pie_chart') {
    // console.log(chartData, 'chartData pie');
    const { labels, values } = chartData.data;
    const { title } = chartData;

    // 组装饼图需要的数据格式 [{name: xx, value: xx}]
    const seriesData = labels.map((name, index) => ({
      name: name,
      value: values[index] ?? 0,
    }));

    return {
      color: themeColor,
      // 提示框
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}%', // 显示名称、数值、百分比
      },
      // 图例
      legend: {
        orient: 'horizontal', // 水平排列
        bottom: 0, // 放底部
        itemGap: 15, // 图例之间间距
      },
      grid: { left: 0, right: 0, bottom: 0, top: 16, containLabel: true },
      // 饼图系列
      series: [
        {
          type: 'pie',
          radius: ['52%', '70%'], // 圆环饼图（去掉内圈就是普通饼图）
          center: ['50%', '50%'], // 居中
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: '{b}: {d}%', // 显示名称+百分比
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          data: seriesData,
        },
      ],
    };
  } else if (chartData.chart_type == 'scatter_chart') {
    // console.log(chartData, 'chartData scatter');
    const { x, y } = chartData.data;
    const { title, x_label, y_label, chart_type } = chartData;

    // 组装散点图数据 [[x1,y1], [x2,y2]...]
    const seriesData = x.map((item, index) => [item, y[index]]);

    return {
      color: themeColor,
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `${x_label}：${params.data[0]}<br/>${y_label}：${params.data[1]}`;
        },
      },
      grid: { left: 0, right: 0, bottom: 0, top: 16, containLabel: true },
      xAxis: {
        type: 'category',
        // name: x_label,
        nameLocation: 'middle',
        nameGap: 20,
        axisLabel: {
          rotate: 45, // 文字倾斜防重叠
          formatter: function (value) {
            return value.replace(/(.*?)（(.*?)）/, '$1\n（$2）');
          }
        },
      },
      yAxis: {
        type: 'value',
        // name: y_label,
        nameLocation: 'middle',
        nameGap: 25,
      },
      series: [
        {
          type: 'scatter',
          data: seriesData,
          symbolSize: 20, // 散点大小
          itemStyle: {
            color: '#02B96B',
            opacity: 0.8,
          },
        },
      ],
    };
  } else if (chartData.chart_type == 'radar_chart') {
    // console.log(chartData, 'chartData radar');
    const { labels, values } = chartData.data;
    const title = chartData.title || '雷达图';

    // 构造雷达图指示器（通用）
    const indicator = labels.map((name, index) => ({
      name: name,
      max: 100, // 可根据业务自动调整，这里默认 0-100
    }));

    return {
      color: themeColor,
      tooltip: {
        trigger: 'item',
      },
      grid: { left: 0, right: 0, bottom: 0, top: 16, containLabel: true },
      // 雷达图核心配置
      radar: {
        indicator: indicator,
        radius: '70%',
        center: ['50%', '55%'],
        name: {
          textStyle: {
            color: '#333',
            fontSize: 12,
          },
        },
        splitLine: {
          lineStyle: { color: '#eee' },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: values,
              name: title,
              itemStyle: { color: '#02B96B' },
              areaStyle: { opacity: 0.3 }, // 带填充更美观
            },
          ],
          symbol: 'circle', // 拐点样式
          symbolSize: 6,
        },
      ],
    };
  } else if (chartData.chart_type == 'histogram_chart') {
    // 直方图
    const { values } = chartData.data;
    const { title, x_label, y_label } = chartData;

    // 基础配置（所有图表通用）
    return {
      color: themeColor,
      tooltip: { trigger: 'axis' },
      grid: { left: 0, right: 0, bottom: 0, top: 16, containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: {
          interval: 0,
          rotate: 45,
          width: 110,
          overflow: 'break',
          lineHeight: 15,
          height: 30,
          align: 'right',
          margin: 10,
          formatter: function (value) {
            return value.replace(/(.*?)（(.*?)）/, '$1\n（$2）');
          }
        },
        // name: x_label,
      },
      yAxis: {
        type: 'value',
        // name: y_label,
      },
      series: [
        {
          name: y_label,
          type: 'bar',
          data: values,
          itemStyle: { borderRadius: 4 }, // 圆角柱子
        },
      ],
    };
  }
};
