import React from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import BN from 'bignumber.js';

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
import { useVoteInfo } from './use-vote-info';

export const VotingProposalDetail: React.FC = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const {
    proposal,
    loading,
    handleUpdateProposalDetail
  } = useVotingProposalDetail(Number(proposalId));
  const { currentVotes } = useVoteInfo();
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
          <Typography
            variant="subtitle1"
            weight="light"
            align="center"
            component="div"
          >
            Voting can be applied only if 4% (4 000 000 BAG) of quorum reached
          </Typography>
          {new BN(currentVotes).isGreaterThan(0) && (
            <VotingDetailsAction
              proposalId={proposalId}
              loading={loading}
              onUpdate={handleUpdateProposalDetail}
              forCount={proposal?.forCount}
              status={proposal?.status}
              againstCount={proposal?.againstCount}
            />
          )}
          {new BN(currentVotes).isEqualTo(0) && (
            <Typography
              variant="body1"
              align="center"
              className={classes.getVotes}
            >
              <Link
                component={ReactRouterLink}
                to={URLS.voting.list}
                color="blue"
              >
                Get votes
              </Link>
            </Typography>
          )}
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
