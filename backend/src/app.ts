import cors from 'cors';
import express from 'express';
import { WebSocketServer } from 'ws';

import {
  DEFAULT_PORT,
  WS_DEFAULT_PORT,
  WS_PING_INTERVAL,
} from './constants.js';
import { auth } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { getSession } from './sessions/getSession.js';
import { handleConnection } from './websocket/handleConnection.js';
import { health } from './middleware/health.js';
import { pingAllWsClients } from './websocket/ping.js';
import { postEvent } from './events/postEvent.js';
import { postSession } from './sessions/postSession.js';
import { postUser } from './users/controllers.js';

// http server
const port = process.env.PORT || DEFAULT_PORT;

express()
  .use(cors())
  .use(express.json())
  .get('/health', health)
  .post('/users', postUser)
  .use(auth) // all routes below this line require auth
  .post('/sessions', postSession)
  .get('/sessions/:sessionId', getSession)
  .post('/events', postEvent)
  .use(errorHandler)
  .listen(port, () => console.log(`Listening on http://localhost:${port}`));

// websocket server
const wsPort = parseInt(process.env.WS_PORT || '0') || WS_DEFAULT_PORT;

let pingInterval: NodeJS.Timeout;

export const { clients } = new WebSocketServer({ port: wsPort }, () =>
  console.log('WS server up')
)
  .on('connection', handleConnection)
  .on('close', () => clearInterval(pingInterval));

pingInterval = setInterval(pingAllWsClients, WS_PING_INTERVAL, clients);
