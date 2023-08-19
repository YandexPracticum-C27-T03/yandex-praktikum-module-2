import { useState, useEffect } from 'react';

export interface NotificationData {
  title: string;
  body: string;
}

const useNotification = () => {
  const [notificationQueue, setNotificationQueue] = useState<NotificationData[]>([]);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    if (notificationQueue.length > 0 && !isNotificationVisible) {
      const [nextNotification, ...remainingNotifications] = notificationQueue;
      setCurrentNotification(nextNotification);
      setNotificationQueue(remainingNotifications);
      setNotificationVisible(true);
      if (document.visibilityState !== 'visible') {
        displayBrowserNotification(nextNotification.title, nextNotification.body);
      }
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    }
  }, [notificationQueue, isNotificationVisible]);

  const showNotification = (title: string, body: string) => {
    setNotificationQueue((prevQueue) => [...prevQueue, { title, body }]);
  };

  const displayBrowserNotification = (title: string, body: string) => {
    if (!('Notification' in window)) {
      console.warn('Этот браузер не поддерживает уведомления на рабочем столе.');
      return;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body });
        } else {
          console.warn('Разрешение на уведомления отклонено.');
        }
      });
    } else {
      new Notification(title, { body });
    }
  };

  return { showNotification, isNotificationVisible, notificationData: currentNotification };
};

export default useNotification;
