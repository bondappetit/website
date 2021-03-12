import React from 'react';
import { useAsyncFn, useAsyncRetry } from 'react-use';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import {
  Skeleton,
  useGovernorContract,
  Button,
  estimateGas,
  BN
} from 'src/common';
import { ProposalState, VotingButton, VotingDetailInfo } from '../common';
import { useVotingDetailsActionStyles } from './voting-details-action.styles';

export type VotingDetailsActionProps = {
  loading: boolean;
  proposalId: string;
  forCount?: BN;
  againstCount?: BN;
  onUpdate?: () => void;
  status?: string;
};

export const VotingDetailsAction: React.FC<VotingDetailsActionProps> = (
  props
) => {
  const classes = useVotingDetailsActionStyles();
  const governorContract = useGovernorContract();
  const { account } = useWeb3React<Web3>();

  const { onUpdate } = props;

  const [votingState, handleVote] = useAsyncFn(
    async (value: boolean) => {
      if (!account || !governorContract) return;

      try {
        const castVote = governorContract.methods.castVote(
          props.proposalId,
          value
        );

        await castVote.send({
          from: account,
          gas: await estimateGas(castVote, { from: account })
        });
      } finally {
        onUpdate?.();
      }
    },
    [governorContract, props.proposalId, account, onUpdate]
  );

  const [executingState, handleExecuteProposal] = useAsyncFn(async () => {
    if (!account || !governorContract) return;

    try {
      const execute = governorContract.methods.execute(props.proposalId);

      await execute.send({
        from: account,
        gas: await estimateGas(execute, { from: account })
      });
    } finally {
      onUpdate?.();
    }
  }, [governorContract, props.proposalId, account, onUpdate]);

  const [queueState, handleQueueProposal] = useAsyncFn(async () => {
    if (!account || !governorContract) return;

    try {
      const queue = governorContract.methods.queue(props.proposalId);

      await queue.send({
        from: account,
        gas: await estimateGas(queue, { from: account })
      });
    } finally {
      onUpdate?.();
    }
  }, [governorContract, props.proposalId, account, onUpdate]);

  const receiptState = useAsyncRetry(async () => {
    if (!account || !governorContract) return;

    const result = await governorContract.methods
      .getReceipt(props.proposalId, account)
      .call();

    const [hasVoted, support, votes] = result;

    return {
      hasVoted,
      support,
      votes
    };
  }, [governorContract, account, props.proposalId, props.status]);

  return (
    <>
      {props.loading && <Skeleton height={116} />}
      <div className={classes.root}>
        {!props.loading && (
          <div className={classes.row}>
            {!receiptState.value?.hasVoted &&
              Number(props.status) === ProposalState.Active && (
                <>
                  <VotingButton
                    onClick={() => handleVote(true)}
                    variant="voteFor"
                    loading={votingState.loading}
                  >
                    Vote for
                  </VotingButton>
                  <VotingButton
                    onClick={() => handleVote(false)}
                    variant="voteAgainst"
                    loading={votingState.loading}
                  >
                    Vote against
                  </VotingButton>
                </>
              )}
            {receiptState.value?.hasVoted && (
              <>
                <VotingDetailInfo
                  active={receiptState.value.support === true}
                  variant="voteFor"
                  total={props.forCount?.plus(props.againstCount ?? 0)}
                  count={props.forCount}
                >
                  voted for
                </VotingDetailInfo>
                <VotingDetailInfo
                  active={receiptState.value.support === false}
                  variant="voteAgainst"
                  total={props.forCount?.plus(props.againstCount ?? 0)}
                  count={props.againstCount}
                >
                  voted against
                </VotingDetailInfo>
              </>
            )}
          </div>
        )}
        {ProposalState.Succeeded === Number(props.status) && (
          <Button
            onClick={handleQueueProposal}
            loading={queueState.loading}
            disabled={queueState.loading}
          >
            Queue
          </Button>
        )}
        {ProposalState.Queued === Number(props.status) && (
          <Button
            onClick={handleExecuteProposal}
            loading={executingState.loading}
            disabled={executingState.loading}
          >
            Execute
          </Button>
        )}
      </div>
    </>
  );
};
