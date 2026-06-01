import { memberApi, platformApi } from '@/api';

/**
 * 获取账号来源字典
 */
export const fetchAccountSourceDict = async () => {
  return platformApi.platformDict({ dictCodes: ['account_source'] });
};

/**
 * 获取菜单模块字典
 */
export const fetchMenuModuleDict = async () => {
  return platformApi.platformDict({ dictCodes: ['menu_module'] });
};

/**
 * 获取部门树
 */
export const fetchDeptTree = async () => {
  return memberApi.luteosMemberQueryDeptTree({ deptId: null });
};

/**
 * 获取角色分页列表
 * @param {Object} params
 * @param {string} params.keyword - 搜索关键词
 * @param {string} params.platform - 平台筛选
 * @param {string} params.roleCode - 角色代码
 * @param {number} params.pageNum - 页码
 * @param {number} params.pageSize - 每页数量
 */
export const fetchRolePage = async ({
  keyword,
  platform,
  roleCode,
  pageNum = 1,
  pageSize = 10,
} = {}) => {
  const res = await platformApi.platformRoleQueryRoleListV2({
    roleName: keyword,
    platform,
    roleCode,
    pageNum,
    pageSize,
  });
  const recordList = res?.recordList ?? res?.roleList ?? [];
  const total =
    typeof res?.total === 'number'
      ? res.total
      : typeof res?.count === 'number'
        ? res.count
        : recordList.length;
  return {
    total,
    recordList,
  };
};

/**
 * 创建用户
 * @param {Object} payload - 用户信息
 */
export const createUser = async (payload) => {
  return memberApi.luteosMemberAddAccount(payload);
};

/**
 * 获取用户详情
 * @param {string} accountCode - 账号代码
 */
export const fetchUserDetail = async (accountCode) => {
  return memberApi.luteosMemberQueryAccountDetail({
    accountCode,
  });
};
