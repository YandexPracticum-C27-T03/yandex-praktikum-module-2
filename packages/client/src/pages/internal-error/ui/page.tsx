import { Routes } from '@@features';
import { cn } from '@@shared/lib/bem';
import { HeaderLayout } from '@@widgets/header-layout';
import { Icon28BugOutline } from '@vkontakte/icons';
import { Div, Card, Text } from '@vkontakte/vkui';

import './styles.scss';

const cnNotFoundPage = cn('NotFoundPage');

export const InternalErrorPage = () => {
  return (
    <HeaderLayout>
      <Card mode="shadow" className={cnNotFoundPage()}>
        <Div className={cnNotFoundPage('header')}>
          <Text weight="1">
            <Icon28BugOutline /> Ошибка 500. Что-то пошло не так
          </Text>
        </Div>
        <Div className={cnNotFoundPage('content')}>
          <p>
            Ой. У нас что-то сломалось, но мы уже стараемся починить. <br />
            Вы можете попробовать повторить действие <i>позднее</i>, либо перейти на&nbsp;
            <a href={Routes.ROOT}>главную страницу</a>
            &nbsp;сайта.
          </p>
        </Div>
      </Card>
    </HeaderLayout>
  );
};
