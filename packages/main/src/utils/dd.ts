import * as dd from 'dingtalk-jsapi';

/**
 * 判断是否在钉钉环境（多重检测策略）
 * 1. UserAgent 检测：同步可用，不依赖 JSAPI 初始化
 * 2. dd.env.platform 检测：JSAPI 初始化后可用
 */
export const isDingTalk = () => {
  const byUA = /DingTalk/i.test(navigator.userAgent);
  const byPlatform = dd.env.platform !== 'notInDingTalk';
  // console.log(
  //   '[DingTalk] 环境检测 UA:',
  //   navigator.userAgent,
  //   '| byUA:',
  //   byUA,
  //   '| byPlatform:',
  //   byPlatform
  // );
  return byUA || byPlatform;
};

export const GetCode = (callback) => {
  const corpId = 'ding1a1c6d46f33cfeb735c2f4657eb6378f'; // 钉钉企业id
  if (isDingTalk()) {
    let called = false;
    const requestCode = () => {
      if (called) return;
      called = true;
      // console.log('[DingTalk] 开始请求免登授权码...');
      dd.runtime.permission
        .requestAuthCode({ corpId })
        .then((res) => {
          // console.log('[DingTalk] 获取授权码成功');
          localStorage.setItem('token', res.code);
          callback(res.code);
        })
        .catch((err) => {
          // console.error('[DingTalk] 免登授权失败', err);
          called = false; // 重置标记，允许超时兜底重试
        });
    };

    // dd.ready 确保 JSAPI 就绪后调用
    dd.ready(() => {
      // console.log('[DingTalk] dd.ready 已触发');
      requestCode();
    });

    // 超时兜底：dd.ready 在桌面端可能不触发，3s 后直接尝试调用
    setTimeout(() => {
      if (!called) {
        // console.warn('[DingTalk] dd.ready 超时，直接尝试获取授权码');
        requestCode();
      }
    }, 3000);
  } else {
    callback('');
    // console.error('非钉钉环境');
  }
};
