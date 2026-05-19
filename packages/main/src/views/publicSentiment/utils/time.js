import dayjs from 'dayjs';

/**
 * 格式化处理时限/日志时间
 * @param {string} dateStr - 时间字符串
 * @returns {string} 格式化后的时间
 */
export const formatDeadline = (dateStr) => {
  if (!dateStr) return '';
  const value = dayjs(dateStr);
  if (!value.isValid()) return dateStr;
  const today = dayjs();
  const yesterday = today.subtract(1, 'day');
  const tomorrow = today.add(1, 'day');
  if (value.isSame(today, 'day')) {
    return `今天 ${value.format('HH:mm')}`;
  }
  if (value.isSame(yesterday, 'day')) {
    return `昨天 ${value.format('HH:mm')}`;
  }
  if (value.isSame(tomorrow, 'day')) {
    return `明天 ${value.format('HH:mm')}`;
  }
  return value.format('YYYY-MM-DD HH:mm');
};
