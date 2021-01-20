import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { MainLayout } from 'src/layouts';
import {
  Typography,
  Button,
  Link,
  ButtonBase,
  Skeleton,
  cutAccount,
  useNetworkConfig
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useVotingProposalListStyles } from './voting-proposal-list.styles';
import { useVoteInfo, VotingProposals, useVotingProposalList } from '../common';
import { VotingChoose } from '../voting-choose';

const DELEGATE_TO_DEFAULT = '0x0000000000000000000000000000000000000000';

export const VotingProposalList: React.FC = () => {
  const classes = useVotingProposalListStyles();
  const {
    proposals = [],
    loading,
    nextPage,
    pages: proposalPages
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
    if (votingChooseOpen) {
      handleUpdateVoteInfo();
    }

    setVotingChooseOpen(!votingChooseOpen);
  };

  return (
    <MainLayout>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h3" align="center">
            {loading && <Skeleton className={classes.votesSkeleton} />}
            {!loading &&
              (Number(currentVotes) > 0 || Number(currentGovCoin) > 0) && (
                <>
                  {Number(currentVotes) === 0 ? currentGovCoin : currentVotes}{' '}
                  {Number(currentVotes) === 0 ? 'BAG' : 'Votes'}
                </>
              )}
            {!loading &&
              Number(currentVotes) === 0 &&
              Number(currentGovCoin) === 0 && <>No Votes</>}
          </Typography>
          {loading && <Skeleton className={classes.delegatesSkeleton} />}
          {!loading && (
            <>
              <Typography variant="h2" align="center">
                {Number(currentVotes) > 0 &&
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
                {(Number(currentVotes) > 0 || Number(currentGovCoin) > 0) &&
                  delegateTo === DELEGATE_TO_DEFAULT && (
                    <>Unlock it so you can vote</>
                  )}
              </Typography>
              {canDelegate && (
                <Button onClick={handleToggleVotingChoose}>
                  {delegateTo === DELEGATE_TO_DEFAULT
                    ? 'Unlock votes'
                    : 'Redelegate'}
                </Button>
              )}
            </>
          )}
        </div>
        {canCreateProposal && (
          <Button
            component={ReactRouterLink}
            variant="outlined"
            to={URLS.voting.create}
            className={classes.createProposal}
          >
            + Create new proposal
          </Button>
        )}
        <VotingProposals
          loading={loading}
          proposals={proposals}
          className={classes.list}
        />
        {proposalPages.length > 1 && (
          <ButtonBase onClick={nextPage}>show more</ButtonBase>
        )}
      </div>
      <VotingChoose
        votes={Number(currentVotes) > 0 ? currentVotes : currentGovCoin}
        open={votingChooseOpen}
        onClose={handleToggleVotingChoose}
      />
    </MainLayout>
  );
};
