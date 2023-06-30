import { selectCurrentTheme, setCurrentTheme } from '@@entities/theme';
import { useAppDispatch, useAppSelector } from '@@shared/lib/model/hooks';
import { Button } from '@vkontakte/vkui';

export const MainPage = () => {
  const theme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  function onToggleTheme() {
    dispatch(setCurrentTheme(theme));
  }

  return (
    <div>
      <p>{`Текущая тема: ${theme}`}</p>
      <Button appearance="accent" onClick={onToggleTheme}>
        ToggleTheme
      </Button>
    </div>
  );
};
