type TargetContext = '_self' | '_parent' | '_blank' | '_top';

type CloseCallback = () => void;

export const openWindow = (
  url: string,
  options?: CloseCallback | { target?: TargetContext; onClose?: CloseCallback; [key: string]: any }
) => {
  const opts =
    typeof options === 'function'
      ? {
          onClose: options,
        }
      : options;
  const { target = '_blank', onClose, ...others } = opts ?? {};
  const win = window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );

  if (onClose) {
    const interval = setInterval(() => {
      if (win?.closed) {
        clearInterval(interval);
        onClose();
      }
    }, 1000);
  }

  return win;
};

export const regexUrl =
  /^(?!mailto:)(?:(?:http|https|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:(\/|\?|#)[^\s]*)?$/i;
