import { type Component } from 'solid-js';
import css from './button.module.css';

interface IProps {
  type?: 'submit';
  disabled?: boolean;
  children: string;
  onClick?: VoidFunction;
}

export const Button: Component<IProps> = (props) => {
  return (
    <button type={props.type} disabled={props.disabled} class={css.root} onclick={props.onClick}>
      {props.children}
    </button>
  );
};
