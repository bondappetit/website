import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import clsx from 'clsx';
import BN from 'bignumber.js';

import { MainLayout } from 'src/layouts';
import {
  Button,
  Plate,
  Typography,
  PageWrapper,
  useQueryParams,
  useBalance,
  useNetworkConfig
} from 'src/common';
import {
  StackingHeader,
  useStackingApy,
  useStackingBalances,
  useStackingUnlock
} from 'src/stacking/common';
import { StackingLockForm } from '../stacking-lock-form';
import { useStackingDetailStyles } from './stacking-detail.styles';

export const StackingDetail: React.FC = () => {
  const classes = useStackingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const networkConfig = useNetworkConfig();
  const { account } = useWeb3React<Web3>();
  const [stackingBalances, update] = useStackingBalances([params.tokenId]);
  const [stackingBalancesWithApy] = useStackingApy(stackingBalances);
  const queryParams = useQueryParams();
  const [balanceOfToken, setbalanceOfToken] = useState('');
  const amountInUSDC = new BN(stackingBalancesWithApy?.amount)
    .multipliedBy(stackingBalancesWithApy?.stakingPriceUSDC)
    .div(new BN(10).pow(networkConfig.assets.USDC.decimals))
    .toString();
  const rewardInUSDC = new BN(stackingBalancesWithApy?.reward)
    .multipliedBy(stackingBalancesWithApy?.rewardPriceUSDC)
    .div(new BN(10).pow(networkConfig.assets.USDC.decimals))
    .toString();

  const getBalance = useBalance();

  const unlock = useStackingUnlock(params.tokenId);

  const stackingBalanceIsEmpty = useMemo(
    () => !Number(stackingBalancesWithApy?.amount),
    [stackingBalancesWithApy]
  );

  const handleUnstake = useCallback(() => {
    if (stackingBalanceIsEmpty) return;

    unlock().then(update);
  }, [unlock, update, stackingBalanceIsEmpty]);

  const handleClaim = useCallback(() => {
    if (stackingBalanceIsEmpty) return;

    unlock(false).then(update);
  }, [unlock, update, stackingBalanceIsEmpty]);

  const handleGetBalanceOfToken = useCallback(async () => {
    const currentAsset = networkConfig.assets[params.tokenId];

    const balanceOfTokenResult = await getBalance({
      tokenAddress: currentAsset.address
    });

    const balance = balanceOfTokenResult.div(
      new BN(10).pow(currentAsset.decimals)
    );

    setbalanceOfToken(balance.isNaN() ? '0' : balance.toString(10));
  }, [networkConfig, getBalance, params.tokenId]);

  useEffect(() => {
    handleGetBalanceOfToken();
  }, [handleGetBalanceOfToken, stackingBalances]);

  return (
    <MainLayout>
      <PageWrapper className={classes.stacking}>
        <StackingHeader
          tokenKey={params.tokenId}
          tokenName={queryParams.get('tokenName')}
          APY={stackingBalancesWithApy?.APY}
          className={classes.header}
        />
        <div className={classes.row}>
          <Plate variant="dotted" className={classes.card}>
            <StackingLockForm
              account={account}
              tokenKey={params.tokenId}
              tokenName={queryParams.get('tokenName')}
              onSubmit={update}
              balanceOfToken={balanceOfToken}
            />
          </Plate>
          <Plate
            variant="dotted"
            className={clsx(classes.card, classes.cardFlex)}
          >
            <div className={classes.stackingBalance}>
              <div>
                <Typography variant="body1" align="center">
                  You stacked {queryParams.get('tokenName')}
                </Typography>
                <Typography variant="h2" align="center">
                  {stackingBalancesWithApy?.amount}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.usd}
                >
                  {amountInUSDC} USD
                </Typography>
              </div>
              <div>
                <Typography variant="body1" align="center">
                  You earned {queryParams.get('tokenName')}
                </Typography>
                <Typography variant="h2" align="center">
                  {stackingBalancesWithApy?.reward}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.usd}
                >
                  {rewardInUSDC} USD
                </Typography>
              </div>
            </div>
            <div className={classes.unstackeAndClaim}>
              <Button onClick={handleUnstake} className={classes.unlock}>
                Unstake
              </Button>
              <Button onClick={handleClaim} className={classes.unlock}>
                Claim
              </Button>
            </div>
          </Plate>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
