import { modPow } from 'bigint-mod-arith';
import { g, getRandomBuffer, H, N } from '../_shared/srp';
import { ab2bn } from '../_shared/utils';
import { deriveKey } from './crypto';

export { computeM, computeP } from '../_shared/srp';

async function computePassKey(salt: bigint, password: string): Promise<bigint> {
  const passKey = (new TextEncoder()).encode(password).buffer;

  return H(salt, ab2bn(await deriveKey(passKey)));
}

export function createSalt(): bigint {
  return getRandomBuffer();
}

export function createKeyPair() {
  const a = getRandomBuffer() % N;

  // A = g^a
  const A = modPow(g, a, N);

  return { a, A };
}

export async function computeVerifier(password: string, salt: bigint): Promise<bigint> {
  const x = await computePassKey(salt, password);

  // v = g^x
  return modPow(g, x, N);
}

export async function computeK(password: string, salt: bigint, a: bigint, A: bigint, B: bigint): Promise<bigint> {
  const k = await H(N, g);
  const u = await H(A, B);
  const x = await computePassKey(salt, password);

  // S = (B - kg^x) ^ (a + ux)
  const S = modPow((B - k * modPow(g, x, N)), (a + u * x), N);

  return H(S);
}
