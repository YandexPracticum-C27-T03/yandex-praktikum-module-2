import { ReactNode, useCallback, useState } from 'react';

export function useControlledPopup(PopupComponent: ReactNode) {
  const [popup, setPopout] = useState<ReactNode>(null);

  const onOpenModal = useCallback(() => setPopout(PopupComponent), [PopupComponent]);

  return {
    popup,
    onOpenModal,
    onClose: () => setPopout(null),
  };
}
