import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@@shared/config';

import { cn } from '@@shared/lib/bem';
import { HeaderLayout } from '@@widgets/header-layout';
import { Icon28BillSeparatedOutline } from '@vkontakte/icons';
import { Div, Card, Text } from '@vkontakte/vkui';

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
    <HeaderLayout>
      <Card mode="shadow" className={cnNotFoundPage()}>
        <Div className={cnNotFoundPage('header')}>
          <Text weight="1">
            <Icon28BillSeparatedOutline /> Ошибка 404. Файл не найден
          </Text>
        </Div>
        <Div className={cnNotFoundPage('content')}>
          <p>
            Возможно, Вы ошиблись при наборе адреса, или ссылка, по которой Вы прошли, устарела. <br />
            Вы можете попробовать&nbsp;
            <a href="#" onClick={onGoBackClick}>
              вернуться назад
            </a>
            &nbsp;или перейти на <a href={Routes.ROOT}>главную страницу</a> сайта.
          </p>
        </Div>
      </Card>
    </HeaderLayout>
  );
};
