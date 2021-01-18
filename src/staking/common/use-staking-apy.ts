import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';

import { useNetworkConfig, useUniswapRouter } from 'src/common';
import { StakingToken } from './use-staking-balances';
import { useGovernanceCost } from './use-governance-cost';

const BLOCK_PER_YEAR = '2102400';

type APYWithTokenName = {
  amountInUSDC: string;
  rewardInUSDC: string;
  APY: string;
} & StakingToken;

export const useStakingApy = (balances: StakingToken[]) => {
  const uniswapRouter = useUniswapRouter();
  const networkConfig = useNetworkConfig();
  const [APY, setAPY] = useState<APYWithTokenName[]>([]);

  const { amountInGovernance, governanceInUSDC } = useGovernanceCost();

  const handleGetTokenPrice = useCallback(async () => {
    const result = await Promise.all(
      balances.map(async (balance) => {
        const config = networkConfig.assets[balance.key];

        if (config === undefined) {
          throw new Error(`Config for token ${balance.key} not found`);
        }

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

        const amountInUSDC = new BN(balance.amount)
          .multipliedBy(tokenInUSDC)
          .div(new BN(10).pow(networkConfig.assets.USDC.decimals))
          .integerValue(2)
          .toString(10);
        const rewardInUSDC = new BN(balance.reward)
          .multipliedBy(governanceInUSDC)
          .div(new BN(10).pow(networkConfig.assets.USDC.decimals))
          .toString(10);

        try {
          return {
            ...balance,
            amountInUSDC,
            rewardInUSDC,
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
            amountInUSDC: '0',
            rewardInUSDC: '0',
            APY: '0'
          };
        }
      })
    );

    if (result.length) setAPY(result);
  }, [
    networkConfig,
    uniswapRouter,
    balances,
    amountInGovernance,
    governanceInUSDC
  ]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

  return APY;
};