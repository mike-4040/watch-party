import { Request, Response, NextFunction } from 'express';

import { UserError } from '../utils/userError.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof UserError) {
    res.status(err.status).send(err.message);
    return;
  }

  res.status(500).send('Internal Server Error');
}
