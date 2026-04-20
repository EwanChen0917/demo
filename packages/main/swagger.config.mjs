import path from 'node:path';

// Basic auth 凭证，可通过环境变量覆盖，默认使用原始内置值
const authorization = process.env.SWAGGER_AUTHORIZATION ?? 'Basic YWRtaW46OTgyMSpkOGFzODk4';

// API 服务器根地址，可通过环境变量覆盖
const ORIGIN = process.env.SWAGGER_ORIGIN ?? 'https://api.luteos.site';

// 返回服务器 origin（末尾不带斜杠）
function getOrigin() {
  return ORIGIN.replace(/\/$/, '');
}

// 返回环境路径后缀，如 /test /prod，默认为空
function getAppendEnv() {
  return process.env.SWAGGER_ENV_SUFFIX ?? '';
}

/**
 * Swagger/OpenAPI codegen config.
 *
 * `mass` entries inherit root fields unless overridden.
 * Each entry supports:
 *   - ns: 文件输出子目录名
 *   - group: Knife4j 分组名（用于 ?group= 参数）
 *   - url: 服务名路径段（默认 lute-os-admin-server）
 *   - fullUrl: 完整覆盖 URL（优先级最高）
 */
export default {
  output: './src/api',
  generateClient: true,
  generateRouteTypes: true,
  httpClientType: 'axios',
  cleanOutput: true,
  modular: true,
  retry: {
    retries: 1,
    delayMs: 1000,
  },
  hooks: {
    onCreateRoute(routeData) {
      return {
        ...routeData,
        namespace: 'api',
      };
    },
  },
  fetch: {
    headers: authorization ? { Authorization: authorization } : {},
  },
  mass: [
    {
      ns: 'product',
      group: '商品中心',
    },
  ].map(({ ns, group, url, fullUrl }) => ({
    name: ns,
    output: path.resolve(process.cwd(), `./src/api/${ns}`),
    url:
      fullUrl ||
      `${getOrigin()}/${url ?? 'lute-os-admin-server'}${getAppendEnv()}/v2/api-docs?group=${encodeURIComponent(group)}`,
  })),
};
