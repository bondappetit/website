import clsx from 'clsx';
import React, { useMemo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Head, Link, PageWrapper, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import { URLS } from 'src/router/urls';
import {
  useVotingProposalList,
  VotingInfoFactoid,
  VotingInfoProposalList,
  VotingInfoDecision
} from '../common';
import { VotingInvesting } from '../voting-investing';
import { VotingStaking } from '../voting-staking/voting-staking';
import { useVotingInfoStyles } from './voting-info.styles';

export const VotingInfo: React.FC = () => {
  const classes = useVotingInfoStyles();

  const { proposals, pages } = useVotingProposalList(3);

  const proposalCount = useMemo(
    () => pages.reduce((sum, { length }) => sum + length, 0),
    [pages]
  );

  return (
    <>
      <Head title="Shape the future of the protocol with the BondAppétit Governance token (BAG)" />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <div className={clsx(classes.block, classes.titleWrap)}>
            <Typography variant="h1" align="center" className={classes.title}>
              Shape the future of the protocol with the BondAppétit Governance
              token (BAG)
            </Typography>
            <Typography variant="h4" align="center" className={classes.link}>
              <Link
                component={ReactRouterLink}
                to={`${URLS.whitepaper}#19`}
                color="blue"
              >
                Learn more about how governance works →
              </Link>
            </Typography>
          </div>
          <div className={clsx(classes.block, classes.investing)}>
            <VotingInvesting />
            <VotingStaking />
          </div>
          <VotingInfoFactoid className={clsx(classes.factoid, classes.block)} />
          <VotingInfoProposalList
            loading={proposals.loading}
            proposals={proposals.value}
            proposalCount={proposalCount}
            className={clsx(classes.proposals, classes.block)}
          />
          <VotingInfoDecision
            className={clsx(classes.decision, classes.block)}
          />
        </PageWrapper>
      </MainLayout>
    </>
  );
};
