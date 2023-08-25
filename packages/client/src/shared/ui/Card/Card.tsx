import React from 'react';
import { Card as VKUICard, Div } from '@vkontakte/vkui';
import { CardProps } from '@@entities/forum/types/types';

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <VKUICard mode="shadow" className="card">
      <Div>
        <h3>{title}</h3>
        <p>{content}</p>
      </Div>
    </VKUICard>
  );
};

export default Card;
