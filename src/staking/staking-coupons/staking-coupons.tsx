import { useWeb3React } from '@web3-react/core';
import { useAsyncFn, useAsyncRetry } from 'react-use';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { MainLayout } from 'src/layouts';
import {
  bignumberUtils,
  dateUtils,
  estimateGas,
  humanizeNumeral,
  PageWrapper,
  Plate,
  Typography,
  useModal,
  useYieldEscrow
} from 'src/common';
import { WalletButtonWithFallback } from 'src/wallets';
import {
  StakingCouponsAttentionModal,
  StakingCouponsDeligateModal,
  StakingCouponsDescriptionModal,
  StakingHeader,
  StakingCouponsConvertModal,
  StakingCouponsLockModal,
  StakingCouponsFinishModal,
  useStakingCoupons
} from '../common';
import { StakingCouponsStakeForm } from '../staking-coupons-stake-form';
import { useStakingCouponsStyles } from './staking-coupons.styles';

export type StakingCouponsProps = unknown;

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

export const StakingCoupons: React.VFC<StakingCouponsProps> = () => {
  const classes = useStakingCouponsStyles();
  const params = useParams<{ couponId: string }>();

  const { account = null } = useWeb3React();

  const [openAttention] = useModal(StakingCouponsAttentionModal);
  const [openDescription] = useModal(StakingCouponsDescriptionModal);
  const [openDeligate] = useModal(StakingCouponsDeligateModal);
  const [openConvert] = useModal(StakingCouponsConvertModal);
  const [openLock] = useModal(StakingCouponsLockModal);
  const [openFinish] = useModal(StakingCouponsFinishModal);

  const yieldEscrowContract = useYieldEscrow();

  const balance = useAsyncRetry(async () => {
    if (!yieldEscrowContract || !account) return;

    const balanceOf = await yieldEscrowContract.methods
      .balanceOf(account)
      .call();
    const decimals = await yieldEscrowContract.methods.decimals().call();

    return bignumberUtils.fromCall(balanceOf, decimals);
  }, [account, yieldEscrowContract]);

  const [stakeState, handleStake] = useAsyncFn(
    async (amount, fn) => {
      if (!yieldEscrowContract || !account) return;

      try {
        await openAttention();

        await openDescription({
          month: params.couponId,
          amount
        });

        const voteDelegator = await yieldEscrowContract.methods
          .voteDelegatorOf(account)
          .call();

        const notDelegated = voteDelegator === DEFAULT_ADDRESS;

        const continueWithoutDeploy = notDelegated
          ? await openDeligate({ steps: 3 })
          : true;

        if (!continueWithoutDeploy) {
          const createVoteDelegator =
            yieldEscrowContract.methods.createVoteDelegator();

          await createVoteDelegator.send({
            from: account,
            gas: await estimateGas(createVoteDelegator, {
              from: account
            })
          });
        }

        await openConvert({ amount, steps: notDelegated ? 3 : 2 });

        await openLock();

        await openFinish();

        fn();
      } catch (error) {
        console.error(error);
      }
    },
    [yieldEscrowContract, account]
  );

  const { stakingCoupons, governanceInUSDC } = useStakingCoupons();

  const stakingCoupon = useMemo(
    () =>
      stakingCoupons.value?.find(
        ({ lockPeriod }) => lockPeriod === params.couponId
      ),
    [params, stakingCoupons.value]
  );

  const loading = !stakingCoupon;

  return (
    <MainLayout>
      <PageWrapper className={classes.root}>
        <StakingHeader
          title={`${params.couponId} Month Lock`}
          loading={loading}
          depositToken={stakingCoupon?.stakingToken?.symbol}
          earnToken={stakingCoupon?.rewardToken?.symbol}
          totalValueLocked={stakingCoupon?.totalSupplyFloat}
          poolRate={stakingCoupon?.poolRate.dailyFloat}
          className={classes.header}
        />
        <Plate className={classes.col}>
          <StakingCouponsStakeForm
            loading={loading}
            onSubmit={handleStake}
            stakingToken={stakingCoupon?.stakingToken?.symbol}
            balance={balance.value}
          />
        </Plate>
        <Plate className={clsx(classes.col, classes.unstakeClaim)}>
          <div className={classes.unstakeCol}>
            <Typography>
              Staked {loading ? '...' : stakingCoupon?.stakingToken?.symbol}
            </Typography>
            <Typography variant="h3" className={classes.sum}>
              {humanizeNumeral(stakingCoupon?.userList[0].balanceFloat)}
            </Typography>
            <Typography className={classes.subSum}>
              $
              {humanizeNumeral(
                bignumberUtils.mul(
                  stakingCoupon?.userList[0].balanceFloat,
                  governanceInUSDC
                )
              )}{' '}
              (
              {humanizeNumeral(
                bignumberUtils.toPercent(
                  bignumberUtils.div(
                    stakingCoupon?.userList[0].balanceFloat,
                    stakingCoupon?.totalSupplyFloat
                  )
                )
              )}
              % Pool share)
            </Typography>
            {stakingCoupon?.userList[0]?.nextUnlock && (
              <Typography className={classes.unstakingDate}>
                Unstaking at{' '}
                {dateUtils.format(
                  stakingCoupon?.userList[0]?.nextUnlockDate ?? undefined,
                  'MMMM DD'
                )}
              </Typography>
            )}
            <WalletButtonWithFallback>Unstake</WalletButtonWithFallback>
          </div>
          <div className={classes.unstakeCol}>
            <Typography>
              Earned {loading ? '...' : stakingCoupon?.rewardToken?.symbol}
            </Typography>
            <Typography variant="h3" className={classes.sum}>
              {humanizeNumeral(stakingCoupon?.userList[0].earnedFloat)}
            </Typography>
            <Typography className={classes.subSum}>Claimable ...</Typography>
            <WalletButtonWithFallback>Claim</WalletButtonWithFallback>
          </div>
        </Plate>
      </PageWrapper>
    </MainLayout>
  );
};
