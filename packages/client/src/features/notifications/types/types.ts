import { ReactNode } from 'react';

export interface NotificationContextValue {
  showNotification: (title: string, body: string) => void;
}

export interface NotificationLayerProps {
  children: ReactNode;
}
