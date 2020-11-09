import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from 'src/home';
import VotingList from 'src/voting/voting-list';
import { URLS } from './urls';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={URLS.home}>
          <Home />
        </Route>
        <Route path={URLS.voting}>
          <VotingList />
        </Route>
        <Route>
          <>not found</>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
