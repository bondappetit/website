import Web3 from 'web3';
import { useAsyncRetry } from 'react-use';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { config } from 'src/config';

import { useNetworkConfig, useGovernorContract } from 'src/common';
import { useVotingEvents } from './use-voting-events';
import { usePagination } from './use-pagination';
import { getProposal } from './get-proposal';

console.log(config.IMPROPERLY_PROPOSALS);

export const useVotingProposalList = (limit?: number) => {
  const { nextPage, getPages, pages, currentPage } = usePagination(limit);
  const governorContract = useGovernorContract();
  const { chainId } = useWeb3React<Web3>();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();

  const proposals = useAsyncRetry(async () => {
    if (!governorContract || !eventData) return;

    const proposalCount = await governorContract.methods.proposalCount().call();

    const proposalPages = getPages(
      Number(proposalCount) - config.IMPROPERLY_PROPOSALS.length
    );

    const allProposals = proposalPages.map((proposalId) => {
      return getProposal(proposalId)(governorContract)(eventData)(
        networkConfig
      );
    });

    return (await Promise.all(allProposals)).filter(
      ({ id }) => !config.IMPROPERLY_PROPOSALS.includes(id)
    );
  }, [governorContract, eventData, networkConfig, chainId, getPages]);

  return useMemo(
    () => ({
      currentPage,
      proposals,
      pages,
      nextPage
    }),
    [currentPage, proposals, pages, nextPage]
  );
};
