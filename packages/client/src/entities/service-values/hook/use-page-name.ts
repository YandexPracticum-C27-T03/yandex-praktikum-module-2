import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectPageName, setPageName, serviceValuesSlice } from '@@entities/service-values';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';

type PageName = ReturnType<typeof serviceValuesSlice.reducer>['pageName'];

const mapDispatch = makeMapDispatch((dispatch) => ({
  setPageName: (name: PageName) => dispatch(setPageName(name)),
}));

export const usePageName = (): [PageName, (name: PageName) => void] => {
  const { setPageName } = useMapDispatch(mapDispatch);

  const pageName = useSelector(selectPageName);

  return useMemo(() => [pageName, setPageName], [pageName, setPageName]);
};
