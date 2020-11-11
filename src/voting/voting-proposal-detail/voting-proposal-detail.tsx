import React from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';

import { MainLayout } from 'src/layouts';
import { Typography, Link } from 'src/common';
import { URLS } from 'src/router/urls';
import { useVotingProposalDetail } from '../common';
import { useVotingProposalDetailStyles } from './voting-proposal-detail.styles';

export const VotingProposalDetail: React.FC = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const { proposal, loading } = useVotingProposalDetail(Number(proposalId));
  const classes = useVotingProposalDetailStyles();

  return (
    <MainLayout>
      <div className={classes.voting}>
        <Link component={ReactRouterLink} to={URLS.voting.list}>
          all proposals
        </Link>
        <Typography variant="h3">Details</Typography>
        {loading && 'loading...'}
        {!loading && (
          <>
            {proposal?.details?.map((detail, index) => {
              return (
                <div key={detail.target}>
                  {index + 1}: {detail.target}.{detail.functionSig}(
                  {detail.callData.split(',').map((content, i) => {
                    return (
                      <React.Fragment key={content}>
                        {content}
                        {detail.callData.split(',').length - 1 === i ? '' : ','}
                      </React.Fragment>
                    );
                  })}
                  )
                </div>
              );
            })}
          </>
        )}
        <Typography variant="h3">Description</Typography>
        {loading && 'loading...'}
        {!loading && (
          <Typography variant="body1">{proposal?.description}</Typography>
        )}
      </div>
    </MainLayout>
  );
};
