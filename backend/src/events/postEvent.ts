import { Request, Response, NextFunction } from 'express';

import type { AuthedRequest } from '../types.js';
import { createEvent, queryWsConnIdsToNotify } from './datastore.js';
import { EVENTS_TO_TRIGGER_NOTIFS } from './constants.js';
import { sendNotifs } from '../websocket/sentNotifs.js';
import type { SessionEvent, SyncEvent } from '../events/types.js';

export async function postEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req as unknown as AuthedRequest;

    const { body } = req;

    const { sessionId, type, positionSeconds, wsConnId } = body;

    const event: SessionEvent = {
      sessionId,
      userId,
      type,
      positionSeconds,
      timestamp: Date.now(),
      wsConnId,
    };

    const dbEvent = await createEvent(event);

    res.send({ event: dbEvent });

    if (EVENTS_TO_TRIGGER_NOTIFS.includes(type)) {
      try {
        // don't let this error block the response
        const wsConnIds = await queryWsConnIdsToNotify(userId, sessionId);

        const event: SyncEvent = {
          type,
          positionSeconds,
        };
        sendNotifs(wsConnIds, event);
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    next(error);
  }
}
