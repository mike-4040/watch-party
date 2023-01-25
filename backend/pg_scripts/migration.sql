/*
 Postgres migration script
 Should be run every time the database structure changes
 1. Connect to postgress container
 `npm run pg:connect`
 2. Run migration
 `sh /pg_scripts/migrate.sh`
 */
-- DROP TABLE IF EXISTS public.user;
CREATE TABLE IF NOT EXISTS public.users (
  user_id serial PRIMARY KEY
);

-- DROP TABLE IF EXISTS public.sessions;
CREATE TABLE IF NOT EXISTS public.sessions (
  session_id TEXT PRIMARY KEY,
  user_id INTEGER,
  url TEXT
);

-- DROP TABLE IF EXISTS public.events;
CREATE TABLE IF NOT EXISTS public.events (
  event_id serial PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  position_seconds REAL NOT NULL,
  timestamp BIGINT NOT NULL,
  ws_conn_id TEXT
);
