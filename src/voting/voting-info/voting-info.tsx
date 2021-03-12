import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import { useToggle } from 'react-use';

import {
  Button,
  Head,
  LinkModal,
  Modal,
  PageWrapper,
  SmallModal,
  useNetworkConfig
} from 'src/common';
import { MainLayout } from 'src/layouts';
import {
  useVotingProposalList,
  VotingInfoFactoid,
  VotingInfoProposalList,
  VotingInfoDecision,
  VotingInfoHowTo
} from '../common';
import { VotingInvesting, useInvestingTotal } from '../voting-investing';
import { VotingInvestingForm } from '../voting-investing-form';
import { useVotingInfoStyles } from './voting-info.styles';

export const VotingInfo: React.FC = () => {
  const classes = useVotingInfoStyles();

  const [linkModalOpen, togglelinkModal] = useToggle(false);
  const [investFormIsOpen, toggleInvestForm] = useToggle(false);
  const [attentionIsOpen, toggleAttention] = useToggle(false);

  const { proposals, pages } = useVotingProposalList(3);

  const networkConfig = useNetworkConfig();

  const proposalCount = useMemo(
    () => Math.round(pages.length * (proposals.value?.length || 0)),
    [pages.length, proposals.value]
  );

  const investingTotal = useInvestingTotal();

  const handleOpenLinkModal = useCallback(() => {
    toggleAttention(false);
    togglelinkModal(true);
  }, [toggleAttention, togglelinkModal]);

  const handleOpenInvestForm = useCallback(() => {
    togglelinkModal(false);
    toggleInvestForm(true);
  }, [togglelinkModal, toggleInvestForm]);

  return (
    <>
      <Head title="Shape the future of the protocol using BondAppétit Governance (BAG)" />
      <MainLayout>
        <PageWrapper className={classes.root}>
          <VotingInvesting
            percent={investingTotal.value?.percent?.toString(10)}
            loading={investingTotal.loading}
            totalTokens={investingTotal.value?.totalTokens.toFormat(0)}
            balance={investingTotal.value?.balance.toFormat(0)}
          />
          <VotingInfoProposalList
            loading={proposals.loading}
            proposals={proposals.value}
            proposalCount={proposalCount}
            className={clsx(classes.proposals, classes.block)}
          />
          <VotingInfoFactoid className={clsx(classes.factoid, classes.block)} />
          <VotingInfoDecision className={classes.decision} />
          <VotingInfoHowTo onBuy={toggleAttention} />
        </PageWrapper>
      </MainLayout>
      <Modal open={attentionIsOpen} onClose={toggleAttention}>
        <SmallModal>
          attention
          <Button onClick={handleOpenLinkModal}>Ok</Button>
        </SmallModal>
      </Modal>
      <VotingInvestingForm open={investFormIsOpen} onClose={toggleInvestForm} />
      <LinkModal
        open={linkModalOpen}
        onClose={togglelinkModal}
        withBuyCollateralMarket={
          investingTotal.value?.balance.isGreaterThan(0) ?? false
        }
        withBuyMarket={false}
        onBuyCollateralMarket={handleOpenInvestForm}
        tokenName={networkConfig.assets.Governance.symbol}
        tokenAddress={networkConfig.assets.Governance.address}
      />
    </>
  );
};
