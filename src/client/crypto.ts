import { hex2ab } from '../_shared/utils';

const PASS_SALT = hex2ab(
  // hex result of random buffer (64)
  '584ee5a8d95558ce786cf5efb990f539f11cc532576b65e19399748abe6385d12' +
  'a997f4bc316d8cb6fd97f2058e41d18105a9f6a1f40489dceaff3e2b09a71e4',
);

export async function deriveKey(keyData: ArrayBuffer): Promise<ArrayBuffer> {
  return window.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: PASS_SALT, iterations: 4096, hash: 'SHA-512' },
    await window.crypto.subtle.importKey('raw', keyData, 'PBKDF2', false, ['deriveBits']),
    512,
  );
}
