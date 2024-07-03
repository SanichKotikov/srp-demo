import { type Component, createSignal } from 'solid-js';
import { Button } from '#/ui';
import css from './form.module.css';

interface IProps {
  label: string;
  onSubmit: (user: string, password: string) => Promise<void>;
}

export const Form: Component<IProps> = (props) => {
  const [loading, setLoading] = createSignal(false);

  const [name, setName] = createSignal('');
  const [pass, setPass] = createSignal('');

  const onSubmit = (event: Event) => {
    event.preventDefault();
    setLoading(true);

    props.onSubmit(name(), pass())
      .then(() => {
        setLoading(false);
        setName('');
        setPass('');
      })
      .catch(() => setLoading(false));
  };

  return (
    <form class={css.root} onsubmit={onSubmit}>
      <label>
        <span>Login:</span>
        <input
          type="text"
          name="user"
          value={name()}
          onchange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          name="password"
          value={pass()}
          onchange={(event) => setPass(event.target.value)}
        />
      </label>
      <Button type="submit" disabled={loading()}>
        {props.label}
      </Button>
    </form>
  );
};
