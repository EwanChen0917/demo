export type DemandApiLoadingKey =
  | 'operate'
  | 'interApprove'
  | 'saveDemand'
  | 'queryStep';

const defaultLoadingMap: Record<DemandApiLoadingKey, boolean> = {
  operate: false,
  interApprove: false,
  saveDemand: false,
  queryStep: false,
};

export const useApiLoadingGroup = () => {
  const loadingMap = reactive<Record<DemandApiLoadingKey, boolean>>({ ...defaultLoadingMap });
  const taskMap = reactive<Partial<Record<DemandApiLoadingKey, Promise<unknown>>>>({});

  const isLoading = (key: DemandApiLoadingKey) => loadingMap[key];

  const runWithLoading = async <T>(key: DemandApiLoadingKey, task: () => Promise<T>): Promise<T> => {
    if (loadingMap[key] && taskMap[key]) {
      return taskMap[key] as Promise<T>;
    }
    loadingMap[key] = true;
    const currentTask = task();
    taskMap[key] = currentTask;
    try {
      return await currentTask;
    } finally {
      taskMap[key] = undefined;
      loadingMap[key] = false;
    }
  };

  return {
    loadingMap,
    isLoading,
    runWithLoading,
  };
};
