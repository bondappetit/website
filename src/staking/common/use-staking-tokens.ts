import { useAsyncRetry, useInterval } from 'react-use';
import { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { StakingConfig } from 'src/staking-config';
import {
  useNetworkConfig,
  useUniswapRouter,
  BN,
  useUniswapPairInfo,
  useBatchRequest
} from 'src/common';
import type { Staking } from 'src/generate/Staking';
import { useGovernanceCost } from './use-governance-cost';
import { useStakingContracts } from './use-staking-contracts';
import { useTokenContracts } from './use-token-contract';

const BLOCKS_PER_MINUTE = 4;

export type StakingToken = {
  amount: BN;
  totalSupply: BN;
  rewardRate: string;
  reward: BN;
  key: string;
  decimals: string;
  address: string;
  stakingContract: Staking;
  token: string[];
  liquidityPool: boolean;
  poolRate: BN;
};

export type APYWithTokenName = {
  amountInUSDC: string;
  rewardInUSDC: string;
  stakingTokenUSDC: string;
  totalSupplyUSDC: BN;
  APY: BN;
  lockable: boolean;
} & StakingToken;

async function getAmountsOut(
  uniswapRouter: ReturnType<typeof useUniswapRouter>,
  tokenA: string,
  tokenB: string,
  amount: string
) {
  let amountsOut = '0';

  if (!uniswapRouter) return amountsOut;

  try {
    [, amountsOut] = await uniswapRouter.methods
      .getAmountsOut(amount, [tokenA, tokenB])
      .call();
  } catch (e) {
    console.warn(`${tokenA}-${tokenB} liquidity pool is empty`);
  }

  return amountsOut;
}

export const useStakingTokens = (availableTokens: StakingConfig[]) => {
  const uniswapRouter = useUniswapRouter();
  const networkConfig = useNetworkConfig();
  const USD = networkConfig.assets.USDC;
  const getPairInfo = useUniswapPairInfo();

  const { governanceInUSDC } = useGovernanceCost();

  const tokens = useRef(availableTokens);
  const getStakingContract = useStakingContracts();
  const getTokenContract = useTokenContracts();
  const { account: web3Account } = useWeb3React<Web3>();
  const [account, setAccount] = useState(web3Account);

  const makeBatchRequest = useBatchRequest();

  useEffect(() => {
    if (web3Account) {
      setAccount(web3Account);
    }
  }, [web3Account]);

  useEffect(() => {
    tokens.current = availableTokens;
  }, [availableTokens]);

  const state = useAsyncRetry(async () => {
    const balances = tokens.current.reduce<Promise<StakingToken[]>>(
      async (previusPromise, { contractName, token, liquidityPool }, index) => {
        const acc = await previusPromise;

        const stakingContract = getStakingContract(contractName);

        if (!stakingContract) return acc;

        const stakingTokenAddress = await stakingContract.methods
          .stakingToken()
          .call();
        const stakingTokenContract = getTokenContract(stakingTokenAddress);
        const [
          stakingTokenDecimals,
          rewardTokenAddress
        ] = await makeBatchRequest(
          [
            stakingTokenContract.methods.decimals().call,
            stakingContract.methods.rewardsToken().call
          ],
          account
        );

        const rewardTokenContract = getTokenContract(rewardTokenAddress);
        const rewardTokenDecimals = await rewardTokenContract.methods
          .decimals()
          .call();

        if (!stakingContract) return acc;

        const [
          balance,
          earned,
          totalSupply,
          rewardRate
        ] = await makeBatchRequest(
          [
            account ? stakingContract.methods.balanceOf(account).call : '0',
            account ? stakingContract.methods.earned(account).call : '0',
            stakingContract.methods.totalSupply().call,
            stakingContract.methods.rewardRate().call
          ],
          account
        );

        const amount = new BN(balance).div(
          new BN(10).pow(stakingTokenDecimals)
        );

        const reward = new BN(earned).div(new BN(10).pow(rewardTokenDecimals));

        const totalSupplyBN = new BN(totalSupply).div(
          new BN(10).pow(stakingTokenDecimals)
        );

        const poolRate = new BN(rewardRate)
          .div(new BN(10).pow(rewardTokenDecimals))
          .multipliedBy(BLOCKS_PER_MINUTE)
          .multipliedBy(60)
          .multipliedBy(24);

        const stakingToken = {
          amount,
          key: String(index),
          decimals: stakingTokenDecimals,
          totalSupply: totalSupplyBN,
          rewardRate,
          stakingContract,
          address: stakingTokenAddress,
          reward,
          token,
          liquidityPool,
          poolRate
        };

        acc.push(stakingToken);

        return acc;
      },
      Promise.resolve([])
    );

    const tokenBalances = await balances;

    return Promise.all(
      tokenBalances.map(async (balance) => {
        let tokenInUSDC;
        if (balance.liquidityPool) {
          tokenInUSDC = '0';

          const {
            data: { pair }
          } = await getPairInfo({
            id: balance.address.toLowerCase()
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
        const rewardInUSDC = governanceInUSDC
          ? new BN(balance.reward)
              .multipliedBy(governanceInUSDC)
              .div(new BN(10).pow(USD.decimals))
              .toFixed(4)
          : new BN(0).toFixed(1);

        const rewardROI = governanceInUSDC
          ? new BN(balance.rewardRate)
              .div(new BN(10).pow(balance.decimals))
              .multipliedBy(
                new BN(governanceInUSDC).div(new BN(10).pow(USD.decimals))
              )
          : new BN(0);
        const totalSupplyROI = new BN(balance.totalSupply).multipliedBy(
          new BN(tokenInUSDC).div(new BN(10).pow(USD.decimals))
        );
        const APYBN = totalSupplyROI.gt(0)
          ? rewardROI.div(totalSupplyROI).multipliedBy(100)
          : new BN(0);

        const APY = APYBN.integerValue();

        const unstakingStartBlock = await balance.stakingContract.methods
          .unstakingStartBlock()
          .call();

        const lockable = new BN(unstakingStartBlock).isGreaterThan(0);

        return {
          ...balance,
          lockable,
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
  }, [
    account,
    governanceInUSDC,
    USD.decimals,
    USD.address,
    getPairInfo,
    uniswapRouter
  ]);

  useInterval(state.retry, 15000);

  return state;
};
