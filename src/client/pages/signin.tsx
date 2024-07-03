import { type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { log } from '@/_shared/logger';
import { bn2ab, bn2hex, hex2bn } from '@/_shared/utils';
import { importK } from '@/_shared/crypto';
import { Form } from '#/form/form';
import { computeK, computeM, computeP, createKeyPair } from '#/utils/srp';
import { auth, hello } from '#/utils/api';
import { setIsAuthorized } from '#/stores/auth';
import { config } from '#/utils/transport';

export const SignIn: Component = () => {
  const navigate = useNavigate();

  const onSubmit = async (username: string, password: string) => {
    try {
      const response = await hello({ username });
      const B = hex2bn(response.B);
      const salt = hex2bn(response.salt);
      const { a, A } = createKeyPair();
      const K = await computeK(password, salt, a, A, B);
      const M = await computeM(username, salt, A, B, K);

      const serverP = await auth({ username, A: bn2hex(A), M: bn2hex(M) });
      const clientP = await computeP(A, M, K);

      if (bn2hex(clientP) !== serverP) {
        throw new Error('Server provided session proof is invalid');
      }

      config(await importK(bn2ab(K)));
      setIsAuthorized(true);

      navigate('/');
    }
    catch (error: unknown) {
      log(String(error));
      throw error;
    }
  };

  return <Form label="SignIn" onSubmit={onSubmit} />;
};
