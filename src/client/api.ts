import type {
  TAuthParams,
  THelloParams,
  THelloResponse,
  TPingParams,
  TPingResponse,
  TSignupParams,
} from '../_shared/api';
import { post } from './transport';

export async function signup(params: TSignupParams) {
  return post<void>('/signup', params);
}

export async function hello(params: THelloParams) {
  return post<THelloResponse>('/hello', params);
}

export async function auth(params: TAuthParams) {
  return post<string>('/auth', params);
}

export async function ping(params: TPingParams) {
  return post<TPingResponse>('/ping', params);
}
