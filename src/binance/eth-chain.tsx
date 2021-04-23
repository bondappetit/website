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

  const [tx, setTx] = useLocalStorage<string | null>('eth-txid', null);

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
          setTx(transactionHash);
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

    try {
      const resp = await withdrawFromBSC.send({
        from: account,
        gas: 90000,
        value: `5${'0'.repeat(16)}`
      });

      await burgerSwapApi.ethWithdraw(resp.transactionHash);
    } catch (error) {
      setState(error.message);
    }
  };

  const latestReceipt = useAsyncRetry(async () => {
    if (!tx) return;

    const receipt = await library.eth.getTransactionReceipt(tx);

    return receipt;
  }, [tx, library]);

  useIntervalIfHasAccount(tx ? latestReceipt.retry : () => {});

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
      {tx && (
        <>
          transaction: {tx} = {latestReceipt.value?.status ? 'true' : 'false'}
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
