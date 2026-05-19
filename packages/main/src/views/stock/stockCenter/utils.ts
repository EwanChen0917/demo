import dayjs from 'dayjs';

export const getThreeMonthsAgo = () => {
  return dayjs().subtract(3, 'month').format('YYYY-MM-DD');
};

export const getToday = () => {
  return dayjs().format('YYYY-MM-DD');
};
