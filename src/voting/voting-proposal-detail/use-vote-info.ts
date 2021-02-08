import { useCallback, useEffect, useMemo, useState } from 'react';
import BN from 'bignumber.js';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useGovernanceContract, useNetworkConfig, useUpdate } from 'src/common';

export const useVoteInfo = () => {
  const [currentVotes, setCurrentVotes] = useState('0');
  const governanceContract = useGovernanceContract();
  const networkConfig = useNetworkConfig();
  const { account } = useWeb3React<Web3>();
  const [update, handleUpdateVoteInfo] = useUpdate();

  const handleGetVotes = useCallback(async () => {
    if (!account) return;

    const votes = await governanceContract.methods
      .getCurrentVotes(account)
      .call();

    const votesNormalized = new BN(votes)
      .div(new BN(10).pow(networkConfig.assets.Governance.decimals))
      .toString(10);

    setCurrentVotes(votesNormalized);
  }, [account, governanceContract, networkConfig]);

  useEffect(() => {
    handleGetVotes();
  }, [handleGetVotes, update]);

  return useMemo(
    () => ({
      currentVotes: new BN(currentVotes),
      handleUpdateVoteInfo
    }),
    [currentVotes, handleUpdateVoteInfo]
  );
};
