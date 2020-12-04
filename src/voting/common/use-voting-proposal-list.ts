import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useNetworkConfig, useGovernorContract, useUpdate } from 'src/common';
import { useVotingEvents } from './use-voting-events';
import { FormattedProposal } from './voting.types';
import { usePagination } from './use-pagination';
import { getProposal } from './get-proposal';

export const useVotingProposalList = () => {
  const [loading, setLoading] = useState(false);
  const {
    page,
    setCountItems,
    nextPage,
    countItems,
    currentPage,
    pages
  } = usePagination();
  const [proposals, setProposals] = useState<FormattedProposal[]>([]);
  const governorContract = useGovernorContract();
  const { account, chainId } = useWeb3React<Web3>();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();
  const [update, handleUpdateProposalList] = useUpdate();

  const loadCountProposals = useCallback(async () => {
    if (!governorContract) return;

    const proposalCount = await governorContract.methods.proposalCount().call();
    setCountItems(Number(proposalCount));
  }, [setCountItems, governorContract]);

  const loadExistingProposals = useCallback(async () => {
    if (!account || !governorContract || !networkConfig || !page.length) return;

    setLoading(true);

    const existingProposals = page.map((proposalId) => {
      return getProposal(proposalId)(governorContract)(eventData)(
        networkConfig
      );
    });

    setProposals(await Promise.all(existingProposals));

    setLoading(false);
  }, [governorContract, account, eventData, networkConfig, page]);

  useEffect(() => {
    loadCountProposals();
  }, [chainId, loadCountProposals, update]);

  useEffect(() => {
    loadExistingProposals();
  }, [loadExistingProposals, countItems, currentPage, update]);

  return {
    loading,
    proposals,
    pages,
    handleUpdateProposalList,
    nextPage
  };
};
