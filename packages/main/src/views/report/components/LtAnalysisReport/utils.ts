import * as swal from '@/utils/swal';
import { ElMessage, type MessageHandler } from 'element-plus';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { mpcWeeklyReportApi, MpcWeeklyReportContracts } from '@/api';

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

let messageHandler: MessageHandler | null = null;
export const onDeleteReport = async (detail, successCb, revokeCb) => {
  const isConfirmed = await swal.confirm({
    title: '是否删除该报告？',
    icon: 'warning',
    text: '报告删除后将无法进行恢复',
  });
  if (!isConfirmed) return;
  await mpcWeeklyReportApi.luteosMarketWeekReportDelete({
    reportId: detail.reportId,
  });
  messageHandler = ElMessage.success({
    showClose: true,
    message: () =>
      h('div', [
        h('span', '报告删除成功'),
        h(
          'span',
          {
            style: { color: '#02B96B', cursor: 'pointer', marginLeft: '20px' },
            onClick: () => handleRevokeDelete(detail, revokeCb),
          },
          '撤销'
        ),
      ]),
  });
  successCb?.();
};
const handleRevokeDelete = async (detail, cb?: () => void) => {
  if (messageHandler) {
    messageHandler.close();
    messageHandler = null;
  }
  await mpcWeeklyReportApi.luteosMarketWeekReportCancelDelete({
    reportId: detail.reportId,
  });

  ElMessage.success('已撤销删除');
  cb?.();
};

export const copyFolder = async (
  item: string,
  date: string,
  dateType: 'week' | 'month',
  weekList: MpcWeeklyReportContracts.WeekBean[],
  reportTypes?: string,
  branch?: string
) => {
  if (!reportTypes || !branch) {
    return;
  }
  if (dateType === 'week') {
    const weekOption = weekList.find((week) => week.week === date);
    if (!weekOption) {
      ElMessage.error('未找到对应周数据');
      return;
    }

    // 根据copyWeek 获取该周的最后一
    await mpcWeeklyReportApi.luteosMarketWeekReportCopyPeriod({
      reportTypes: reportTypes.split(','),
      branch,
      period: item,
      targetPeriod: date,
      targetStartDate: weekOption.startDate,
      targetEndDate: weekOption.endDate,
    });
  } else {
    // 根据copyWeek 获取该周的最后一
    await mpcWeeklyReportApi.luteosMarketWeekReportCopyPeriod({
      reportTypes: reportTypes.split(','),
      branch,
      period: item,
      targetPeriod: dayjs(date).format('YYYY-MM'),
      targetStartDate: dayjs(date).startOf('month').format('YYYY-MM-DD'),
      targetEndDate: dayjs(date).endOf('month').format('YYYY-MM-DD'),
    });
  }
};

export const calcCurrentWeek = (date: dayjs.Dayjs | Date) => {
  let lastDay = '';
  let weekNum = dayjs(date).week().toString().padStart(2, '0');
  let year = dayjs(date).weekYear();
  const firstDayOfYear = dayjs(year).day();
  if (firstDayOfYear === 0) {
    lastDay = dayjs(date).add(6, 'day').format('MM-DD');
  } else {
    const adjustedValue = dayjs(date).subtract(1, 'week');
    year = adjustedValue.weekYear();
    weekNum = adjustedValue.week().toString().padStart(2, '0');
  }
  lastDay = dayjs(date).add(6, 'day').format('YYYY-MM-DD');
  return {
    year,
    weekNum,
    startDay: dayjs(date).format('YYYY-MM-DD'),
    lastDay,
  };
};

let weekList: MpcWeeklyReportContracts.WeekBean[] | null = null;
export const getWeekList = async () => {
  if (weekList) {
    return weekList;
  }
  const res = await mpcWeeklyReportApi.luteosMarketWeekReportQueryWeekList();
  weekList = res.weekList || [];
  return weekList;
};

export default {};
