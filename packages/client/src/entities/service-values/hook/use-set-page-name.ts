import { useEffect } from 'react';
import { usePageName } from '@@entities/service-values/hook/use-page-name';

export const useSetPageName = (pageName: string | null) => {
  const [, setPageName] = usePageName();

  useEffect(() => {
    setPageName(pageName);
  }, [pageName, setPageName]);
};
