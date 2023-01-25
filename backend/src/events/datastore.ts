import { objectToCamelCase } from '../database/utils.js';
import { pgClient } from '../database/pgClient.js';
import type { SessionEvent } from './types.js';

export async function createEvent(event: SessionEvent) {
  const { sessionId, userId, type, timestamp, positionSeconds, wsConnId } =
    event;

  const query = `
    INSERT INTO events
      ( session_id, user_id, type, timestamp, position_seconds, ws_conn_id) 
    VALUES
      ( $1, $2, $3, $4, $5, $6)
    RETURNING * `;

  const params = [
    sessionId,
    userId,
    type,
    timestamp,
    positionSeconds,
    wsConnId,
  ];

  const { rows } = await pgClient.query(query, params);

  if (!rows?.length) {
    throw new Error('Failed to create session.');
  }

  const [dbEvent] = rows;

  return objectToCamelCase<SessionEvent>(dbEvent);
}

export async function queryWsConnIdsToNotify(
  userId: number,
  sessionId: string
): Promise<string[]> {
  const query = `
    SELECT DISTINCT ws_conn_id
    FROM events
    WHERE
	    type = 'joined'
	    AND session_id = $1
	    AND ws_conn_id IS NOT NULL
	    AND user_id != $2`; // exclude the user's own ws_conn_id

  const params = [sessionId, userId];

  const { rows } = await pgClient.query(query, params);

  if (!rows?.length) {
    return [];
  }

  return rows.map(({ ws_conn_id }) => ws_conn_id);
}
