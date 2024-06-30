import type {
  TKeyParams,
  TKeyResponse,
  TSessionParams,
  TPingParams,
  TPingResponse,
  TSignupParams,
} from '../_shared/api';
import { on } from '../_shared/fetch';
import { importK } from '../_shared/crypto';
import { computeSignature } from '../_shared/signature';
import { ab2hex, bn2ab, hex2bn, bn2hex } from '../_shared/utils';
import { createKeyPair, computeK, computeM, computeP } from './srp';
import { initDB, getUser, setUser } from './db';

export async function start() {
  let A: bigint;

  let keys: { b: bigint; B: bigint };
  let secret: CryptoKey | undefined;

  initDB();

  on<void, TSignupParams>('/signup', async (args) => {
    setUser(args.body);

    return undefined;
  });

  on<TKeyResponse, TKeyParams>('/key', async (args) => {
    A = hex2bn(args.body.A);

    const { verifier, salt } = getUser(args.body.username);
    keys = await createKeyPair(hex2bn(verifier));

    return { salt, B: bn2hex(keys.B) };
  });

  on<string, TSessionParams>('/start', async (args) => {
    const { verifier, salt } = getUser(args.body.username);

    const K = await computeK(hex2bn(verifier), A, keys.b, keys.B);
    const M = await computeM(args.body.username, hex2bn(salt), A, keys.B, K);

    if (args.body.M !== bn2hex(M)) {
      throw new Error('Client provided session proof is invalid');
    }

    secret = await importK(bn2ab(K));

    return bn2hex(await computeP(A, M, K));
  });

  on<TPingResponse, TPingParams>('/ping', async (args) => {
    if (!secret) throw new Error('Unauthorized');

    const signature = await computeSignature(secret, '/ping', args.body);
    if (args.headers.signature !== ab2hex(signature)) throw new Error('Unknown');

    return { pong: true };
  });
}
