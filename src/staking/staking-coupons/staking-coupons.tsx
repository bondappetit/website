import { useWeb3React } from '@web3-react/core';
import {
  useAsyncFn,
  useAsyncRetry,
  useDebounce,
  useUpdateEffect
} from 'react-use';
import type { AbiItem } from 'web3-utils';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
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

  const [formAmount, setAmount] = useState('0');

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

  const [approve, approvalNeeded] = useApprove();

  const yieldEscrowContract = useYieldEscrow();
  const governanceContract = useGovernanceContract();
  const getVoteDelegator = useDynamicContract<VoteDelegator>({
    abi: VoteDelegatorAbi.abi as AbiItem[]
  });
  const governanceTokenContract = useGovernanceTokenContract();
  const getProfitDistributor = useDynamicContract<ProfitDistributor>();

  const balance = useAsyncRetry(async () => {
    if (!governanceContract || !account) return;

    const balanceOf = await governanceContract.methods
      .balanceOf(account)
      .call();
    const decimals = await governanceContract.methods.decimals().call();

    return bignumberUtils.fromCall(balanceOf, decimals);
  }, [account, governanceContract]);

  const { stakingCoupons, governanceInUSDC } = useStakingCoupons();

  const stakingCoupon = useMemo(
    () =>
      stakingCoupons.value?.find(({ address }) => address === params.couponId),
    [params, stakingCoupons.value]
  );

  const unstakingAt = stakingCoupon?.lockPeriodDate ?? new Date().toISOString();

  const [stakeState, handleStake] = useAsyncFn(
    async (amount: string, fn: () => void) => {
      if (
        !yieldEscrowContract ||
        !account ||
        !stakingCoupon?.contract ||
        !governanceContract ||
        !governanceTokenContract
      )
        return;

      let voteDelegatorOf = await yieldEscrowContract.methods
        .voteDelegatorOf(account)
        .call();

      let notDelegated = voteDelegatorOf === DEFAULT_ADDRESS;

      await openDescription({
        month: stakingCoupon.lockPeriod ?? '',
        amount,
        howToStake: !notDelegated
      });

      await openAttention();

      const yieldEscrowdecimals = await yieldEscrowContract.methods
        .decimals()
        .call();

      const onDelegate = async () => {
        const createVoteDelegator =
          yieldEscrowContract.methods.createVoteDelegator();

        await createVoteDelegator.send({
          from: account,
          gas: await estimateGas(createVoteDelegator, {
            from: account
          })
        });

        voteDelegatorOf = await yieldEscrowContract.methods
          .voteDelegatorOf(account)
          .call();

        notDelegated = voteDelegatorOf === DEFAULT_ADDRESS;
      };

      if (notDelegated) {
        await openDeligate({
          steps: 3,
          onDelegate
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

      const onConvert = async () => {
        const contract = !notDelegated
          ? getVoteDelegator(voteDelegatorOf)
          : yieldEscrowContract;

        const deposit = contract.methods.deposit(rawAmount);

        await deposit.send({
          from: account,
          gas: await estimateGas(deposit, { from: account })
        });
      };

      if (!bignumberUtils.lte(amount, yBAG)) {
        await openConvert({
          amount,
          steps: notDelegated ? 3 : 2,
          onConvert
        });
      }

      const profitDistributorContract = getProfitDistributor(
        stakingCoupon.contract.address,
        stakingCoupon.contract.abi
      );

      const onStake = async () => {
        const stake = profitDistributorContract.methods.stake(rawAmount);

        await stake.send({
          from: account,
          gas: await estimateGas(stake, { from: account })
        });
      };

      const onApprove = async () => {
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
      };

      await openLock({
        amount: newAmount,
        steps: notDelegated ? 3 : 2,
        month: stakingCoupon.lockPeriod ?? '',
        unstakingAt,
        onSubmit: onApprove,
        button: 'Approve'
      });

      await openLock({
        amount: newAmount,
        steps: notDelegated ? 3 : 2,
        month: stakingCoupon.lockPeriod ?? '',
        unstakingAt,
        onSubmit: onStake,
        button: 'Stake'
      });

      await openFinish({
        amount: newAmount,
        unstakingAt,
        delegated: !notDelegated
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

  useIntervalIfHasAccount(() => {
    stakingCoupons.retry();
    balance.retry();
  });

  const earned = stakingCoupon?.userList[0].locked
    ? bignumberUtils.div(stakingCoupon?.userList[0].earnedFloat, 2)
    : bignumberUtils.plus(
        stakingCoupon?.userList[0].earnedFloat,
        stakingCoupon?.userList[0].penaltyFloat
      );
  const locked = stakingCoupon?.userList[0].locked
    ? bignumberUtils.plus(earned, stakingCoupon?.userList[0].penaltyFloat)
    : 0;

  const [unstakingState, handleUnstake] = useAsyncFn(async () => {
    const amount = earned ?? '0';

    if (
      !yieldEscrowContract ||
      !account ||
      !stakingCoupon?.contract ||
      !governanceContract ||
      !governanceTokenContract
    )
      return;

    const decimals = await yieldEscrowContract.methods.decimals().call();

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

    const bagBalanceOf = await profitDistributorContract.methods
      .balanceOf(account)
      .call();

    const bag = bignumberUtils.fromCall(bagBalanceOf, decimals);

    await openUnstakingDescription({
      amount: bag
    });

    const onUnstake = async () => {
      const exit = profitDistributorContract.methods.exit();

      await exit.send({
        from: account,
        gas: await estimateGas(exit, {
          from: account
        })
      });
    };

    await openUnstakingUnlock({
      amount: bag,
      onUnstake
    });

    const onConvert = async () => {
      const withdraw = contract.methods.withdraw(bagBalanceOf);

      await withdraw.send({
        from: account,
        gas: await estimateGas(withdraw, { from: account })
      });
    };

    await openUnstakingConvert({
      amount: bag,
      onConvert
    });

    await openUnstakingFinish({
      amount: bag
    });
  }, [
    yieldEscrowContract,
    account,
    stakingCoupon,
    governanceContract,
    governanceTokenContract,
    getProfitDistributor,
    getVoteDelegator,
    earned
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
  }, [getProfitDistributor, stakingCoupon]);

  useUpdateEffect(() => {
    if (stakeState.loading || claimState.loading || unstakingState.loading)
      return;

    stakingCoupons.retry();
  }, [stakeState.loading, claimState.loading, unstakingState.loading]);

  const [, handleApprove] = useAsyncFn(
    async (amount: string) => {
      if (
        !stakingCoupon?.contract ||
        !account ||
        !yieldEscrowContract ||
        !governanceTokenContract
      )
        return;

      const decimals = await yieldEscrowContract.methods.decimals().call();

      const rawAmount = bignumberUtils.toSend(amount, decimals);

      const voteDelegatorOf = await yieldEscrowContract.methods
        .voteDelegatorOf(account)
        .call();

      const notDelegated = voteDelegatorOf === DEFAULT_ADDRESS;

      const voteDelegatorContract = getVoteDelegator(voteDelegatorOf);

      const contract = notDelegated
        ? yieldEscrowContract
        : voteDelegatorContract;

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
    },
    [
      stakingCoupon?.contract,
      account,
      yieldEscrowContract,
      getVoteDelegator,
      governanceTokenContract
    ]
  );

  useDebounce(
    async () => {
      if (
        !stakingCoupon?.contract ||
        !account ||
        !yieldEscrowContract ||
        !governanceTokenContract
      )
        return;

      const voteDelegatorOf = await yieldEscrowContract.methods
        .voteDelegatorOf(account)
        .call();

      const notDelegated = voteDelegatorOf === DEFAULT_ADDRESS;

      const decimals = await yieldEscrowContract.methods.decimals().call();

      const voteDelegatorContract = getVoteDelegator(voteDelegatorOf);

      const contract = notDelegated
        ? yieldEscrowContract
        : voteDelegatorContract;

      const rawAmount = bignumberUtils.toSend(formAmount, decimals);

      await approvalNeeded({
        token: governanceTokenContract,
        owner: account,
        spender: contract.options.address,
        amount: rawAmount
      });
    },
    200,
    [
      account,
      approvalNeeded,
      stakingCoupon?.contract,
      yieldEscrowContract,
      formAmount,
      governanceTokenContract,
      getVoteDelegator
    ]
  );

  return (
    <MainLayout>
      <PageWrapper className={classes.root}>
        <StakingHeader
          title={`${stakingCoupon?.lockPeriod ?? ''} Month`}
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
            onSubmit={
              !approve.value?.approve && !approve.value?.reset
                ? handleStake
                : handleApprove
            }
            stakingToken={stakingCoupon?.stakingToken?.symbol}
            balance={balance.value}
            onChange={setAmount}
            buttonTitle={
              (!approve.value?.approve && !approve.value?.reset) ||
              bignumberUtils.lte(formAmount, 0)
                ? 'Stake'
                : 'Approve'
            }
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
              disabled={
                bignumberUtils.eq(stakingCoupon?.userList[0].balanceFloat, 0) &&
                !unstakingState.loading
              }
            >
              Unstake
            </WalletButtonWithFallback>
          </div>
          <div className={classes.unstakeCol}>
            <Typography>
              Earned {loading ? '...' : stakingCoupon?.rewardToken?.symbol}
            </Typography>
            <Typography variant="h3" className={classes.sum}>
              {humanizeNumeral(earned)}
            </Typography>
            {stakingCoupon?.userList[0].locked && (
              <Typography className={classes.subSum}>
                Locked {humanizeNumeral(locked)}
              </Typography>
            )}
            <WalletButtonWithFallback
              loading={claimState.loading}
              onClick={handleClaim}
              className={classes.claim}
              disabled={
                bignumberUtils.eq(stakingCoupon?.userList[0].earnedFloat, 0) &&
                !claimState.loading
              }
            >
              Claim
            </WalletButtonWithFallback>
          </div>
        </Plate>
      </PageWrapper>
    </MainLayout>
  );
};
