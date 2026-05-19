export const DEFAULT_POLLING_INTERVAL = 3000;

export interface PollingExecutionResult<T> {
  done: boolean;
  value?: T;
}

export interface PollingController {
  start: () => number;
  stop: () => void;
  wait: () => Promise<void>;
  isExpired: (currentToken: number) => boolean;
}

export const createPollingController = (interval = DEFAULT_POLLING_INTERVAL): PollingController => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let resolveWait: (() => void) | undefined;
  let token = 0;

  const clearWait = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (resolveWait) {
      resolveWait();
      resolveWait = undefined;
    }
  };

  const reset = () => {
    token += 1;
    clearWait();
  };

  const wait = () => {
    return new Promise<void>((resolve) => {
      resolveWait = resolve;
      timer = setTimeout(() => {
        timer = undefined;
        resolveWait = undefined;
        resolve();
      }, interval);
    });
  };

  return {
    start: () => {
      reset();
      return token;
    },
    stop: reset,
    wait,
    isExpired: (currentToken: number) => currentToken !== token,
  };
};

export async function runPolling<T>({
  controller,
  stop,
  pollOnce,
  shouldStop,
}: {
  controller: PollingController;
  stop: () => void;
  pollOnce: () => Promise<PollingExecutionResult<T>>;
  shouldStop?: () => boolean;
}) {
  const pollingToken = controller.start();
  const execute = async (): Promise<T | undefined> => {
    await controller.wait();
    if (controller.isExpired(pollingToken) || shouldStop?.()) return undefined;

    const result = await pollOnce();
    if (result.done) return result.value;

    return execute();
  };

  try {
    const result = await execute();
    return result;
  } finally {
    stop();
  }
}
