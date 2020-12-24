import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';

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

  const handleGetTokenPrice = useCallback(async () => {
    if (!networkConfig || !uniswapRouter) return;
    // TODO: rewrite for real tokens
    // const currentToken = networkConfig.assets[params.tokenId];

    const amountInUSDT = new BN(10)
      .pow(networkConfig.assets.USDT.decimals)
      .toString(10);
    const amountInDAI = new BN(10)
      .pow(networkConfig.assets.DAI.decimals)
      .toString(10);

    const [
      ,
      ,
      usdtInUSD
    ] = await uniswapRouter.methods
      .getAmountsOut(amountInUSDT, [
        networkConfig.assets.USDT.address,
        networkConfig.assets.WETH.address,
        networkConfig.assets.USDC.address
      ])
      .call();

    const [
      ,
      ,
      daiInUSD
    ] = await uniswapRouter.methods
      .getAmountsOut(amountInDAI, [
        networkConfig.assets.DAI.address,
        networkConfig.assets.WETH.address,
        networkConfig.assets.USDC.address
      ])
      .call();

    const result = balances.map((balance) => ({
      ...balance,
      APY: balance.delta
        ? new BN(balance.delta)
            .multipliedBy(daiInUSD)
            .multipliedBy(BLOCK_PER_YEAR)
            .div(usdtInUSD)
            .multipliedBy(100)
            .integerValue()
            .toString()
        : ''
    }));

    setAPY(result);
  }, [networkConfig, uniswapRouter, balances]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

  return APY;
};
