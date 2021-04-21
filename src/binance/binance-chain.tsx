import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useAsyncRetry } from 'react-use';

import {
  BN,
  Button,
  humanizeNumeral,
  Input,
  Typography,
  useIntervalIfHasAccount
} from 'src/common';
import { burgerSwapApi, BurgerSwapTransit } from './burger-swap-api';
import { useTransitContract } from './burger-transit-contract';

export type BinanceChainProps = {
  className?: string;
};

export const BinanceChain: React.VFC<BinanceChainProps> = () => {
  const { account } = useWeb3React();

  const transitContract = useTransitContract();

  const [errorMessage, setErrorMessage] = useState('');

  const state = useAsyncRetry(async () => {
    if (!account) return;

    return burgerSwapApi.getTransitList(account);
  }, [account]);

  useIntervalIfHasAccount(state.retry);

  const handleWithDraw = async (transit: BurgerSwapTransit) => {
    if (!account) return;

    const withdrawTransitToken = transitContract.methods.withdrawTransitToken(
      transit.sign,
      transit.transit_id,
      transit.amount,
      transit.token,
      transit.name,
      transit.symbol,
      transit.decimals
    );

    try {
      const resp = await withdrawTransitToken.send({
        from: account,
        gas: 90000,
        value: `5${'0'.repeat(16)}`
      });

      await burgerSwapApi.bscWithdraw(resp.transactionHash);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: ''
    },

    onSubmit: () => {}
  });

  return (
    <div>
      <Typography variant="body1">Binance chain</Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div>
          <Input
            placeholder="Amount"
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
        </div>
        <Button type="submit">Approve</Button>
      </form>
      {errorMessage && <>Error: {errorMessage}</>}
      {!state.value ? (
        'loading...'
      ) : (
        <div>
          {state.value.map((transit) => (
            <div key={transit.id}>
              <div>id: {transit.id}</div>
              <div>transit_id: {transit.transit_id}</div>
              <div>status: {transit.status}</div>
              <div>createBlock: {transit.createBlock}</div>
              <div>
                amount:{' '}
                {humanizeNumeral(
                  new BN(transit.amount).div(new BN(10).pow(transit.decimals))
                )}
              </div>
              <div>symbol: {transit.symbol}</div>
              <div>decimals: {transit.decimals}</div>
              <div>name: {transit.name}</div>
              <div>from: {transit.from}</div>
              <div>token: {transit.token}</div>
              <div>sign: {transit.sign}</div>
              <div>withdrawBlock: {transit.withdrawBlock}</div>
              <div>version: {transit.version}</div>
              <div>createTime: {transit.createTime}</div>
              <div>updateTime: {transit.updateTime}</div>
              {!transit.status && (
                <Button onClick={() => handleWithDraw(transit)}>Claim</Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
