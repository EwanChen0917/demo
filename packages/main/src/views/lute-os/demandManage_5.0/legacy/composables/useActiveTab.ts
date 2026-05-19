import { ref } from 'vue'
import { platformApi } from '@/api'

interface TabConfig {
  key: string
  label: string
  countField: string
}

const tabPriorityList: TabConfig[] = [
  { key: 'feedback', label: '待反馈', countField: 'waitForFeedbackNum' },
  { key: 'toReceive', label: '待查收', countField: 'waitForReceiptNum' },
  { key: 'executing', label: '执行中', countField: 'executingNum' },
  { key: 'reviewing', label: '审批中', countField: 'approvingNum' },
  { key: 'rejected', label: '审批未通过', countField: 'approveNotPassNum' }
]
export const demandExecuteTabList = [
  { key: 'completed', label: '已完结', countField: 'executeEndNum' },
  { key: 'executing', label: '执行中', countField: 'executingNum' },
  { key: 'reviewing', label: '审批中', countField: 'approvingNum' },
  { key: 'notApproved', label: '内审未通过', countField: 'internalAuditNotPassNum' },
];
export const myDemandTabList = [
  { key: 'completed', label: '已完结', countField: 'executeEndNum' },
  { key: 'executing', label: '执行中', countField: 'executingNum' },
  { key: 'interAudit', label: '内审中', countField: 'internalAuditingNum' },
  { key: 'notApproved', label: '内审未通过', countField: 'internalAuditNotPassNum' },
];
export const demandExecuteTabStatusMap = demandExecuteTabList.reduce((map, t) => {
  map[t.key] = t.status
  return map
}, {} as Record<string, number>)
export function useActiveTab() {
  const activeTab = ref<string>('')
  const loading = ref(false)
  const tabCountMap = ref<Record<string, number>>({})

  // 只做初始化（页面加载/刷新时用一次）
  const initActiveTabWithData = async (menuTag: string) => {
    loading.value = true
    try {
      const res = await platformApi.platformDemandStatusCount({
        demandModule: 'user_research',
        menuTag: menuTag
      })
      const counts = res || {}

      tabCountMap.value = {}
      for (const tab of tabPriorityList) {
        tabCountMap.value[tab.key] = counts[tab.countField] ?? 0
      }

      // 只在初始化时设置 activeTab
      let found = false
      for (const tab of tabPriorityList) {
        if ((counts[tab.countField] ?? 0) > 0) {
          activeTab.value = tab.key
          found = true
          break
        }
      }
      if (!found) {
        activeTab.value = tabPriorityList[0].key
      }
    } catch (e) {
      activeTab.value = tabPriorityList[0].key
    } finally {
      loading.value = false
    }
  }

  const fetchTabCounts = async (menuTag: string) => {
    loading.value = true
    try {
      const res = await platformApi.platformDemandStatusCount({
        demandModule: 'user_research',
        menuTag: menuTag
      })
      const counts = res || {}

      tabCountMap.value = {}
      for (const tab of tabPriorityList) {
        tabCountMap.value[tab.key] = counts[tab.countField] ?? 0
      }
    } finally {
      loading.value = false
    }
  }
  const fetchExecuteTabCounts = async (menuTag: string) => {
    loading.value = true;
    try {
      const res = await platformApi.platformDemandStatusCount({
        demandModule: 'user_research',
        menuTag,
      });
      tabCountMap.value = {};
      for (const tab of demandExecuteTabList) {
        tabCountMap.value[tab.key] = res?.[tab.countField] ?? 0;
      }
    } finally {
      loading.value = false;
    }
  };
  const fetchMyDemandTabCounts = async (menuTag: string) => {
    loading.value = true;
    try {
      const res = await platformApi.platformDemandStatusCount({
        demandModule: 'user_research',
        menuTag,
      });
      tabCountMap.value = {};
      for (const tab of myDemandTabList) {
        tabCountMap.value[tab.key] = res?.[tab.countField] ?? 0;
      }
    } finally {
      loading.value = false;
    }
  };
  
  return {
    activeTab,
    loading,
    tabCountMap,
    tabPriorityList,
    initActiveTabWithData,
    fetchTabCounts,
    fetchExecuteTabCounts,
    fetchMyDemandTabCounts
  }
}
