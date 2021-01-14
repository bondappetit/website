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
  StakingHeader,
  useStakingApy,
  useStakingBalances,
  useStakingUnlock
} from 'src/staking/common';
import { StakingLockForm } from '../staking-lock-form';
import { useStakingDetailStyles } from './staking-detail.styles';

export const StakingDetail: React.FC = () => {
  const classes = useStakingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const networkConfig = useNetworkConfig();
  const { account } = useWeb3React<Web3>();
  const [stakingBalances, update] = useStakingBalances([params.tokenId]);
  const [stakingBalancesWithApy] = useStakingApy(stakingBalances);
  const queryParams = useQueryParams();
  const [balanceOfToken, setbalanceOfToken] = useState('');

  const getBalance = useBalance();

  const unlock = useStakingUnlock(params.tokenId);

  const stakingBalanceIsEmpty = useMemo(
    () => !Number(stakingBalancesWithApy?.amount),
    [stakingBalancesWithApy]
  );

  const handleUnstake = useCallback(() => {
    if (stakingBalanceIsEmpty) return;

    unlock().then(update);
  }, [unlock, update, stakingBalanceIsEmpty]);

  const handleClaim = useCallback(() => {
    if (stakingBalanceIsEmpty) return;

    unlock(false).then(update);
  }, [unlock, update, stakingBalanceIsEmpty]);

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
  }, [handleGetBalanceOfToken, stakingBalances]);

  return (
    <MainLayout>
      <PageWrapper className={classes.staking}>
        <StakingHeader
          tokenKey={params.tokenId}
          tokenName={queryParams.get('tokenName')}
          APY={stakingBalancesWithApy?.APY}
          className={classes.header}
        />
        <div className={classes.row}>
          <Plate variant="dotted" className={classes.card}>
            <StakingLockForm
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
            <div className={classes.stakingBalance}>
              <div className={classes.unstakeAndClaim}>
                <Typography variant="body1" align="center">
                  You staked {queryParams.get('tokenName')}
                </Typography>
                <Typography variant="h2" align="center">
                  {stakingBalancesWithApy?.amount}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.usd}
                >
                  {stakingBalancesWithApy?.amountInUSDC ?? '0'} USD
                </Typography>
                <Button onClick={handleUnstake} className={classes.unlock}>
                  Unstake
                </Button>
              </div>
              <div className={classes.unstakeAndClaim}>
                <Typography variant="body1" align="center">
                  You earned BAG
                </Typography>
                <Typography variant="h2" align="center">
                  {stakingBalancesWithApy?.reward}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.usd}
                >
                  {stakingBalancesWithApy?.rewardInUSDC ?? '0'} USD
                </Typography>
                <Button onClick={handleClaim} className={classes.unlock}>
                  Claim
                </Button>
              </div>
            </div>
          </Plate>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};
