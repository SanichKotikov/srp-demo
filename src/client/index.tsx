import './index.css';

/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';
import { App } from './app';
import { Main, SignIn, Signup } from './pages';

export async function start() {
  const root = document.getElementById('root');

  render(() => (
    <Router base="/srp-demo" root={App}>
      <Route path="/" component={Main} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={SignIn} />
    </Router>
  ), root!);
}
