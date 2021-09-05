import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { VotingProposals } from '../voting-proposals';
import { FormattedProposal } from '../voting.types';
import { useVotingInfoProposalListStyles } from './voting-info-proposal-list.styles';

export type VotingInfoProposalListProps = {
  loading: boolean;
  proposals?: FormattedProposal[];
  proposalCount: number;
  className?: string;
  actions: React.ReactNode;
};

export const VotingInfoProposalList: React.FC<VotingInfoProposalListProps> = (
  props
) => {
  const classes = useVotingInfoProposalListStyles();

  return (
    <div className={props.className}>
      {props.actions}
      <VotingProposals
        transparent
        loading={props.loading}
        proposals={props.proposals}
        className={classes.proposals}
      />
      {props.proposalCount > 3 && (
        <Typography variant="h5">
          <Link
            component={ReactRouterLink}
            to={URLS.voting.list}
            className={classes.link}
          >
            Show {props.proposalCount} more proposals ↓
          </Link>
        </Typography>
      )}
    </div>
  );
};
