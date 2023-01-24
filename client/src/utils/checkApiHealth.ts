import { AxiosError } from 'axios';

import { getUnAuth } from '../services/http';

export async function checkApiHealth() {
  try {
    const { status, data } = (await getUnAuth('/health')) || {};
    if (status !== 200 || data !== 'OK') {
      console.error('Health check failed.');
    }
  } catch (error) {
    console.error('Health check failed: ', (error as AxiosError).message);
  }
}
