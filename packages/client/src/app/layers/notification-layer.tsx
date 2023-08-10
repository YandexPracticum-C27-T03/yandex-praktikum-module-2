import React, { ReactNode } from 'react';
import { Notification, useNotification, NotificationContext } from '@@features/notifications';

interface NotificationLayerProps {
  children: ReactNode;
}

export const NotificationLayer: React.FC<NotificationLayerProps> = ({ children }) => {
  const notification = useNotification();

  return (
    <NotificationContext.Provider value={{ showNotification: notification.showNotification }}>
      {children}
      {notification.isNotificationVisible && notification.notificationData && (
        <Notification title={notification.notificationData.title} message={notification.notificationData.body} />
      )}
    </NotificationContext.Provider>
  );
};
