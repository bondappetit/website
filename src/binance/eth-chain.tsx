import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import {
  approveAll,
  BN,
  Button,
  estimateGas,
  Input,
  reset,
  Typography,
  useApprove,
  useGovernanceTokenContract
} from 'src/common';
import { useBinanceStyles } from './binance.styles';
import { useBridgeContract } from './bridge-contract';
import { burgerSwapApi } from './burger-swap-api';

export type EthChainProps = unknown;

export const EthChain: React.VFC<EthChainProps> = () => {
  const classes = useBinanceStyles();

  const [state, setState] = useState('');

  const { account } = useWeb3React();

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

  return (
    <div>
      <Typography variant="body1">Ethereum chain</Typography>
      <div>{state}</div>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div>
          <Input
            placeholder="Amount"
            name="amount"
            type="number"
            className={classes.input}
            onChange={formik.handleChange}
          />
        </div>
        <Button type="submit">Approve</Button>
      </form>
    </div>
  );
};
