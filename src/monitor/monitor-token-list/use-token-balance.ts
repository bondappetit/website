import { useCallback, useState, useEffect } from 'react';
import BN from 'bignumber.js';
import { useInterval } from 'react-use';

import { useBalance, useNetworkConfig } from 'src/common';

type TokenBalance = {
  symbol: string;
  balance: string;
};

export const useTokensBalance = (address?: string) => {
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);

  const networkConfig = useNetworkConfig();
  const getBalance = useBalance();

  const handleLoadTokensBalance = useCallback(async () => {
    const balances = Object.values(networkConfig.assets).map(async (asset) => {
      const balance = await getBalance({
        tokenName: asset.symbol,
        tokenAddress: asset.address,
        accountAddress: address
      });

      return {
        symbol: asset.symbol,
        balance: balance.div(new BN(10).pow(asset.decimals)).toString(10)
      };
    });

    setTokenBalances(await Promise.all(balances));
  }, [getBalance, address, networkConfig]);

  useEffect(() => {
    handleLoadTokensBalance();
  }, [handleLoadTokensBalance]);

  useInterval(handleLoadTokensBalance, 15000);

  return tokenBalances;
};
