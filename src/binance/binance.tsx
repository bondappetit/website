import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useUpdateEffect } from 'react-use';

import {
  BN,
  Button,
  Input,
  PageWrapper,
  useApprove,
  approveAll,
  reset,
  useGovernanceTokenContract,
  estimateGas,
  Typography
} from 'src/common';
import { MainLayout } from 'src/layouts';
import { useBinanceStyles } from './binance.styles';
import { useBridgeContract } from './bridge-contract';
import { BinanceChain } from './binance-chain';
import { burgerSwapApi } from './burger-swap-api';

export type BinanceProps = unknown;

export const Binance: React.VFC<BinanceProps> = () => {
  const classes = useBinanceStyles();

  const [state, setState] = useState('');

  const { account, chainId } = useWeb3React();

  const [, approvalNeeded] = useApprove();

  const bridgeContract = useBridgeContract();
  const governanceContract = useGovernanceTokenContract();

  const formik = useFormik({
    initialValues: {
      amount: ''
    },

    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (formValues, { resetForm }) => {
      const amount = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(18))
        .toString(10);

      if (!governanceContract || !account) return;

      const options = {
        token: governanceContract,
        owner: account,
        spender: bridgeContract.options.address,
        amount
      };

      const approved = await approvalNeeded(options);

      if (approved.reset) {
        await reset(options);
      }
      if (approved.approve) {
        await approveAll(options);
        await approvalNeeded(options);
        return;
      }

      const transitForBSC = bridgeContract.methods.transitForBSC(
        governanceContract.options.address,
        amount
      );

      try {
        const resp = await transitForBSC.send({
          from: account,
          gas: await estimateGas(transitForBSC, { from: account })
        });

        await burgerSwapApi.ethTransit(resp.transactionHash);
        setState('change chain to binance');
        resetForm();
      } catch (error) {
        setState(error.message);
      }
    }
  });

  useUpdateEffect(() => {
    setState('');
  }, [chainId]);

  return (
    <MainLayout>
      <PageWrapper>
        {state && <Typography variant="body1">{state}</Typography>}
        {chainId === 56 && <BinanceChain />}
        <form noValidate onSubmit={formik.handleSubmit}>
          <div>
            <Input
              label="Amount"
              name="amount"
              type="number"
              className={classes.input}
              onChange={formik.handleChange}
            />
          </div>
          <Button type="submit">Approve</Button>
        </form>
      </PageWrapper>
    </MainLayout>
  );
};
