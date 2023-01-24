import { get } from '../services/http';

/** don't throw error, just return null */
export async function getSession(inUserId: number | null, sessionId: string) {
  try {
    if (!sessionId) {
      throw new Error('Missing sessionId.');
    }

    let userId = inUserId;
    if (!Number.isInteger(userId)) {
      userId = parseInt(localStorage.getItem('userId') || '');

      if (!Number.isInteger(userId)) {
        return null;
      }
    }

    const {
      data: { session },
    } = (await get(userId as number, `sessions/${sessionId}`)) || {};

    return session || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
