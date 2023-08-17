import axios from 'axios';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import type { NextFunction, Request, Response } from 'express';

const API_ROOT = 'https://ya-praktikum.tech/api/v2';

@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  async use(req: Request, _res: Response, next: NextFunction) {
    if (req.user) {
      return next();
    }
    try {
      const { data } = await axios.get<TUser | null>(`${API_ROOT}/auth/user`, {
        headers: {
          cookie: req.headers['cookie'],
        },
      });

      if (data) {
        req.user = data;
      }

      next();
    } catch (e) {
      next();
    }
  }
}
