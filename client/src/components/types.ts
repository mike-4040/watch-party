export type EventType =
  | 'created'
  | 'joined'
  | 'started'
  | 'stopped'
  | 'paused'
  | 'resumed'
  | 'finished';

export interface PostEventDTO {
  sessionId: string;
  type: EventType;
  positionSeconds: number;
  wsConnId: string | null;
}
