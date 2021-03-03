import React, { useState } from 'react';
import BN from 'bignumber.js';
import { Link as ReactRouterLink } from 'react-router-dom';
import clsx from 'clsx';

import { MainLayout } from 'src/layouts';
import {
  Typography,
  Button,
  Link,
  ButtonBase,
  Skeleton,
  cutAccount,
  useNetworkConfig,
  Head,
  humanizeNumeral
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useVotingProposalListStyles } from './voting-proposal-list.styles';
import { useVoteInfo, VotingProposals, useVotingProposalList } from '../common';
import { VotingChoose } from '../voting-choose';

const DELEGATE_TO_DEFAULT = '0x0000000000000000000000000000000000000000';

export const VotingProposalList: React.FC = () => {
  const classes = useVotingProposalListStyles();
  const {
    proposals,
    nextPage,
    pages: proposalPages,
    currentPage
  } = useVotingProposalList();
  const {
    currentVotes,
    canCreateProposal,
    canDelegate,
    handleUpdateVoteInfo,
    delegateTo,
    currentGovCoin
  } = useVoteInfo();
  const [votingChooseOpen, setVotingChooseOpen] = useState(false);
  const networkConfig = useNetworkConfig();

  const handleToggleVotingChoose = () => {
    setVotingChooseOpen(!votingChooseOpen);
    handleUpdateVoteInfo();
  };

  let delegateButtonText = '';
  if (new BN(currentVotes).isGreaterThan(0)) {
    if (delegateTo === DELEGATE_TO_DEFAULT) {
      delegateButtonText = 'Delegate to';
    } else {
      delegateButtonText = 'Redelegate';
    }
  } else {
    delegateButtonText = 'Unlock votes';
  }

  return (
    <>
      <Head title="Proposals" />
      <MainLayout>
        <div className={classes.root}>
          <div className={classes.header}>
            <Typography variant="body1" align="center">
              <Link
                component={ReactRouterLink}
                to={URLS.voting.info}
                color="blue"
              >
                ← Governance
              </Link>
            </Typography>
            <Typography variant="h3" align="center">
              {proposals.loading && (
                <Skeleton className={classes.votesSkeleton} />
              )}
              {!proposals.loading &&
                (new BN(currentVotes).isGreaterThan(0) ||
                  new BN(currentGovCoin).isGreaterThan(0)) && (
                  <>
                    {new BN(currentVotes).isEqualTo(0)
                      ? currentGovCoin
                      : currentVotes}{' '}
                    {new BN(currentVotes).isEqualTo(0) ? 'BAG' : 'Votes'}
                    {new BN(currentVotes).isGreaterThan(0) &&
                      new BN(currentGovCoin).isGreaterThan(currentVotes) && (
                        <> ({humanizeNumeral(currentGovCoin)} BAG)</>
                      )}
                  </>
                )}
              {!proposals.loading &&
                new BN(currentVotes).isEqualTo(0) &&
                new BN(currentGovCoin).isEqualTo(0) && (
                  <>
                    No Votes <br />
                  </>
                )}
            </Typography>
            {proposals.loading && (
              <Skeleton className={classes.delegatesSkeleton} />
            )}
            {!proposals.loading && (
              <>
                <Typography variant="h2" align="center">
                  {new BN(currentVotes).isGreaterThan(0) &&
                    delegateTo !== DELEGATE_TO_DEFAULT && (
                      <>
                        deligated to{' '}
                        <Link
                          target="_blank"
                          className={classes.delegateTo}
                          href={`${networkConfig.networkEtherscan}/address/${delegateTo}`}
                        >
                          {cutAccount(delegateTo)}
                        </Link>
                      </>
                    )}
                  {new BN(currentVotes).isEqualTo(0) &&
                    new BN(currentGovCoin).isGreaterThan(0) && (
                      <>Unlock it so you can vote</>
                    )}
                </Typography>
                {canDelegate && (
                  <Button onClick={handleToggleVotingChoose}>
                    {delegateButtonText}
                  </Button>
                )}
              </>
            )}
          </div>
          {!proposals.loading && canCreateProposal && (
            <Button
              component={ReactRouterLink}
              variant="outlined"
              to={URLS.voting.create}
              className={clsx(
                classes.createProposal,
                classes.createProposalMargin
              )}
            >
              + Create new proposal
            </Button>
          )}
          {!proposals.loading && !canCreateProposal && (
            <Typography
              variant="h4"
              component="div"
              align="center"
              className={classes.createProposalMargin}
            >
              You need to have at list 1 000 000 BAG tokens to create proposal
            </Typography>
          )}
          <VotingProposals
            loading={proposals.loading}
            proposals={proposals.value}
            className={classes.list}
          />
          {proposalPages.length > 1 && proposalPages.length < currentPage && (
            <ButtonBase onClick={nextPage}>show more</ButtonBase>
          )}
        </div>
        <VotingChoose
          votes={Number(currentVotes) > 0 ? currentVotes : currentGovCoin}
          open={votingChooseOpen}
          onClose={handleToggleVotingChoose}
        />
      </MainLayout>
    </>
  );
};
