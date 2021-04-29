import { useAsyncRetry } from 'react-use';

import { useNetworkConfig, useGovernorContract } from 'src/common';
import { useVotingEvents, getProposal } from '../common';

export const useVotingProposalDetail = (proposalId?: number) => {
  const governorContract = useGovernorContract();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();

  const state = useAsyncRetry(async () => {
    if (!proposalId || !governorContract || !eventData) return;

    const result = await getProposal(proposalId)(governorContract)(eventData)(
      networkConfig
    );

    return result;
  }, [proposalId, governorContract, eventData, networkConfig]);

  return state;
};
