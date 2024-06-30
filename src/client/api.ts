import type {
  TKeyParams,
  TKeyResponse,
  TPingParams,
  TPingResponse,
  TSessionParams,
  TSignupParams,
} from '../_shared/api';
import { post } from './transport';

export async function signup(params: TSignupParams) {
  return post<void>('/signup', params);
}

export async function createKey(params: TKeyParams) {
  return post<TKeyResponse>('/key', params);
}

export async function startSession(params: TSessionParams) {
  return post<string>('/start', params);
}

export async function ping(params: TPingParams) {
  return post<TPingResponse>('/ping', params);
}
