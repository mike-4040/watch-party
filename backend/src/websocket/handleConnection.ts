import { randomUUID } from 'node:crypto';
import type { WebSocket } from 'ws';


export function handleConnection(ws: WebSocket) {
  console.log('Websocket connected');

  Object.assign(ws, {
    isAlive: true,
    id: randomUUID(),
  });

  ws.on('message', function message(this, data) {
    const msg = data.toString();

    if (msg === 'pong') {
      Object.assign(this, {
        isAlive: true,
      });
    }
  });

  ws.send('ws connected');
}
