import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { formatNumber } from '@/views/bi/utils/utils';
import { useResizeObserver } from '@vueuse/core';

export function useStationWordCloud() {
  let instance: echarts.ECharts | null = null;
  const domRef = ref(null);
  const initChart = (data) => {
    if (!domRef.value) return;

    const list = data.map((x) => {
      return {
        name: x.name,
        oValue: x.value * 100,
        qty: x.qty,
        value: x.qty,
      };
    });

    // data = data.map((item) => ({
    //   name: item.name,
    //   value: item.value * 100,
    //   qty: item.qty,
    // }));
    //
    // data.sort((a, b) => b.value - a.value);
    // let levelsCount = [1, 3, 5, 7, 9];
    //
    // let startIndex = 0;
    // let list = levelsCount
    //   .map((x, i) => {
    //     let res = data.slice(startIndex, startIndex + x);
    //     startIndex += x;
    //     return res.map((x) => {
    //       return {
    //         name: x.name,
    //         oValue: x.value,
    //         qty: x.qty,
    //         value: levelsCount.length - i,
    //       };
    //     });
    //   })
    //   .flat(Infinity);
    if (!instance) {
      instance = echarts.init(domRef.value);
      useResizeObserver(domRef, () => {
        instance!.resize();
      });
    }

    const min = Math.min(...list.map((item) => item.value));
    const max = Math.max(...list.map((item) => item.value));

    const option = {
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {
        show: true,
        position: 'right',
        formatter(params) {
          const { data } = params;
          let tooltipText = ``;

          tooltipText += `
            <div  style="margin-top: 6px; color: #666; font-family: 'PingFang SC';">
                <span  style="color: #666; font-family: 'PingFang SC';">${params.name}</span>
                <strong  style="color: #1f1f1f;">${formatNumber(data.qty, 0)}</strong>
                <strong  style="color: #999;">(${formatNumber(data.oValue, 1)}%)</strong>
            </div>
           `;
          return tooltipText;
        },
      },
      series: [
        {
          type: 'wordCloud',
          sizeRange: [10, 26],
          rotationRange: [0, 0],
          gridSize: 30,
          wight: '100%',
          height: '100%',
          // shape: 'circle',
          shape: 'square',
          drawOutOfBound: true,
          textStyle: {
            fontFamily: 'PingFang SC',
            fontWeight: 'bolder',
            color(params: any) {
              const { value } = params;
              return `rgba(2, 179, 107, ${((value - min) / (max - min)) * 0.4 + 0.6})`;
            },
            // fontWeight(name, weight,fontSize,[value]) {
            //   return value > 4 ? 'bold' : 'normal';
            // },
          },
          emphasis: {
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          data: list,
        },
      ],
    };

    instance.setOption(option);
  };
  return {
    domRef,
    initChart,
  };
}

export default {};
