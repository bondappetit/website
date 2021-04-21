import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';
import { useAsyncRetry } from 'react-use';

import { Button, estimateGas, useIntervalIfHasAccount } from 'src/common';
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
        gas: await estimateGas(withdrawTransitToken, { from: account })
      });

      await burgerSwapApi.bscWithdraw(resp.transactionHash);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {errorMessage && <>Error: {errorMessage}</>}
      {!state.value ? (
        'loading...'
      ) : (
        <div>
          {state.value.map((transit) => (
            <div key={transit.id}>
              <div>
                {transit.token} {transit.symbol} {transit.sign}
              </div>
              <Button onClick={() => handleWithDraw(transit)}>Approve</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
