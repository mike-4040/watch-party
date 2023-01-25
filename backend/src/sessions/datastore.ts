import { pgClient } from '../database/pgClient.js';
import { objectToCamelCase } from '../database/utils.js';
import type { Session, SessionState } from './types.js';

export async function createSession(
  user_id: number,
  session_id: string,
  url: string
) {
  const query = `
    INSERT INTO sessions
      ( session_id, user_id, url)
    VALUES ( $1, $2, $3)
    RETURNING * `;

  const params = [session_id, user_id, url];

  const { rows } = await pgClient.query(query, params);

  if (!rows?.length) {
    throw new Error('Failed to create session.');
  }

  const [session] = rows;

  return objectToCamelCase<Session>(session);
}

export async function querySessionById(session_id: string) {
  const excludedEvents = ['joined'];
  const query = `
    SELECT s.session_id, s.url, e.user_id, e.type, e.position_seconds
    FROM sessions AS s
	    LEFT JOIN events AS e
		    ON e.session_id = s.session_id
    WHERE
      s.session_id = $1
      AND ( e.type NOT IN ( $2)
            OR e.type IS NULL
      )
    ORDER BY timestamp DESC
    LIMIT 1 `;

  const params = [session_id, excludedEvents];

  const { rows } = await pgClient.query(query, params);

  if (!rows?.length) {
    return null;
  }

  const [session] = rows;

  return objectToCamelCase<SessionState>(session);
}
