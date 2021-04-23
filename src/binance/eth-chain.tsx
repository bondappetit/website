import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useAsyncRetry, useLocalStorage } from 'react-use';

import {
  approveAll,
  BN,
  Button,
  dateUtils,
  estimateGas,
  humanizeNumeral,
  Input,
  reset,
  Typography,
  useApprove,
  useGovernanceTokenContract,
  useIntervalIfHasAccount,
  useLibrary
} from 'src/common';
import { useBinanceStyles } from './binance.styles';
import { useBridgeContract } from './bridge-contract';
import { burgerSwapApi, BurgerSwapPayback } from './burger-swap-api';

export type EthChainProps = unknown;

export const EthChain: React.VFC<EthChainProps> = () => {
  const classes = useBinanceStyles();

  const library = useLibrary();

  const [state, setState] = useState('');

  const { account } = useWeb3React();

  const [, approvalNeeded] = useApprove();

  const bridgeContract = useBridgeContract();
  const governanceContract = useGovernanceTokenContract();

  const [ethTransit, setEthTransit] = useLocalStorage<string | null>(
    'ethTransit',
    null
  );
  const [ethWithdraw, setEthWithdraw] = useLocalStorage<string | null>(
    'ethWithdraw',
    null
  );

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

      transitForBSC
        .send({
          from: account,
          gas: await estimateGas(transitForBSC, { from: account })
        })
        .on('transactionHash', async (transactionHash) => {
          setEthTransit(transactionHash);
        })
        .on('receipt', async (receipt) => {
          await burgerSwapApi.ethTransit(receipt.transactionHash);

          setState('change chain to binance');
          resetForm();
        })
        .on('error', (error) => {
          setState(error.message);
        });
    }
  });

  const paybackList = useAsyncRetry(async () => {
    if (!account) return;

    return burgerSwapApi.getPaybackList(account);
  }, [account]);

  useIntervalIfHasAccount(paybackList.retry);

  const handleWithdrawFromBSC = async (payback: BurgerSwapPayback) => {
    if (!account) return;

    const withdrawFromBSC = bridgeContract.methods.withdrawFromBSC(
      payback.sign,
      payback.payback_id,
      payback.token,
      payback.amount
    );

    withdrawFromBSC
      .send({
        from: account,
        gas: await estimateGas(withdrawFromBSC, { from: account })
      })
      .on('transactionHash', async (transactionHash) => {
        setEthWithdraw(transactionHash);
      })
      .on('receipt', async (receipt) => {
        await burgerSwapApi.ethWithdraw(receipt.transactionHash);
      })
      .on('error', (error) => {
        setState(error.message);
      });
  };

  const latestEthTransit = useAsyncRetry(async () => {
    if (!ethTransit) return;

    const receipt = await library.eth.getTransactionReceipt(ethTransit);

    if (receipt.status) {
      await burgerSwapApi.ethTransit(ethTransit);
    }

    return receipt;
  }, [ethTransit, library]);

  const latestEthWithdraw = useAsyncRetry(async () => {
    if (!ethWithdraw) return;

    const receipt = await library.eth.getTransactionReceipt(ethWithdraw);

    if (receipt.status) {
      await burgerSwapApi.ethWithdraw(ethWithdraw);
    }

    return receipt;
  }, [ethWithdraw, library]);

  useIntervalIfHasAccount(ethTransit ? latestEthTransit.retry : () => {});
  useIntervalIfHasAccount(ethWithdraw ? latestEthWithdraw.retry : () => {});

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
      {ethTransit && latestEthTransit.value && (
        <>
          transaction eth transit: {ethTransit} ={' '}
          {latestEthTransit.value?.status ? 'true' : 'false'}
        </>
      )}
      {ethWithdraw && latestEthWithdraw.value && (
        <>
          transaction eth withdraw: {ethWithdraw} ={' '}
          {latestEthWithdraw.value?.status ? 'true' : 'false'}
        </>
      )}
      {!paybackList.value
        ? 'Loading...'
        : paybackList.value.map((payback) => (
            <div key={payback.id}>
              <div>id: {payback.id}</div>
              <div>payback Id: {payback.payback_id}</div>
              <div>status: {payback.status}</div>
              <div>createBlock: {payback.createBlock}</div>
              <div>amount: {humanizeNumeral(payback.amount)}</div>
              <div>from: {payback.from}</div>
              <div>token: {payback.token}</div>
              <div>sign: {payback.sign}</div>
              <div>withdrawBlock: {payback.withdrawBlock}</div>
              <div>version: {payback.version}</div>
              <div>createTime: {dateUtils.format(payback.createTime)}</div>
              <div>updateTime: {dateUtils.format(payback.updateTime)}</div>
              {!payback.status && (
                <Button onClick={() => handleWithdrawFromBSC(payback)}>
                  Claim
                </Button>
              )}
            </div>
          ))}
    </div>
  );
};
