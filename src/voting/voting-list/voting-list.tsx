import React, { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { MainLayout } from 'src/layouts';
import { Typography, Button, Modal } from 'src/common';
import { useVotingListStyles } from './voting-list.styles';
import { ProposalWithState, useGovernorContract } from '../common';
import { VotingChoose } from '../voting-choose';
import { VotingCreateProposal } from '../voting-create-proposal';

export type VotingListProps = {};

export const VotingList: React.FC<VotingListProps> = () => {
  const [proposals, setProposals] = useState<ProposalWithState[]>([]);
  const [votingChooseOpen, setVotingChooseOpen] = useState(false);
  const [createProposalOpen, setCreateProposalOpen] = useState(false);
  const classes = useVotingListStyles();
  const governorContract = useGovernorContract();
  const { account } = useWeb3React<Web3>();

  useEffect(() => {
    governorContract?.getPastEvents(
      'ProposalCreated',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      console.log
    );
  }, [governorContract]);

  const handleToggleVotingChoose = () => setVotingChooseOpen(!votingChooseOpen);
  const handleToggleCreateProposal = () =>
    setCreateProposalOpen(!createProposalOpen);

  const loadExistingProposals = useCallback(async () => {
    if (account) {
      const proposalCount = await governorContract?.methods
        .proposalCount()
        .call();

      const existingProposals = Array.from(
        { length: Number(proposalCount) },
        (_, i) => i + 1
      ).map(async (proposalId) => ({
        proposal: await governorContract?.methods.proposals(proposalId).call(),
        state: await governorContract?.methods.state(proposalId).call()
      }));

      setProposals(await Promise.all(existingProposals));
    }
  }, [governorContract, account]);

  useEffect(() => {
    loadExistingProposals();
  }, [loadExistingProposals]);

  return (
    <MainLayout>
      <div className={classes.voting}>
        <div>
          <Typography variant="h2" align="center">
            Votes
          </Typography>
          <Typography variant="h3" align="center">
            0.00000000
          </Typography>
          <Button onClick={handleToggleCreateProposal}>Create proposal</Button>
        </div>
        <div className={classes.row}>
          <div>
            <Typography variant="h3">Voting Wallet</Typography>
            <Button onClick={handleToggleVotingChoose}>Get Started</Button>
          </div>
          <div>
            <Typography variant="h3">Governance Proposals</Typography>
            {proposals.map(({ proposal }) => (
              <pre key={proposal?.id}>{JSON.stringify(proposal, null, 2)}</pre>
            ))}
          </div>
        </div>
      </div>
      <Modal open={votingChooseOpen} onClose={handleToggleVotingChoose}>
        <VotingChoose />
      </Modal>
      <Modal open={createProposalOpen} onClose={handleToggleCreateProposal}>
        <VotingCreateProposal />
      </Modal>
    </MainLayout>
  );
};
