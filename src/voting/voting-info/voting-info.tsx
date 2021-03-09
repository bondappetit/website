import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useToggle } from 'react-use';

import { Head, LinkModal, PageWrapper, useNetworkConfig } from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  useVotingProposalList,
  VotingInfoFactoid,
  VotingInfoProposalList,
  VotingInfoDecision,
  VotingInfoHowTo
} from '../common';
import { VotingInvesting } from '../voting-investing';
import { useVotingInfoStyles } from './voting-info.styles';

export const VotingInfo: React.FC = () => {
  const classes = useVotingInfoStyles();

  const [linkModalOpen, togglelinkModal] = useToggle(false);

  const { proposals, pages } = useVotingProposalList(3);

  const networkConfig = useNetworkConfig();

  const proposalCount = useMemo(
    () => Math.round(pages.length * (proposals.value?.length || 0)),
    [pages.length, proposals.value]
  );

  return (
    <>
      <Head title="Shape the future of the protocol using BondAppétit Governance (BAG)" />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <VotingInvesting />
          <VotingInfoProposalList
            loading={proposals.loading}
            proposals={proposals.value}
            proposalCount={proposalCount}
            className={clsx(classes.proposals, classes.block)}
          />
          <VotingInfoFactoid className={clsx(classes.factoid, classes.block)} />
          <VotingInfoDecision className={classes.decision} />
          <VotingInfoHowTo onBuy={togglelinkModal} />
        </PageWrapper>
      </MainLayout>
      <LinkModal
        open={linkModalOpen}
        onClose={togglelinkModal}
        withBuyCollateralMarket={false}
        withBuyMarket={false}
        tokenAddress={networkConfig.assets.Governance.address}
      />
    </>
  );
};
