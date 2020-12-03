import { useCallback, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { useNetworkConfig, useGovernorContract, useUpdate } from 'src/common';
import { useVotingEvents } from './use-voting-events';
import { FormattedProposal } from './voting.types';
import { usePagination } from './use-pagination';
import { getProposal } from './get-proposal';

export const useVotingProposalList = () => {
  const loading = useRef(false);
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
  const [update, handleUpdateProposalList] = useUpdate();

  const loadCountProposals = useCallback(async () => {
    const proposalCount = await governorContract?.methods
      .proposalCount()
      .call();
    setCountItems(Number(proposalCount));
  }, [setCountItems, governorContract]);

  const loadExistingProposals = useCallback(async () => {
    if (!account) return;

    loading.current = true;

    const existingProposals = page.map((proposalId) => {
      return getProposal(proposalId)(governorContract)(eventData)(
        networkConfig
      );
    });

    setProposals(await Promise.all(existingProposals));

    loading.current = false;
  }, [governorContract, account, eventData, networkConfig, page]);

  useEffect(() => {
    loadCountProposals();
  }, [chainId, loadCountProposals, update]);

  useEffect(() => {
    loadExistingProposals();
  }, [loadExistingProposals, countItems, currentPage, update]);

  return {
    loading: loading.current,
    proposals,
    pages,
    handleUpdateProposalList,
    nextPage,
    prevPage
  };
};
