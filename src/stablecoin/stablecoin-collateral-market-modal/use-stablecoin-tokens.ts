import { development } from '@bondappetit/networks';
import { useAsyncRetry, useInterval } from 'react-use';

import {
  useCollateralMarketContract,
  useNetworkConfig,
  useBalance,
  BN
} from 'src/common';

export type Asset = typeof development.assets[number] & { balance: string };

export const useStablecoinTokens = () => {
  const getBalance = useBalance();

  const network = useNetworkConfig();
  const collateralMarketContract = useCollateralMarketContract();

  const state = useAsyncRetry<Asset[] | undefined>(async () => {
    if (!collateralMarketContract) return;

    const allowedTokens = await collateralMarketContract.methods
      .allowedTokens()
      .call();

    const tokenAddresses = allowedTokens.map((address) =>
      address.toLowerCase()
    );

    const tokens = Object.values(network.assets)
      .filter(({ address }) => tokenAddresses.includes(address.toLowerCase()))
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

    return Promise.all(tokens);
  }, [collateralMarketContract, network, getBalance]);

  useInterval(state.retry, 15000);

  return state;
};
