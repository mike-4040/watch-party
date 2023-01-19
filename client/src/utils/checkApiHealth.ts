import { AxiosError } from 'axios';

import { get } from '../services/http';

export async function checkApiHealth() {
  try {
    const { status, data } = (await get('/health')) || {};
    if (status !== 200 || data !== 'OK') {
      console.error('Health check failed.');
    }
  } catch (error) {
    console.error('Health check failed: ', (error as AxiosError).message);
  }
}
