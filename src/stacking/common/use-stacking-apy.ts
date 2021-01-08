import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';

import { useNetworkConfig, useUniswapRouter } from 'src/common';
import { StackingToken } from './use-stacking-balances';

const BLOCK_PER_YEAR = '2102400';

type APYWithTokenName = {
  rewardPriceUSDC: string;
  stakingPriceUSDC: string;
  APY: string;
} & StackingToken;

export const useStackingApy = (balances: StackingToken[]) => {
  const uniswapRouter = useUniswapRouter();
  const networkConfig = useNetworkConfig();
  const [APY, setAPY] = useState<APYWithTokenName[]>([]);

  const handleGetTokenPrice = useCallback(async () => {
    const amountInGovernance = new BN(10)
      .pow(networkConfig.assets.Governance.decimals)
      .toString(10);

    let governanceInUSDC = '1';
    try {
      [
        ,
        governanceInUSDC
      ] = await uniswapRouter.methods
        .getAmountsOut(amountInGovernance, [
          networkConfig.assets.Governance.address,
          networkConfig.assets.USDC.address
        ])
        .call();
    } catch (e) {
      console.warn(
        `${networkConfig.assets.Governance.symbol}-USDC liquidity pool is empty`
      );
    }

    const result = await Promise.all(
      balances.map(async (balance) => {
        const config = networkConfig.assets[balance.key];

        if (config === undefined) {
          throw new Error(`Config for token ${balance.key} not found`);
        }

        try {
          let tokenInUSDC = '1';
          try {
            [
              ,
              tokenInUSDC
            ] = await uniswapRouter.methods
              .getAmountsOut(amountInGovernance, [
                config.address,
                networkConfig.assets.USDC.address
              ])
              .call();
          } catch (e) {
            console.warn(`${config.symbol}-USDC liquidity pool is empty`);
          }

          return {
            ...balance,
            rewardPriceUSDC: governanceInUSDC,
            stakingPriceUSDC: tokenInUSDC,
            APY: new BN(balance.rewardRate)
              .div(
                new BN(balance.totalSupply).gt(0)
                  ? balance.totalSupply
                  : new BN(10).pow(config.decimals)
              )
              .multipliedBy(governanceInUSDC)
              .multipliedBy(BLOCK_PER_YEAR)
              .div(tokenInUSDC)
              .multipliedBy(100)
              .toFixed(2)
          };
        } catch {
          return {
            ...balance,
            rewardPriceUSDC: '0',
            stakingPriceUSDC: '0',
            APY: '0'
          };
        }
      })
    );

    if (result.length) setAPY(result);
  }, [networkConfig, uniswapRouter, balances]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

  return APY;
};
