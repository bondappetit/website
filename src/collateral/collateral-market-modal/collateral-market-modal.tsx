import { useFormik } from 'formik';
import React, { useState } from 'react';
import BN from 'bignumber.js';
import { useDebounce } from 'react-use';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import type { Ierc20 } from 'src/generate/IERC20';
import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import type { AbiItem } from 'web3-utils';

import {
  Modal,
  SmallModal,
  Input,
  Select,
  SelectOption,
  useCollateralMarketContract,
  Button,
  useNetworkConfig,
  useBalance,
  useDynamicContract
} from 'src/common';
import { useCollateralTokens } from './use-collateral-tokens';
import { useCollateralMarketModalStyles } from './collateral-market-modal.styles';

export type CollateralMarketModalProps = {
  open: boolean;
  onClose: () => void;
};

export const CollateralMarketModal: React.FC<CollateralMarketModalProps> = (
  props
) => {
  const [userGet, setUserGet] = useState<BN>(new BN(0));
  const tokens = useCollateralTokens();
  const { account } = useWeb3React<Web3>();
  const collateralMarketContract = useCollateralMarketContract();
  const classes = useCollateralMarketModalStyles();
  const network = useNetworkConfig();
  const getBalance = useBalance();
  const getContract = useDynamicContract<Ierc20>({
    abi: IERC20.abi as AbiItem[]
  });

  const formik = useFormik({
    initialValues: {
      currency: 'USDC',
      amount: '10000'
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<typeof formValues> = {};

      if (!formValues.currency) {
        error.currency = 'Required';
        return error;
      }

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
        return error;
      }

      const currentToken = network.assets[formValues.currency];

      if (!currentToken) return;

      const balanceOfToken = await getBalance({
        tokenAddress: currentToken.address,
        tokenName: currentToken.name
      });

      if (
        balanceOfToken
          .div(new BN(10).pow(currentToken.decimals))
          .isLessThan(formValues.amount)
      ) {
        error.amount = `Not enough ${formValues.currency}`;
      }

      return error;
    },

    onSubmit: async (formValues) => {
      const currentToken = network.assets[formValues.currency];

      if (!currentToken || !account) return;

      const currentContract = getContract(currentToken.address);

      const formInvest = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      try {
        const buyStableToken = collateralMarketContract.methods.buy(
          currentContract.options.address,
          formInvest
        );

        const approve = currentContract.methods.approve(
          collateralMarketContract.options.address,
          formInvest
        );

        const allowance = await currentContract.methods
          .allowance(account, collateralMarketContract.options.address)
          .call();

        if (allowance !== '0') {
          await currentContract.methods
            .approve(collateralMarketContract.options.address, '0')
            .send({
              from: account,
              gas: await approve.estimateGas({ from: account })
            });
        }

        await approve.send({
          from: account,
          gas: await approve.estimateGas({ from: account })
        });
        window.onbeforeunload = () => 'wait please transaction in progress';

        await buyStableToken.send({
          from: account,
          gas: await buyStableToken.estimateGas({ from: account })
        });
      } catch {
        console.error('work');
      } finally {
        window.onbeforeunload = () => null;
      }
    }
  });

  useDebounce(
    () => {
      setUserGet(
        new BN(formik.values.amount)
          .multipliedBy(
            new BN(10).pow(
              network.assets.Stable.decimals -
                network.assets[formik.values.currency].decimals
            )
          )
          .div(new BN(10).pow(network.assets.Stable.decimals))
      );
    },
    100,
    [formik.values.amount, formik.values.currency, tokens]
  );

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <form onSubmit={formik.handleSubmit} className={classes.root}>
          <div>
            <Input
              name="amount"
              placeholder="You spent"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
            <Select
              label="Currency"
              value={formik.values.currency}
              onChange={(value) => formik.setFieldValue('currency', value)}
            >
              {Object.values(tokens).map(({ symbol }) => (
                <SelectOption key={symbol} value={symbol} label={symbol} />
              ))}
            </Select>
          </div>
          <Input
            label="You will get"
            readOnly
            value={userGet.isNaN() ? '0' : userGet.toString(10)}
          />
          <Button type="submit">
            {formik.errors.amount || formik.errors.currency || 'Buy'}
          </Button>
        </form>
      </SmallModal>
    </Modal>
  );
};
