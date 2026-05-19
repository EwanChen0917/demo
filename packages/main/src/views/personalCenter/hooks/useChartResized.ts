import { onUnmounted } from 'vue';

// 必须在 setup 同步调用
export const useChartResized = () => {
  const charts = [];
  const resize = () => {
    charts.forEach((chart) => {
      chart.resize();
    });
  };

  window.addEventListener('resize', resize);

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    charts.length = 0; // 清空数组
  });

  return {
    addChartResized: (chart) => {
      if (!chart) {
        return;
      }
      charts.push(chart);
    },
    removeChart: (chart) => {
      if (!chart) {
        return;
      }
      const index = charts.indexOf(chart);
      if (index !== -1) {
        charts.splice(index, 1);
      }
    }
  };
};