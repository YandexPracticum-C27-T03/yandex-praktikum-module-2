import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

import { fscren } from '@@shared/lib/fullscreen';

export function useFullscreen() {
  const [active, setActive] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onChange() {
      setActive(root.current === fscren.fullscreenElement);
    }

    fscren.addEventListener('fullscreenchange', onChange);

    return () => fscren.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = useCallback(() => {
    if (fscren.fullscreenElement) {
      return fscren.exitFullscreen().then(() => {
        if (root.current) {
          return fscren.requestFullscreen(root.current);
        }
      });
    } else if (root.current) {
      return fscren.requestFullscreen(root.current);
    }
  }, []);

  const exit = useCallback(() => {
    if (fscren.fullscreenElement === root.current) {
      return fscren.exitFullscreen();
    }
    return Promise.resolve();
  }, []);

  return useMemo(
    () => ({
      active,
      enter,
      exit,
      root,
    }),
    [active, enter, exit],
  );
}
