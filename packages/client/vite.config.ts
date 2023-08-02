import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },

  plugins: [tsconfigPaths(), react()],

  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: null,
      filename: 'service-worker.js',
      devOptions: {
        enabled: true,
      },
      injectManifest: {
        globPatterns: ['**/*.{html,js,css,png}'],
      },
      workbox: {},
    }),
  ],
   
  resolve: {
    alias: [{ find: /^@vkontakte\/vkui$/, replacement: '@vkontakte/vkui/dist/cssm' }],
  },
});
