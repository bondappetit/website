import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { SuspenseFallback } from 'src/common';
import { routes } from './routes';
import { ScrollToTop } from './scroll-to-top';
import { URLS } from './urls';

const Router: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Redirect from={URLS.staking.list} to={URLS.rewards.list} exact />
          {routes.map((route, index) => {
            const id = `${route.url}-${index}`;

            return (
              <Route exact path={route.url} key={id}>
                <route.component />
              </Route>
            );
          })}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
