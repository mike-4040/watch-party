import type { WebSocket } from 'ws';

export const pingAllWsClients = (clients: Set<WebSocket>) =>
  clients.forEach(ping);

function ping(ws: WebSocket) {
  const { value: isAlive } =
    Object.getOwnPropertyDescriptor(ws, 'isAlive') || {};

  if (isAlive === false) {
    // TODO: update db, unsubscribe from events
    ws.terminate();
    return;
  }

  Object.assign(ws, {
    isAlive: false,
  });

  ws.send('{"ping":true}');
}
