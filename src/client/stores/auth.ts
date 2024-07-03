import { createSignal } from 'solid-js';

export const [isAuthorized, setIsAuthorized] = createSignal<boolean>(false);
