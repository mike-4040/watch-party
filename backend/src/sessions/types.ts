import type { EventType } from '../events/types';

export interface Session {
  sessionId: string;
  userId: number;
  url: string;
}

export interface SessionState extends Session {
  state: EventType;
  positionSeconds: number;
}
