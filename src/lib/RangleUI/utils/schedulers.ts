export function debounce<T extends []>(
  fn: (...args: T) => void, 
  timeout: number, 
  shouldRunFirst=false, 
  shouldRunLast=true
) {
  let waitingTimeout: NodeJS.Timeout;

  return (...args: T) => {
    if (waitingTimeout) {
      clearTimeout(waitingTimeout);
    } else if (shouldRunFirst) {
      fn(...args);
    }

    waitingTimeout = setTimeout(() => {
      if (shouldRunLast) {
        fn(...args);
      }
    }, timeout);
  }
}