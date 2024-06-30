export function getBitLength(num: bigint): number {
  return num === 0n ? 1 : num.toString(2).length;
}

export function ab2hex(buffer: ArrayBuffer): string {
  return new Uint8Array(buffer).reduce((result, current) => {
    const value = current.toString(16);
    return result.concat(value.length === 1 ? `0${value}` : value);
  }, '');
}

export function hex2ab(hex: string): ArrayBuffer {
  const chunks = hex.match(/.{1,2}/g);
  return chunks
    ? new Uint8Array(chunks.map(chunk => parseInt(chunk, 16))).buffer
    : new Uint8Array().buffer;
}

export function bn2ab(int: bigint): ArrayBuffer {
  const byteLength = Math.ceil(int.toString(2).length / 8);
  const result = new ArrayBuffer(byteLength);
  const view = new DataView(result);
  let tempBigInt = int;

  for (let i = byteLength - 1; i >= 0; i--) {
    view.setUint8(i, Number(tempBigInt & 0xFFn));
    tempBigInt >>= 8n;
  }

  return result;
}

export function ab2bn(buffer: ArrayBuffer): bigint {
  const view = new DataView(buffer);
  let result = 0n;

  for (let i = 0; i < view.byteLength; i++) {
    result = (result << 8n) + BigInt(view.getUint8(i));
  }

  return result;
}

export function hex2bn(value: string): bigint {
  return ab2bn(hex2ab(value));
}

export function bn2hex(int: bigint): string {
  return ab2hex(bn2ab(int));
}
