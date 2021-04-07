import { useAsyncRetry } from 'react-use';

import {
  useNetworkConfig,
  useStableCoinContract,
  BN,
  useIntervalIfHasAccount
} from 'src/common';

export const useStableCoinBalance = () => {
  const stableCoinContract = useStableCoinContract();

  const networkConfig = useNetworkConfig();

  const state = useAsyncRetry(async () => {
    if (!stableCoinContract) return;

    const stableCoinBalance = await stableCoinContract.methods
      .totalSupply()
      .call();

    return new BN(stableCoinBalance).div(
      new BN(10).pow(networkConfig.assets.Stable.decimals)
    );
  }, [stableCoinContract, networkConfig]);

  useIntervalIfHasAccount(state.retry);

  return state;
};
