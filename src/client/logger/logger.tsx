import { type Component, For } from 'solid-js';
import { logger } from '@/_shared/logger';
import { mask } from '#/utils/helpers';
import css from './logger.module.css';

function prepare(value: any): unknown {
  if (typeof value === 'object' && value !== null) {
    value = JSON.parse(JSON.stringify(value));

    Object.keys(value).forEach((key: string) => {
      const val = (value as any)[key];

      (value as any)[key] =
        typeof val === 'string' && val.length > 20
          ? mask(val)
          : prepare(val);
    });
  }

  return value;
}

export const Logger: Component = () => {
  return (
    <div class={css.root}>
      <For each={logger()}>
        {(item: unknown) => (
          <p>{JSON.stringify(prepare(item))}</p>
        )}
      </For>
    </div>
  );
};
