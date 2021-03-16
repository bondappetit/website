import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import { Button, Modal, SmallModal, Typography } from 'src/common';
import { VotingInfoCard } from '../common';
import { VotingInvestingForm } from '../voting-investing-form';
import { useInvestingTotal } from './use-investing-total';
import { useVotingInvestingStyles } from './voting-investing.styles';

export const VotingInvesting: React.VFC = () => {
  const [investFormIsOpen, toggleInvestForm] = useToggle(false);
  const [attentionIsOpen, toggleAttention] = useToggle(false);

  const classes = useVotingInvestingStyles();

  const handleOpenInvestForm = useCallback(() => {
    toggleAttention(false);
    toggleInvestForm(true);
  }, [toggleAttention, toggleInvestForm]);

  const investingTotal = useInvestingTotal();

  const totalTokens = investingTotal.value?.totalTokens.toFormat(0) ?? '0';

  const balance = investingTotal.value?.balance.toFormat(0) ?? '0';

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
        description={`The initial issue of ${totalTokens} BAG) is
        offered to early investors during the first phase of protocol
        for 2,5$ per token (50% discount to initial issue price),
        subject to a 6-month moratorium on the sale.`}
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
              </Typography>
              <Typography variant="h5">
                We are offeting BAG tokens with the discount, but your tokens
                will be locked for 6 months on your wallet.
              </Typography>{' '}
              <Typography variant="h5">
                You can not transfer or stake this tokens for this period, but
                you can vote or create proposals with them.
              </Typography>
            </div>
            <Button
              className={classes.attentionButton}
              onClick={handleOpenInvestForm}
            >
              Buy
            </Button>
          </div>
        </SmallModal>
      </Modal>
    </>
  );
};
