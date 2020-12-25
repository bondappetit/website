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
    const amountInBond = new BN(10)
      .pow(networkConfig.assets.Bond.decimals)
      .toString(10);

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
        .multipliedBy(bondInUSDC)
        .multipliedBy(BLOCK_PER_YEAR)
        .div(
          new BN(10)
            .pow(networkConfig.assets.Bond.decimals)
            .multipliedBy(bondInUSDC)
        )
        .integerValue()
        .toString(10)
    }));

    if (result.length) setAPY(result);
  }, [networkConfig, uniswapRouter, balances]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

  return APY;
};
