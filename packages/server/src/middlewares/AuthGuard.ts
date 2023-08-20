import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import type { NextFunction, Request, Response } from 'express';

@Middleware({ type: 'before' })
export class AuthGuard implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      return next();
    }
    res.status(403).send({ error: 'Вы не авторизованы' });
  }
}
