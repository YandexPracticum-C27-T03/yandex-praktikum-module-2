import { PropsWithChildren } from 'react';
import { useFullscreen } from '@@shared/hooks/useFullscreen';

type FullScreenProps = {
  handle: ReturnType<typeof useFullscreen>;
};

export const FullScreenContainer = ({ handle, children }: PropsWithChildren<FullScreenProps>) => {
  return (
    <div ref={handle.root} style={handle.active ? { height: '100%', width: '100%' } : undefined}>
      {children}
    </div>
  );
};
