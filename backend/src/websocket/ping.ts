import type { WebSocket } from 'ws';

export const pingAllWsClients = (clients: Set<WebSocket>) =>
  clients.forEach(ping);

function ping(ws: WebSocket) {
  const { value: isAlive } =
    Object.getOwnPropertyDescriptor(ws, 'isAlive') || {};

  if (isAlive === false) {
    ws.terminate();
    return;
  }

  Object.assign(ws, {
    isAlive: false,
  });

  ws.send('ping');
}
