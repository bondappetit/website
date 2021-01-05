import { useState, useEffect, useCallback } from 'react';

import { useIssuerContract } from 'src/common';

export const useIssuerBalance = () => {
  const [state, setState] = useState('');
  const issuerContract = useIssuerContract();

  const handleGetIssuerBalance = useCallback(async () => {
    const issuerBalance = await issuerContract.methods.balance().call();

    setState(issuerBalance);
  }, [issuerContract]);

  useEffect(() => {
    handleGetIssuerBalance();
  }, [handleGetIssuerBalance]);

  return state;
};
