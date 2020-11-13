import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import BN from 'bignumber.js';

import {
  useGovernorContract,
  useBondContract,
  useNetworkConfig,
  useUpdate
} from 'src/common';

export const useVoteInfo = () => {
  const governorContract = useGovernorContract();
  const [currentVotes, setCurrentVotes] = useState<string>('0');
  const [canCreateProposal, setCanCreateProposal] = useState(false);
  const bondContract = useBondContract();
  const networkConfig = useNetworkConfig();
  const { account } = useWeb3React<Web3>();
  const [update, handleUpdateVoteInfo] = useUpdate();

  const handleGetVotes = useCallback(async () => {
    if (!account || !networkConfig) return;

    const votes = await bondContract?.methods.getCurrentVotes(account).call();

    if (!votes) return;

    setCurrentVotes(
      new BN(votes)
        .div(new BN(10).pow(networkConfig.assets.Bond.decimals))
        .toString()
    );
  }, [account, bondContract, networkConfig]);

  const handleCanCreateProposal = useCallback(async () => {
    if (!account || !networkConfig || !currentVotes) return;

    const propsalThreshold = await governorContract?.methods
      .proposalThreshold()
      .call();
    if (!propsalThreshold) return;

    setCanCreateProposal(
      new BN(currentVotes).isGreaterThanOrEqualTo(
        new BN(propsalThreshold).div(
          new BN(10).pow(networkConfig.assets.Bond.decimals)
        )
      )
    );
  }, [governorContract, account, currentVotes, networkConfig]);

  useEffect(() => {
    handleGetVotes();
    handleCanCreateProposal();
  }, [handleCanCreateProposal, handleGetVotes, currentVotes, update]);

  return useMemo(
    () => ({
      canCreateProposal,
      currentVotes: new BN(currentVotes).toFixed(2),
      handleUpdateVoteInfo
    }),
    [canCreateProposal, currentVotes, handleUpdateVoteInfo]
  );
};
