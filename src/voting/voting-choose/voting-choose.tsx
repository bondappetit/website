import React, { useCallback, useState } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { Plate, ButtonBase } from 'src/common';
import { useVotingChooseStyles } from './voting-choose.styles';
import { VotingDelegate, VotingManual, useBondContract } from '../common';

export type VotingChooseProps = {};

enum VotingVariants {
  manual,
  delegate
}

export const VotingChoose: React.FC<VotingChooseProps> = () => {
  const [
    currentVotingState,
    setCurrentVotingState
  ] = useState<VotingVariants | null>(null);
  const classes = useVotingChooseStyles();
  const bondContract = useBondContract();
  const { account } = useWeb3React<Web3>();

  const handleVote = useCallback(
    async (address?: string | null) => {
      if (!address || !account) return;

      await bondContract?.methods.delegate(address).send({
        from: account,
        gas: 2000000
      });
    },
    [bondContract, account]
  );

  const components = [
    <VotingManual onManual={() => handleVote(account)} />,
    <VotingDelegate onDelegate={(address) => handleVote(address)} />
  ];

  return (
    <Plate className={classes.votingChoose}>
      {currentVotingState === null && (
        <>
          <ButtonBase
            onClick={() => setCurrentVotingState(VotingVariants.manual)}
          >
            Manual
          </ButtonBase>
          <ButtonBase
            onClick={() => setCurrentVotingState(VotingVariants.delegate)}
          >
            Delegate
          </ButtonBase>
        </>
      )}
      {currentVotingState !== null && (
        <>
          <ButtonBase onClick={() => setCurrentVotingState(null)}>
            back
          </ButtonBase>
          {components[currentVotingState]}
        </>
      )}
    </Plate>
  );
};
