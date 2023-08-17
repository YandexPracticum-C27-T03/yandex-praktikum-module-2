import cookieParser, { CookieParseOptions } from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { createProxyMiddleware } from 'http-proxy-middleware';
import ssr from './middlewares/ssr';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    }),
  );
  const port = Number(process.env.SERVER_PORT) || 3000;

  const middlewareSsr = await ssr(app);

  app.use(
    '*',
    cookieParser() as express.RequestHandler<CookieParseOptions>,
    async (req, res, next) => await middlewareSsr(req as express.Request, res, next),
  );

  app.listen(port, () => console.warn(`Server is listening on port: ${port}`));
}

void startServer();

export {};
