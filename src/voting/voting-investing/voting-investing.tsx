import React, { useCallback } from 'react';
import { useToggle } from 'react-use';

import {
  Button,
  Modal,
  SmallModal,
  Typography,
  useNetworkConfig
} from 'src/common';
import { config } from 'src/config';
import { VotingInfoCard } from '../common';
import { VotingInvestingForm } from '../voting-investing-form';
import { useInvestingTotal } from './use-investing-total';
import { useVotingInvestingStyles } from './voting-investing.styles';

const UNISWAP_URL = 'https://uniswap.exchange/swap';

export const VotingInvesting: React.VFC = () => {
  const [investFormIsOpen, toggleInvestForm] = useToggle(false);
  const [attentionIsOpen, toggleAttention] = useToggle(false);

  const networkConfig = useNetworkConfig();

  const classes = useVotingInvestingStyles();

  const handleOpenInvestForm = useCallback(() => {
    toggleAttention(false);
    toggleInvestForm(true);
  }, [toggleAttention, toggleInvestForm]);

  const investingTotal = useInvestingTotal();

  const totalTokens = investingTotal.value?.totalTokens.toFormat(0) ?? '0';

  const leftTokens = investingTotal.value?.balance.toFormat(0) ?? '0';

  const percent = investingTotal.value?.percent?.toFormat(2) ?? '0';

  const handleToUniswap = useCallback(() => {
    window.open(
      `${UNISWAP_URL}?inputCurrency=${networkConfig.assets.WETH.address}&outputCurrency=${networkConfig.assets.Governance.address}`
    );
  }, [networkConfig.assets]);

  return (
    <>
      <VotingInfoCard
        loading={investingTotal.loading}
        className={classes.root}
        title={
          config.IS_INVEST ? 'Buy with a 50% discount' : 'Buy BAG on Uniswap'
        }
        subtitle={
          config.IS_INVEST
            ? `${leftTokens} of ${totalTokens} BAG left`
            : `${leftTokens} remained to buy`
        }
        percent={config.IS_INVEST ? percent : undefined}
        buttonTitle="Buy BAG"
        onClick={config.IS_INVEST ? toggleAttention : handleToUniswap}
        description={
          config.IS_INVEST
            ? `Special offer for early investors only: buy the initial emission of ${percent}% (${totalTokens} BAGs)
        at a price of $2.5 (50% discount) per token, subject to a 6 months moratorium on sales. The offer is valid until July 2021.`
            : ''
        }
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
                We&apos;re offering BAG tokens with a 50-percent discount and a
                6-month lockup period.
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
