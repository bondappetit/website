import { useWeb3React } from '@web3-react/core';
import { useAsyncFn, useAsyncRetry, useUpdateEffect } from 'react-use';
import type { AbiItem } from 'web3-utils';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import VoteDelegatorAbi from '@bondappetit/networks/abi/VoteDelegator.json';

import { MainLayout } from 'src/layouts';
import {
  bignumberUtils,
  dateUtils,
  estimateGas,
  humanizeNumeral,
  PageWrapper,
  Plate,
  Typography,
  useGovernanceContract,
  useModal,
  useApprove,
  approveAll,
  reset,
  useYieldEscrow,
  useDynamicContract,
  useGovernanceTokenContract,
  useIntervalIfHasAccount
} from 'src/common';
import type { ProfitDistributor } from 'src/generate/ProfitDistributor';
import type { VoteDelegator } from 'src/generate/VoteDelegator';
import { WalletButtonWithFallback } from 'src/wallets';
import {
  StakingCouponsAttentionModal,
  StakingCouponsDeligateModal,
  StakingCouponsDescriptionModal,
  StakingHeader,
  StakingCouponsConvertModal,
  StakingCouponsLockModal,
  StakingCouponsFinishModal,
  useStakingCoupons,
  StakingCouponsUnstakingAttentionModal,
  StakingCouponsUnstakingDescriptionModal,
  StakingCouponsUnstakingUnlockModal,
  StakingCouponsUnstakingConvertModal,
  StakingCouponsUnstakingFinishModal
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

  const [openUnstakeAttention] = useModal(
    StakingCouponsUnstakingAttentionModal
  );
  const [openUnstakingDescription] = useModal(
    StakingCouponsUnstakingDescriptionModal
  );
  const [openUnstakingUnlock] = useModal(StakingCouponsUnstakingUnlockModal);
  const [openUnstakingConvert] = useModal(StakingCouponsUnstakingConvertModal);
  const [openUnstakingFinish] = useModal(StakingCouponsUnstakingFinishModal);

  const [, approvalNeeded] = useApprove();

  const yieldEscrowContract = useYieldEscrow();
  const governanceContract = useGovernanceContract();
  const getVoteDelegator = useDynamicContract<VoteDelegator>({
    abi: VoteDelegatorAbi.abi as AbiItem[]
  });
  const governanceTokenContract = useGovernanceTokenContract();
  const getProfitDistributor = useDynamicContract<ProfitDistributor>();

  const balance = useAsyncRetry(async () => {
    if (!yieldEscrowContract || !account) return;

    const balanceOf = await yieldEscrowContract.methods
      .balanceOf(account)
      .call();
    const decimals = await yieldEscrowContract.methods.decimals().call();

    return bignumberUtils.fromCall(balanceOf, decimals);
  }, [account, yieldEscrowContract]);

  const { stakingCoupons, governanceInUSDC } = useStakingCoupons();

  const stakingCoupon = useMemo(
    () =>
      stakingCoupons.value?.find(
        ({ lockPeriod }) => lockPeriod === params.couponId
      ),
    [params, stakingCoupons.value]
  );

  const unstakingAt = dateUtils.add(new Date(), Number(params.couponId));

  const [stakeState, handleStake] = useAsyncFn(
    async (amount, fn) => {
      if (
        !yieldEscrowContract ||
        !account ||
        !stakingCoupon?.contract ||
        !governanceContract ||
        !governanceTokenContract
      )
        return;

      const voteDelegatorOf = await yieldEscrowContract.methods
        .voteDelegatorOf(account)
        .call();

      const notDelegated = voteDelegatorOf === DEFAULT_ADDRESS;

      await openDescription({
        month: params.couponId,
        amount,
        howToStake: !notDelegated
      });

      await openAttention();

      const yieldEscrowdecimals = await yieldEscrowContract.methods
        .decimals()
        .call();

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

      const yBAG = bignumberUtils.fromCall(
        await yieldEscrowContract.methods.balanceOf(account).call(),
        yieldEscrowdecimals
      );

      const amountBiggerThanYBAG = bignumberUtils.gt(amount, yBAG);

      const newAmount = amountBiggerThanYBAG
        ? bignumberUtils.minus(amount, yBAG)
        : amount;

      const rawAmount = bignumberUtils.toSend(newAmount, yieldEscrowdecimals);

      if (!bignumberUtils.lte(amount, yBAG)) {
        await openConvert({ amount, steps: notDelegated ? 3 : 2 });

        const contract = !notDelegated
          ? getVoteDelegator(voteDelegatorOf)
          : yieldEscrowContract;

        const depositOptions = {
          token: governanceTokenContract,
          owner: account,
          spender: contract.options.address,
          amount: rawAmount
        };

        const depositApproved = await approvalNeeded(depositOptions);

        if (depositApproved.reset) {
          await reset(depositOptions);
        }
        if (depositApproved.approve) {
          await approveAll(depositOptions);
          await approvalNeeded(depositOptions);
        }

        const deposit = contract.methods.deposit(rawAmount);

        await deposit.send({
          from: account,
          gas: await estimateGas(deposit, { from: account })
        });
      }

      const profitDistributorContract = getProfitDistributor(
        stakingCoupon.contract.address,
        stakingCoupon.contract.abi
      );

      await openLock({
        amount: newAmount,
        steps: notDelegated ? 3 : 2,
        month: params.couponId,
        unstakingAt
      });

      const stake = profitDistributorContract.methods.stake(rawAmount);

      const stakeOptions = {
        token: yieldEscrowContract,
        owner: account,
        spender: profitDistributorContract.options.address,
        amount: rawAmount
      };

      const stakeApproved = await approvalNeeded(stakeOptions);

      if (stakeApproved.reset) {
        await reset(stakeOptions);
      }
      if (stakeApproved.approve) {
        await approveAll(stakeOptions);

        await approvalNeeded(stakeOptions);
      }

      await stake.send({
        from: account,
        gas: await estimateGas(stake, { from: account })
      });

      await openFinish({
        amount: newAmount,
        unstakingAt
      });

      fn();
    },
    [
      yieldEscrowContract,
      account,
      stakingCoupon,
      governanceContract,
      governanceTokenContract,
      getProfitDistributor
    ]
  );

  const loading = !stakingCoupon;

  useIntervalIfHasAccount(stakingCoupons.retry);

  const [unstakingState, handleUnstake] = useAsyncFn(async () => {
    const amount = stakingCoupon?.rewardToken?.totalSupplyFloat ?? '0';

    if (
      !yieldEscrowContract ||
      !account ||
      !stakingCoupon?.contract ||
      !governanceContract ||
      !governanceTokenContract
    )
      return;

    const voteDelegatorOf = await yieldEscrowContract.methods
      .voteDelegatorOf(account)
      .call();

    const notDelegated = voteDelegatorOf === DEFAULT_ADDRESS;

    const profitDistributorContract = getProfitDistributor(
      stakingCoupon.contract.address,
      stakingCoupon.contract.abi
    );

    const contract = !notDelegated
      ? getVoteDelegator(voteDelegatorOf)
      : yieldEscrowContract;

    await openUnstakeAttention({
      unstakingAt:
        stakingCoupon.userList?.[0]?.stakeAtDate ?? new Date().toISOString(),
      amount
    });
    await openUnstakingDescription({
      amount
    });

    await openUnstakingUnlock({
      amount
    });

    const exit = profitDistributorContract.methods.exit();

    await exit.send({
      from: account,
      gas: await estimateGas(exit, { from: account })
    });

    await openUnstakingConvert({
      amount
    });

    const decimals = await yieldEscrowContract.methods.decimals().call();

    const withdraw = contract.methods.withdraw(
      bignumberUtils.toSend(amount, decimals)
    );

    await withdraw.send({
      from: account,
      gas: await estimateGas(withdraw, { from: account })
    });

    await openUnstakingFinish({
      amount
    });
  }, [
    yieldEscrowContract,
    account,
    stakingCoupon,
    governanceContract,
    governanceTokenContract,
    getProfitDistributor,
    getVoteDelegator
  ]);

  const [claimState, handleClaim] = useAsyncFn(async () => {
    if (!account || !stakingCoupon?.contract) return;

    const profitDistributorContract = getProfitDistributor(
      stakingCoupon.contract.address,
      stakingCoupon.contract.abi
    );

    const getReward = profitDistributorContract.methods.getReward();

    await getReward.send({
      from: account,
      gas: await estimateGas(getReward, { from: account })
    });
  }, [getProfitDistributor]);

  useUpdateEffect(() => {
    if (stakeState.loading || claimState.loading || unstakingState.loading)
      return;

    stakingCoupons.retry();
  }, [stakeState.loading, claimState.loading, unstakingState.loading]);

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
            {stakingCoupon?.userList[0]?.nextUnlockDate && (
              <Typography className={classes.unstakingDate}>
                Unstaking at{' '}
                {dateUtils.format(
                  stakingCoupon?.userList[0]?.nextUnlockDate,
                  'MMMM DD'
                )}
              </Typography>
            )}
            <WalletButtonWithFallback
              onClick={handleUnstake}
              loading={unstakingState.loading}
              disabled={bignumberUtils.eq(
                stakingCoupon?.userList[0].balanceFloat,
                0
              )}
            >
              Unstake
            </WalletButtonWithFallback>
          </div>
          <div className={classes.unstakeCol}>
            <Typography>
              Earned {loading ? '...' : stakingCoupon?.rewardToken?.symbol}
            </Typography>
            <Typography variant="h3" className={classes.sum}>
              {humanizeNumeral(stakingCoupon?.userList[0].earnedFloat)}
            </Typography>
            <Typography className={classes.subSum}>
              Claimable{' '}
              {humanizeNumeral(stakingCoupon?.userList[0].penaltyFloat)}
            </Typography>
            <WalletButtonWithFallback
              loading={claimState.loading}
              onClick={handleClaim}
              disabled={bignumberUtils.eq(
                stakingCoupon?.userList[0].earnedFloat,
                0
              )}
            >
              Claim
            </WalletButtonWithFallback>
          </div>
        </Plate>
      </PageWrapper>
    </MainLayout>
  );
};
