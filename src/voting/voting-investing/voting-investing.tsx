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

  const leftTokens = investingTotal.value?.balance.toFormat(0) ?? '0';

  const percent = investingTotal.value?.percent?.toFormat(2) ?? '0';

  return (
    <>
      <VotingInfoCard
        loading={investingTotal.loading}
        className={classes.root}
        title="Buy BAG on Pre-Sale"
        subtitle={`${leftTokens} of ${totalTokens} BAG left`}
        percent={percent}
        buttonTitle="Buy BAG"
        onClick={toggleAttention}
        description={`Special offer for early investors only: buy the initial emission of (${totalTokens} BAGs) at a fixed price of $2.5 per token, subject to a 6 months moratorium on sales. The offer is valid until July 2021.`}
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
                We&apos;re offering BAG tokens with a fixed price and a 6-month
                lockup period.
              </Typography>{' '}
              <Typography variant="h5">
                That means you won&apos;t be able to transfer or stake tokens
                for 6 months, but you will be able to vote and create proposals
                with them.
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
