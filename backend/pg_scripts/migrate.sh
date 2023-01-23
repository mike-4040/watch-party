# can run in a container
psql -d watch_party -U watch_party_user -f /pg_scripts/migration.sql
