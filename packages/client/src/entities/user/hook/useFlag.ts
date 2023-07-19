import { useCallback, useState } from 'react';

export function useFlag(initial: boolean) {
  const [flag, setFlag] = useState(initial);

  const toggle = useCallback(() => setFlag((prev) => !prev), []);
  const setValue = useCallback((val: boolean) => setFlag(val), []);

  return {
    flag,
    toggle,
    setValue,
  };
}
