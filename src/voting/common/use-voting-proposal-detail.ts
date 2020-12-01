import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useNetworkConfig, useGovernorContract, useUpdate } from 'src/common';
import { useVotingEvents } from './use-voting-events';
import { FormattedProposal } from './voting.types';
import { getProposal } from './get-proposal';

export const useVotingProposalDetail = (proposalId: number) => {
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<FormattedProposal | null>(null);
  const governorContract = useGovernorContract();
  const { account } = useWeb3React<Web3>();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();
  const [update, handleUpdateProposalDetail] = useUpdate();

  const loadExistingProposal = useCallback(async () => {
    if (!account) return;
    setLoading(true);

    setProposal(
      await getProposal(proposalId)(governorContract)(eventData)(networkConfig)
    );
    setLoading(false);
  }, [governorContract, account, eventData, networkConfig, proposalId]);

  useEffect(() => {
    loadExistingProposal();
  }, [loadExistingProposal, update]);

  return {
    loading,
    proposal,
    handleUpdateProposalDetail
  };
};
