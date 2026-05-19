// src/utils/timeParams.js
import dayjs from 'dayjs';

/**
 * @param {Object} params { timeType, date, year, quarter }
 * @param {'day'|'month'} [mode='day']   // 新增 mode，决定格式
 */
export function parseTimeDimensionParams(params, mode = 'day') {
  let { timeType, date, year, quarter } = params;
  let startDate = null;
  let endDate = null;

  if (timeType === 1 && date) {
    // 年
    const y = dayjs(date).format('YYYY');
    startDate = `${y}-01${mode === 'day' ? '-01' : ''}`;
    endDate = `${y}-12${mode === 'day' ? '-31' : ''}`;
  } else if (timeType === 2 && year && quarter) {
    const y = dayjs(year).format('YYYY');
    const qMap = {
      1: ['01', '03'],
      2: ['04', '06'],
      3: ['07', '09'],
      4: ['10', '12'],
    };
    if (mode === 'day') {
      // 保持原样
      const qMapDay = {
        1: ['01-01', '03-31'],
        2: ['04-01', '06-30'],
        3: ['07-01', '09-30'],
        4: ['10-01', '12-31'],
      };
      startDate = `${y}-${qMapDay[quarter][0]}`;
      endDate = `${y}-${qMapDay[quarter][1]}`;
    } else {
      // 月份模式
      startDate = `${y}-${qMap[quarter][0]}`;
      endDate = `${y}-${qMap[quarter][1]}`;
    }
  } else if (timeType === 3 && date) {
    const m = dayjs(date);
    if (mode === 'day') {
      startDate = m.startOf('month').format('YYYY-MM-DD');
      endDate = m.endOf('month').format('YYYY-MM-DD');
    } else {
      // 月模式
      startDate = endDate = m.format('YYYY-MM');
    }
  } else if (timeType === 4 && date) {
    startDate = endDate = dayjs(date).format('YYYY-MM-DD');
  } else if (timeType === 'all') {
    startDate = endDate = undefined;
    timeType = null;
  }

  return {
    timeType,
    startDate,
    endDate,
  };
}

export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '--';

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h}时${m}分${s}秒`;
}
