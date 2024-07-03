import { type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { bn2hex } from '@/_shared/utils';
import { Form } from '#/form/form';
import { computeVerifier, createSalt } from '#/utils/srp';
import { signup } from '#/utils/api';

export const Signup: Component = () => {
  const navigate = useNavigate();

  const onSubmit = async (username: string, password: string) => {
    const salt = createSalt();
    const verifier = await computeVerifier(password, salt);
    await signup({ username, salt: bn2hex(salt), verifier: bn2hex(verifier) });

    navigate('/signin');
  };

  return <Form label="SignUp" onSubmit={onSubmit} />;
};
