import React from 'react';
import { Card as VKUICard, Div } from '@vkontakte/vkui';
import './Card.styles.css';

const Card = ({ title, content }) => {
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
