import { PropsWithChildren, FC } from 'react';
import { useFullscreen } from '@@shared/hooks/useFullscreen';

type FullScreenProps = PropsWithChildren<{
  handle: ReturnType<typeof useFullscreen>;
}>;

export const FullScreenContainer: FC<FullScreenProps> = ({ handle, children }) => {
  return (
    <div ref={handle.root} style={handle.active ? { height: '100%', width: '100%' } : undefined}>
      {children}
    </div>
  );
};
