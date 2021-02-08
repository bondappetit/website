import { useState, useCallback, useEffect } from 'react';

import { useNetworkConfig, useStableCoinContract, BN } from 'src/common';

export const useStableCoinBalance = () => {
  const [state, setState] = useState('');

  const stableCoinContract = useStableCoinContract();

  const networkConfig = useNetworkConfig();

  const handleGetStableCoinBalance = useCallback(async () => {
    const stableCoinBalance = await stableCoinContract.methods
      .totalSupply()
      .call();

    setState(
      new BN(stableCoinBalance)
        .div(new BN(10).pow(networkConfig.assets.Stable.decimals))
        .toFormat(2)
    );
  }, [stableCoinContract, networkConfig]);

  useEffect(() => {
    handleGetStableCoinBalance();
  }, [handleGetStableCoinBalance]);

  return state;
};
