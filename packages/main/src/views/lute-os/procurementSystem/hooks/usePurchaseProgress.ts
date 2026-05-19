import { onBeforeUnmount, ref } from 'vue';

export const PURCHASE_PROGRESS_MAX = 100;

type SequenceProgressResult = 'completed' | 'cancelled';

interface StartTimedProgressOptions {
  duration?: number;
  max?: number;
}

interface StartSequenceProgressOptions {
  sequence: number[];
  interval: number;
  shouldContinue?: () => boolean;
}

export const usePurchaseProgress = () => {
  const progressPercent = ref(0);
  let progressTimer: ReturnType<typeof setInterval> | null = null;

  const clearProgress = () => {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  };

  const resetProgress = () => {
    clearProgress();
    progressPercent.value = 0;
  };

  const setProgress = (value: number) => {
    const normalized = Math.max(0, Math.min(PURCHASE_PROGRESS_MAX, value));
    progressPercent.value = normalized;
  };

  const completeProgress = () => {
    setProgress(PURCHASE_PROGRESS_MAX);
    clearProgress();
  };

  const startTimedProgress = ({ duration = 3000, max = PURCHASE_PROGRESS_MAX }: StartTimedProgressOptions = {}) => {
    resetProgress();
    const targetMax = Math.max(0, Math.min(PURCHASE_PROGRESS_MAX, max));
    if (targetMax <= 0) {
      return Promise.resolve();
    }
    let current = 0;
    const stepInterval = Math.max(10, Math.ceil(duration / targetMax));

    return new Promise<void>((resolve) => {
      progressTimer = setInterval(() => {
        current = Math.min(targetMax, current + 1);
        progressPercent.value = current;
        if (current >= targetMax) {
          clearProgress();
          resolve();
        }
      }, stepInterval);
    });
  };

  const startSequenceProgress = ({
    sequence,
    interval,
    shouldContinue,
  }: StartSequenceProgressOptions) => {
    resetProgress();
    let index = 0;

    return new Promise<SequenceProgressResult>((resolve) => {
      progressTimer = setInterval(() => {
        if (shouldContinue && !shouldContinue()) {
          clearProgress();
          resolve('cancelled');
          return;
        }

        const value =
          index < sequence.length
            ? sequence[index]
            : sequence[sequence.length - 1] ?? PURCHASE_PROGRESS_MAX;
        progressPercent.value = value;
        index += 1;

        if (index >= sequence.length) {
          clearProgress();
          resolve('completed');
        }
      }, interval);
    });
  };

  onBeforeUnmount(clearProgress);

  return {
    progressPercent,
    PURCHASE_PROGRESS_MAX,
    startTimedProgress,
    startSequenceProgress,
    setProgress,
    resetProgress,
    completeProgress,
    clearProgress,
  };
};

export type UsePurchaseProgressReturn = ReturnType<typeof usePurchaseProgress>;
