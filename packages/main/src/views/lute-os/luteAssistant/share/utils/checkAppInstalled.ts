// 通过软件的安装协议，检测是否安装
/**
 * uri 打开客户端的uri
 * cb 打开客户端失败回调
 * successCb 打开客户端成功回调
 */
export function openUriWithInputTimeoutHack(uri: string, cb: () => void) {
  window.location.href = uri;

  const timeout = setTimeout(function () {
    cb && cb();
  }, 1000);
}
function registerEvent(target: HTMLElement, eventType: string, cb: () => void) {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb);
    return {
      remove() {
        target.removeEventListener(eventType, cb);
      },
    };
  }
  target.addEventListener(eventType, cb);
  return {
    remove() {
      target.removeEventListener(eventType, cb);
    },
  };
}

export default {};
