import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import Web3 from 'web3';

import { useNetworkConfig, useStackingContract } from 'src/common';

export const useStackingUnlock = (tokenId: string) => {
  const stackingContract = useStackingContract();
  const { account } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();

  const handleUnlock = useCallback(async () => {
    const currentToken = networkConfig.assets[tokenId];

    if (!currentToken || !account) return;

    const unlock = stackingContract.methods.unlock(currentToken.address);

    if (!unlock) return;

    const gas = 2000000;

    await unlock.send({
      from: account,
      gas
    });
  }, [stackingContract, networkConfig, tokenId, account]);

  return handleUnlock;
};
