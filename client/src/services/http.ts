import axios from 'axios';

import { BASE_URL } from '../config';

const http = axios.create({
  baseURL: BASE_URL,
});

// http.interceptors.response.use(null, error => {
//   const {
//     response: { status },
//   } = error;

//   if (status >= 400 && status < 500) {
//     return Promise.reject(error);
//   }

//   console.error('http service error:', error);
// });

export function get(userId: number, path: string) {
  if (!userId) {
    throw new Error('GET: Missing userId.');
  }

  return http.get(path, { headers: { Authorization: userId } });
}

export function getUnAuth(path: string) {
  return http.get(path);
}

export function post(userId: number, path: string, data: any) {
  if (!userId) {
    throw new Error('Missing userId.');
  }

  return http.post(path, data, { headers: { Authorization: userId } });
}

export function postUnAuth(path: string, data: any) {
  return http.post(path, data);
}
