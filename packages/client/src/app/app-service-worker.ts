function getLoadedResources() {
  const resourceEntries = performance.getEntriesByType('resource');
  const resources = resourceEntries.map((entry) => entry.name);
  const result = ['/', '/index.html'];

  resources.forEach((resource) => {
    if (
      resource.includes('.js') ||
      resource.includes('.css') ||
      resource.includes('.png') ||
      resource.includes('.jpg')
    ) {
      result.push(resource);
    }
  });

  return result;
}

export const registerServiceWorker = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  if ('serviceWorker' in navigator && isProduction) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        // Отправляем список загруженных ресурсов в сервисный работник
        registration?.active?.postMessage(getLoadedResources());
      })
      .catch((error) => {
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
