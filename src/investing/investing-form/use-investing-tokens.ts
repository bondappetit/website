import { useEffect, useCallback, useState, useMemo } from 'react';

import { useNetworkConfig, useInvestmentContract, Token, BN } from 'src/common';

export const useInvestingTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const network = useNetworkConfig();
  const investmentContract = useInvestmentContract();

  const handleLoadTokenPrices = useCallback(async () => {
    const tokensWithPrice = Object.values(network.assets)
      .filter(({ investing }) => investing)
      .map(async (asset) => {
        const price = await investmentContract.methods
          .price(asset.address, new BN(10).pow(asset.decimals).toString(10))
          .call();

        return {
          name: asset.symbol,
          address: asset.address,
          decimals: asset.decimals,
          price: new BN(price)
            .div(new BN(10).pow(network.assets.Governance.decimals))
            .toString(10)
        };
      });

    try {
      setTokens(await Promise.all(tokensWithPrice));
    } catch (e) {
      console.error(e);
    }
  }, [network, investmentContract]);

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
