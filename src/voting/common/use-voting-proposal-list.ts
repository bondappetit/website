import Web3 from 'web3';
import { useAsyncRetry } from 'react-use';
import { useWeb3React } from '@web3-react/core';

import { useNetworkConfig, useGovernorContract } from 'src/common';
import { useVotingEvents } from './use-voting-events';
import { usePagination } from './use-pagination';
import { getProposal } from './get-proposal';

export const useVotingProposalList = (limit?: number) => {
  const { nextPage, getPages, pages } = usePagination(limit);
  const governorContract = useGovernorContract();
  const { chainId } = useWeb3React<Web3>();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();

  const proposals = useAsyncRetry(async () => {
    const proposalCount = await governorContract.methods.proposalCount().call();

    const proposalPages = getPages(Number(proposalCount));

    const existingProposals = proposalPages.map((proposalId) => {
      return getProposal(proposalId)(governorContract)(eventData)(
        networkConfig
      );
    });

    return Promise.all(existingProposals);
  }, [governorContract, eventData, networkConfig, chainId, getPages]);

  return {
    proposals,
    pages,
    nextPage
  };
};
