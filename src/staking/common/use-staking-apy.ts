import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';

import { useNetworkConfig, useUniswapRouter } from 'src/common';
import { StakingToken } from './use-staking-balances';
import { useStakingLpPair } from './use-staking-lp-pair';
import { useTokenContracts } from './use-token-contract';
import { useGovernanceCost } from './use-governance-cost';

const BLOCK_PER_YEAR = '2102400';

export type APYWithTokenName = {
  amountInUSDC: string;
  rewardInUSDC: string;
  APY: string;
} & StakingToken;

async function getAmountsOut(
  uniswapRouter: ReturnType<typeof useUniswapRouter>,
  tokenA: string,
  tokenB: string,
  amount: string
) {
  let amountsOut = '0';
  try {
    [, amountsOut] = await uniswapRouter.methods
      .getAmountsOut(amount, [tokenA, tokenB])
      .call();
  } catch (e) {
    console.warn(`${tokenA}-${tokenB} liquidity pool is empty`);
  }

  return amountsOut;
}

export const useStakingApy = (balances: StakingToken[]) => {
  const uniswapRouter = useUniswapRouter();
  const networkConfig = useNetworkConfig();
  const USD = networkConfig.assets.USDC;
  const [APY, setAPY] = useState<APYWithTokenName[]>([]);
  const getStakingLpPair = useStakingLpPair();
  const getTokenContract = useTokenContracts();

  const { governanceInUSDC } = useGovernanceCost();

  const handleGetTokenPrice = useCallback(async () => {
    const result = await Promise.all(
      balances.map(async (balance) => {
        let tokenInUSDC;
        if (balance.liquidityPool) {
          tokenInUSDC = '0';
          const pairContract = getStakingLpPair(balance.address);

          const [token0Address, token1Address] = await Promise.all([
            pairContract.methods.token0().call(),
            pairContract.methods.token1().call()
          ]);

          const token0 = getTokenContract(token0Address);
          const token1 = getTokenContract(token1Address);

          const [token0Decimals, token1Decimals] = await Promise.all([
            token0.methods.decimals().call(),
            token1.methods.decimals().call()
          ]);

          let token0USD = new BN(10).pow(USD.decimals).toString(10);
          try {
            token0USD =
              token0Address !== USD.address
                ? await getAmountsOut(
                    uniswapRouter,
                    token0Address,
                    USD.address,
                    new BN(10).pow(token0Decimals).toString(10)
                  )
                : token0USD;
          } catch (e) {
            console.warn(
              `${token0Address}-${USD.symbol} liquidity pool is empty`
            );
          }

          let token1USD = new BN(10).pow(USD.decimals).toString(10);
          try {
            token1USD =
              token1Address !== USD.address
                ? await getAmountsOut(
                    uniswapRouter,
                    token1Address,
                    USD.address,
                    new BN(10).pow(token1Decimals).toString(10)
                  )
                : token1USD;
          } catch (e) {
            console.warn(
              `${token1Address}-${USD.symbol} liquidity pool is empty`
            );
          }

          tokenInUSDC = new BN(token0USD).plus(token1USD).toString(10);
        } else {
          tokenInUSDC = await getAmountsOut(
            uniswapRouter,
            balance.address,
            USD.address,
            new BN(10).pow(balance.decimals).toString(10)
          );
        }

        const amountInUSDC = new BN(balance.amount)
          .multipliedBy(tokenInUSDC)
          .div(new BN(10).pow(USD.decimals))
          .toFixed(2);
        const rewardInUSDC = new BN(balance.reward)
          .multipliedBy(governanceInUSDC)
          .div(new BN(10).pow(USD.decimals))
          .toFixed(4);

        const APYBN = new BN(balance.rewardRate)
          .div(
            new BN(balance.totalSupply).gt(0)
              ? balance.totalSupply
              : new BN(10).pow(balance.decimals)
          )
          .multipliedBy(governanceInUSDC)
          .multipliedBy(BLOCK_PER_YEAR)
          .div(tokenInUSDC)
          .multipliedBy(100);

        return {
          ...balance,
          amountInUSDC,
          rewardInUSDC,
          APY: APYBN.isNaN() ? '0' : APYBN.toString(10)
        };
      })
    );

    if (result.length) setAPY(result);
  }, [
    USD,
    uniswapRouter,
    balances,
    governanceInUSDC,
    getStakingLpPair,
    getTokenContract
  ]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

  return APY;
};
