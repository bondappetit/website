import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import {
  Button,
  LinkModal,
  Modal,
  SmallModal,
  Typography,
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
          <div className={classes.attention}>
            <div className={classes.attentionContent}>
              <Typography variant="h5" weight="bold">
                <Typography variant="inherit" className={classes.attentionRed}>
                  Attention!
                </Typography>{' '}
                3-month locking
              </Typography>
              <Typography variant="h5">
                Your BAG tokens will be locked for 3 months.
              </Typography>{' '}
              <Typography variant="h5">
                You will be able to claim the staking reward anytime.
              </Typography>
            </div>
            <Button
              className={classes.attentionButton}
              onClick={handleOpenLinkModal}
            >
              Buy
            </Button>
          </div>
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
