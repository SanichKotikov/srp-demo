export function random(length: number): ArrayBuffer {
  return window.crypto.getRandomValues(new Uint8Array(length)).buffer;
}

export async function digest(data: ArrayBuffer): Promise<ArrayBuffer> {
  return window.crypto.subtle.digest('SHA-512', data);
}

export async function importK(keyData: ArrayBuffer): Promise<CryptoKey> {
  return window.crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-512' }, true, ['sign']);
}

export async function sign(key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
  return window.crypto.subtle.sign('HMAC', key, data);
}
