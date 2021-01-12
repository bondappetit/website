import { useEffect, useCallback, useState, useMemo } from 'react';
import BN from 'bignumber.js';

import { useNetworkConfig, useMarketContract, Token } from 'src/common';
import { StableCoin } from './constants';

export const useMarketTokens = (type: StableCoin) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const network = useNetworkConfig();
  const marketContract = useMarketContract();

  const handleLoadTokenPrices = useCallback(async () => {
    const priceMethod =
      type === StableCoin.Stable
        ? marketContract.methods.priceABT
        : marketContract.methods.priceBond;

    const tokensWithPrice = Object.values(network.assets).reduce<
      Promise<Token[]>
    >(async (previusPromise, asset) => {
      const acc = await previusPromise;

      const isAllowedToken = await marketContract.methods
        .isAllowedToken(asset.address)
        .call();

      if (isAllowedToken) {
        const price = await priceMethod?.(
          asset.address,
          new BN(10).pow(asset.decimals).toString(10)
        ).call();

        const token = {
          name: asset.symbol,
          address: asset.address,
          decimals: asset.decimals,
          price: price
            ? new BN(price)
                .div(new BN(10).pow(network.assets.Governance.decimals))
                .toString(10)
            : ''
        };

        acc.push(token);
      }

      return acc;
    }, Promise.resolve([]));

    try {
      setTokens(await tokensWithPrice);
    } catch (e) {
      console.error(e);
    }
  }, [network, marketContract, type]);

  useEffect(() => {
    handleLoadTokenPrices();
  }, [handleLoadTokenPrices]);

  return useMemo(
    () =>
      tokens.reduce<Record<string, Token>>((acc, token) => {
        acc[token.name] = token;

        return acc;
      }, {}),
    [tokens]
  );
};
