import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { SuspenseFallback } from 'src/common';
import { URLS } from './urls';

const Home = React.lazy(() => import('src/home'));
const Market = React.lazy(() => import('src/market/market-forms'));
const StakingDetail = React.lazy(() => import('src/stacking/stacking-detail'));
const StakingList = React.lazy(() => import('src/stacking/stacking-list'));
const OracleManage = React.lazy(() => import('src/oracle/oracle-manage'));
const VestingList = React.lazy(() => import('src/vesting/vesting-list'));
const MonitorContractList = React.lazy(
  () => import('src/monitor/monitor-contract-list')
);
const NotFound = React.lazy(() => import('src/not-found'));
const Whitepaper = React.lazy(() => import('src/whitepaper'));
const ProfitSplitterForms = React.lazy(() => import('src/profit-splitter'));
const VotingProposalDetail = React.lazy(
  () => import('src/voting/voting-proposal-detail')
);
const VotingProposalList = React.lazy(
  () => import('src/voting/voting-proposal-list')
);
const VotingCreateProposal = React.lazy(
  () => import('src/voting/voting-create-proposal')
);

const Router: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <BrowserRouter>
        <Switch>
          <Route exact path={URLS.home}>
            <Home />
          </Route>
          <Route path={URLS.voting.create}>
            <VotingCreateProposal />
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
          <Route path={URLS.stacking.detail()}>
            <StakingDetail />
          </Route>
          <Route path={URLS.stacking.list}>
            <StakingList />
          </Route>
          <Route path={URLS.oracle}>
            <OracleManage />
          </Route>
          <Route path={URLS.vesting}>
            <VestingList />
          </Route>
          <Route path={URLS.monitor}>
            <MonitorContractList />
          </Route>
          <Route path={URLS.profitSplitter}>
            <ProfitSplitterForms />
          </Route>
          <Route path={URLS.whitepaper}>
            <Whitepaper />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
