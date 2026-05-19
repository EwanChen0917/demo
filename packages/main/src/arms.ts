import armsRum from '@arms/rum-browser';

export const ARMS_ENV = import.meta.env.VITE_ARMS_ENV;
type ArmsUserInfo = Record<string, any> | null | undefined;

const toStringOrEmpty = (value: unknown) =>
  value === null || value === undefined ? '' : String(value);

const buildTags = (userInfo: ArmsUserInfo) => {
  if (!userInfo) return '';

  return Object.entries({
    userName: userInfo?.name,
    memberCode: userInfo?.memberCode,
    title: userInfo?.title,
    ...userInfo?.deptInfo,
  })
    .map(([key, value]) => `${key}:${value}`)
    .join(',');
};

const buildProperties = (userInfo: ArmsUserInfo) => {
  if (!userInfo) return {};

  const properties = {
    memberCode: toStringOrEmpty(userInfo?.memberCode),
    userName: toStringOrEmpty(userInfo?.name),
    nickname: toStringOrEmpty(userInfo?.nickname),
    source: toStringOrEmpty(userInfo?.source),
    provinceName: toStringOrEmpty(userInfo?.provinceName),
    cityName: toStringOrEmpty(userInfo?.cityName),
    deptId: toStringOrEmpty(userInfo?.deptInfo?.deptId || userInfo?.rootDeptId),
    deptName: toStringOrEmpty(userInfo?.deptInfo?.deptName),
    title: toStringOrEmpty(userInfo?.title),
  };

  return Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== ''));
};

if (ARMS_ENV) {
  armsRum.init({
    endpoint:
      'https://proj-xtrace-6b4331a1f2f523f368609a2cfd2838b7-cn-hangzhou.cn-hangzhou.log.aliyuncs.com/rum/web/v2?workspace=default-cms-1631129860208995-cn-hangzhou&service_id=g26qpo8rj7@d44a8515a3155ef0e0847',
    // 设置环境信息，参考值：'prod' | 'gray' | 'pre' | 'daily' | 'local'
    env: ARMS_ENV,
    // 设置路由模式， 参考值：'history' | 'hash'
    spaMode: 'history',
    collectors: {
      // 页面性能指标监听开关，默认开启
      perf: true,
      // WebVitals指标监听开关，默认开启
      webVitals: true,
      // Ajax监听开关，默认开启
      api: true,
      // 静态资源开关，默认开启
      staticResource: true,
      // JS错误监听开关，默认开启
      jsError: true,
      // 控制台错误监听开关，默认开启
      consoleError: true,
      // 用户行为监听开关，默认开启
      action: true,
    },
    // 链路追踪配置开关，默认关闭
    tracing: false,
  });
}

export const syncArmsUser = (userInfo?: ArmsUserInfo) => {
  if (!ARMS_ENV) return;

  const userId = toStringOrEmpty(userInfo?.memberCode);
  const userName = toStringOrEmpty(userInfo?.name || userInfo?.nickname);

  if (!userId && !userName) {
    armsRum.setConfig('user', {
      id: '',
      name: '',
      tags: '',
    });
    armsRum.setConfig('properties', {});
    return;
  }

  armsRum.setConfig('user', {
    id: userId,
    name: userName,
    tags: buildTags(userInfo),
  });
  armsRum.setConfig('properties', buildProperties(userInfo));
};

export const clearArmsUser = () => {
  if (!ARMS_ENV) return;

  armsRum.setConfig('user', {
    id: '',
    name: '',
    tags: '',
  });
  armsRum.setConfig('properties', {});
};

export default armsRum;
