import { selectCurrentTheme } from '@@entities/theme';
import { toggleTheme } from '@@entities/theme/model/slice';
import { makeMapDispatch, makeMapState, useMapDispatch, useMapState } from '@@shared/lib/model/hooks';
import { SimpleCell, Switch } from '@vkontakte/vkui';

const mapState = makeMapState((state) => ({
  currentTheme: selectCurrentTheme(state),
}));

const mapDispatch = makeMapDispatch((dispatch) => ({
  toggleTheme: () => dispatch(toggleTheme()),
}));

export const ToggleTheme = () => {
  const { currentTheme } = useMapState(mapState);
  const { toggleTheme } = useMapDispatch(mapDispatch);

  return (
    <SimpleCell
      Component="label"
      disabled
      after={<Switch onChange={toggleTheme} checked={currentTheme === 'dark' ? true : false} />}
    >
      Темная тема
    </SimpleCell>
  );
};
