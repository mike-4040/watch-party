import express from 'express';
import { DEFAULT_PORT } from './constants.js';

const port = process.env.PORT || DEFAULT_PORT;

express()
  .get('/', (req, res) => {
    res.send('Hello World!');
  })
  .listen(port, () => console.log(`Listening on http://localhost:${port}`));
