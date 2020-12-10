import { FormattedProposal } from '../common';

export enum VotingProposalDetailActions {
  proposal,
  loading
}

export type InitialState = {
  loading: boolean;
  proposal: FormattedProposal | null;
};

export const initialState: InitialState = {
  loading: true,
  proposal: null
};

export type Action = {
  type: VotingProposalDetailActions;
  loading?: InitialState['loading'];
  proposal?: InitialState['proposal'];
};

export const votingProposalDetailReducer = (
  state: InitialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case VotingProposalDetailActions.loading:
      return {
        ...state,
        loading: action.loading ?? false
      };

    case VotingProposalDetailActions.proposal:
      return {
        ...state,
        proposal: action.proposal ?? null
      };

    default:
      return initialState;
  }
};

export const setProposal = (proposal: FormattedProposal): Action => ({
  type: VotingProposalDetailActions.proposal,
  proposal
});

export const setLoading = (loading: boolean): Action => ({
  type: VotingProposalDetailActions.loading,
  loading
});
