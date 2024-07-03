import { type Component, createMemo } from 'solid-js';
import type { GridProps, IGridProps, TAlignItems } from './grid.types';
import css from './grid.module.css';

const ALIGN_VALUE_MAP: Record<TAlignItems, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
};

const GridComp: Component<IGridProps> = (props) => {
  const style = createMemo(() => {
    const align = props.align && ALIGN_VALUE_MAP[props.align];
    const justify = props.justify && ALIGN_VALUE_MAP[props.justify];

    if (props.type === 'flex') {
      return {
        'display': 'flex',
        'flex-direction': props.direction,
        'align-items': align,
        'justify-content': justify,
        'flex-wrap': props.wrap,
        ...props.style,
      };
    }

    return {
      'display': 'grid',
      'align-items': align,
      'justify-items': justify,
      ...(props.direction === 'column'
        ? { 'grid-template-rows': props.template }
        : { 'grid-template-columns': props.template }),
      ...props.style,
    };
  });

  return (
    <div
      class={css.root}
      classList={{ [props.class!]: !!props.class }}
      style={style()}
    >
      {props.children}
    </div>
  );
};

export const Grid = GridComp as Component<GridProps>;
