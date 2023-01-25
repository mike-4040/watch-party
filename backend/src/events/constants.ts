import type { EventType } from './types.js';

export const EVENTS_TO_TRIGGER_NOTIFS: readonly EventType[] = [
  'started',
  'paused',
] as const;
