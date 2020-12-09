import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import BN from 'bignumber.js';

import {
  useGovernorContract,
  useBondContract,
  useNetworkConfig,
  useUpdate,
  useBalance
} from 'src/common';
import { ProposalState } from './constants';

export const useVoteInfo = () => {
  const [currentVotes, setCurrentVotes] = useState('0');
  const [currentABT, setCurrentABT] = useState('0');
  const [canDelegate, setCanDelegate] = useState(false);
  const [canCreateProposal, setCanCreateProposal] = useState(false);
  const [delegateTo, setDelegateTo] = useState<string | undefined>();
  const governorContract = useGovernorContract();
  const bondContract = useBondContract();
  const networkConfig = useNetworkConfig();
  const { account } = useWeb3React<Web3>();
  const getBalance = useBalance();
  const [update, handleUpdateVoteInfo] = useUpdate();

  const handleGetVotes = useCallback(async () => {
    if (!account || !networkConfig || !bondContract) return;

    const votes = await bondContract.methods.getCurrentVotes(account).call();
    const abtBalance = await getBalance({
      tokenAddress: bondContract.options.address
    });

    setCanDelegate(abtBalance.isGreaterThan(0));

    const abtBalanceNormalized = abtBalance
      .div(new BN(10).pow(networkConfig.assets.Bond.decimals))
      .toString();

    const votesNormalized = new BN(votes)
      .div(new BN(10).pow(networkConfig.assets.Bond.decimals))
      .toString();

    setCurrentABT(abtBalanceNormalized);
    setCurrentVotes(votesNormalized);
  }, [account, bondContract, networkConfig, getBalance]);

  const handleCanCreateProposal = useCallback(async () => {
    if (!account || !networkConfig || !currentVotes || !governorContract)
      return;

    const propsalThreshold = await governorContract.methods
      .proposalThreshold()
      .call();
    const proposalId = await governorContract.methods
      .latestProposalIds(account)
      .call();

    if (proposalId && proposalId !== '0') {
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
      new BN(10).pow(networkConfig.assets.Bond.decimals)
    );

    const currentVotesIsGreaterThanProposalThreshold = new BN(
      currentVotes
    ).isGreaterThanOrEqualTo(proposalThresholdBN);

    setCanCreateProposal(currentVotesIsGreaterThanProposalThreshold);
  }, [governorContract, account, currentVotes, networkConfig]);

  const handleGetDelegates = useCallback(async () => {
    if (!account || !bondContract) return;

    const delegates = await bondContract.methods.delegates(account).call();

    setDelegateTo(delegates);
  }, [account, bondContract]);

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
      currentABT,
      canDelegate,
      canCreateProposal,
      delegateTo,
      currentVotes: new BN(currentVotes).toFixed(2),
      handleUpdateVoteInfo
    }),
    [
      currentABT,
      canCreateProposal,
      currentVotes,
      handleUpdateVoteInfo,
      delegateTo,
      canDelegate
    ]
  );
};
