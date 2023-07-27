import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@@shared/config';
import { cn } from '@@shared/lib/bem';
import { HeaderLayout } from '@@widgets/header-layout';
import { Icon28BillSeparatedOutline } from '@vkontakte/icons';
import { Div, Card, Text, Link } from '@vkontakte/vkui';

import './styles.scss';

const cnNotFoundPage = cn('NotFoundPage');

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const onGoBackClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <HeaderLayout title="Страница ошибки">
      <Card mode="shadow" className={cnNotFoundPage()}>
        <Div className={cnNotFoundPage('header')}>
          <Text weight="1">
            <Icon28BillSeparatedOutline /> Ошибка 404. Файл не найден
          </Text>
        </Div>
        <Div className={cnNotFoundPage('body')}>
          <p>
            Возможно, Вы ошиблись при наборе адреса, или ссылка, по которой Вы прошли, устарела. <br />
            Вы можете попробовать&nbsp;
            <Link href="#" onClick={onGoBackClick}>
              вернуться назад
            </Link>
            &nbsp;или перейти на <Link href={Routes.ROOT}>главную страницу</Link> сайта.
          </p>
        </Div>
      </Card>
    </HeaderLayout>
  );
};
