import { useEffect, useState, useCallback } from 'react';
import { development } from '@bondappetit/networks';

import {
  useCollateralMarketContract,
  useNetworkConfig,
  useBalance,
  BN
} from 'src/common';

export type Asset = typeof development.assets[number] & { balance: string };

export const useStablecoinTokens = () => {
  const [state, setState] = useState<Asset[]>([]);

  const getBalance = useBalance();

  const network = useNetworkConfig();
  const collateralMarketContract = useCollateralMarketContract();

  const handleGetTokens = useCallback(async () => {
    const tokenAddresses = await collateralMarketContract.methods
      .allowedTokens()
      .call();

    const tokens = Object.values(network.assets)
      .filter(({ address }) => tokenAddresses.includes(address))
      .map(async (asset) => {
        const balanceOfToken = await getBalance({
          tokenAddress: asset.address,
          tokenName: asset.symbol
        });

        const balance = balanceOfToken.div(new BN(10).pow(asset.decimals));

        return {
          ...asset,
          balance: balance.isNaN() ? '0' : balance.toString(10)
        };
      });

    setState(await Promise.all(tokens));
  }, [collateralMarketContract, network, getBalance]);

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens]);

  return state;
};
