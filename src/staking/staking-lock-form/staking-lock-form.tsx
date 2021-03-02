import React, { useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';
import Tippy from '@tippyjs/react';
import { useToggle } from 'react-use';

import type { Ierc20 } from 'src/generate/IERC20';
import {
  Input,
  useNetworkConfig,
  Button,
  BN,
  useDynamicContract,
  LinkIfAccount,
  estimateGas,
  autoApprove,
  Typography,
  ButtonBase
} from 'src/common';
import type { Staking } from 'src/generate/Staking';
import { StakingAcquireModal, StakingAttentionModal } from '../common';
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
  canStake: boolean;
  stakeDate: string;
  stakeBlockNumber: string;
  balanceOfToken: string;
};

export const StakingLockForm: React.FC<StakingLockFormProps> = (props) => {
  const classes = useStakingLockFormStyles();

  const [aquireOpen, aquireToggle] = useToggle(false);
  const [stakingAttentionOpen, toggleStakingAttention] = useToggle(false);

  const networkConfig = useNetworkConfig();

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

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
      }

      if (props.canStake) {
        error.amount = 'Staking ended';
      }

      if (new BN(props.balanceOfToken).isLessThan(formValues.amount)) {
        error.amount = `Looks like you don't have enough ${props.tokenName}, please check your wallet`;
      }

      return error;
    },

    onSubmit: async (formValues, { resetForm }) => {
      if (!account || !stakingContract || !tokenDecimals) return;

      const currentAssetContract = getIERC20Contract(tokenAddress);

      const formAmount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(tokenDecimals))
        .toString(10);

      await autoApprove(
        currentAssetContract,
        account,
        stakingContract.options.address,
        formAmount
      );

      const stake = stakingContract.methods.stake(formAmount);
      await stake.send({
        from: account,
        gas: await estimateGas(stake, { from: account })
      });
      resetForm();
      props.onSubmit?.();
    }
  });

  const handleCloseTooltip = useCallback(() => {
    formik.setFieldError('amount', '');
  }, [formik]);

  const tokenAddresses = useMemo(() => {
    return Object.values(networkConfig.assets)
      .filter((asset) => props.token?.includes(asset.symbol))
      .map(({ address }) => address);
  }, [props.token, networkConfig.assets]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.root}>
        <div>
          <Typography variant="body1" align="center" className={classes.title}>
            Stake your{' '}
            <LinkIfAccount title={props.tokenName}>
              {props.tokenAddress ?? ''}
            </LinkIfAccount>
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
            <Input
              type="number"
              value={formik.values.amount}
              name="amount"
              placeholder="0"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.amount)}
              className={classes.input}
            />
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
              onClick={() =>
                formik.setFieldValue('amount', props.balanceOfToken)
              }
            >
              {props.balanceOfToken || 0} max
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
        <Button
          type={
            Number(formik.values.amount) > 0 && formik.isValid
              ? 'button'
              : 'submit'
          }
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
          onClick={
            Number(formik.values.amount) > 0 && formik.isValid
              ? toggleStakingAttention
              : undefined
          }
        >
          Stake
        </Button>
        <Typography
          variant="body2"
          component="div"
          align="center"
          className={classes.attention}
        >
          Staking will end at {props.stakeDate}
          <br /> after {props.stakeBlockNumber} block
        </Typography>
      </form>
      <StakingAcquireModal
        open={aquireOpen}
        onClose={aquireToggle}
        tokenName={props.tokenName}
        tokenAddresses={tokenAddresses}
      />
      <StakingAttentionModal
        date={props.stakeDate}
        blockNumber={props.stakeBlockNumber}
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
