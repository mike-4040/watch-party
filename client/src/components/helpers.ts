import { post } from '../services/http';
import type { PostEventDTO } from './types.js';

/** don't throw error */
export async function postEvent(userId: number, event: PostEventDTO) {
  try {
    await post(userId, 'events', event);
  } catch (error) {
    console.error(error);
  }
}
