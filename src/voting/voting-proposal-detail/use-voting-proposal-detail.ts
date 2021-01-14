import { useCallback, useEffect, useRef, useReducer } from 'react';

import { useNetworkConfig, useGovernorContract, useUpdate } from 'src/common';
import { useVotingEvents, getProposal } from '../common';
import {
  votingProposalDetailReducer,
  initialState,
  setLoading,
  setProposal
} from './voting-proposal-detail.reducer';

export const useVotingProposalDetail = (proposalId: number) => {
  const proposalIdRef = useRef(proposalId);
  const [state, dispatch] = useReducer(
    votingProposalDetailReducer,
    initialState
  );
  const governorContract = useGovernorContract();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();
  const [update, handleUpdateProposalDetail] = useUpdate();

  const loadExistingProposal = useCallback(async () => {
    if (!proposalIdRef.current) return;

    dispatch(setLoading(true));

    dispatch(
      setProposal(
        await getProposal(proposalIdRef.current)(governorContract)(eventData)(
          networkConfig
        )
      )
    );

    dispatch(setLoading(false));
  }, [governorContract, eventData, networkConfig]);

  useEffect(() => {
    loadExistingProposal();
  }, [loadExistingProposal, update]);

  return {
    ...state,
    handleUpdateProposalDetail
  };
};
