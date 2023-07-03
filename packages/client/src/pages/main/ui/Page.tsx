import { selectCurrentTheme } from '@@entities/theme';
import { toggleTheme } from '@@entities/theme/model/slice';
import { makeMapDispatch, makeMapState, useMapDispatch, useMapState } from '@@shared/lib/model/hooks';
import { Button } from '@vkontakte/vkui';

const mapState = makeMapState((state) => ({
  currentTheme: selectCurrentTheme(state),
}));

const mapDispatch = makeMapDispatch((dispatch) => ({
  toggleTheme: () => dispatch(toggleTheme()),
}));

export const MainPage = () => {
  const { currentTheme } = useMapState(mapState);
  const { toggleTheme } = useMapDispatch(mapDispatch);

  return (
    <div>
      <p data-test-id="main">{`Текущая тема: ${currentTheme}`}</p>
      <Button appearance="accent" onClick={toggleTheme}>
        ToggleTheme
      </Button>
    </div>
  );
};
