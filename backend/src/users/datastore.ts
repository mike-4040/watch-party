import { pgClient } from '../database/pgClient.js';
import { objectToCamelCase } from '../database/utils.js';
import { User } from './types.js';

export async function createUser() {
  const query = `
    INSERT INTO users
    DEFAULT VALUES
    RETURNING user_id `;

  const { rows } = await pgClient.query(query);

  if (!rows?.length) {
    throw new Error(`Can't create user`);
  }

  const [user] = rows;

  return objectToCamelCase<User>(user);
}
