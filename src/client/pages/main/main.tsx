import { type Component, createSignal, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { log } from '@/_shared/logger';
import { Button } from '#/ui';
import { isAuthorized, setIsAuthorized } from '#/stores/auth';
import { ping } from '#/utils/api';
import { config } from '#/utils/transport';
import css from './main.module.css';

export const Main: Component = () => {
  const [loading, setLoading] = createSignal(false);
  const [status, setStatus] = createSignal<boolean>();

  const onPing = async () => {
    try {
      setLoading(true);
      const response = await ping({ time: Date.now() });
      setStatus(response.pong);
      setLoading(false);
    }
    catch (error: unknown) {
      setLoading(false);
      log(String(error));
    }
  };

  const onLogout = (): void => {
    config(undefined);
    setIsAuthorized(false);
  };

  return (
    <div class={css.root}>
      <Show
        when={isAuthorized()}
        fallback={
          <div class={css.nav}>
            <A href="/signup">SignUp</A>
            <A href="/signin">SignIn</A>
          </div>
        }
      >
        <div class={css.content}>
          <div class={css.buttons}>
            <Button disabled={loading()} onClick={onPing}>Ping</Button>
            <Button onClick={onLogout}>LogOut</Button>
          </div>
          <p>Pong: {String(status())}</p>
        </div>
      </Show>
    </div>
  );
};
