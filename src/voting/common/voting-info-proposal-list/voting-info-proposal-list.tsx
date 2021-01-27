import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link, Typography } from 'src/common';
import { URLS } from 'src/router/urls';
import { VotingProposals } from '../voting-proposals';
import { FormattedProposal } from '../voting.types';
import { useVotingInfoProposalListStyles } from './voting-info-proposal-list.styles';

export type VotingInfoProposalListProps = {
  loading: boolean;
  proposals: FormattedProposal[];
  proposalCount: number;
  className?: string;
};

export const VotingInfoProposalList: React.FC<VotingInfoProposalListProps> = (
  props
) => {
  const classes = useVotingInfoProposalListStyles();

  return (
    <div className={props.className}>
      <Typography variant="h1" align="center" className={classes.title}>
        Influence the future of protocol using the BondAppétit Governance
      </Typography>
      <Typography
        variant="h4"
        component="p"
        align="center"
        className={classes.subtitle}
      >
        BAG holders are entitled to influence the future and features of
        BondAppétite. In order to enforce certain actions, a simple majority of
        tokenholders must vote for a certain proposal.
      </Typography>
      <VotingProposals
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
