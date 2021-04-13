import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import { useToggle, useAsyncFn, useAsyncRetry } from 'react-use';

import { MainLayout } from 'src/layouts';
import {
  Plate,
  Typography,
  PageWrapper,
  useBalance,
  Head,
  BN,
  humanizeNumeral,
  Skeleton
} from 'src/common';
import {
  StakingHeader,
  useStakingTokens,
  useStakingUnlock,
  useCanUnStaking,
  useStakingListData
} from 'src/staking/common';
import { useStakingConfig } from 'src/staking-config';
import { WalletButtonWithFallback } from 'src/wallets';
import { StakingLockForm } from '../staking-lock-form';
import { useStakingDetailStyles } from './staking-detail.styles';

export const StakingDetail: React.FC = () => {
  const classes = useStakingDetailStyles();
  const params = useParams<{ tokenId: string }>();
  const { account } = useWeb3React<Web3>();
  const [canUnstake, toggleCanUnstake] = useToggle(false);

  const { stakingConfig } = useStakingConfig();

  const currentStakingToken = stakingConfig[params.tokenId];

  const { stakingList, rewardSum, volume24 } = useStakingListData(
    params.tokenId
  );

  const stakingBalances = useStakingTokens(
    [currentStakingToken].filter(Boolean)
  );

  const stakingBalancesWithApy = useMemo(() => {
    return stakingBalances.value?.[0];
  }, [stakingBalances.value]);

  const stakingItem = useMemo(() => stakingList?.[0], [stakingList]);

  const getBalance = useBalance();

  const unlock = useStakingUnlock(stakingBalancesWithApy?.stakingContract);

  const unstake = useCanUnStaking(stakingBalancesWithApy?.stakingContract);

  const stakingBalanceIsEmpty = useMemo(
    () => !Number(stakingBalancesWithApy?.amount),
    [stakingBalancesWithApy]
  );

  const [unstakeState, handleUnstake] = useAsyncFn(async () => {
    if (stakingBalanceIsEmpty) return;

    if (!unstake.value?.can && stakingBalancesWithApy?.lockable) {
      toggleCanUnstake(true);

      return;
    }
    toggleCanUnstake(false);

    await unlock();

    stakingBalances.retry();
  }, [
    unlock,
    stakingBalances.retry,
    stakingBalanceIsEmpty,
    unstake.value,
    toggleCanUnstake
  ]);

  const [claimState, handleClaim] = useAsyncFn(async () => {
    if (stakingBalanceIsEmpty) return;

    await unlock(false);

    stakingBalances.retry();
  }, [unlock, stakingBalances.retry, stakingBalanceIsEmpty]);

  const balanceOfToken = useAsyncRetry(async () => {
    if (!stakingBalancesWithApy) return;

    const balanceOfTokenResult = await getBalance({
      tokenAddress: stakingBalancesWithApy.address
    });

    const balance = balanceOfTokenResult.div(
      new BN(10).pow(stakingBalancesWithApy.decimals)
    );

    return balance.isNaN() ? new BN(0) : balance;
  }, [getBalance, stakingBalancesWithApy]);

  const { tokenName } = currentStakingToken ?? {};

  const poolShare = new BN(stakingBalancesWithApy?.amount ?? '0')
    .div(stakingBalancesWithApy?.totalSupply ?? '1')
    .multipliedBy(100);

  const loading =
    !stakingBalances.value || !stakingBalancesWithApy || !unstake.value;

  const depositToken = useMemo(() => stakingBalancesWithApy?.token?.join('_'), [
    stakingBalancesWithApy
  ]);

  const showUnstakeButton =
    unstake.value?.unstakingStartBlock.eq(0) ||
    unstake.value?.currentBlockNumber.isGreaterThan(
      unstake.value?.unstakingStartBlock
    );

  return (
    <>
      <Head title={`Staking ${tokenName}`} />
      <MainLayout>
        <PageWrapper className={classes.staking}>
          <StakingHeader
            depositToken={depositToken}
            lockable={stakingItem?.lockable}
            tokenKey={params.tokenId}
            token={stakingItem?.token}
            APY={stakingItem?.apy}
            totalSupply={stakingItem?.totalSupply}
            className={classes.header}
            poolRate={stakingItem?.poolRate}
            volumeUSD={volume24}
            loading={loading}
          />
          <div className={classes.row}>
            <Plate className={classes.card}>
              <StakingLockForm
                account={account}
                token={stakingItem?.token}
                tokenName={tokenName}
                tokenKey={params.tokenId}
                tokenAddress={stakingItem?.address}
                stakingContract={stakingItem?.stakingContract}
                tokenDecimals={stakingBalancesWithApy?.decimals}
                unstakeStart={unstake.value?.date}
                unstakingStartBlock={unstake.value?.unstakingStartBlock}
                lockable={stakingItem?.lockable}
                onSubmit={stakingBalances.retry}
                balanceOfToken={balanceOfToken.value ?? new BN(0)}
                loading={loading}
                depositToken={depositToken}
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
                    You staked {loading ? '...' : tokenName}
                  </Typography>
                  <Typography variant="h2" align="center">
                    {stakingBalancesWithApy?.amount.isNaN() ||
                    !stakingBalancesWithApy?.amount.isFinite()
                      ? '0'
                      : stakingBalancesWithApy?.amount.toString(10)}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className={classes.usd}
                  >
                    {loading ? (
                      '...'
                    ) : (
                      <>{humanizeNumeral(poolShare)}% Pool share</>
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className={clsx(classes.usd, classes.marginBottom)}
                  >
                    {loading ? (
                      '...'
                    ) : (
                      <>
                        ${humanizeNumeral(stakingBalancesWithApy?.amountInUSDC)}
                      </>
                    )}
                  </Typography>
                  {loading && <Skeleton className={classes.attention} />}
                  {!loading && !showUnstakeButton && account && (
                    <Typography
                      variant="body2"
                      align="center"
                      className={classes.attention}
                    >
                      Unstaking will start at {unstake.value?.date}
                      <br /> after{' '}
                      {unstake.value?.unstakingStartBlock.toString(10)} block
                    </Typography>
                  )}
                  {!loading && showUnstakeButton && account && (
                    <Tippy
                      visible={canUnstake}
                      content="Unstaking not started"
                      maxWidth={200}
                      offset={[0, 25]}
                      className={classes.tooltip}
                      animation={false}
                    >
                      <WalletButtonWithFallback
                        onClick={handleUnstake}
                        className={classes.unlock}
                        loading={unstakeState.loading}
                        disabled={unstakeState.loading}
                      >
                        Unstake
                      </WalletButtonWithFallback>
                    </Tippy>
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
                    {loading ? '...' : humanizeNumeral(rewardSum?.reward)}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    className={clsx(classes.usd, classes.marginBottom2)}
                  >
                    {loading ? (
                      '...'
                    ) : (
                      <>${humanizeNumeral(rewardSum?.rewardInUSDC)}</>
                    )}
                  </Typography>
                  {loading ? (
                    <Skeleton className={classes.attention} />
                  ) : (
                    account && (
                      <WalletButtonWithFallback
                        onClick={handleClaim}
                        className={classes.unlock}
                        loading={claimState.loading}
                        disabled={claimState.loading}
                      >
                        Claim
                      </WalletButtonWithFallback>
                    )
                  )}
                </div>
              </div>
            </Plate>
          </div>
        </PageWrapper>
      </MainLayout>
    </>
  );
};
