import { NextFunction, Request, Response } from 'express';

import { createUser } from './datastore.js';

export async function postUser(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser();
    res.send(user);
  } catch (error) {
    next(error);
  }
}
