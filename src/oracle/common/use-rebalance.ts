import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import { useIssuerContract } from 'src/common';

export const useRebalance = () => {
  const issuerContract = useIssuerContract();
  const { account } = useWeb3React<Web3>();

  const handleRebalance = useCallback(() => {
    if (!account) return;

    return issuerContract?.methods.rebalance().send({
      from: account,
      gas: 2000000
    });
  }, [issuerContract, account]);

  return handleRebalance;
};
