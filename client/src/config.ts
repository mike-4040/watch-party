import type { ThemeOptions } from '@mui/material';

export const BASE_URL = 'http://localhost:3001';
export const WS_URL = 'ws://localhost:8080';

export const THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
} as const;
