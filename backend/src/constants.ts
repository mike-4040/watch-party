export const DEFAULT_PORT = 3001;

export const WS_DEFAULT_PORT = 8080;
export const WS_PING_INTERVAL = 5_000;

// postgres config env vars names
export const PG_ENV_KEYS = {
  host: 'PG_HOST',
  port: 'PG_PORT',
  user: 'PG_USER',
  password: 'PG_PASSWORD',
  database: 'PG_DATABASE',
} as const;
