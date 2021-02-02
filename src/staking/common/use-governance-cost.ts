import { useCallback, useState, useEffect, useMemo } from 'react';
import BN from 'bignumber.js';

import { useNetworkConfig, useUniswapRouter } from 'src/common';

export const useGovernanceCost = () => {
  const [state, setState] = useState('1000000');

  const networkConfig = useNetworkConfig();
  const uniswapRouter = useUniswapRouter();

  const amountInGovernance = useMemo(
    () => new BN(10).pow(networkConfig.assets.Governance.decimals).toString(10),
    [networkConfig.assets.Governance.decimals]
  );

  const getGovernanceCost = useCallback(async () => {
    try {
      const [
        ,
        governanceInUSDC
      ] = await uniswapRouter.methods
        .getAmountsOut(amountInGovernance, [
          networkConfig.assets.Governance.address,
          networkConfig.assets.USDC.address
        ])
        .call();

      setState(governanceInUSDC);
    } catch (e) {
      console.warn(
        `${networkConfig.assets.Governance.symbol}-USDC liquidity pool is empty`
      );
    }
  }, [uniswapRouter, amountInGovernance, networkConfig]);

  useEffect(() => {
    getGovernanceCost();
  }, [getGovernanceCost]);

  return {
    governanceInUSDC: state,
    amountInGovernance
  };
};
