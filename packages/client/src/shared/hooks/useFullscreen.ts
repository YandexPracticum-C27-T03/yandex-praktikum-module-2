import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

import { fscreen } from '@@shared/lib/fullscreen';

export type UseFullscreen = {
  active: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void> | Promise<() => Promise<void>>;
  root: React.RefObject<HTMLDivElement>;
};

export function useFullscreen(): UseFullscreen {
  const [active, setActive] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onChange() {
      setActive(root.current === fscreen.fullscreenElement);
    }

    fscreen.addEventListener('fullscreenchange', onChange);

    return () => fscreen.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = useCallback(async () => {
    try {
      if (fscreen.fullscreenElement) {
        await fscreen.exitFullscreen();

        if (root.current) {
          return fscreen.requestFullscreen(root.current);
        }
      } else if (root.current) {
        return fscreen.requestFullscreen(root.current);
      }
    } catch (error) {
      console.warn('[browser dosent suppert fullscreen]');
    }
  }, []);

  const exit = useCallback(() => {
    if (fscreen.fullscreenElement === root.current) {
      return fscreen.exitFullscreen();
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

export function useFullscreenMock(active = false): UseFullscreen {
  const root = useRef<HTMLDivElement>(null);

  return useMemo(
    () => ({
      active,
      enter: () => Promise.resolve(),
      exit: () => Promise.resolve(),
      root,
    }),
    [active],
  );
}
