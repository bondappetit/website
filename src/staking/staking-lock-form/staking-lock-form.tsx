import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';
import Tippy from '@tippyjs/react';
import { useDebounce, useToggle } from 'react-use';

import type { Ierc20 } from 'src/generate/IERC20';
import {
  Input,
  useNetworkConfig,
  BN,
  useDynamicContract,
  estimateGas,
  Typography,
  ButtonBase,
  Link,
  Skeleton,
  useApprove,
  reset,
  approveAll
} from 'src/common';
import type { Staking } from 'src/generate/Staking';
import { WalletButtonWithFallback } from 'src/wallets';
import { analytics } from 'src/analytics';
import {
  StakingAcquireModal,
  StakingAttentionModal,
  useCanStaking
} from '../common';
import { useStakingLockFormStyles } from './staking-lock-form.styles';

export type StakingLockFormProps = {
  account?: string | null;
  tokenKey: string;
  tokenName?: string;
  tokenAddress?: string;
  token?: string[];
  stakingContract?: Staking;
  tokenDecimals?: string;
  onSubmit?: () => void;
  unstakeStart?: string;
  balanceOfToken: BN;
  loading: boolean;
  unstakingStartBlock?: BN;
  lockable?: boolean;
  depositToken?: string;
};

const UNISWAP_URL = 'https://app.uniswap.org/#/add/';

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const StakingLockForm: React.FC<StakingLockFormProps> = (props) => {
  const classes = useStakingLockFormStyles();

  const [aquireOpen, aquireToggle] = useToggle(false);
  const [stakingAttentionOpen, toggleStakingAttention] = useToggle(false);

  const networkConfig = useNetworkConfig();
  const staking = useCanStaking(props.stakingContract);

  const [approve, approvalNeeded] = useApprove();

  const getIERC20Contract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const { account, tokenAddress, stakingContract, tokenDecimals } = props;

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!account) {
        error.amount = 'Connect your wallet';
      }

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
      }

      if (staking.value?.cant) {
        error.amount = 'Staking ended';
      }

      if (new BN(props.balanceOfToken).isLessThan(formValues.amount)) {
        error.amount = `Looks like you don't have enough ${props.tokenName}, please check your wallet`;
      }

      return error;
    },

    onSubmit: async (formValues, { resetForm }) => {
      if (!account || !stakingContract || !tokenDecimals) return;

      analytics.send('staking_click');

      const currentAssetContract = getIERC20Contract(tokenAddress);

      const formAmount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(tokenDecimals))
        .toString(10);

      const options = {
        token: currentAssetContract,
        owner: account,
        spender: stakingContract.options.address,
        amount: formAmount
      };

      const approved = await approvalNeeded(options);

      if (approved.reset) {
        await reset(options);
      }
      if (approved.approve) {
        await approveAll(options);

        await delay(1000);

        await approvalNeeded(options);
        return;
      }

      const stake = stakingContract.methods.stake(formAmount);
      await stake.send({
        from: account,
        gas: await estimateGas(stake, { from: account })
      });
      resetForm();
      analytics.send('staking_success');
      props.onSubmit?.();
    }
  });

  const handleCloseTooltip = () => {
    formik.setFieldError('amount', '');
  };

  const tokenAddresses = useMemo(() => {
    const addresses = Object.values(networkConfig.assets)
      .filter((asset) => props.token?.includes(asset.symbol))
      .map(({ address }) => address)
      .join('/');

    return `${UNISWAP_URL}${addresses}`;
  }, [props.token, networkConfig.assets]);

  useDebounce(
    () => {
      const handler = async () => {
        if (!account || !stakingContract || !tokenDecimals) return;

        const currentAssetContract = getIERC20Contract(tokenAddress);

        const formAmount = new BN(formik.values.amount)
          .multipliedBy(new BN(10).pow(tokenDecimals))
          .toString(10);

        await approvalNeeded({
          token: currentAssetContract,
          owner: account,
          spender: stakingContract.options.address,
          amount: formAmount
        });
      };

      handler();
    },
    200,
    [
      account,
      approvalNeeded,
      formik.values.amount,
      getIERC20Contract,
      stakingContract,
      tokenAddress,
      tokenDecimals
    ]
  );

  const addLiquidity = props.balanceOfToken.isLessThanOrEqualTo(0)
    ? aquireToggle
    : undefined;

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.root} noValidate>
        <div>
          <Typography variant="body1" align="center" className={classes.title}>
            Stake your{' '}
            <Link href={tokenAddresses} target="_blank" color="blue">
              {props.loading ? '...' : props.tokenName}
            </Link>
          </Typography>
          <Tippy
            visible={Boolean(formik.errors.amount)}
            content={formik.errors.amount}
            className={classes.tooltip}
            maxWidth={200}
            offset={[0, 25]}
            animation={false}
            onClickOutside={handleCloseTooltip}
          >
            <div>
              <Input
                type="number"
                value={formik.values.amount}
                name="amount"
                placeholder="0"
                disabled={formik.isSubmitting}
                key={approve.value?.allowance.toString(10)}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.amount)}
                className={classes.input}
              />
            </div>
          </Tippy>
          <Typography
            variant="body1"
            align="center"
            className={classes.max}
            component="div"
          >
            <ButtonBase
              className={classes.link}
              type="button"
              disabled={formik.isSubmitting}
              key={approve.value?.allowance.toString(10)}
              onClick={() =>
                formik.setFieldValue(
                  'amount',
                  props.balanceOfToken.toString(10)
                )
              }
            >
              {props.loading ? '...' : props.balanceOfToken.toString(10)} max
            </ButtonBase>
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.uniswapLink}
          >
            How to{' '}
            <ButtonBase
              type="button"
              color="blue"
              onClick={aquireToggle}
              className={classes.link}
            >
              acquire
            </ButtonBase>
          </Typography>
        </div>
        {props.loading ? (
          <Skeleton className={classes.skeleton} />
        ) : (
          <>
            {props.unstakingStartBlock?.isGreaterThan(0) && (
              <WalletButtonWithFallback
                type="button"
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                key={approve.value?.allowance.toString(10)}
                onClick={
                  new BN(formik.values.amount || '0').isGreaterThan(0) &&
                  props.balanceOfToken.isGreaterThan(0)
                    ? toggleStakingAttention
                    : addLiquidity
                }
              >
                {props.balanceOfToken.isGreaterThan(0) ? (
                  <>
                    {(!approve.value?.approve && !approve.value?.reset) ||
                    new BN(formik.values.amount || '0').isLessThanOrEqualTo(0)
                      ? 'Stake'
                      : 'Approve'}
                  </>
                ) : (
                  'Add liquidity'
                )}
              </WalletButtonWithFallback>
            )}
            {props.unstakingStartBlock?.isLessThanOrEqualTo(0) && (
              <WalletButtonWithFallback
                type={
                  new BN(formik.values.amount || '0').isGreaterThan(0) &&
                  props.balanceOfToken.isGreaterThan(0)
                    ? 'submit'
                    : 'button'
                }
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                key={approve.value?.allowance.toString(10)}
                onClick={
                  new BN(formik.values.amount || '0').isGreaterThan(0) &&
                  props.balanceOfToken.isGreaterThan(0)
                    ? undefined
                    : addLiquidity
                }
              >
                {props.balanceOfToken.isGreaterThan(0) ? (
                  <>
                    {(!approve.value?.approve && !approve.value?.reset) ||
                    new BN(formik.values.amount || '0').isLessThanOrEqualTo(0)
                      ? 'Stake'
                      : 'Approve'}
                  </>
                ) : (
                  'Add liquidity'
                )}
              </WalletButtonWithFallback>
            )}
          </>
        )}
      </form>
      <StakingAcquireModal
        open={aquireOpen}
        onClose={aquireToggle}
        tokenName={props.tokenName}
        depositToken={props.depositToken}
        tokenAddresses={tokenAddresses}
      />
      <StakingAttentionModal
        date={props.unstakeStart}
        blockNumber={staking.value?.stakingEndBlock.toString(10) ?? ''}
        open={stakingAttentionOpen}
        onClose={toggleStakingAttention}
        onStake={() => {
          toggleStakingAttention(false);
          formik.handleSubmit();
        }}
      />
    </>
  );
};
