import { PropsWithChildren } from 'react';
import { UseFullscreen } from '@@shared/hooks/useFullscreen';
import { cn } from '@@shared/lib/bem';

type FullScreenProps = {
  controller: UseFullscreen;
};

const cnFullscreenContainer = cn('FullscreenContainer');

export const FullScreenContainer = ({ controller, children }: PropsWithChildren<FullScreenProps>) => {
  return (
    <div
      ref={controller.root}
      className={cnFullscreenContainer({
        active: controller.active,
      })}
    >
      {children}
    </div>
  );
};
