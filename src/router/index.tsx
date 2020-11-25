import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from 'src/home';
import { VotingProposalDetail, VotingProposalList } from 'src/voting';
import Market from 'src/market/market-forms';
import StakingList from 'src/staking';
import { URLS } from './urls';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={URLS.home}>
          <Home />
        </Route>
        <Route path={URLS.voting.detail()}>
          <VotingProposalDetail />
        </Route>
        <Route path={URLS.voting.list}>
          <VotingProposalList />
        </Route>
        <Route path={URLS.market}>
          <Market />
        </Route>
        <Route path={URLS.market}>
          <Market />
        </Route>
        <Route path={URLS.staking.list}>
          <StakingList />
        </Route>
        <Route>
          <>not found</>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
