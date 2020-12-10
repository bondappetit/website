import { useCallback, useEffect, useRef, useReducer } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

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
  const { account } = useWeb3React<Web3>();
  const eventData = useVotingEvents();
  const networkConfig = useNetworkConfig();
  const [update, handleUpdateProposalDetail] = useUpdate();

  const loadExistingProposal = useCallback(async () => {
    if (
      !account ||
      !governorContract ||
      !networkConfig ||
      !proposalIdRef.current
    )
      return;

    dispatch(setLoading(true));

    dispatch(
      setProposal(
        await getProposal(proposalIdRef.current)(governorContract)(eventData)(
          networkConfig
        )
      )
    );

    dispatch(setLoading(false));
  }, [governorContract, account, eventData, networkConfig]);

  useEffect(() => {
    loadExistingProposal();
  }, [loadExistingProposal, update]);

  return {
    ...state,
    handleUpdateProposalDetail
  };
};
