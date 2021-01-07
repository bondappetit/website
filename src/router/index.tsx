import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { SuspenseFallback } from 'src/common';
import { routes } from './routes';

const Router: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <BrowserRouter>
        <Switch>
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
