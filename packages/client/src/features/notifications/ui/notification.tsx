import React, { useState } from 'react';
import { Snackbar } from '@vkontakte/vkui';

interface NotificationProps {
  title: string;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ title, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Snackbar
      onClose={handleClose}
      before={<div>🔔</div>}
      subtitle={message}
      layout="vertical"
      duration={2000}
      after={null}
    >
      {title}
    </Snackbar>
  );
};

export default Notification;
