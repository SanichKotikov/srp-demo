export interface TSignupParams { username: string; salt: string; verifier: string }

export interface TKeyParams { username: string; A: string }
export interface TKeyResponse { B: string; salt: string }

export interface TSessionParams { username: string; M: string }

export interface TPingParams { time: number }
export interface TPingResponse { pong: boolean }
