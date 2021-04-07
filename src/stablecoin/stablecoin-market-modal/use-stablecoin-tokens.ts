import { useAsyncRetry } from 'react-use';

import {
  useNetworkConfig,
  useMarketContract,
  useBalance,
  Asset,
  BN,
  useIntervalIfHasAccount
} from 'src/common';

export const useGovernanceTokens = () => {
  const network = useNetworkConfig();
  const marketContract = useMarketContract();

  const getBalance = useBalance();

  const state = useAsyncRetry(async () => {
    if (!marketContract) return;

    const tokensWithPrice = Object.values(network.assets).reduce<
      Promise<Asset[]>
    >(async (previusPromise, asset) => {
      const acc = await previusPromise;

      const isAllowedToken = await marketContract.methods
        .isAllowedToken(asset.address)
        .call();

      if (isAllowedToken) {
        const balanceOfToken = await getBalance({
          tokenAddress: asset.address,
          tokenName: asset.symbol
        });

        const balance = balanceOfToken.div(new BN(10).pow(asset.decimals));

        const token: Asset = {
          ...asset,
          balance: balance.isNaN() ? '0' : balance.toString(10)
        };

        acc.push(token);
      }

      return acc;
    }, Promise.resolve([]));

    return tokensWithPrice;
  }, [network, marketContract, getBalance]);

  useIntervalIfHasAccount(state.retry);

  return state;
};
