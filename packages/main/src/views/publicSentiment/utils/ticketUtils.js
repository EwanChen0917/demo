/**
 * 计算处理时限（小时）
 * @param {Array} solutions - 处理方案列表
 * @param {Object} interactions - 互动数据 { likes, comments, shares }
 * @returns {Number} 处理时限（4/8/16）
 */
export const calculateDeadline = (solutions = [], interactions = {}) => {
  const interactionNum =
    interactions.likeCommentReposts ??
    (interactions.likes || 0) +
      (interactions.comments || 0) +
      (interactions.shares || 0);

  const dynamicSolutions = ['操作确认', '频率定性', '客服联系', '官号评论'];
  const fixedSolutionHours = {
    '口碑维护': 8,
    '红人背景': 8,
    '正面热帖': 16,
  };

  let maxHours = 0;
  solutions.forEach((solution) => {
    if (dynamicSolutions.includes(solution)) {
      const hours = interactionNum >= 50 ? 4 : 8;
      maxHours = Math.max(maxHours, hours);
      return;
    }
    if (fixedSolutionHours[solution]) {
      maxHours = Math.max(maxHours, fixedSolutionHours[solution]);
    }
  });

  return maxHours || 8;
};

/**
 * 判断是否显示增量提示
 * @param {Number} current - 当前值
 * @param {Number} increment - 增量百分比
 * @returns {Boolean}
 */
export const shouldShowIncrement = (current, increment) => {
  return current > 50 && increment > 100;
};

/**
 * 格式化增量文本
 * @param {Number} increment - 增量百分比
 * @returns {String}
 */
export const formatIncrement = (increment) => {
  return increment > 0 ? `↑ ${increment}%` : '';
};

/**
 * 格式化数值（K/M）
 * @param {Number} num - 数值
 * @returns {String}
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * 判断工单是否超时
 * @param {String} createTime - 创建时间
 * @param {Number} deadlineHours - 时限（小时）
 * @returns {Boolean}
 */
export const isTicketOverdue = (createTime, deadlineHours) => {
  if (!createTime) return false;
  const deadline = new Date(createTime).getTime() + (deadlineHours || 0) * 60 * 60 * 1000;
  return Date.now() > deadline;
};
