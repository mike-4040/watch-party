import { pgClient } from '../database/pgClient.js';
import { objectToCamelCase } from '../database/utils.js';
import { Session } from './types.js';

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
  const query = `
    SELECT *
    FROM sessions
    WHERE session_id = $1 `;

  const params = [session_id];

  const { rows } = await pgClient.query(query, params);

  if (!rows?.length) {
    return null;
  }

  const [session] = rows;

  return objectToCamelCase<Session>(session);
}
