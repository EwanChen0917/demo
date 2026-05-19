export const useReportTypeConfig = (reportType) => {
  const config = computed(() => {
    switch (reportType) {
      case 1:
        return commonConfig;
      case 2:
        return commonConfig;
      case 3:
        return reportType3Config;
      default:
        return commonConfig;
    }
  });
  return config;
};

export default {};

const commonConfig = {
  plan: '重点事项',
  doText: '目标及计划',
  check: '执行状况及数据结果',
  action: '策略及下一步',
  remark: '备注',
};

const reportType3Config = {
  plan: '整体运营数据结果及下一步策略',
  doText: '品类分析-数据变化情况',
  check: '品类分析-下一步计划',
  action: '新品计划',
};
