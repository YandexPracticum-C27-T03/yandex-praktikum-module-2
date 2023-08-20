import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import type { Express, NextFunction, Request } from 'express';
import type { ViteDevServer } from 'vite';

const isDev = () => process.env.NODE_ENV === 'development';

export async function ssr(app: Express) {
  let vite: ViteDevServer | undefined;

  let distPath = '';
  let ssrDist = '';
  let srcPath = '';

  if (isDev()) {
    srcPath = path.dirname(require.resolve('client'));

    distPath = path.dirname(require.resolve('client/dist/index.html'));
    ssrDist = require.resolve('client/ssr-dist/ssr.cjs');

    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    distPath = path.dirname(require.resolve('../client/dist/index.html'));
    ssrDist = require.resolve('../client/ssr-dist/ssr.cjs');
  }

  if (!isDev()) {
    const serviveWorkerPath = path.resolve(distPath, 'service-worker.js');
    const manifestJSON = path.resolve(distPath, 'manifest.webmanifest');

    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    app.use('/service-worker.js.map', express.static(serviveWorkerPath));
    app.use('/service-worker.js', express.static(serviveWorkerPath));
    app.use('/manifest.webmanifest', express.static(manifestJSON));
  }

  if (isDev()) {
    app.use('/sw.js', express.static(path.resolve(distPath, 'assets')));
  }

  return async (req: Request, res: any, next: NextFunction) => {
    let template: string;
    const url = req.originalUrl;

    try {
      if (isDev()) {
        template = await fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');

        template = await vite!.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
      }

      let mod;

      if (isDev()) {
        mod = await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'));
      } else {
        mod = await import(ssrDist);
      }

      const [serverApp, intialState] = await mod!.render(req);

      const state = JSON.stringify(intialState);

      const html = template.replace(`<!--ssr-outlet-->`, serverApp).replace('<!--ssr-store-->', state);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      console.info(error);
      vite?.ssrFixStacktrace(error as Error);

      next();
    }
  };
}
