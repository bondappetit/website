import { useEffect, useState, useCallback } from 'react';
import { development } from '@bondappetit/networks';

import { useCollateralMarketContract, useNetworkConfig } from 'src/common';

export type Asset = typeof development.assets[number];

export const useCollateralTokens = () => {
  const [state, setState] = useState<Asset[]>([]);

  const network = useNetworkConfig();
  const collateralMarketContract = useCollateralMarketContract();

  const handleGetTokens = useCallback(async () => {
    const tokenAddresses = await collateralMarketContract.methods
      .allowedTokens()
      .call();

    const tokens = Object.values(network.assets).filter(({ address }) =>
      tokenAddresses.includes(address)
    );

    setState(tokens);
  }, [collateralMarketContract, network]);

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens]);

  return state;
};
