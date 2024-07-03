import { fetch, type IFetchHeader } from '@/_shared/fetch';
import { computeSignature } from '@/_shared/signature';
import { ab2hex } from '@/_shared/utils';

let secret: CryptoKey | undefined;

export function config(secretKey: CryptoKey | undefined): void {
  secret = secretKey;
}

export async function post<T>(url: string, params: object): Promise<T> {
  const headers: IFetchHeader = {};

  if (secret) {
    headers.signature = ab2hex(await computeSignature(secret, url, params));
  }

  return fetch(url, { headers, body: params });
}
