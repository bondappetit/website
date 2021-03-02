import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import { useToggle, useAsyncFn, useAsyncRetry } from 'react-use';

import { MainLayout } from 'src/layouts';
import {
  Button,
  Plate,
  Typography,
  PageWrapper,
  useBalance,
  Head,
  BN,
  humanizeNumeral
} from 'src/common';
import {
  StakingHeader,
  useStakingApy,
  useStakingBalances,
  useStakingUnlock,
  useStakingUnstakingBlock
} from 'src/staking/common';
import { useStakingConfig } from 'src/staking-config';
import { StakingLockForm } from '../staking-lock-form';
import { useStakingDetailStyles } from './staking-detail.styles';

export const StakingDetail: React.FC = () => {
  const classes = useStakingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const { account } = useWeb3React<Web3>();
  const [canUnstake, toggleCanUnstake] = useToggle(false);

  const stakingConfig = useStakingConfig();

  const currentStakingToken = stakingConfig[params.tokenId];

  const [stakingBalances, update] = useStakingBalances(
    [currentStakingToken].filter(Boolean)
  );
  const [stakingBalancesWithApy] = useStakingApy(stakingBalances);

  const getBalance = useBalance();

  const unlock = useStakingUnlock(stakingBalancesWithApy?.stakingContract);

  const stake = useStakingUnstakingBlock(
    stakingBalancesWithApy?.stakingContract
  );

  const unstake = useStakingUnstakingBlock(
    stakingBalancesWithApy?.stakingContract,
    false
  );

  const stakingBalanceIsEmpty = useMemo(
    () => !Number(stakingBalancesWithApy?.amount),
    [stakingBalancesWithApy]
  );

  const [unstakeState, handleUnstake] = useAsyncFn(async () => {
    if (stakingBalanceIsEmpty) return;

    if (unstake.value?.can && stakingBalancesWithApy?.lockable) {
      toggleCanUnstake(true);
    } else {
      toggleCanUnstake(false);
    }

    await unlock();

    update();
  }, [unlock, update, stakingBalanceIsEmpty, unstake.value, toggleCanUnstake]);

  const [claimState, handleClaim] = useAsyncFn(async () => {
    if (stakingBalanceIsEmpty) return;

    await unlock(false);

    update();
  }, [unlock, update, stakingBalanceIsEmpty]);

  const balanceOfToken = useAsyncRetry(async () => {
    if (!stakingBalancesWithApy) return;

    const balanceOfTokenResult = await getBalance({
      tokenAddress: stakingBalancesWithApy.address
    });

    const balance = balanceOfTokenResult.div(
      new BN(10).pow(stakingBalancesWithApy.decimals)
    );

    return balance.isNaN() ? '0' : balance.toString(10);
  }, [getBalance, stakingBalancesWithApy, stakingBalances]);

  const { tokenName } = currentStakingToken ?? {};

  const poolShare = new BN(stakingBalancesWithApy?.amount ?? '0')
    .div(stakingBalancesWithApy?.totalSupply)
    .multipliedBy(100);

  return (
    <>
      <Head title={`Staking ${tokenName}`} />
      <MainLayout>
        <PageWrapper className={classes.staking}>
          <StakingHeader
            lockable={stakingBalancesWithApy?.lockable}
            tokenKey={params.tokenId}
            token={stakingBalancesWithApy?.token}
            APY={stakingBalancesWithApy?.APY}
            totalSupply={stakingBalancesWithApy?.totalSupplyUSDC}
            className={classes.header}
            poolRate={stakingBalancesWithApy?.poolRate}
          />
          <div className={classes.row}>
            <Plate className={classes.card}>
              <StakingLockForm
                account={account}
                token={stakingBalancesWithApy?.token}
                tokenName={tokenName}
                tokenKey={params.tokenId}
                canStake={stake.value?.can ?? false}
                stakeDate={stake.value?.date ?? ''}
                stakeBlockNumber={stake.value?.blockNumber ?? ''}
                tokenAddress={stakingBalancesWithApy?.address}
                stakingContract={stakingBalancesWithApy?.stakingContract}
                tokenDecimals={stakingBalancesWithApy?.decimals}
                onSubmit={update}
                balanceOfToken={balanceOfToken.value ?? ''}
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
                    {humanizeNumeral(stakingBalancesWithApy?.amount)}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className={classes.usd}
                  >
                    {humanizeNumeral(poolShare)}% Pool share
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className={clsx(classes.usd, classes.marginBottom)}
                  >
                    ${humanizeNumeral(stakingBalancesWithApy?.amountInUSDC)}
                  </Typography>
                  <Tippy
                    visible={canUnstake}
                    content="Unstaking not started"
                    maxWidth={200}
                    offset={[0, 25]}
                    className={classes.tooltip}
                    animation={false}
                  >
                    <Button
                      onClick={handleUnstake}
                      className={classes.unlock}
                      loading={unstakeState.loading}
                      disabled={unstakeState.loading}
                    >
                      Unstake
                    </Button>
                  </Tippy>
                  {unstake.value?.can && stakingBalancesWithApy.lockable && (
                    <Typography
                      variant="body2"
                      align="center"
                      className={classes.attention}
                    >
                      Unstaking will start at {unstake.value?.date}
                      <br /> after {unstake.value?.blockNumber} block
                    </Typography>
                  )}
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
                    {humanizeNumeral(stakingBalancesWithApy?.reward)}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className={clsx(classes.usd, classes.marginBottom2)}
                  >
                    ${humanizeNumeral(stakingBalancesWithApy?.rewardInUSDC)}
                  </Typography>
                  <Button
                    onClick={handleClaim}
                    className={classes.unlock}
                    loading={claimState.loading}
                    disabled={claimState.loading}
                  >
                    Claim
                  </Button>
                  <Typography
                    variant="body2"
                    align="center"
                    className={classes.attention}
                  >
                    Claim your rewards anytime
                  </Typography>
                </div>
              </div>
            </Plate>
          </div>
        </PageWrapper>
      </MainLayout>
    </>
  );
};
