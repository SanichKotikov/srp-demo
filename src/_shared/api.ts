export interface TSignupParams { username: string; salt: string; verifier: string }

export interface THelloParams { username: string; }
export interface THelloResponse { B: string; salt: string }

export interface TAuthParams { username: string; A: string; M: string }

export interface TPingParams { time: number }
export interface TPingResponse { pong: boolean }
