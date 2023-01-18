# Watch Party App

## Project structure

Completely independent `./backend/` and `./client/` folders for the backend and frontend.

## Database

Postgres in container.

Ensure that Docker is running

```bash
docker -v
```

Should print something like `Docker version 20.10.22, build 3a2c30b`

### Start Postgres

```bash
cd backend
npm run pg:up
```

### Create a database (run only once)

```bash
cd backend

# Connect to pg container
npm run pg:connect

# In container shell
sh pg_scripts/init.sh

# exit container
exit
```

### Run migration

TBD

### Stop Postgres

```bash
cd backend
npm run pg:stop
```
