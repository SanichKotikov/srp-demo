import { createSignal } from 'solid-js';
import type { TSignupParams } from './api';

export interface IUser {
  salt: string;
  verifier: string;
}

export type TUsers = Record<string, IUser>;

const [db, update] = createSignal<TUsers>({});

export { db };

export function initDB(): void {
  const prevV = localStorage.getItem('users');
  if (prevV) update(JSON.parse(prevV));
}

export function setUser({ username, ...data }: TSignupParams): void {
  const updated = { ...db(), [username]: data };
  localStorage.setItem('users', JSON.stringify(updated));
  update(updated);
}

export function getUser(username: string): IUser {
  return db()[username];
}
