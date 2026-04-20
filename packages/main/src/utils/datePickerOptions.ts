import dayjs from 'dayjs';

// 时间配置对象
const shortCuts = {
  1: {
    text: '今天',
    value() {
      return [
        dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ];
    },
  },
  2: {
    text: '昨天',
    value() {
      return [
        dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ];
    },
  },
  3: {
    text: '最近7天',
    value() {
      return [
        dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ];
    },
  },
  4: {
    text: '最近30天',
    value() {
      return [
        dayjs().subtract(29, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ];
    },
  },
  5: {
    text: '本月',
    value() {
      return [
        dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ];
    },
  },
  6: {
    text: '上月',
    value() {
      return [
        dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
      ];
    },
  },
};

/**
 * 返回  快捷时间选择列表
 * @param include Array
 * 1.今天 2.昨天 3.最近7天(包括当天) 4.最近30天(包括当天) 5.本月 6.上月
 */
export function getShortcuts(include = [1, 2, 3, 4, 5, 6]) {
  const list = [];
  include.forEach((v) => {
    if (shortCuts[v]) list.push(shortCuts[v]);
  });
  return list;
}

/**
 * 返回  默认天数
 * @param range
 * @param returnArray
 */
export function getInitTime(range = [89, -1], returnArray = true) {
  const startTime = dayjs().subtract(range[0], 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const endTime = dayjs().subtract(range[1], 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
  if (returnArray) {
    return [startTime, endTime];
  }
  return { startTime, endTime };
}
