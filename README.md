# Watch Party App

## Project structure

Completely independent `./backend/` and `./client/` folders for the backend and frontend.

## Prerequisite

- nodejs, `nvm` with [Deep Shell Integration](https://github.com/nvm-sh/nvm#deeper-shell-integration) is strongly recommended
- docker

- env variables

  - `cp .env.template .env`

  - update `.env` with your own values

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

### Create a database (only once)

```bash
cd backend

# Connect to pg container
npm run pg:connect

# In container shell
sh pg_scripts/init.sh

# exit container
exit
```

### Run migration (every time the database structure changes)

```bash
cd backend

# Connect to postgres container
npm run pg:connect

# In container shell
sh /pg_scripts/migrate.sh

# exit container
exit
```

### Stop Postgres

```bash
cd backend
npm run pg:stop
```

## Starting the backend

In `./backend/` folder

- `npm start` to start the backend in development mode
- `npm run build` to build the backend
- `npm run start:prod` to start the backend in production mode
