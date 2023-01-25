import type { Dispatch, SetStateAction } from 'react';

import { EVENT_TYPES } from '../constants';
import { WS_URL } from '../config';

type SetString = Dispatch<SetStateAction<string | null>>;
type SetBoolean = Dispatch<SetStateAction<boolean>>;

function handleMessage(
  ws: WebSocket,
  event: MessageEvent,
  setWsConnId: SetString,
  setIsPlaying: SetBoolean
) {
  try {
    const data = JSON.parse(event.data);
    const { ping, wsConnId, type } = data;
    if (ping) {
      ws.send('pong');
      return;
    }

    if (wsConnId) {
      console.log('Received wsConnId', wsConnId);
      setWsConnId(wsConnId);
      return;
    }

    if (type) {
      switch (type) {
        case EVENT_TYPES.started:
          setIsPlaying(false);
          setIsPlaying(true);
          break;
        case EVENT_TYPES.paused:
          setIsPlaying(true);
          setIsPlaying(false);
          break;
        default:
          throw new Error('Unknown event type');
      }
    }
  } catch (error) {
    console.error('Failed handle event', error);
  }
}

export function wsClient(setWsConnId: SetString, setIsPlaying: SetBoolean) {
  const socket = new WebSocket(WS_URL);

  socket.addEventListener('open', () => console.log('Connected to ws server'));
  socket.addEventListener('message', event =>
    handleMessage(socket, event, setWsConnId, setIsPlaying)
  );

  socket.addEventListener('close', () =>
    console.log('Disconnected from ws server')
  );
  socket.addEventListener('error', console.error);
}
