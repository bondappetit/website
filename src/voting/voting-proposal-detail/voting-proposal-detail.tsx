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
import { useVoteInfo } from './use-vote-info';

export const VotingProposalDetail: React.FC = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const votingProposalState = useVotingProposalDetail(Number(proposalId));
  const currentVotes = useVoteInfo();
  const classes = useVotingProposalDetailStyles();

  return (
    <>
      <Head title={votingProposalState.value?.title} />
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
            {votingProposalState.loading ? (
              <>
                <Skeleton height={32} className={classes.skeletonTitle} />
                <Skeleton
                  height={32}
                  maxWidth={252}
                  className={classes.skeletonTitle}
                />
              </>
            ) : (
              votingProposalState.value?.title
            )}
          </Typography>
          <Typography
            variant="h5"
            weight="light"
            align="center"
            className={classes.subtitle}
            component="div"
          >
            {votingProposalState.loading ? (
              <>
                <Skeleton
                  height={32}
                  maxWidth={388}
                  className={classes.skeletonTitle}
                />
              </>
            ) : (
              <>
                {votingProposalState.value?.status && (
                  <Status
                    color={
                      ProposalStateColors[votingProposalState.value.status]
                    }
                  >
                    {ProposalState[Number(votingProposalState.value.status)]}
                  </Status>
                )}
                {ProposalState.Queued ===
                  Number(votingProposalState.value?.status) &&
                  votingProposalState.value?.eta && (
                    <span className={classes.date}>
                      Queue period{' '}
                      {dateUtils.countdown(
                        dateUtils.formatUnix(
                          Number(votingProposalState.value.eta),
                          'YYYY-MM-DD HH:mm'
                        )
                      )}
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
            In order to be applied, the quorum of 4% must be reached
          </Typography>
          <VotingDetailsAction
            proposalId={proposalId}
            loading={votingProposalState.loading}
            onUpdate={votingProposalState.retry}
            forCount={votingProposalState.value?.forCount}
            status={votingProposalState.value?.status}
            againstCount={votingProposalState.value?.againstCount}
            currentVotes={currentVotes.value}
            eta={votingProposalState.value?.eta}
          />
          {currentVotes.value?.isEqualTo(0) && (
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
          <VotingDetailsBlock
            loading={votingProposalState.loading}
            details={votingProposalState.value?.details}
          />
          <VotingProposalDescription
            loading={votingProposalState.loading}
            description={votingProposalState.value?.description}
          />
        </div>
      </MainLayout>
    </>
  );
};
