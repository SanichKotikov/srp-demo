import { modPow } from 'bigint-mod-arith';
import { g, getRandomBuffer, H, N } from '@/_shared/srp';

export { computeM, computeP } from '@/_shared/srp';

export async function createKeyPair(v: bigint) {
  const b = getRandomBuffer();
  const k = await H(N, g);

  // B = kv + g^b
  const B = (k * v + modPow(g, b, N)) % N;

  return { b, B };
}

export async function computeK(v: bigint, A: bigint, b: bigint, B: bigint): Promise<bigint> {
  const u = await H(A, B);

  // S = (Av^u) ^ b
  const S = modPow((A * modPow(v, u, N)), b, N);

  return H(S);
}
