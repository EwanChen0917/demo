import { ref, onBeforeUnmount, computed, readonly } from 'vue';

/**
 * 变更项的基础类型
 */
export type ChangeItem<RowId = string, Value = any> = {
  id: RowId;
  field?: string;
  value: Value;
};

/**
 * 配置选项
 */
export type AutoBatchSaverOptions<C extends ChangeItem, P = C[]> = {
  /** 静默多长时间后触发一次提交（毫秒） */
  delay: number;

  /** 最长等待时间，防止一直被推迟（毫秒，可选） */
  maxWait?: number;

  /** 批量保存函数 */
  saveFn: (payload: P) => Promise<void>;

  /** 可选的转换函数，将 ChangeItem[] 转为后端所需的 payload */
  transform?: (batch: C[]) => P;

  /** 错误回调，出错时调用（可选） */
  onError?: (batch: C[], error: unknown) => void;

  /** 组件卸载时是否自动提交未保存的数据（默认 false） */
  flushOnUnmount?: boolean;
  /** 刷新成功后的回调 */
  onRefresh?: () => void;

  /** 刷新延迟时间（毫秒） */
  refreshDelay?: number;
};

/**
 * 通用的批量自动保存 Hook
 *
 * 核心功能：
 * - 收集多次变更，聚合后统一提交
 * - 同一条记录的多次编辑，只保留最后一次
 * - 支持 delay 防抖 + maxWait 最大等待时间
 * - 串行发送，避免并发冲突
 * - 失败时数据不丢失，可重试
 *
 * @example
 * ```ts
 * const { pushChange, pendingCount } = useAutoBatchSaver({
 *   delay: 1000,
 *   maxWait: 5000,
 *   async saveFn(batch) {
 *     await api.batchUpdate(batch);
 *   },
 * });
 *
 * // 使用时只需调用
 * pushChange({ id: '123', field: 'name', value: 'new name' });
 * ```
 */
export function useAutoBatchSaver<C extends ChangeItem, P = C[]>(
  options: AutoBatchSaverOptions<C, P>
) {
  // ========== 内部状态 ==========

  /** 变更缓冲池，key 为 id:field 或 id */
  const pendingMap = ref(new Map<string, C>());

  /** 是否正在保存 */
  const isSaving = ref(false);

  /** 最近一次错误 */
  const lastError = ref<unknown | null>(null);

  /** delay 定时器句柄 */
  let timerId: ReturnType<typeof setTimeout> | null = null;

  /** 当前窗口的首次变更时间（用于 maxWait） */
  let firstChangeTime: number | null = null;

  let refreshTimerId: ReturnType<typeof setTimeout> | null = null;
  // ========== 计算属性 ==========

  /** 待提交的变更数量 */
  const pendingCount = computed(() => pendingMap.value.size);

  // ========== 内部工具函数 ==========

  /**
   * 构建唯一 key
   */
  function buildKey(change: C): string {
    return change.field ? `${change.id}:${change.field}` : String(change.id);
  }

  /**
   * 清理定时器
   */
  function clearTimer() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  /**
   * 重新启动 delay 计时器
   */
  function restartDelayTimer() {
    if (!pendingMap.value.size) return;

    const now = Date.now();
    if (firstChangeTime === null) {
      firstChangeTime = now;
    }

    const { delay, maxWait } = options;
    let wait = delay;

    // 如果设置了 maxWait，计算剩余时间
    if (maxWait != null && firstChangeTime != null) {
      const elapsed = now - firstChangeTime;
      const remainingMax = maxWait - elapsed;

      // 如果已超出 maxWait，立即触发
      if (remainingMax <= 0) {
        flush();
        return;
      }

      // 否则，delay 不能超过 maxWait 剩余时间
      wait = Math.min(delay, remainingMax);
    }

    clearTimer();
    timerId = setTimeout(() => {
      flush();
    }, wait);
  }

  /**
   * 错误处理：将失败的 batch 重新合并回 pendingMap
   */
  function handleError(batch: C[], err: unknown) {
    lastError.value = err;

    // 默认行为：把失败的数据重新写回缓冲区，等待下次重试
    // eslint-disable-next-line no-restricted-syntax
    for (const item of batch) {
      const key = buildKey(item);
      // 如果 pendingMap 里已经有更新的值，就不覆盖（保留最新）
      if (!pendingMap.value.has(key)) {
        pendingMap.value.set(key, item);
      }
    }

    // 调用业务自定义的错误回调
    if (options.onError) {
      options.onError(batch, err);
    }
  }
  function clearRefreshTimer() {
    if (refreshTimerId !== null) {
      clearTimeout(refreshTimerId);
      refreshTimerId = null;
    }
  }
  function requestRefresh() {
    if (!options.onRefresh) return;
    const wait = options.refreshDelay ?? 1000;
    clearRefreshTimer();
    refreshTimerId = setTimeout(async () => {
      refreshTimerId = null;
      try {
        await options.onRefresh?.();
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('[useAutoBatchSaver] 刷新失败:', { err: err.message });
      }
    }, wait);
  }
  // ========== 核心方法 ==========

  /**
   * 批量提交当前缓冲区的所有变更
   */
  async function flush() {
    // 1. 如果没有待提交的，直接返回
    if (!pendingMap.value.size) {
      clearTimer();
      firstChangeTime = null;
      return;
    }

    // 2. 如果已经在保存中，不并发发送请求
    //    保持 pendingMap 不变，由后续的 pushChange 或当前保存完成后再触发
    if (isSaving.value) {
      clearTimer();
      return;
    }

    // 3. 固定这次要提交的 batch，并清空缓冲区
    //    避免在保存过程中新的变更与当前 batch 混淆
    const batch = Array.from(pendingMap.value.values());
    pendingMap.value.clear();
    clearTimer();
    firstChangeTime = null;

    // 4. 转换数据格式（如果提供了 transform）
    let payload: P;
    try {
      payload = options.transform ? options.transform(batch) : (batch as unknown as P);
    } catch (err) {
      // transform 失败，记录错误并恢复数据
      handleError(batch, err);
      return;
    }

    // 5. 调用 saveFn
    isSaving.value = true;
    lastError.value = null;

    try {
      await options.saveFn(payload);
      requestRefresh();
      // 成功：pendingMap 已经清空，什么都不做
    } catch (err) {
      // 失败：将 batch 重新合并回 pendingMap
      handleError(batch, err);
    } finally {
      isSaving.value = false;

      // 6. 如果在保存过程中又有新的 pushChange：
      //    pendingMap 里已经有新数据了，重新开启一轮计时
      if (pendingMap.value.size && timerId === null) {
        restartDelayTimer();
      }
    }
  }

  /**
   * 推入一条变更（核心对外方法）
   *
   * 行为：
   * - 立即将变更合并到缓冲区（同一 key 覆盖前一次）
   * - 重置 delay 计时器
   * - 如果达到 maxWait，立即触发提交
   */
  function pushChange(change: C) {
    // 1. 写入/合并到缓存池
    const key = buildKey(change);
    pendingMap.value.set(key, change);

    // 2. 记录窗口起点时间
    const now = Date.now();
    if (firstChangeTime === null) {
      firstChangeTime = now;
    }

    // 3. 管理 delay 定时器
    clearTimer();

    // 4. 根据 delay / maxWait 决定下一次 flush 时间
    const { delay, maxWait } = options;
    let wait = delay;

    if (maxWait != null && firstChangeTime != null) {
      const elapsed = now - firstChangeTime;
      const remainingMax = maxWait - elapsed;

      // 如果已超出 maxWait，立即触发
      if (remainingMax <= 0) {
        flush();
        return;
      }

      // 否则，窗口内的 delay 不能超过 maxWait 剩余时间
      wait = Math.min(delay, remainingMax);
    }

    timerId = setTimeout(() => {
      flush();
    }, wait);
  }

  /**
   * 手动立即提交（绕过防抖，立即 flush）
   */
  function flushNow() {
    clearTimer();
    return flush();
  }

  /**
   * 清空所有未提交的变更
   */
  function reset() {
    pendingMap.value.clear();
    clearTimer();
    firstChangeTime = null;
    lastError.value = null;
  }

  // ========== 生命周期 ==========

  onBeforeUnmount(() => {
    // 清理定时器
    clearTimer();
    clearRefreshTimer();
    // 如果配置了 flushOnUnmount，在卸载时自动提交
    if (options.flushOnUnmount && pendingMap.value.size) {
      // 注意：这里是同步调用 flush，但 flush 内部是 async
      // 组件卸载时不等待异步完成，由业务自己决定是否需要
      flush();
    }
  });

  // ========== 返回 ==========

  return {
    /** 推入一条变更（核心方法） */
    pushChange,

    /** 立即提交所有变更 */
    flushNow,

    /** 清空所有未提交的变更 */
    reset,

    /** 请求刷新 */
    requestRefresh,

    /** 待提交的变更数量（只读） */
    pendingCount: readonly(pendingCount),

    /** 是否正在保存（只读） */
    isSaving: readonly(isSaving),

    /** 最近一次错误（只读） */
    lastError: readonly(lastError),
  };
}
