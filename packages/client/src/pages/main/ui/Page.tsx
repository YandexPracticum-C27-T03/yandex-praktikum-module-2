import { selectCurrentTheme, setCurrentTheme } from '@@entities/theme';
import { cn } from '@@shared/lib/bem';
import { useAppDispatch, useAppSelector } from '@@shared/lib/model/hooks';
import { Button } from '@vkontakte/vkui';

const cnInitial = cn('Initial');
export const MainPage = () => {
  const theme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  function onToggleTheme() {
    dispatch(setCurrentTheme(theme));
  }

  return (
    <div className={cnInitial()}>
      <div className={cnInitial('content')}>Вот тут будет жить ваше приложение :)</div>
      <div className={cnInitial('currentTheme')}>{`Текущая тема: ${theme}`}</div>
      <Button className={cnInitial('button')} appearance="accent" onClick={onToggleTheme}>
        ToggleTheme
      </Button>
    </div>
  );
};
