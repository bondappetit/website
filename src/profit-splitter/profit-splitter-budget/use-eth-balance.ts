import { useCallback, useEffect, useState } from 'react';
import BN from 'bignumber.js';

import { useBalance, useNetworkConfig } from 'src/common';

export const useETHBalance = () => {
  const [ethBalance, setEthBalance] = useState('');

  const networkConfig = useNetworkConfig();

  const getBalance = useBalance();

  const handleGetETHBalance = useCallback(async () => {
    if (!networkConfig) return;

    const balance = await getBalance({
      tokenName: networkConfig.assets.WETH.symbol
    });

    setEthBalance(
      balance
        .div(new BN(10).pow(networkConfig.assets.WETH.decimals))
        .toString(10)
    );
  }, [networkConfig, getBalance]);

  useEffect(() => {
    handleGetETHBalance();
  }, [handleGetETHBalance]);

  return ethBalance;
};
