import { log } from './logger';

export interface IFetchHeader {
  signature?: string;
}

export interface IFetchOptions<P extends object> {
  headers: IFetchHeader;
  body: P;
}

export type TCallback<T, P extends object> = (options: IFetchOptions<P>) => Promise<T>;

const subs = new Map<string, TCallback<any, any>>();

export function on<T, P extends object>(url: string, callback: TCallback<T, P>): void {
  subs.set(url, callback);
}

export function fetch<T, P extends object>(url: string, options: IFetchOptions<P>): Promise<T> {
  log({ type: "request", url, options });

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const callback: TCallback<T, P> | undefined = subs.get(url);

      if (!callback) return reject();

      callback(options)
        .then((resp) => {
          log({ type: "response", url, resp });
          resolve(resp);
        })
        .catch(reject);
    }, 1000);
  });
}
