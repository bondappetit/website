import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import BN from 'bignumber.js';

import {
  useGovernorContract,
  useGovernanceContract,
  useNetworkConfig,
  useUpdate,
  useBalance
} from 'src/common';
import { ProposalState } from './constants';

export const useVoteInfo = () => {
  const [currentVotes, setCurrentVotes] = useState('0');
  const [currentStableCoin, setCurrentStableCoin] = useState('0');
  const [canDelegate, setCanDelegate] = useState(false);
  const [canCreateProposal, setCanCreateProposal] = useState(false);
  const [delegateTo, setDelegateTo] = useState<string | undefined>();
  const governorContract = useGovernorContract();
  const governanceContract = useGovernanceContract();
  const networkConfig = useNetworkConfig();
  const { account } = useWeb3React<Web3>();
  const getBalance = useBalance();
  const [update, handleUpdateVoteInfo] = useUpdate();

  const handleGetVotes = useCallback(async () => {
    if (!account) return;

    const votes = await governanceContract.methods
      .getCurrentVotes(account)
      .call();
    const stableCoinBalance = await getBalance({
      tokenAddress: governanceContract.options.address
    });

    setCanDelegate(stableCoinBalance.isGreaterThan(0));

    const stableCoinBalanceNormalized = stableCoinBalance
      .div(new BN(10).pow(networkConfig.assets.Governance.decimals))
      .toFixed(2);

    const votesNormalized = new BN(votes)
      .div(new BN(10).pow(networkConfig.assets.Governance.decimals))
      .toString();

    setCurrentStableCoin(stableCoinBalanceNormalized);
    setCurrentVotes(votesNormalized);
  }, [account, governanceContract, networkConfig, getBalance]);

  const handleCanCreateProposal = useCallback(async () => {
    if (!account || !currentVotes) return;

    const propsalThreshold = await governorContract.methods
      .proposalThreshold()
      .call();
    const proposalId = await governorContract.methods
      .latestProposalIds(account)
      .call();

    if (proposalId !== '0') {
      const proposalState = await governorContract.methods
        .state(proposalId)
        .call();

      setCanCreateProposal(
        ![ProposalState.Pending, ProposalState.Active].includes(
          Number(proposalState)
        )
      );

      return;
    }

    if (!propsalThreshold || !proposalId) return;

    const proposalThresholdBN = new BN(propsalThreshold).div(
      new BN(10).pow(networkConfig.assets.Governance.decimals)
    );

    const currentVotesIsGreaterThanProposalThreshold = new BN(
      currentVotes
    ).isGreaterThanOrEqualTo(proposalThresholdBN);

    setCanCreateProposal(currentVotesIsGreaterThanProposalThreshold);
  }, [governorContract, account, currentVotes, networkConfig]);

  const handleGetDelegates = useCallback(async () => {
    if (!account || !governanceContract) return;

    const delegates = await governanceContract.methods
      .delegates(account)
      .call();

    setDelegateTo(delegates);
  }, [account, governanceContract]);

  useEffect(() => {
    handleGetVotes();
  }, [handleGetVotes, update, account]);

  useEffect(() => {
    handleCanCreateProposal();
  }, [handleCanCreateProposal, currentVotes, update, account]);

  useEffect(() => {
    handleGetDelegates();
  }, [handleGetDelegates, update, account]);

  return useMemo(
    () => ({
      currentStableCoin,
      canDelegate,
      canCreateProposal,
      delegateTo,
      currentVotes: new BN(currentVotes).toFixed(2),
      handleUpdateVoteInfo
    }),
    [
      currentStableCoin,
      canCreateProposal,
      currentVotes,
      handleUpdateVoteInfo,
      delegateTo,
      canDelegate
    ]
  );
};
