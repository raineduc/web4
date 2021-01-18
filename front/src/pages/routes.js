/* eslint-disable react/no-array-index-key */
import React, { Suspense } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

const HomePage = React.lazy(() => import('./Home'));
const GamePage = React.lazy(() => import('./Game'));

const withSuspense = (Component) => (props) => (
  <Suspense fallback={<div>Загрузка</div>}>
    <Component {...props} />
  </Suspense>
);

const routes = [
  {
    path: '/game',
    component: withSuspense(GamePage),
  },
  {
    path: '/',
    component: withSuspense(HomePage),
  },
];

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    render={(props) => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export const Routes = () => (
  <Switch>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
  </Switch>
);
