import { config } from 'dotenv';
config();

import pg from 'pg';

import { PG_ENV_KEYS } from '../constants.js';

const { Pool } = pg;

const user = process.env[PG_ENV_KEYS.user];
const host = process.env[PG_ENV_KEYS.host];
const database = process.env[PG_ENV_KEYS.database];
const password = process.env[PG_ENV_KEYS.password];
const port = parseInt(process.env[PG_ENV_KEYS.port] || '0');

if (!user || !host || !database || !password || !port) {
  throw new Error('Missing postgres env vars');
}

export const pgClient = new Pool({
  user,
  host,
  database,
  password,
  port,
});
