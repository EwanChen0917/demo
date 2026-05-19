import { ref } from 'vue'
import { platformApi } from '@/api'

export interface TabConfig {
  key: string
  label: string
  countField: string
}

// 全量tab（例1：全部tab页面用）
export const fullTabDisplayList: TabConfig[] = [
  { key: 'completed', label: '已完结', countField: 'finishedNum' },
  { key: 'toReceive', label: '待查收', countField: 'waitForReceiptNum' },
  { key: 'executing', label: '执行中', countField: 'executingNum' },
  { key: 'reviewing', label: '审批中', countField: 'approvingNum' },
  { key: 'rejected', label: '审批未通过', countField: 'approveNotPassNum' },
]
// 简化tab（例2：执行端页面用）
export const executeTabDisplayList: TabConfig[] = [
  { key: 'completed', label: '已完结', countField: 'finishedNum' },
  { key: 'toReceive', label: '待查收', countField: 'waitForReceiptNum' },
  { key: 'executing', label: '执行中', countField: 'executingNum' },
]

// 激活优先级
export const fullTabActivePriority = [
  'toReceive', 'executing', 'reviewing', 'rejected', 'completed'
]
export const executeTabActivePriority = [
  'toReceive', 'executing', 'completed'
]

/**
 * 通用hook：传入displayList和activePriority，支持多个tab分组复用
 */
export function useActiveTab(
  tabDisplayList: TabConfig[],
  tabActivePriority: string[]
) {
  const activeTab = ref<string>('')
  const loading = ref(false)
  const tabCountMap = ref<Record<string, number>>({})

  const initActiveTabWithData = async (menuTag: string) => {
    loading.value = true
    try {
      const res = await platformApi.platformDemandStatusCount({
        demandModule: 'brand_research',
        menuTag
      })
      const counts = res.brandStatusBean || {}

      tabCountMap.value = {}
      for (const tab of tabDisplayList) {
        tabCountMap.value[tab.key] = counts[tab.countField] ?? 0
      }

      let found = false
      for (const key of tabActivePriority) {
        if ((tabCountMap.value[key] ?? 0) > 0) {
          activeTab.value = key
          found = true
          break
        }
      }
      if (!found) {
        activeTab.value = tabDisplayList[0].key
      }
    } catch (e) {
      activeTab.value = tabDisplayList[0].key
    } finally {
      loading.value = false
    }
  }

  // 只获取tab数量（用于实时刷新）
  const fetchTabCounts = async (menuTag: string) => {
    loading.value = true
    try {
      const res = await platformApi.platformDemandStatusCount({
        demandModule: 'brand_research',
        menuTag
      })
      const counts = res.brandStatusBean || {}

      tabCountMap.value = {}
      for (const tab of tabDisplayList) {
        tabCountMap.value[tab.key] = counts[tab.countField] ?? 0
      }
    } finally {
      loading.value = false
    }
  }

  return {
    activeTab,
    loading,
    tabCountMap,
    tabDisplayList,      // 用于v-for渲染tab
    initActiveTabWithData,
    fetchTabCounts,
  }
}
