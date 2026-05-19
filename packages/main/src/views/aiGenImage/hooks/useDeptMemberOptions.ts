import { computed, ref } from 'vue';
import { memberApi } from '@/api';

export interface AiGenImageMemberOption {
  memberCode: string;
  name: string;
  avatar?: string;
  title?: string;
  disabled?: boolean;
}

interface DeptMemberListResp {
  memberList?: AiGenImageMemberOption[];
}

interface DeptMemberQuery {
  operatorDepartmentCode?: string;
  deptId?: string;
  searchChildDept?: boolean;
}

interface MemberApiWithDeptMember {
  luteosMemberQueryDeptMemberList: (query: DeptMemberQuery) => Promise<DeptMemberListResp>;
}

interface MemberApiRequestFallback {
  request: <T>(params: { path: string; method: 'GET'; query?: DeptMemberQuery }) => Promise<T>;
}

export function useDeptMemberOptions() {
  const loading = ref(false);
  const options = ref<AiGenImageMemberOption[]>([]);

  const optionMap = computed(() => {
    return options.value.reduce<Record<string, AiGenImageMemberOption>>((map, item) => {
      if (item.memberCode) map[item.memberCode] = item;
      return map;
    }, {});
  });

  const queryOptions = async () => {
    loading.value = true;
    try {
      const query = {
        operatorDepartmentCode: 'all_dept',
      };
      const api = memberApi as unknown as Partial<MemberApiWithDeptMember> &
        MemberApiRequestFallback;
      const res =
        typeof api.luteosMemberQueryDeptMemberList === 'function'
          ? await api.luteosMemberQueryDeptMemberList(query)
          : await api.request<DeptMemberListResp>({
              path: '/api/luteos/member/queryDeptMemberList',
              method: 'GET',
              query,
            });
      options.value = res.memberList ?? [];
    } catch {
      options.value = [];
    } finally {
      loading.value = false;
    }
  };

  const getMember = (memberCode?: string, fallbackName?: string) => {
    if (!memberCode) {
      return {
        name: fallbackName || '-',
        avatar: '',
      };
    }
    const member = optionMap.value[memberCode];
    return {
      name: member?.name || fallbackName || memberCode,
      avatar: member?.avatar || '',
    };
  };

  queryOptions();

  return {
    loading,
    options,
    optionMap,
    queryOptions,
    getMember,
  };
}
