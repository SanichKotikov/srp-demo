import { initDB } from './_shared/db';
import { start as startServer } from './server';
import { start as startClient } from './client';

Promise.resolve()
  .then(initDB)
  .then(startServer)
  .then(startClient)
  .catch(console.error);
