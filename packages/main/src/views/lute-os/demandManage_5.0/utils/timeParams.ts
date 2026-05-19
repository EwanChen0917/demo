import dayjs from 'dayjs';

interface TimeDimensionParams {
  timeType: number | 'all' | null;
  date?: string;
  year?: string;
  quarter?: 1 | 2 | 3 | 4;
}

type TimeMode = 'day' | 'month';

export const parseTimeDimensionParams = (params: TimeDimensionParams, mode: TimeMode = 'day') => {
  const { date, year, quarter } = params;
  let { timeType } = params;
  let startDate: string | undefined;
  let endDate: string | undefined;

  if (timeType === 1 && date) {
    const formattedYear = dayjs(date).format('YYYY');
    startDate = `${formattedYear}-01${mode === 'day' ? '-01' : ''}`;
    endDate = `${formattedYear}-12${mode === 'day' ? '-31' : ''}`;
  } else if (timeType === 2 && year && quarter) {
    const formattedYear = dayjs(year).format('YYYY');
    if (mode === 'day') {
      const quarterDayMap: Record<1 | 2 | 3 | 4, [string, string]> = {
        1: ['01-01', '03-31'],
        2: ['04-01', '06-30'],
        3: ['07-01', '09-30'],
        4: ['10-01', '12-31'],
      };
      startDate = `${formattedYear}-${quarterDayMap[quarter][0]}`;
      endDate = `${formattedYear}-${quarterDayMap[quarter][1]}`;
    } else {
      const quarterMonthMap: Record<1 | 2 | 3 | 4, [string, string]> = {
        1: ['01', '03'],
        2: ['04', '06'],
        3: ['07', '09'],
        4: ['10', '12'],
      };
      startDate = `${formattedYear}-${quarterMonthMap[quarter][0]}`;
      endDate = `${formattedYear}-${quarterMonthMap[quarter][1]}`;
    }
  } else if (timeType === 3 && date) {
    const currentDate = dayjs(date);
    if (mode === 'day') {
      startDate = currentDate.startOf('month').format('YYYY-MM-DD');
      endDate = currentDate.endOf('month').format('YYYY-MM-DD');
    } else {
      startDate = currentDate.format('YYYY-MM');
      endDate = currentDate.format('YYYY-MM');
    }
  } else if (timeType === 4 && date) {
    startDate = dayjs(date).format('YYYY-MM-DD');
    endDate = dayjs(date).format('YYYY-MM-DD');
  } else if (timeType === 'all') {
    timeType = null;
  }

  return { timeType, startDate, endDate };
};

export const formatDuration = (seconds?: number) => {
  if (seconds === undefined || seconds === null) {
    return '--';
  }
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;
  return `${hour}时${minute}分${second}秒`;
};

