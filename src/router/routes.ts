import React from 'react';

import { URLS } from './urls';
import { lazyLoading } from './lazy-loading';

const Stablecoin = React.lazy(() =>
  lazyLoading(() => import('src/stablecoin'))
);
const StakingDetail = React.lazy(() =>
  lazyLoading(() => import('src/staking/staking-detail'))
);
const StakingList = React.lazy(() =>
  lazyLoading(() => import('src/staking/staking-list'))
);
const VestingList = React.lazy(() =>
  lazyLoading(() => import('src/vesting/vesting-list'))
);
const MonitorContractList = React.lazy(() =>
  lazyLoading(() => import('src/monitor/monitor-contract-list'))
);
const NotFound = React.lazy(() => lazyLoading(() => import('src/not-found')));
const Whitepaper = React.lazy(() =>
  lazyLoading(() => import('src/whitepaper'))
);
const ProfitSplitterForms = React.lazy(() =>
  lazyLoading(() => import('src/profit-splitter'))
);
const VotingProposalDetail = React.lazy(() =>
  lazyLoading(() => import('src/voting/voting-proposal-detail'))
);
const VotingProposalList = React.lazy(() =>
  lazyLoading(() => import('src/voting/voting-proposal-list'))
);
const VotingCreateProposal = React.lazy(() =>
  lazyLoading(() => import('src/voting/voting-create-proposal'))
);
const VotingInfo = React.lazy(() =>
  lazyLoading(() => import('src/voting/voting-info'))
);
const DocsList = React.lazy(() =>
  lazyLoading(() => import('src/docs/docs-list'))
);
const DocsDetail = React.lazy(() =>
  lazyLoading(() => import('src/docs/docs-detail'))
);
const CollateralList = React.lazy(() =>
  lazyLoading(() => import('src/collateral/collateral-list'))
);
const CollateralDetail = React.lazy(() =>
  lazyLoading(() => import('src/collateral/collateral-detail'))
);
const CollateralIssuer = React.lazy(() =>
  lazyLoading(() => import('src/collateral/collateral-issuer'))
);
const CollateralBorrow = React.lazy(() =>
  lazyLoading(() => import('src/collateral/collateral-borrow'))
);
const Main = React.lazy(() => lazyLoading(() => import('src/main')));
const VestingSplitter = React.lazy(() =>
  lazyLoading(() => import('src/vesting-splitter'))
);
const Contracts = React.lazy(() => lazyLoading(() => import('src/contracts')));
const Bridge = React.lazy(() => lazyLoading(() => import('src/bridge')));
const BAG = React.lazy(() => lazyLoading(() => import('src/bag')));
const YieldEscrow = React.lazy(() =>
  lazyLoading(() => import('src/yield-escrow'))
);

export const routes = [
  {
    url: URLS.main,
    component: Main
  },
  {
    url: URLS.whitepaper,
    component: Whitepaper
  },
  {
    url: URLS.voting.create,
    component: VotingCreateProposal
  },
  {
    url: URLS.stablecoin,
    component: Stablecoin
  },
  {
    url: URLS.voting.info,
    component: VotingInfo
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
    url: URLS.staking.detail(),
    component: StakingDetail
  },
  {
    url: URLS.staking.list,
    component: StakingList
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
  },
  {
    url: URLS.collateral.borrow,
    component: CollateralBorrow
  },
  {
    url: URLS.vestingSplitter,
    component: VestingSplitter
  },
  {
    url: URLS.contract,
    component: Contracts
  },
  {
    url: URLS.bridge,
    component: Bridge
  },
  {
    url: URLS.bag,
    component: BAG
  },
  {
    url: URLS.yieldEscrow,
    component: YieldEscrow
  },
  {
    component: NotFound
  }
];
