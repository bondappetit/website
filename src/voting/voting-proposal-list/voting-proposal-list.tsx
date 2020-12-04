import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useToggle } from 'react-use';

import { MainLayout } from 'src/layouts';
import {
  Typography,
  Button,
  Link,
  Status,
  ButtonBase,
  Skeleton,
  cutAccount,
  useNetworkConfig,
  Modal,
  SmallModal
} from 'src/common';
import { URLS } from 'src/router/urls';
import { MarketBuyBond } from 'src/market/market-buy-bond';
import { useVotingProposalListStyles } from './voting-proposal-list.styles';
import {
  ProposalState,
  useVotingProposalList,
  ProposalStateColors,
  useVoteInfo
} from '../common';
import { VotingChoose } from '../voting-choose';

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
    delegateTo
  } = useVoteInfo();
  const [votingChooseOpen, setVotingChooseOpen] = useState(false);
  const [buyBondOpen, toggleBuyBond] = useToggle(false);
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
            {!loading && Number(currentVotes) > 0 && <>{currentVotes} Votes</>}
            {!loading && Number(currentVotes) === 0 && <>No Votes</>}
          </Typography>
          {loading && <Skeleton className={classes.delegatesSkeleton} />}
          {!loading && (
            <>
              <Typography variant="h2" align="center">
                {Number(currentVotes) > 0 && (
                  <>
                    deligated to{' '}
                    <Link
                      target="_blank"
                      className={classes.delegateTo}
                      href={`${networkConfig?.networkEtherscan}/address/${delegateTo}`}
                    >
                      {cutAccount(delegateTo)}
                    </Link>
                  </>
                )}
                {Number(currentVotes) === 0 && (
                  <>Buy ART token so you can vote</>
                )}
                {Number(currentVotes) > 0 && !delegateTo && (
                  <>Unlock it so you can vote</>
                )}
              </Typography>
              {!canDelegate && <Button onClick={toggleBuyBond}>Buy ART</Button>}
              {canDelegate && !delegateTo && (
                <Button onClick={handleToggleVotingChoose}>Unlock votes</Button>
              )}
            </>
          )}
        </div>
        <div className={classes.list}>
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
          {loading &&
            Array.from(Array(5), (_, index) => index).map((item) => (
              <Skeleton key={item} className={classes.proposalSkeleton} />
            ))}
          {!loading &&
            proposals.map((proposal) => (
              <Typography key={proposal.id} variant="h4" component="div">
                <Link
                  component={ReactRouterLink}
                  to={URLS.voting.detail(proposal.id)}
                  className={classes.proposal}
                >
                  <Typography
                    variant="inherit"
                    className={classes.proposalTitle}
                  >
                    {proposal.title}
                  </Typography>
                  {proposal.status && (
                    <Status color={ProposalStateColors[proposal.status]}>
                      {ProposalState[Number(proposal.status)]}
                    </Status>
                  )}
                </Link>
              </Typography>
            ))}
        </div>
        {proposalPages.length > 1 && (
          <ButtonBase onClick={nextPage}>show more</ButtonBase>
        )}
      </div>
      <VotingChoose
        votes={currentVotes}
        open={votingChooseOpen}
        onClose={handleToggleVotingChoose}
      />
      <Modal open={buyBondOpen} onClose={toggleBuyBond}>
        <SmallModal>
          <MarketBuyBond />
        </SmallModal>
      </Modal>
    </MainLayout>
  );
};
