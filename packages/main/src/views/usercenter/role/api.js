import { platformApi } from '@/api';
import { isEmpty } from 'lodash-es';

/**
 * 获取平台列表
 */
export const fetchPlatformList = async () => {
  const res = await platformApi.platformDict({ dictCodes: ['menu_module'] });
  return res?.dictMap?.menu_module || [];
};

/**
 * 获取角色列表
 * @param {Object} query - 查询参数
 * @param {number} query.pageNum - 页码
 * @param {number} query.pageSize - 每页数量
 * @param {string} query.keyword - 搜索关键词
 * @param {string} query.platform - 平台筛选
 */
export const fetchRoleList = async (query = {}) => {
  return platformApi.platformRoleQueryRoleListV2({
    pageNum: query.pageNum || 1,
    pageSize: query.pageSize || 10,
    roleName: query.keyword,
    platform: query.platform,
  });
};

/**
 * 获取角色菜单权限
 * @param {Object} params
 * @param {string} params.platform - 平台代码
 * @param {string} params.roleCode - 角色代码
 * @param {boolean} params.isNew - 是否新建角色
 */
export const fetchRoleMenu = async ({ platform, roleCode }) => {
  return platformApi.platformRoleQueryMenu({
    platform,
    roleCode,
  });
};

/**
 * 获取角色详情
 * @param {string} roleCode - 角色代码
 */
export const fetchRoleDetail = async (roleCode) => {
  return platformApi.platformRoleQueryDetail({
    roleCode,
  });
};

/**
 * 保存角色基本信息
 * @param {Object} payload - 角色信息
 */
export const saveRoleBase = async (payload) => {
  return platformApi.platformRoleSaveRole(payload);
};

/**
 * 保存角色菜单权限
 * @param {Object} params
 * @param {string} params.platform - 平台代码
 * @param {string} params.roleCode - 角色代码
 * @param {Array} params.checkedMenuList - 选中的菜单列表
 */
export const saveRoleMenu = async ({ platform, roleCode, checkedMenuList }) => {
  return platformApi.platformRoleSaveRoleMenu({
    platform,
    roleCode,
    checkedMenuList,
  });
};

/**
 * 保存角色菜单权限 V2
 * @param {Object} payload - 完整的保存参数
 */
export const saveRoleMenuV2 = async (payload) => {
  return platformApi.platformRoleSaveRoleMenu(payload);
};

/**
 * 获取更新日志
 * @param {Object} params
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.roleCode - 角色代码
 */
export const fetchUpdateLogs = async (params = {}) => {
  const { page = 1, pageSize = 10 } = params;
  const res = await platformApi.platformQueryLog({
    pageNum: page,
    pageSize,
    moduleType: 'platform_role',
    itemCode: params.roleCode,
    countFlag: 1,
  });

  const logList = res?.logList || [];
  const total = typeof res?.total === 'number' ? res.total : logList.length;
  const hasMore =
    typeof res?.pages === 'number'
      ? page < res.pages
      : logList.length >= pageSize && page * pageSize < total;

  // 收集操作项
  const collectItems = (groups = [], matcher, fallbackDesc) => {
    const results = [];
    groups.forEach((group) => {
      const desc = group?.operateTypeDesc || fallbackDesc || '';
      if (!matcher.test(desc)) return;
      const items = group?.itemList || [];
      items.forEach((item) => {
        if (item?.itemName) {
          results.push(item.itemName);
        }
      });
    });
    return results;
  };

  // 格式化日志列表
  const list = logList.map((log) => {
    const rawContent = log?.operationContent;
    const content =
      rawContent && String(rawContent) !== 'null' ? String(rawContent).replace(/"/g, '') : '';
    const added = collectItems(log?.operateTypeItemList, /新增|绑定/, log?.operationTypeDesc);
    const removed = collectItems(
      log?.operateTypeItemList,
      /取消|移除|删除|解绑菜单/,
      log?.operationTypeDesc
    );
    return {
      time: log?.operationTime || '',
      operator: log?.operatorName || log?.operator || '--',
      avatar: log?.avatar || '',
      content,
      added: isEmpty(added) ? [] : added,
      removed: isEmpty(removed) ? [] : removed,
    };
  });

  return { list, total, hasMore, page, pageSize };
};

/**
 * 操作角色状态（启用/禁用）
 * @param {Object} params
 * @param {string} params.roleCode - 角色代码
 * @param {string} params.operateType - 操作类型
 */
export const operateRoleStatus = async ({ roleCode, operateType }) => {
  return platformApi.platformRoleOperate({
    roleCode,
    operateType,
  });
};
