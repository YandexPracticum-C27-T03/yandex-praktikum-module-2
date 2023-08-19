import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import type { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: HttpError, _request: Request, response: Response, next: NextFunction) {
    response.status(error.httpCode).json(error);
    next();
  }
}
