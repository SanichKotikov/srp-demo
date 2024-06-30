import { start as startServer } from './server';
import { start as startClient } from './client';

Promise.resolve()
  .then(startServer)
  .then(startClient)
  .catch(console.error);
