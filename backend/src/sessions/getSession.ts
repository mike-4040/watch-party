import { Request, Response, NextFunction } from 'express';

import { querySessionById } from './datastore.js';
import { UserError } from '../utils/userError.js';

export async function getSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      throw new UserError('Missing sessionId', 400);
    }

    const session = await querySessionById(sessionId);

    if(!session) {
      throw new UserError('Session not found', 404);
    }

    res.send({ session });
  } catch (error) {
    next(error);
  }
}
