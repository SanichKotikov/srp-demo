# Secure Remote Password DEMO

The Secure Remote Password protocol (SRP) is an augmented password-authenticated key exchange (PAKE) protocol.

## Definitions

`N` — A large safe prime;  
`g` — A generator modulo N;  
`k` — Multiplier parameter;  
`s` — The user salt;  
`v` — Password Verifier;  
`x` — The hash of salt + password;  
`a` — Client secret key;  
`b` — Server secret key;  
`A` — Client public key;  
`B` — Server public key;  
`u` — The value of preventing attacker who learns a user's verifier;  
`S` — Pre-master secret (The secure common session key);
`K` — The session key hash for used to generate M;  
`M` — Evidence message, To verify both sides generated the same session key;

## Uses

- [TypeScript](https://www.typescriptlang.org/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) (Ch67, Sf14, FF68, Op54)
- [bigint-mod-arith](https://github.com/juanelas/bigint-mod-arith#readme)
- [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting) (Ch120, Sf17.2, FF117, Op106)
- [SolidJS](https://www.solidjs.com/)
- [Vite](https://vitejs.dev/)
