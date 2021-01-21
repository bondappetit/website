import { useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useIssuerContract } from 'src/common';

export const useRebalance = () => {
  const issuerContract = useIssuerContract();
  const { account } = useWeb3React<Web3>();

  const handleRebalance = useCallback(async () => {
    if (!account) return;

    const rebalance = issuerContract.methods.rebalance();

    return rebalance.send({
      from: account,
      gas: await rebalance.estimateGas({ from: account })
    });
  }, [issuerContract, account]);

  return handleRebalance;
};
