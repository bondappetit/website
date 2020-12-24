import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import clsx from 'clsx';

import { MainLayout } from 'src/layouts';
import { Button, Plate, Typography, PageWrapper } from 'src/common';
import {
  StackingHeader,
  StackingLockForm,
  useStackingApy,
  useStackingBalances,
  useStackingUnlock
} from 'src/stacking/common';
import { useStackingDetailStyles } from './stacking-detail.styles';

export const StackingDetail: React.FC = () => {
  const classes = useStackingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const { account } = useWeb3React<Web3>();
  const [{ stackingBalances }, update] = useStackingBalances([params.tokenId]);
  const [balance] = useStackingApy(stackingBalances);

  const unlock = useStackingUnlock(params.tokenId);

  const stackingBalanceIsEmpty = useMemo(() => !Number(balance?.amount), [
    balance
  ]);

  const handleUnlock = useCallback(() => {
    if (stackingBalanceIsEmpty) return;

    unlock().then(update);
  }, [unlock, update, stackingBalanceIsEmpty]);

  return (
    <MainLayout>
      <PageWrapper className={classes.stacking}>
        <StackingHeader
          tokenName={params.tokenId}
          APY={balance?.APY}
          className={classes.header}
        />
        <div className={classes.row}>
          <Plate variant="dotted" className={classes.card}>
            <StackingLockForm
              account={account}
              tokenName={params.tokenId}
              onSubmit={update}
            />
          </Plate>
          <Plate
            variant="dotted"
            className={clsx(classes.card, classes.cardFlex)}
          >
            <div className={classes.stackingBalance}>
              <div>
                <Typography variant="body1" align="center">
                  You stacked {params.tokenId}
                </Typography>
                <Typography variant="h2" align="center">
                  {balance?.amount}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.usd}
                >
                  {balance?.amount} USD
                </Typography>
              </div>
              <div>
                <Typography variant="body1" align="center">
                  You earned {params.tokenId}
                </Typography>
                <Typography variant="h2" align="center">
                  {balance?.reward}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.usd}
                >
                  {balance?.reward} USD
                </Typography>
              </div>
            </div>
            <Button onClick={handleUnlock} className={classes.unlock}>
              Unstake and claim
            </Button>
          </Plate>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
