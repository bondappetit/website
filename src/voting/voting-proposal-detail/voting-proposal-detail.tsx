import React from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';

import { MainLayout } from 'src/layouts';
import {
  Typography,
  Link,
  Skeleton,
  Status,
  StatusProps,
  dateUtils
} from 'src/common';
import { URLS } from 'src/router/urls';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/arrow-left.svg';
import {
  useVotingProposalDetail,
  ProposalState,
  VotingDetailsBlock,
  VotingProposalDescription
} from '../common';
import { VotingDetailsAction } from '../voting-details-action';
import { useVotingProposalDetailStyles } from './voting-proposal-detail.styles';

const colors: Record<string, StatusProps['color']> = {
  [ProposalState.Pending]: 'grey',
  [ProposalState.Active]: 'blue',
  [ProposalState.Defeated]: 'red',
  [ProposalState.Canceled]: 'yellow',
  [ProposalState.Succeeded]: 'green',
  [ProposalState.Queued]: 'pink',
  [ProposalState.Executed]: 'green',
  [ProposalState.Expired]: 'green'
};

export const VotingProposalDetail: React.FC = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const {
    proposal,
    loading,
    handleUpdateProposalDetail
  } = useVotingProposalDetail(Number(proposalId));
  const classes = useVotingProposalDetailStyles();

  return (
    <MainLayout
      leftButton={
        <Link
          className={classes.backLink}
          component={ReactRouterLink}
          to={URLS.voting.list}
        >
          <ArrowLeft className={classes.backLinkIcon} />{' '}
          <Typography
            component="span"
            variant="body1"
            className={classes.backLinkText}
          >
            Proposals
          </Typography>
        </Link>
      }
    >
      <div className={classes.voting}>
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
                <Status color={colors[proposal.status]}>
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
  );
};
