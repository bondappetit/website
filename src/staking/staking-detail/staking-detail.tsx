import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import BN from 'bignumber.js';

import { MainLayout } from 'src/layouts';
import {
  Button,
  Plate,
  Typography,
  PageWrapper,
  useBalance,
  Head
} from 'src/common';
import {
  StakingHeader,
  useStakingApy,
  useStakingBalances,
  useStakingUnlock
} from 'src/staking/common';
import { STAKING_CONFIG } from 'src/staking-config';
import { StakingLockForm } from '../staking-lock-form';
import { useStakingDetailStyles } from './staking-detail.styles';

export const StakingDetail: React.FC = () => {
  const classes = useStakingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const { account } = useWeb3React<Web3>();
  const tokenId = Number(params.tokenId);

  const [stakingBalances, update] = useStakingBalances([
    STAKING_CONFIG[tokenId]
  ]);
  const [stakingBalancesWithApy] = useStakingApy(stakingBalances);
  const [balanceOfToken, setbalanceOfToken] = useState('');

  const getBalance = useBalance();

  const unlock = useStakingUnlock(stakingBalancesWithApy?.contractName);

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
    if (!stakingBalancesWithApy) return;

    const balanceOfTokenResult = await getBalance({
      tokenAddress: stakingBalancesWithApy.address
    });

    const balance = balanceOfTokenResult.div(
      new BN(10).pow(stakingBalancesWithApy.decimals)
    );

    setbalanceOfToken(balance.isNaN() ? '0' : balance.toString(10));
  }, [getBalance, stakingBalancesWithApy]);

  useEffect(() => {
    handleGetBalanceOfToken();
  }, [handleGetBalanceOfToken, stakingBalances]);

  const { tokenName } = STAKING_CONFIG[tokenId];

  return (
    <>
      <Head title={`Staking ${tokenName}`} />
      <MainLayout>
        <PageWrapper className={classes.staking}>
          <StakingHeader
            tokenKey={params.tokenId}
            token={stakingBalancesWithApy?.token}
            APY={stakingBalancesWithApy?.APY}
            className={classes.header}
          />
          <div className={classes.row}>
            <Plate className={classes.card}>
              <StakingLockForm
                account={account}
                tokenName={tokenName}
                tokenKey={params.tokenId}
                tokenAddress={stakingBalancesWithApy?.address}
                contractName={stakingBalancesWithApy?.contractName}
                tokenDecimals={stakingBalancesWithApy?.decimals}
                onSubmit={update}
                balanceOfToken={balanceOfToken}
              />
            </Plate>
            <Plate className={clsx(classes.card, classes.cardFlex)}>
              <div className={classes.stakingBalance}>
                <div className={classes.unstakeAndClaim}>
                  <Typography
                    variant="body1"
                    align="center"
                    className={classes.cardTitle}
                  >
                    You staked {tokenName}
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
                  <Typography
                    variant="body1"
                    align="center"
                    className={classes.cardTitle}
                  >
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
    </>
  );
};
