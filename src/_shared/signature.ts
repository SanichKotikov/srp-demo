import { digest, sign } from './crypto';

async function computeSignData(url: string, body: object): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();

  return new Uint8Array([
    ...encoder.encode(url),
    ...new Uint8Array(await digest(encoder.encode(JSON.stringify(body)))),
  ]).buffer;
}

export async function computeSignature(secret: CryptoKey, url: string, body: object): Promise<ArrayBuffer> {
  return await sign(secret, await computeSignData(url, body));
}
