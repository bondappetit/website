import { useEffect, useMemo } from 'react';
import { useAsyncRetry } from 'react-use';

import { useNetworkConfig, useUniswapRouter, BN } from 'src/common';

const DEFAULT_GOVERNANCE_COST = '5000000';
const MAINNET_NETWORK_ID = 1;

export const useGovernanceCost = () => {
  const networkConfig = useNetworkConfig();
  const uniswapRouter = useUniswapRouter();

  const amountInGovernance = useMemo(
    () => new BN(10).pow(networkConfig.assets.Governance.decimals).toString(10),
    [networkConfig.assets.Governance.decimals]
  );

  const state = useAsyncRetry(async () => {
    if (networkConfig.networkId !== MAINNET_NETWORK_ID)
      return DEFAULT_GOVERNANCE_COST;

    if (!uniswapRouter) return;

    const [
      ,
      governanceInUSDC
    ] = await uniswapRouter.methods
      .getAmountsOut(amountInGovernance, [
        networkConfig.assets.Governance.address,
        networkConfig.assets.USDC.address
      ])
      .call();

    return governanceInUSDC;
  }, [amountInGovernance, networkConfig]);

  useEffect(() => {
    if (state.error) {
      console.warn(
        `${networkConfig.assets.Governance.symbol}-USDC liquidity pool is empty`
      );
    }
  }, [state.error, networkConfig.assets.Governance.symbol]);

  return {
    governanceInUSDC: state.value,
    amountInGovernance
  };
};
