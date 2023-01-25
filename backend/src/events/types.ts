export type EventType =
  | 'created'
  | 'started'
  | 'stopped'
  | 'paused'
  | 'resumed'
  | 'finished';

export interface SessionEvent {
  sessionId: string;
  userId: number;
  type: EventType;
  timestamp: number;
  positionSeconds: number;
  wsConnId: string | null;
}

export type SyncEvent = Pick<SessionEvent, 'type' | 'positionSeconds'>;
