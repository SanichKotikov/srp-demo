import { type Component, createMemo, For } from 'solid-js';
import { db } from '@/_shared/db';
import { mask } from '#/utils/helpers';
import css from './db.module.css';

export const DB: Component = () => {
  const users = createMemo(() => {
    const data = db();

    return Object.keys(data).map((user: string) => {
      const item = data[user];
      return { user, salt: mask(item.salt), verifier: mask(item.verifier) };
    });
  });

  return (
    <div class={css.root}>
      <For each={users()} fallback={<p>Users not found</p>}>
        {(item) => (
          <div>
            <h4>{item.user}</h4>
            <p>
              salt: {item.salt}
              <br />
              verifier: {item.verifier}
            </p>
          </div>
        )}
      </For>
    </div>
  );
};
