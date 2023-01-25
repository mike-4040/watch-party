import { clients } from '../app.js';

export const sendNotifs = (
  wsConnIds: string[],
  message: Record<string, any> // TODO: type this
) =>
  clients.forEach(ws => {
    const { value: wsConnId } = Object.getOwnPropertyDescriptor(ws, 'id') || {};
    
    if (wsConnIds.includes(wsConnId)) {
      ws.send(JSON.stringify(message));
    }
  });
