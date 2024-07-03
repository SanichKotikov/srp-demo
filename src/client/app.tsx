import { type Component } from 'solid-js';
import { RouteSectionProps } from '@solidjs/router';
import { DB } from './db/db';
import { Logger } from './logger/logger';
import { Grid } from './ui';
import css from './app.module.css';

export const App: Component<RouteSectionProps> = (props) => {
  return (
    <Grid template="1fr 1fr" direction="column" class={css.root}>
      <Grid template="2fr 1fr">
        <Grid type="flex" align="center" justify="center">
          {props.children}
        </Grid>
        <DB />
      </Grid>
      <Logger />
    </Grid>
  );
};
