import React from 'react';

import { config } from 'src/config';
import { URLS } from './urls';

const Investing = React.lazy(() => import('src/investing'));
const Stablecoin = React.lazy(() => import('src/stablecoin'));
const Market = React.lazy(() => import('src/market/market-forms'));
const StakingDetail = React.lazy(() => import('src/staking/staking-detail'));
const StakingList = React.lazy(() => import('src/staking/staking-list'));
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
const DocsList = React.lazy(() => import('src/docs/docs-list'));
const DocsDetail = React.lazy(() => import('src/docs/docs-detail'));
const CollateralList = React.lazy(
  () => import('src/collateral/collateral-list')
);
const CollateralDetail = React.lazy(
  () => import('src/collateral/collateral-detail')
);
const CollateralIssuer = React.lazy(
  () => import('src/collateral/collateral-issuer')
);
const Main = React.lazy(() => import('src/main'));

export const routes = [
  {
    url: URLS.main,
    component: !config.IS_INVEST ? Main : Investing
  },
  {
    url: URLS.whitepaper,
    component: Whitepaper
  },
  ...(!config.IS_INVEST
    ? [
        {
          url: URLS.voting.create,
          component: VotingCreateProposal
        },
        {
          url: URLS.stablecoin,
          component: Stablecoin
        },
        {
          url: URLS.voting.detail(),
          component: VotingProposalDetail
        },
        {
          url: URLS.voting.list,
          component: VotingProposalList
        },
        {
          url: URLS.market,
          component: Market
        },
        {
          url: URLS.staking.detail(),
          component: StakingDetail
        },
        {
          url: URLS.staking.list,
          component: StakingList
        },
        {
          url: URLS.oracle,
          component: OracleManage
        },
        {
          url: URLS.vesting,
          component: VestingList
        },
        {
          url: URLS.monitor,
          component: MonitorContractList
        },
        {
          url: URLS.profitSplitter,
          component: ProfitSplitterForms
        },
        {
          url: URLS.docs.detail(),
          component: DocsDetail
        },
        {
          url: URLS.docs.list,
          component: DocsList
        },
        {
          url: URLS.collateral.detail(),
          component: CollateralDetail
        },
        {
          url: URLS.collateral.issuer(),
          component: CollateralIssuer
        },
        {
          url: URLS.collateral.list,
          component: CollateralList
        }
      ]
    : []),
  {
    component: NotFound
  }
];
