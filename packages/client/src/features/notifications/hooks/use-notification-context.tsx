import React, { ReactNode, createContext, useContext, useEffect } from 'react';

interface NotificationContextValue {
  showNotification: (title: string, body: string) => void;
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
