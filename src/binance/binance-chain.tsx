import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { useAsyncRetry } from 'react-use';
import { useIntervalIfHasAccount } from 'src/common';

import { burgerSwapApi } from './burger-swap-api';

export type BinanceChainProps = {
  className?: string;
};

export const BinanceChain: React.VFC<BinanceChainProps> = () => {
  const { account } = useWeb3React();

  const state = useAsyncRetry(async () => {
    if (!account) return;

    return burgerSwapApi.getTransitList(account);
  }, [account]);

  useIntervalIfHasAccount(state.retry);

  console.log(state);

  return <div>binance</div>;
};
