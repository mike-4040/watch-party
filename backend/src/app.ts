import cors from 'cors';
import express from 'express';
import { WebSocketServer } from 'ws';

import {
  DEFAULT_PORT,
  WS_DEFAULT_PORT,
  WS_PING_INTERVAL,
} from './constants.js';
import { health } from './middleware/health.js';
import { handleConnection } from './websocket/handleConnection.js';
import { pingAllWsClients } from './websocket/ping.js';

// http server
const port = process.env.PORT || DEFAULT_PORT;

express()
  .use(cors())
  .get('/health', health)
  .listen(port, () => console.log(`Listening on http://localhost:${port}`));

// websocket server
const wsPort = parseInt(process.env.WS_PORT || '0') || WS_DEFAULT_PORT;

let pingInterval: NodeJS.Timeout;

const wss = new WebSocketServer({ port: wsPort }, () =>
  console.log('WS server up')
)
  .on('connection', handleConnection)
  .on('close', () => clearInterval(pingInterval));

pingInterval = setInterval(pingAllWsClients, WS_PING_INTERVAL, wss.clients);
