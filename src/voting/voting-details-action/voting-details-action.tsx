import { useWeb3React } from '@web3-react/core';
import React, { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import { Skeleton, useGovernorContract, Button } from 'src/common';
import { ProposalState, VoteButton, VotingInfo } from '../common';
import { useVotingDetailsActionStyles } from './voting-details-action.styles';

export type VotingDetailsActionProps = {
  loading: boolean;
  proposalId: string;
  forCount?: number;
  againstCount?: number;
  onUpdate?: () => void;
  status?: string;
};

type Receipt = {
  hasVoted: boolean;
  support: boolean;
  votes: string;
};

export const VotingDetailsAction: React.FC<VotingDetailsActionProps> = (
  props
) => {
  const classes = useVotingDetailsActionStyles();
  const governorContract = useGovernorContract();
  const { account } = useWeb3React<Web3>();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [queued, toggleQueue] = useToggle(false);
  const [executed, toggleExecute] = useToggle(false);

  const { onUpdate } = props;

  const handleVote = useCallback(
    async (value: boolean) => {
      if (!account) return;

      try {
        await governorContract.methods
          .castVote(props.proposalId, value)
          .send({ from: account });
      } finally {
        onUpdate?.();
      }
    },
    [governorContract, props.proposalId, account, onUpdate]
  );

  const handleExecuteProposal = useCallback(async () => {
    if (!account) return;

    toggleExecute();

    try {
      await governorContract.methods
        .execute(props.proposalId)
        .send({ from: account });
    } finally {
      onUpdate?.();

      toggleExecute();
    }
  }, [governorContract, props.proposalId, account, onUpdate, toggleExecute]);

  const handleQueueProposal = useCallback(async () => {
    if (!account) return;
    toggleQueue();

    try {
      await governorContract.methods
        .queue(props.proposalId)
        .send({ from: account });
    } finally {
      onUpdate?.();

      toggleQueue();
    }
  }, [governorContract, props.proposalId, account, onUpdate, toggleQueue]);

  const handleGetVotedStatus = useCallback(async () => {
    if (!account) return;

    const result = await governorContract.methods
      .getReceipt(props.proposalId, account)
      .call();

    if (!result) return;

    const [hasVoted, support, votes] = result;

    setReceipt({
      hasVoted,
      support,
      votes
    });
  }, [governorContract, account, props.proposalId]);

  useEffect(() => {
    handleGetVotedStatus();
  }, [handleGetVotedStatus, props.status]);

  return (
    <>
      {props.loading && <Skeleton height={116} />}
      <div className={classes.root}>
        {!props.loading && (
          <div className={classes.row}>
            {!receipt?.hasVoted &&
              Number(props.status) === ProposalState.Active && (
                <>
                  <VoteButton
                    onClick={() => handleVote(true)}
                    variant="voteFor"
                  >
                    Vote for
                  </VoteButton>
                  <VoteButton
                    onClick={() => handleVote(false)}
                    variant="voteAgainst"
                  >
                    Vote against
                  </VoteButton>
                </>
              )}
            {receipt?.hasVoted && (
              <>
                <VotingInfo
                  active={receipt.support === true}
                  variant="voteFor"
                  total={(props.forCount ?? 0) + (props.againstCount ?? 0)}
                  count={props.forCount}
                >
                  voted for
                </VotingInfo>
                <VotingInfo
                  active={receipt.support === false}
                  variant="voteAgainst"
                  total={(props.forCount ?? 0) + (props.againstCount ?? 0)}
                  count={props.againstCount}
                >
                  voted against
                </VotingInfo>
              </>
            )}
          </div>
        )}
        {ProposalState.Succeeded === Number(props.status) && (
          <Button
            onClick={handleQueueProposal}
            loading={queued}
            disabled={queued}
          >
            Queue
          </Button>
        )}
        {ProposalState.Queued === Number(props.status) && (
          <Button
            onClick={handleExecuteProposal}
            loading={executed}
            disabled={executed}
          >
            Execute
          </Button>
        )}
      </div>
    </>
  );
};
