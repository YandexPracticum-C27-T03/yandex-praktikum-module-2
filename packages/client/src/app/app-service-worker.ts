export const registerServiceWorker = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  if ('serviceWorker' in navigator && isProduction) {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.error('Error registering Service Worker:', error);
    });
  }
};

export const handleServiceWorkerUpdate = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // Перезагружаем страницу после обновления сервисного работника
      window.location.reload();
    });
  }
};
