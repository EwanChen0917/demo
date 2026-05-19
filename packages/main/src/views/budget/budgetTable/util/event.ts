/*
 * Budget EventBus
 * 预算事件总线
 */
const events = {};

/*
 * 订阅事件
 * @param {string} eventName - 事件名称
 * @param {function} callback - 回调函数
 */
function on(eventName, callback) {
  if (!events[eventName]) {
    events[eventName] = [];
  }
  events[eventName].push(callback);
}

/*
 * 发送事件
 * @param {string} eventName - 事件名称
 * @param {...any} args - 事件参数
 */
function emit(eventName, ...args) {
  if (events[eventName]) {
    // console.log('emit', eventName);
    events[eventName].forEach((callback) => {
      callback(...args);
    });
  }
}

/*
 * 取消订阅事件
 * @param {string} eventName - 事件名称
 * @param {function} callback - 回调函数
 */
function off(eventName, callback) {
  if (events[eventName]) {
    events[eventName] = events[eventName].filter((item) => item !== callback);
  }
}

/*
 * 创建事件总线实例
 */
const TableEventBus = {
  on,
  emit,
  off,
};

export default TableEventBus

