import { digest, random } from './crypto';
import { ab2bn, bn2ab, getBitLength } from './utils';

export const g = BigInt('2');
export const N = BigInt(
  '21766174458617435773191008891802753781907668374255538511144643224' +
  '68988623538384095721090901308605640157139971723580726658164960647' +
  '21484102914133641521973644771808873956554837381150726774022351017' +
  '62521901569820740293149529620419333266262073471054548368736039519' +
  '70248622650624886106025697180298495356112144268015766800076142998' +
  '82224570904138739739701719270939921147517651680636147611196154762' +
  '33422096442783117971236371647333871414335895773474667308967050807' +
  '00550932042479967841703686792831676127227423031406754829113358247' +
  '95830614395775593471019617714061736843785227034834953370376550067' +
  '51328447510550299250924469288819',
);

export async function H(...args: bigint[]): Promise<bigint> {
  return ab2bn(
    await digest(
      args
        .map(int => new Uint8Array(bn2ab(int)))
        .reduce((buffer, next) => new Uint8Array([...buffer, ...next]), new Uint8Array([])),
    ),
  );
}

export function getRandomBuffer(): bigint {
  return ab2bn(random(getBitLength(N) / 8));
}

export async function computeM(login: string, salt: bigint, A: bigint, B: bigint, K: bigint): Promise<bigint> {
  const encoder = new TextEncoder();

  // M = H(H(N) xor H(g), H(I), s, A, B, K)
  return H(
    await H(N) ^ await H(g),
    await H(ab2bn(encoder.encode(login).buffer)),
    salt,
    A, B, K,
  );
}

export async function computeP(A: bigint, M: bigint, K: bigint): Promise<bigint> {
  return H(A, M, K);
}
