import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function formatTime(time) {
  if (time < 0) {
    return '0s';
  }
  // 小于1分钟显示秒
  if (time < 60) {
    return `${time}s`;
  }

  // 小于1小时显示分钟，保留最多2位小数，小数点为0时不显示
  const minutes = time / 60;
  if (minutes < 60) {
    const formattedMinutes = minutes.toFixed(2).replace(/\.?0+$/, '');
    return `${formattedMinutes}min`;
  }

  // 1小时及以上显示小时，保留最多2位小数，小数点为0时不显示
  const hours = time / 3600;
  const formattedHours = hours.toFixed(2).replace(/\.?0+$/, '');
  return `${formattedHours}h`;
}

/**
 * 将秒数转换为数字格式的时分秒 (HH:MM:SS)
 * @param {number} seconds - 秒数
 * @returns {string} 格式化后的时间字符串
 */
function secondsToDigitalFormat(seconds) {
  const dur = dayjs.duration(seconds, 'seconds');

  const hours = Math.floor(dur.asHours());
  const minutes = dur.minutes();
  const secs = dur.seconds();

  // 补零处理
  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

function formatTimeDifference(start, end) {
  const diffDuration = dayjs.duration(dayjs(end).diff(dayjs(start)));

  const seconds = diffDuration.seconds();
  const minutes = diffDuration.minutes();
  const hours = Math.floor(diffDuration.asHours());

  const parts = [];
  if (hours > 0) parts.push(`${hours}时`);
  if (minutes > 0) parts.push(`${minutes}分`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}秒`); // 如果所有值都是0，至少显示0秒

  return parts.join('');
}


/**
 * 获取当前时段（凌晨、早上、上午、中午、下午、晚上）
 * @returns {string} 时段文案
 */
function getTimePeriod() {
  const now = dayjs();
  const hour = now.hour();
  if (hour >= 0 && hour < 6) return '凌晨';
  if (hour >= 6 && hour < 9) return '早上';
  if (hour >= 9 && hour < 12) return '上午';
  if (hour >= 12 && hour < 14) return '中午';
  if (hour >= 14 && hour < 18) return '下午';
  return '晚上';
}

/**
 * 获取世界主要城市时间
 * @returns {object} 主要城市时间对象
 */
function getWorldTime() {
  const now = dayjs();
  return [
    {
      currentTime : now.tz('Asia/Shanghai').format('MM-DD HH:mm:ss'),
      timeZone: "北京",
      zoneId: "Asia/Shanghai"
    },
    {
      currentTime : now.tz('America/Los_Angeles').format('MM-DD HH:mm:ss'),
      timeZone: "美西",
      zoneId: "America/Los_Angeles"
    },
    {
      currentTime : now.tz('America/New_York').format('MM-DD HH:mm:ss'),
      timeZone: "美东",
      zoneId: "America/New_York"
    },
    {
      currentTime : now.tz('Europe/London').format('MM-DD HH:mm:ss'),
      timeZone: "英国",
      zoneId: "Europe/London"
    },
  ]
}
export {
  formatTime,
  secondsToDigitalFormat,
  formatTimeDifference,
  getTimePeriod,
  getWorldTime,
};


