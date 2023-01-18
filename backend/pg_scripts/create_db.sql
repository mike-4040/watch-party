/*
Initial database creation script
Should be run only once to create the database

NOTE: Local user info is in `docker-compose.local-postgres.yml`
*/

CREATE DATABASE watch_party WITH 
  OWNER = watch_party_user 
  ENCODING = 'UTF8' 
  LC_COLLATE = 'en_US.utf8' 
  LC_CTYPE = 'en_US.utf8' 
  TABLESPACE = pg_default 
  CONNECTION LIMIT = -1 
  IS_TEMPLATE = False;
