import { importK } from '../_shared/crypto';
import { bn2ab, bn2hex, hex2bn } from '../_shared/utils';
import { config } from './transport';
import { createKey, ping, signup, startSession } from './api';
import { computeK, computeM, computeP, computeVerifier, createKeyPair, createSalt } from './srp';

const LOGIN = 'user';
const PASSWORD = '123';

export async function start() {
  const prevV = localStorage.getItem('users');

  let salt = createSalt();

  if (!prevV) {
    const verifier = await computeVerifier(PASSWORD, salt);
    await signup({ username: LOGIN, salt: bn2hex(salt), verifier: bn2hex(verifier) });
  }

  const { a, A } = createKeyPair();
  const key = await createKey({ username: LOGIN, A: bn2hex(A) });
  const B = hex2bn(key.B);
  salt = hex2bn(key.salt);

  const K = await computeK(PASSWORD, salt, a, A, B);
  const M = await computeM(LOGIN, salt, A, B, K);

  const serverP = await startSession({ username: LOGIN, M: bn2hex(M) });
  const clientP = await computeP(A, M, K);

  if (bn2hex(clientP) !== serverP) {
    throw new Error('Wrong checksum');
  }

  config(await importK(bn2ab(K)));

  const pingResp = await ping({ time: Date.now() });
  console.log(pingResp.pong);
}
