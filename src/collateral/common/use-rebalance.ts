import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useIssuerContract, estimateGas } from 'src/common';
import { useAsyncFn } from 'react-use';

export const useIssuerRebalance = () => {
  const issuerContract = useIssuerContract();
  const { account } = useWeb3React<Web3>();

  return useAsyncFn(async () => {
    if (!account) return;

    const rebalance = issuerContract.methods.rebalance();

    return rebalance.send({
      from: account,
      gas: await estimateGas(rebalance, { from: account })
    });
  }, [issuerContract, account]);
};
