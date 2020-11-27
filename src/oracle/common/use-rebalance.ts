import { useCallback } from 'react';
import { useIssuerContract } from 'src/common';

export const useRebalance = () => {
  const issuerContract = useIssuerContract();

  const handleRebalance = useCallback(() => {
    issuerContract?.methods.rebalance().call();
  }, [issuerContract]);

  return handleRebalance;
};
