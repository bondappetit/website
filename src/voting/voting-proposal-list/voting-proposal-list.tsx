import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { MainLayout } from 'src/layouts';
import { Typography, Button, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useVotingProposalListStyles } from './voting-proposal-list.styles';
import { ProposalState, useVotingProposalList, useVoteInfo } from '../common';
import { VotingChoose } from '../voting-choose';

export const VotingProposalList: React.FC = () => {
  const classes = useVotingProposalListStyles();
  const {
    proposals = [],
    loading,
    pages: proposalPages,
    nextPage,
    prevPage
  } = useVotingProposalList();
  const {
    currentVotes,
    canCreateProposal,
    handleUpdateVoteInfo
  } = useVoteInfo();
  const [votingChooseOpen, setVotingChooseOpen] = useState(false);

  const handleToggleVotingChoose = () => {
    if (votingChooseOpen) {
      handleUpdateVoteInfo();
    }

    setVotingChooseOpen(!votingChooseOpen);
  };

  return (
    <MainLayout>
      <div className={classes.voting}>
        <div>
          <Typography variant="h2" align="center">
            Votes
          </Typography>
          <Typography variant="h3" align="center">
            {currentVotes}
          </Typography>
          {canCreateProposal && (
            <Button component={ReactRouterLink} to={URLS.voting.create}>
              Create proposal
            </Button>
          )}
        </div>
        <div className={classes.row}>
          <div>
            <Typography variant="h3">Voting Wallet</Typography>
            <Button onClick={handleToggleVotingChoose}>Get Started</Button>
          </div>
          <div>
            <Typography variant="h3">Governance Proposals</Typography>
            {loading && 'loading...'}
            {!loading &&
              proposals.map((proposal) => (
                <Typography key={proposal.id} variant="inherit" component="div">
                  <Link
                    component={ReactRouterLink}
                    to={URLS.voting.detail(proposal.id)}
                  >
                    {proposal.id}
                    <Typography variant="body1">{proposal.title}</Typography>
                    {proposal.status && (
                      <Typography variant="body1">
                        {ProposalState[Number(proposal.status)]}
                      </Typography>
                    )}
                  </Link>
                </Typography>
              ))}
            {proposalPages.length > 1 && (
              <>
                <Button onClick={prevPage}>prev</Button>
                {proposalPages.map((page) => (
                  <div key={page}>{page}</div>
                ))}
                <Button onClick={nextPage}>next</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <VotingChoose
        votes={currentVotes}
        open={votingChooseOpen}
        onClose={handleToggleVotingChoose}
      />
    </MainLayout>
  );
};
