import { createSignal } from 'solid-js';

const [logger, setLogger] = createSignal<unknown[]>([]);

export { logger };

export function log(value: unknown): void {
  setLogger((prev) => ([...prev, value]));
}
