import type { JSX } from 'solid-js';

export type TFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type TAlignItems = 'start' | 'center' | 'end' | 'stretch';

export interface ISharedProps {
  align?: TAlignItems;
  justify?: TAlignItems;
  direction?: 'row' | 'column';
  class?: string;
  style?: JSX.CSSProperties;
  children: JSX.Element;
}

export interface IGridTypeProps {
  type?: 'grid';
  template: string;
}

export interface IFlexTypeProps {
  type: 'flex';
  wrap?: TFlexWrap;
}

export interface IGridProps extends Omit<IGridTypeProps, 'type'>, IFlexTypeProps, ISharedProps {}

export type GridProps = ISharedProps & (IGridTypeProps | IFlexTypeProps);
