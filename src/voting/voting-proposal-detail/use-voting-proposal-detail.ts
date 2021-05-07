import { useWeb3React } from '@web3-react/core';
import { useAsyncRetry } from 'react-use';

import {
  useNetworkConfig,
  useGovernorContract,
  useGovernanceContract,
  BN
} from 'src/common';
import { useVotingEvents, getProposal } from '../common';

export const useVotingProposalDetail = (proposalId?: number) => {
  const governorContract = useGovernorContract();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();
  const governanceToken = useGovernanceContract();

  const { account = null } = useWeb3React();

  const state = useAsyncRetry(async () => {
    if (!proposalId || !governorContract || !eventData || !governanceToken)
      return;

    const result = await getProposal(proposalId)(governorContract)(eventData)(
      networkConfig
    );

    let priorVotes = '0';

    try {
      priorVotes = account
        ? await governanceToken.methods
            .getPriorVotes(account, result.startBlock)
            .call()
        : priorVotes;
    } catch (error) {
      console.error(error.message);
    }

    return {
      ...result,
      priorVotes: new BN(priorVotes)
    };
  }, [proposalId, governorContract, eventData, networkConfig, account]);

  return state;
};
