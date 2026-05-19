<template>
  <div class="calendar">
    <header>
      <el-icon @click="prevMonth">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9.33325 11.6665L4.66659 6.99984L9.33325 2.33317" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </el-icon>
      <span>{{ currentYear }}年{{ currentMonth }}月</span>
      <el-icon @click="nextMonth">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4.66675 11.6665L9.33341 6.99984L4.66675 2.33317" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </el-icon>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in calendar" :key="index">
            <td v-for="(day, idx) in week" :key="idx" @click="selectDate(day)">
              <div
                class="day"
                :class="{
                  active: day.isActive,
                  today: day.isToday,
                  marked: day.isMarked,
                }"
              >
                {{ day.label }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <el-icon :class="{ open: isOpen }" @click="toggle">
        <ArrowUpBold />
      </el-icon>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';

  const emit = defineEmits(['update:selectedDate']);
  const props = withDefaults(
    defineProps<{
      selectedDate: string;
      markedDates: string[];
    }>(),
    {
      selectedDate: dayjs().format('YYYY-MM-DD'),
      markedDates: [],
    }
  );

  const isOpen = ref(false);

  // 当前选择的年份和月份
  const currentYear = ref(dayjs(props.selectedDate).year());
  const currentMonth = ref(dayjs(props.selectedDate).month() + 1);

  // 定义周天名称
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const buildOneDay = (date) => {
    const d = dayjs(date);
    return {
      label: d.date(),
      date: d.format('YYYY-MM-DD'),
      isActive: d.isSame(props.selectedDate, 'day'),
      isToday: d.isSame(dayjs(), 'day'),
      isMarked: props.markedDates.some((x) => {
        return d.isSame(x, 'day');
      }),
    };
  };

  // 生成日历数据
  const calendar = computed(() => {
    const firstDayOfMonth = dayjs(`${currentYear.value}-${currentMonth.value}-01`);
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const firstDayOfWeek = firstDayOfMonth.day(); // 0-6 (周日-周六)

    // 获取上个月的天数
    const prevMonth = firstDayOfMonth.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();

    const calendarData = [];
    let week = [];

    // 填充上个月的日期到第一周
    for (let i = 0; i < firstDayOfWeek; i++) {
      const date = daysInPrevMonth - firstDayOfWeek + i + 1;
      const day = dayjs(`${prevMonth.year()}-${prevMonth.month() + 1}-${date}`).format(
        'YYYY-MM-DD'
      );
      week.push(buildOneDay(day));
    }

    // 填充当月的所有天数
    for (let i = 1; i <= daysInMonth; i++) {
      if (week.length === 7) {
        calendarData.push(week);
        week = [];
      }
      const day = dayjs(`${currentYear.value}-${currentMonth.value}-${i}`).format('YYYY-MM-DD');
      week.push(buildOneDay(day));
    }

    // 填充下个月的日期到最后一周
    if (week.length > 0) {
      const nextMonth = firstDayOfMonth.add(1, 'month');
      const remainingDays = 7 - week.length;
      for (let i = 1; i <= remainingDays; i++) {
        const day = dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${i}`).format('YYYY-MM-DD');
        week.push(buildOneDay(day));
      }
      calendarData.push(week);
    }
    if (isOpen.value) {
      return calendarData;
    } else {
      // 只显示一行，就显示当前选中的一行
      const currentRow = calendarData.find((week) => {
        return week.some((y) => y.isActive);
      });
      if (currentRow) {
        return [currentRow];
      }
      // 没有选择日期，就显示今天所在行
      const todayRow = calendarData.find((week) => {
        return week.some((y) => y.isToday);
      });
      if (todayRow) {
        return [todayRow];
      }
      // 默认显示第一行
      return [calendarData[0]];
    }
  });

  // 选择日期
  const selectDate = (day: { date: string; label: string }) => {
    emit('update:selectedDate', day.date);
  };

  // 上一个月
  const prevMonth = () => {
    if (currentMonth.value === 1) {
      currentMonth.value = 12;
      currentYear.value--;
    } else {
      currentMonth.value--;
    }
    open();
  };

  // 下一个月
  const nextMonth = () => {
    if (currentMonth.value === 12) {
      currentMonth.value = 1;
      currentYear.value++;
    } else {
      currentMonth.value++;
    }
    open();
  };

  const open = () => {
    isOpen.value = true;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<style scoped lang="scss">
  .calendar {
    text-align: center;
    font-family: Arial, sans-serif;

    header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px 16px 10px;
      border-radius: 5px;
      user-select: none;
      color: var(---N9, #1F1F1F);

      /* 重要/Medium 16 */
      font-family: 'PingFang SC Medium';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 150% */

      span {
        font-size: 16px;
        color: var(---N9, #1f1f1f);
        padding: 0 6px;
      }

      :deep(.el-icon) {
        cursor: pointer;
        position: relative;
      }
    }

    main {
      padding: 0 6px;

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 auto;

        th,
        td {
          width: calc(100% / 7);
          height: 30px;
          font-size: 12px;
          font-weight: 500;
        }

        td {
          cursor: pointer;

          .day {
            display: inline-flex;
            width: 20px;
            height: 20px;
            line-height: 20px;
            align-items: center;
            justify-content: center;
            border-radius: 80px;
            border: 1px solid transparent;

            &.today {
              background: var(--el-color-primary-light-9);
              border: 1px solid var(--el-color-primary-light-7);
            }

            &.active {
              color: white;
              background: var(---N9, #1f1f1f);
              border-color: transparent;
            }

            &.marked {
              position: relative;

              &::before {
                content: '';
                position: absolute;
                top: -2px;
                right: -3px;
                transform: translateX(-50%);
                width: 6px;
                height: 6px;
                background-color: red;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }

    footer {
      padding: 4px 0;
      color: #999;

      i {
        width: 20px;
        height: 20px;
        cursor: pointer;
        transform: rotate(180deg);
        transition: all 0.3s ease;

        &.open {
          transform: rotate(0deg);
        }
      }
    }
  }
</style>