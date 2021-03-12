import clsx from 'clsx';
import React, { useMemo } from 'react';

import { Head, PageWrapper, Typography } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  useVotingProposalList,
  VotingInfoFactoid,
  VotingInfoProposalList,
  VotingInfoDecision
} from '../common';
import { VotingInvesting, useInvestingTotal } from '../voting-investing';
import { useVotingInfoStyles } from './voting-info.styles';

export const VotingInfo: React.FC = () => {
  const classes = useVotingInfoStyles();

  const { proposals, pages } = useVotingProposalList(3);

  const proposalCount = useMemo(
    () => Math.round(pages.length * (proposals.value?.length || 0)),
    [pages.length, proposals.value]
  );

  const investingTotal = useInvestingTotal();

  return (
    <>
      <Head title="Shape the future of the protocol using BondAppétit Governance (BAG)" />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <Typography
            variant="h1"
            align="center"
            className={clsx(classes.title, classes.block)}
          >
            Shape the future of the protocol using BondAppétit Governance (BAG)
          </Typography>
          <VotingInvesting
            percent={investingTotal.value?.percent?.toString(10)}
            loading={investingTotal.loading}
            totalTokens={investingTotal.value?.totalTokens.toFormat(0)}
            balance={investingTotal.value?.balance.toFormat(0)}
          />
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
