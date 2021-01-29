import React from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';

import { MainLayout } from 'src/layouts';
import {
  Typography,
  Skeleton,
  Status,
  dateUtils,
  Head,
  Link
} from 'src/common';
import { URLS } from 'src/router/urls';
import {
  ProposalState,
  VotingDetailsBlock,
  VotingProposalDescription,
  ProposalStateColors
} from '../common';
import { VotingDetailsAction } from '../voting-details-action';
import { useVotingProposalDetailStyles } from './voting-proposal-detail.styles';
import { useVotingProposalDetail } from './use-voting-proposal-detail';

export const VotingProposalDetail: React.FC = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const {
    proposal,
    loading,
    handleUpdateProposalDetail
  } = useVotingProposalDetail(Number(proposalId));
  const classes = useVotingProposalDetailStyles();

  return (
    <>
      <Head title={proposal?.title} />
      <MainLayout>
        <div className={classes.voting}>
          <Typography variant="body1" weight="light" align="center">
            <Link
              component={ReactRouterLink}
              to={URLS.voting.list}
              color="blue"
            >
              ← Proposals
            </Link>
          </Typography>
          <Typography
            variant="h2"
            weight="light"
            align="center"
            className={classes.title}
          >
            {loading ? (
              <>
                <Skeleton height={32} className={classes.skeletonTitle} />
                <Skeleton
                  height={32}
                  maxWidth={252}
                  className={classes.skeletonTitle}
                />
              </>
            ) : (
              proposal?.title
            )}
          </Typography>
          <Typography
            variant="h5"
            weight="light"
            align="center"
            className={classes.subtitle}
            component="div"
          >
            {loading ? (
              <>
                <Skeleton
                  height={32}
                  maxWidth={388}
                  className={classes.skeletonTitle}
                />
              </>
            ) : (
              <>
                {proposal?.status && (
                  <Status color={ProposalStateColors[proposal.status]}>
                    {ProposalState[Number(proposal.status)]}
                  </Status>
                )}
                {ProposalState.Succeeded === Number(proposal?.status) &&
                  proposal?.eta && (
                    <span className={classes.date}>
                      Queue period {dateUtils.formatUnix(Number(proposal.eta))}
                    </span>
                  )}
              </>
            )}
          </Typography>
          <VotingDetailsAction
            proposalId={proposalId}
            loading={loading}
            onUpdate={handleUpdateProposalDetail}
            forCount={proposal?.forCount}
            status={proposal?.status}
            againstCount={proposal?.againstCount}
          />
          <VotingDetailsBlock loading={loading} details={proposal?.details} />
          <VotingProposalDescription
            loading={loading}
            description={proposal?.description}
          />
        </div>
      </MainLayout>
    </>
  );
};
