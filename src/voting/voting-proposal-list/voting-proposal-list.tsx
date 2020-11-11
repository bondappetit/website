import React, { useCallback, useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import BN from 'bignumber.js';

import { MainLayout } from 'src/layouts';
import {
  Typography,
  Button,
  Modal,
  Link,
  useGovernorContract,
  useBondContract,
  useNetworkConfig
} from 'src/common';
import { URLS } from 'src/router/urls';
import { useVotingProposalListStyles } from './voting-proposal-list.styles';
import { ProposalState, useVotingProposalList, VotingConfirm } from '../common';
import { VotingChoose } from '../voting-choose';
import { VotingCreateProposal } from '../voting-create-proposal';

export const VotingProposalList: React.FC = () => {
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [votingStatus, setVotingStatus] = useState<number | null>(null);
  const [votingChooseOpen, setVotingChooseOpen] = useState(false);
  const [createProposalOpen, setCreateProposalOpen] = useState(false);
  const [voteConfirmOpen, setVoteConfirmOpen] = useState(false);
  const classes = useVotingProposalListStyles();
  const { account } = useWeb3React<Web3>();
  const {
    proposals = [],
    loading,
    pages: proposalPages,
    nextPage,
    prevPage
  } = useVotingProposalList();
  const governorContract = useGovernorContract();
  const bondContract = useBondContract();
  const [currentVotes, setCurrentVotes] = useState<BN | null>(null);
  const [canCreateProposal, setCanCreateProposal] = useState(false);
  const networkConfig = useNetworkConfig();

  const handleToggleVotingChoose = () => setVotingChooseOpen(!votingChooseOpen);
  const handleToggleCreateProposal = () =>
    setCreateProposalOpen(!createProposalOpen);
  const handleToggleVoteConfirm = (proposal?: string, status?: number) => {
    setVoteConfirmOpen(!voteConfirmOpen);

    if (status) setVotingStatus(status);
    if (proposal) setProposalId(proposal);
  };

  const handleVote = async (value: boolean) => {
    if (!proposalId || !account) return;

    if (votingStatus === ProposalState.Active) {
      await governorContract?.methods
        .castVote(proposalId, value)
        .send({ from: account });
    }
    if (votingStatus === ProposalState.Queued && value) {
      await governorContract?.methods.queue(proposalId).send({ from: account });
    }

    if (votingStatus === ProposalState.Executed && value) {
      await governorContract?.methods
        .execute(proposalId)
        .send({ from: account });
    }
  };

  const handleGetVotes = useCallback(async () => {
    if (!account || !networkConfig) return;

    const votes = await bondContract?.methods.getCurrentVotes(account).call();

    if (!votes) return;

    setCurrentVotes(
      new BN(votes).div(new BN(10).pow(networkConfig.assets.Bond.decimals))
    );
  }, [account, bondContract, networkConfig]);

  const handleTest = useCallback(async () => {
    if (!account || !networkConfig || !currentVotes) return;

    const propsalThreshold = await governorContract?.methods
      .proposalThreshold()
      .call();
    if (!propsalThreshold) return;

    setCanCreateProposal(
      currentVotes.isGreaterThanOrEqualTo(
        new BN(propsalThreshold).div(
          new BN(10).pow(networkConfig.assets.Bond.decimals)
        )
      )
    );
  }, [governorContract, account, currentVotes, networkConfig]);

  useEffect(() => {
    handleGetVotes();
    handleTest();
  }, [handleGetVotes, handleTest]);

  return (
    <MainLayout>
      <div className={classes.voting}>
        <div>
          <Typography variant="h2" align="center">
            Votes
          </Typography>
          <Typography variant="h3" align="center">
            {currentVotes?.toFixed(2)}
          </Typography>
          {canCreateProposal && (
            <Button onClick={handleToggleCreateProposal}>
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
                  {proposal.status && (
                    <>
                      {Number(proposal.status) === ProposalState.Succeeded && (
                        <Button
                          onClick={() =>
                            handleToggleVoteConfirm(
                              proposal.id,
                              ProposalState.Queued
                            )
                          }
                        >
                          Queue
                        </Button>
                      )}
                      {Number(proposal.status) === ProposalState.Queued && (
                        <Button
                          onClick={() =>
                            handleToggleVoteConfirm(
                              proposal.id,
                              ProposalState.Executed
                            )
                          }
                        >
                          Execute
                        </Button>
                      )}
                      {Number(proposal.status) === ProposalState.Active && (
                        <Button
                          onClick={() =>
                            handleToggleVoteConfirm(
                              proposal.id,
                              ProposalState.Active
                            )
                          }
                        >
                          Vote
                        </Button>
                      )}
                    </>
                  )}
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
      <Modal open={votingChooseOpen} onClose={handleToggleVotingChoose}>
        <VotingChoose />
      </Modal>
      <Modal open={createProposalOpen} onClose={handleToggleCreateProposal}>
        <VotingCreateProposal />
      </Modal>
      <Modal open={voteConfirmOpen} onClose={handleToggleVoteConfirm}>
        <VotingConfirm onVote={handleVote} />
      </Modal>
    </MainLayout>
  );
};
