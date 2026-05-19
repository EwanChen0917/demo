export type SubmitErrorFocusField =
  | ''
  | 'taskName'
  | 'trigger'
  | 'action'
  | 'taskStartTime'
  | 'keepMinutes';

export const useSubmitErrorFocus = () => {
  const taskNameInputRef = ref();
  const taskNameFieldRef = ref<HTMLElement | null>(null);
  const triggerBlockRef = ref<HTMLElement | null>(null);
  const actionBlockRef = ref<HTMLElement | null>(null);
  const taskStartTimeFieldRef = ref<HTMLElement | null>(null);
  const keepMinutesFieldRef = ref<HTMLElement | null>(null);
  const activeErrorField = ref<SubmitErrorFocusField>('');

  const clearErrorFocus = (field: SubmitErrorFocusField) => {
    if (!field || activeErrorField.value === field) activeErrorField.value = '';
  };

  const scrollToErrorField = async (field: SubmitErrorFocusField) => {
    if (!field) return;
    activeErrorField.value = field;
    await nextTick();
    const targetMap = {
      taskName: taskNameFieldRef.value,
      trigger: triggerBlockRef.value,
      action: actionBlockRef.value,
      taskStartTime: taskStartTimeFieldRef.value,
      keepMinutes: keepMinutesFieldRef.value,
      '': null,
    } as const;
    const target = targetMap[field] as HTMLElement | null;
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (field === 'taskName') taskNameInputRef.value?.focus?.();
  };

  const getErrorFieldByMessage = (message: string): SubmitErrorFocusField => {
    if (message.includes('任务名称')) return 'taskName';
    if (message.includes('触发条件')) return 'trigger';
    if (message.includes('执行动作') || message.includes('打开和关闭')) return 'action';
    if (message.includes('任务开始执行时间')) return 'taskStartTime';
    if (message.includes('任务常定时间')) return 'keepMinutes';
    return '';
  };

  const focusErrorByMessage = async (message: string) => {
    await scrollToErrorField(getErrorFieldByMessage(message));
  };

  const resetErrorFocus = () => {
    activeErrorField.value = '';
  };

  return {
    taskNameInputRef,
    taskNameFieldRef,
    triggerBlockRef,
    actionBlockRef,
    taskStartTimeFieldRef,
    keepMinutesFieldRef,
    activeErrorField,
    clearErrorFocus,
    focusErrorByMessage,
    resetErrorFocus,
  };
};
