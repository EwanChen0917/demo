import dayjs from 'dayjs';

export const datePickerConfig = {
  shortcuts: [
    {
      text: '本月',
      value: [dayjs().startOf('month'), dayjs().endOf('month')],
    },
    {
      text: '上月',
      value: [
        dayjs().subtract(1, 'month').startOf('month'),
        dayjs().subtract(1, 'month').endOf('month'),
      ],
    },
    {
      text: '最近半年',
      value: [dayjs().subtract(6, 'month').startOf('month'), dayjs().endOf('month')],
    },
    {
      text: '今年',
      value: [dayjs().startOf('year'), dayjs().endOf('year')],
    },
  ],
};

export default {};
