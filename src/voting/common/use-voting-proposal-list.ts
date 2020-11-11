import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useNetworkConfig } from 'src/common';
import { useVotingEvents } from './use-voting-events';
import { useGovernorContract } from './voting.contracts';
import { FormattedProposal } from './voting.types';
import { usePagination } from './use-pagination';
import { getProposal } from './get-proposal';

export const useVotingProposalList = () => {
  const [loading, setLoading] = useState(false);
  const {
    page,
    setCountItems,
    nextPage,
    prevPage,
    pages,
    countItems,
    currentPage
  } = usePagination();
  const [proposals, setProposals] = useState<FormattedProposal[]>([]);
  const governorContract = useGovernorContract();
  const { account, chainId } = useWeb3React<Web3>();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();

  const loadCountProposals = useCallback(async () => {
    const proposalCount = await governorContract?.methods
      .proposalCount()
      .call();
    setCountItems(Number(proposalCount));
  }, [setCountItems, governorContract]);

  const loadExistingProposals = useCallback(async () => {
    if (account) {
      setLoading(true);
      const existingProposals = page.map((proposalId) => {
        return getProposal(proposalId)(governorContract)(eventData)(
          networkConfig
        );
      });

      setProposals(await Promise.all(existingProposals));
      setLoading(false);
    }
  }, [governorContract, account, eventData, networkConfig, page]);

  useEffect(() => {
    loadCountProposals();
  }, [chainId, loadCountProposals]);

  useEffect(() => {
    // loadExistingProposals();
  }, [loadExistingProposals, loadCountProposals, countItems, currentPage]);

  return {
    loading,
    proposals,
    pages,
    nextPage,
    prevPage
  };
};
