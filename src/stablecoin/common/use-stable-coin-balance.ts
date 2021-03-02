import { useAsyncRetry, useInterval } from 'react-use';

import { useNetworkConfig, useStableCoinContract, BN } from 'src/common';

export const useStableCoinBalance = () => {
  const stableCoinContract = useStableCoinContract();

  const networkConfig = useNetworkConfig();

  const state = useAsyncRetry(async () => {
    const stableCoinBalance = await stableCoinContract.methods
      .totalSupply()
      .call();

    return new BN(stableCoinBalance).div(
      new BN(10).pow(networkConfig.assets.Stable.decimals)
    );
  }, [stableCoinContract, networkConfig]);

  useInterval(state.retry, 15000);

  return state;
};
