import express from 'express';
import cors from 'cors';

import { DEFAULT_PORT } from './constants.js';
import { health } from './middleware/health.js';

const port = process.env.PORT || DEFAULT_PORT;

express()
  .use(cors())
  .get('/health', health)
  .listen(port, () => console.log(`Listening on http://localhost:${port}`));
