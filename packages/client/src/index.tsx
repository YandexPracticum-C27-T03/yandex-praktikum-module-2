import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@containers/app';

import '@vkontakte/vkui/dist/vkui.css';
import './index.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Ошибка! Не найден #root элемент');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
