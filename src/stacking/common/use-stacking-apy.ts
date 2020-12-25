import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { useNetworkConfig, useUniswapRouter } from 'src/common';
import { StackingToken } from './use-stacking-balances';

const BLOCK_PER_YEAR = '2102400';

type APYWithTokenName = {
  APY: string;
} & StackingToken;

export const useStackingApy = (balances: StackingToken[]) => {
  const uniswapRouter = useUniswapRouter();
  const networkConfig = useNetworkConfig();
  const [APY, setAPY] = useState<APYWithTokenName[]>([]);
  const { account } = useWeb3React<Web3>();

  const handleGetTokenPrice = useCallback(async () => {
    const amountInBond = new BN(10)
      .pow(networkConfig.assets.Bond.decimals)
      .toString(10);

    if (!account) return;

    const [
      ,
      bondInUSDC
    ] = await uniswapRouter.methods
      .getAmountsOut(amountInBond, [
        networkConfig.assets.Bond.address,
        networkConfig.assets.USDC.address
      ])
      .call();

    const result = balances.map((balance) => ({
      ...balance,
      APY: new BN(balance.delta)
        .multipliedBy(BLOCK_PER_YEAR)
        .multipliedBy(bondInUSDC)
        .div(
          new BN(10)
            .pow(networkConfig.assets.Bond.decimals)
            .multipliedBy(bondInUSDC)
        )
        .integerValue()
        .toString(10)
    }));

    if (result.length) setAPY(result);
  }, [networkConfig, uniswapRouter, balances, account]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

  return APY;
};
