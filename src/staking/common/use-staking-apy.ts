import { useCallback, useEffect, useState } from 'react';

import {
  useNetworkConfig,
  useUniswapRouter,
  BN,
  useUniswapPairInfo
} from 'src/common';
import { StakingToken } from './use-staking-balances';
import { useGovernanceCost } from './use-governance-cost';

const BLOCK_PER_YEAR = '2102400';

export type APYWithTokenName = {
  amountInUSDC: string;
  rewardInUSDC: string;
  stakingTokenUSDC: string;
  totalSupplyUSDC: BN;
  APY: BN;
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
  const [state, setState] = useState<APYWithTokenName[]>([]);
  const getPairInfo = useUniswapPairInfo();

  const { governanceInUSDC } = useGovernanceCost();

  const handleGetTokenPrice = useCallback(async () => {
    const result = await Promise.all(
      balances.map(async (balance) => {
        let tokenInUSDC;
        if (balance.liquidityPool) {
          tokenInUSDC = '0';
          const {
            data: { pair }
          } = await getPairInfo({
            id: balance.address
          });
          tokenInUSDC = new BN(pair?.reserveUSD || 0)
            .div(pair?.totalSupply || 1)
            .toFixed(2);
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

        const APY = APYBN.integerValue();

        return {
          ...balance,
          totalSupply: balance.totalSupply,
          totalSupplyUSDC: new BN(balance.totalSupply).multipliedBy(
            tokenInUSDC
          ),
          amountInUSDC,
          rewardInUSDC,
          stakingTokenUSDC: tokenInUSDC,
          APY
        };
      })
    );

    if (result.length) setState(result);
  }, [
    balances,
    governanceInUSDC,
    USD.decimals,
    USD.address,
    getPairInfo,
    uniswapRouter
  ]);

  useEffect(() => {
    handleGetTokenPrice();
  }, [handleGetTokenPrice]);

  return state;
};
