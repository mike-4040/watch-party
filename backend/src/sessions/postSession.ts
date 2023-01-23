import { Request, Response, NextFunction } from 'express';

import { AuthedRequest } from '../types.js';
import { createSession } from './datastore.js';
import { UserError } from '../utils/userError.js';

export async function postSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req as unknown as AuthedRequest;
    const {
      body: { sessionId, url },
    } = req;

    if (!sessionId || !url) {
      throw new UserError('Missing sessionId or url', 400);
    }

    const session = await createSession(userId, sessionId, url);

    res.send({ session });
  } catch (error) {
    next(error);
  }
}
