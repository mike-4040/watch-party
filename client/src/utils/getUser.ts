import { postUnAuth } from '../services/http';

/** don't throw error, just return null */
export async function getUser() {
  try {
    const storedUserId = localStorage.getItem('userId');

    let userId: number = parseInt(storedUserId || '');
    if (Number.isInteger(userId)) {
      return userId;
    }
    const { data = {} } = (await postUnAuth('/users', {})) || {};

    ({ userId } = data);
    if (!userId) {
      throw new Error(`Can't get userId.`);
    }

    localStorage.setItem('userId', userId.toString());
    return userId;
  } catch (error) {
    console.error(error);
    return null;
  }
}
