import { useLayoutEffect } from 'react';
import { isClient } from '@@shared/lib/common';

type UseClientEffect = () => unknown | (() => unknown);

export function useClientEffect(fn: UseClientEffect, dep: unknown[]) {
  if (!isClient()) {
    return;
  }

  const effect = useLayoutEffect;

  return effect(() => {
    const cleanup = fn();

    return cleanup && typeof cleanup === 'function' && cleanup();
  }, dep);
}
