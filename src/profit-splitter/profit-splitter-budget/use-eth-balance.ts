import { useCallback, useEffect, useState } from 'react';

import { useBalance, useNetworkConfig, BN } from 'src/common';

export const useETHBalance = (
  accountAddress?: string,
  updateCount?: number
) => {
  const [ethBalance, setEthBalance] = useState('');

  const networkConfig = useNetworkConfig();

  const getBalance = useBalance();

  const handleGetETHBalance = useCallback(async () => {
    if (!accountAddress) return;

    const balance = await getBalance({
      tokenName: networkConfig.assets.WETH.symbol,
      accountAddress
    });

    setEthBalance(
      balance
        .div(new BN(10).pow(networkConfig.assets.WETH.decimals))
        .toString(10)
    );
  }, [networkConfig, getBalance, accountAddress]);

  useEffect(() => {
    handleGetETHBalance();
  }, [handleGetETHBalance, updateCount]);

  return ethBalance;
};
