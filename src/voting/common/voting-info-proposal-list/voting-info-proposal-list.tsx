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
};

export const VotingInfoProposalList: React.FC<VotingInfoProposalListProps> = (
  props
) => {
  const classes = useVotingInfoProposalListStyles();

  return (
    <div className={props.className}>
      <Typography variant="h2" align="center" className={classes.title}>
        Active proposals
      </Typography>
      <VotingProposals
        transparent
        loading={props.loading}
        proposals={props.proposals}
        className={classes.proposals}
      />
      <Link
        component={ReactRouterLink}
        to={URLS.voting.list}
        className={classes.link}
      >
        {!props.proposalCount ? (
          <>Create first proposal →</>
        ) : (
          <>Go to all {props.proposalCount} proposals →</>
        )}
      </Link>
    </div>
  );
};
