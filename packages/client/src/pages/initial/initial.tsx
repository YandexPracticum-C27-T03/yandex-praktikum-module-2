import { Button } from '@vkontakte/vkui';
import { useTheme } from '@hooks/useTheme';
import { cn } from '@utils/bem';

const cnInitial = cn('Initial');
export const Initial = () => {
  const [themeName, , toggleTheme] = useTheme();
  return (
    <div className={cnInitial()}>
      <div className={cnInitial('content')}>Вот тут будет жить ваше приложение :)</div>
      <div className={cnInitial('currentTheme')}>{`Текущая тема: ${themeName}`}</div>
      <Button className={cnInitial('button')} appearance="accent" onClick={toggleTheme}>
        ToggleTheme
      </Button>
    </div>
  );
};
