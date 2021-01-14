import { useState, useEffect, useCallback } from 'react';
import BN from 'bignumber.js';

import { useIssuerContract, useNetworkConfig } from 'src/common';

export const useIssuerBalance = () => {
  const [state, setState] = useState('');
  const issuerContract = useIssuerContract();

  const networkConfig = useNetworkConfig();

  const handleGetIssuerBalance = useCallback(async () => {
    const issuerBalance = await issuerContract.methods.balance().call();

    setState(
      new BN(issuerBalance)
        .div(new BN(10).pow(networkConfig.assets.Stable.decimals))
        .toString(10)
    );
  }, [issuerContract, networkConfig]);

  useEffect(() => {
    handleGetIssuerBalance();
  }, [handleGetIssuerBalance]);

  return state;
};
