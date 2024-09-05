const TIMEOUT = 500;
type Callback = (...args: any[]) => void;

export const getRandomInteger = (a:number = 1, b:number = 500) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const isEscapeKey = (evt: KeyboardEvent): boolean => evt.key === 'Escape';

export const pressesKeydown = (handler: Function) => {
  const close = handler;
  return function(evt: KeyboardEvent) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  };
};

export const debounce = (callback: Callback, timeoutDelay: number = TIMEOUT): Callback => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...rest: Parameters<Callback>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
