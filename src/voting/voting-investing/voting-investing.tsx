import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import {
  Button,
  LinkModal,
  Modal,
  SmallModal,
  useNetworkConfig
} from 'src/common';
import { VotingInfoCard } from '../common';
import { VotingInvestingForm } from '../voting-investing-form';
import { useInvestingTotal } from './use-investing-total';
import { useVotingInvestingStyles } from './voting-investing.styles';

export const VotingInvesting: React.VFC = () => {
  const networkConfig = useNetworkConfig();
  const [linkModalIsOpen, toggleLinkModal] = useToggle(false);
  const [investFormIsOpen, toggleInvestForm] = useToggle(false);
  const [attentionIsOpen, toggleAttention] = useToggle(false);

  const classes = useVotingInvestingStyles();

  const handleOpenLinkModal = useCallback(() => {
    toggleAttention(false);
    toggleLinkModal(true);
  }, [toggleAttention, toggleLinkModal]);

  const handleOpenInvestForm = useCallback(() => {
    toggleLinkModal(false);
    toggleInvestForm(true);
  }, [toggleLinkModal, toggleInvestForm]);

  const investingTotal = useInvestingTotal();

  const totalTokens = investingTotal.value?.totalTokens.toFormat(0);

  const balance = investingTotal.value?.balance.toFormat(0);

  return (
    <>
      <VotingInfoCard
        loading={investingTotal.loading}
        className={classes.root}
        title="Buy BAG on Pre-Sale"
        subtitle={`${balance} of ${totalTokens} BAG remained to buy`}
        percent={investingTotal.value?.percent?.toString(10)}
        buttonTitle="Buy BAG"
        onClick={toggleAttention}
        description={`The initial BAG issue of 12% (${totalTokens} BAG) is
        offered to early investors during the first phase of protocol,
        subject to a 1-year moratorium on the sale.`}
      />
      <VotingInvestingForm
        open={investFormIsOpen}
        onClose={toggleInvestForm}
        onSuccess={investingTotal.retry}
      />
      <Modal open={attentionIsOpen} onClose={toggleAttention}>
        <SmallModal>
          attention
          <Button onClick={handleOpenLinkModal}>Ok</Button>
        </SmallModal>
      </Modal>
      <LinkModal
        withBuyCollateralMarket
        onBuyCollateralMarket={handleOpenInvestForm}
        open={linkModalIsOpen}
        onClose={toggleLinkModal}
        tokenName={networkConfig.assets.Governance.symbol}
        tokenAddress={networkConfig.assets.Governance.address}
      />
    </>
  );
};
