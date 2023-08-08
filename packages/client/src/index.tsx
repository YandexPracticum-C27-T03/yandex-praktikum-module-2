import { initializeApp } from '@@app/app-entry';
import { registerServiceWorker } from '@@app/app-service-worker';
import './index.scss';

initializeApp();
registerServiceWorker();
