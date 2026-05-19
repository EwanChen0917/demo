import { erpApi, memberApi, platformApi } from '@/api';
import { ref } from 'vue';

export type baseOptions = {
  label: string;
  value: string;
};

export const baseUseVisualizationOptions = () => {
  // ============================= 渠道列表 =============================
  const channelList = ref<any>([]);
  const getChannelList = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['b2b_client_order_sale_type'],
    });
    channelList.value = res?.dictMap?.b2b_client_order_sale_type?.map((e: any) => {
      return {
        value: e.value as string,
        label: (e.desc || '') as string,
      };
    });
  };
  // ============================= 部门树 =============================
  const deptTreeData = ref();
  const deepTree = (data) => {
    data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      item.label = item.deptName;
      item.value = item.deptId;
    });
  };
  const getDeptTreeData = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null as any });
    const data = res.deptInfoList;
    deepTree(res.deptInfoList);
    deptTreeData.value = data;
  };
  // ============================= 客户类型列表 =============================
  const b2bClientType = ref<any>([]);
  const queryB2bClientType = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['b2b_client_type'],
    });
    const clientType = new Map<string, string>();
    b2bClientType.value = res?.dictMap?.b2b_client_type.filter((e) => {
      if (clientType.has(e.value)) {
        return false;
      }
      clientType.set(e.value, e.desc);
      return true;
    });
  };
  // ============================= 客户编码列表 =============================
  const customerList = ref<any[]>([]);
  const queryCustomerList = async () => {
    const res = await erpApi.luteosErpBaseB2BClientQueryList({
      pageNum: 1,
      pageSize: 500,
    });
    const list = res?.recordList ?? [];
    const seen = new Set<string>();
    customerList.value = list.filter((e) => {
      const code = (e?.code ?? '').trim();
      const name = (e?.name ?? '').trim();
      if (!code || !name) return false;
      if (seen.has(code)) return false;
      seen.add(code);
      return true;
    });
  };
  // ============================= 订单状态 =================================
  /**
   * 
   * DRAFT("draft", "草稿"),
    AUDITING("auditing", "审核中"),
    PICKING("picking", "拣配中"),
    WAIT_SHIP("wait_ship", "待发货"),
    SHIPPED("shipped", "已发货"),
    SIGNED("signed", "已签收"),
    WAITING_ARRIVAL("waiting_arrival", "等待到货中"),
    EXCEPTION("exception", "异常处理中"),
   */
  const orderStatusList = ref<baseOptions[]>([
    {
      label: '草稿',
      value: 'draft',
    },
    {
      label: '审核中',
      value: 'auditing',
    },
    {
      label: '拣配中',
      value: 'picking',
    },
    {
      label: '待发货',
      value: 'wait_ship',
    },
    {
      label: '已发货',
      value: 'shipped',
    },
    {
      label: '已签收',
      value: 'signed',
    },
    {
      label: '等待到货中',
      value: 'waiting_arrival',
    },
    {
      label: '异常处理中',
      value: 'exception',
    },
  ]);
  const memberList = ref<any[]>([]);
  const queryMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
      searchChildDept: true,
    });
    memberList.value = res?.memberList as any[];
  };
  return {
    channelList,
    getChannelList,
    deptTreeData,
    getDeptTreeData,
    b2bClientType,
    queryB2bClientType,
    orderStatusList,
    customerList,
    queryCustomerList,
    memberList,
    queryMemberList,
  };
};
