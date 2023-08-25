import cookieParser, { CookieParseOptions } from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { useExpressServer } from 'routing-controllers';

import { CommentController } from './controllers/CommentController';
import { TopicController } from './controllers/TopicController';

import { dbConnect } from './init';

import { AuthMiddleware, AuthGuard, ErrorHandler, ssr, ExitMiddleware } from './middlewares';

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

  app.use(json());
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useExpressServer(app, {
    routePrefix: '/api',
    controllers: [TopicController, CommentController],
    middlewares: [AuthMiddleware, AuthGuard, ErrorHandler, ExitMiddleware],
    defaultErrorHandler: false,
  });

  const port = Number(process.env.SERVER_PORT) || 3000;

  const middlewareSsr = await ssr(app);
  await dbConnect();

  app.use(
    '*',
    cookieParser() as express.RequestHandler<CookieParseOptions>,
    async (req, res, next) => await middlewareSsr(req as express.Request, res, next),
  );

  app.listen(port, () => console.warn(`Server is listening on port: ${port}`));
}

void startServer();

export {};
