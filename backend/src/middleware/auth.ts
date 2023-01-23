import { NextFunction, Request, Response } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
  const {
    headers: { authorization = '' },
  } = req;

  const userId = parseInt(authorization);
  if (!Number.isInteger(userId)) {
    res.status(401).send('Unauthorized');
    return;
  }

  Object.assign(req, { userId });
  next();
}
