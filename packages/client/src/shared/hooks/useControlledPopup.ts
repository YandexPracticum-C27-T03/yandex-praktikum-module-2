import { ReactNode, useCallback, useState } from 'react';

export function useControlledPopup(PopupComponent: ReactNode) {
  const [popup, setPopup] = useState<ReactNode>(null);

  const onOpenModal = useCallback(() => setPopup(PopupComponent), [PopupComponent]);

  return {
    popup,
    onOpenModal,
    onClose: () => setPopup(null),
  };
}
