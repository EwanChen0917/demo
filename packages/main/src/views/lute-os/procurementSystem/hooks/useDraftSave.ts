import { onBeforeUnmount, onMounted, watch, type WatchSource } from 'vue'
import { useDebounceFn, useStorage, StorageSerializers } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'

type MaybePromise<T> = T | Promise<T>
const DRAFT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

interface DraftRecord<TDraft> {
  data: TDraft
  updateTime: string
}

interface UseDraftSaveOptions<TDraft> {
  storageKey: string
  watchSources: WatchSource[]
  collect: () => TDraft
  apply: (draft: TDraft) => void
  isEmpty?: (draft: TDraft) => boolean
  remoteSave?: (draft: TDraft) => MaybePromise<void>
  loadRemoteDraft?: () => Promise<DraftRecord<TDraft> | TDraft | null>
}

interface UseDraftSaveReturn<TDraft> {
  saveDraft: () => Promise<void>
  restoreDraft: () => void
  clearDraft: () => void
  hasDraft: () => boolean
}

export function useDraftSave<TDraft>({
  storageKey,
  watchSources,
  collect,
  apply,
  isEmpty,
  remoteSave,
  loadRemoteDraft,
}: UseDraftSaveOptions<TDraft>): UseDraftSaveReturn<TDraft> {
  const storage = useStorage<DraftRecord<TDraft> | TDraft | null>(storageKey, null, localStorage, {
    serializer: StorageSerializers.object,
  })

  const formatTimestamp = (value?: string) => {
    const base = value && dayjs(value).isValid() ? dayjs(value) : dayjs()
    return base.format(DRAFT_TIME_FORMAT)
  }

  const toDraftRecord = (
    value: DraftRecord<TDraft> | TDraft | null | undefined,
    fallbackTime?: string,
  ): DraftRecord<TDraft> | null => {
    if (!value) return null
    if (
      typeof value === 'object' &&
      value !== null &&
      'data' in value &&
      'updateTime' in value &&
      typeof (value as Record<string, any>).updateTime === 'string'
    ) {
      const record = value as DraftRecord<TDraft>
      return {
        data: record.data,
        updateTime: formatTimestamp(record.updateTime),
      }
    }
    return {
      data: value as TDraft,
      updateTime: formatTimestamp(fallbackTime),
    }
  }

  const shouldSave = (draft: TDraft | null): draft is TDraft =>
    Boolean(draft) && (!isEmpty || !isEmpty(draft))

  const persist = (draft: TDraft | null, time?: string) => {
    storage.value = draft ? { data: draft, updateTime: formatTimestamp(time) } : null
  }

  const getLocalRecord = () => toDraftRecord(storage.value)

  const applyRecord = (record: DraftRecord<TDraft> | null) => {
    if (!record) return false
    persist(record.data, record.updateTime)
    apply(record.data)
    ElMessage.success('已读取草稿')
    return true
  }

  const doAutoSave = useDebounceFn(() => {
    const draft = collect()
    persist(shouldSave(draft) ? draft : null)
  }, 500)

  const stopWatch = watch(watchSources, doAutoSave, { deep: true })

  const saveDraft = async () => {
    const draft = collect()
    if (!shouldSave(draft)) {
      persist(null)
      return
    }
    persist(draft)
    if (remoteSave) await remoteSave(draft)
  }

  const restoreDraft = () => {
    const record = getLocalRecord()
    if (record) {
      applyRecord(record)
    }
  }

  const clearDraft = () => persist(null)

  const hasDraft = () => getLocalRecord() !== null

  const attemptRemoteRestore = async () => {
    if (!loadRemoteDraft) return false
    try {
      const remoteRaw = await loadRemoteDraft()
      const remoteRecord = toDraftRecord(remoteRaw)
      const localRecord = getLocalRecord()
      let winner: DraftRecord<TDraft> | null = null

      if (remoteRecord && localRecord) {
        const remoteTime = dayjs(remoteRecord.updateTime)
        const localTime = dayjs(localRecord.updateTime)
        winner = remoteTime.isAfter(localTime) ? remoteRecord : localRecord
      } else {
        winner = remoteRecord ?? localRecord ?? null
      }

      return applyRecord(winner)
    } catch (error) {
      console.error('Failed to restore remote draft', error)
      return false
    }
  }

  const initializeDraft = async () => {
    const remoteRestored = await attemptRemoteRestore()
    if (!remoteRestored) {
      restoreDraft()
    }
  }

  onMounted(() => {
    void initializeDraft()
  })
  onBeforeUnmount(stopWatch)

  return { saveDraft, restoreDraft, clearDraft, hasDraft }
}

export type { UseDraftSaveOptions, UseDraftSaveReturn }
